'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Brand } from '@/components/brand';
import { ThemeToggle } from '@/components/theme-toggle';
import { demoHref, demoLinkProps } from '@/lib/site-config';

const links = [['/research', 'Research'], ['/docs', 'Docs'], ['/early-access', 'Early access']] as const;

export function SiteHeader() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setCompact(window.scrollY > 56);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <header className="floating-header" data-compact={compact} data-open={open}>
      <div className="floating-nav">
        <Brand />
        <nav className="nav-links" aria-label="Primary navigation">
          {links.map(([href, label]) => (
            <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <a href={demoHref} {...demoLinkProps} className="nav-contact">Talk to us <span aria-hidden="true">↗</span></a>
          <button className="nav-menu" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
        <a href={demoHref} {...demoLinkProps}>Talk to us ↗</a>
      </nav>
    </header>
  );
}
