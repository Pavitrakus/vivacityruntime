'use client';

import { useEffect, useState } from 'react';

export function LoadingIntro() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const show = window.requestAnimationFrame(() => setVisible(true));
    const leave = window.setTimeout(() => setLeaving(true), 3200);
    const done = window.setTimeout(() => setVisible(false), 4400);
    return () => { window.cancelAnimationFrame(show); window.clearTimeout(leave); window.clearTimeout(done); };
  }, []);

  if (!visible) return null;
  return (
    <div className="loading-intro" data-leaving={leaving} aria-hidden="true">
      <div className="intro-grid" />
      <svg viewBox="0 0 64 64" className="intro-mark">
        <path d="M8 9L32 33L56 9M32 33V57" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M17 9L32 24L47 9" fill="none" stroke="currentColor" strokeWidth="2" opacity=".35" />
        <rect x="27" y="28" width="10" height="10" fill="currentColor" />
      </svg>
      <div className="intro-word">VIVACITY</div>
      <div className="intro-scan" />
    </div>
  );
}
