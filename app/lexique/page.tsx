import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from '@/components/ui/SmartBackBar';
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import {
  lexiqueEntries,
  ALPHABET,
  ACTIVE_LETTERS,
  ENTRIES_BY_LETTER,
} from './entries';

export const metadata: Metadata = {
  title: 'Lexique de la pathologie du bâtiment · Institut IPB',
  description:
    "Définitions des termes techniques utilisés en pathologie et structure du bâtiment : agrafage, fissuromètre, retrait-gonflement des argiles, micropieux, sous-œuvre. Ressource maintenue par l'institut.",
  keywords: [
    'lexique pathologie bâtiment',
    'définition agrafage structurel',
    'définition fissuromètre',
    'glossaire fissures',
    'vocabulaire structure bâtiment',
    'à quoi sert un fissuromètre',
    'définition retrait-gonflement argiles',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/lexique',
  },
  openGraph: {
    title: 'Lexique de la pathologie du bâtiment · Institut IPB',
    description:
      "Définitions des termes techniques utilisés en pathologie et structure du bâtiment. Ressource maintenue par l'institut.",
    url: 'https://www.ipb-expertise.fr/lexique',
    type: 'article',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.ipb-expertise.fr' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Lexique',
      item: 'https://www.ipb-expertise.fr/lexique',
    },
  ],
};

const definedTermJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: "Lexique de la pathologie du bâtiment — IPB",
  description:
    "Définitions des termes techniques de la pathologie et de la structure du bâtiment, maintenues par l'Institut de Pathologie du Bâtiment.",
  url: 'https://www.ipb-expertise.fr/lexique',
  hasDefinedTerm: lexiqueEntries.map((entry) => ({
    '@type': 'DefinedTerm',
    name: entry.terme,
    description: entry.definition,
    url: `https://www.ipb-expertise.fr/lexique#${entry.slug}`,
  })),
};

export default function LexiquePage() {
  // Lettres dans l'ordre alphabétique présentes dans les entrées
  const lettresActives = ALPHABET.filter((l) => ACTIVE_LETTERS.has(l));

  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="defined-term-set-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd) }}
      />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-14 lg:pb-20">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Ressource de l'institut</Eyebrow>
              </RevealOnScroll>
              <RevealOnScroll delay={0.06} variant="editorial">
                <h1
                  className="font-serif text-ipb-text mb-8"
                  style={{
                    fontSize: 'clamp(40px, 4vw, 62px)',
                    lineHeight: 1.06,
                    letterSpacing: '-0.025em',
                    fontWeight: 700,
                  }}
                >
                  Lexique de la pathologie<br />
                  <em>du bâtiment.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted max-w-[640px]">
                  Les rapports techniques que nous remettons emploient un vocabulaire précis. Ce lexique en explique les principaux termes, dans la même définition que celle utilisée par l'institut sur ses chantiers et dans ses rapports. Il est consultable librement, et nous l'enrichissons au fil des dossiers traités.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* NAV ALPHABÉTIQUE */}
        <section className="bg-ipb-white border-y border-ipb-rule sticky top-[68px] z-30">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 py-5">
            <nav aria-label="Navigation alphabétique" className="flex flex-wrap gap-1.5 sm:gap-2">
              {ALPHABET.map((lettre) => {
                const active = ACTIVE_LETTERS.has(lettre);
                return active ? (
                  <a
                    key={lettre}
                    href={`#section-${lettre}`}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-[3px] font-serif font-bold text-[14px] text-ipb-orange-d hover:bg-ipb-cream transition-colors"
                  >
                    {lettre}
                  </a>
                ) : (
                  <span
                    key={lettre}
                    aria-disabled="true"
                    className="inline-flex items-center justify-center w-9 h-9 rounded-[3px] font-serif font-light text-[14px] text-ipb-rule cursor-not-allowed"
                  >
                    {lettre}
                  </span>
                );
              })}
            </nav>
            <p className="text-[12px] text-ipb-light mt-3">
              {lexiqueEntries.length} entrées · {lettresActives.length} lettres actives
            </p>
          </div>
        </section>

        {/* ENTRÉES PAR LETTRE */}
        <section className="bg-ipb-white pt-12 pb-24 lg:pt-16 lg:pb-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            {lettresActives.map((lettre) => {
              const entries = ENTRIES_BY_LETTER[lettre];
              return (
                <div
                  key={lettre}
                  id={`section-${lettre}`}
                  className="mb-20 last:mb-0 scroll-mt-32"
                >
                  <RevealOnScroll>
                    <h2
                      className="font-serif text-ipb-orange text-[64px] lg:text-[80px] leading-none font-bold mb-10 tracking-tight"
                      aria-hidden="true"
                    >
                      {lettre}
                    </h2>
                  </RevealOnScroll>

                  <div className="space-y-12">
                    {entries.map((entry) => (
                      <RevealOnScroll key={entry.slug} variant="subtle">
                        <article
                          id={entry.slug}
                          className="scroll-mt-32 pb-10 border-b border-ipb-rule last:border-b-0"
                        >
                          <h3
                            className="font-serif text-ipb-text font-bold mb-4"
                            style={{
                              fontSize: 'clamp(22px, 2.2vw, 28px)',
                              lineHeight: 1.2,
                              letterSpacing: '-0.018em',
                            }}
                          >
                            {entry.terme}
                          </h3>

                          <p className="text-[15px] leading-[1.85] font-light text-ipb-text mb-4">
                            {entry.definition}
                          </p>

                          {entry.precision && (
                            <p className="text-[14px] leading-[1.85] font-light text-ipb-muted mb-4">
                              {entry.precision}
                            </p>
                          )}

                          {entry.voirAussi && entry.voirAussi.length > 0 && (
                            <p className="text-[12px] text-ipb-light mt-5">
                              <span className="uppercase tracking-[0.18em] font-medium mr-2">
                                Voir aussi
                              </span>
                              {entry.voirAussi.map((link, i) => (
                                <span key={link.href}>
                                  {link.href.startsWith('#') ? (
                                    <a
                                      href={link.href}
                                      className="text-ipb-orange-d hover:underline"
                                    >
                                      {link.label}
                                    </a>
                                  ) : (
                                    <Link
                                      href={link.href}
                                      className="text-ipb-orange-d hover:underline"
                                    >
                                      {link.label}
                                    </Link>
                                  )}
                                  {i < entry.voirAussi!.length - 1 && (
                                    <span className="text-ipb-rule mx-1.5">·</span>
                                  )}
                                </span>
                              ))}
                            </p>
                          )}
                        </article>
                      </RevealOnScroll>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PIED ÉDITORIAL — sobre, contextuel */}
        <section className="bg-ipb-cream py-20 lg:py-28">
          <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
            <RevealOnScroll>
              <p className="font-serif text-ipb-text text-[20px] lg:text-[24px] leading-[1.45] mb-6 italic">
                Un terme manque, une définition mérite une précision&nbsp;?
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <p className="text-[14px] leading-[1.9] font-light text-ipb-muted">
                Ce lexique est enrichi au fil des dossiers traités par l'institut. Si vous identifiez un manque ou une formulation à préciser, vous pouvez nous l'indiquer par email à{' '}
                <a href="mailto:contact@ipb-expertise.fr" className="text-ipb-orange-d underline hover:no-underline">
                  contact@ipb-expertise.fr
                </a>
                .
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
