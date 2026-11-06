'use client';

import { useEffect, useRef } from 'react';

const tau = Math.PI * 2;
type Point = [number, number, number];
const point = (u: number, v: number): Point => {
  const r = 142 + 55 * Math.cos(v);
  return [r * Math.cos(u), r * Math.sin(u), 55 * Math.sin(v)];
};
const wires = [
  ...Array.from({ length: 15 }, (_, v) =>
    Array.from({ length: 81 }, (_, u) => point((u / 80) * tau, (v / 15) * tau)),
  ),
  ...Array.from({ length: 32 }, (_, u) =>
    Array.from({ length: 57 }, (_, v) => point((u / 32) * tau, (v / 56) * tau)),
  ),
];

/** Continuously projected 3D geometry; no video, frame sequence, or loop reset. */
export function TorusStudy({
  parameter,
  moving,
}: {
  parameter: number;
  moving: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const value = useRef(parameter);
  useEffect(() => {
    value.current = parameter;
  }, [parameter]);
  useEffect(() => {
    const target = canvas.current;
    const context = target?.getContext('2d');
    if (!target || !context) return;
    let raf = 0,
      visible = false,
      previous = 0,
      elapsed = 0,
      lastPaint = 0;
    let width = 460,
      height = 260,
      dpr = 1;
    let pointerX = 0,
      pointerY = 0,
      currentX = 0,
      currentY = 0;
    function paint(dt = 0) {
      const blend = 1 - Math.exp(-dt * 6);
      currentX += (pointerX - currentX) * blend;
      currentY += (pointerY - currentY) * blend;
      const roll = elapsed * 0.105;
      const pitch = 1.28 + Math.sin(elapsed * 0.19) * 0.065 + currentY * 0.08;
      const yaw = Math.sin(elapsed * 0.13) * 0.16 + currentX * 0.17;
      const cr = Math.cos(roll),
        sr = Math.sin(roll),
        cp = Math.cos(pitch),
        sp = Math.sin(pitch),
        cy = Math.cos(yaw),
        sy = Math.sin(yaw);
      const project = ([x, y, z]: Point) => {
        const rx = x * cr - y * sr,
          ry = x * sr + y * cr;
        const py = ry * cp - z * sp,
          pz = ry * sp + z * cp;
        return [230 + rx * cy + pz * sy, 133 + py, -rx * sy + pz * cy];
      };
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
      context!.clearRect(0, 0, width, height);
      context!.scale(width / 460, height / 260);
      const projected = wires
        .map((wire) => {
          const points = wire.map(project);
          return {
            points,
            depth: points.reduce((sum, p) => sum + p[2], 0) / points.length,
          };
        })
        .sort((a, b) => a.depth - b.depth);
      const stroke = (points: number[][]) => {
        context!.beginPath();
        points.forEach(([x, y], i) =>
          i ? context!.lineTo(x, y) : context!.moveTo(x, y),
        );
        context!.stroke();
      };
      context!.lineWidth = 0.62;
      for (const wire of projected) {
        context!.strokeStyle = `rgba(122,116,132,${0.2 + ((wire.depth + 200) / 400) * 0.27})`;
        stroke(wire.points);
      }
      context!.lineWidth = 1.05;
      context!.strokeStyle = '#2b223c';
      stroke(
        Array.from({ length: 81 }, (_, i) =>
          project(point((value.current - 0.08) * tau, (i / 80) * tau)),
        ),
      );
    }
    function request() {
      if (!raf && visible && !document.hidden && moving)
        raf = requestAnimationFrame(draw);
    }
    function draw(now: number) {
      raf = 0;
      if (!visible || document.hidden) {
        previous = 0;
        return;
      }
      const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
      previous = now;
      elapsed += dt;
      if (now - lastPaint > 15) {
        paint(dt);
        lastPaint = now;
      }
      request();
    }
    const resize = new ResizeObserver(() => {
      const rect = target.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(devicePixelRatio || 1, 2);
      target.width = Math.round(width * dpr);
      target.height = Math.round(height * dpr);
      paint();
    });
    resize.observe(target);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      previous = 0;
      if (visible) {
        paint();
        request();
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    observer.observe(target);
    const visibility = () => {
      previous = 0;
      if (!document.hidden) request();
    };
    const pointAt = (event: PointerEvent) => {
      if (!moving || event.pointerType !== 'mouse') return;
      const rect = target.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      pointerY = (event.clientY - rect.top) / rect.height - 0.5;
    };
    const leave = () => {
      pointerX = 0;
      pointerY = 0;
    };
    target.addEventListener('pointermove', pointAt);
    target.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      observer.disconnect();
      target.removeEventListener('pointermove', pointAt);
      target.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [moving]);
  return (
    <canvas
      className="torus-canvas"
      ref={canvas}
      aria-label="Continuously rotating three-dimensional parameter-space torus"
    />
  );
}
