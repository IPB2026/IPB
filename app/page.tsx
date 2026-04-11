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
import { InternalLinks } from '@/components/seo/InternalLinks';
import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.ipb-expertise.fr#organization",
  "name": "IPB - Institut de Pathologie du Bâtiment",
  "alternateName": "IPB Expertise",
  "url": "https://www.ipb-expertise.fr",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://www.ipb-expertise.fr#logo",
    "url": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png",
    "width": 600,
    "height": 60,
    "caption": "IPB - Institut de Pathologie du Bâtiment"
  },
  "image": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png",
  "description": "Expert en diagnostic et traitement des fissures et de l'humidité en Occitanie (31, 82, 32, 81). Agrafage structurel, injection résine, micropieux. Garantie décennale.",
  "foundingDate": "2019",
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": "8" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "54 avenue Jean Jaurès",
    "addressLocality": "Tournefeuille",
    "postalCode": "31170",
    "addressRegion": "Occitanie",
    "addressCountry": "FR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+33-5-82-95-33-75",
    "contactType": "customer service",
    "availableLanguage": "French",
    "areaServed": ["FR-31", "FR-82", "FR-32", "FR-81"]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://www.facebook.com/ipbexpertise",
    "https://www.linkedin.com/company/ipb-expertise"
  ]
};

export const metadata: Metadata = {
  title: "Expert Fissures & Humidité Toulouse (31) | IPB",
  description: "Cabinet spécialisé en pathologie du bâtiment. Diagnostic instrumenté fissures et humidité. Agrafage garanti 10 ans. 850+ diagnostics en Occitanie.",
  keywords: [
    'expert fissures toulouse',
    'expert fissures maison 31',
    'fissure maison toulouse',
    'agrafage fissures toulouse',
    'réparation fissures façade',
    'fissure mur extérieur',
    'fissure structurelle maison',
    'tassement différentiel fondation',
    'expert bâtiment fissures',
    'expert humidité toulouse',
    'traitement humidité murs',
    'remontées capillaires traitement',
    'injection résine hydrophobe',
    'salpêtre mur traitement',
    'moisissures maison solution',
    'cave humide traitement',
    'cuvelage cave toulouse',
    'expert fissures montauban 82',
    'expert humidité auch 32',
    'haute-garonne expert bâtiment',
    'tarn-et-garonne fissures',
    'gers humidité maison',
    'prix agrafage fissures',
    'devis traitement humidité',
    'diagnostic fissures gratuit',
    'sol argileux fissures maison',
    'catastrophe naturelle sécheresse',
  ],
  openGraph: {
    title: "IPB Expert Fissures & Humidité | Toulouse, Montauban, Auch (31-82-32)",
    description: "Spécialiste traitement fissures (agrafage, harpage) et humidité (injection, cuvelage) à Toulouse. 850+ diagnostics réalisés. Garantie décennale.",
    url: "https://www.ipb-expertise.fr",
    siteName: "IPB - Institut de Pathologie du Bâtiment",
    images: [
      {
        url: "/images/IPB_Logo_HD.png",
        width: 1200,
        height: 630,
        alt: "IPB Expert Fissures Humidité Toulouse",
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
    <div className="font-sans text-slate-800 bg-white antialiased scroll-smooth selection:bg-orange-100 selection:text-orange-900">
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <TopBar />
      <Navbar />
      <Hero />
      <TrustSignals />
      <ServicesStructure />
      <ServicesHumidity />
      <Testimonials />
      <FAQ />

      {/* SEO — maillage interne */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Cabinet spécialisé en pathologie du bâtiment</h2>
          <div className="text-[15px] text-slate-500 leading-relaxed space-y-3">
            <p>
              IPB intervient exclusivement sur deux domaines : le <Link href="/expertise/fissures" className="text-slate-900 font-medium hover:text-orange-600 transition-colors">diagnostic et le traitement des fissures structurelles</Link>, et le <Link href="/expertise/humidite" className="text-slate-900 font-medium hover:text-orange-600 transition-colors">traitement de l&apos;humidité</Link>. Cette spécialisation nous permet d&apos;intervenir avec une méthodologie rigoureuse à <Link href="/expert-fissures/toulouse" className="text-slate-900 font-medium hover:text-orange-600 transition-colors">Toulouse</Link>, <Link href="/expert-fissures/montauban" className="text-slate-900 font-medium hover:text-orange-600 transition-colors">Montauban</Link>, <Link href="/expert-fissures/auch" className="text-slate-900 font-medium hover:text-orange-600 transition-colors">Auch</Link>, <Link href="/expert-fissures/albi" className="text-slate-900 font-medium hover:text-orange-600 transition-colors">Albi</Link> et dans nos <Link href="/zones-intervention" className="text-slate-900 font-medium hover:text-orange-600 transition-colors">56 communes d&apos;intervention</Link>.
            </p>
            <p>
              Nos rapports servent de base aux démarches d&apos;<Link href="/blog/assurance-fissures-maison-indemnisation" className="text-slate-900 font-medium hover:text-orange-600 transition-colors">indemnisation assurance</Link> et constituent une contre-expertise opposable. Consultez nos <Link href="/avis-clients" className="text-slate-900 font-medium hover:text-orange-600 transition-colors">avis clients (4.9/5)</Link>.
            </p>
          </div>
        </div>
      </section>

      <ContactSection />
      <InternalLinks variant="default" />
      <Footer />
    </div>
  );
}
