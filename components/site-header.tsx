import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Brand } from '@/components/brand';
import { ThemeToggle } from '@/components/theme-toggle';
import { demoHref, demoLinkProps } from '@/lib/site-config';

const links = [
  { href: '/#how', label: 'How it runs' },
  { href: '/#system', label: 'System' },
  { href: '/technical-brief', label: 'Brief' },
];

export function SiteHeader({ inverse = false }: { inverse?: boolean }) {
  return (
    <header
      className={`sticky top-0 z-50 flex h-14 items-center justify-between border-b px-4 backdrop-blur-md sm:h-16 md:px-7 ${
        inverse
          ? 'border-white/20 bg-[#08090A]/85 text-[#F2EFE6]'
          : 'border-[color:var(--rule)] bg-[var(--bg)]/80'
      }`}
    >
      <Brand inverse={inverse} />
      <nav className="flex items-center gap-2 sm:gap-4" aria-label="Primary navigation">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`link-mark eyebrow ${
              link.href === '/technical-brief' ? 'hidden sm:block' : 'hidden md:block'
            }`}
          >
            {link.label}
          </Link>
        ))}
        <ThemeToggle />
        <a
          href={demoHref}
          {...demoLinkProps}
          className={`eyebrow inline-flex h-9 items-center gap-2 border px-3 transition-colors ${
            inverse
              ? 'border-[#F2EFE6] bg-[#F2EFE6] text-[#08090A] hover:border-[#2455FF] hover:bg-[#2455FF] hover:text-white'
              : 'border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)] hover:border-[var(--cobalt)] hover:bg-[var(--cobalt)] hover:text-white'
          }`}
        >
          Book demo <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
