'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const xRef = useRef<number>(0);
  const yRef = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide on touch devices
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) {
      cursor.style.display = 'none';
      return;
    }

    // Quick setter for maximum performance
    const setX = gsap.quickSetter(cursor, 'x', 'px');
    const setY = gsap.quickSetter(cursor, 'y', 'px');

    const onMove = (e: MouseEvent) => {
      xRef.current = e.clientX;
      yRef.current = e.clientY;
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    // Smooth follow via GSAP ticker
    gsap.ticker.add(() => {
      setX(xRef.current);
      setY(yRef.current);
    });

    // Handle hover state changes
    const handleEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const hoverType = target.dataset.hover;

      if (hoverType === 'grow') {
        cursor.classList.add('grow');
        cursor.classList.remove('olive');
      } else if (hoverType === 'olive') {
        cursor.classList.add('olive');
        cursor.classList.remove('grow');
      }
    };

    const handleLeave = () => {
      cursor.classList.remove('grow', 'olive');
    };

    // Delegated event listeners on body
    document.body.addEventListener('mouseenter', handleEnter, true);
    document.body.addEventListener('mouseleave', handleLeave, true);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('mouseenter', handleEnter, true);
      document.body.removeEventListener('mouseleave', handleLeave, true);
      gsap.ticker.remove(() => {});
    };
  }, []);

  return (
    <div
      id="fw-cursor"
      ref={cursorRef}
      aria-hidden="true"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  );
}
