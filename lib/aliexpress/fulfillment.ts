import { callAliExpressApi } from './client';

export interface FulfillmentShippingAddress {
  recipientName?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  email?: string;
}

export interface AutoFulfillParams {
  aliExpressProductId: string;
  quantity?: number;
  skuAttr?: string;
  shippingAddress: FulfillmentShippingAddress;
  outOrderId?: string;
  logisticsService?: string;
}

export interface FulfillmentResult {
  success: boolean;
  aliExpressOrderId?: string;
  tradeId?: string;
  raw?: any;
  error?: string;
}

/**
 * Automatically places an AliExpress dropshipping order after a successful PayPal payment.
 * The AliExpress order will appear in your account dashboard ready to pay.
 *
 * @param params - Product ID, quantity, shipping address, and optional logistics service
 * @returns The AliExpress order ID and result
 */
export async function autoFulfillAliExpressOrder(
  params: AutoFulfillParams
): Promise<FulfillmentResult> {
  const {
    aliExpressProductId,
    quantity = 1,
    skuAttr = '',
    shippingAddress,
    outOrderId,
    logisticsService = 'CAINIAO_STANDARD',
  } = params;

  if (!shippingAddress.line1 || !shippingAddress.city || !shippingAddress.country) {
    return {
      success: false,
      error: 'Incomplete shipping address — missing street, city, or country.',
    };
  }

  const contactPerson =
    shippingAddress.recipientName ||
    shippingAddress.email?.split('@')[0] ||
    'Customer';

  const placeOrderDto = {
    logistics_address: {
      contact_person: contactPerson,
      full_name: contactPerson,
      address: shippingAddress.line1,
      address2: shippingAddress.line2 || '',
      city: shippingAddress.city,
      province: shippingAddress.state || shippingAddress.city,
      zip: shippingAddress.postalCode || '00000',
      country: (shippingAddress.country || 'US').toUpperCase(),
      mobile_no: shippingAddress.phone || '',
      phone_country: '+1',
      email: shippingAddress.email || '',
    },
    product_items: [
      {
        product_id: Number(aliExpressProductId),
        product_count: quantity,
        sku_attr: skuAttr,
        logistics_service_name: logisticsService,
        order_memo: `FortyWell auto-fulfillment — ${outOrderId || 'FW order'}`,
      },
    ],
    out_order_id: outOrderId || `FW-${Date.now()}`,
  };

  try {
    const response = await callAliExpressApi({
      method: 'aliexpress.solution.order.create',
      params: {
        param_place_order_request4_open_api_d_t_o: JSON.stringify(placeOrderDto),
      },
      signMethod: 'sha256',
    });

    const result =
      response.aliexpress_solution_order_create_response?.result ||
      response.aliexpress_solution_order_create_response ||
      response;

    const orderId =
      result?.order_list?.number?.[0] ||
      result?.trade_id ||
      result?.order_id ||
      result?.orderId;

    if (result?.is_success === false || result?.error_code) {
      return {
        success: false,
        raw: result,
        error: result?.error_msg || result?.error_code || 'AliExpress order creation failed.',
      };
    }

    return {
      success: true,
      aliExpressOrderId: String(orderId || ''),
      tradeId: String(result?.trade_id || ''),
      raw: result,
    };
  } catch (err: any) {
    console.error('[AliExpress Fulfillment] Order placement failed:', err.message);
    return {
      success: false,
      error: err.message || 'Unexpected error during AliExpress order placement.',
    };
  }
}
