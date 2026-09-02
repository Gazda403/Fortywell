import { NextResponse } from 'next/server';
import { generateSignature } from '@/lib/aliexpress/signer';
import { saveAliExpressTokens } from '@/lib/aliexpress/tokenStore';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const errorParam = searchParams.get('error') || searchParams.get('error_description');

  if (errorParam) {
    return NextResponse.json(
      { error: 'AliExpress OAuth authorization failed', details: errorParam },
      { status: 400 }
    );
  }

  if (!code) {
    return NextResponse.json({ error: 'Missing code parameter' }, { status: 400 });
  }

  const appKey = process.env.ALIEXPRESS_APP_KEY;
  const appSecret = process.env.ALIEXPRESS_APP_SECRET;
  const redirectUri =
    process.env.ALIEXPRESS_REDIRECT_URI ||
    'https://fortywell-app.vercel.app/api/aliexpress/callback';

  if (!appKey || !appSecret) {
    return NextResponse.json(
      { error: 'Missing ALIEXPRESS_APP_KEY or ALIEXPRESS_APP_SECRET in environment' },
      { status: 500 }
    );
  }

  try {
    const apiPath = '/auth/token/create';
    const timestamp = Date.now().toString();

    // 1. Build sorted parameters for the Dropshipping API token exchange
    const params: Record<string, string> = {
      app_key: appKey,
      code,
      redirect_uri: redirectUri,
      sign_method: 'sha256',
      timestamp,
    };

    // 2. Compute HMAC-SHA256 signature
    const sign = generateSignature(apiPath, params, appSecret);

    // 3. Call the official AliExpress Dropshipping token creation endpoint
    const res = await fetch(`https://api-sg.aliexpress.com/rest${apiPath}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: new URLSearchParams({ ...params, sign }),
      cache: 'no-store',
    });

    const tokenData = await res.json();

    // Check if AliExpress returned an error
    if (tokenData.error_response || tokenData.error_msg || (tokenData.code && tokenData.code !== '0')) {
      console.error('AliExpress Token Error:', tokenData);
      return NextResponse.json({ error: 'AliExpress rejected token request', details: tokenData }, { status: 400 });
    }

    // Save tokens in tokenStore (in-memory + Supabase)
    if (tokenData.access_token) {
      await saveAliExpressTokens(tokenData);
    }

    return NextResponse.json({
      success: true,
      message: 'Tokens acquired and stored successfully!',
      tokens: tokenData,
    });
  } catch (err: any) {
    console.error('Failed to exchange AliExpress OAuth token:', err);
    return NextResponse.json(
      { error: 'Failed to exchange token', details: err?.message || err },
      { status: 500 }
    );
  }
}
