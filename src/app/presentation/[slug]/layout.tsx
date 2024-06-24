import type { Metadata } from 'next';
import { Nav } from '@/app/components/Nav';

export const metadata: Metadata = {
  title: 'Sanity Technical Presentation',
  description: 'Application for Sanity Technical Interview',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
