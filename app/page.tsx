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
import { QuickCallbackForm } from '@/components/home/QuickCallbackForm';
import { Roadmap } from '@/components/home/Roadmap';
import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';

// Schema Organization pour Knowledge Panel Google
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
  "description": "Cabinet indépendant spécialisé en pathologie du bâtiment en Occitanie (31, 82, 32, 81). Diagnostic, plan de remédiation, travaux (agrafage, injection résine) et suivi post-intervention. Garantie décennale.",
  "foundingDate": "2019",
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": "8" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "13 rue du Recteur Dottin",
    "addressLocality": "Toulouse",
    "postalCode": "31100",
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
  "sameAs": [
    "https://www.facebook.com/ipbexpertise",
    "https://www.linkedin.com/company/ipb-expertise"
  ]
};

export const metadata: Metadata = {
  title: "Expert Fissures & Humidité Toulouse (31) | IPB",
  description: "Cabinet indépendant spécialisé en pathologie du bâtiment. Du diagnostic instrumenté aux travaux (agrafage, injection résine) avec suivi post-intervention. 850+ clients accompagnés en Occitanie.",
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
    title: "IPB Expert Fissures & Humidité | Toulouse, Montauban, Auch (31-82-32)",
    description: "Expert fissures et humidité à Toulouse. Du diagnostic aux travaux (agrafage, injection résine) avec suivi. 850+ clients accompagnés. Garantie décennale.",
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
    description: "Du diagnostic aux travaux, un seul interlocuteur. Agrafage fissures, traitement humidité. Garantie décennale.",
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
      {/* Organization Schema pour Knowledge Panel */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <TopBar />
      <Navbar />
      <Hero />
      <QuickCallbackForm />
      <DepartementsNotice />
      <TrustSignals />
      <Roadmap />
      <ServicesStructure />
      <ServicesHumidity />
      <Testimonials />
      <FAQ />

      {/* Bloc SEO — maillage vers pages piliers */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Cabinet spécialisé en pathologie du bâtiment</h2>
          <div className="prose prose-slate max-w-none text-slate-600">
            <p>
              IPB est un cabinet indépendant qui accompagne ses clients sur l&apos;ensemble du cycle : <Link href="/expertise/fissures" className="text-orange-600 font-semibold hover:text-orange-700">diagnostic et traitement des fissures structurelles</Link>, <Link href="/expertise/humidite" className="text-orange-600 font-semibold hover:text-orange-700">traitement de l&apos;humidité</Link> (remontées capillaires, infiltrations, mérule). Du diagnostic instrumenté au plan de remédiation, de la réalisation des travaux au suivi post-intervention — un seul interlocuteur à <Link href="/expert-fissures/toulouse" className="text-orange-600 font-semibold hover:text-orange-700">Toulouse</Link>, <Link href="/expert-fissures/montauban" className="text-orange-600 font-semibold hover:text-orange-700">Montauban</Link>, <Link href="/expert-fissures/auch" className="text-orange-600 font-semibold hover:text-orange-700">Auch</Link>, <Link href="/expert-fissures/albi" className="text-orange-600 font-semibold hover:text-orange-700">Albi</Link> et dans nos <Link href="/zones-intervention" className="text-orange-600 font-semibold hover:text-orange-700">56 communes d&apos;intervention</Link>.
            </p>
            <p>
              Nos rapports servent de base aux démarches d&apos;<Link href="/blog/assurance-fissures-maison-indemnisation" className="text-orange-600 font-semibold hover:text-orange-700">indemnisation assurance</Link> et constituent une contre-expertise opposable. Pour choisir entre <Link href="/blog/agrafage-vs-micropieux-choix" className="text-orange-600 font-semibold hover:text-orange-700">agrafage et micropieux</Link>, nous réalisons le diagnostic, préconisons la solution et assurons les travaux. Consultez nos <Link href="/avis-clients" className="text-orange-600 font-semibold hover:text-orange-700">avis clients (4.9/5 sur Google)</Link>.
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
