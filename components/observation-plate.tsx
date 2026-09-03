'use client';

import { useState } from 'react';

const plates = {
  orbit: {
    src: '/plate-orbit.webp',
    title: 'Orbital state',
    caption: 'Three transfers from one parent state',
    alt: 'Orbital trajectories branching from a single persistent world state',
  },
  contact: {
    src: '/plate-contact.webp',
    title: 'Contact action',
    caption: 'Gripper force across isolated forks',
    alt: 'Robotic contact action compared across isolated forks',
  },
  flow: {
    src: '/plate-fluid.webp',
    title: 'Flow state',
    caption: 'Wake outcomes after a single commit gate',
    alt: 'Fluid wake outcomes after a verified commit',
  },
} as const;

type PlateKey = keyof typeof plates;

function OrbitScheme() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      <ellipse cx="200" cy="150" rx="150" ry="86" fill="none" stroke="rgba(196,160,106,0.28)" />
      <ellipse cx="200" cy="150" rx="104" ry="58" fill="none" stroke="rgba(91,130,255,0.4)" />
      <ellipse cx="200" cy="150" rx="58" ry="32" fill="none" stroke="rgba(255,90,46,0.55)" />
      <circle cx="200" cy="150" r="7" fill="#f3efe4" />
      <circle cx="334" cy="118" r="4" fill="#5b82ff" />
      <circle cx="286" cy="98" r="4" fill="#c4a06a" />
      <circle cx="248" cy="122" r="4" fill="#ff5a2e" />
      <path d="M200 150 C250 90 310 80 334 118" fill="none" stroke="#5b82ff" strokeWidth="1.4" />
      <path d="M200 150 C230 110 260 88 286 98" fill="none" stroke="#c4a06a" strokeWidth="1.4" />
      <path d="M200 150 C220 140 236 128 248 122" fill="none" stroke="#ff5a2e" strokeWidth="1.6" />
    </svg>
  );
}

function ContactScheme() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      <rect x="48" y="70" width="70" height="160" fill="none" stroke="rgba(243,239,228,0.28)" />
      <rect x="282" y="92" width="70" height="116" fill="none" stroke="rgba(196,160,106,0.4)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1="118"
          y1={96 + i * 28}
          x2="282"
          y2={108 + i * 22}
          stroke={i === 2 ? '#ff5a2e' : 'rgba(91,130,255,0.45)'}
          strokeWidth={i === 2 ? 2 : 1}
        />
      ))}
      <rect x="176" y="132" width="48" height="36" fill="#5b82ff" />
      <rect x="188" y="144" width="24" height="12" fill="#ff5a2e" />
    </svg>
  );
}

function FlowScheme() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      {['M20 70 C120 40 200 90 380 50', 'M20 130 C140 110 220 160 380 120', 'M20 190 C130 210 240 170 380 200', 'M20 240 C150 250 230 220 380 246'].map((d, i) => (
        <path key={d} d={d} fill="none" stroke={i === 1 ? '#ff5a2e' : i === 2 ? '#5b82ff' : 'rgba(196,160,106,0.35)'} strokeWidth={i === 1 ? 2 : 1.2} />
      ))}
      <circle cx="96" cy="148" r="18" fill="none" stroke="#f3efe4" strokeWidth="1.2" />
      <circle cx="96" cy="148" r="4" fill="#c4a06a" />
    </svg>
  );
}

const schemes = {
  orbit: OrbitScheme,
  contact: ContactScheme,
  flow: FlowScheme,
};

export function ObservationPlate({ kind }: { kind: PlateKey }) {
  const item = plates[kind];
  const Scheme = schemes[kind];
  const [cursor, setCursor] = useState<{ x: number; y: number; nx: number; ny: number } | null>(null);

  return (
    <figure className="group bg-[var(--bg)]">
      <div
        className="plate-canvas aspect-[4/3]"
        onMouseMove={(event) => {
          const box = event.currentTarget.getBoundingClientRect();
          const x = event.clientX - box.left;
          const y = event.clientY - box.top;
          setCursor({ x, y, nx: x / box.width, ny: y / box.height });
        }}
        onMouseLeave={() => setCursor(null)}
      >
        <img
          src={item.src}
          alt={item.alt}
          width={1280}
          height={960}
          loading="lazy"
          className="plate-photo h-full w-full object-cover"
        />
        <div className="plate-scheme" aria-hidden="true">
          <div className="plate-grid absolute inset-0" />
          <Scheme />
        </div>
        {cursor ? (
          <div className="plate-reticle" style={{ left: cursor.x, top: cursor.y }} aria-hidden="true">
            <span className="plate-reticle__ring" />
            <span className="plate-reticle__x" />
            <span className="plate-reticle__y" />
            <span className="plate-reticle__readout">
              {cursor.nx.toFixed(3)} · {cursor.ny.toFixed(3)}
            </span>
          </div>
        ) : null}
      </div>
      <figcaption className="grid grid-cols-[1fr_auto] items-end gap-4 border-t border-[color:var(--rule)] p-4 sm:p-5">
        <span className="text-[clamp(1.05rem,2vw,1.25rem)] tracking-[-0.03em]">{item.title}</span>
        <span className="max-w-[11rem] text-right text-xs leading-5 text-[var(--ink3)]">{item.caption}</span>
      </figcaption>
    </figure>
  );
}
