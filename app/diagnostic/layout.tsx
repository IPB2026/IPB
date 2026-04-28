import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Décrire ma situation au cabinet · Fissures et mur porteur · IPB Toulouse',
  description: "Décrivez votre situation au cabinet IPB : fissures sur la maison, projet d'ouverture de mur porteur, création de baie vitrée. Réponse d'un expert sous 24 heures.",
  keywords: [
    'expertise fissures toulouse',
    'expertise mur porteur toulouse',
    'diagnostic structure maison',
    'cabinet pathologie bâtiment toulouse',
    'expert fissures haute-garonne',
    'rapport fissure assurance',
  ],
  openGraph: {
    title: 'Décrire ma situation · Cabinet IPB Toulouse',
    description: "Échange technique avec le cabinet IPB. Fissures, mur porteur, baie vitrée. Réponse sous 24 heures.",
    url: 'https://www.ipb-expertise.fr/diagnostic',
    siteName: 'IPB - Cabinet de pathologie du bâtiment',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/IPB_Logo_HD.png',
        width: 1200,
        height: 630,
        alt: 'Cabinet IPB Toulouse',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Décrire ma situation · Cabinet IPB Toulouse',
    description: "Échange technique avec le cabinet IPB. Réponse sous 24 heures.",
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
