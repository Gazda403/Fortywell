import { NextResponse } from 'next/server';
import { generateSignature } from '@/lib/aliexpress/signer';

export async function POST(req: Request) {
  try {
    const { productId, accessToken } = await req.json();

    if (!productId || !accessToken) {
      return NextResponse.json(
        { error: 'productId and accessToken are required' },
        { status: 400 }
      );
    }

    const appKey = process.env.ALIEXPRESS_APP_KEY!;
    const appSecret = process.env.ALIEXPRESS_APP_SECRET!;
    const apiPath = '/aliexpress/ds/product/get';
    const timestamp = Date.now().toString();

    const params: Record<string, string> = {
      app_key: appKey,
      access_token: accessToken,
      timestamp,
      sign_method: 'sha256',
      product_id: productId,
    };

    const sign = generateSignature(apiPath, params, appSecret);

    const response = await fetch(`https://api-sg.aliexpress.com/sync${apiPath}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ ...params, sign }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product', details: error }, { status: 500 });
  }
}
