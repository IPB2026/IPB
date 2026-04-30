import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact IPB · Expert Fissures & Humidité Toulouse',
  description: "Contactez IPB Toulouse : devis gratuit, intervention sous 48h. Décennale AXA. Formulaire ou ☎ 05 82 95 33 75",
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
    title: 'Contact IPB · Expert Fissures & Humidité Toulouse',
    description: 'Intervention rapide dans un rayon de 50 km autour de Toulouse. Devis gratuit et diagnostic professionnel.',
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
    title: 'Contact IPB · Expert Fissures & Humidité Toulouse',
    description: 'Intervention rapide. Devis gratuit. Appelez le 05 82 95 33 75.',
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
