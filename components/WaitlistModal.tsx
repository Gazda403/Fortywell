'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mounted, setMounted] = useState(false);

  // Mount/unmount control
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    }
  }, [isOpen]);

  // GSAP open/close animation
  useEffect(() => {
    if (!mounted) return;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      gsap.fromTo(
        panel,
        { y: 48, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'power3.out', delay: 0.06 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in' });
      gsap.to(panel, {
        y: 32,
        opacity: 0,
        scale: 0.97,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => setMounted(false),
      });
    }
  }, [isOpen, mounted]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), source: 'Hero CTA' }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: 'rgba(24, 21, 19, 0.88)', backdropFilter: 'blur(16px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Join Fortywell Waitlist"
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-2xl overflow-hidden min-h-[500px] md:min-h-[600px] flex flex-col justify-center"
        style={{
          borderRadius: '20px',
          background: 'linear-gradient(160deg, #44403c 0%, #3A3532 40%, #322f2c 100%)',
          border: '1px solid rgba(245,239,230,0.12)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(245,239,230,0.04), inset 0 1px 0 rgba(245,239,230,0.08)',
        }}
      >
        {/* Top gradient accent bar */}
        <div
          className="h-[2px] w-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(146,169,117,0.6) 30%, rgba(209,167,140,0.5) 60%, transparent 100%)',
          }}
        />

        {/* Decorative warm glow top-right */}
        <div
          className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 100% 0%, rgba(209,167,140,0.12) 0%, transparent 65%)',
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
          style={{
            color: 'rgba(245,239,230,0.45)',
            background: 'transparent',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(245,239,230,0.10)';
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,239,230,0.9)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,239,230,0.45)';
          }}
        >
          <span className="text-lg leading-none" aria-hidden="true">×</span>
        </button>

        {/* Content */}
        <div className="px-10 pt-12 pb-12 md:px-16 md:pt-20 md:pb-20">
          {status === 'success' ? (
            /* ── Success State ── */
            <div className="flex flex-col gap-6 py-2">
              <div className="flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{ background: 'rgba(146,169,117,0.18)', color: '#92A975' }}
                >
                  ✦
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-editorial text-[#F5EFE6] leading-tight" style={{ fontSize: '2rem', fontWeight: 300 }}>
                  You&apos;re on the list.
                </h3>
                <p className="font-sans leading-relaxed text-sm" style={{ color: 'rgba(245,239,230,0.55)' }}>
                  We&apos;ll be in touch as soon as your spot is ready. Thank you for trusting Fortywell
                  with your wellness journey.
                </p>
              </div>
              <button
                onClick={onClose}
                className="font-sans uppercase tracking-[0.18em] text-[11px] transition-colors duration-300 text-left"
                style={{ color: '#92A975' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#F5EFE6'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#92A975'; }}
              >
                Close ×
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <>
              {/* Header */}
              <div className="mb-12">
                <span
                  className="block font-sans uppercase tracking-[0.28em] text-[10px] mb-4"
                  style={{ color: '#92A975' }}
                >
                  Early Access
                </span>
                <h2
                  className="font-editorial leading-tight tracking-tight mb-5"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    fontWeight: 300,
                    color: '#F5EFE6',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Reserve your spot.
                </h2>
                <p
                  className="font-sans font-light leading-relaxed text-[15px]"
                  style={{ color: 'rgba(245,239,230,0.5)' }}
                >
                  Be among the first 5,000 women to access the Fortywell Daily Reset Ritual.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
                {/* Name field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="modal-name"
                    className="font-sans uppercase tracking-[0.2em] text-[10px] mb-1"
                    style={{ color: 'rgba(245,239,230,0.38)' }}
                  >
                    Your Name
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First name"
                    autoComplete="given-name"
                    className="w-full font-editorial font-light text-base outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(245,239,230,0.07)',
                      border: '1px solid rgba(245,239,230,0.12)',
                      borderRadius: '12px',
                      padding: '16px 18px',
                      color: '#F5EFE6',
                      caretColor: '#92A975',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border = '1px solid rgba(146,169,117,0.55)';
                      e.currentTarget.style.background = 'rgba(245,239,230,0.10)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(146,169,117,0.10)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border = '1px solid rgba(245,239,230,0.12)';
                      e.currentTarget.style.background = 'rgba(245,239,230,0.07)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Email field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="modal-email"
                    className="font-sans uppercase tracking-[0.2em] text-[10px] mb-1"
                    style={{ color: 'rgba(245,239,230,0.38)' }}
                  >
                    Email Address
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full font-sans font-light text-base outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(245,239,230,0.07)',
                      border: '1px solid rgba(245,239,230,0.12)',
                      borderRadius: '12px',
                      padding: '16px 18px',
                      color: '#F5EFE6',
                      caretColor: '#92A975',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border = '1px solid rgba(146,169,117,0.55)';
                      e.currentTarget.style.background = 'rgba(245,239,230,0.10)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(146,169,117,0.10)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border = '1px solid rgba(245,239,230,0.12)';
                      e.currentTarget.style.background = 'rgba(245,239,230,0.07)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <p
                    className="font-sans tracking-wide text-xs"
                    style={{ color: '#D07887' }}
                  >
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative w-full inline-flex items-center justify-center gap-3 rounded-full overflow-hidden font-sans uppercase tracking-[0.18em] text-[11px] font-[500] transition-all duration-400 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, #92A975 0%, #a8c28a 50%, #92A975 100%)',
                      backgroundSize: '200% 100%',
                      color: '#F5EFE6',
                      padding: '19px 56px',
                      boxShadow: '0 4px 24px rgba(146,169,117,0.30)',
                    }}
                    onMouseEnter={(e) => {
                      if (status !== 'loading') {
                        (e.currentTarget as HTMLButtonElement).style.backgroundPosition = '100% 0';
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 32px rgba(146,169,117,0.50)';
                        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundPosition = '0 0';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 24px rgba(146,169,117,0.30)';
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Shimmer sweep */}
                    <span
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.20), transparent)' }}
                    />
                    <span className="relative z-10">
                      {status === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <span className="inline-block w-3 h-3 border border-[#F5EFE6]/60 border-t-transparent rounded-full animate-spin" />
                          Sending…
                        </span>
                      ) : (
                        'Reserve Your Spot'
                      )}
                    </span>
                    {status !== 'loading' && (
                      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 opacity-70">
                        →
                      </span>
                    )}
                  </button>
                </div>

                {/* Disclaimer */}
                <p
                  className="font-sans text-center leading-relaxed text-[11px]"
                  style={{ color: 'rgba(245,239,230,0.32)' }}
                >
                  No spam — ever. Unsubscribe at any time.
                </p>
              </form>
            </>
          )}
        </div>

        {/* Bottom accent bar */}
        <div
          className="h-[1px] w-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(245,239,230,0.08) 50%, transparent 100%)',
          }}
        />
      </div>
    </div>
  );
}
