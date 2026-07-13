'use client';

import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Animated Counter ────────────────────────────────────────────────────────

interface CounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

function AnimatedCounter({ target, prefix = '', suffix = '', label }: CounterProps) {
  const numRef = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.4,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(obj.val).toLocaleString()}${suffix}`;
          },
        });
      },
    });

    return () => st.kill();
  }, [target, prefix, suffix]);

  return (
    <div className="flex flex-col gap-2">
      <span
        ref={numRef}
        className="counter-num text-5xl md:text-7xl lg:text-8xl"
      >
        {prefix}0{suffix}
      </span>
      <span className="text-[#F5EFE6]/45 text-xs tracking-[0.2em] uppercase font-sans">
        {label}
      </span>
    </div>
  );
}

// ─── Lead Capture Footer ─────────────────────────────────────────────────────

export default function LeadCaptureFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useGSAP(() => {
      // Header entrance
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        },
      );

      // Form entrance
      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            once: true,
          },
        },
      );

      // Stats entrance
      gsap.fromTo(
        statsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      );
  }, { scope: sectionRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), source: 'Footer CTA' }),
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

  return (
    <footer
      ref={sectionRef}
      className="relative w-full bg-[#3A3532] overflow-hidden"
      aria-label="Join the Fortywell Waitlist"
    >
      {/* Background decorative large type */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 font-editorial text-[22vw] text-[#F5EFE6]/[0.025] leading-none pointer-events-none select-none overflow-hidden whitespace-nowrap"
      >
        FORTYWELL
      </div>

      {/* Structural vertical line */}
      <div className="absolute left-[40%] top-0 bottom-0 w-px bg-[#F5EFE6]/5 hidden lg:block pointer-events-none" />

      {/* Stats row */}
      <div
        ref={statsRef}
        className="opacity-0 border-b border-[#F5EFE6]/8 editorial-container py-16 md:py-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          <AnimatedCounter target={4840} label="Women on waitlist" />
          <AnimatedCounter target={87} suffix="%" label="Report less leg swelling" />
          <AnimatedCounter target={12} label="Minutes per ritual" />
          <AnimatedCounter target={40} suffix="+" label="Women served" />
        </div>
      </div>

      {/* Main conversion block */}
      <div className="relative z-10 flex flex-col lg:flex-row editorial-container pt-20 pb-24 md:pb-32 gap-16 lg:gap-24">
        {/* Left: Heading */}
        <div className="lg:w-1/2 flex flex-col gap-8">
          <span className="text-[#92A975] text-xs tracking-[0.28em] uppercase font-sans">
            Early Access
          </span>
          <h2
            ref={headingRef}
            className="font-editorial text-[#F5EFE6] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight tracking-tight opacity-0"
          >
            You deserve a method built for who you are now.
          </h2>
          <p className="text-[#F5EFE6]/45 text-sm leading-relaxed font-sans font-light max-w-md">
            Join the Fortywell waitlist. Be among the first 5,000 women to access
            the Daily Reset Ritual — fully guided, science-informed, and built
            for the post-40 female body.
          </p>

          {/* Trust signals */}
          <div className="flex flex-col gap-3">
            {[
              'No intense workouts required',
              'Hormone-aware protocols only',
              'Cancel anytime — no pressure',
            ].map((signal) => (
              <div key={signal} className="flex items-center gap-3">
                <span className="text-[#92A975] text-sm">✦</span>
                <span className="text-[#F5EFE6]/55 text-xs font-sans tracking-wide">
                  {signal}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          {status === 'success' ? (
            <div className="flex flex-col gap-4">
              <span className="text-[#92A975] text-2xl font-editorial">✦</span>
              <h3 className="font-editorial text-[#F5EFE6] text-3xl font-light">
                You&apos;re on the list.
              </h3>
              <p className="text-[#F5EFE6]/50 text-sm font-sans leading-relaxed">
                We&apos;ll reach out as soon as your spot is ready. Thank you for trusting
                Fortywell with your wellness journey.
              </p>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-8 opacity-0"
              aria-label="Waitlist registration form"
            >
              {/* Name field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="footer-name"
                  className="text-[#F5EFE6]/40 text-xs tracking-[0.2em] uppercase font-sans"
                >
                  Your Name
                </label>
                <div className="email-input-line pb-3">
                  <input
                    id="footer-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First name"
                    className="w-full bg-transparent text-[#F5EFE6] text-lg md:text-xl font-editorial font-light placeholder:text-[#F5EFE6]/20 outline-none caret-[#92A975]"
                    autoComplete="given-name"
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="waitlist-email"
                  className="text-[#F5EFE6]/40 text-xs tracking-[0.2em] uppercase font-sans"
                >
                  Email Address
                </label>
                <div className="email-input-line pb-3">
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    data-hover="grow"
                    className="w-full bg-transparent text-[#F5EFE6] text-lg md:text-xl font-editorial font-light placeholder:text-[#F5EFE6]/20 outline-none caret-[#92A975]"
                    autoComplete="email"
                  />
                </div>
                <p className="text-[#F5EFE6]/25 text-xs font-sans tracking-wide">
                  We respect your privacy. No spam — ever.
                </p>
              </div>

              {/* Error state */}
              {status === 'error' && (
                <p className="text-red-400 text-xs font-sans tracking-wide -mt-4">
                  Something went wrong. Please try again.
                </p>
              )}

              <div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  data-hover="olive"
                  className="group relative inline-flex items-center justify-center gap-4 rounded-full overflow-hidden
                    bg-gradient-to-r from-[#F5EFE6] via-[#fff9f3] to-[#F5EFE6] bg-[length:200%_100%]
                    text-[#3A3532] text-[12px] tracking-[0.18em] uppercase font-sans font-[500]
                    shadow-[0_0_28px_rgba(245,239,230,0.25)] hover:shadow-[0_0_40px_rgba(245,239,230,0.45)]
                    hover:from-[#92A975] hover:via-[#a8c28a] hover:to-[#92A975] hover:text-[#F5EFE6]
                    transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed cursor-none"
                  style={{ padding: '20px 56px' }}
                >
                  {/* Shimmer sweep */}
                  <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.30), transparent)' }}
                  />
                  <span className="relative z-10">
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 border border-[#3A3532]/60 border-t-transparent rounded-full animate-spin group-hover:border-[#F5EFE6]/60" />
                        Sending…
                      </span>
                    ) : (
                      'Reserve Your Spot'
                    )}
                  </span>
                  {status !== 'loading' && (
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 text-[#92A975] group-hover:text-[#F5EFE6]/70">
                      →
                    </span>
                  )}
                </button>
              </div>

              <p className="text-[#F5EFE6]/20 text-xs font-sans leading-relaxed max-w-xs">
                By joining, you agree to receive occasional wellness updates from Fortywell. 
                Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Legal footer strip */}
      <div className="border-t border-[#F5EFE6]/8 editorial-container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[#F5EFE6]/25 text-xs font-sans tracking-wider">
          © 2026 Fortywell. All rights reserved.
        </span>
        <div className="flex items-center gap-8">
          {['Privacy Policy', 'Terms of Service', 'Contact'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[#F5EFE6]/25 text-xs font-sans tracking-wider hover:text-[#F5EFE6]/60 transition-colors duration-300"
              data-hover="grow"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
