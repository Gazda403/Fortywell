import crypto from 'crypto';

/**
 * Formats a Date object into AliExpress required timestamp string: "YYYY-MM-DD HH:mm:ss"
 * @param date Date object (defaults to current date/time)
 */
export function formatTimestamp(date: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Generates AliExpress request signature.
 * Supports both:
 * 1. REST/IOP endpoint signature: generateSignature(apiPath, params, secret)
 * 2. TOP protocol signature: generateSignature(params, secret, method?)
 */
export function generateSignature(
  apiPath: string,
  params: Record<string, any>,
  secret: string
): string;
export function generateSignature(
  params: Record<string, any>,
  secret: string,
  method?: 'sha256' | 'hmac-sha256' | 'md5'
): string;
export function generateSignature(
  arg1: string | Record<string, any>,
  arg2: Record<string, any> | string,
  arg3?: string
): string {
  // Mode 1: generateSignature(apiPath, params, secret)
  if (typeof arg1 === 'string') {
    const apiPath = arg1;
    const params = (arg2 as Record<string, any>) || {};
    const secret = arg3 || '';

    const sortedKeys = Object.keys(params).sort();
    let stringToSign = apiPath;
    for (const key of sortedKeys) {
      if (params[key] !== undefined && params[key] !== null) {
        stringToSign += `${key}${params[key]}`;
      }
    }

    return crypto
      .createHmac('sha256', secret)
      .update(stringToSign, 'utf8')
      .digest('hex')
      .toUpperCase();
  }

  // Mode 2: generateSignature(params, secret, method)
  const params = arg1;
  const secret = (arg2 as string) || '';
  const method = (arg3 as 'sha256' | 'hmac-sha256' | 'md5') || 'sha256';

  if (!secret) {
    throw new Error('AliExpress App Secret is required to generate request signature.');
  }

  const validKeys = Object.keys(params)
    .filter((k) => k !== 'sign' && params[k] !== undefined && params[k] !== null && params[k] !== '')
    .sort();

  let serializedParams = '';
  for (const key of validKeys) {
    const val = typeof params[key] === 'object' ? JSON.stringify(params[key]) : String(params[key]);
    serializedParams += `${key}${val}`;
  }

  if (method === 'hmac-sha256') {
    return crypto
      .createHmac('sha256', secret)
      .update(serializedParams, 'utf8')
      .digest('hex')
      .toUpperCase();
  } else if (method === 'md5') {
    const raw = `${secret}${serializedParams}${secret}`;
    return crypto
      .createHash('md5')
      .update(raw, 'utf8')
      .digest('hex')
      .toUpperCase();
  } else {
    // Standard SHA-256 with secret wrapping
    const raw = `${secret}${serializedParams}${secret}`;
    return crypto
      .createHash('sha256')
      .update(raw, 'utf8')
      .digest('hex')
      .toUpperCase();
  }
}
