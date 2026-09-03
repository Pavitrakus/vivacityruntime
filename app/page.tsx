import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { OpticalField } from '@/components/optical-field';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { demoHref, demoLinkProps, siteConfig } from '@/lib/site-config';

const research = [
  ['01', 'World representation', 'How agents can work with environments that change, persist, and respond over time.'],
  ['02', 'Action and consequence', 'How proposed actions can be tested against constraints before they reach the real world.'],
  ['03', 'Execution systems', 'How different computational tools can take part in one reliable agent loop.'],
];

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="status-line"><span /> RESEARCH IN PROGRESS</div>
            <h1>Intelligence that can <em>act</em> in the world.</h1>
            <p>Vivacity is building infrastructure for agents that need more than an answer. They need to understand changing conditions, take action, and stay grounded in what happens next.</p>
            <div className="hero-actions">
              <a href={demoHref} {...demoLinkProps} className="button button-dark">Work with Vivacity <ArrowUpRight /></a>
              <Link href="/research" className="text-link">Explore our research <span>↗</span></Link>
            </div>
          </div>
          <OpticalField variant="a" label="An abstract cobalt and vermilion optical field with responsive scientific symbols" />
        </div>
        <a href="#thesis" className="hero-scroll" aria-label="Continue to our thesis"><ArrowDown /> OUR THESIS</a>
      </section>

      <section id="thesis" className="statement-section">
        <p className="section-index">01 / OUR THESIS</p>
        <h2>Language helped machines understand what we say. The next step is helping them understand what their actions <span>change.</span></h2>
      </section>

      <section className="research-section">
        <div className="research-intro">
          <p className="section-index">02 / ACTIVE RESEARCH</p>
          <h2>Building for the space between intent and consequence.</h2>
          <p>Our work focuses on the systems an agent needs to reason about an environment, make a choice, and learn from the result. Research is ongoing. We will publish more as the work matures.</p>
          <Link href="/research" className="text-link">Research index <span>↗</span></Link>
        </div>
        <div className="research-list">
          {research.map(([index, title, copy]) => (
            <article key={index}>
              <span>{index}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
              <Link href="/research" aria-label={'Read about ' + title}>↗</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="field-break">
        <OpticalField variant="b" label="A bright layered research field with responsive symbols" />
        <div className="field-caption">
          <span>VCT.02</span>
          <p>Research should become infrastructure. Infrastructure should disappear into the work.</p>
        </div>
      </section>

      <section className="partners-section">
        <div>
          <p className="section-index">03 / SELECT PARTNERS</p>
          <h2>Working closely with a small number of ambitious technical teams.</h2>
        </div>
        <div className="partners-copy">
          <p>We partner with selected startups where the hard part is not generating an answer. It is building an agent that can operate inside a real, changing system.</p>
          <p>Engagements are technical, focused, and shaped around the problem. If that sounds like your work, we should talk.</p>
          <Link href="/early-access" className="button button-accent">Start a conversation <ArrowUpRight /></Link>
        </div>
      </section>

      <section className="closing-section">
        <p className="section-index">VIVACITY / 2026</p>
        <h2>We are building for agents that have somewhere to be.</h2>
        <div>
          <a href={demoHref} {...demoLinkProps} className="button button-light">Talk to the team <ArrowUpRight /></a>
          <a href={'mailto:' + siteConfig.email}>{siteConfig.email}</a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
