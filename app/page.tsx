import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Hero } from '@/components/home/Hero';
import { TrustSignals } from '@/components/home/TrustSignals';
import { ServicesStructure } from '@/components/home/ServicesStructure';
import { ServicesHumidity } from '@/components/home/ServicesHumidity';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';
import { ContactSection } from '@/components/home/ContactSection';
import { Footer } from '@/components/home/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Expert Fissures & Humidité Toulouse | IPB Haute-Garonne",
  description: "Expert en traitement des fissures et de l'humidité en Haute-Garonne. Solutions techniques (agrafage, injection résine) avec garantie décennale. Alternative économique aux micropieux.",
  openGraph: {
    title: "IPB - Expert Fissures & Humidité Toulouse",
    description: "Expert en traitement des fissures et de l'humidité en Haute-Garonne. Solutions techniques avec garantie décennale.",
    url: "https://www.ipb-expertise.fr",
    siteName: "IPB",
    images: [
      {
        url: "/og-image.jpg",
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
      <TopBar />
      <Navbar />
      <Hero />
      <TrustSignals />
      <ServicesStructure />
      <ServicesHumidity />
      <Testimonials />
      <FAQ />
      <ContactSection />
      <Footer />
    </div>
  );
}
