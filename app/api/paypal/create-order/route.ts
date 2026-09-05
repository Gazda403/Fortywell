import { NextResponse } from 'next/server';

function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() });
}

function getPayPalBaseUrl() {
  const env = process.env.PAYPAL_ENVIRONMENT?.toLowerCase();
  return env === 'live' || env === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      amount = '24.99',
      productName = 'Heritage Muscle Oil',
      productId = 'heritage-oil',
      aliExpressProductId,
    } = body;

    const clientId = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        {
          error: 'PayPal credentials not configured.',
          message: 'Please set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in your environment variables.',
        },
        { status: 500, headers: getCorsHeaders() }
      );
    }

    const baseUrl = getPayPalBaseUrl();
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    // Build the return URL — includes productId and aliExpressProductId so the
    // return handler knows what to fulfill after payment is approved
    const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fortywell.vercel.app';
    const returnParams = new URLSearchParams({
      productId,
      productName,
      ...(aliExpressProductId ? { aliExpressProductId } : {}),
    });
    const returnUrl = `${appBaseUrl}/api/paypal/return?${returnParams.toString()}`;
    const cancelUrl = `${appBaseUrl}/order-cancelled`;

    // 1. Get OAuth Access Token from PayPal
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
      const errText = await tokenRes.text();
      console.error('PayPal OAuth Token Error:', errText);
      return NextResponse.json(
        { error: 'Failed to authenticate with PayPal', details: errText },
        { status: tokenRes.status, headers: getCorsHeaders() }
      );
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // 2. Create Order with GUEST_CHECKOUT enabled
    // landing_page: "GUEST_CHECKOUT" forces credit card entry fields without requiring a PayPal account login
    const orderRes = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: productId,
            description: `FortyWell — ${productName}`,
            amount: {
              currency_code: 'USD',
              value: Number(amount).toFixed(2),
            },
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
              landing_page: 'GUEST_CHECKOUT',
              user_action: 'PAY_NOW',
              shipping_preference: 'GET_FROM_FILE',
              brand_name: 'FortyWell Apothecary',
              return_url: returnUrl,
              cancel_url: cancelUrl,
            },
          },
        },
      }),
      cache: 'no-store',
    });

    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      console.error('PayPal Order Creation Error:', orderData);
      return NextResponse.json(
        { error: 'Failed to create PayPal order', details: orderData },
        { status: orderRes.status, headers: getCorsHeaders() }
      );
    }

    return NextResponse.json(orderData, { headers: getCorsHeaders() });
  } catch (err: any) {
    console.error('PayPal create-order server exception:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500, headers: getCorsHeaders() }
    );
  }
}
