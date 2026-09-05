import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL =
  process.env.ADMIN_NOTIFICATION_EMAIL ||
  process.env.NOTIFICATION_EMAIL ||
  process.env.COACHING_NOTIFICATION_EMAIL ||
  'fortywell.team@gmail.com';

// CORS headers to allow requests from the mobile app (Expo / Web)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phoneOrHandle,
      messagingApp = 'WhatsApp',
      notes = '',
      userId,
    } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const submittedAt = new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/Belgrade',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    const appName = String(messagingApp).toUpperCase();

    // Send notification email to admin via Resend
    const { error: emailError, data: emailData } = await resend.emails.send({
      from: 'Fortywell Coaching <onboarding@resend.dev>',
      to: [TO_EMAIL],
      replyTo: email,
      subject: `👑 New 1:1 Text Coaching Request (${appName}) — ${name || email}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>New 1:1 Text Coaching Request</title>
        </head>
        <body style="margin:0;padding:0;background:#EDE3D5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#EDE3D5;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="580" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(42,35,32,0.08);border:1px solid rgba(101,78,60,0.12);">
                  
                  <!-- Top Banner -->
                  <tr>
                    <td style="background:#2A1F1B;padding:36px 40px;text-align:left;">
                      <p style="margin:0 0 6px;color:#D07887;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;">
                        1:1 VIP EXPERT CARE · $55/MO
                      </p>
                      <h1 style="margin:0;color:#F5EFE6;font-size:24px;font-weight:700;line-height:1.2;">
                        New Daily Text Coach Client ✦
                      </h1>
                    </td>
                  </tr>

                  <!-- Details Card -->
                  <tr>
                    <td style="padding:32px 40px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        
                        <!-- Client Name -->
                        <tr>
                          <td style="padding:0 0 16px;">
                            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#9A8E86;font-weight:600;">Client Name</p>
                            <p style="margin:0;font-size:16px;color:#2A2320;font-weight:600;">${name || 'Not provided'}</p>
                          </td>
                        </tr>

                        <!-- Client Email -->
                        <tr>
                          <td style="padding:0 0 16px;">
                            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#9A8E86;font-weight:600;">Email Address</p>
                            <p style="margin:0;font-size:16px;color:#2A2320;">
                              <a href="mailto:${email}" style="color:#C96374;text-decoration:none;font-weight:600;">${email}</a>
                            </p>
                          </td>
                        </tr>

                        <!-- Preferred Messaging App -->
                        <tr>
                          <td style="padding:0 0 16px;">
                            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#9A8E86;font-weight:600;">Preferred Messaging App</p>
                            <span style="display:inline-block;background:rgba(146,169,117,0.18);color:#708655;font-weight:700;padding:6px 14px;border-radius:20px;font-size:13px;border:1px solid rgba(146,169,117,0.35);">
                              📱 ${appName}
                            </span>
                          </td>
                        </tr>

                        <!-- Phone / Handle -->
                        <tr>
                          <td style="padding:0 0 16px;">
                            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#9A8E86;font-weight:600;">Phone / Handle on ${appName}</p>
                            <p style="margin:0;font-size:16px;color:#2A2320;font-weight:700;background:#F7F0E6;padding:10px 14px;border-radius:8px;border:1px solid rgba(101,78,60,0.1);">
                              ${phoneOrHandle || 'Not provided yet'}
                            </p>
                          </td>
                        </tr>

                        <!-- Goals & Focus Notes -->
                        ${notes ? `
                        <tr>
                          <td style="padding:0 0 16px;">
                            <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#9A8E86;font-weight:600;">Goals & Notes</p>
                            <p style="margin:0;font-size:14px;color:#5A4F48;line-height:1.6;background:#F7F0E6;padding:12px 14px;border-radius:8px;border:1px solid rgba(101,78,60,0.1);">
                              ${notes}
                            </p>
                          </td>
                        </tr>` : ''}

                        <!-- Timestamp -->
                        <tr>
                          <td style="padding:16px 0 0;border-top:1px solid rgba(101,78,60,0.1);">
                            <p style="margin:0;font-size:12px;color:#9A8E86;">
                              Received: ${submittedAt} ${userId ? `• User ID: ${userId}` : ''}
                            </p>
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>

                  <!-- Footer CTA -->
                  <tr>
                    <td style="background:#F7F0E6;padding:20px 40px;text-align:center;border-top:1px solid rgba(101,78,60,0.1);">
                      <p style="margin:0;font-size:13px;color:#5A4F48;">
                        Reach out to <strong>${name || email}</strong> on <strong>${appName}</strong> to begin daily protocol check-ups.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (emailError) {
      console.error('[Coaching Lead Resend Error]:', emailError);
      return NextResponse.json(
        { error: 'Failed to send notification email', details: emailError },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Coaching lead submitted successfully', id: emailData?.id },
      { headers: corsHeaders }
    );
  } catch (err: any) {
    console.error('[Coaching Lead API Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
