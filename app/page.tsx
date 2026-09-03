import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import { CodeTrace } from '@/components/code-trace';
import { LineageMap } from '@/components/lineage-map';
import { ObservationPlate } from '@/components/observation-plate';
import { RuntimeInstrument } from '@/components/runtime-instrument';
import { Reveal } from '@/components/reveal';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { demoHref, demoLinkProps, siteConfig } from '@/lib/site-config';

const contract = [
  ['01', 'Describe', 'World spec accepted'],
  ['02', 'Compile', 'State graph created'],
  ['03', 'Inspect', 'Observation resolved'],
  ['04', 'Act', 'Intent validated'],
  ['05', 'Fork', 'Lineage isolated'],
  ['06', 'Execute', 'Backend selected'],
  ['07', 'Verify', 'Invariants checked'],
  ['08', 'Observe', 'Next view emitted'],
];

const routes = [
  ['01', 'Exact solver', 'Equations and constraints determine the next state. Same inputs, same result.', 'DETERMINISTIC'],
  ['02', 'Physics engine', 'Contact, motion, and geometry run through a stateful engine you already trust.', 'STATEFUL'],
  ['03', 'Learned world model', 'A predictive model stands in when the world will not reduce to closed form.', 'PROBABILISTIC'],
  ['04', 'Custom backend', 'Private simulation logic, wrapped so it returns the same shape as everything else.', 'ADAPTER'],
];

const proofs = [
  ['01', 'One contract', 'Every backend reads and writes the same world state.'],
  ['02', 'Isolated forks', 'A branch can fail without touching the parent.'],
  ['03', 'Four executors', 'Exact, physics, learned, or your own adapter.'],
  ['04', 'Evidence kept', 'Every verdict stores the facts that produced it.'],
];

const useCases = [
  ['Robotics', 'Manipulation & control', 'Rehearse contact-rich actions on isolated forks before a motor moves.'],
  ['Agents', 'Autonomous planning', 'Let a planner try actions against a world that still exists on the next step.'],
  ['Reinforcement', 'Training & eval', 'Deterministic resets, isolated rollouts, and reward signals you can replay.'],
  ['World models', 'Digital twins', 'Keep a live twin that branches when you need to ask what-if.'],
];

const faqs = [
  [
    'How do I keep my current simulator?',
    'Wrap it as an executor. Vivacity sends a transition and expects a normalized result plus the evidence used to produce it. Your engine stays in place.',
  ],
  [
    'What does a fork actually do?',
    'It copies the current world into a new lineage. Writes stay on that branch. The parent does not move until you commit a verified result, or you drop the branch.',
  ],
  [
    'Which backends can I plug in?',
    'Exact solvers, physics engines, learned world models, and custom adapters. Routing picks one per transition from the requirements you declare.',
  ],
  [
    'What happens when verification fails?',
    'The result stays attached to the branch with its evidence. Commit is blocked. The parent world is unchanged and still inspectable.',
  ],
  [
    'Can we use this in production yet?',
    'Public beta. Teams building agents, robotics, and simulation infra are on it now so the contract can settle against real stacks.',
  ],
];

const trust = ['Robotics', 'Autonomous agents', 'Reinforcement learning', 'World models', 'Digital twins', 'Simulation infra'];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <div className="site-shell">
        <div className="announce">
          <p className="eyebrow text-[var(--ink3)]">Architecture brief is live</p>
          <Link href="/technical-brief" className="link-mark eyebrow inline-flex shrink-0 items-center gap-1 text-[var(--ink)]">
            Read it <span aria-hidden="true">→</span>
          </Link>
        </div>

        <SiteHeader />

        <section className="field-lines ambient relative">
          <div className="grid lg:grid-cols-12">
            <div className="flex flex-col justify-center border-b border-[color:var(--rule)] px-5 py-8 sm:px-8 sm:py-10 lg:col-span-5 lg:border-b-0 lg:border-r lg:py-14">
              <div className="flex items-center gap-3">
                <span className="signal-square bg-[var(--cobalt)]" aria-hidden="true" />
                <p className="eyebrow">{siteConfig.status}</p>
              </div>

              <h1 className="type-display mt-7 max-w-[18ch] text-[clamp(2.6rem,8vw,5.6rem)] leading-[0.9] tracking-[-0.04em] sm:mt-9">
                Executable simulation runtime for <span className="text-[var(--cobalt)]">AI agents.</span>
              </h1>
              <p className="mt-6 max-w-[38rem] text-[clamp(1rem,2.4vw,1.2rem)] leading-[1.5] tracking-[-0.015em] text-[var(--ink2)] sm:mt-8">
                Describe a world. Preserve its state. Let an agent act, branch, simulate, and verify what happens next through the right execution backend.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-px bg-[var(--rule2)] sm:mt-10 sm:grid-cols-2">
                <a href={demoHref} {...demoLinkProps} className="cta-primary">
                  Book a technical demo <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
                <Link href="/technical-brief" className="cta-secondary">
                  Architecture Brief 001 <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <div className="border-b border-[color:var(--rule)] p-4 sm:p-6 lg:col-span-7 lg:border-b-0 lg:p-8">
              <div className="product-frame overflow-hidden">
                <RuntimeInstrument />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[color:var(--rule)] bg-[var(--bg3)]">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] md:items-center">
            <p className="eyebrow border-b border-[color:var(--rule)] px-5 py-4 text-[var(--ink3)] md:border-b-0 md:border-r md:px-8">
              Will be used by teams in
            </p>
            <div className="marquee py-4">
              <div className="marquee__track" aria-hidden="true">
                {[...trust, ...trust].map((item, index) => (
                  <span key={index} className="mono flex items-center whitespace-nowrap px-8 text-sm tracking-[-0.01em] text-[var(--ink2)]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="scroll-mt-28 border-t border-[color:var(--rule)]">
          <div className="border-b border-[color:var(--rule)] p-5 sm:p-8 lg:p-12">
            <h2 className="type-display max-w-4xl text-[clamp(2.5rem,6vw,5.8rem)] leading-[0.92] tracking-[-0.035em]">
              Your planner proposes. Your backend computes.{' '}
              <span className="text-[var(--cobalt)]">Vivacity keeps the world they share.</span>
            </h2>
          </div>
          <LineageMap />
          <div className="grid grid-cols-1 gap-px bg-[var(--rule2)] sm:grid-cols-2 lg:grid-cols-4">
            {proofs.map(([, title, copy], index) => (
              <div key={title} className="proof-cell flex min-h-52 flex-col justify-end bg-[var(--bg)] p-6 sm:min-h-64 sm:p-8">
                <p className={`eyebrow ${index % 2 === 0 ? 'text-[var(--cobalt)]' : 'text-[var(--vermilion)]'}`}>{title}</p>
                <p className="mt-6 max-w-xs text-[clamp(1.15rem,2vw,1.45rem)] leading-[1.25] tracking-[-0.03em] text-[var(--ink2)]">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="system" className="scroll-mt-28 border-t border-[color:var(--rule)]">
          <div className="border-b border-[color:var(--rule)] p-5 sm:p-8 lg:p-12">
            <h2 className="type-display max-w-5xl text-[clamp(2.6rem,6.2vw,6.2rem)] leading-[0.9] tracking-[-0.035em]">
              The layer between<br />
              <span className="text-[var(--vermilion)]">intent and consequence.</span>
            </h2>
          </div>
          <div className="system-boundary grid lg:grid-cols-[1fr_1.45fr_1fr]">
            <article className="border-b border-[color:var(--rule)] p-5 sm:p-8 lg:border-b-0">
              <p className="eyebrow text-[var(--ink3)]">Agent</p>
              <p className="mt-8 text-[clamp(1.9rem,3.4vw,2.6rem)] tracking-[-0.045em] lg:mt-14">Chooses the next action.</p>
              <ul className="mono mt-8 hidden space-y-2 text-[0.68rem] text-[var(--ink3)] md:block">
                <li>goal + context</li>
                <li>action proposal</li>
                <li>observation request</li>
              </ul>
            </article>
            <article className="ambient relative overflow-hidden border-b border-[color:var(--rule)] bg-[var(--cobalt)] p-5 text-white sm:p-8 lg:border-b-0 lg:border-x">
              <div className="boundary-v" aria-hidden="true">V</div>
              <p className="eyebrow relative">Vivacity</p>
              <p className="relative mt-8 max-w-lg text-[clamp(2.2rem,4.2vw,3.8rem)] leading-[0.92] tracking-[-0.05em] lg:mt-14">
                Holds state, forks, routing, and the commit gate.
              </p>
              <ul className="mono relative mt-8 hidden grid-cols-2 gap-2 text-[0.64rem] text-white/75 md:grid">
                <li>persistent state</li>
                <li>action contract</li>
                <li>branch lineage</li>
                <li>execution routing</li>
                <li>verification</li>
                <li>observations</li>
              </ul>
            </article>
            <article className="p-5 sm:p-8">
              <p className="eyebrow text-[var(--ink3)]">Executor</p>
              <p className="mt-8 text-[clamp(1.9rem,3.4vw,2.6rem)] tracking-[-0.045em] lg:mt-14">Computes the transition.</p>
              <ul className="mono mt-8 hidden space-y-2 text-[0.68rem] text-[var(--ink3)] md:block">
                <li>exact solver</li>
                <li>physics engine</li>
                <li>learned model</li>
                <li>custom backend</li>
              </ul>
            </article>
          </div>
        </section>
      </div>

      <section className="ambient bg-[var(--panel)] text-[var(--panel-ink)]">
        <div className="site-shell !border-white/15">
          <div className="border-b border-white/15 p-5 sm:p-8 lg:p-12">
            <Reveal>
              <h2 className="type-display max-w-5xl text-[clamp(2.8rem,7vw,7rem)] leading-[0.9] tracking-[-0.035em]">
                A world that <span className="text-[var(--vermilion)]">continues.</span>
              </h2>
            </Reveal>
          </div>

          <ol className="contract-rail grid md:grid-cols-4 xl:grid-cols-8">
            {contract.map(([, step, event], index) => (
              <li key={step} className={`group min-h-40 border-b border-r border-white/15 p-5 transition-colors hover:bg-[var(--cobalt)] xl:border-b-0 ${index === 5 ? 'bg-[var(--cobalt)]' : ''}`}>
                <div className="flex h-full flex-col justify-end gap-3">
                  <span className="block text-xl tracking-[-0.04em]">{step}</span>
                  <span className="mono text-[0.58rem] uppercase leading-4 text-white/45 group-hover:text-white/80">{event}</span>
                </div>
              </li>
            ))}
          </ol>

          <div className="grid lg:grid-cols-12">
            <div className="border-b border-white/15 p-5 sm:p-8 lg:col-span-5 lg:border-b-0 lg:border-r">
              <h3 className="type-display max-w-md text-[clamp(2.1rem,4.6vw,4.4rem)] leading-[0.94] tracking-[-0.03em]">
                Try three futures. Keep the one that holds.
              </h3>
              <p className="mt-7 max-w-sm text-sm leading-6 text-white/60">
                Each fork keeps its origin. Mutations stay local. A verified branch can be committed, kept for comparison, or thrown away.
              </p>
            </div>
            <div className="lg:col-span-7">
              <CodeTrace />
            </div>
          </div>
        </div>
      </section>

      <div className="site-shell">
        <section className="grid border-b border-[color:var(--rule)] lg:grid-cols-12">
          <div className="border-b border-[color:var(--rule)] p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <h2 className="type-display max-w-md text-[clamp(2.5rem,5.4vw,5.4rem)] leading-[0.9] tracking-[-0.035em]">
              Same contract.{' '}
              <span className="text-[var(--cobalt)]">The backend that fits.</span>
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-6 text-[var(--ink2)]">
              Vivacity picks an executor per transition, then writes the result back into the same world state.
            </p>
          </div>
          <div className="lg:col-span-8">
            {routes.map(([, title, copy, signal], index) => (
              <Reveal key={title} className="route-row grid min-h-44 border-b border-[color:var(--rule)] last:border-b-0 sm:grid-cols-[1.1fr_1fr_auto]">
                <h3 className="p-5 text-[clamp(1.7rem,3vw,2.6rem)] leading-[0.98] tracking-[-0.045em] sm:p-7">{title}</h3>
                <p className="border-t border-[color:var(--rule)] p-5 text-sm leading-6 text-[var(--ink2)] sm:border-t-0 sm:border-l sm:p-7">{copy}</p>
                <span className={`mono hidden items-end p-7 text-[0.58rem] sm:flex ${index % 2 === 0 ? 'text-[var(--cobalt)]' : 'text-[var(--vermilion)]'}`}>{signal}</span>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-b border-[color:var(--rule)]">
          <div className="p-5 sm:p-8 lg:p-12">
            <Reveal>
              <h2 className="type-display text-[clamp(2.6rem,6.4vw,6.2rem)] leading-[0.9] tracking-[-0.035em]">
                State is what is true.<br />
                <span className="text-[var(--vermilion)]">Observation is what an agent sees.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-px bg-[var(--rule2)] md:grid-cols-3">
            <ObservationPlate kind="orbit" />
            <ObservationPlate kind="contact" />
            <ObservationPlate kind="flow" />
          </div>
        </section>

        <section id="use-cases" className="scroll-mt-28 border-b border-[color:var(--rule)]">
          <div className="border-b border-[color:var(--rule)] p-5 sm:p-8 lg:p-12">
            <h2 className="type-display max-w-4xl text-[clamp(2.5rem,5.6vw,5.4rem)] leading-[0.92] tracking-[-0.035em]">
              Built for stacks that already have an agent and a world.
            </h2>
          </div>
          <div className="grid gap-px bg-[var(--rule2)] sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map(([tag, title, copy], index) => (
              <Reveal key={title} className="use-card flex min-h-72 flex-col justify-between bg-[var(--bg)] p-6 sm:min-h-80 sm:p-8">
                <span className={`eyebrow ${index % 2 === 0 ? 'text-[var(--cobalt)]' : 'text-[var(--vermilion)]'}`}>{tag}</span>
                <div>
                  <p className="text-[clamp(1.7rem,2.6vw,2.3rem)] leading-[1.05] tracking-[-0.04em]">{title}</p>
                  <p className="mt-4 text-sm leading-6 text-[var(--ink2)]">{copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="grid border-b border-[color:var(--rule)] lg:grid-cols-12">
          <div className="border-b border-[color:var(--rule)] p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <h2 className="type-display max-w-xs text-[clamp(2.2rem,4.2vw,3.6rem)] leading-[0.94] tracking-[-0.03em]">
              Questions
            </h2>
          </div>
          <div className="faq lg:col-span-8">
            {faqs.map(([q, a]) => (
              <details key={q} className="group">
                <summary className="flex items-center justify-between gap-6 p-5 sm:p-7">
                  <span className="max-w-2xl text-lg tracking-[-0.03em] sm:text-xl">{q}</span>
                  <Plus className="faq__sign size-5 shrink-0 text-[var(--cobalt)]" aria-hidden="true" />
                </summary>
                <p className="max-w-2xl px-5 pb-7 text-sm leading-6 text-[var(--ink2)] sm:px-7">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="grid min-h-[56svh] lg:grid-cols-12">
          <div className="flex flex-col justify-between p-5 sm:p-8 lg:col-span-12 lg:p-12">
            <Reveal>
              <h2 className="type-display max-w-5xl text-[clamp(3rem,7.4vw,7.6rem)] leading-[0.88] tracking-[-0.04em]">
                Bring your intelligence.<br />
                <span className="text-[var(--cobalt)]">Bring your execution.</span>
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-px bg-[var(--rule2)] sm:grid-cols-[1fr_auto]">
              <a href={demoHref} {...demoLinkProps} className="flex min-h-24 items-center justify-between bg-[var(--vermilion)] p-5 text-xl font-[620] tracking-[-0.035em] text-white transition-colors hover:bg-[var(--ink)] hover:text-[var(--bg)] sm:min-h-28 sm:p-7">
                Book a technical demo <ArrowUpRight className="size-6" aria-hidden="true" />
              </a>
              <a href={`mailto:${siteConfig.email}`} className="eyebrow flex min-h-16 items-center bg-[var(--bg)] px-5 transition-colors hover:bg-[var(--bg2)] sm:min-h-20 sm:min-w-64 sm:px-7">
                {siteConfig.email}
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
