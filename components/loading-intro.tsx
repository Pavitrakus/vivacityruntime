'use client';

import { useEffect, useState } from 'react';

export function LoadingIntro() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const show = window.requestAnimationFrame(() => setVisible(true));
    const leave = window.setTimeout(() => setLeaving(true), 3600);
    const done = window.setTimeout(() => setVisible(false), 4800);
    return () => { window.cancelAnimationFrame(show); window.clearTimeout(leave); window.clearTimeout(done); };
  }, []);

  if (!visible) return null;
  return (
    <div className="loading-intro" data-leaving={leaving} aria-hidden="true">
      <div className="intro-grid" />
      <div className="intro-trace" />
      <div className="intro-lockup">
        <div className="intro-flight">
          <div className="intro-halo" />
          <svg viewBox="0 0 64 64" className="intro-mark">
            <path d="M7 8L32 33L57 8M32 33V58" fill="none" stroke="currentColor" strokeWidth="3.25" />
            <path d="M16 8L32 24L48 8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".34" />
            <rect x="27" y="28" width="10" height="10" fill="currentColor" />
          </svg>
        </div>
        <div className="intro-word">VIVACITY</div>
      </div>
      <div className="intro-aperture" />
    </div>
  );
}
