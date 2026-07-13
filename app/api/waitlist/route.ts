import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = 'fortywell.team@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, source = 'Website' } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const submittedAt = new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/Belgrade',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    const { error } = await resend.emails.send({
      from: 'Fortywell Waitlist <onboarding@resend.dev>',
      to: [TO_EMAIL],
      subject: `✦ New Waitlist Sign-Up — ${name || email}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>New Fortywell Waitlist Sign-Up</title>
        </head>
        <body style="margin:0;padding:0;background:#F5EFE6;font-family:'Georgia',serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EFE6;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background:#3A3532;border-radius:2px;overflow:hidden;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding:40px 48px 32px;border-bottom:1px solid rgba(245,239,230,0.08);">
                      <p style="margin:0 0 8px;color:#92A975;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;font-family:sans-serif;">
                        Fortywell
                      </p>
                      <h1 style="margin:0;color:#F5EFE6;font-size:28px;font-weight:300;line-height:1.2;letter-spacing:-0.02em;">
                        New Waitlist Sign-Up ✦
                      </h1>
                    </td>
                  </tr>

                  <!-- Details -->
                  <tr>
                    <td style="padding:32px 48px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        
                        ${name ? `
                        <tr>
                          <td style="padding:0 0 20px;">
                            <p style="margin:0 0 4px;color:rgba(245,239,230,0.4);font-size:10px;letter-spacing:0.2em;text-transform:uppercase;font-family:sans-serif;">Name</p>
                            <p style="margin:0;color:#F5EFE6;font-size:18px;font-weight:300;">${name}</p>
                          </td>
                        </tr>
                        ` : ''}

                        <tr>
                          <td style="padding:0 0 20px;">
                            <p style="margin:0 0 4px;color:rgba(245,239,230,0.4);font-size:10px;letter-spacing:0.2em;text-transform:uppercase;font-family:sans-serif;">Email</p>
                            <p style="margin:0;">
                              <a href="mailto:${email}" style="color:#92A975;font-size:18px;font-weight:300;text-decoration:none;">${email}</a>
                            </p>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding:0 0 20px;">
                            <p style="margin:0 0 4px;color:rgba(245,239,230,0.4);font-size:10px;letter-spacing:0.2em;text-transform:uppercase;font-family:sans-serif;">Source</p>
                            <p style="margin:0;color:#F5EFE6;font-size:16px;font-weight:300;">${source}</p>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding:0;">
                            <p style="margin:0 0 4px;color:rgba(245,239,230,0.4);font-size:10px;letter-spacing:0.2em;text-transform:uppercase;font-family:sans-serif;">Submitted At</p>
                            <p style="margin:0;color:#F5EFE6;font-size:16px;font-weight:300;">${submittedAt}</p>
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>

                  <!-- Footer strip -->
                  <tr>
                    <td style="padding:20px 48px;border-top:1px solid rgba(245,239,230,0.08);">
                      <p style="margin:0;color:rgba(245,239,230,0.2);font-size:10px;letter-spacing:0.15em;font-family:sans-serif;text-transform:uppercase;">
                        © 2026 Fortywell · All rights reserved
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

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Waitlist API error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
