import Link from 'next/link';
import type { Metadata } from 'next';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { quartiersData, quartierSlugs } from '@/app/data/quartiers';

const site = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr').replace(/\/+$/, '');

export const metadata: Metadata = {
  title: 'Quartiers de Toulouse · Fissures et humidité par quartier · Institut IPB',
  description:
    "Pages dédiées par quartier toulousain : risque RGA, contexte géologique, problématiques fréquentes et solutions. Institut IPB — pathologie du bâtiment à Toulouse.",
  alternates: {
    canonical: `${site}/quartiers`,
  },
  openGraph: {
    title: 'Quartiers de Toulouse · Institut IPB',
    description:
      'Capitole, Saint-Cyprien, Minimes, Côte Pavée — analyses locales par quartier : fissures, humidité, sols.',
    url: `${site}/quartiers`,
    siteName: 'IPB Expertise',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const sortedQuartiers = [...quartierSlugs].sort((a, b) =>
  quartiersData[a].nom.localeCompare(quartiersData[b].nom, 'fr')
);

export default function QuartiersIndexPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Quartiers de Toulouse — Institut IPB',
    numberOfItems: sortedQuartiers.length,
    itemListElement: sortedQuartiers.map((slug, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: quartiersData[slug].nom,
      url: `${site}/quartiers/${slug}`,
    })),
  };

  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script
        id="quartiers-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Toulouse · {sortedQuartiers.length} quartiers</Eyebrow>
              </RevealOnScroll>
              <RevealOnScroll delay={0.06}>
                <h1
                  className="font-serif text-ipb-text mb-8"
                  style={{
                    fontSize: 'clamp(40px, 4vw, 62px)',
                    lineHeight: 1.06,
                    letterSpacing: '-0.025em',
                    fontWeight: 700,
                  }}
                >
                  Quartiers de Toulouse,<br />
                  <em>pathologies du bâtiment.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  Chaque quartier a son contexte géologique et son bâti. Retrouvez nos fiches locales avec le risque RGA, les problématiques fréquentes et les solutions techniques adaptées au sol et au type de construction.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic gratuit
                  </MagneticButton>
                  <MagneticButton href="/zones-intervention" variant="ghost">
                    Voir toutes les villes
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* LISTE QUARTIERS */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Tous les quartiers</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Cliquez sur un quartier<br /><em>pour la fiche locale.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ipb-rule border border-ipb-rule">
              {sortedQuartiers.map((slug, i) => {
                const q = quartiersData[slug];
                return (
                  <li key={slug}>
                    <Link
                      href={`/quartiers/${slug}`}
                      className="group block p-8 lg:p-10 bg-ipb-white hover:bg-ipb-stone transition-colors duration-300 h-full"
                    >
                      <span className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-4 block">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-serif text-ipb-text font-bold text-[20px] leading-tight mb-3 group-hover:text-ipb-orange transition-colors">
                        {q.nom}
                      </h3>
                      <p className="text-[14px] leading-[1.85] font-light text-ipb-muted mb-5">
                        {q.description}
                      </p>
                      <span className="text-[13px] text-ipb-orange font-medium">
                        Voir la fiche →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* CTA secondaire */}
        <section className="bg-ipb-cream py-16 lg:py-20">
          <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
            <p className="text-[15px] leading-[1.85] text-ipb-text mb-8">
              Votre quartier n'est pas listé ? Notre intervention couvre tout Toulouse et son agglomération.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton href="/diagnostic" variant="primary">
                Diagnostic en ligne gratuit
              </MagneticButton>
              <MagneticButton href="/zones-intervention" variant="ghost">
                Voir nos zones d'intervention
              </MagneticButton>
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
