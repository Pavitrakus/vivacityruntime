import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { OpticalField } from '@/components/optical-field';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = { title: 'Research', description: 'The active research directions at Vivacity.' };

const directions = [
  ['R.01', 'Persistent state spaces', 'Representations for environments whose variables, constraints, identity, and causal history survive beyond one inference turn.'],
  ['R.02', 'Action-conditioned dynamics', 'Methods for connecting a proposed action to candidate future states, admissibility conditions, and measurable consequences.'],
  ['R.03', 'Heterogeneous execution', 'A common runtime boundary across exact solvers, physics engines, learned rollouts, and domain-specific systems.'],
  ['R.04', 'Evaluation under change', 'Long-horizon evaluation that preserves partial observability, causal lineage, constraint violations, and the cost of recovery.'],
];

export default function ResearchPage() {
  return <main><SiteHeader />
    <section className="page-hero"><p className="section-index">VIVACITY / SYSTEMS RESEARCH</p><h1>Building the layer where intelligence becomes <em>causal.</em></h1><p>Vivacity works between world models, agent policies, and execution systems. The objective is a shared substrate for reasoning about state, action, uncertainty, and consequence.</p></section>
    <section className="research-page-grid">
      <div className="research-note"><p className="section-index">SYSTEMS THESIS / 001</p><h2>Prediction is not participation.</h2><p>A world model can propose what may happen. An operational agent also needs persistent state, an action contract, an execution path, and evidence about what actually changed.</p></div>
      <OpticalField variant="b" label="An abstract Vivacity research field" />
    </section>
    <section className="direction-list">
      {directions.map(([id,title,copy]) => <article key={id}><span>{id}</span><h2>{title}</h2><p>{copy}</p><span className="status-tag">PROGRAM</span></article>)}
    </section>
    <section className="research-spectrum"><span>W<sub>t</sub></span><i>+</i><span>A<sub>t</sub></span><i>→</i><span>Ξ</span><i>→</i><span>W<sub>t+1</sub></span><p>World state, action, execution operator, candidate next state.</p></section>
    <section className="publication-empty"><p className="section-index">TECHNICAL ACCESS</p><h2>For teams building agents that must remain coherent while the world changes.</h2><Link href="/schedule" className="text-link">Open a technical conversation <ArrowUpRight /></Link></section>
    <SiteFooter />
  </main>;
}
