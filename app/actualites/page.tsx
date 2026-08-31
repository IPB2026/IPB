import type { Metadata } from 'next';
import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from '@/components/ui/SmartBackBar';
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const metadata: Metadata = {
  title: { absolute: 'Actualités du bâti en Occitanie · IPB' },
  description:
    "Arrêtés de catastrophe naturelle, épisodes de sécheresse, infiltrations saisonnières : ce qui affecte le bâti en Occitanie et ce qu'il faut en faire.",
  alternates: { canonical: 'https://www.ipb-expertise.fr/actualites' },
  openGraph: {
    title: 'Actualités du bâti en Occitanie · IPB',
    description:
      "Arrêtés CAT-NAT, sécheresse, infiltrations saisonnières : ce qui affecte le bâti en Occitanie.",
    url: 'https://www.ipb-expertise.fr/actualites',
    siteName: 'IPB - Institut de Pathologie du Bâtiment',
    locale: 'fr_FR',
    type: 'website',
  },
};

// Les trois pages /actualites/* existaient sans aucun chemin d'accès : ni index,
// ni lien depuis le footer, ni depuis la navigation. Elles étaient au sitemap
// avec zéro lien interne entrant (LOT 3, 2026-08).
const actualites = [
  {
    href: '/actualites/arrete-secheresse-2026',
    titre: 'Arrêté sécheresse : le délai de déclaration court dès la publication',
    resume:
      "Une commune reconnue en état de catastrophe naturelle ouvre un délai légal de 30 jours pour déclarer le sinistre. Passé ce délai, l'indemnisation devient beaucoup plus difficile à obtenir.",
    eyebrow: 'Catastrophe naturelle',
  },
  {
    href: '/actualites/canicule-proteger-maison',
    titre: 'Canicule : ce qui se joue sous la maison pendant un été sec',
    resume:
      "Les argiles se rétractent, les fondations suivent. Les fissures apparaissent souvent avec plusieurs semaines de décalage sur l'épisode qui les a provoquées.",
    eyebrow: 'Sécheresse',
  },
  {
    href: '/actualites/infiltrations-automne-hiver',
    titre: 'Automne et hiver : la saison où les infiltrations se déclarent',
    resume:
      "Les premières pluies durables révèlent les défauts d'étanchéité restés invisibles tout l'été. C'est la période où l'origine d'une humidité se diagnostique le plus sûrement.",
    eyebrow: 'Humidité',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Actualités du bâti en Occitanie',
  url: 'https://www.ipb-expertise.fr/actualites',
  isPartOf: { '@id': 'https://www.ipb-expertise.fr#website' },
  hasPart: actualites.map((a) => ({
    '@type': 'Article',
    headline: a.titre,
    url: `https://www.ipb-expertise.fr${a.href}`,
  })),
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.ipb-expertise.fr' },
    { '@type': 'ListItem', position: 2, name: 'Actualités', item: 'https://www.ipb-expertise.fr/actualites' },
  ],
};

export default function ActualitesPage() {
  return (
    <div className="min-h-screen bg-ipb-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        <section className="bg-ipb-cream pt-20 pb-14 lg:pt-28 lg:pb-20">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <Eyebrow>Actualités</Eyebrow>
              <h1
                className="font-serif text-ipb-text mb-6"
                style={{
                  fontSize: 'clamp(34px, 3.4vw, 52px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.024em',
                  fontWeight: 700,
                }}
              >
                Ce qui affecte le bâti <em>en Occitanie.</em>
              </h1>
              <p className="text-[15px] leading-[1.9] font-light text-ipb-muted max-w-[620px]">
                Arrêtés de catastrophe naturelle, épisodes de sécheresse, saisons d&apos;infiltration :
                les événements qui déclenchent les désordres que nous diagnostiquons, et les délais
                qu&apos;ils ouvrent.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <section className="bg-ipb-white py-16 lg:py-20 border-y border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="space-y-10">
              {actualites.map((a, i) => (
                <RevealOnScroll key={a.href} delay={i * 0.06}>
                  <Link href={a.href} className="group block border-t border-ipb-rule pt-6">
                    <p className="text-[10px] text-ipb-orange uppercase tracking-[0.18em] mb-3 font-medium">
                      {a.eyebrow}
                    </p>
                    <h2 className="font-serif text-ipb-text font-bold text-[22px] leading-tight mb-3 group-hover:text-ipb-orange transition-colors">
                      {a.titre}
                    </h2>
                    <p className="text-[14px] leading-[1.85] font-light text-ipb-muted max-w-[680px] mb-3">
                      {a.resume}
                    </p>
                    <span className="text-ipb-orange text-[12px] font-medium border-b border-ipb-orange pb-0.5">
                      Lire →
                    </span>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </div>
  );
}
