import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Missing code parameter' }, { status: 400 });
  }

  try {
    const res = await fetch('https://oauth.aliexpress.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: process.env.ALIEXPRESS_APP_KEY!,
        client_secret: process.env.ALIEXPRESS_APP_SECRET!,
        redirect_uri: process.env.ALIEXPRESS_REDIRECT_URI!,
        sp: 'ae',
      }),
    });

    const tokenData = await res.json();

    if (tokenData.error) {
      return NextResponse.json({ error: tokenData }, { status: 400 });
    }

    // TODO: Write tokenData.access_token & tokenData.refresh_token to your database (e.g. Supabase / Prisma)

    return NextResponse.json({
      success: true,
      message: 'Tokens acquired successfully!',
      tokens: tokenData,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to exchange token', details: err }, { status: 500 });
  }
}
