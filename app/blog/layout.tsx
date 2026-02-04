import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog IPB | Conseils Fissures & Humidité à Toulouse',
  description: 'Guides experts, conseils pratiques et analyses techniques sur les fissures, l'humidité et la structure. Conseils pour propriétaires en Occitanie (31, 82, 32).',
  keywords: [
    'fissures maison',
    'humidité murs',
    'diagnostic fissures',
    'remontées capillaires',
    'agrafage',
    'injection résine',
    'expert bâtiment toulouse',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/blog',
  },
  openGraph: {
    title: 'Blog IPB | Conseils Fissures & Humidité à Toulouse',
    description: 'Guides experts, conseils pratiques et analyses techniques sur les fissures, l’humidité et la structure.',
    url: 'https://www.ipb-expertise.fr/blog',
    siteName: 'IPB - Institut de Pathologie du Bâtiment',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/IPB_Logo_HD.png',
        width: 1200,
        height: 630,
        alt: 'Blog IPB',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog IPB | Conseils Fissures & Humidité',
    description: 'Guides experts et conseils techniques IPB.',
    images: ['/images/IPB_Logo_HD.png'],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
