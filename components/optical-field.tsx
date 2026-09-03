'use client';

import { useRef } from 'react';

const glyphs = ['01', 'Φ', '17', '+', 'Δ', '08', 'λ', '24', '∴', '52', '×', '03', 'ψ', '31', '∿', '11', '∴', '40'];

export function OpticalField({ variant = 'a', label }: { variant?: 'a' | 'b'; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function move(event: React.PointerEvent<HTMLDivElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    ref.current?.querySelectorAll<HTMLElement>('[data-glyph]').forEach((node) => {
      const gx = Number(node.dataset.x) * box.width;
      const gy = Number(node.dataset.y) * box.height;
      const dx = gx - x;
      const dy = gy - y;
      const distance = Math.max(Math.hypot(dx, dy), 1);
      const force = Math.max(0, 96 - distance) / 96;
      node.style.transform = `translate(${(dx / distance) * force * 34}px, ${(dy / distance) * force * 34}px)`;
    });
  }

  function reset() {
    ref.current?.querySelectorAll<HTMLElement>('[data-glyph]').forEach((node) => { node.style.transform = ''; });
  }

  return (
    <figure ref={ref} className={`optical-field optical-field-${variant}`} onPointerMove={move} onPointerLeave={reset} aria-label={label}>
      <div className="optical-grid" aria-hidden="true" />
      <div className="optical-core" aria-hidden="true" />
      {glyphs.map((glyph, index) => {
        const x = ((index * 37) % 91 + 4) / 100;
        const y = ((index * 53) % 83 + 8) / 100;
        return <span key={`${glyph}-${index}`} data-glyph data-x={x} data-y={y} className="field-glyph" style={{ left: `${x * 100}%`, top: `${y * 100}%` }} aria-hidden="true">{glyph}</span>;
      })}
      <div className="field-index mono" aria-hidden="true">VCT / FIELD {variant === 'a' ? '01' : '02'}</div>
    </figure>
  );
}
