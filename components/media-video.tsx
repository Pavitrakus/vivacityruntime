'use client';
import { useEffect, useRef, useState } from 'react';
import { useMotionAllowed } from '@/hooks/use-motion-allowed';

export function MediaVideo({
  src,
  poster,
  label,
  className = '',
  priority = false,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
  priority?: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const allowed = useMotionAllowed();
  useEffect(() => {
    const target = video.current;
    if (!target) return;
    let visible = false;
    const sync = () => {
      if (visible && !document.hidden && allowed) {
        setLoaded(true);
        if (target.getAttribute('src')) void target.play().catch(() => {});
      } else target.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.01 },
    );
    observer.observe(target);
    document.addEventListener('visibilitychange', sync);
    target.addEventListener('loadeddata', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      target.removeEventListener('loadeddata', sync);
      target.pause();
    };
  }, [allowed, loaded]);
  return (
    <div className={`motion-media ${className}`}>
      <video
        ref={video}
        src={loaded ? src : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload={priority ? 'auto' : 'none'}
        aria-label={label}
        aria-hidden={!loaded}
      />
    </div>
  );
}
