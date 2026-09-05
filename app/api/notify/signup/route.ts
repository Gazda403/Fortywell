import { NextRequest, NextResponse } from 'next/server';
import { sendSignupAlert } from '@/lib/notifications';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, name, userId, platform = 'app', source = 'Fortywell Mobile App', metadata } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Trigger Resend email alert asynchronously
    const result = await sendSignupAlert({
      email: email.trim().toLowerCase(),
      name: name ? String(name).trim() : undefined,
      userId: userId ? String(userId) : undefined,
      platform: String(platform),
      source: String(source),
      metadata,
    });

    if (!result.success) {
      console.warn('[Signup Notification] Failed to send email alert:', result.error);
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Signup notification sent successfully', id: result.id },
      { headers: corsHeaders }
    );
  } catch (err: any) {
    console.error('[Signup Notification API Exception]:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
