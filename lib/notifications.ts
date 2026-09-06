import { Resend } from 'resend';

// Lazy initialize Resend client to avoid build-time issues if env var is missing
function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[Resend Notifications] RESEND_API_KEY is not configured');
    return null;
  }
  return new Resend(apiKey);
}

const DEFAULT_ADMIN_EMAIL = 'fortywell.team@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Fortywell Alerts <onboarding@resend.dev>';

export function getAdminNotificationEmail(): string {
  return (
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.NOTIFICATION_EMAIL ||
    process.env.COACHING_NOTIFICATION_EMAIL ||
    DEFAULT_ADMIN_EMAIL
  );
}

function getFormattedTimestamp(): string {
  return new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/Belgrade',
    dateStyle: 'full',
    timeStyle: 'short',
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. SIGN-UP NOTIFICATION
// ─────────────────────────────────────────────────────────────────────────────

export interface SignupAlertParams {
  email: string;
  name?: string;
  userId?: string;
  platform?: 'ios' | 'android' | 'web' | string;
  source?: string;
  metadata?: Record<string, any>;
}

export async function sendSignupAlert(params: SignupAlertParams) {
  const resend = getResendClient();
  if (!resend) {
    console.warn('[Notifications] Skipping signup email — Resend not initialized');
    return { success: false, error: 'Resend API key missing' };
  }

  const { email, name, userId, platform = 'app', source = 'Fortywell Mobile App' } = params;
  const adminEmail = getAdminNotificationEmail();
  const timestamp = getFormattedTimestamp();

  const platformBadge =
    platform === 'ios'
      ? '🍎 Apple iOS'
      : platform === 'android'
      ? '🤖 Android'
      : platform === 'web'
      ? '🌐 Web / Browser'
      : `📱 ${platform}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>New Fortywell Sign-Up</title>
    </head>
    <body style="margin:0;padding:0;background:#181514;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#181514;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="560" cellpadding="0" cellspacing="0" style="background:#262220;border-radius:14px;overflow:hidden;border:1px solid rgba(245,239,230,0.1);box-shadow:0 8px 32px rgba(0,0,0,0.4);">
              
              <!-- Header -->
              <tr>
                <td style="padding:36px 40px 28px;background:#201C1A;border-bottom:1px solid rgba(245,239,230,0.08);">
                  <p style="margin:0 0 6px;color:#92A975;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;font-weight:700;">
                    FORTYWELL MEMBERSHIP
                  </p>
                  <h1 style="margin:0;color:#F5EFE6;font-size:24px;font-weight:600;letter-spacing:-0.02em;">
                    ✦ New Account Created
                  </h1>
                </td>
              </tr>

              <!-- Content Body -->
              <tr>
                <td style="padding:32px 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    
                    <!-- Member Name -->
                    <tr>
                      <td style="padding:0 0 20px;">
                        <p style="margin:0 0 4px;color:rgba(245,239,230,0.45);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">Member Name</p>
                        <p style="margin:0;color:#F5EFE6;font-size:18px;font-weight:600;">${name || 'Anonymous / Not provided'}</p>
                      </td>
                    </tr>

                    <!-- Email -->
                    <tr>
                      <td style="padding:0 0 20px;">
                        <p style="margin:0 0 4px;color:rgba(245,239,230,0.45);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">Email Address</p>
                        <p style="margin:0;">
                          <a href="mailto:${email}" style="color:#92A975;font-size:18px;font-weight:600;text-decoration:none;">${email}</a>
                        </p>
                      </td>
                    </tr>

                    <!-- Platform -->
                    <tr>
                      <td style="padding:0 0 20px;">
                        <p style="margin:0 0 6px;color:rgba(245,239,230,0.45);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">Platform / Source</p>
                        <span style="display:inline-block;background:rgba(146,169,117,0.15);color:#A8BD8D;padding:5px 12px;border-radius:20px;font-size:13px;font-weight:600;border:1px solid rgba(146,169,117,0.3);">
                          ${platformBadge} · ${source}
                        </span>
                      </td>
                    </tr>

                    <!-- User ID (if available) -->
                    ${userId ? `
                    <tr>
                      <td style="padding:0 0 20px;">
                        <p style="margin:0 0 4px;color:rgba(245,239,230,0.45);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">Supabase User ID</p>
                        <p style="margin:0;color:rgba(245,239,230,0.7);font-size:12px;font-family:monospace;">${userId}</p>
                      </td>
                    </tr>` : ''}

                    <!-- Timestamp -->
                    <tr>
                      <td style="padding:16px 0 0;border-top:1px solid rgba(245,239,230,0.08);">
                        <p style="margin:0;color:rgba(245,239,230,0.4);font-size:12px;">
                          Registered at: ${timestamp}
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:18px 40px;background:#201C1A;border-top:1px solid rgba(245,239,230,0.08);">
                  <p style="margin:0;color:rgba(245,239,230,0.3);font-size:11px;letter-spacing:0.05em;text-align:center;">
                    Fortywell System Notification · Automatic Alert
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [adminEmail],
      replyTo: email,
      subject: `✦ New Fortywell Sign-Up — ${name || email}`,
      html,
    });

    if (error) {
      console.error('[Resend Signup Alert Error]:', error);
      return { success: false, error };
    }

    return { success: true, id: data?.id };
  } catch (err: any) {
    console.error('[Resend Signup Alert Exception]:', err);
    return { success: false, error: err.message };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. PURCHASE NOTIFICATION (PAYPAL / CARD STORE ORDERS)
// ─────────────────────────────────────────────────────────────────────────────

export interface PurchaseAlertParams {
  orderId: string;
  amount: string | number;
  currency?: string;
  productName?: string;
  productId?: string;
  customerEmail?: string;
  customerName?: string;
  provider?: 'PayPal' | 'Credit Card' | 'Stripe' | string;
  shippingAddress?: {
    recipientName?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  details?: Record<string, any>;
}

export async function sendPurchaseAlert(params: PurchaseAlertParams) {
  const resend = getResendClient();
  if (!resend) {
    console.warn('[Notifications] Skipping purchase email — Resend not initialized');
    return { success: false, error: 'Resend API key missing' };
  }

  const {
    orderId,
    amount,
    currency = 'USD',
    productName = 'Store Purchase',
    productId,
    customerEmail,
    customerName,
    provider = 'PayPal / Card',
    shippingAddress,
    details,
  } = params;

  const adminEmail = getAdminNotificationEmail();
  const timestamp = getFormattedTimestamp();
  const formattedAmount = typeof amount === 'number' ? `$${amount.toFixed(2)}` : `$${amount}`;

  const aliExpress = details?.aliExpress as
    | {
        productId?: string;
        orderId?: string;
        success?: boolean;
        error?: string;
        payLink?: string;
      }
    | undefined;

  const aliExpressHtml = aliExpress
    ? aliExpress.success
      ? `
      <tr>
        <td style="padding:0 0 20px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#1B2317;border-radius:10px;padding:20px;border:1px solid rgba(146,169,117,0.35);">
            <tr>
              <td>
                <span style="display:inline-block;background:rgba(146,169,117,0.2);color:#A8BD8D;padding:4px 10px;border-radius:16px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">
                  ⚡ AliExpress Order Auto-Placed
                </span>
                <p style="margin:12px 0 4px;color:#F5EFE6;font-size:16px;font-weight:600;">
                  AliExpress Order: <span style="font-family:monospace;color:#A8BD8D;">#${aliExpress.orderId || 'Placed'}</span>
                </p>
                <p style="margin:0 0 14px;color:rgba(245,239,230,0.7);font-size:13px;line-height:1.45;">
                  The buyer's shipping address was automatically sent to AliExpress. The order is placed and waiting for you to complete payment.
                </p>
                <a href="${aliExpress.payLink || `https://trade.aliexpress.com/order_detail.htm?orderId=${aliExpress.orderId}`}" target="_blank" style="display:inline-block;background:#92A975;color:#181514;padding:10px 22px;border-radius:8px;font-size:13px;font-weight:700;text-decoration:none;">
                  👉 Log in & Pay on AliExpress
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
      : `
      <tr>
        <td style="padding:0 0 20px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#2A1B1D;border-radius:10px;padding:18px 20px;border:1px solid rgba(208,120,135,0.35);">
            <tr>
              <td>
                <span style="display:inline-block;background:rgba(208,120,135,0.2);color:#E897A4;padding:4px 10px;border-radius:16px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">
                  ⚠️ AliExpress Auto-Order Notice
                </span>
                <p style="margin:10px 0 4px;color:#F5EFE6;font-size:15px;font-weight:600;">
                  AliExpress Order Needs Manual Attention
                </p>
                <p style="margin:0 0 12px;color:rgba(245,239,230,0.7);font-size:13px;line-height:1.45;">
                  ${aliExpress.error || 'Could not automatically place order.'}
                </p>
                ${aliExpress.productId ? `
                <a href="https://www.aliexpress.com/item/${aliExpress.productId}.html" target="_blank" style="display:inline-block;background:#D07887;color:#FFFFFF;padding:9px 18px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;">
                  Open Product on AliExpress →
                </a>` : ''}
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    : '';

  const addressString = shippingAddress
    ? [
        shippingAddress.recipientName,
        shippingAddress.line1,
        shippingAddress.line2,
        `${shippingAddress.city || ''}, ${shippingAddress.state || ''} ${shippingAddress.postalCode || ''}`.trim(),
        shippingAddress.country,
      ]
        .filter(Boolean)
        .join('<br />')
    : null;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>New Fortywell Order</title>
    </head>
    <body style="margin:0;padding:0;background:#181514;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#181514;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="580" cellpadding="0" cellspacing="0" style="background:#262220;border-radius:14px;overflow:hidden;border:1px solid rgba(245,239,230,0.1);box-shadow:0 8px 32px rgba(0,0,0,0.4);">
              
              <!-- Header -->
              <tr>
                <td style="padding:36px 40px 28px;background:#201C1A;border-bottom:1px solid rgba(245,239,230,0.08);">
                  <p style="margin:0 0 6px;color:#D07887;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;font-weight:700;">
                    🎉 NEW STORE PURCHASE
                  </p>
                  <h1 style="margin:0;color:#F5EFE6;font-size:26px;font-weight:700;letter-spacing:-0.02em;">
                    ${formattedAmount} ${currency} Received!
                  </h1>
                </td>
              </tr>

              <!-- Content Body -->
              <tr>
                <td style="padding:32px 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    
                    <!-- Product Purchased -->
                    <tr>
                      <td style="padding:0 0 20px;">
                        <p style="margin:0 0 4px;color:rgba(245,239,230,0.45);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">Product / Item</p>
                        <p style="margin:0;color:#F5EFE6;font-size:20px;font-weight:600;">${productName}</p>
                        ${productId ? `<p style="margin:4px 0 0;color:rgba(245,239,230,0.4);font-size:12px;">ID: ${productId}</p>` : ''}
                      </td>
                    </tr>

                    <!-- Customer Info -->
                    <tr>
                      <td style="padding:0 0 20px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="50%" valign="top">
                              <p style="margin:0 0 4px;color:rgba(245,239,230,0.45);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">Customer</p>
                              <p style="margin:0;color:#F5EFE6;font-size:15px;font-weight:500;">${customerName || 'Guest Buyer'}</p>
                            </td>
                            <td width="50%" valign="top">
                              <p style="margin:0 0 4px;color:rgba(245,239,230,0.45);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">Customer Email</p>
                              <p style="margin:0;">
                                ${customerEmail ? `<a href="mailto:${customerEmail}" style="color:#D07887;font-size:15px;font-weight:500;text-decoration:none;">${customerEmail}</a>` : '<span style="color:rgba(245,239,230,0.4);">Not captured</span>'}
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Order Details Box -->
                    <tr>
                      <td style="padding:0 0 20px;">
                        <table width="100%" cellpadding="0" cellspacing="0" style="background:#1C1917;border-radius:10px;padding:16px 20px;border:1px solid rgba(245,239,230,0.06);">
                          <tr>
                            <td width="50%" style="padding:4px 0;">
                              <p style="margin:0;color:rgba(245,239,230,0.45);font-size:12px;">Payment Method</p>
                              <p style="margin:2px 0 0;color:#F5EFE6;font-size:14px;font-weight:600;">💳 ${provider}</p>
                            </td>
                            <td width="50%" style="padding:4px 0;">
                              <p style="margin:0;color:rgba(245,239,230,0.45);font-size:12px;">Order ID</p>
                              <p style="margin:2px 0 0;color:#F5EFE6;font-size:13px;font-family:monospace;">${orderId}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Shipping Address (if available) -->
                    ${addressString ? `
                    <tr>
                      <td style="padding:0 0 20px;">
                        <p style="margin:0 0 6px;color:rgba(245,239,230,0.45);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">📦 Shipping Address</p>
                        <div style="background:#1C1917;border-radius:10px;padding:14px 18px;color:#F5EFE6;font-size:14px;line-height:1.5;border:1px solid rgba(245,239,230,0.06);">
                          ${addressString}
                        </div>
                      </td>
                    </tr>` : ''}

                    <!-- AliExpress Auto-Fulfillment Box (if AliExpress product) -->
                    ${aliExpressHtml}

                    <!-- Timestamp -->
                    <tr>
                      <td style="padding:16px 0 0;border-top:1px solid rgba(245,239,230,0.08);">
                        <p style="margin:0;color:rgba(245,239,230,0.4);font-size:12px;">
                          Processed at: ${timestamp}
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:18px 40px;background:#201C1A;border-top:1px solid rgba(245,239,230,0.08);">
                  <p style="margin:0;color:rgba(245,239,230,0.3);font-size:11px;letter-spacing:0.05em;text-align:center;">
                    Fortywell Commerce · Instant Notification
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const emailSubject = aliExpress?.success
    ? `🛍️ New Order: ${productName} (AliExpress Order #${aliExpress.orderId} Placed)`
    : `🎉 New FortyWell Purchase (${formattedAmount}) — ${productName}`;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [adminEmail],
      replyTo: customerEmail || undefined,
      subject: emailSubject,
      html,
    });

    if (error) {
      console.error('[Resend Purchase Alert Error]:', error);
      return { success: false, error };
    }

    return { success: true, id: data?.id };
  } catch (err: any) {
    console.error('[Resend Purchase Alert Exception]:', err);
    return { success: false, error: err.message };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. SUBSCRIPTION NOTIFICATION (LEMON SQUEEZY MEMBERSHIPS)
// ─────────────────────────────────────────────────────────────────────────────

export interface SubscriptionAlertParams {
  customerEmail: string;
  customerName?: string;
  plan: 'annual' | 'monthly' | string;
  amount?: string | number;
  status: string;
  subscriptionId?: string;
  customerId?: string;
  provider?: string;
  renewsAt?: string | null;
}

export async function sendSubscriptionAlert(params: SubscriptionAlertParams) {
  const resend = getResendClient();
  if (!resend) {
    console.warn('[Notifications] Skipping subscription email — Resend not initialized');
    return { success: false, error: 'Resend API key missing' };
  }

  const {
    customerEmail,
    customerName,
    plan,
    amount,
    status,
    subscriptionId,
    provider = 'Lemon Squeezy',
    renewsAt,
  } = params;

  const adminEmail = getAdminNotificationEmail();
  const timestamp = getFormattedTimestamp();
  const formattedPlan = plan.toUpperCase();
  const formattedAmount = amount ? (typeof amount === 'number' ? `$${amount.toFixed(2)}` : `$${amount}`) : (plan.toLowerCase().includes('annual') ? '$59.00/yr' : '$9.99/mo');

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>New Fortywell Subscription</title>
    </head>
    <body style="margin:0;padding:0;background:#181514;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#181514;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="580" cellpadding="0" cellspacing="0" style="background:#262220;border-radius:14px;overflow:hidden;border:1px solid rgba(245,239,230,0.1);box-shadow:0 8px 32px rgba(0,0,0,0.4);">
              
              <!-- Header -->
              <tr>
                <td style="padding:36px 40px 28px;background:#201C1A;border-bottom:1px solid rgba(245,239,230,0.08);">
                  <p style="margin:0 0 6px;color:#92A975;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;font-weight:700;">
                    👑 NEW PRO SUBSCRIBER
                  </p>
                  <h1 style="margin:0;color:#F5EFE6;font-size:26px;font-weight:700;letter-spacing:-0.02em;">
                    FortyWell Pro (${formattedPlan})
                  </h1>
                </td>
              </tr>

              <!-- Content Body -->
              <tr>
                <td style="padding:32px 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    
                    <!-- Subscriber Details -->
                    <tr>
                      <td style="padding:0 0 20px;">
                        <p style="margin:0 0 4px;color:rgba(245,239,230,0.45);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">Subscriber</p>
                        <p style="margin:0;color:#F5EFE6;font-size:18px;font-weight:600;">${customerName || 'FortyWell Member'}</p>
                        <p style="margin:4px 0 0;">
                          <a href="mailto:${customerEmail}" style="color:#92A975;font-size:16px;text-decoration:none;">${customerEmail}</a>
                        </p>
                      </td>
                    </tr>

                    <!-- Plan & Billing Box -->
                    <tr>
                      <td style="padding:0 0 20px;">
                        <table width="100%" cellpadding="0" cellspacing="0" style="background:#1C1917;border-radius:10px;padding:16px 20px;border:1px solid rgba(245,239,230,0.06);">
                          <tr>
                            <td width="33%" style="padding:4px 0;">
                              <p style="margin:0;color:rgba(245,239,230,0.45);font-size:11px;text-transform:uppercase;">Tier</p>
                              <p style="margin:2px 0 0;color:#F5EFE6;font-size:14px;font-weight:600;">${formattedPlan}</p>
                            </td>
                            <td width="33%" style="padding:4px 0;">
                              <p style="margin:0;color:rgba(245,239,230,0.45);font-size:11px;text-transform:uppercase;">Price</p>
                              <p style="margin:2px 0 0;color:#92A975;font-size:14px;font-weight:600;">${formattedAmount}</p>
                            </td>
                            <td width="33%" style="padding:4px 0;">
                              <p style="margin:0;color:rgba(245,239,230,0.45);font-size:11px;text-transform:uppercase;">Status</p>
                              <p style="margin:2px 0 0;color:#F5EFE6;font-size:14px;font-weight:600;">⚡ ${status.toUpperCase()}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Additional Details -->
                    <tr>
                      <td style="padding:0 0 20px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="50%" valign="top">
                              <p style="margin:0 0 4px;color:rgba(245,239,230,0.45);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">Provider</p>
                              <p style="margin:0;color:#F5EFE6;font-size:14px;">${provider}</p>
                            </td>
                            <td width="50%" valign="top">
                              <p style="margin:0 0 4px;color:rgba(245,239,230,0.45);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">Subscription ID</p>
                              <p style="margin:0;color:rgba(245,239,230,0.7);font-size:13px;font-family:monospace;">${subscriptionId || 'N/A'}</p>
                            </td>
                          </tr>
                          ${renewsAt ? `
                          <tr>
                            <td colspan="2" style="padding:12px 0 0;">
                              <p style="margin:0 0 4px;color:rgba(245,239,230,0.45);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">Next Renewal Date</p>
                              <p style="margin:0;color:#F5EFE6;font-size:14px;">${new Date(renewsAt).toLocaleDateString('en-GB', { dateStyle: 'long' })}</p>
                            </td>
                          </tr>` : ''}
                        </table>
                      </td>
                    </tr>

                    <!-- Timestamp -->
                    <tr>
                      <td style="padding:16px 0 0;border-top:1px solid rgba(245,239,230,0.08);">
                        <p style="margin:0;color:rgba(245,239,230,0.4);font-size:12px;">
                          Processed at: ${timestamp}
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:18px 40px;background:#201C1A;border-top:1px solid rgba(245,239,230,0.08);">
                  <p style="margin:0;color:rgba(245,239,230,0.3);font-size:11px;letter-spacing:0.05em;text-align:center;">
                    Fortywell Membership Subscriptions
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [adminEmail],
      replyTo: customerEmail,
      subject: `👑 New FortyWell Subscription (${formattedPlan}) — ${customerName || customerEmail}`,
      html,
    });

    if (error) {
      console.error('[Resend Subscription Alert Error]:', error);
      return { success: false, error };
    }

    return { success: true, id: data?.id };
  } catch (err: any) {
    console.error('[Resend Subscription Alert Exception]:', err);
    return { success: false, error: err.message };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. LEAD MAGNET NOTIFICATIONS (FREE PDF GUIDES)
// ─────────────────────────────────────────────────────────────────────────────

export interface LeadMagnetParams {
  email: string;
  guideTitle?: string;
  guideId?: string;
}

export async function sendLeadMagnetEmail(params: LeadMagnetParams) {
  const resend = getResendClient();
  if (!resend) {
    console.warn('[Notifications] Skipping subscriber guide email — Resend not initialized');
    return { success: false, error: 'Resend API key missing' };
  }

  const { email, guideTitle = "5 Signs Your Body's Changing After 40" } = params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fortywell-app.vercel.app';

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Your FortyWell Guides</title>
    </head>
    <body style="margin:0;padding:0;background:#181514;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#181514;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="580" cellpadding="0" cellspacing="0" style="background:#262220;border-radius:14px;overflow:hidden;border:1px solid rgba(245,239,230,0.1);box-shadow:0 8px 32px rgba(0,0,0,0.4);">
              
              <!-- Header -->
              <tr>
                <td style="padding:36px 40px 28px;background:#201C1A;border-bottom:1px solid rgba(245,239,230,0.08);">
                  <p style="margin:0 0 6px;color:#92A975;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;font-weight:700;">
                    FORTYWELL CLINICAL GUIDANCE
                  </p>
                  <h1 style="margin:0;color:#F5EFE6;font-size:24px;font-weight:600;letter-spacing:-0.02em;">
                    Your Free Guides Are Ready
                  </h1>
                </td>
              </tr>

              <!-- Content Body -->
              <tr>
                <td style="padding:32px 40px;">
                  <p style="margin:0 0 20px;color:rgba(245,239,230,0.85);font-size:15px;line-height:1.6;">
                    Hello,<br/><br/>
                    Thank you for requesting <strong>${guideTitle}</strong>. As promised, here are your instant downloads. You have access to all three of our clinical and lifestyle guides below:
                  </p>

                  <!-- Guide 1 Card -->
                  <div style="background:#1C1917;border-radius:10px;padding:18px 20px;margin-bottom:16px;border:1px solid rgba(245,239,230,0.08);">
                    <span style="display:inline-block;background:rgba(201,99,116,0.18);color:#E897A4;padding:3px 8px;border-radius:12px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:6px;">
                      Guide 01 · 3-Min Read
                    </span>
                    <h3 style="margin:0 0 6px;color:#F5EFE6;font-size:17px;font-weight:600;">
                      5 Signs Your Body Is Changing After 40
                    </h3>
                    <p style="margin:0 0 14px;color:rgba(245,239,230,0.65);font-size:13px;line-height:1.45;">
                      Why traditional workouts stop working, the 3 AM cortisol wake-up, and fluid pooling in your lower legs.
                    </p>
                    <a href="${baseUrl}/guides/5-signs-body-changing-after-40.pdf" target="_blank" style="display:inline-block;background:#92A975;color:#181514;padding:8px 18px;border-radius:6px;font-size:12px;font-weight:700;text-decoration:none;">
                      Download Guide 01 (PDF) →
                    </a>
                  </div>

                  <!-- Guide 2 Card -->
                  <div style="background:#1C1917;border-radius:10px;padding:18px 20px;margin-bottom:16px;border:1px solid rgba(245,239,230,0.08);">
                    <span style="display:inline-block;background:rgba(146,169,117,0.18);color:#A8BD8D;padding:3px 8px;border-radius:12px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:6px;">
                      Guide 02 · Clinical Q&amp;A
                    </span>
                    <h3 style="margin:0 0 6px;color:#F5EFE6;font-size:17px;font-weight:600;">
                      Questions &amp; Clinical Guidance for Women After 40
                    </h3>
                    <p style="margin:0 0 14px;color:rgba(245,239,230,0.65);font-size:13px;line-height:1.45;">
                      Straightforward medical answers: perimenopause vs stress, why cardio stops working, and the single highest-impact 10-minute habit.
                    </p>
                    <a href="${baseUrl}/guides/questions-and-clinical-guidance-after-40.pdf" target="_blank" style="display:inline-block;background:#92A975;color:#181514;padding:8px 18px;border-radius:6px;font-size:12px;font-weight:700;text-decoration:none;">
                      Download Guide 02 (PDF) →
                    </a>
                  </div>

                  <!-- Guide 3 Card -->
                  <div style="background:#1C1917;border-radius:10px;padding:18px 20px;margin-bottom:24px;border:1px solid rgba(245,239,230,0.08);">
                    <span style="display:inline-block;background:rgba(209,167,140,0.18);color:#D1A78C;padding:3px 8px;border-radius:12px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:6px;">
                      Guide 03 · Printable Checklist
                    </span>
                    <h3 style="margin:0 0 6px;color:#F5EFE6;font-size:17px;font-weight:600;">
                      The Over-40 Daily Rhythm: 3 Simple Micro-Habits
                    </h3>
                    <p style="margin:0 0 14px;color:rgba(245,239,230,0.65);font-size:13px;line-height:1.45;">
                      Low-effort shifts under 10 minutes total, plus a printable 7-day tracker for your fridge or nightstand.
                    </p>
                    <a href="${baseUrl}/guides/over-40-daily-rhythm-cortisol-reset.pdf" target="_blank" style="display:inline-block;background:#92A975;color:#181514;padding:8px 18px;border-radius:6px;font-size:12px;font-weight:700;text-decoration:none;">
                      Download Guide 03 (PDF) →
                    </a>
                  </div>

                  <!-- Closing Callout -->
                  <p style="margin:0;color:rgba(245,239,230,0.6);font-size:13px;line-height:1.5;">
                    Keep these files saved on your phone or computer. When you're ready for daily personalized, zero-equipment somatic sessions, visit us anytime at <a href="${baseUrl}" style="color:#92A975;text-decoration:none;">fortywell.com</a>.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:18px 40px;background:#201C1A;border-top:1px solid rgba(245,239,230,0.08);">
                  <p style="margin:0;color:rgba(245,239,230,0.3);font-size:11px;letter-spacing:0.05em;text-align:center;">
                    FortyWell · Evidence-informed movement for women over 40
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: `✦ Your Free FortyWell Guides Are Ready (Instant Download)`,
      html,
    });

    if (error) {
      console.error('[Resend Lead Magnet Error]:', error);
      return { success: false, error };
    }

    return { success: true, id: data?.id };
  } catch (err: any) {
    console.error('[Resend Lead Magnet Exception]:', err);
    return { success: false, error: err.message };
  }
}

export async function sendLeadMagnetAdminAlert(params: LeadMagnetParams) {
  const resend = getResendClient();
  if (!resend) return { success: false };

  const { email, guideTitle = "5 Signs Your Body's Changing After 40" } = params;
  const adminEmail = getAdminNotificationEmail();
  const timestamp = getFormattedTimestamp();

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8" /><title>New Lead Magnet Download</title></head>
    <body style="background:#181514;font-family:sans-serif;color:#F5EFE6;padding:30px 20px;">
      <div style="max-width:500px;margin:0 auto;background:#262220;border-radius:12px;padding:28px 32px;border:1px solid rgba(245,239,230,0.1);">
        <p style="color:#92A975;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;margin:0 0 6px;">
          ✦ NEW LEAD MAGNET DOWNLOAD
        </p>
        <h2 style="margin:0 0 16px;color:#F5EFE6;font-size:20px;">
          ${guideTitle}
        </h2>
        <p style="margin:0 0 8px;font-size:14px;color:rgba(245,239,230,0.7);">
          Subscriber Email: <strong style="color:#92A975;">${email}</strong>
        </p>
        <p style="margin:0;font-size:12px;color:rgba(245,239,230,0.4);">
          Captured at: ${timestamp} · Source: Lead Magnet Section
        </p>
      </div>
    </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [adminEmail],
      replyTo: email,
      subject: `✦ New FortyWell Lead: ${email} (${guideTitle})`,
      html,
    });
    return { success: true };
  } catch (err) {
    console.error('[Resend Lead Magnet Admin Alert Exception]:', err);
    return { success: false };
  }
}
