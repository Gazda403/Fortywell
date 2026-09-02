import crypto from 'crypto';

export function generateSignature(
  apiPath: string,
  params: Record<string, string | number>,
  secret: string
): string {
  // 1. Sort parameter keys alphabetically
  const sortedKeys = Object.keys(params).sort();

  // 2. Concatenate apiPath + sorted key-value pairs
  let stringToSign = apiPath;
  for (const key of sortedKeys) {
    if (params[key] !== undefined && params[key] !== null) {
      stringToSign += `${key}${params[key]}`;
    }
  }

  // 3. Compute HMAC-SHA256 signature in uppercase HEX format
  return crypto
    .createHmac('sha256', secret)
    .update(stringToSign, 'utf8')
    .digest('hex')
    .toUpperCase();
}
