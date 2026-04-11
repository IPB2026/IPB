import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diagnostic Gratuit Fissures & Humidité | IPB',
  description: 'Diagnostic en ligne gratuit en 3 minutes. Évaluez vos fissures ou problèmes d\'humidité et recevez les recommandations d\'un expert. Sans engagement.',
  keywords: [
    'diagnostic fissures gratuit',
    'diagnostic humidité en ligne',
    'évaluation fissures toulouse',
    'diagnostic structure maison',
    'évaluation gratuite',
    'expertise en ligne',
    'haute-garonne',
  ],
  openGraph: {
    title: 'Diagnostic Gratuit en Ligne - Fissures & Humidité | IPB',
    description: 'Évaluez gratuitement vos problèmes de fissures ou d\'humidité en 3 minutes. Recommandations d\'expert personnalisées.',
    url: 'https://www.ipb-expertise.fr/diagnostic',
    siteName: 'IPB - Expert Fissures & Humidité',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/IPB_Logo_HD.png',
        width: 1200,
        height: 630,
        alt: 'Diagnostic gratuit IPB',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diagnostic Gratuit Fissures & Humidité | IPB',
    description: 'Évaluez vos problèmes en 3 minutes. 100% gratuit et sans engagement.',
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
