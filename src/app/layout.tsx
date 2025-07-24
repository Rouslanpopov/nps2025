import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const basePath = process.env.NODE_ENV === 'production' ? '/nps2025' : '';

export const metadata: Metadata = {
  title: 'NPS 2025 Memory',
  description: 'Decouvrez notre NPS 2025 Memory, un outil pour mesurer l\'engagement de nos collaborateurs.',
  keywords: ['NPS', 'MEMORY'],
  authors: [{ name: 'Memory' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
    apple: `${basePath}/favicon.svg`,
  },
  openGraph: {
    title: 'NPS 2025 Memory',
    description: 'Découvrez notre NPS 2025 Memory, un outil pour mesurer l\'engagement de nos collaborateurs.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
} 