import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diagnostic Gratuit Fissures & Mur Porteur · IPB Toulouse',
  description: "Vos fissures inquiètent ? Un expert IPB analyse votre situation gratuitement et vous dit ce qui relève d'une simple cosmétique ou d'un vrai désordre structurel.",
  keywords: [
    'expertise fissures toulouse',
    'expertise mur porteur toulouse',
    'diagnostic structure maison',
    'institut pathologie bâtiment toulouse',
    'expert fissures haute-garonne',
    'rapport fissure assurance',
  ],
  openGraph: {
    title: 'Diagnostic Gratuit Fissures & Mur Porteur · IPB Toulouse',
    description: "Vos fissures inquiètent ? Un expert IPB analyse votre situation gratuitement et vous dit s'il s'agit d'un vrai désordre structurel.",
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
    title: 'Diagnostic Gratuit Fissures & Mur Porteur · IPB Toulouse',
    description: "Vos fissures inquiètent ? Un expert IPB analyse votre situation gratuitement.",
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
