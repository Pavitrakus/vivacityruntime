import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { demoHref, demoLinkProps, siteConfig } from '@/lib/site-config';

export const metadata: Metadata = { title: 'Early access', description: 'Work with Vivacity on agent systems for changing environments.' };

export default function EarlyAccessPage() {
  return <main><SiteHeader />
    <section className="page-hero access-hero"><p className="section-index">EARLY ACCESS / SELECT PARTNERS</p><h1>Bring us the problem that does not fit inside a <em>chat window.</em></h1><p>We work with a small number of startups building agent systems where state, action, and consequence matter. Every engagement starts with a technical conversation.</p></section>
    <section className="access-grid">
      <article><span>01</span><h2>A hard environment</h2><p>Your agent operates in a system that changes over time, includes real constraints, or depends on a specialized execution stack.</p></article>
      <article><span>02</span><h2>A technical team</h2><p>You have engineers who can work closely with us, expose the real problem, and move from experiment to implementation.</p></article>
      <article><span>03</span><h2>A reason to act now</h2><p>You are ready to test a focused idea against your system, not collect another broad platform demo.</p></article>
    </section>
    <section className="access-cta"><p className="section-index">START HERE</p><h2>Tell us what your agent needs to do, and where the current stack stops.</h2><a href={demoHref} {...demoLinkProps} className="button button-light">Start a technical conversation <ArrowUpRight /></a><a href={'mailto:' + siteConfig.email}>{siteConfig.email}</a></section>
    <SiteFooter />
  </main>;
}
