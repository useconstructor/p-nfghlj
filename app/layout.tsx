import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Project 1788468750675',
  description: 'A premium bilingual-Spanish barbershop website for Barbería El Corte in Buenos Aires, centered on appointment booking with portfolio galleries, service breakdowns, and trust-building social proof.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#F5F3F0', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
