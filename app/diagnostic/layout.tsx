import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diagnostic Fissures & Mur Porteur Toulouse · Gratuit',
  description: "Décrivez votre situation : fissures, mur porteur, baie vitrée. Réponse d'un expert IPB sous 24h. Gratuit, sans engagement. ☎ 05 82 95 33 75",
  keywords: [
    'expertise fissures toulouse',
    'expertise mur porteur toulouse',
    'diagnostic structure maison',
    'institut pathologie bâtiment toulouse',
    'expert fissures haute-garonne',
    'rapport fissure assurance',
  ],
  openGraph: {
    title: 'Diagnostic Fissures & Mur Porteur · IPB Toulouse',
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
    title: 'Diagnostic Fissures & Mur Porteur · IPB Toulouse',
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
