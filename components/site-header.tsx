import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Brand } from '@/components/brand';
import { demoHref, demoLinkProps } from '@/lib/site-config';

export function SiteHeader({ inverse = false }: { inverse?: boolean }) {
  return (
    <header
      className={`flex h-16 items-center justify-between border-b px-4 md:px-7 ${
        inverse ? 'border-white/20 bg-[#08090A] text-[#F2EFE6]' : 'border-black/20 bg-[#F2EFE6]'
      }`}
    >
      <Brand inverse={inverse} />
      <nav className="flex items-center gap-5" aria-label="Primary navigation">
        <Link href="/technical-brief" className="eyebrow hidden transition-colors hover:text-[#2455FF] sm:block">
          Technical brief
        </Link>
        <a
          href={demoHref}
          {...demoLinkProps}
          className={`eyebrow inline-flex h-9 items-center gap-2 border px-3 transition-colors ${
            inverse
              ? 'border-[#F2EFE6] bg-[#F2EFE6] text-[#08090A] hover:border-[#2455FF] hover:bg-[#2455FF] hover:text-white'
              : 'border-black bg-[#08090A] text-[#F2EFE6] hover:border-[#2455FF] hover:bg-[#2455FF]'
          }`}
        >
          Book demo <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
