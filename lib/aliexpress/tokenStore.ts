import { AliExpressOAuthTokenResponse, AliExpressTokenData } from '@/types/aliexpress';

// In-memory cache for fast access across serverless invocations within the same process
let inMemoryTokenCache: AliExpressTokenData | null = null;

/**
 * Saves or updates AliExpress OAuth tokens.
 * Persists to in-memory cache, and optionally to Supabase/database if configured.
 */
export async function saveAliExpressTokens(
  data: AliExpressOAuthTokenResponse
): Promise<AliExpressTokenData> {
  const now = Date.now();
  const expiresInMs = (data.expires_in || 3600 * 24 * 30) * 1000;
  const refreshExpiresInMs = (data.refresh_token_valid_time || 3600 * 24 * 365) * 1000;

  const tokenRecord: AliExpressTokenData = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: now + expiresInMs,
    refreshTokenExpiresAt: now + refreshExpiresInMs,
    userId: data.user_id ? String(data.user_id) : undefined,
    account: data.account || data.user_nick,
    updatedAt: new Date().toISOString(),
  };

  inMemoryTokenCache = tokenRecord;

  // Optional: Persist to Supabase if credentials exist
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseKey);

      await supabase.from('aliexpress_tokens').upsert(
        {
          id: 'primary',
          access_token: tokenRecord.accessToken,
          refresh_token: tokenRecord.refreshToken,
          expires_at: new Date(tokenRecord.expiresAt).toISOString(),
          refresh_token_expires_at: tokenRecord.refreshTokenExpiresAt
            ? new Date(tokenRecord.refreshTokenExpiresAt).toISOString()
            : null,
          account_nick: tokenRecord.account,
          user_id: tokenRecord.userId,
          updated_at: tokenRecord.updatedAt,
        },
        { onConflict: 'id' }
      );
    }
  } catch (err) {
    console.warn('Notice: Could not persist AliExpress tokens to Supabase table (in-memory token will be used):', err);
  }

  return tokenRecord;
}

/**
 * Retrieves the currently active AliExpress tokens.
 * Checks in-memory cache, then Supabase, then environment variable fallback.
 */
export async function getAliExpressTokens(): Promise<AliExpressTokenData | null> {
  // 1. Check in-memory cache
  if (inMemoryTokenCache && inMemoryTokenCache.accessToken) {
    return inMemoryTokenCache;
  }

  // 2. Try loading from Supabase
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data, error } = await supabase
        .from('aliexpress_tokens')
        .select('*')
        .eq('id', 'primary')
        .single();

      if (data && !error) {
        inMemoryTokenCache = {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          expiresAt: new Date(data.expires_at).getTime(),
          refreshTokenExpiresAt: data.refresh_token_expires_at ? new Date(data.refresh_token_expires_at).getTime() : undefined,
          userId: data.user_id,
          account: data.account_nick,
          updatedAt: data.updated_at,
        };
        return inMemoryTokenCache;
      }
    }
  } catch (err) {
    // Table may not exist yet in local testing, continue to env fallback
  }

  // 3. Fallback: Check environment variables
  if (process.env.ALIEXPRESS_ACCESS_TOKEN) {
    inMemoryTokenCache = {
      accessToken: process.env.ALIEXPRESS_ACCESS_TOKEN,
      refreshToken: process.env.ALIEXPRESS_REFRESH_TOKEN || '',
      expiresAt: Date.now() + 30 * 24 * 3600 * 1000,
      updatedAt: new Date().toISOString(),
    };
    return inMemoryTokenCache;
  }

  return null;
}
