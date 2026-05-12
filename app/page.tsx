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
import { PersonaCards, type PersonaCard } from '@/components/home/PersonaCards';
import { FAQ } from '@/components/home/FAQ';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Footer } from '@/components/home/Footer';
import Script from 'next/script';
import type { Metadata } from 'next';

// Données des 4 personas — alignées sur §2.1 du cahier des charges.
const homePersonas: PersonaCard[] = [
  {
    label: 'Sinistré',
    titre: 'Vous voyez apparaître une fissure',
    desc: "Quelque chose a changé sur votre façade ou à l'intérieur, et vous voulez comprendre. Nous lisons le bâti, qualifions le désordre, et vous indiquons la suite à donner — sans rien vendre que vous n'ayez besoin.",
    href: '/expert-fissures-toulouse-31',
    cta: 'Voir notre expertise fissures',
  },
  {
    label: 'Vendeur',
    titre: 'Vous vendez un bien comportant des fissures',
    desc: "Un acheteur s'inquiète, une visite annulée, un compromis suspendu. Notre rapport documente précisément les désordres et présente les éléments factuels qui sécurisent la transaction.",
    href: '/vendre-bien-avec-fissures',
    cta: 'Voir la page vendeur',
  },
  {
    label: 'Acheteur',
    titre: 'Vous achetez et vous avez un doute',
    desc: "Avant de signer, vous voulez un avis structurel indépendant, sans aucun lien avec le vendeur ni l'agence. Nos délais sont compatibles avec votre rétractation.",
    href: '/expertise-avant-achat-immobilier-toulouse',
    cta: 'Voir la page acheteur',
  },
  {
    label: 'Rénovateur',
    titre: "Vous projetez d'ouvrir un mur porteur",
    desc: "Cuisine ouverte, suite parentale, baie vitrée. Étude de structure, dimensionnement de la poutre IPN ou HEB, exécution sous garantie décennale.",
    href: '/expert-mur-porteur',
    cta: 'Voir la page mur porteur',
  },
];

// Schema Organization pour Knowledge Panel Google
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.ipb-expertise.fr#organization",
  // Lien sémantique bidirectionnel avec le LocalBusiness déclaré dans app/layout.tsx.
  // Permet à Google de fusionner les deux entités dans son Knowledge Graph.
  "subOrganization": { "@id": "https://www.ipb-expertise.fr#localbusiness" },
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
  "description": "Institut indépendant spécialisé en pathologie et structure du bâtiment en Occitanie (31, 82, 32, 81). Diagnostic de fissures, ouverture de mur porteur et création de baie vitrée. Décennale AXA.",
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
    "telephone": "+33582953375",
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
  title: "L'Institut de Pathologies & Structure du Bâtiment · IPB",
  description: "IPB, institut de pathologies du bâtiment et expert en structure. Diagnostic de fissures, ouverture de mur porteur, traitement de l'humidité en Occitanie.",
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
    'Toulouse', 'Montauban', 'Auch', 'Albi',
  ],
  openGraph: {
    title: "L'Institut de Pathologies & Structure du Bâtiment · IPB",
    description: "Institut de pathologies du bâtiment et expert en structure. Diagnostic de fissures, ouverture de mur porteur, traitement de l'humidité en Occitanie.",
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
    title: "L'Institut de Pathologies & Structure du Bâtiment · IPB",
    description: "Institut de pathologies du bâtiment, expert en structure. Diagnostic, mur porteur, humidité en Occitanie.",
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

      {/* ─────────────────────────────────────────────────────────────
          ORDRE STRATÉGIQUE (CRO) — 2026-05-10
          Trois groupes selon la hauteur de page :
          • HAUT : self-identification + capture leads chauds
          • MILIEU : réassurance pour visiteurs tièdes
          • BAS : humanisation + preuve sociale + conversion finale
          ───────────────────────────────────────────────────────────── */}

      {/* ─── HAUT — captation immédiate ─────────────────────────── */}

      {/* 1. Hero — split éditorial avec crack SVG signature */}
      <Hero />

      {/* 2. Personas — self-identification immédiate.
            Le visiteur se reconnaît dans 1 des 4 cas (sinistré /
            vendeur / acheteur / rénovateur) et clique sur la page
            persona dédiée. Routage SEO + conversion supérieure. */}
      <PersonaCards
        eyebrow="Selon votre situation"
        title={<>Quatre cas, <em>quatre chemins.</em></>}
        intro="Selon ce que vous traversez, voici la page la plus utile. Notre méthode est la même quel que soit le dossier ; le point d'entrée diffère."
        background="white"
        personas={homePersonas}
      />

      {/* 3. Liste architecturale 4 services (fissures en 1er) */}
      <ServiceList />

      {/* 4. Bandeau calculateur mur porteur — capture lead chaud niche */}
      <section className="bg-ipb-navy text-white py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <p className="text-ipb-orange-l text-[11px] uppercase tracking-[0.18em] font-medium mb-4">
            Estimation gratuite
          </p>
          <h2 className="text-white font-serif mb-5" style={{ fontSize: 'clamp(22px, 2.6vw, 36px)', lineHeight: 1.2, letterSpacing: '-0.022em', fontWeight: 700 }}>
            Un projet d'ouverture de mur porteur ?{' '}
            <em className="text-ipb-orange-l block sm:inline mt-1 sm:mt-0 not-italic sm:italic">Combien ça va vous coûter.</em>
          </h2>
          <p className="text-white/75 text-[14px] md:text-[15px] leading-[1.8] mb-8 max-w-xl mx-auto">
            Notre calculateur, basé sur les chantiers IPB récents en Occitanie, vous donne une fourchette précise en deux minutes. Vous recevez le détail par email.
          </p>
          <a
            href="/calcul-prix-mur-porteur?utm_source=site&utm_medium=home_banner&utm_campaign=mur_porteur"
            className="inline-flex items-center justify-center gap-2 bg-ipb-orange-d text-white font-bold px-7 md:px-8 py-4 rounded-[3px] text-[13px] md:text-[14px] tracking-[0.03em] hover:bg-[#7E390F] transition-colors min-h-[48px]"
          >
            Lancer le calcul → 2 min
          </a>
        </div>
      </section>

      {/* ─── MILIEU — réassurance ───────────────────────────────── */}

      {/* 5. Méthode 5 étapes — comment on bosse */}
      <Methode />

      {/* 6. Études de cas — preuves concrètes */}
      <CaseStudies />

      {/* 7. Stats monumentaux fond navy — autorité chiffrée */}
      <StatsBlock />

      {/* ─── BAS — humanisation + preuve sociale + conversion ───── */}

      {/* 8. Cabinet — institut, équipe collective */}
      <Cabinet />

      {/* 9. Pull quote — voix éditoriale de l'institut, signature
            posée juste avant les avis clients. Cohérence sémantique
            entre la voix interne (Cabinet → PullQuote) et la voix
            externe (Testimonials qui suit). */}
      <PullQuote />

      {/* 10. Testimonials carousel éditorial — preuve sociale */}
      <Testimonials />

      {/* 9. FAQ (refaite Vague E avec questions GSC) */}
      <FAQ />

      {/* 10. CTA final — split avec téléphone Playfair */}
      <CtaFinal />

      <Footer />
    </div>
  );
}
