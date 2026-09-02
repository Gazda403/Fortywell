import { generateSignature, formatTimestamp } from './signer';
import { getAliExpressTokens } from './tokenStore';
import { AliExpressApiResponse } from '@/types/aliexpress';

const DEFAULT_API_GATEWAY = process.env.ALIEXPRESS_API_GATEWAY || 'https://api-sg.aliexpress.com/sync';

export interface CallApiOptions {
  method: string;
  params?: Record<string, any>;
  session?: string;
  signMethod?: 'sha256' | 'hmac-sha256' | 'md5';
}

/**
 * Calls the AliExpress Open Platform API with automated timestamping, signing, and error handling.
 */
export async function callAliExpressApi<T = any>(
  options: CallApiOptions
): Promise<AliExpressApiResponse<T>> {
  const appKey = process.env.ALIEXPRESS_APP_KEY;
  const appSecret = process.env.ALIEXPRESS_APP_SECRET;

  if (!appKey || !appSecret) {
    throw new Error(
      'Missing ALIEXPRESS_APP_KEY or ALIEXPRESS_APP_SECRET in environment variables.'
    );
  }

  // Retrieve session token if not explicitly passed
  let session = options.session;
  if (!session) {
    const tokens = await getAliExpressTokens();
    if (tokens?.accessToken) {
      session = tokens.accessToken;
    }
  }

  const signMethod = options.signMethod || 'sha256';
  const timestamp = formatTimestamp(new Date());

  // 1. Construct system and business parameters
  const payload: Record<string, any> = {
    method: options.method,
    app_key: appKey,
    timestamp: timestamp,
    format: 'json',
    v: '2.0',
    sign_method: signMethod,
    ...(session ? { session } : {}),
    ...(options.params || {}),
  };

  // 2. Generate SHA-256 signature
  const sign = generateSignature(payload, appSecret, signMethod);
  payload.sign = sign;

  // 3. Post to AliExpress Gateway
  const endpoint = DEFAULT_API_GATEWAY;

  // AliExpress standard POST requires x-www-form-urlencoded format for parameters
  const formData = new URLSearchParams();
  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined && value !== null) {
      formData.append(
        key,
        typeof value === 'object' ? JSON.stringify(value) : String(value)
      );
    }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: formData.toString(),
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok || result.error_response) {
      const err = result.error_response || {};
      console.error('AliExpress API Error Response:', {
        status: response.status,
        method: options.method,
        error: err,
      });
      throw new Error(
        err.sub_msg || err.msg || `AliExpress API call to ${options.method} failed.`
      );
    }

    return result as AliExpressApiResponse<T>;
  } catch (err: any) {
    console.error(`AliExpress request exception [${options.method}]:`, err.message);
    throw err;
  }
}
