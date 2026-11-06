'use client';
import { useEffect, useState } from 'react';
import { motionAllowed } from '@/lib/motion-preference';
export function useMotionAllowed() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      const next = motionAllowed();
      document.documentElement.dataset.motion = next ? 'full' : 'reduced';
      setAllowed(next);
    };
    sync();
    media.addEventListener('change', sync);
    return () => {
      media.removeEventListener('change', sync);
    };
  }, []);
  return allowed;
}
