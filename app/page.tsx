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
import type { Metadata } from 'next';

// 4 portes d'entrée — refonte positionnement v6.
// Fissures / Humidité / Achat immobilier / Vente immobilière.
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
    desc: "Avant de signer, un diagnostic indépendant du bâti, sans lien avec le vendeur ni l'agence. Rapport remis dans vos délais de rétractation.",
    href: '/expertise-avant-achat-immobilier-toulouse',
    cta: 'Faire expertiser le bien',
  },
  {
    label: 'Vente immobilière',
    titre: 'Vous vendez et voulez rassurer',
    desc: "Un diagnostic indépendant avant la mise en vente : vous objectivez l'état du bâti, vous désamorcez les doutes des acheteurs et vous sécurisez votre prix.",
    href: '/diagnostic-avant-vente',
    cta: 'Diagnostiquer avant de vendre',
  },
];

// Le schéma Organization (entité de marque) est émis site-wide dans app/layout.tsx.

export const metadata: Metadata = {
  title: "Institut indépendant de diagnostic en pathologie du bâtiment · IPB",
  description: "Diagnostic indépendant en pathologie du bâtiment à Toulouse : fissures, humidité, avant achat, avant vente. Un rapport clair, sans vendre de travaux.",
  keywords: [
    'expert fissures Toulouse',
    'expertise fissures Haute-Garonne',
    'expert fissure maison Toulouse',
    'agrafage fissures',
    'expertise humidité Toulouse',
    'expertise avant achat immobilier Toulouse',
    'diagnostic avant vente maison Toulouse',
    'institut pathologie du bâtiment',
    'expertise structure bâtiment Toulouse',
    'expert bâtiment Toulouse',
    'rapport fissure assurance',
    'Toulouse', 'Montauban', 'Auch', 'Albi',
  ],
  openGraph: {
    title: "Institut indépendant de diagnostic en pathologie du bâtiment · IPB",
    description: "Institut indépendant de diagnostic en pathologie du bâtiment : fissures, humidité, expertise avant achat. Un rapport clair, en toute indépendance. Occitanie.",
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
    title: "Institut indépendant de diagnostic en pathologie du bâtiment · IPB",
    description: "Diagnostic indépendant en pathologie du bâtiment : fissures, humidité, expertise avant achat. Un rapport clair, sans vendre de travaux. Occitanie.",
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
        title={<>Dans quel cas <em>vous reconnaissez-vous&nbsp;?</em></>}
        intro="Quatre situations possibles, une même rigueur d'analyse. Chacune mène à la page la plus utile pour vous."
        background="white"
        personas={homePersonas}
      />

      {/* 3. Liste architecturale 4 services (fissures en 1er) */}
      <ServiceList />

      {/* 4. Bandeau CTA diagnostic — capture lead */}
      <section className="bg-ipb-navy text-white py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <p className="text-ipb-orange-l text-[11px] uppercase tracking-[0.18em] font-medium mb-4">
            L'avis de l'institut
          </p>
          <h2 className="text-white font-serif mb-5" style={{ fontSize: 'clamp(22px, 2.6vw, 36px)', lineHeight: 1.2, letterSpacing: '-0.022em', fontWeight: 700 }}>
            Un doute sur votre bâti ?{' '}
            <em className="text-ipb-orange-l block sm:inline mt-1 sm:mt-0 not-italic sm:italic">Soumettez-le à l'institut.</em>
          </h2>
          <p className="text-white/75 text-[14px] md:text-[15px] leading-[1.8] mb-8 max-w-xl mx-auto">
            Décrivez votre situation — fissures, humidité, doute avant un achat ou une vente. Nous vous indiquons s'il faut une visite, et sous quel délai. Sans engagement.
          </p>
          <a
            href="/diagnostic?utm_source=site&utm_medium=home_banner&utm_campaign=diagnostic"
            className="inline-flex items-center justify-center gap-2 bg-ipb-orange-d text-white font-bold px-7 md:px-8 py-4 rounded-[3px] text-[13px] md:text-[14px] tracking-[0.03em] hover:bg-[#7E390F] transition-colors min-h-[48px]"
          >
            Demander un diagnostic
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
