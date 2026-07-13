'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Lenis type shim (avoid global type collision)
type LenisInstance = {
  raf: (time: number) => void;
  destroy: () => void;
  on: (event: string, cb: (e: unknown) => void) => void;
};

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisInstance | null>(null);

  useEffect(() => {
    // Touch devices: skip Lenis to preserve native momentum scroll
    const isTouchDevice =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (isTouchDevice) return;

    const initLenis = async () => {
      const LenisModule = await import('lenis');
      const Lenis = LenisModule.default;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      }) as LenisInstance;

      lenisRef.current = lenis;

      // Sync Lenis with GSAP ticker
      lenis.on('scroll', () => ScrollTrigger.update());

      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    };

    initLenis();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      gsap.ticker.remove(() => {});
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
