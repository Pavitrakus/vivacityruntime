'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
const Panda = dynamic(
  () => import('./panda-experience').then((module) => module.PandaExperience),
  { ssr: false },
);
export function LazyPanda() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: '350px' },
    );
    if (host.current) observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={host} className="robot-stage">
      {ready ? (
        <Panda />
      ) : (
        <div
          className="robot-wait"
          aria-label="Robotics demonstration loads as you approach"
        />
      )}
    </div>
  );
}
