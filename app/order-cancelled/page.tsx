import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Cancelled — FortyWell Apothecary',
  description: 'Your FortyWell order was cancelled.',
};

interface PageProps {
  searchParams: Promise<{ reason?: string }>;
}

export default async function OrderCancelledPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const reason = params.reason;

  let message = 'Your order was cancelled. No payment was charged.';
  if (reason === 'capture_failed') {
    message = 'We could not confirm your payment. Please try again or contact us.';
  } else if (reason === 'server_error') {
    message = 'Something went wrong on our end. No payment was taken. Please try again.';
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#181514',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: '100%',
          background: '#262220',
          borderRadius: 20,
          border: '1px solid rgba(245,239,230,0.1)',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            padding: '40px 40px 32px',
            background: '#201C1A',
            borderBottom: '1px solid rgba(245,239,230,0.08)',
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'rgba(208,120,135,0.15)',
              border: '2px solid rgba(208,120,135,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: 32,
            }}
          >
            ✕
          </div>
          <p
            style={{
              margin: '0 0 8px',
              color: '#D07887',
              fontSize: 11,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            Order Not Completed
          </p>
          <h1
            style={{
              margin: 0,
              color: '#F5EFE6',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            Payment Cancelled
          </h1>
        </div>

        <div style={{ padding: '32px 40px' }}>
          <p
            style={{
              margin: '0 0 28px',
              color: 'rgba(245,239,230,0.65)',
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            {message}
          </p>

          <a
            href="https://fortywell-app.vercel.app"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #C9956A, #A57348)',
              color: '#FFFFFF',
              padding: '14px 32px',
              borderRadius: 100,
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
              letterSpacing: '0.02em',
            }}
          >
            Return to Store
          </a>
        </div>

        <div
          style={{
            padding: '18px 40px',
            background: '#201C1A',
            borderTop: '1px solid rgba(245,239,230,0.08)',
          }}
        >
          <p
            style={{
              margin: 0,
              color: 'rgba(245,239,230,0.3)',
              fontSize: 11,
            }}
          >
            Questions?{' '}
            <a
              href="mailto:hello@fortywell.app"
              style={{ color: '#D07887', textDecoration: 'none' }}
            >
              hello@fortywell.app
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
