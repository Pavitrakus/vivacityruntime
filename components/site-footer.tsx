import Link from 'next/link';
import { Brand } from '@/components/brand';
import { siteConfig } from '@/lib/site-config';

export function SiteFooter() {
  return (
    <footer className="grid border-t border-black/20 md:grid-cols-12">
      <div className="flex min-h-36 items-start p-5 md:col-span-5 md:border-r md:p-7">
        <Brand />
      </div>
      <div className="grid gap-px bg-black/20 md:col-span-7 md:grid-cols-3">
        <Link href="/" className="eyebrow flex min-h-20 items-end bg-[#F2EFE6] p-5 transition-colors hover:bg-white">
          Home
        </Link>
        <Link href="/technical-brief" className="eyebrow flex min-h-20 items-end bg-[#F2EFE6] p-5 transition-colors hover:bg-white">
          Technical brief
        </Link>
        <a href={`mailto:${siteConfig.email}`} className="eyebrow flex min-h-20 items-end bg-[#F2EFE6] p-5 transition-colors hover:bg-white">
          {siteConfig.email}
        </a>
      </div>
    </footer>
  );
}
