import { NextRequest, NextResponse } from 'next/server';
import { sendPurchaseAlert } from '@/lib/notifications';
import { autoFulfillAliExpressOrder } from '@/lib/aliexpress/fulfillment';

function getPayPalBaseUrl() {
  const env = process.env.PAYPAL_ENVIRONMENT?.toLowerCase();
  return env === 'live' || env === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
}

async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured.');
  }

  const baseUrl = getPayPalBaseUrl();
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const tokenRes = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    cache: 'no-store',
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    throw new Error(`PayPal auth failed: ${err}`);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

/**
 * GET /api/paypal/return
 *
 * This is the redirect target PayPal sends the buyer to after they approve payment.
 * Query params from PayPal: ?token=ORDER_ID&PayerID=...
 * Query params we embed:    &productId=...&productName=...&aliExpressProductId=...
 *
 * Flow:
 * 1. Capture the PayPal order (confirm payment)
 * 2. If product has an aliExpressProductId → auto-place order on AliExpress
 * 3. Send Resend email notification with full details
 * 4. Redirect buyer to /order-success?orderId=...
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // PayPal provides these after approval
  const paypalOrderId = searchParams.get('token');
  const payerId = searchParams.get('PayerID');

  // We embedded these in the return_url when creating the order
  const productId = searchParams.get('productId') || '';
  const productName = searchParams.get('productName') || 'FortyWell Store Item';
  const aliExpressProductId = searchParams.get('aliExpressProductId') || '';

  const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fortywell.vercel.app';

  if (!paypalOrderId) {
    console.error('[PayPal Return] Missing token (order ID) in return URL');
    return NextResponse.redirect(`${appBaseUrl}/order-cancelled?reason=missing_token`);
  }

  try {
    // ── 1. Capture the PayPal payment ──────────────────────────────────────
    const accessToken = await getPayPalAccessToken();
    const baseUrl = getPayPalBaseUrl();

    const captureRes = await fetch(
      `${baseUrl}/v2/checkout/orders/${paypalOrderId}/capture`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    const captureData = await captureRes.json();

    if (!captureRes.ok) {
      // If already captured (e.g. double redirect), still redirect to success
      const alreadyCaptured =
        captureData?.details?.[0]?.issue === 'ORDER_ALREADY_CAPTURED';
      if (alreadyCaptured) {
        console.warn('[PayPal Return] Order already captured, redirecting to success.');
        return NextResponse.redirect(
          `${appBaseUrl}/order-success?orderId=${paypalOrderId}&product=${encodeURIComponent(productName)}`
        );
      }

      console.error('[PayPal Return] Capture failed:', captureData);
      return NextResponse.redirect(
        `${appBaseUrl}/order-cancelled?reason=capture_failed`
      );
    }

    // ── 2. Extract buyer info from PayPal capture response ─────────────────
    const unit = captureData.purchase_units?.[0];
    const captureItem = unit?.payments?.captures?.[0];
    const payer = captureData.payer;
    const paymentSource = captureData.payment_source;

    const payerName =
      payer?.name?.given_name || payer?.name?.surname
        ? `${payer?.name?.given_name || ''} ${payer?.name?.surname || ''}`.trim()
        : paymentSource?.card?.name || unit?.shipping?.name?.full_name || undefined;

    const payerEmail =
      payer?.email_address || paymentSource?.paypal?.email_address || undefined;

    const amountValue = captureItem?.amount?.value || unit?.amount?.value || '0.00';
    const currencyCode =
      captureItem?.amount?.currency_code || unit?.amount?.currency_code || 'USD';
    const paymentType = paymentSource?.card ? 'Credit / Debit Card' : 'PayPal';

    const shipping = unit?.shipping;
    const shippingAddress = shipping?.address
      ? {
          recipientName: shipping.name?.full_name || payerName,
          line1: shipping.address.address_line_1,
          line2: shipping.address.address_line_2,
          city: shipping.address.admin_area_2,
          state: shipping.address.admin_area_1,
          postalCode: shipping.address.postal_code,
          country: shipping.address.country_code,
        }
      : undefined;

    // ── 3. Auto-fulfill via AliExpress (if this is an AliExpress product) ──
    let aliExpressOrderId: string | undefined;
    let aliExpressError: string | undefined;
    let aliExpressSuccess = false;

    if (aliExpressProductId) {
      if (!shippingAddress) {
        aliExpressError =
          'No shipping address in PayPal capture — cannot auto-place AliExpress order. Please fulfil manually.';
        console.warn('[PayPal Return]', aliExpressError);
      } else {
        const fulfillResult = await autoFulfillAliExpressOrder({
          aliExpressProductId,
          quantity: 1,
          shippingAddress: {
            recipientName: shippingAddress.recipientName,
            line1: shippingAddress.line1,
            line2: shippingAddress.line2,
            city: shippingAddress.city,
            state: shippingAddress.state,
            postalCode: shippingAddress.postalCode,
            country: shippingAddress.country,
            email: payerEmail,
          },
          outOrderId: `FW-${paypalOrderId}`,
        });

        if (fulfillResult.success) {
          aliExpressOrderId = fulfillResult.aliExpressOrderId;
          aliExpressSuccess = true;
          console.log(
            `[PayPal Return] AliExpress order placed: ${aliExpressOrderId}`
          );
        } else {
          aliExpressError = fulfillResult.error;
          console.error('[PayPal Return] AliExpress fulfillment failed:', aliExpressError);
        }
      }
    }

    // ── 4. Send Resend admin notification (non-blocking) ───────────────────
    sendPurchaseAlert({
      orderId: String(captureData.id || paypalOrderId),
      amount: amountValue,
      currency: currencyCode,
      productName: productName || unit?.description || 'FortyWell Store Item',
      productId: productId || undefined,
      customerEmail: payerEmail,
      customerName: payerName,
      provider: paymentType,
      shippingAddress,
      details: {
        ...captureData,
        aliExpress: aliExpressProductId
          ? {
              productId: aliExpressProductId,
              orderId: aliExpressOrderId,
              success: aliExpressSuccess,
              error: aliExpressError,
              payLink: aliExpressOrderId
                ? `https://www.aliexpress.com/p/trade/doPay.html`
                : undefined,
            }
          : undefined,
      },
    }).catch((err) =>
      console.error('[PayPal Return] Resend notification error:', err)
    );

    // ── 5. Redirect buyer to thank-you page ────────────────────────────────
    const successParams = new URLSearchParams({
      orderId: captureData.id || paypalOrderId,
      product: productName,
      ...(aliExpressSuccess && aliExpressOrderId
        ? { fulfilled: '1' }
        : {}),
    });

    return NextResponse.redirect(
      `${appBaseUrl}/order-success?${successParams.toString()}`
    );
  } catch (err: any) {
    console.error('[PayPal Return] Unexpected error:', err.message);
    return NextResponse.redirect(
      `${appBaseUrl}/order-cancelled?reason=server_error`
    );
  }
}
