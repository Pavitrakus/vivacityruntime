import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { OpticalField } from '@/components/optical-field';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = { title: 'Research', description: 'The active research directions at Vivacity.' };

const directions = [
  ['R.01', 'Persistent environments', 'Agents need a stable account of what is true now, what changed, and what remains possible. We are studying representations that remain useful across long, branching sequences of action.'],
  ['R.02', 'Action-grounded intelligence', 'A useful agent must connect a proposed action to its likely consequences. Our work explores how those connections can be expressed, tested, and improved.'],
  ['R.03', 'Heterogeneous execution', 'No single computational method fits every environment. We are researching how agent systems can work coherently across different forms of execution.'],
  ['R.04', 'Evaluation in motion', 'Static benchmarks miss the hard part of acting over time. We are exploring evaluations that preserve context, causality, and the cost of a bad choice.'],
];

export default function ResearchPage() {
  return <main><SiteHeader />
    <section className="page-hero"><p className="section-index">RESEARCH / INDEX</p><h1>Learning what it takes for intelligence to <em>participate.</em></h1><p>Vivacity studies the systems between an agent&apos;s intent and the world that receives it. The work is early. We share only what is ready to be useful.</p></section>
    <section className="research-page-grid">
      <div className="research-note"><p className="section-index">CURRENT PROGRAM</p><h2>From observation to consequence.</h2><p>Our program brings together environment representation, action semantics, execution, and evaluation. These are public research directions, not product guarantees.</p></div>
      <OpticalField variant="b" label="An abstract Vivacity research field" />
    </section>
    <section className="direction-list">
      {directions.map(([id,title,copy]) => <article key={id}><span>{id}</span><h2>{title}</h2><p>{copy}</p><span className="status-tag">ACTIVE</span></article>)}
    </section>
    <section className="publication-empty"><p className="section-index">PUBLICATIONS</p><h2>Notes, experiments, and technical reports will appear here as they are ready.</h2><Link href="/early-access" className="text-link">Work with the research team <ArrowUpRight /></Link></section>
    <SiteFooter />
  </main>;
}
