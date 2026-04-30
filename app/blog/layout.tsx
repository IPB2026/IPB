import type { Metadata } from 'next';
import '../blog-article.css';

const site = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr').replace(/\/+$/, '');
const ogImage = `${site}/images/IPB_Logo_HD.png`;

export const metadata: Metadata = {
  title: 'Blog Fissures & Humidité · Guides Experts Toulouse',
  description: "Guides techniques sur fissures, humidité, structure. Agrafage, injection résine, assurance, revente. Décennale AXA. ☎ 05 82 95 33 75",
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
    canonical: `${site}/blog`,
  },
  openGraph: {
    title: 'Blog IPB | Fissures, humidité & expertise bâtiment',
    description:
      'Articles et guides pour propriétaires : diagnostic, travaux, garantie décennale et valorisation de votre bien en Haute-Garonne et Occitanie.',
    url: `${site}/blog`,
    siteName: 'IPB - Institut de Pathologie du Bâtiment',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Blog IPB Expertise — fissures et humidité',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog IPB | Fissures, humidité & expertise bâtiment',
    description: 'Guides experts et conseils techniques pour votre maison en Occitanie.',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Blog IPB Expertise',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
