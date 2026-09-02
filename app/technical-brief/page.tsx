import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ForkGraph, RoutingGraph } from '@/components/brief-graph';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { demoHref, demoLinkProps, siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Architecture Brief 001',
  description: 'Vivacity system architecture: persistent world state, explicit actions, branch isolation, execution routing, verification, and observations.',
};

const layers = [
  ['01', 'World compiler', 'Resolves a world description into explicit entities, variables, constraints, relationships, and objectives.', 'world.spec → world.graph'],
  ['02', 'Persistent WorldState', 'Owns the current truth of the world across actions. Every revision has identity, time, and lineage.', 'graph + values + lineage'],
  ['03', 'Action contract', 'Validates a proposed operation, its target, parameters, preconditions, and expected effects.', 'intent → admissible action'],
  ['04', 'Execution router', 'Chooses an executor from the transition requirements, available capabilities, and declared policy.', 'transition → execution plan'],
  ['05', 'Branch manager', 'Creates isolated state forks, records mutations, and preserves ancestry for later comparison.', 'state.n → state.n.1..k'],
  ['06', 'Verifier', 'Evaluates invariants, constraints, objectives, and executor-specific evidence before a result can advance.', 'result → verdict + evidence'],
  ['07', 'Observation layer', 'Projects the right subset of state for the next agent decision without exposing the entire world.', 'state → task view'],
  ['08', 'Renderer', 'Produces pixels, geometry, telemetry, or text only when the requested observation needs it.', 'view spec → observation'],
];

const executionPaths = [
  ['Exact', 'Known equations, discrete rules, or numerical constraints.', 'Deterministic transition', 'State delta + solver evidence'],
  ['Physics', 'Contact, motion, geometry, materials, or sensor simulation.', 'Engine-mediated transition', 'Engine state + derived observations'],
  ['Learned', 'Open environments where a learned predictive model is the chosen executor.', 'Predicted transition', 'Candidate state + uncertainty evidence'],
  ['Custom', 'Private domain logic or an existing company-specific simulator.', 'Adapter-defined transition', 'Normalized result + backend evidence'],
];

const invariants = [
  ['Identity', 'A world and every branch have stable identifiers.'],
  ['Lineage', 'Every candidate state can be traced to its parent revision.'],
  ['Isolation', 'A branch cannot mutate its parent or a sibling branch.'],
  ['Explicit time', 'Transitions advance declared world time, not hidden wall-clock state.'],
  ['Evidence', 'A verification verdict retains the facts used to produce it.'],
  ['Projection', 'An observation may omit state, but it cannot redefine state.'],
];

const failureModes = [
  ['Rejected action', 'The proposal violates the action contract or a precondition. State does not advance.'],
  ['No valid executor', 'No available backend satisfies the transition requirements. The branch remains inspectable.'],
  ['Execution failure', 'The selected executor does not produce a valid result. Error evidence stays attached to the branch.'],
  ['Verification failure', 'The transition completes but breaks a declared invariant or objective. Commit is blocked.'],
  ['Observation failure', 'State remains valid even if a requested view cannot be produced.'],
];

const trace = [
  'world    := compile(description, constraints)',
  'state.0  := inspect(world)',
  '',
  'fork.1   := fork(state.0)',
  'fork.2   := fork(state.0)',
  'fork.3   := fork(state.0)',
  '',
  'mutate(fork.1, parameter, -0.08)',
  'mutate(fork.2, parameter,  0.00)',
  'mutate(fork.3, parameter, +0.12)',
  '',
  'plan     := route([fork.1, fork.2, fork.3])',
  'results  := execute(plan)',
  'verdicts := verify(results, invariants, objective)',
  'choice   := compare(verdicts)',
  '',
  'if choice is admissible:',
  '    commit(world, choice)',
  'else:',
  '    rollback(world, state.0)',
  '',
  'observe(world.current, view_spec)',
].join('\n');

export default function TechnicalBrief() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <div className="site-shell">
        <SiteHeader />

        <section className="brief-hero grid min-h-[76svh] border-b border-[color:var(--rule)] lg:grid-cols-12">
          <div className="flex flex-col justify-between border-b border-[color:var(--rule)] p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <Link href="/" className="link-mark eyebrow inline-flex items-center gap-2">
              <ArrowLeft className="size-3.5" aria-hidden="true" /> Return home
            </Link>
            <div className="mt-20 grid grid-cols-2 gap-6">
              <div>
                <p className="eyebrow text-[var(--ink3)]">Document</p>
                <p className="mono mt-2 text-xs">VIV-AB-001</p>
              </div>
              <div>
                <p className="eyebrow text-[var(--ink3)]">Status</p>
                <p className="mono mt-2 text-xs">PUBLIC BETA</p>
              </div>
              <div>
                <p className="eyebrow text-[var(--ink3)]">Scope</p>
                <p className="mono mt-2 text-xs">CONCEPTUAL</p>
              </div>
              <div>
                <p className="eyebrow text-[var(--ink3)]">Revision</p>
                <p className="mono mt-2 text-xs">001</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between p-5 sm:p-8 lg:col-span-8 lg:p-12">
            <div>
              <p className="eyebrow mb-7 text-[var(--ink3)]">Vivacity / technical system</p>
              <h1 className="text-[clamp(4rem,10vw,11rem)] font-[520] leading-[0.76] tracking-[-0.085em]">
                Architecture<br /><span className="text-[var(--cobalt)]">Brief 001.</span>
              </h1>
            </div>
            <p className="mt-16 max-w-3xl text-[clamp(1.25rem,2.1vw,2.1rem)] leading-[1.16] tracking-[-0.04em]">
              Vivacity maintains an executable world around an agent. It owns state continuity, action semantics, branch lineage, execution routing, verification, and task-specific observations.
            </p>
          </div>
        </section>

        <section className="grid border-b border-[color:var(--rule)] lg:grid-cols-12">
          <div className="border-b border-[color:var(--rule)] p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <p className="eyebrow text-[var(--ink3)]">System intent / 001</p>
          </div>
          <div className="lg:col-span-8">
            <div className="p-5 sm:p-8 lg:p-12">
              <h2 className="max-w-5xl text-[clamp(3rem,6.2vw,7rem)] font-[520] leading-[0.85] tracking-[-0.075em]">
                One contract from inspect <span className="text-[var(--vermilion)]">to commit.</span>
              </h2>
              <p className="mt-8 max-w-3xl text-lg leading-7 text-[var(--ink2)]">
                An agent should be able to inspect, act, fork, execute, and evaluate a world through one coherent contract. The executor may change. The meaning of the world should not.
              </p>
              <div className="mt-8 max-w-3xl space-y-5 text-sm leading-7 text-[var(--ink2)]">
                <p>
                  A planner arrives with a goal and a proposed action. Vivacity checks that action against the current world, then either admits it or rejects it with a reason. If it is admitted, the runtime can fork the world, send the transition to a backend, and hold the result until verification finishes.
                </p>
                <p>
                  Nothing in that loop is hidden wall-clock state. Time is declared. Lineage is recorded. A failed branch stays inspectable. The parent world does not move unless a verdict says it can.
                </p>
              </div>
            </div>
            <div className="grid border-t border-[color:var(--rule)] sm:grid-cols-3">
              {[
                ['CONTROL PLANE', 'State, lineage, routing, and verification stay coherent.'],
                ['EXECUTION PLANE', 'Solvers, engines, learned models, or custom systems compute transitions.'],
                ['OBSERVATION PLANE', 'Agents receive the view required for the next decision.'],
              ].map(([title, copy]) => (
                <article key={title} className="min-h-56 border-b border-[color:var(--rule)] p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:p-6">
                  <p className="eyebrow text-[var(--cobalt)]">{title}</p>
                  <p className="mt-16 text-lg leading-6 tracking-[-0.025em]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid border-b border-[color:var(--rule)] lg:grid-cols-12">
          <div className="border-b border-[color:var(--rule)] p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <p className="eyebrow text-[var(--ink3)]">Worked example / 001b</p>
            <h2 className="mt-16 max-w-sm text-[clamp(2.2rem,4.2vw,3.8rem)] leading-[0.9] tracking-[-0.06em]">
              One parent. Three futures.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-[var(--ink2)]">
              The graphs below are illustrative, not production telemetry. They show how a run is meant to be read: compare isolated outcomes, then commit the one that holds.
            </p>
          </div>
          <div className="grid gap-px bg-[var(--rule2)] lg:col-span-8 lg:grid-cols-1">
            <div className="bg-[var(--bg)] p-5 sm:p-8">
              <ForkGraph />
            </div>
            <div className="bg-[var(--bg)] p-5 sm:p-8">
              <RoutingGraph />
            </div>
          </div>
        </section>

        <section className="grid border-b border-[color:var(--rule)] lg:grid-cols-12">
          <div className="border-b border-[color:var(--rule)] p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <p className="eyebrow text-[var(--ink3)]">Runtime responsibilities / 002</p>
            <p className="mt-8 max-w-sm text-sm leading-6 text-[var(--ink2)]">
              These are architectural responsibilities, not final package names or public API guarantees.
            </p>
          </div>
          <div className="lg:col-span-8">
            {layers.map(([index, title, copy, io]) => (
              <article key={title} className="layer-row grid grid-cols-[54px_1fr] border-b border-[color:var(--rule)] last:border-b-0 sm:grid-cols-[72px_1fr_1.25fr]">
                <span className="mono p-4 text-xs text-[var(--ink3)] sm:p-6">{index}</span>
                <div className="border-l border-[color:var(--rule)] p-4 sm:p-6">
                  <h3 className="text-2xl tracking-[-0.045em]">{title}</h3>
                  <p className="mono mt-5 text-[0.6rem] text-[var(--cobalt)]">{io}</p>
                </div>
                <p className="col-span-2 border-l border-t border-[color:var(--rule)] p-4 text-sm leading-6 text-[var(--ink2)] sm:col-span-1 sm:border-t-0 sm:p-6">{copy}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-[#08090A] text-[#F2EFE6]">
        <div className="site-shell border-white/20">
          <div className="grid border-b border-white/20 lg:grid-cols-12">
            <div className="border-b border-white/20 p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
              <p className="eyebrow text-white/40">Illustrative execution trace</p>
              <p className="mono mt-3 text-[0.62rem] uppercase tracking-[0.08em] text-[var(--vermilion)]">Interface subject to change</p>
            </div>
            <div className="p-5 sm:p-8 lg:col-span-8 lg:p-12">
              <h2 className="text-[clamp(3.2rem,7vw,8rem)] font-[510] leading-[0.82] tracking-[-0.075em]">
                Fork. Mutate.<br />Execute. Compare.<br /><span className="text-[var(--vermilion)]">Commit or rollback.</span>
              </h2>
            </div>
          </div>
          <div className="grid lg:grid-cols-12">
            <div className="border-b border-white/20 p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
              <p className="max-w-sm text-xl leading-[1.18] tracking-[-0.035em]">
                This trace explains the intended semantics. It is not public SDK documentation and does not promise a final wire format.
              </p>
              <div className="mono mt-12 space-y-3 text-[0.6rem] text-white/40">
                <p>01 / parent state is immutable</p>
                <p>02 / branch writes are isolated</p>
                <p>03 / commit requires a verdict</p>
              </div>
            </div>
            <div className="trace-panel overflow-x-auto lg:col-span-8">
              <pre className="mono min-w-[680px] p-5 text-[0.78rem] leading-7 sm:p-8 lg:p-12"><code>{trace}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <div className="site-shell">
        <section className="grid border-b border-[color:var(--rule)] lg:grid-cols-12">
          <div className="border-b border-[color:var(--rule)] p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <p className="eyebrow text-[var(--ink3)]">State invariants / 003</p>
            <h2 className="mt-20 max-w-sm text-[clamp(2.8rem,5vw,5.5rem)] leading-[0.88] tracking-[-0.07em]">What must remain true.</h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-[var(--ink2)]">
              These are the properties a world keeps even when an executor fails, a view cannot be rendered, or a branch is dropped. If one of them breaks, commit is blocked.
            </p>
          </div>
          <div className="grid gap-px bg-[var(--rule2)] lg:col-span-8 sm:grid-cols-2">
            {invariants.map(([title, copy], index) => (
              <article key={title} className={`min-h-56 p-5 sm:p-7 ${index === 1 || index === 4 ? 'bg-[var(--cobalt)] text-white' : 'bg-[var(--bg)]'}`}>
                <p className="mono text-[0.58rem] opacity-50">0{index + 1}</p>
                <h3 className="mt-10 text-3xl tracking-[-0.05em]">{title}</h3>
                <p className="mt-5 max-w-sm text-sm leading-6 opacity-65">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid border-b border-[color:var(--rule)] lg:grid-cols-12">
          <div className="border-b border-[color:var(--rule)] p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <p className="eyebrow text-[var(--ink3)]">Execution paths / 004</p>
            <h2 className="mt-20 max-w-sm text-[clamp(2.8rem,5vw,5.5rem)] leading-[0.88] tracking-[-0.07em]">Route by requirement.</h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-[var(--ink2)]">
              The router reads the transition, the declared constraints, and the backends that are actually available. It picks one. The result always comes back in the same shape: a candidate state plus evidence.
            </p>
          </div>
          <div className="lg:col-span-8">
            {executionPaths.map(([name, fit, behavior, output], index) => (
              <article key={name} className="grid border-b border-[color:var(--rule)] last:border-b-0 sm:grid-cols-[72px_1fr_1fr]">
                <span className="mono p-4 text-xs text-[var(--ink3)] sm:p-6">0{index + 1}</span>
                <div className="border-l border-[color:var(--rule)] p-4 sm:p-6">
                  <h3 className="text-3xl tracking-[-0.05em]">{name}</h3>
                  <p className="mt-4 text-sm leading-6 text-[var(--ink2)]">{fit}</p>
                </div>
                <div className="col-span-2 border-l border-t border-[color:var(--rule)] p-4 sm:col-span-1 sm:border-t-0 sm:p-6">
                  <p className="eyebrow text-[var(--ink3)]">Transition</p>
                  <p className="mono mt-2 text-xs">{behavior}</p>
                  <p className="eyebrow mt-8 text-[var(--ink3)]">Normalized result</p>
                  <p className="mono mt-2 text-xs">{output}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid border-b border-[color:var(--rule)] lg:grid-cols-12">
          <div className="border-b border-[color:var(--rule)] p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <p className="eyebrow text-[var(--ink3)]">Failure semantics / 005</p>
            <p className="mt-8 max-w-sm text-sm leading-6 text-[var(--ink2)]">Failure is state. It should be inspectable, attributable, and safe by default.</p>
          </div>
          <div className="lg:col-span-8">
            {failureModes.map(([title, copy], index) => (
              <article key={title} className="grid min-h-32 grid-cols-[54px_1fr] border-b border-[color:var(--rule)] last:border-b-0 sm:grid-cols-[72px_1fr_1.4fr]">
                <span className="mono p-4 text-xs text-[var(--vermilion)] sm:p-6">F{index + 1}</span>
                <h3 className="border-l border-[color:var(--rule)] p-4 text-xl tracking-[-0.035em] sm:p-6">{title}</h3>
                <p className="col-span-2 border-l border-t border-[color:var(--rule)] p-4 text-sm leading-6 text-[var(--ink2)] sm:col-span-1 sm:border-t-0 sm:p-6">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid border-b border-[color:var(--rule)] lg:grid-cols-12">
          <div className="border-b border-[color:var(--rule)] p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <p className="eyebrow text-[var(--ink3)]">Observation contract / 006</p>
          </div>
          <div className="grid gap-px bg-[var(--rule2)] lg:col-span-8 lg:grid-cols-2">
            <div className="min-h-[420px] bg-[var(--cobalt)] p-5 text-white sm:p-8">
              <p className="eyebrow">State</p>
              <h2 className="mt-24 text-[clamp(3.2rem,5.4vw,6rem)] leading-[0.84] tracking-[-0.075em]">The full world.</h2>
              <p className="mt-7 max-w-sm text-sm leading-6 text-white/70">Objects, variables, relationships, constraints, time, lineage, and the current executable condition of the world.</p>
            </div>
            <div className="min-h-[420px] bg-[var(--vermilion)] p-5 text-white sm:p-8">
              <p className="eyebrow">Observation</p>
              <h2 className="mt-24 text-[clamp(3.2rem,5.4vw,6rem)] leading-[0.84] tracking-[-0.075em]">The next view.</h2>
              <p className="mt-7 max-w-sm text-sm leading-6 text-white/70">A partial projection for a decision: pixels, geometry, telemetry, text, or another task-specific representation.</p>
            </div>
          </div>
        </section>

        <section className="grid min-h-[72svh] lg:grid-cols-12">
          <div className="border-b border-[color:var(--rule)] p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <p className="eyebrow text-[var(--ink3)]">Public beta / technical demos</p>
          </div>
          <div className="flex flex-col justify-between p-5 sm:p-8 lg:col-span-8 lg:p-12">
            <h2 className="max-w-5xl text-[clamp(3.6rem,7.5vw,9rem)] font-[510] leading-[0.8] tracking-[-0.08em]">Build against a world that remembers.</h2>
            <div className="mt-16 grid gap-px bg-[var(--rule2)] sm:grid-cols-[1fr_auto]">
              <a href={demoHref} {...demoLinkProps} className="flex min-h-28 items-center justify-between bg-[var(--cobalt)] p-5 text-xl font-[620] tracking-[-0.035em] text-white transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg)] sm:p-7">
                Book a technical demo <ArrowUpRight className="size-6" aria-hidden="true" />
              </a>
              <a href={`mailto:${siteConfig.email}`} className="eyebrow flex min-h-20 items-center bg-[var(--bg)] px-5 transition-colors hover:bg-[var(--bg2)] sm:min-w-64 sm:px-7">{siteConfig.email}</a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
