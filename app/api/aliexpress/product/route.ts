import { NextRequest, NextResponse } from 'next/server';
import { callAliExpressApi } from '@/lib/aliexpress/client';
import { AliExpressProductRequest } from '@/types/aliexpress';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const productId = searchParams.get('productId') || searchParams.get('product_id');

    if (!productId) {
      return NextResponse.json(
        { error: 'Missing required "productId" parameter.' },
        { status: 400 }
      );
    }

    const shipToCountry = searchParams.get('shipToCountry') || searchParams.get('country') || 'US';
    const targetCurrency = searchParams.get('targetCurrency') || searchParams.get('currency') || 'USD';
    const targetLanguage = searchParams.get('targetLanguage') || searchParams.get('language') || 'EN';
    const session = searchParams.get('accessToken') || searchParams.get('session') || undefined;

    return await fetchProductDetails({
      productId,
      shipToCountry,
      targetCurrency,
      targetLanguage,
      accessToken: session,
    });
  } catch (err: any) {
    console.error('Error in GET /api/aliexpress/product:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: AliExpressProductRequest = await req.json().catch(() => ({}));
    const { productId, shipToCountry = 'US', targetCurrency = 'USD', targetLanguage = 'EN', accessToken } = body;

    if (!productId) {
      return NextResponse.json(
        { error: 'Missing required "productId" in request body.' },
        { status: 400 }
      );
    }

    return await fetchProductDetails({
      productId,
      shipToCountry,
      targetCurrency,
      targetLanguage,
      accessToken,
    });
  } catch (err: any) {
    console.error('Error in POST /api/aliexpress/product:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

async function fetchProductDetails(params: AliExpressProductRequest) {
  const apiParams: Record<string, any> = {
    product_id: params.productId,
    ship_to_country: params.shipToCountry || 'US',
    target_currency: params.targetCurrency || 'USD',
    target_language: params.targetLanguage || 'EN',
  };

  const response = await callAliExpressApi({
    method: 'aliexpress.ds.product.get',
    params: apiParams,
    session: params.accessToken,
    signMethod: 'sha256',
  });

  const productData =
    response.aliexpress_ds_product_get_response?.result ||
    response.aliexpress_ds_product_get_response ||
    response;

  return NextResponse.json({
    success: true,
    data: productData,
  });
}
