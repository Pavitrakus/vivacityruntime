const lines = [
  'world   = compile(spec)',
  'state   = inspect(world)',
  '',
  'forks   = fork(state, n=3)',
  'plan    = route(forks)',
  'results = execute(plan)',
  'verdict = verify(results, invariants)',
  '',
  'if verdict.ok: commit(world, verdict)',
  'else:          rollback(world, state)',
  '',
  'observe(world.current, view)',
];

export function CodeTrace() {
  return (
    <div className="code-panel overflow-x-auto">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
        <p className="eyebrow text-white/45">Contract</p>
        <p className="mono text-[0.55rem] uppercase tracking-[0.1em] text-[#c4a06a]">semantics, not an SDK</p>
      </div>
      <pre className="mono min-w-[28rem] p-5 text-[0.8rem] leading-7 sm:p-7">
        <code>
          {lines.map((line, index) => (
            <span key={index} className="block">
              {line === '' ? '\u00a0' : line}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
