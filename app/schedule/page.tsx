import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ScheduleExperience } from '@/components/schedule-experience';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = { title: 'Schedule', description: 'Schedule a technical conversation with Vivacity.' };

export default function SchedulePage() {
  return <main><SiteHeader />
    <section className="schedule-hero"><p className="section-index">TECHNICAL CONVERSATION</p><h1>Let&apos;s find the point where your agent meets the world.</h1><p>Choose a time, then send us a short note about the system you are building. We read every request before the call.</p></section>
    <ScheduleExperience />
    <section className="schedule-email"><span>Prefer email?</span><a href={'mailto:' + siteConfig.email}>{siteConfig.email}</a></section>
    <SiteFooter />
  </main>;
}
