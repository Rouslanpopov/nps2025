import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const getBasePath = () => {
  if (process.env.NODE_ENV !== 'production') {
    return '';
  }
  
  try {
    const fs = require('fs');
    const path = require('path');
    const cnamePath = path.join(process.cwd(), 'public', 'CNAME');
    if (fs.existsSync(cnamePath)) {
      return ''; 
    }
  } catch (error) {
  }
  
  return '/nps2025';
};

const basePath = getBasePath();
const baseUrl = basePath ? 'https://rouslanpopov.github.io/nps2025' : 'https://nps2025.inthememory.com';

export const metadata: Metadata = {
  title: 'NPS 2025 Memory - Engagement des collaborateurs',
  description: 'Découvrez notre NPS 2025 Memory, un outil interactif pour mesurer l\'engagement et la satisfaction de nos collaborateurs avec un design moderne et des effets de verre liquide.',
  keywords: ['NPS', 'Memory', 'Engagement', 'Collaborateurs', 'Satisfaction', 'Score', 'Dashboard'],
  authors: [{ name: 'Memory', url: 'https://www.inthememory.com' }],
  creator: 'Memory',
  publisher: 'Memory',
  robots: 'index, follow',
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: 'NPS 2025 Memory - Score d\'engagement',
    description: 'Notre NPS reflète l\'impact de nos équipes. Interface moderne avec effets de verre liquide pour visualiser l\'engagement des collaborateurs.',
    type: 'website',
    locale: 'fr_FR',
    url: baseUrl,
    siteName: 'NPS 2025 Memory',
    images: [
      {
        url: `${basePath}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'NPS 2025 Memory - Dashboard d\'engagement avec score 63/100 et effet de verre liquide',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NPS 2025 Memory - Score d\'engagement',
    description: 'Notre NPS reflète l\'impact de nos équipes. Interface moderne avec effets de verre liquide.',
    images: [`${basePath}/og-image.png`],
    creator: '@memory',
    site: '@memory',
  },
  other: {
    'theme-color': '#64b8ff',
    'color-scheme': 'dark light',
    'format-detection': 'telephone=no',
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