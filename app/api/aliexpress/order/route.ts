import { NextRequest, NextResponse } from 'next/server';
import { callAliExpressApi } from '@/lib/aliexpress/client';
import { AliExpressOrderCreateRequest } from '@/types/aliexpress';

export async function POST(req: NextRequest) {
  try {
    const body: AliExpressOrderCreateRequest = await req.json().catch(() => ({}));
    const { logistics_address, product_items, out_order_id, access_token } = body;

    // 1. Validation
    if (!logistics_address) {
      return NextResponse.json(
        { error: 'Missing required "logistics_address" in order payload.' },
        { status: 400 }
      );
    }

    const { contact_person, address, city, country, zip } = logistics_address;
    if (!contact_person || !address || !city || !country || !zip) {
      return NextResponse.json(
        {
          error:
            'Incomplete shipping address. Required fields: contact_person, address, city, country, zip.',
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(product_items) || product_items.length === 0) {
      return NextResponse.json(
        { error: 'Missing or empty "product_items" array in order payload.' },
        { status: 400 }
      );
    }

    for (const item of product_items) {
      if (!item.product_id || !item.product_count || item.product_count < 1) {
        return NextResponse.json(
          {
            error:
              'Invalid product item. Each item must have a valid product_id and product_count >= 1.',
          },
          { status: 400 }
        );
      }
    }

    // 2. Prepare place-order DTO structure for AliExpress Open Platform
    const placeOrderDto = {
      logistics_address: {
        contact_person: logistics_address.contact_person,
        full_name: logistics_address.full_name || logistics_address.contact_person,
        address: logistics_address.address,
        address2: logistics_address.address2 || '',
        city: logistics_address.city,
        province: logistics_address.province || logistics_address.city,
        zip: logistics_address.zip,
        country: logistics_address.country.toUpperCase(),
        mobile_no: logistics_address.mobile_no || '',
        phone_country: logistics_address.phone_country || '+1',
        email: logistics_address.email || '',
      },
      product_items: product_items.map((item) => ({
        product_id: Number(item.product_id),
        product_count: Number(item.product_count),
        sku_attr: item.sku_attr || '',
        logistics_service_name: item.logistics_service_name || 'CAINIAO_STANDARD',
        order_memo: item.order_memo || '',
      })),
      out_order_id: out_order_id || `FW-${Date.now()}`,
    };

    // 3. Dispatch to AliExpress solution order create API
    const response = await callAliExpressApi({
      method: 'aliexpress.solution.order.create',
      params: {
        param_place_order_request4_open_api_d_t_o: JSON.stringify(placeOrderDto),
      },
      session: access_token,
      signMethod: 'sha256',
    });

    const orderResult =
      response.aliexpress_solution_order_create_response?.result ||
      response.aliexpress_solution_order_create_response ||
      response;

    return NextResponse.json({
      success: true,
      data: orderResult,
      outOrderId: placeOrderDto.out_order_id,
    });
  } catch (err: any) {
    console.error('Error in POST /api/aliexpress/order:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error during order creation' },
      { status: 500 }
    );
  }
}
