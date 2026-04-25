import Link from 'next/link';
import type { Metadata } from 'next';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { MapPin, ArrowRight } from 'lucide-react';
import { quartiersData, quartierSlugs } from '@/app/data/quartiers';

const site = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr').replace(/\/+$/, '');

export const metadata: Metadata = {
  title: 'Quartiers Toulouse — Fissures & humidité | IPB Expertise',
  description:
    'Pages dédiées par quartier toulousain : risques RGA, humidité, fissures et solutions. Expertise indépendante sur mesure à Toulouse et Haute-Garonne.',
  alternates: {
    canonical: `${site}/quartiers`,
  },
  openGraph: {
    title: 'Quartiers Toulouse — Expert fissures & humidité | IPB',
    description:
      'Découvrez nos analyses locales par quartier : Capitole, Saint-Cyprien, Minimes, Côte Pavée et plus encore.',
    url: `${site}/quartiers`,
    siteName: 'IPB Expertise',
    locale: 'fr_FR',
    type: 'website',
  },
};

const sortedQuartiers = [...quartierSlugs].sort((a, b) =>
  quartiersData[a].nom.localeCompare(quartiersData[b].nom, 'fr')
);

export default function QuartiersIndexPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Quartiers Toulouse — IPB Expertise',
    numberOfItems: sortedQuartiers.length,
    itemListElement: sortedQuartiers.map((slug, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: quartiersData[slug].nom,
      url: `${site}/quartiers/${slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Script
        id="quartiers-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <TopBar />
      <Navbar />

      <header className="bg-slate-900 text-white py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-orange-400 font-bold text-sm uppercase tracking-wider mb-3">Toulouse</p>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Quartiers et pathologies du bâtiment
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
            Chaque quartier a son contexte géologique et son bâti. Retrouvez nos fiches locales sur les risques de
            fissures, d&apos;humidité et les solutions adaptées.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <ul className="grid sm:grid-cols-2 gap-4">
          {sortedQuartiers.map((slug) => {
            const q = quartiersData[slug];
            return (
              <li key={slug}>
                <Link
                  href={`/quartiers/${slug}`}
                  className="group flex items-start gap-4 bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-orange-300 hover:shadow-md transition-all"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                    <MapPin size={22} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="font-bold text-slate-900 group-hover:text-orange-700 flex items-center gap-1">
                      {q.nom}
                      <ArrowRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-600 shrink-0"
                        aria-hidden
                      />
                    </span>
                    <span className="text-sm text-slate-500 block mt-1">{q.description}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 rounded-2xl bg-orange-50 border border-orange-200 p-6 md:p-8 text-center">
          <p className="text-slate-800 font-medium mb-4">
            Votre quartier n&apos;est pas listé ? Notre intervention couvre tout Toulouse et l&apos;agglomération.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center rounded-xl bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700 transition"
            >
              Diagnostic en ligne gratuit
            </Link>
            <Link
              href="/zones-intervention"
              className="inline-flex items-center justify-center rounded-xl border-2 border-slate-300 bg-white px-6 py-3 font-bold text-slate-800 hover:border-orange-400 transition"
            >
              Zones d&apos;intervention
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
