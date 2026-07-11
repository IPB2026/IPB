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

// 3 portes d'entrée — refonte V3 §1 (la carte « avant vente » est retirée
// de l'accueil, plan 1.3 : la page reste accessible par le menu et le footer).
const homePersonas: PersonaCard[] = [
  {
    label: 'Fissures',
    titre: 'Une fissure est apparue',
    desc: "La plupart ne disent rien de grave. Certaines annoncent un mouvement du bâti. Nous venons la mesurer, et nous vous disons dans quel cas vous êtes.",
    href: '/expertise/fissures',
    cta: 'Demander un diagnostic fissures',
  },
  {
    label: 'Humidité',
    titre: "De l'humidité s'est installée",
    desc: "Remontées, infiltrations, condensation : les origines se ressemblent et se confondent. Traiter sans avoir identifié la cause, c'est souvent traiter deux fois. Nous commençons par la cause.",
    href: '/expertise/humidite',
    cta: 'Demander un diagnostic humidité',
  },
  {
    label: 'Achat immobilier',
    titre: 'Vous envisagez un achat',
    desc: "Un bien vous plaît, quelque chose vous retient. Nous inspectons le bâti avant que vous ne vous engagiez — sans lien avec le vendeur ni l'agence — et vous recevez notre rapport dans vos délais de rétractation.",
    href: '/expertise-avant-achat-immobilier-toulouse',
    cta: "Faire inspecter avant d'acheter",
  },
];

// Le schéma Organization (entité de marque) est émis site-wide dans app/layout.tsx.

export const metadata: Metadata = {
  title: { absolute: "Diagnostic fissures et humidité à Toulouse · Institut IPB" },
  description: "Institut de diagnostic en pathologie du bâtiment à Toulouse : fissures, humidité, inspection avant achat. Un rapport clair, remis sous 3 à 5 jours.",
  keywords: [
    'expert fissures Toulouse',
    'expertise fissures Haute-Garonne',
    'expert fissure maison Toulouse',
    'agrafage fissures',
    'réparation fissures Toulouse',
    'agrafage fissures Toulouse',
    'expertise humidité Toulouse',
    'expertise avant achat immobilier Toulouse',
    'inspection avant achat Toulouse',
    'diagnostic avant vente maison Toulouse',
    'institut pathologie du bâtiment',
    'expert bâtiment Toulouse',
    'rapport fissure assurance',
    'Toulouse', 'Montauban', 'Auch', 'Albi',
  ],
  openGraph: {
    title: "Diagnostic fissures et humidité à Toulouse · Institut IPB",
    description: "Institut de diagnostic en pathologie du bâtiment à Toulouse : fissures, humidité, inspection avant achat. Un rapport clair, remis sous 3 à 5 jours. Occitanie.",
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
    title: "Diagnostic fissures et humidité à Toulouse · Institut IPB",
    description: "Institut de diagnostic en pathologie du bâtiment : fissures, humidité, inspection avant achat. Un rapport clair, remis sous 3 à 5 jours. Occitanie.",
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
            Le visiteur se reconnaît dans 1 des 3 cas (fissures /
            humidité / acheteur) et clique sur la page
            persona dédiée. Routage SEO + conversion supérieure. */}
      <PersonaCards
        eyebrow="Selon votre situation"
        title={<>Dans quel cas <em>vous reconnaissez-vous&nbsp;?</em></>}
        intro="Trois situations possibles, une même rigueur d'analyse. Chacune mène à la page la plus utile pour vous."
        background="white"
        personas={homePersonas}
      />

      {/* 3. Liste architecturale 4 services (fissures en 1er) */}
      <ServiceList />

      {/* 3.b Notre périmètre — cadre l'intervention et ses limites (V3 §1) */}
      <section className="bg-ipb-white py-20 md:py-28 border-t border-ipb-rule">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-12">
          <p className="text-ipb-orange-d text-[11px] uppercase tracking-[0.18em] font-medium mb-4">
            Notre périmètre
          </p>
          <h2 className="font-serif text-ipb-text mb-8" style={{ fontSize: 'clamp(28px, 2.6vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
            Une inspection visuelle<br /><em>et instrumentée.</em>
          </h2>
          <div className="space-y-6 text-[15px] leading-[1.9] font-light text-ipb-muted">
            <p>
              Notre intervention consiste à lire le bâti tel qu'il se présente : observation méthodique, mesures au fissuromètre et à l'humidimètre, photographies datées. Nous ne pratiquons ni sondage ni investigation destructive.
            </p>
            <p>
              Cette lecture suffit, dans la grande majorité des situations, à répondre à la question qui vous amène : <strong className="text-ipb-text font-semibold">le désordre est-il structurel&nbsp;?</strong>
            </p>
            <p>
              Lorsqu'une réponse sérieuse exige davantage — calculs, sondages, investigations —, nous vous le disons et nous vous orientons vers un bureau d'études, votre dossier en main. Connaître les limites de son intervention fait partie de la rigueur que vous êtes en droit d'attendre.
            </p>
          </div>
        </div>
      </section>

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
            Faire mon pré-diagnostic (2 min)
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
