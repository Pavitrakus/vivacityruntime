import Link from 'next/link';
import { Brand } from '@/components/brand';
import { siteConfig } from '@/lib/site-config';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div><Brand /><p>Research and infrastructure for agents that act in changing environments.</p></div>
        <div className="footer-links">
          <div><span>Explore</span><Link href="/research">Research</Link><Link href="/docs">Docs</Link><Link href="/early-access">Early access</Link><Link href="/schedule">Schedule</Link></div>
          <div><span>Contact</span><a href={'mailto:' + siteConfig.email}>{siteConfig.email}</a></div>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">VIVACITY</div>
      <div className="footer-base"><span>© {new Date().getFullYear()} Vivacity</span><span>Independent systems research</span></div>
    </footer>
  );
}
