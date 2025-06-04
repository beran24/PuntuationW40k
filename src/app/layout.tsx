import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HammerTime - Warhammer Timer App',
  description:
    'The perfect Warhammer 40K match timer with CP tracking, missions and more!',
  openGraph: {
    title: 'HammerTime',
    description:
      'The perfect Warhammer 40K match timer with CP tracking, missions and more!',
    url: 'https://hammertime.fyi',
    images: ['/preview.png'],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
