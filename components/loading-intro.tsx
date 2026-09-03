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
      <div className="intro-axis intro-axis-x" />
      <div className="intro-axis intro-axis-y" />
      <div className="intro-lockup">
        <svg viewBox="0 0 64 64" className="intro-mark">
          <path className="intro-rail intro-rail-a" d="M7 8L32 33L57 8" fill="none" stroke="currentColor" strokeWidth="3.25" />
          <path className="intro-rail intro-rail-b" d="M16 8L32 24L48 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path className="intro-stem" d="M32 33V58" fill="none" stroke="currentColor" strokeWidth="3.25" />
          <rect className="intro-node" x="27" y="28" width="10" height="10" fill="currentColor" />
        </svg>
        <div className="intro-word">VIVACITY</div>
        <div className="intro-state">EXECUTION STATE / READY</div>
      </div>
      <div className="intro-aperture" />
    </div>
  );
}
