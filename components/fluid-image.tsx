'use client';

import { useEffect, useRef } from 'react';

export function FluidImage({
  src,
  alt,
  className = '',
  zoom = 1,
}: {
  src: string;
  alt: string;
  className?: string;
  zoom?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLElement>(null);
  const redraw = useRef<(() => void) | null>(null);
  const pointer = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;
    const image = new Image();
    image.src = src;
    let frame = 0;
    let running = true;
    let inView = true;
    let started = false;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const box = host.getBoundingClientRect();
      width = Math.max(1, Math.floor(box.width));
      height = Math.max(1, Math.floor(box.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      schedule();
    };

    const draw = () => {
      if (!running || !image.complete || !image.naturalWidth) return;
      context.fillStyle = '#08090a';
      context.fillRect(0, 0, width, height);
      const scale = Math.max(
        width / image.naturalWidth,
        height / image.naturalHeight,
      );
      const sourceW = width / scale / zoom;
      const sourceH = height / scale / zoom;
      const sourceX = (image.naturalWidth - sourceW) / 2;
      const sourceY = (image.naturalHeight - sourceH) / 2;
      const cell = width < 700 ? 10 : 13;
      if (!pointer.current.active || motion.matches) {
        context.drawImage(
          image,
          sourceX,
          sourceY,
          sourceW,
          sourceH,
          0,
          0,
          width,
          height,
        );
        return;
      }
      const radius = Math.min(width, height) * 0.24;
      for (let y = 0; y < height; y += cell) {
        for (let x = 0; x < width; x += cell) {
          let ox = 0;
          let oy = 0;
          if (pointer.current.active) {
            const dx = x - pointer.current.x;
            const dy = y - pointer.current.y;
            const distance = Math.max(1, Math.hypot(dx, dy));
            const force = Math.max(0, 1 - distance / radius);
            ox = (dx / distance) * force * 26;
            oy = (dy / distance) * force * 26;
          }
          context.drawImage(
            image,
            sourceX + x / scale / zoom,
            sourceY + y / scale / zoom,
            cell / scale / zoom,
            cell / scale / zoom,
            x + ox,
            y + oy,
            cell + 0.7,
            cell + 0.7,
          );
        }
      }
    };

    function schedule() {
      if (!frame && running && inView && !document.hidden)
        frame = requestAnimationFrame(() => {
          frame = 0;
          draw();
        });
    }
    redraw.current = schedule;
    const onVisibility = () => {
      if (!document.hidden) schedule();
    };
    document.addEventListener('visibilitychange', onVisibility);
    const observer = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) schedule();
      },
      { rootMargin: '160px' },
    );
    observer.observe(host);
    visibilityObserver.observe(host);
    image.onload = () => {
      if (started) return;
      started = true;
      resize();
      schedule();
    };
    if (image.complete) image.onload?.(new Event('load'));
    return () => {
      redraw.current = null;
      document.removeEventListener('visibilitychange', onVisibility);
      running = false;
      observer.disconnect();
      visibilityObserver.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [src, zoom]);

  return (
    <figure
      ref={hostRef}
      className={'fluid-image ' + className}
      onPointerMove={(event) => {
        const box = event.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: event.clientX - box.left,
          y: event.clientY - box.top,
          active: true,
        };
        redraw.current?.();
      }}
      onPointerLeave={() => {
        pointer.current.active = false;
        redraw.current?.();
      }}
      aria-label={alt}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      <figcaption className="sr-only">{alt}</figcaption>
      <span className="fluid-crosshair" aria-hidden="true" />
    </figure>
  );
}
