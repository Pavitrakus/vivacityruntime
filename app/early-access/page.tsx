import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Early access',
  description: 'Work with Vivacity on agent systems for changing environments.',
};

export default function EarlyAccessPage() {
  return (
    <main id="content">
      <SiteHeader />
      <section className="page-hero access-hero">
        <p className="section-index">Early access</p>
        <h1>
          Bring a question your robot can <em>test.</em>
        </h1>
        <p>
          We’re looking for robotics teams with repeatable tasks, simulation
          tools, and physical behaviors they need to understand. Start with a
          technical conversation about one concrete experiment.
        </p>
      </section>
      <section className="access-grid">
        <article>
          <h2>A specific failure</h2>
          <p>
            You have a robot task with explicit constraints and a failure mode
            to investigate: contact, payload, placement, or trajectory
            execution.
          </p>
        </article>
        <article>
          <h2>A reproducible baseline</h2>
          <p>
            You can provide a task configuration, a controller, and the
            conditions needed to reproduce the behavior. Together, we can define
            which variables should change.
          </p>
        </article>
        <article>
          <h2>A measurable decision</h2>
          <p>
            Specify which engineering decision the experiment should inform and
            which measurement would support it. Compare the result with your
            current workflow.
          </p>
        </article>
      </section>
      <figure className="contact-image-band">
        <Image
          src="/plate-fluid.webp"
          alt="Illustrative flow field around an obstacle"
          fill
          sizes="100vw"
        />
        <figcaption>A visual study of flow around a boundary.</figcaption>
      </figure>
      <section className="access-cta">
        <p className="section-index">Work with Vivacity</p>
        <h2>
          Tell us what fails, what you can measure, and what you need to learn.
        </h2>
        <Link prefetch={false} href="/schedule" className="button button-light">
          Start a technical conversation <ArrowUpRight />
        </Link>
        <a href={'mailto:' + siteConfig.email}>{siteConfig.email}</a>
      </section>
      <SiteFooter />
    </main>
  );
}
