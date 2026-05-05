import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact · Échanger avec l'institut IPB Toulouse",
  description: "Une question technique sur des fissures, un mur porteur ou une infiltration ? Échangez directement avec un expert IPB. Réponse sous 24h, devis gratuit.",
  keywords: [
    'contact expert fissures toulouse',
    'devis gratuit fissures',
    'expert humidité toulouse',
    'diagnostic fissures',
    'intervention rapide',
    'haute-garonne',
    '31',
  ],
  openGraph: {
    title: "Contact · Échanger avec l'institut IPB Toulouse",
    description: "Une question technique sur des fissures, un mur porteur ou une infiltration ? Échangez directement avec un expert IPB. Réponse sous 24h.",
    url: 'https://www.ipb-expertise.fr/contact',
    siteName: 'IPB - Expert Fissures & Humidité',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/IPB_Logo_HD.png',
        width: 1200,
        height: 630,
        alt: 'Contact IPB',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact · Échanger avec l'institut IPB Toulouse",
    description: "Une question technique ? Échangez directement avec un expert IPB. Réponse sous 24h.",
    images: ['/images/IPB_Logo_HD.png'],
  },
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
