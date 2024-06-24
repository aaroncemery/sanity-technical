import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { token } from '../../sanity/env';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Nav } from './components/Nav';

const inter = Inter({ subsets: ['latin'] });

const PreviewProvider = dynamic(() => import('./components/PreviewProvider'));

export const metadata: Metadata = {
  title: 'Sanity Technical',
  description: 'Application for Sanity Technical Interview',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {draftMode().isEnabled ? (
          <PreviewProvider token={token || ''}>
            <Nav />
            {children}
          </PreviewProvider>
        ) : (
          <>
            <Nav />
            {children}
          </>
        )}
      </body>
    </html>
  );
}
