'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Brand } from '@/components/brand';

const links = [
  ['/research', 'Research'],
  ['/docs', 'Product guide'],
  ['/early-access', 'Work with us'],
] as const;
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(pathname === '/');
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => {
      const sections =
        document.querySelectorAll<HTMLElement>('[data-nav-theme]');
      let current = false;
      for (const section of sections) {
        const r = section.getBoundingClientRect();
        if (r.top <= 52 && r.bottom > 52) {
          current = section.dataset.navTheme === 'dark';
          break;
        }
      }
      setDark(current);
      setScrolled(window.scrollY > 40);
    };
    const frame = requestAnimationFrame(update);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        document.querySelector<HTMLButtonElement>('.nav-menu')?.focus();
      }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return (
    <header
      className="cinema-header"
      data-dark={dark}
      data-open={open}
      data-scrolled={scrolled}
    >
      <div className="cinema-nav">
        <Brand />
        <nav className="nav-links" aria-label="Primary navigation">
          {links.map(([href, label]) => (
            <Link
              prefetch={false}
              key={href}
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link prefetch={false} href="/schedule" className="cinema-pill">
            Talk to us <span aria-hidden="true">↗</span>
          </Link>
          <button
            type="button"
            className="nav-menu"
            onClick={() => setOpen(!open)}
            aria-controls="mobile-navigation"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
      >
        {links.map(([href, label]) => (
          <Link
            prefetch={false}
            key={href}
            href={href}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link prefetch={false} href="/schedule" onClick={() => setOpen(false)}>
          Talk to us ↗
        </Link>
      </nav>
    </header>
  );
}
