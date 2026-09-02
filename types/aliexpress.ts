/**
 * AliExpress Open Platform TypeScript Definitions
 */

// ── 1. OAuth 2.0 Types ──
export interface AliExpressOAuthTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number; // Duration in seconds
  expire_time?: number; // Epoch timestamp (ms)
  refresh_token_valid_time?: number;
  user_id?: string;
  user_nick?: string;
  account?: string;
  account_platform?: string;
  sp?: string;
  code?: string;
  msg?: string;
  sub_code?: string;
  sub_msg?: string;
}

export interface AliExpressTokenData {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // Unix timestamp in ms
  refreshTokenExpiresAt?: number;
  userId?: string;
  account?: string;
  updatedAt: string;
}

// ── 2. Common API Request / Response Wrappers ──
export interface AliExpressCommonParams {
  method: string;
  app_key: string;
  session?: string;
  timestamp: string;
  format?: 'json' | 'xml';
  v?: string;
  sign_method?: 'sha256' | 'hmac-sha256' | 'md5';
  simplify?: boolean;
}

export interface AliExpressApiResponse<T = any> {
  aliexpress_ds_product_get_response?: T;
  aliexpress_solution_order_create_response?: T;
  error_response?: {
    code: number | string;
    msg: string;
    sub_code?: string;
    sub_msg?: string;
    request_id?: string;
  };
  [key: string]: any;
}

// ── 3. Product Synchronization Types (aliexpress.ds.product.get) ──
export interface AliExpressProductRequest {
  productId: string;
  shipToCountry?: string; // Default: 'US'
  targetCurrency?: string; // Default: 'USD'
  targetLanguage?: string; // Default: 'EN'
  accessToken?: string;
}

export interface AliExpressSkuPrice {
  sku_id: string;
  sku_attr?: string;
  sku_price: string;
  discount_price?: string;
  sku_stock: boolean;
  sku_available_stock?: number;
  sku_code?: string;
  currency_code?: string;
}

export interface AliExpressProductData {
  product_id: string | number;
  subject: string; // Product title
  category_id: number;
  product_status_type?: string;
  product_unit?: number;
  ws_offline_date?: string;
  item_offer_site_sale_price?: string;
  target_original_price?: string;
  target_sale_price?: string;
  target_sale_price_currency?: string;
  product_main_image_url?: string;
  product_small_image_urls?: {
    string: string[];
  };
  aeop_ae_product_s_k_us?: {
    aeop_ae_product_sku: AliExpressSkuPrice[];
  };
  aeop_ae_product_propertys?: {
    aeop_ae_product_property: Array<{
      attr_name: string;
      attr_value: string;
    }>;
  };
  detail?: string;
}

// ── 4. Order Creation Types (aliexpress.solution.order.create) ──
export interface LogisticsAddress {
  contact_person: string;
  full_name?: string;
  address: string;
  address2?: string;
  city: string;
  province?: string; // State / Province
  zip: string; // Postal Code
  country: string; // ISO 2-letter Country Code e.g. "US"
  mobile_no?: string;
  phone_country?: string; // Country calling code e.g. "+1"
  email?: string;
}

export interface ProductItem {
  product_id: number | string;
  product_count: number;
  sku_attr?: string;
  logistics_service_name?: string; // e.g. "CAINIAO_STANDARD" or "EMS"
  order_memo?: string;
}

export interface AliExpressOrderCreateRequest {
  logistics_address: LogisticsAddress;
  product_items: ProductItem[];
  out_order_id?: string; // Merchant internal order ID (e.g. "FORTYWELL-ORD-12345")
  access_token?: string;
}

export interface AliExpressOrderCreateResponse {
  result?: {
    order_list?: {
      number: Array<string | number>;
    };
    is_success?: boolean;
    error_code?: string;
    error_message?: string;
  };
}
