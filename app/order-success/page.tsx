import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmed — FortyWell Apothecary',
  description: 'Your FortyWell order has been confirmed and is being prepared.',
};

interface PageProps {
  searchParams: Promise<{ orderId?: string; product?: string; fulfilled?: string }>;
}

export default async function OrderSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const orderId = params.orderId || '';
  const product = params.product ? decodeURIComponent(params.product) : 'Your Item';
  const fulfilled = params.fulfilled === '1';

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
          maxWidth: 540,
          width: '100%',
          background: '#262220',
          borderRadius: 20,
          border: '1px solid rgba(245,239,230,0.1)',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '40px 40px 32px',
            background: '#201C1A',
            borderBottom: '1px solid rgba(245,239,230,0.08)',
            textAlign: 'center',
          }}
        >
          {/* Checkmark Icon */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #92A975, #708655)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: 32,
            }}
          >
            ✓
          </div>

          <p
            style={{
              margin: '0 0 8px',
              color: '#92A975',
              fontSize: 11,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            Payment Confirmed
          </p>
          <h1
            style={{
              margin: 0,
              color: '#F5EFE6',
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            Order Placed! 🎉
          </h1>
        </div>

        {/* Body */}
        <div style={{ padding: '32px 40px' }}>
          <p
            style={{
              margin: '0 0 24px',
              color: 'rgba(245,239,230,0.75)',
              fontSize: 15,
              lineHeight: 1.6,
              textAlign: 'center',
            }}
          >
            Thank you for your order of{' '}
            <strong style={{ color: '#F5EFE6' }}>{product}</strong>. Your item
            is being prepared and will ship within{' '}
            <strong style={{ color: '#F5EFE6' }}>7–14 business days</strong>.
          </p>

          {/* Order ID Box */}
          {orderId && (
            <div
              style={{
                background: '#1C1917',
                borderRadius: 12,
                padding: '16px 20px',
                marginBottom: 24,
                border: '1px solid rgba(245,239,230,0.06)',
              }}
            >
              <p
                style={{
                  margin: '0 0 4px',
                  color: 'rgba(245,239,230,0.45)',
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Order Reference
              </p>
              <p
                style={{
                  margin: 0,
                  color: '#F5EFE6',
                  fontSize: 13,
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                }}
              >
                {orderId}
              </p>
            </div>
          )}

          {/* Fulfillment status */}
          {fulfilled && (
            <div
              style={{
                background: 'rgba(146,169,117,0.12)',
                border: '1px solid rgba(146,169,117,0.25)',
                borderRadius: 12,
                padding: '14px 18px',
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{ fontSize: 18 }}>📦</span>
              <p
                style={{
                  margin: 0,
                  color: '#92A975',
                  fontSize: 13,
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                Your order has been automatically sent to our supplier. It will
                be dispatched to your address shortly.
              </p>
            </div>
          )}

          {/* What's next */}
          <div style={{ marginBottom: 28 }}>
            <p
              style={{
                margin: '0 0 12px',
                color: 'rgba(245,239,230,0.45)',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              What Happens Next
            </p>
            {[
              { icon: '📧', text: 'You\'ll receive a PayPal receipt to your email' },
              { icon: '🚚', text: 'Your item ships within 7–14 business days' },
              { icon: '📬', text: 'Tracking info sent once dispatched' },
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 0',
                  borderBottom: i < 2 ? '1px solid rgba(245,239,230,0.05)' : 'none',
                }}
              >
                <span style={{ fontSize: 18, flexShrink: 0 }}>{step.icon}</span>
                <p
                  style={{
                    margin: 0,
                    color: 'rgba(245,239,230,0.7)',
                    fontSize: 14,
                    lineHeight: 1.4,
                  }}
                >
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          {/* Questions */}
          <p
            style={{
              margin: 0,
              color: 'rgba(245,239,230,0.4)',
              fontSize: 12,
              textAlign: 'center',
              lineHeight: 1.6,
            }}
          >
            Questions? Email us at{' '}
            <a
              href="mailto:hello@fortywell.app"
              style={{ color: '#D07887', textDecoration: 'none' }}
            >
              hello@fortywell.app
            </a>
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '18px 40px',
            background: '#201C1A',
            borderTop: '1px solid rgba(245,239,230,0.08)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              margin: 0,
              color: 'rgba(245,239,230,0.3)',
              fontSize: 11,
              letterSpacing: '0.08em',
            }}
          >
            FORTYWELL APOTHECARY · Handcrafted for the 40+ Body
          </p>
        </div>
      </div>
    </main>
  );
}
