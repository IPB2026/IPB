import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Hero } from '@/components/home/Hero';
import { DepartementsNotice } from '@/components/home/DepartementsNotice';
import { TrustSignals } from '@/components/home/TrustSignals';
import { ServicesStructure } from '@/components/home/ServicesStructure';
import { ServicesHumidity } from '@/components/home/ServicesHumidity';
import { CaseStudies } from '@/components/home/CaseStudies';
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
  title: "Expert Fissures & Mur Porteur à Toulouse | IPB Expertise",
  description: "Cabinet indépendant en pathologie du bâtiment à Toulouse. Diagnostic, agrafage fissures, ouverture mur porteur et création baie vitrée. 850+ clients accompagnés.",
  keywords: [
    // Fissures
    'expert fissures toulouse',
    'expert fissures maison 31',
    'fissure maison toulouse',
    'agrafage fissures toulouse',
    'réparation fissures façade',
    'fissure structurelle maison',
    'tassement différentiel fondation',
    'expert bâtiment fissures',
    // Mur porteur & baie vitrée
    'ouverture mur porteur toulouse',
    'création baie vitrée toulouse',
    'mur porteur prix toulouse',
    'étude structure mur porteur',
    'abattre mur porteur toulouse',
    'bureau études structure toulouse',
    'poutre IPN mur porteur',
    'agrandissement baie vitrée toulouse',
    // Géographique
    'expert fissures montauban 82',
    'ouverture mur porteur auch 32',
    'haute-garonne expert bâtiment',
    'tarn-et-garonne mur porteur',
    // Longue traîne
    'prix agrafage fissures',
    'devis ouverture mur porteur',
    'diagnostic fissures gratuit',
    'sol argileux fissures maison',
    'catastrophe naturelle sécheresse',
  ],
  openGraph: {
    title: "IPB Expert Fissures & Mur Porteur | Toulouse, Montauban, Auch (31-82-32)",
    description: "Expert fissures et ouverture mur porteur à Toulouse. Du diagnostic aux travaux (agrafage, création baie vitrée) avec suivi. 850+ clients accompagnés. Garantie décennale.",
    url: "https://www.ipb-expertise.fr",
    siteName: "IPB - Institut de Pathologie du Bâtiment",
    images: [
      {
        url: "/images/IPB_Logo_HD.png",
        width: 1200,
        height: 630,
        alt: "IPB Expert Fissures & Mur Porteur Toulouse - Agrafage Structurel Garantie Décennale",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Fissures & Mur Porteur Toulouse | IPB",
    description: "Du diagnostic aux travaux, un seul interlocuteur. Agrafage fissures, ouverture mur porteur, baie vitrée. Garantie décennale.",
    images: [
      {
        url: "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png",
        width: 1200,
        height: 630,
        alt: "IPB Expertise - Expert fissures et mur porteur à Toulouse",
      },
    ],
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
      <CaseStudies />
      <ServicesHumidity />
      <Testimonials />
      <FAQ />

      {/* Bloc SEO — maillage vers pages piliers */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Spécialistes de la structure de votre habitat</h2>
          <div className="prose prose-slate max-w-none text-slate-600">
            <p>
              IPB s'occupe de deux choses : <Link href="/expertise/fissures" className="text-orange-600 font-semibold hover:text-orange-700">diagnostiquer et réparer les fissures qui inquiètent</Link>, et <Link href="/expertise/mur-porteur" className="text-orange-600 font-semibold hover:text-orange-700">ouvrir des murs porteurs pour créer des espaces ouverts ou des baies vitrées</Link>. Pour les deux, c'est le même fonctionnement : on regarde, on calcule, on construit. Nous intervenons à <Link href="/expert-fissures/toulouse" className="text-orange-600 font-semibold hover:text-orange-700">Toulouse</Link>, <Link href="/expert-fissures/montauban" className="text-orange-600 font-semibold hover:text-orange-700">Montauban</Link>, <Link href="/expert-fissures/auch" className="text-orange-600 font-semibold hover:text-orange-700">Auch</Link>, <Link href="/expert-fissures/albi" className="text-orange-600 font-semibold hover:text-orange-700">Albi</Link> et dans <Link href="/zones-intervention" className="text-orange-600 font-semibold hover:text-orange-700">56 communes d&apos;Occitanie</Link>.
            </p>
            <p>
              Notre rapport est reconnu par les assurances et les tribunaux : si vous êtes en litige sur une <Link href="/blog/assurance-fissures-maison-indemnisation" className="text-orange-600 font-semibold hover:text-orange-700">indemnisation suite à des fissures</Link>, il devient une pièce technique solide pour négocier. Quand on intervient, on choisit la solution la moins lourde possible — <Link href="/blog/agrafage-vs-micropieux-choix" className="text-orange-600 font-semibold hover:text-orange-700">agrafage plutôt que micropieux</Link> dans 90 % des cas. Voir nos <Link href="/avis-clients" className="text-orange-600 font-semibold hover:text-orange-700">avis clients (4.9/5 sur Google)</Link>.
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
