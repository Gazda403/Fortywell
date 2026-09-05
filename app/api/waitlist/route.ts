import { NextRequest, NextResponse } from 'next/server';
import { sendSignupAlert } from '@/lib/notifications';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, source = 'Website Waitlist' } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const result = await sendSignupAlert({
      email: email.trim().toLowerCase(),
      name: name ? String(name).trim() : undefined,
      platform: 'web',
      source: String(source),
    });

    if (!result.success) {
      console.error('Waitlist notification error:', result.error);
      return NextResponse.json({ error: 'Failed to send notification.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: result.id });
  } catch (err: any) {
    console.error('Waitlist API error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error.' }, { status: 500 });
  }
}
