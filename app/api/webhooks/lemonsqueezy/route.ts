import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yadjzsjfmamckptqotap.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const WEBHOOK_SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || '';

// Initialize Supabase Admin client
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature') || '';

    // Verify HMAC SHA-256 Signature if secret is configured
    if (WEBHOOK_SECRET) {
      const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
      const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
      const signatureBuffer = Buffer.from(signature, 'utf8');

      if (
        digest.length !== signatureBuffer.length ||
        !crypto.timingSafeEqual(digest, signatureBuffer)
      ) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta?.event_name || req.headers.get('x-event-name');
    const customData = payload.meta?.custom_data || {};
    const data = payload.data || {};
    const attributes = data.attributes || {};

    const userId = customData.user_id;
    const userEmail = attributes.user_email;
    const status = attributes.status; // 'active', 'cancelled', 'expired', 'past_due', 'paused', 'unpaid'
    const subscriptionId = String(data.id || '');
    const customerId = String(attributes.customer_id || '');
    const endsAt = attributes.ends_at || attributes.renews_at || null;
    const variantName = attributes.variant_name || '';

    console.log(`[LemonSqueezy Webhook] Received ${eventName} for ${userEmail || userId} (status: ${status})`);

    // Map Lemon Squeezy status to FortyWell subscription status
    let mappedStatus: 'active' | 'cancelled' | 'expired' | 'paused' | 'free_trial' = 'active';
    if (status === 'active' || status === 'on_trial') {
      mappedStatus = 'active';
    } else if (status === 'cancelled') {
      // If cancelled but still within the active billing period (ends_at in future), keep active until ends_at
      if (endsAt && new Date(endsAt) > new Date()) {
        mappedStatus = 'active';
      } else {
        mappedStatus = 'cancelled';
      }
    } else if (status === 'expired' || status === 'unpaid' || status === 'past_due') {
      mappedStatus = 'expired';
    } else if (status === 'paused') {
      mappedStatus = 'paused';
    }

    // Prepare update payload
    const updateData: Record<string, any> = {
      subscription_status: mappedStatus,
      subscription_plan: variantName.toLowerCase().includes('annual') ? 'annual' : 'monthly',
      subscription_ends_at: endsAt,
      lemon_squeezy_customer_id: customerId,
      lemon_squeezy_subscription_id: subscriptionId,
      updated_at: new Date().toISOString(),
    };

    // Find profile by user_id first, or by email in auth.users
    let targetUserId = userId;

    if (!targetUserId && userEmail) {
      // Find user by email in profiles table or auth
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('email', userEmail)
        .maybeSingle();

      if (profile?.id) {
        targetUserId = profile.id;
      }
    }

    if (targetUserId) {
      const { error: updateError } = await supabaseAdmin
        .from('profiles')
        .update(updateData)
        .eq('id', targetUserId);

      if (updateError) {
        console.error('[LemonSqueezy Webhook] Error updating profile:', updateError);
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      console.log(`[LemonSqueezy Webhook] Successfully updated user ${targetUserId} status to ${mappedStatus}`);
    } else {
      console.warn(`[LemonSqueezy Webhook] Could not find matching user for ${userEmail}`);
    }

    return NextResponse.json({ success: true, event: eventName, mappedStatus });
  } catch (err: any) {
    console.error('[LemonSqueezy Webhook] Processing error:', err);
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}
