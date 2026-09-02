'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const stages = ['Describe', 'Compile', 'Inspect', 'Act', 'Fork', 'Execute', 'Verify', 'Observe'];

const scenarios = {
  orbit: {
    label: 'Orbital transfer',
    short: 'Orbit',
    unit: 'km/s',
    base: 7.62,
    revision: 'w:01F9 / s:0042',
    branchPaths: [
      'M32 238 C98 108 235 74 372 176 C430 220 492 204 566 132',
      'M32 238 C120 140 236 122 354 194 C422 234 486 226 566 184',
      'M32 238 C86 48 296 18 566 76',
    ],
    state: [
      ['body.mass', '420.000 kg'],
      ['orbit.alt', '612.000 km'],
      ['state.t', '42.600 s'],
      ['constraint', 'energy'],
    ],
    outcomes: ['DECAY', 'STABLE', 'ESCAPE'],
  },
  dynamics: {
    label: 'Coupled dynamics',
    short: 'Dynamics',
    unit: 'rad/s',
    base: 1.18,
    revision: 'w:024B / s:0188',
    branchPaths: [
      'M32 188 C94 62 150 278 218 142 S340 62 402 164 S506 250 566 116',
      'M32 166 C112 270 172 40 242 174 S362 258 430 126 S512 62 566 154',
      'M32 208 C106 132 162 242 232 132 S356 94 424 184 S510 214 566 138',
    ],
    state: [
      ['links', '03'],
      ['joint.02', '1.180 rad'],
      ['constraint', 'fixed'],
      ['integrator', 'implicit'],
    ],
    outcomes: ['DAMPED', 'LOCKED', 'RESONANT'],
  },
  contact: {
    label: 'Contact action',
    short: 'Contact',
    unit: 'N',
    base: 38.4,
    revision: 'w:031C / s:0274',
    branchPaths: [
      'M32 218 L146 218 L206 118 L312 118 L378 56 L566 56',
      'M32 238 L164 238 L230 158 L350 158 L420 104 L566 104',
      'M32 258 L188 258 L250 204 L368 204 L438 178 L566 178',
    ],
    state: [
      ['contacts', '04'],
      ['friction', '0.420'],
      ['grip.pose', '[.41,.18]'],
      ['constraint', 'no-slip'],
    ],
    outcomes: ['REJECT', 'GRASP', 'SLIP'],
  },
} as const;

type Scenario = keyof typeof scenarios;

export function RuntimeInstrument() {
  const [scenario, setScenario] = useState<Scenario>('orbit');
  const [branch, setBranch] = useState(1);
  const [tick, setTick] = useState(0);
  const [active, setActive] = useState(true);
  const rootRef = useRef<HTMLElement>(null);
  const current = scenarios[scenario];

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(node);
    const onVisibility = () => setActive(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setTick((value) => (value + 1) % 1000), 90);
    return () => window.clearInterval(id);
  }, [active]);

  const value = useMemo(() => {
    const scale = branch === 0 ? 0.92 : branch === 1 ? 1 : 1.12;
    return (current.base * scale).toFixed(2);
  }, [branch, current]);

  return (
    <section
      ref={rootRef}
      className="runtime-frame relative flex min-h-[520px] flex-col overflow-hidden bg-[#050506] text-[#F2EFE6] lg:min-h-[620px]"
      aria-label="Conceptual Vivacity runtime demonstration"
    >
      <div className="grid grid-cols-[1fr_auto] border-b border-white/20">
        <div className="flex items-center gap-3 px-4 py-3">
          <span className="signal-square bg-[#FF4B1F]" aria-hidden="true" />
          <span className="eyebrow text-white/60">Runtime / conceptual instrument</span>
        </div>
        <div className="mono flex items-center gap-2 border-l border-white/20 px-4 text-[0.62rem] uppercase tracking-[0.1em] text-[#9EFF6A]">
          <span className="h-1.5 w-1.5 bg-current" aria-hidden="true" /> active
        </div>
      </div>

      <div className="hidden grid-cols-8 border-b border-white/20 md:grid">
        {stages.map((stage, index) => (
          <div key={stage} className={`border-r border-white/15 px-3 py-3 last:border-r-0 ${index === 5 ? 'bg-[#2455FF]' : ''}`}>
            <span className="mono block text-[0.55rem] text-white/35">0{index + 1}</span>
            <span className="mono mt-1 block text-[0.6rem] uppercase tracking-[0.08em]">{stage}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 border-b border-white/20" role="tablist" aria-label="Simulation scenario">
        {(Object.keys(scenarios) as Scenario[]).map((key, index) => (
          <Button
            key={key}
            role="tab"
            aria-selected={scenario === key}
            onClick={() => {
              setScenario(key);
              setBranch(1);
            }}
            className={`h-14 rounded-none border-0 border-r border-white/20 bg-transparent px-2 font-mono text-[0.64rem] uppercase tracking-[0.08em] last:border-r-0 ${
              scenario === key
                ? 'bg-[#F2EFE6] text-[#08090A] hover:bg-[#F2EFE6]'
                : 'text-white/45 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span className="text-[#FF4B1F]">0{index + 1}</span>
            <span className="hidden sm:inline"> {scenarios[key].label}</span>
            <span className="sm:hidden"> {scenarios[key].short}</span>
          </Button>
        ))}
      </div>

      <div className="grid flex-1 lg:grid-cols-[180px_1fr_156px]">
        <div className="order-2 border-t border-white/20 p-4 lg:order-1 lg:border-r lg:border-t-0">
          <p className="eyebrow text-white/35">WorldState</p>
          <p className="mono mt-2 text-[0.58rem] text-[#2455FF]">{current.revision}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 lg:block lg:space-y-4">
            {current.state.map(([name, stateValue]) => (
              <div key={name}>
                <dt className="mono text-[0.58rem] uppercase text-white/35">{name}</dt>
                <dd className="mono mt-1 text-[0.68rem]">{stateValue}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 border-t border-white/15 pt-4">
            <p className="mono text-[0.58rem] uppercase text-white/35">lineage</p>
            <p className="mono mt-2 text-[0.64rem]">base → fork.0{branch + 1}</p>
          </div>
        </div>

        <div className="relative min-h-[340px] overflow-hidden lg:min-h-0">
          <div className="instrument-grid absolute inset-0" aria-hidden="true" />
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2 border border-white/20 bg-[#08090A] px-3 py-2">
            <span className="mono text-[0.58rem] uppercase text-white/40">Transition</span>
            <span className="mono text-[0.62rem]">a:IMPULSE_04</span>
          </div>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 300" preserveAspectRatio="none" aria-hidden="true">
            <line x1="32" y1="270" x2="570" y2="270" stroke="rgba(242,239,230,.18)" />
            <line x1="32" y1="24" x2="32" y2="270" stroke="rgba(242,239,230,.18)" />
            {current.branchPaths.map((path, index) => (
              <path
                key={path}
                d={path}
                fill="none"
                stroke={index === branch ? '#FF4B1F' : index === 1 ? '#F2EFE6' : '#2455FF'}
                strokeOpacity={index === branch ? 1 : 0.28}
                strokeWidth={index === branch ? 3 : 1.2}
                strokeDasharray={index === branch ? '8 6' : 'none'}
                strokeDashoffset={index === branch ? -(tick % 28) : 0}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <rect x="24" y="230" width="16" height="16" fill="#F2EFE6" />
            <rect x="558" y={branch === 0 ? 124 : branch === 1 ? 176 : 68} width="14" height="14" fill="#FF4B1F" />
          </svg>
          <div className="absolute bottom-4 right-4 min-w-40 border border-[#FF4B1F] bg-[#08090A] p-3">
            <div className="flex items-center justify-between gap-6">
              <p className="eyebrow text-[#FF4B1F]">Branch 0{branch + 1}</p>
              <span className="mono text-[0.55rem] text-[#9EFF6A]">VERIFIED</span>
            </div>
            <p className="mono mt-3 text-3xl tracking-[-0.06em]">{value}</p>
            <p className="mono text-[0.58rem] text-white/45">{current.unit} / normalized</p>
          </div>
        </div>

        <div className="order-3 hidden border-l border-white/20 lg:block">
          <p className="eyebrow border-b border-white/20 p-4 text-white/35">Branch set</p>
          {current.outcomes.map((outcome, index) => (
            <button
              key={outcome}
              type="button"
              onClick={() => setBranch(index)}
              aria-label={`Select branch ${index + 1}: ${outcome.toLowerCase()}`}
              className={`block w-full border-b border-white/15 p-4 text-left transition-colors ${branch === index ? 'bg-[#2455FF]' : 'hover:bg-white/10'}`}
            >
              <span className="mono block text-[0.57rem] text-white/40">B.0{index + 1}</span>
              <span className="mono mt-2 block text-[0.68rem]">{outcome}</span>
              <span className="mono mt-4 block text-[0.55rem] text-white/35">{index === 0 ? '−8.0%' : index === 1 ? 'BASE' : '+12.0%'}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[auto_1fr] items-stretch border-t border-white/20">
        <span className="eyebrow flex items-center border-r border-white/20 px-4 text-white/40">Fork state</span>
        <div className="grid grid-cols-3">
          {['−8%', 'BASE', '+12%'].map((label, index) => (
            <Button
              key={label}
              onClick={() => setBranch(index)}
              aria-pressed={branch === index}
              className={`h-16 rounded-none border-0 border-r border-white/20 font-mono text-xs last:border-r-0 ${
                branch === index
                  ? 'bg-[#F2EFE6] text-[#08090A] hover:bg-[#F2EFE6]'
                  : 'bg-transparent text-white/55 hover:bg-white/10 hover:text-white'
              }`}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
