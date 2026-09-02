import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://vivacityruntime.vercel.app'),
  title: {
    default: 'Vivacity | Executable simulation runtime for AI agents',
    template: '%s | Vivacity',
  },
  description:
    'Describe a world. Preserve its state. Let an agent act, branch, simulate, and verify what happens next through the right execution backend.',
  openGraph: {
    type: 'website',
    title: 'Vivacity | Executable simulation runtime for AI agents',
    description:
      'Describe a world. Preserve its state. Let an agent act, branch, simulate, and verify what happens next through the right execution backend.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Vivacity. Executable simulation runtime for AI agents.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vivacity | Executable simulation runtime for AI agents',
    description:
      'Describe a world. Preserve its state. Let an agent act, branch, simulate, and verify what happens next through the right execution backend.',
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
