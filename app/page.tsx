import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Hero } from '@/components/home/Hero';
import { DepartementsNotice } from '@/components/home/DepartementsNotice';
import { TrustSignals } from '@/components/home/TrustSignals';
import { ServicesStructure } from '@/components/home/ServicesStructure';
import { ServicesHumidity } from '@/components/home/ServicesHumidity';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';
import { ContactSection } from '@/components/home/ContactSection';
import { Footer } from '@/components/home/Footer';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { ExitIntentPopup } from '@/components/blog/ExitIntentPopup';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Expert Fissures & Humidité Toulouse (31) | Diagnostic Gratuit 48h | IPB",
  description: "Expert fissures maison et traitement humidité à Toulouse, Montauban, Auch. Agrafage structurel, injection résine hydrophobe. Garantie décennale. Devis gratuit ☎ 05 82 95 33 75",
  keywords: [
    // Fissures - Mots clés principaux
    'expert fissures toulouse',
    'expert fissures maison 31',
    'fissure maison toulouse',
    'agrafage fissures toulouse',
    'réparation fissures façade',
    'fissure mur extérieur',
    'fissure structurelle maison',
    'tassement différentiel fondation',
    'expert bâtiment fissures',
    // Humidité - Mots clés principaux
    'expert humidité toulouse',
    'traitement humidité murs',
    'remontées capillaires traitement',
    'injection résine hydrophobe',
    'salpêtre mur traitement',
    'moisissures maison solution',
    'cave humide traitement',
    'cuvelage cave toulouse',
    // Géographique
    'expert fissures montauban 82',
    'expert humidité auch 32',
    'haute-garonne expert bâtiment',
    'tarn-et-garonne fissures',
    'gers humidité maison',
    // Longue traîne
    'prix agrafage fissures',
    'devis traitement humidité',
    'diagnostic fissures gratuit',
    'sol argileux fissures maison',
    'catastrophe naturelle sécheresse',
  ],
  openGraph: {
    title: "IPB Expert Fissures & Humidité | Toulouse Haute-Garonne",
    description: "Spécialiste traitement fissures (agrafage, harpage) et humidité (injection, cuvelage) à Toulouse. +200 maisons traitées. Garantie décennale.",
    url: "https://www.ipb-expertise.fr",
    siteName: "IPB - Institut de Pathologie du Bâtiment",
    images: [
      {
        url: "/images/IPB_Logo_HD.png",
        width: 1200,
        height: 630,
        alt: "IPB Expert Fissures Humidité Toulouse - Agrafage Injection Résine Garantie Décennale",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Fissures & Humidité Toulouse | IPB",
    description: "Diagnostic gratuit sous 48h. Agrafage fissures, traitement humidité. Garantie décennale.",
  },
  alternates: {
    canonical: "https://www.ipb-expertise.fr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function HomePage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased scroll-smooth selection:bg-orange-100 selection:text-orange-900">
      <ExitIntentPopup />
      <TopBar />
      <Navbar />
      <Hero />
      <DepartementsNotice />
      <TrustSignals />
      <ServicesStructure />
      <ServicesHumidity />
      <Testimonials />
      <FAQ />
      <ContactSection />
      <InternalLinks variant="default" />
      <Footer />
    </div>
  );
}
