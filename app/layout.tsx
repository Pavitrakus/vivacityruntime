import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { LoadingIntro } from '@/components/loading-intro';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
const display = localFont({
  src: '../public/fonts/vivacity-raster.woff2',
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tryvivacity.com'),
  title: {
    default: 'Vivacity | Virtual labs for physical experiments',
    template: '%s | Vivacity',
  },
  description:
    'Vivacity is building virtual labs for AI agents to test physical hypotheses, beginning with industrial robotics.',
  openGraph: {
    type: 'website',
    title: 'Vivacity | Virtual labs for physical experiments',
    description:
      'Vivacity is building virtual labs for AI agents to test physical hypotheses, beginning with industrial robotics.',
    images: [
      { url: '/og.png', width: 1200, height: 630, alt: 'Vivacity research.' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vivacity | Virtual labs for physical experiments',
    description:
      'Vivacity is building virtual labs for AI agents to test physical hypotheses, beginning with industrial robotics.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${display.variable}`}
      >
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <LoadingIntro />
        {children}
      </body>
    </html>
  );
}
