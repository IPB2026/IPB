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

// 4 portes d'entrée — HOME-IPB-CONTENU-FINAL §4.
// Fissures / Humidité / Achat immobilier / Mur porteur.
const homePersonas: PersonaCard[] = [
  {
    label: 'Fissures',
    titre: 'Une fissure vous inquiète',
    desc: "Elle apparaît, s'élargit, suit les joints en escalier. On lit le bâti, on mesure, on identifie la cause — et on vous dit si c'est grave.",
    href: '/expertise/fissures',
    cta: 'Diagnostiquer ma fissure',
  },
  {
    label: 'Humidité',
    titre: "De l'humidité s'est installée",
    desc: "Remontées, infiltrations, salpêtre, condensation. On identifie la vraie origine — souvent confondue — avant de traiter.",
    href: '/expertise/humidite',
    cta: 'Diagnostiquer mon humidité',
  },
  {
    label: 'Achat immobilier',
    titre: 'Vous achetez et vous avez un doute',
    desc: "Avant de signer, un avis structurel indépendant, sans lien avec le vendeur ni l'agence. Rapport remis dans vos délais de rétractation.",
    href: '/expertise-avant-achat-immobilier-toulouse',
    cta: 'Faire expertiser le bien',
  },
  {
    label: 'Mur porteur',
    titre: 'Vous voulez ouvrir un mur porteur',
    desc: "Cuisine ouverte, baie vitrée. Étude de structure, conception, réalisation sous décennale.",
    href: '/expertise/mur-porteur',
    cta: 'Étudier mon projet',
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
  "legalName": "IPB",
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
  "description": "Institut spécialisé en pathologie et structure du bâtiment en Occitanie (31, 82, 32, 81). Diagnostic de fissures, expertise humidité, expertise avant achat et ouverture de mur porteur. Diagnostic et coordination assurés par IPB ; travaux réalisés sous décennale par les équipes de réalisation du réseau IPB.",
  // foundingDate du réseau IPB (et non d'IPB en tant qu'entité juridique).
  "foundingDate": "2019",
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
  title: "Institut de pathologie & structure du bâtiment · IPB",
  description: "IPB diagnostique fissures, humidité et désordres structurels, conçoit la solution et la met en œuvre avec ses équipes de réalisation. Un seul interlocuteur, du diagnostic à la livraison. Occitanie.",
  keywords: [
    'expert fissures Toulouse',
    'expertise fissures Haute-Garonne',
    'expert fissure maison Toulouse',
    'agrafage fissures',
    'ouverture mur porteur Toulouse',
    'expertise humidité Toulouse',
    'expertise avant achat immobilier Toulouse',
    'institut pathologie du bâtiment',
    'expertise structure bâtiment Toulouse',
    'expert bâtiment Toulouse',
    'rapport fissure assurance',
    'Toulouse', 'Montauban', 'Auch', 'Albi',
  ],
  openGraph: {
    title: "Institut de pathologie & structure du bâtiment · IPB",
    description: "IPB diagnostique les pathologies du bâti, conçoit la solution, et la met en œuvre avec ses équipes de réalisation. Fissures, humidité, mur porteur. Occitanie.",
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
    title: "Institut de pathologie & structure du bâtiment · IPB",
    description: "IPB diagnostique fissures, humidité et désordres structurels, conçoit la solution, et la met en œuvre avec ses équipes. Occitanie.",
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
        title={<>Vous êtes <em>confronté à quoi&nbsp;?</em></>}
        intro="Quatre situations, une même rigueur. Voici la porte d'entrée la plus utile pour vous."
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
            Un projet de mur porteur ?{' '}
            <em className="text-ipb-orange-l block sm:inline mt-1 sm:mt-0 not-italic sm:italic">Découvrez le budget en 2 minutes.</em>
          </h2>
          <p className="text-white/75 text-[14px] md:text-[15px] leading-[1.8] mb-8 max-w-xl mx-auto">
            Notre calculateur, basé sur des chantiers récents du réseau IPB en Occitanie, vous donne une fourchette précise. Vous recevez le détail par email.
          </p>
          <a
            href="/calcul-prix-mur-porteur?utm_source=site&utm_medium=home_banner&utm_campaign=mur_porteur"
            className="inline-flex items-center justify-center gap-2 bg-ipb-orange-d text-white font-bold px-7 md:px-8 py-4 rounded-[3px] text-[13px] md:text-[14px] tracking-[0.03em] hover:bg-[#7E390F] transition-colors min-h-[48px]"
          >
            Lancer le calcul
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
