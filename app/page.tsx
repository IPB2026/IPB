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
  title: "Expert Fissures & Humidité Toulouse, Montauban, Auch | IPB - 31, 82, 32",
  description: "Expert fissures et humidité à Toulouse (31, 82, 32). Agrafage, injection résine, garantie décennale. Diagnostic gratuit sous 48h.",
  keywords: [
    'expert fissures toulouse',
    'traitement humidité toulouse',
    'expert fissures montauban',
    'traitement humidité auch',
    'agrafage fissures',
    'injection résine',
    'diagnostic fissures gratuit',
    'remontées capillaires',
    'haute-garonne',
    'tarn-et-garonne',
    'gers',
    'expert bâtiment 31',
    'expert bâtiment 82',
    'expert bâtiment 32',
    'tassement différentiel',
    'sol argileux',
  ],
  openGraph: {
    title: "IPB - Expert Fissures & Humidité Toulouse",
    description: "Expert en traitement des fissures et de l'humidité en Haute-Garonne. Solutions techniques avec garantie décennale.",
    url: "https://www.ipb-expertise.fr",
    siteName: "IPB",
    images: [
      {
        url: "/images/IPB_Logo_HD.png",
        width: 1200,
        height: 630,
        alt: "IPB - Expert en pathologie du bâtiment",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.ipb-expertise.fr",
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
