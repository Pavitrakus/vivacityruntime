import type { Metadata } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { LoadingIntro } from '@/components/loading-intro';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const display = Instrument_Serif({ weight: '400', subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  metadataBase: new URL('https://vivacityruntime.vercel.app'),
  title: {
    default: 'Vivacity | Intelligence that can act in the world',
    template: '%s | Vivacity',
  },
  description:
    'Vivacity is building research and infrastructure for agents that act in changing environments.',
  openGraph: {
    type: 'website',
    title: 'Vivacity | Intelligence that can act in the world',
    description:
      'Vivacity is building research and infrastructure for agents that act in changing environments.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Vivacity research.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vivacity | Intelligence that can act in the world',
    description:
      'Vivacity is building research and infrastructure for agents that act in changing environments.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('vivacity-theme');var d=t?t==='dark':true;document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${display.variable}`}><LoadingIntro />{children}</body>
    </html>
  );
}
