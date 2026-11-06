import type { Metadata } from 'next';
import Image from 'next/image';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ScheduleExperience } from '@/components/schedule-experience';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Schedule',
  description: 'Schedule a technical conversation with Vivacity.',
};

export const dynamic = 'force-dynamic';

export default function SchedulePage() {
  return (
    <main id="content">
      <SiteHeader />
      <section className="schedule-hero">
        <p className="section-index">Talk to Vivacity</p>
        <h1>Let&apos;s design a useful first experiment.</h1>
        <p>
          Suggest a time and send a short note about your robotics task. This is
          an email request; the team will confirm availability.
        </p>
        <figure className="contact-study">
          <Image
            src="/plate-orbit.webp"
            alt="Illustrative study of candidate trajectories"
            fill
            sizes="(max-width:900px) 100vw, 28vw"
          />
          <figcaption>
            Candidate trajectories. An illustrative study.
          </figcaption>
        </figure>
      </section>
      <ScheduleExperience
        today={new Date().toLocaleDateString('en-CA', {
          timeZone: 'Asia/Kolkata',
        })}
      />
      <section className="schedule-email">
        <span>Prefer email?</span>
        <a href={'mailto:' + siteConfig.email}>{siteConfig.email}</a>
      </section>
      <SiteFooter />
    </main>
  );
}
