'use client';

import { useEffect, useState } from 'react';

const branches = [
  { id: '01', delta: '−8.0%', label: 'DECAY', tone: 'bad' as const },
  { id: '02', delta: '0.0%', label: 'STABLE', tone: 'good' as const },
  { id: '03', delta: '+12.0%', label: 'ESCAPE', tone: 'warn' as const },
];

const state = [
  ['body.mass', '420.000 kg'],
  ['orbit.alt', '612.000 km'],
  ['state.t', '42.600 s'],
  ['constraint', 'energy'],
];

export function HeroConsole() {
  const [tick, setTick] = useState(0);
  const [branch, setBranch] = useState(1);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setTick((value) => (value + 1) % 240), 80);
    return () => window.clearInterval(id);
  }, []);

  const time = (42.6 + (tick % 40) * 0.05).toFixed(1);
  const selected = branches[branch];

  return (
    <section className="console relative flex min-h-[620px] flex-col overflow-hidden sm:min-h-[680px]" aria-label="Live fork console">
      <div className="console-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-[rgba(196,160,106,0.2)] px-4 py-3.5">
        <div className="flex items-center gap-2">
          <span className="signal-square bg-[#ff5a2e]" aria-hidden="true" />
          <p className="eyebrow text-[rgba(243,239,228,0.55)]">Run 0042</p>
        </div>
        <p className="mono text-[0.58rem] uppercase tracking-[0.1em] text-[#8ef06a]">live</p>
        <p className="mono text-[0.58rem] text-[rgba(243,239,228,0.4)]">t={time}s</p>
      </div>

      <div className="relative grid grid-cols-3 border-b border-[rgba(196,160,106,0.18)]">
        {branches.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setBranch(index)}
            aria-pressed={branch === index}
            className={`min-h-[5.5rem] border-r border-[rgba(196,160,106,0.16)] px-3 py-4 text-left last:border-r-0 ${
              branch === index ? 'bg-[rgba(91,130,255,0.95)] text-white' : 'text-[#f3efe4]'
            }`}
          >
            <span className="mono block text-[0.52rem] opacity-55">B.{item.id}</span>
            <span className="mono mt-2 block text-lg tracking-[-0.04em]">{item.delta}</span>
            <span className="mono mt-1 block text-[0.55rem] tracking-[0.08em]">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="relative min-h-[280px] flex-1">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 220" preserveAspectRatio="none" aria-hidden="true">
          <path d="M16 176 C70 148 120 156 170 122 C220 88 280 96 344 58" fill="none" stroke="rgba(91,130,255,0.35)" strokeWidth="1.2" />
          <path d="M16 176 C80 168 140 172 190 162 C250 150 300 152 344 144" fill="none" stroke="rgba(243,239,228,0.28)" strokeWidth="1.2" />
          <path
            d="M16 176 C64 120 130 78 200 72 C260 66 300 52 344 42"
            fill="none"
            stroke={branch === 1 ? '#ff5a2e' : '#c4a06a'}
            strokeWidth="2.2"
            strokeDasharray="7 6"
            strokeDashoffset={-(tick % 26)}
          />
          <rect x="10" y="170" width="10" height="10" fill="#f3efe4" />
          <rect x="338" y={branch === 0 ? 138 : branch === 1 ? 36 : 52} width="8" height="8" fill="#ff5a2e" />
        </svg>
        <div className="absolute bottom-4 left-3 border border-[rgba(196,160,106,0.28)] bg-[#070708] px-3 py-2">
          <p className="eyebrow text-[#c4a06a]">Branch {selected.id}</p>
          <p className="mono mt-1 text-[0.62rem] text-[#f3efe4]">{selected.label} · verified</p>
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-px border-t border-[rgba(196,160,106,0.2)] bg-[rgba(196,160,106,0.16)]">
        {state.map(([name, value]) => (
          <div key={name} className="bg-[#070708] px-4 py-3">
            <p className="mono text-[0.52rem] uppercase tracking-[0.08em] text-[rgba(243,239,228,0.35)]">{name}</p>
            <p className="mono mt-1 text-[0.68rem] text-[#f3efe4]">{value}</p>
          </div>
        ))}
      </div>

      <div className="relative grid grid-cols-4 border-t border-[rgba(196,160,106,0.2)]">
        {['Persist', 'Branch', 'Route', 'Verify'].map((step, index) => (
          <div key={step} className="border-r border-[rgba(196,160,106,0.16)] px-2 py-4 text-center last:border-r-0">
            <span className="mono block text-[0.5rem] text-[rgba(243,239,228,0.35)]">0{index + 1}</span>
            <span className="mono mt-1 block text-[0.58rem] uppercase tracking-[0.08em] text-[#f3efe4]">{step}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
