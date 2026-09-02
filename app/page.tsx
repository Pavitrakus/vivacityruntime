import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { RuntimeInstrument } from '@/components/runtime-instrument';
import { Reveal } from '@/components/reveal';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { demoHref, demoLinkProps, siteConfig } from '@/lib/site-config';

const contract = [
  ['01', 'Describe', 'world.spec accepted'],
  ['02', 'Compile', 'state graph created'],
  ['03', 'Inspect', 'observation resolved'],
  ['04', 'Act', 'intent validated'],
  ['05', 'Fork', 'lineage isolated'],
  ['06', 'Execute', 'backend selected'],
  ['07', 'Verify', 'invariants checked'],
  ['08', 'Observe', 'next view emitted'],
];

const routes = [
  ['01', 'Exact solver', 'Equations and constraints determine the transition.', 'DETERMINISTIC'],
  ['02', 'Physics engine', 'Contact, motion, geometry, and domain dynamics.', 'STATEFUL'],
  ['03', 'Learned world model', 'Predictive execution for worlds that resist exact reduction.', 'PROBABILISTIC'],
  ['04', 'Custom backend', 'Private simulation logic and company-specific systems.', 'ADAPTER'],
];

const observations = [
  {
    src: '/plate-orbit.webp',
    index: 'OBS / 01',
    title: 'Orbital state',
    alt: 'False-color scientific observation of three orbital outcomes from one persistent state',
  },
  {
    src: '/plate-contact.webp',
    index: 'OBS / 02',
    title: 'Contact action',
    alt: 'False-color robotics observation comparing constrained gripper contact outcomes',
  },
  {
    src: '/plate-fluid.webp',
    index: 'OBS / 03',
    title: 'Flow state',
    alt: 'Block-sampled fluid simulation observation showing three branching wake outcomes',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F2EFE6]">
      <div className="site-shell">
        <SiteHeader />

        <section className="hero-grid relative grid min-h-[calc(100svh-64px)] grid-cols-1 lg:grid-cols-12">
          <div className="flex min-h-[650px] flex-col justify-between border-b border-black/20 p-5 sm:p-8 lg:col-span-5 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="signal-square bg-[#FF4B1F]" aria-hidden="true" />
                <p className="eyebrow">{siteConfig.status}</p>
              </div>
              <p className="mono text-[0.58rem] uppercase tracking-[0.1em] text-[#77756F]">SYSTEM / 001</p>
            </div>

            <div className="py-14 lg:py-8">
              <p className="eyebrow mb-6 text-[#77756F]">Execution infrastructure for agentic systems</p>
              <h1 className="max-w-[760px] text-[clamp(3.7rem,7vw,7.8rem)] font-[560] leading-[0.82] tracking-[-0.08em]">
                Executable simulation runtime for AI agents.
              </h1>
              <p className="mt-9 max-w-[37rem] text-[clamp(1.02rem,1.45vw,1.3rem)] leading-[1.42] tracking-[-0.025em] text-[#4f4e49]">
                Describe a world. Preserve its state. Let an agent act, branch, simulate, and verify what happens next through the right execution backend.
              </p>
            </div>

            <div>
              <div className="mb-5 grid grid-cols-4 border-y border-black/20">
                {['Persist', 'Branch', 'Route', 'Verify'].map((item, index) => (
                  <div key={item} className="border-r border-black/20 py-3 text-center last:border-r-0">
                    <span className="mono block text-[0.52rem] text-[#77756F]">0{index + 1}</span>
                    <span className="mono mt-1 block text-[0.6rem] uppercase tracking-[0.08em]">{item}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-px bg-black/20 sm:grid-cols-2">
                <a href={demoHref} {...demoLinkProps} className="cta-primary">
                  Book a technical demo <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
                <Link href="/technical-brief" className="cta-secondary">
                  Read Architecture Brief 001 <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center p-4 sm:p-7 lg:col-span-7 lg:p-8">
            <RuntimeInstrument />
          </div>
        </section>

        <section className="grid border-t border-black/20 lg:grid-cols-12">
          <div className="flex min-h-40 flex-col justify-between border-b border-black/20 p-5 sm:p-8 lg:col-span-4 lg:min-h-[430px] lg:border-b-0 lg:border-r">
            <p className="eyebrow text-[#77756F]">Position / 002</p>
            <p className="mono max-w-xs text-[0.65rem] leading-5 text-[#77756F]">
              NOT A WORLD MODEL<br />
              NOT A SINGLE SIMULATOR<br />
              NOT AN AGENT FRAMEWORK
            </p>
          </div>
          <Reveal className="flex min-h-[430px] flex-col justify-between p-5 sm:p-8 lg:col-span-8 lg:p-12">
            <h2 className="max-w-6xl text-[clamp(3.1rem,6.7vw,8rem)] font-[520] leading-[0.84] tracking-[-0.075em]">
              The layer between<br />
              <span className="text-[#2455FF]">intent and consequence.</span>
            </h2>
            <p className="mt-14 max-w-2xl text-lg leading-7 text-[#4f4e49]">
              Agents can reason about an action. Simulators can compute an outcome. Vivacity is the runtime contract that keeps state coherent between them.
            </p>
          </Reveal>
        </section>

        <section className="border-t border-black/20">
          <div className="grid border-b border-black/20 lg:grid-cols-12">
            <div className="border-b border-black/20 p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
              <p className="eyebrow text-[#77756F]">System boundary / 003</p>
            </div>
            <div className="p-5 sm:p-8 lg:col-span-8 lg:p-12">
              <h2 className="max-w-5xl text-[clamp(2.7rem,5.8vw,6.6rem)] font-[520] leading-[0.88] tracking-[-0.07em]">
                Bring your intelligence.<br />Bring your execution.
              </h2>
            </div>
          </div>
          <div className="system-boundary grid lg:grid-cols-[1fr_1.45fr_1fr]">
            <article className="p-5 sm:p-8">
              <p className="eyebrow text-[#77756F]">Input / agent</p>
              <p className="mt-16 text-3xl tracking-[-0.05em]">Chooses what to do next.</p>
              <ul className="mono mt-10 space-y-2 text-[0.68rem] text-[#77756F]">
                <li>goal + context</li>
                <li>action proposal</li>
                <li>observation request</li>
              </ul>
            </article>
            <article className="relative overflow-hidden border-y border-black/20 bg-[#2455FF] p-5 text-white sm:p-8 lg:border-x lg:border-y-0">
              <div className="boundary-v" aria-hidden="true">V</div>
              <p className="eyebrow relative">Runtime / Vivacity</p>
              <p className="relative mt-16 max-w-lg text-[clamp(2.5rem,4.2vw,5rem)] leading-[0.88] tracking-[-0.065em]">
                Keeps the world executable.
              </p>
              <ul className="mono relative mt-10 grid grid-cols-2 gap-2 text-[0.64rem] text-white/70">
                <li>persistent state</li>
                <li>action contract</li>
                <li>branch lineage</li>
                <li>execution routing</li>
                <li>verification</li>
                <li>observations</li>
              </ul>
            </article>
            <article className="p-5 sm:p-8">
              <p className="eyebrow text-[#77756F]">Output / executor</p>
              <p className="mt-16 text-3xl tracking-[-0.05em]">Computes what happens.</p>
              <ul className="mono mt-10 space-y-2 text-[0.68rem] text-[#77756F]">
                <li>exact solver</li>
                <li>physics engine</li>
                <li>learned model</li>
                <li>custom backend</li>
              </ul>
            </article>
          </div>
        </section>
      </div>

      <section className="bg-[#08090A] text-[#F2EFE6]">
        <div className="site-shell border-white/20">
          <div className="grid border-b border-white/20 lg:grid-cols-12">
            <div className="border-b border-white/20 p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
              <p className="eyebrow text-white/40">Runtime contract / 004</p>
            </div>
            <Reveal className="p-5 sm:p-8 lg:col-span-8 lg:p-12">
              <h2 className="max-w-5xl text-[clamp(3.3rem,7vw,8.4rem)] font-[510] leading-[0.82] tracking-[-0.075em]">
                A world that<br /><span className="text-[#FF4B1F]">continues.</span>
              </h2>
            </Reveal>
          </div>

          <ol className="contract-rail grid md:grid-cols-4 xl:grid-cols-8">
            {contract.map(([index, step, event]) => (
              <li key={step} className="group min-h-48 border-b border-r border-white/20 p-4 transition-colors hover:bg-[#2455FF] xl:border-b-0">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <span className="mono text-[0.58rem] text-white/30">/{index}</span>
                    <span className="mt-3 block h-1 w-1 bg-[#FF4B1F]" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xl tracking-[-0.04em]">{step}</span>
                    <span className="mono mt-2 block text-[0.55rem] uppercase leading-4 text-white/35 group-hover:text-white/65">{event}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="grid lg:grid-cols-12">
            <div className="border-b border-white/20 p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
              <p className="eyebrow mb-6 text-white/40">Branch before commitment</p>
              <h3 className="max-w-md text-[clamp(2.4rem,4.5vw,5rem)] leading-[0.9] tracking-[-0.06em]">
                Test consequences without corrupting the world.
              </h3>
              <p className="mt-8 max-w-sm text-sm leading-6 text-white/55">
                Every fork keeps its origin. Mutations stay isolated. A verified branch can be committed, retained, or rolled back.
              </p>
            </div>
            <div className="lg:col-span-8">
              {[
                ['BRANCH / 01', 'Δ −8.0%', 'DECAY', 'ROLLBACK'],
                ['BRANCH / 02', 'Δ 0.0%', 'STABLE', 'CANDIDATE'],
                ['BRANCH / 03', 'Δ +12.0%', 'ESCAPE', 'COMPARE'],
              ].map(([name, delta, result, action], index) => (
                <div key={name} className="branch-row grid min-h-36 grid-cols-[1.2fr_.8fr_.8fr] items-center border-b border-white/20 px-5 last:border-b-0 sm:grid-cols-4 sm:px-8">
                  <span className="eyebrow text-white/40">{name}</span>
                  <span className="mono text-sm">{delta}</span>
                  <span className={`mono text-sm ${index === 1 ? 'text-[#9EFF6A]' : 'text-[#FF4B1F]'}`}>{result}</span>
                  <span className="eyebrow hidden justify-self-end sm:block">{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="site-shell">
        <section className="grid border-b border-black/20 lg:grid-cols-12">
          <div className="border-b border-black/20 p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <p className="eyebrow mb-20 text-[#77756F]">Execution routing / 005</p>
            <h2 className="max-w-md text-[clamp(3rem,5.4vw,6rem)] font-[520] leading-[0.86] tracking-[-0.07em]">
              One contract.<br />The right executor.
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-6 text-[#4f4e49]">
              Backend classes describe routing options. They do not claim a named third-party integration.
            </p>
          </div>
          <div className="lg:col-span-8">
            {routes.map(([index, title, copy, signal]) => (
              <Reveal key={title} className="route-row grid min-h-48 grid-cols-[54px_1fr] border-b border-black/20 last:border-b-0 sm:grid-cols-[72px_1.1fr_1fr_auto]">
                <span className="mono p-4 text-xs text-[#77756F] sm:p-6">{index}</span>
                <h3 className="border-l border-black/20 p-4 text-[clamp(1.6rem,2.8vw,3rem)] leading-[0.95] tracking-[-0.055em] sm:p-6">{title}</h3>
                <p className="col-span-2 border-l border-t border-black/20 p-4 text-sm leading-6 text-[#4f4e49] sm:col-span-1 sm:border-t-0 sm:p-6">{copy}</p>
                <span className="mono hidden items-end p-6 text-[0.58rem] text-[#2455FF] sm:flex">{signal}</span>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-b border-black/20">
          <div className="grid lg:grid-cols-12">
            <div className="border-b border-black/20 p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
              <p className="eyebrow text-[#77756F]">State and observation / 006</p>
            </div>
            <div className="p-5 sm:p-8 lg:col-span-8 lg:p-12">
              <Reveal>
                <h2 className="text-[clamp(3.2rem,6.7vw,7.8rem)] font-[520] leading-[0.84] tracking-[-0.075em]">
                  State is what is true.<br />
                  <span className="text-[#FF4B1F]">Observation is what an agent sees.</span>
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="grid gap-px bg-black/20 md:grid-cols-3">
            {observations.map((item, index) => (
              <figure key={item.src} className="group bg-[#F2EFE6]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#08090A]">
                  <img src={item.src} alt={item.alt} width={1280} height={720} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                  <div className="plate-grid pointer-events-none absolute inset-0" aria-hidden="true" />
                  <div className="absolute left-3 top-3 bg-[#F2EFE6] px-2 py-1 mono text-[0.55rem] text-[#08090A]">STATE VIEW / 0{index + 1}</div>
                </div>
                <figcaption className="grid grid-cols-[1fr_auto] border-t border-black/20 p-4">
                  <span className="eyebrow text-[#77756F]">{item.index}</span>
                  <span className="text-sm tracking-[-0.02em]">{item.title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="grid min-h-[78svh] lg:grid-cols-12">
          <div className="flex flex-col justify-between border-b border-black/20 p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <p className="eyebrow text-[#77756F]">Public beta / demo access</p>
            <p className="mono mt-16 max-w-xs text-[0.62rem] leading-5 text-[#77756F]">
              FOR TEAMS BUILDING AGENTS,<br />ROBOTICS, WORLD MODELS,<br />AND SIMULATION INFRASTRUCTURE
            </p>
          </div>
          <div className="flex flex-col justify-between p-5 sm:p-8 lg:col-span-8 lg:p-12">
            <Reveal>
              <h2 className="max-w-6xl text-[clamp(3.7rem,7.8vw,9.2rem)] font-[510] leading-[0.8] tracking-[-0.08em]">
                Bring your agent.<br />Bring your simulator.<br />
                <span className="text-[#2455FF]">Make the world executable.</span>
              </h2>
            </Reveal>
            <div className="mt-16 grid gap-px bg-black/20 sm:grid-cols-[1fr_auto]">
              <a href={demoHref} {...demoLinkProps} className="flex min-h-28 items-center justify-between bg-[#FF4B1F] p-5 text-xl font-[620] tracking-[-0.035em] transition-colors hover:bg-[#08090A] hover:text-white sm:p-7">
                Book a technical demo <ArrowUpRight className="size-6" aria-hidden="true" />
              </a>
              <a href={`mailto:${siteConfig.email}`} className="eyebrow flex min-h-20 items-center bg-[#F2EFE6] px-5 transition-colors hover:bg-white sm:min-w-64 sm:px-7">{siteConfig.email}</a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
