const forks = [
  { name: 'B.01', label: 'DECAY', value: 42, tone: '#ff5a2e' },
  { name: 'B.02', label: 'STABLE', value: 88, tone: '#5b82ff' },
  { name: 'B.03', label: 'ESCAPE', value: 61, tone: '#c4a06a' },
];

const routing = [
  { name: 'Exact', share: 28 },
  { name: 'Physics', share: 34 },
  { name: 'Learned', share: 22 },
  { name: 'Custom', share: 16 },
];

export function ForkGraph() {
  return (
    <div className="graph-card">
      <div className="flex items-center justify-between border-b border-[color:var(--rule)] px-4 py-3 sm:px-5">
        <p className="eyebrow text-[var(--ink3)]">Worked example / three forks</p>
        <p className="mono text-[0.55rem] uppercase tracking-[0.1em] text-[var(--ink3)]">objective score</p>
      </div>
      <div className="grid gap-5 p-4 sm:p-6">
        {forks.map((fork) => (
          <div key={fork.name}>
            <div className="mb-2 flex items-center justify-between">
              <span className="mono text-[0.62rem]">{fork.name} · {fork.label}</span>
              <span className="mono text-[0.62rem] text-[var(--ink3)]">{fork.value}</span>
            </div>
            <div className="h-1.5 bg-[var(--bg3)]">
              <div className="h-full" style={{ width: `${fork.value}%`, background: fork.tone }} />
            </div>
          </div>
        ))}
      </div>
      <p className="border-t border-[color:var(--rule)] px-4 py-3 text-sm leading-6 text-[var(--ink2)] sm:px-5">
        Same parent state. Same action class. Three isolated mutations. Only B.02 clears the invariant set, so it is the only candidate that can commit.
      </p>
    </div>
  );
}

export function RoutingGraph() {
  return (
    <div className="graph-card">
      <div className="flex items-center justify-between border-b border-[color:var(--rule)] px-4 py-3 sm:px-5">
        <p className="eyebrow text-[var(--ink3)]">Routing mix / illustrative</p>
        <p className="mono text-[0.55rem] uppercase tracking-[0.1em] text-[var(--ink3)]">per 100 transitions</p>
      </div>
      <div className="grid grid-cols-4">
        {routing.map((row) => (
          <div key={row.name} className="border-r border-[color:var(--rule)] p-4 last:border-r-0 sm:p-5">
            <p className="mono text-[0.55rem] text-[var(--ink3)]">{row.name}</p>
            <p className="mt-4 text-3xl tracking-[-0.06em]">{row.share}</p>
            <div className="mt-4 h-16">
              <svg viewBox="0 0 40 64" className="h-full w-full" aria-hidden="true" preserveAspectRatio="none">
                <rect x="14" y={64 - row.share * 0.64} width="12" height={row.share * 0.64} fill="currentColor" className="text-[var(--cobalt)]" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <p className="border-t border-[color:var(--rule)] px-4 py-3 text-sm leading-6 text-[var(--ink2)] sm:px-5">
        Routing is per transition, not per world. A robotics run can use physics for contact, an exact solver for a constraint, and a learned model for the open stretch.
      </p>
    </div>
  );
}
