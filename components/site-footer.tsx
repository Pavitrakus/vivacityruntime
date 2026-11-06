import Link from 'next/link';
import { Brand } from '@/components/brand';
import { siteConfig } from '@/lib/site-config';
import { MediaVideo } from '@/components/media-video';

export function SiteFooter() {
  return (
    <footer className="site-footer" data-nav-theme="dark">
      <div className="footer-top">
        <div>
          <Brand />
          <p>
            Tools for turning physical hypotheses into executable experiments.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <span>Explore</span>
            <Link prefetch={false} href="/research">
              Research
            </Link>
            <Link prefetch={false} href="/docs">
              Product guide
            </Link>
            <Link prefetch={false} href="/early-access">
              Early access
            </Link>
            <Link prefetch={false} href="/schedule">
              Talk to us
            </Link>
          </div>
          <div>
            <span>Contact</span>
            <a href={'mailto:' + siteConfig.email}>{siteConfig.email}</a>
          </div>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">
        <span>VIVACITY</span>
        <div className="footer-video-mask">
          <MediaVideo
            src="/media/solar-detail.mp4"
            poster="/media/solar-detail-poster.jpg"
            label="Solar flow study within the Vivacity wordmark"
          />
        </div>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} Vivacity</span>
        <a href="https://svs.gsfc.nasa.gov/31400/">
          Visual study: NASA / Timothy Sandstrom
        </a>
      </div>
    </footer>
  );
}
