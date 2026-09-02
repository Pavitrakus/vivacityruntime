import Link from 'next/link';
import { Brand } from '@/components/brand';
import { demoHref, demoLinkProps, siteConfig } from '@/lib/site-config';

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--rule)]">
      <div className="grid md:grid-cols-12">
        <div className="flex min-h-32 flex-col justify-between gap-8 border-b border-[color:var(--rule)] p-5 sm:p-7 md:col-span-5 md:border-b-0 md:border-r">
          <Brand />
          <p className="max-w-xs text-sm leading-6 text-[var(--ink2)]">
            Persistent world state, isolated forks, and verified transitions for agents that have to act.
          </p>
        </div>
        <div className="grid gap-px bg-[var(--rule2)] md:col-span-7 md:grid-cols-3">
          <Link href="/#how" className="footer-link eyebrow flex min-h-[4.5rem] items-end bg-[var(--bg)] p-5">
            How it runs
          </Link>
          <Link href="/technical-brief" className="footer-link eyebrow flex min-h-[4.5rem] items-end bg-[var(--bg)] p-5">
            Technical brief
          </Link>
          <a href={demoHref} {...demoLinkProps} className="footer-link eyebrow flex min-h-[4.5rem] items-end bg-[var(--bg)] p-5">
            Book a demo
          </a>
          <Link href="/#system" className="footer-link eyebrow flex min-h-[4.5rem] items-end bg-[var(--bg)] p-5">
            System
          </Link>
          <Link href="/#use-cases" className="footer-link eyebrow flex min-h-[4.5rem] items-end bg-[var(--bg)] p-5">
            Use cases
          </Link>
          <a href={`mailto:${siteConfig.email}`} className="footer-link eyebrow flex min-h-[4.5rem] items-end bg-[var(--bg)] p-5">
            {siteConfig.email}
          </a>
        </div>
      </div>
      <div className="wordmark" aria-hidden="true">
        <p className="wordmark-text">VIVACITY</p>
      </div>
      <div className="flex flex-col items-start justify-between gap-3 border-t border-[color:var(--rule)] px-5 py-5 sm:flex-row sm:items-center sm:px-7">
        <p className="mono text-[0.58rem] uppercase tracking-[0.1em] text-[var(--ink3)]">
          © {new Date().getFullYear()} {siteConfig.name} · Public beta
        </p>
        <p className="mono text-[0.58rem] uppercase tracking-[0.1em] text-[var(--ink3)]">State · Fork · Verify</p>
      </div>
    </footer>
  );
}
