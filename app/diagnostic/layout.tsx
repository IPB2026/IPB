import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Décrire ma situation à l’institut · Fissures et mur porteur · IPB Toulouse',
  description: "Décrivez votre situation à l’institut IPB : fissures sur la maison, projet d'ouverture de mur porteur, création de baie vitrée. Réponse d'un expert sous 24 heures.",
  keywords: [
    'expertise fissures toulouse',
    'expertise mur porteur toulouse',
    'diagnostic structure maison',
    'institut pathologie bâtiment toulouse',
    'expert fissures haute-garonne',
    'rapport fissure assurance',
  ],
  openGraph: {
    title: 'Décrire ma situation · Institut IPB Toulouse',
    description: "Échange technique avec l’institut IPB. Fissures, mur porteur, baie vitrée. Réponse sous 24 heures.",
    url: 'https://www.ipb-expertise.fr/diagnostic',
    siteName: 'IPB - Institut de pathologie du bâtiment',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/IPB_Logo_HD.png',
        width: 1200,
        height: 630,
        alt: 'Institut IPB Toulouse',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Décrire ma situation · Institut IPB Toulouse',
    description: "Échange technique avec l’institut IPB. Réponse sous 24 heures.",
    images: ['/images/IPB_Logo_HD.png'],
  },
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/diagnostic',
  },
};

export default function DiagnosticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
