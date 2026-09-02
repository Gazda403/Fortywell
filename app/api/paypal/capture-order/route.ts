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
    const { orderID } = body;

    if (!orderID) {
      return NextResponse.json(
        { error: 'Missing required orderID parameter' },
        { status: 400, headers: getCorsHeaders() }
      );
    }

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
      console.error('PayPal OAuth Token Error in Capture:', errText);
      return NextResponse.json(
        { error: 'Failed to authenticate with PayPal', details: errText },
        { status: tokenRes.status, headers: getCorsHeaders() }
      );
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // 2. Capture the Order
    const captureRes = await fetch(`${baseUrl}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const captureData = await captureRes.json();

    if (!captureRes.ok) {
      console.error('PayPal Order Capture Error:', captureData);
      return NextResponse.json(
        { error: 'Failed to capture PayPal order', details: captureData },
        { status: captureRes.status, headers: getCorsHeaders() }
      );
    }

    return NextResponse.json(captureData, { headers: getCorsHeaders() });
  } catch (err: any) {
    console.error('PayPal capture-order server exception:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500, headers: getCorsHeaders() }
    );
  }
}
