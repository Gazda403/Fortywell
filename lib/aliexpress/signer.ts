import crypto from 'crypto';

/**
 * Generates the official AliExpress Open Platform request signature.
 * 
 * Algorithm:
 * 1. Filter out null/undefined values and the 'sign' parameter itself.
 * 2. Sort all parameter keys in ascending ASCII alphabetical order.
 * 3. Concatenate each key and value together: key1value1key2value2...
 * 4. Prepend and append the app secret: secret + key1value1... + secret
 * 5. Hash the combined string using SHA-256 (or HMAC-SHA256) and return in uppercase hexadecimal format.
 * 
 * @param params Object containing query/form parameters to sign
 * @param secret AliExpress App Secret
 * @param method Signature method: 'sha256' (default), 'hmac-sha256', or 'md5'
 */
export function generateSignature(
  params: Record<string, any>,
  secret: string,
  method: 'sha256' | 'hmac-sha256' | 'md5' = 'sha256'
): string {
  if (!secret) {
    throw new Error('AliExpress App Secret is required to generate request signature.');
  }

  // 1. Filter out 'sign' and empty/undefined params
  const validKeys = Object.keys(params)
    .filter((k) => k !== 'sign' && params[k] !== undefined && params[k] !== null && params[k] !== '')
    .sort();

  // 2. Concatenate sorted key-value pairs
  let serializedParams = '';
  for (const key of validKeys) {
    const val = typeof params[key] === 'object' ? JSON.stringify(params[key]) : String(params[key]);
    serializedParams += `${key}${val}`;
  }

  // 3. Compute hash based on sign_method
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
    // Default standard SHA-256 with secret wrapping
    const raw = `${secret}${serializedParams}${secret}`;
    return crypto
      .createHash('sha256')
      .update(raw, 'utf8')
      .digest('hex')
      .toUpperCase();
  }
}

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
