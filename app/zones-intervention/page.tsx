import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { MapPin, Phone, ArrowRight, Shield, AlertTriangle } from 'lucide-react';
import { villesData, departementsMapping } from '@/app/data/villes';

export const metadata: Metadata = {
  title: 'Zones d\'Intervention | IPB Expert Occitanie',
  description: '56 villes couvertes : Haute-Garonne, Tarn-et-Garonne, Gers, Tarn. Expert fissures et humidité, diagnostic sous 48h. 05 82 95 33 75',
  keywords: [
    'expert fissures Occitanie', 'expert fissures Haute-Garonne', 'expert fissures Tarn',
    'agrafage fissures Toulouse', 'expert humidité 31', 'expert bâtiment 82',
    'zones intervention IPB', 'expert fissures 32', 'diagnostic fissures Tarn',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/zones-intervention',
  },
  openGraph: {
    title: 'Zones d\'Intervention | IPB Expert Bâtiment Occitanie',
    description: '56 villes couvertes en Haute-Garonne, Tarn-et-Garonne, Gers et Tarn. Diagnostic fissures et humidité sous 48h.',
    url: 'https://www.ipb-expertise.fr/zones-intervention',
    type: 'website',
  },
};

function getRisqueBadge(risque?: string) {
  switch (risque) {
    case 'tres-fort': return { label: 'Très Fort', color: 'bg-red-100 text-red-700 border-red-200' };
    case 'fort': return { label: 'Fort', color: 'bg-orange-100 text-orange-700 border-orange-200' };
    case 'moyen': return { label: 'Moyen', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
    case 'faible': return { label: 'Faible', color: 'bg-green-100 text-green-700 border-green-200' };
    default: return { label: '—', color: 'bg-slate-100 text-slate-600 border-slate-200' };
  }
}

export default function ZonesInterventionPage() {
  const totalVilles = Object.keys(villesData).length;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'IPB - Expert Fissures & Humidité Occitanie',
    description: `Expert bâtiment intervenant dans ${totalVilles} villes en Occitanie pour le diagnostic et traitement des fissures et de l'humidité.`,
    url: 'https://www.ipb-expertise.fr/zones-intervention',
    telephone: '+33582953375',
    areaServed: departementsMapping.map(dept => ({
      '@type': 'AdministrativeArea',
      name: `${dept.nom} (${dept.code})`,
    })),
    priceRange: '€€',
  };

  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="zones-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative bg-slate-900 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950/30"></div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-100 px-4 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
            <MapPin size={14} />
            {totalVilles} villes couvertes en Occitanie
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Nos zones d&apos;intervention
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            IPB intervient dans <strong className="text-white">{departementsMapping.length} départements</strong> et <strong className="text-white">{totalVilles} villes</strong> pour le diagnostic et le traitement des fissures structurelles et de l&apos;humidité. Déplacement inclus, diagnostic sous 48h.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition shadow-xl">
              Diagnostic gratuit <ArrowRight size={20} />
            </Link>
            <a href="tel:0582953375" className="bg-white/10 border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition">
              <Phone size={20} /> 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-extrabold text-orange-600">{totalVilles}</div>
              <div className="text-slate-600 text-sm">Villes couvertes</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-orange-600">{departementsMapping.length}</div>
              <div className="text-slate-600 text-sm">Départements</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-orange-600">48h</div>
              <div className="text-slate-600 text-sm">Délai intervention</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-orange-600">0€</div>
              <div className="text-slate-600 text-sm">Frais de déplacement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapping par département */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Toutes nos villes d&apos;intervention par département
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Cliquez sur une ville pour voir les données locales : risque RGA, arrêtés catastrophe naturelle, quartiers touchés et tarifs.
            </p>
          </div>

          <div className="space-y-12">
            {departementsMapping.map((dept) => (
              <div key={dept.code} id={`dept-${dept.code}`} className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
                {/* Header département */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500 text-white w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg">
                      {dept.code}
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-white">{dept.nom}</h3>
                      <p className="text-slate-400 text-sm">{dept.villes.length} villes couvertes</p>
                    </div>
                  </div>
                  <Link
                    href={`/departements/${dept.slug}`}
                    className="text-orange-400 hover:text-orange-300 font-bold text-sm flex items-center gap-1 transition"
                  >
                    Voir la page département <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Grille de villes */}
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {dept.villes.map((villeSlug) => {
                      const ville = villesData[villeSlug];
                      if (!ville) return null;
                      const risque = getRisqueBadge(ville.risqueRGA);
                      return (
                        <Link
                          key={villeSlug}
                          href={`/expert-fissures/${villeSlug}`}
                          className="group flex items-center justify-between gap-3 p-4 bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 rounded-xl transition-all"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-slate-900 group-hover:text-orange-600 transition truncate">
                              {ville.nom}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              {ville.codePostal} · {ville.distance}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${risque.color}`}>
                              {risque.label}
                            </span>
                            <ArrowRight size={14} className="text-slate-400 group-hover:text-orange-600 transition" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Liens services par département */}
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/departements/${dept.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-orange-600 bg-slate-100 hover:bg-orange-50 px-4 py-2 rounded-lg transition"
                      >
                        <MapPin size={14} /> Expert fissures {dept.nom}
                      </Link>
                      <Link
                        href="/expertise/fissures"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-orange-600 bg-slate-100 hover:bg-orange-50 px-4 py-2 rounded-lg transition"
                      >
                        <Shield size={14} /> Nos solutions agrafage
                      </Link>
                      <Link
                        href="/expertise/humidite"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-orange-600 bg-slate-100 hover:bg-orange-50 px-4 py-2 rounded-lg transition"
                      >
                        <AlertTriangle size={14} /> Traitement humidité
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Légende risque RGA */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6 text-center">
            Comprendre le niveau de risque RGA
          </h2>
          <p className="text-slate-600 text-center mb-8">
            Le RGA (Retrait-Gonflement des Argiles) mesure la sensibilité du sol aux variations d&apos;humidité. Plus le risque est élevé, plus les fondations de votre maison sont exposées aux mouvements de terrain.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <div className="font-extrabold text-red-700 text-lg mb-1">Très Fort</div>
              <p className="text-sm text-red-600">Sol très réactif. Diagnostic urgent recommandé.</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
              <div className="font-extrabold text-orange-700 text-lg mb-1">Fort</div>
              <p className="text-sm text-orange-600">Risque avéré. Surveillance et diagnostic conseillés.</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
              <div className="font-extrabold text-yellow-700 text-lg mb-1">Moyen</div>
              <p className="text-sm text-yellow-600">Risque modéré. Vigilance en période sèche.</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <div className="font-extrabold text-green-700 text-lg mb-1">Faible</div>
              <p className="text-sm text-green-600">Sol peu sensible. Risque limité.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO content + maillage interne */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
            Expert fissures et humidité en Occitanie : notre couverture géographique
          </h2>
          <div className="prose prose-slate prose-lg max-w-none">
            <p>
              IPB est le spécialiste du <Link href="/expertise/fissures" className="text-orange-600 hover:text-orange-700 font-medium">diagnostic et traitement des fissures</Link> en Occitanie. Nous couvrons l&apos;intégralité de la <Link href="/departements/haute-garonne" className="text-orange-600 hover:text-orange-700 font-medium">Haute-Garonne (31)</Link>, du <Link href="/departements/tarn-et-garonne" className="text-orange-600 hover:text-orange-700 font-medium">Tarn-et-Garonne (82)</Link>, du <Link href="/departements/gers" className="text-orange-600 hover:text-orange-700 font-medium">Gers (32)</Link> et du <Link href="/departements/tarn" className="text-orange-600 hover:text-orange-700 font-medium">Tarn (81)</Link>.
            </p>
            <p>
              Notre technique d&apos;<Link href="/blog/agrafage-vs-micropieux-choix" className="text-orange-600 hover:text-orange-700 font-medium">agrafage structurel</Link> permet de stabiliser les fissures causées par le <Link href="/blog/secheresse-argile-haute-garonne" className="text-orange-600 hover:text-orange-700 font-medium">retrait-gonflement des argiles</Link>, un phénomène qui touche particulièrement notre région. Pour les cas les plus graves, nous intervenons avec des <Link href="/blog/fondations-maison-ancienne-renforcement" className="text-orange-600 hover:text-orange-700 font-medium">solutions de renforcement de fondations</Link> adaptées.
            </p>
            <p>
              Chaque intervention commence par un <Link href="/diagnostic" className="text-orange-600 hover:text-orange-700 font-medium">diagnostic expert à 249€ TTC</Link>, déductible des travaux. Nous nous déplaçons gratuitement dans toutes les villes listées ci-dessus, avec un délai d&apos;intervention de 48h maximum.
            </p>
            <p>
              Besoin d&apos;aide pour vos démarches d&apos;assurance ? Consultez notre guide sur l&apos;<Link href="/blog/assurance-fissures-maison-indemnisation" className="text-orange-600 hover:text-orange-700 font-medium">indemnisation assurance fissures</Link> et la différence entre <Link href="/blog/expert-batiment-independant-vs-expert-assurance" className="text-orange-600 hover:text-orange-700 font-medium">expert indépendant et expert assurance</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Votre ville est dans la liste ?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Diagnostic gratuit en ligne en 3 minutes. Intervention sous 48h, déplacement inclus.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-white text-orange-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-orange-50 flex items-center justify-center gap-2 shadow-2xl transition">
              Lancer mon diagnostic gratuit <ArrowRight size={20} />
            </Link>
            <a href="tel:0582953375" className="bg-orange-700 hover:bg-orange-800 px-8 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition">
              <Phone size={20} /> 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
