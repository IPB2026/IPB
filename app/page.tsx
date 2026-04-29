import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { TrustRibbon } from '@/components/ui/TrustRibbon';
import { Hero } from '@/components/home/Hero';
import { PullQuote } from '@/components/home/PullQuote';
import { ServiceList } from '@/components/home/ServiceList';
import { Methode } from '@/components/home/Methode';
import { Cabinet } from '@/components/home/Cabinet';
import { CaseStudies } from '@/components/home/CaseStudies';
import { StatsBlock } from '@/components/home/StatsBlock';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';
import { CtaFinal } from '@/components/home/CtaFinal';
import { CalculatorTeaser } from '@/components/home/CalculatorTeaser';
import { Footer } from '@/components/home/Footer';
import Script from 'next/script';
import type { Metadata } from 'next';

// Schema Organization pour Knowledge Panel Google
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.ipb-expertise.fr#organization",
  "name": "IPB - Institut de Pathologie du Bâtiment",
  "alternateName": ["IPB Expertise", "Institut IPB"],
  "legalName": "Bâti Halli SARL",
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
  "description": "Institut indépendant spécialisé en pathologie et structure du bâtiment en Occitanie (31, 82, 32, 81). Diagnostic de fissures, ouverture de mur porteur, traitement de l'humidité. Décennale AXA.",
  "slogan": "Les spécialistes de la structure de votre habitat",
  "foundingDate": "2019",
  "founder": {
    "@type": "Person",
    "name": "Ludovic D.",
    "jobTitle": "Ingénieur structure",
    "url": "https://www.ipb-expertise.fr/notre-expert"
  },
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": "8" },
  "knowsAbout": [
    "Diagnostic de fissures structurelles",
    "Agrafage structurel inox",
    "Reprise en sous-œuvre par micropieux",
    "Ouverture de mur porteur",
    "Calcul de poutre IPN/HEB selon Eurocode",
    "Création de baie vitrée",
    "Traitement de l'humidité par injection résine hydrophobe",
    "Cuvelage de cave",
    "Ventilation par insufflation (VMI)",
    "Retrait-gonflement des argiles (RGA)",
    "Indemnisation catastrophe naturelle sécheresse",
    "Expertise avant achat immobilier",
    "Pathologie du bâtiment"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "13 rue du Recteur Dottin",
    "addressLocality": "Toulouse",
    "postalCode": "31100",
    "addressRegion": "Occitanie",
    "addressCountry": "FR"
  },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Haute-Garonne (31)" },
    { "@type": "AdministrativeArea", "name": "Tarn-et-Garonne (82)" },
    { "@type": "AdministrativeArea", "name": "Gers (32)" },
    { "@type": "AdministrativeArea", "name": "Tarn (81)" },
    { "@type": "AdministrativeArea", "name": "Ariège (09)" },
    { "@type": "AdministrativeArea", "name": "Aude (11)" }
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+33-5-82-95-33-75",
      "contactType": "customer service",
      "availableLanguage": "French",
      "areaServed": ["FR-31", "FR-82", "FR-32", "FR-81", "FR-09", "FR-11"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "19:00"
      }
    }
  ],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Garantie décennale",
    "name": "Décennale AXA France IARD — police active depuis 2019",
    "recognizedBy": {
      "@type": "Organization",
      "name": "AXA France IARD"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "47"
  },
  "sameAs": [
    "https://www.facebook.com/ipbexpertise",
    "https://www.linkedin.com/company/ipb-expertise",
    "https://g.co/kgs/ipb-expertise"
  ]
};

export const metadata: Metadata = {
  title: "IPB — Institut de pathologie du bâtiment · Diagnostic de fissures et ouverture de mur porteur · Toulouse",
  description: "Institut indépendant spécialisé en structure du bâtiment. Diagnostic de fissures et ouverture de mur porteur en Occitanie. Décennale AXA. 850 chantiers livrés depuis 2019.",
  keywords: [
    'expert fissures Toulouse',
    'expertise fissures Haute-Garonne',
    'expert fissure maison Toulouse',
    'agrafage fissures',
    'ouverture mur porteur Toulouse',
    'création baie vitrée Toulouse',
    'institut pathologie du bâtiment',
    'expertise structure bâtiment Toulouse',
    'expert bâtiment Toulouse',
    'rapport fissure assurance',
    'micropieux Haute-Garonne',
    'Toulouse', 'Montauban', 'Auch', 'Albi',
  ],
  openGraph: {
    title: "IPB — Institut de pathologie du bâtiment · Toulouse",
    description: "Diagnostic de fissures et ouverture de mur porteur en Occitanie. Institut indépendant. Décennale AXA. 850 chantiers livrés.",
    url: "https://www.ipb-expertise.fr",
    siteName: "IPB - Institut de Pathologie du Bâtiment",
    images: [
      {
        url: "/images/IPB_Logo_HD.png",
        width: 1200,
        height: 630,
        alt: "IPB Expertise — Institut de pathologie du bâtiment à Toulouse",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IPB — Institut de pathologie du bâtiment · Toulouse",
    description: "Diagnostic de fissures et ouverture de mur porteur en Occitanie. Décennale AXA.",
    images: [
      {
        url: "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png",
        width: 1200,
        height: 630,
        alt: "IPB Expertise — Institut de pathologie du bâtiment à Toulouse",
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
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased selection:bg-ipb-orange selection:text-white">
      {/* Organization Schema pour Knowledge Panel */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <TopBar />
      <TrustRibbon />
      <Navbar />

      {/* 1. Hero — split éditorial avec crack SVG signature */}
      <Hero />

      {/* 2. Pull quote Ludovic — fond navy-2, ligne orange */}
      <PullQuote />

      {/* 3. Liste architecturale 4 services (fissures en 1er) */}
      <ServiceList />

      {/* 4. Calculateur prix mur porteur — outil interactif sans inscription */}
      <CalculatorTeaser />

      {/* 5. Méthode 5 étapes (accompagnement complet) */}
      <Methode />

      {/* 5. Cabinet (REMPLACE TrustSignals "indépendants/tout en interne") */}
      <Cabinet />

      {/* 6. Études de cas (2 fissures + 1 mur porteur, photos cohérentes) */}
      <CaseStudies />

      {/* 7. Stats monumentaux fond navy */}
      <StatsBlock />

      {/* 8. Testimonials carousel éditorial */}
      <Testimonials />

      {/* 9. FAQ (refaite Vague E avec questions GSC) */}
      <FAQ />

      {/* 10. CTA final — split avec téléphone Playfair */}
      <CtaFinal />

      <Footer />
    </div>
  );
}
