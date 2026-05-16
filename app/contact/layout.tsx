import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact · Échanger avec l'institut IPB · Toulouse & Occitanie",
  description: "Une question technique sur des fissures, un mur porteur ou un dégât d'humidité ? Échangez directement avec l'institut IPB. Réponse sous 48h, devis gratuit.",
  keywords: [
    'contact expert fissures toulouse',
    'devis gratuit fissures',
    'expert humidité toulouse',
    'expertise avant achat toulouse',
    'institut pathologie bâtiment toulouse',
    'haute-garonne',
    '31',
  ],
  openGraph: {
    title: "Contact · Échanger avec l'institut IPB · Toulouse & Occitanie",
    description: "Une question technique sur des fissures, un mur porteur ou un dégât d'humidité ? Échangez directement avec l'institut IPB. Réponse sous 48h.",
    url: 'https://www.ipb-expertise.fr/contact',
    siteName: 'IPB · Institut de pathologie & structure du bâtiment',
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
    title: "Contact · Échanger avec l'institut IPB",
    description: "Une question technique ? Échangez directement avec l'institut IPB. Réponse sous 48h.",
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
