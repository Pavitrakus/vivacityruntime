'use client';

import { useEffect, useState } from 'react';

// A brief, non-blocking arrival cue. Content is available from the first paint.
export function LoadingIntro() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try {
      if (sessionStorage.getItem('vivacity-arrived')) return;
      sessionStorage.setItem('vivacity-arrived', '1');
    } catch {
      /* Storage is optional. */
    }
    const show = requestAnimationFrame(() => setVisible(true));
    const done = setTimeout(() => setVisible(false), 800);
    return () => {
      cancelAnimationFrame(show);
      clearTimeout(done);
    };
  }, []);
  return visible ? <div className="arrival-line" aria-hidden="true" /> : null;
}
