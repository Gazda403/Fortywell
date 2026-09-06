import { NextRequest, NextResponse } from 'next/server';
import { sendLeadMagnetEmail, sendLeadMagnetAdminAlert } from '@/lib/notifications';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, guideId = 'signs-40', guideTitle = "5 Signs Your Body's Changing After 40" } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required to access the guides.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Send subscriber email with download links via Resend
    const sendResult = await sendLeadMagnetEmail({
      email: cleanEmail,
      guideId: String(guideId),
      guideTitle: String(guideTitle),
    });

    // 2. Alert the FortyWell admin team
    sendLeadMagnetAdminAlert({
      email: cleanEmail,
      guideId: String(guideId),
      guideTitle: String(guideTitle),
    }).catch((err) => console.error('[Lead Magnet Admin Alert Error]:', err));

    return NextResponse.json({
      success: true,
      emailSent: sendResult.success,
      guides: [
        {
          id: 'signs-40',
          title: "5 Signs Your Body's Changing After 40",
          url: '/guides/5-signs-body-changing-after-40.pdf',
        },
        {
          id: 'clinical-qa',
          title: 'Questions & Clinical Guidance for Women After 40',
          url: '/guides/questions-and-clinical-guidance-after-40.pdf',
        },
        {
          id: 'daily-rhythm',
          title: 'The Over-40 Daily Rhythm: 3 Simple Micro-Habits',
          url: '/guides/over-40-daily-rhythm-cortisol-reset.pdf',
        },
      ],
    });
  } catch (err: any) {
    console.error('[Lead Magnet Route Error]:', err);
    return NextResponse.json(
      { error: err?.message || 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
