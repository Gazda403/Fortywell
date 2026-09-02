import { NextRequest, NextResponse } from 'next/server';
import { saveAliExpressTokens } from '@/lib/aliexpress/tokenStore';
import { AliExpressOAuthTokenResponse } from '@/types/aliexpress';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get('code');
    const errorParam = searchParams.get('error') || searchParams.get('error_description');

    if (errorParam) {
      return NextResponse.json(
        { error: 'AliExpress OAuth authorization failed or was rejected.', details: errorParam },
        { status: 400 }
      );
    }

    if (!code) {
      return NextResponse.json(
        { error: 'Missing required "code" parameter in OAuth callback.' },
        { status: 400 }
      );
    }

    const appKey = process.env.ALIEXPRESS_APP_KEY;
    const appSecret = process.env.ALIEXPRESS_APP_SECRET;
    const redirectUri =
      process.env.ALIEXPRESS_REDIRECT_URI ||
      'https://fortywell-app.vercel.app/api/aliexpress/callback';

    if (!appKey || !appSecret) {
      return NextResponse.json(
        { error: 'AliExpress APP_KEY or APP_SECRET not set in environment.' },
        { status: 500 }
      );
    }

    // Exchange auth code for access_token & refresh_token
    const tokenUrl = 'https://oauth.aliexpress.com/token';
    const bodyParams = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      client_id: appKey,
      client_secret: appSecret,
      redirect_uri: redirectUri,
      sp: 'ae',
    });

    const tokenRes = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: bodyParams.toString(),
      cache: 'no-store',
    });

    const tokenData: AliExpressOAuthTokenResponse = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.access_token) {
      console.error('AliExpress Token Exchange Error:', tokenData);
      return NextResponse.json(
        {
          error: 'Failed to exchange authorization code for access token.',
          details: tokenData,
        },
        { status: 400 }
      );
    }

    // Save tokens in tokenStore (in-memory + Supabase)
    const savedRecord = await saveAliExpressTokens(tokenData);

    return NextResponse.json({
      success: true,
      message: 'AliExpress OAuth 2.0 authentication completed successfully.',
      data: {
        userId: savedRecord.userId,
        account: savedRecord.account,
        expiresAt: new Date(savedRecord.expiresAt).toISOString(),
        refreshTokenExpiresAt: savedRecord.refreshTokenExpiresAt
          ? new Date(savedRecord.refreshTokenExpiresAt).toISOString()
          : null,
      },
    });
  } catch (err: any) {
    console.error('AliExpress callback exception:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error during token exchange' },
      { status: 500 }
    );
  }
}
