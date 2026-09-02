import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const appKey = process.env.ALIEXPRESS_APP_KEY;
  const redirectUri =
    process.env.ALIEXPRESS_REDIRECT_URI ||
    'https://fortywell-app.vercel.app/api/aliexpress/callback';

  if (!appKey) {
    return NextResponse.json(
      { error: 'ALIEXPRESS_APP_KEY is not configured in environment variables.' },
      { status: 500 }
    );
  }

  // Construct AliExpress OAuth 2.0 Authorization URL
  const authUrl = new URL('https://oauth.aliexpress.com/authorize');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('force_auth', 'true');
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('client_id', appKey);
  authUrl.searchParams.set('sp', 'ae');

  // If user requested direct browser redirect
  const shouldRedirect = req.nextUrl.searchParams.get('redirect') === 'true';
  if (shouldRedirect) {
    return NextResponse.redirect(authUrl.toString());
  }

  return NextResponse.json({
    authUrl: authUrl.toString(),
    appKey,
    redirectUri,
  });
}
