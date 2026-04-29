import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { villesData, departementsMapping } from '@/app/data/villes';

export const metadata: Metadata = {
  title: "Zones d'intervention · Institut IPB Occitanie",
  description: "56 villes couvertes en Haute-Garonne, Tarn-et-Garonne, Gers et Tarn. Diagnostic instrumenté de fissures et d'humidité, intervention sous 48 h. Décennale AXA.",
  keywords: [
    'expert fissures Occitanie',
    'expert fissures Haute-Garonne',
    'expert fissures Tarn',
    'agrafage fissures Toulouse',
    'expert humidité 31',
    'expert bâtiment 82',
    'zones intervention IPB',
    'expert fissures 32',
    'diagnostic fissures Tarn',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/zones-intervention',
  },
  openGraph: {
    title: "Zones d'intervention · Institut IPB Occitanie",
    description: "56 villes couvertes en Haute-Garonne, Tarn-et-Garonne, Gers et Tarn. Diagnostic fissures et humidité sous 48 h.",
    url: 'https://www.ipb-expertise.fr/zones-intervention',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

function getRisqueLabel(risque?: string) {
  switch (risque) {
    case 'tres-fort': return { label: 'Très fort', color: 'text-red-700 border-red-200 bg-red-50' };
    case 'fort': return { label: 'Fort', color: 'text-ipb-orange border-ipb-orange/30 bg-ipb-orange/5' };
    case 'moyen': return { label: 'Moyen', color: 'text-amber-700 border-amber-200 bg-amber-50' };
    case 'faible': return { label: 'Faible', color: 'text-emerald-700 border-emerald-200 bg-emerald-50' };
    default: return { label: '—', color: 'text-ipb-muted border-ipb-rule bg-ipb-stone' };
  }
}

export default function ZonesInterventionPage() {
  const totalVilles = Object.keys(villesData).length;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'IPB - Institut de pathologie du bâtiment',
    description: `Institut indépendant intervenant dans ${totalVilles} villes en Occitanie pour le diagnostic et le traitement des fissures et de l'humidité.`,
    url: 'https://www.ipb-expertise.fr/zones-intervention',
    telephone: '+33582953375',
    areaServed: departementsMapping.map((dept) => ({
      '@type': 'AdministrativeArea',
      name: `${dept.nom} (${dept.code})`,
    })),
    priceRange: '€€',
  };

  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="zones-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>{`${totalVilles} villes · ${departementsMapping.length} départements`}</Eyebrow>
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
                  Nos zones d'intervention<br />
                  <em>en Occitanie.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  L'institut IPB intervient dans {departementsMapping.length} départements et {totalVilles} villes pour le diagnostic et le traitement des fissures structurelles et de l'humidité. Déplacement inclus dans la prestation, intervention sous 48 h.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic gratuit
                  </MagneticButton>
                  <MagneticButton href="#departements" variant="ghost">
                    Voir les villes couvertes
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* DÉPARTEMENTS — listing complet */}
        <section id="departements" className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Toutes nos villes par département</Eyebrow>
                <h2 className="font-serif text-ipb-text mb-6" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Cliquez sur une ville<br /><em>pour les données locales.</em>
                </h2>
                <p className="text-[14px] leading-[1.8] font-light text-ipb-muted">
                  Chaque page ville rassemble les données géologiques locales, le risque RGA, les arrêtés catastrophe naturelle et les quartiers les plus exposés.
                </p>
              </div>
            </RevealOnScroll>

            <div className="space-y-16">
              {departementsMapping.map((dept) => (
                <RevealOnScroll key={dept.code}>
                  <article id={`dept-${dept.code}`}>
                    {/* En-tête département */}
                    <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-ipb-rule">
                      <div className="flex items-baseline gap-4">
                        <span className="font-serif text-ipb-orange font-bold text-[40px] leading-none">
                          {dept.code}
                        </span>
                        <div>
                          <h3 className="font-serif text-ipb-text font-bold text-[24px] leading-tight">
                            {dept.nom}
                          </h3>
                          <p className="text-[13px] text-ipb-muted mt-1">
                            {dept.villes.length} villes couvertes
                          </p>
                        </div>
                      </div>
                      <Link
                        href={`/departements/${dept.slug}`}
                        className="text-[13px] text-ipb-orange hover:underline font-medium"
                      >
                        Voir la page département →
                      </Link>
                    </header>

                    {/* Grille de villes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-ipb-rule border border-ipb-rule">
                      {dept.villes.map((villeSlug) => {
                        const ville = villesData[villeSlug];
                        if (!ville) return null;
                        const risque = getRisqueLabel(ville.risqueRGA);
                        return (
                          <Link
                            key={villeSlug}
                            href={`/expert-fissures/${villeSlug}`}
                            className="group flex items-center justify-between gap-4 p-5 bg-ipb-white hover:bg-ipb-stone transition-colors duration-300"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-serif text-ipb-text font-bold text-[15px] leading-tight group-hover:text-ipb-orange transition-colors truncate">
                                {ville.nom}
                              </p>
                              <p className="text-[11px] text-ipb-muted mt-1 tracking-wider">
                                {ville.codePostal} · {ville.distance}
                              </p>
                            </div>
                            <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-[3px] border ${risque.color} flex-shrink-0`}>
                              {risque.label}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* LÉGENDE RGA */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-12 max-w-2xl">
                <Eyebrow>Comprendre le risque RGA</Eyebrow>
                <h2 className="font-serif text-ipb-text mb-6" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Retrait-gonflement<br /><em>des argiles, par niveau.</em>
                </h2>
                <p className="text-[14px] leading-[1.85] font-light text-ipb-muted">
                  Le RGA mesure la sensibilité du sol aux variations d'humidité. Plus le risque est élevé, plus les fondations de votre maison sont exposées aux mouvements de terrain et aux fissures structurelles.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.08}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ipb-rule border border-ipb-rule">
                {[
                  { label: 'Très fort', desc: 'Sol très réactif. Diagnostic urgent recommandé.' },
                  { label: 'Fort', desc: 'Risque avéré. Surveillance et diagnostic conseillés.' },
                  { label: 'Moyen', desc: 'Risque modéré. Vigilance en période sèche.' },
                  { label: 'Faible', desc: 'Sol peu sensible. Risque limité.' },
                ].map((niveau) => (
                  <div key={niveau.label} className="bg-ipb-white p-6 lg:p-7">
                    <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-3">
                      {niveau.label.toUpperCase()}
                    </p>
                    <p className="text-[13px] leading-[1.7] font-light text-ipb-muted">
                      {niveau.desc}
                    </p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* SEO CONTENT — maillage interne */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-12 max-w-2xl">
                <Eyebrow>Notre couverture géographique</Eyebrow>
                <h2 className="font-serif text-ipb-text mb-6" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Expert fissures et humidité<br /><em>en Occitanie.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.06}>
              <div className="space-y-5 text-[15px] leading-[1.9] font-light text-ipb-muted">
                <p>
                  IPB est l'institut spécialisé dans le{' '}
                  <Link href="/expertise/fissures" className="text-ipb-orange hover:underline">diagnostic et traitement des fissures</Link>
                  {' '}en Occitanie. Nous couvrons l'intégralité de la{' '}
                  <Link href="/departements/haute-garonne" className="text-ipb-orange hover:underline">Haute-Garonne (31)</Link>, du{' '}
                  <Link href="/departements/tarn-et-garonne" className="text-ipb-orange hover:underline">Tarn-et-Garonne (82)</Link>, du{' '}
                  <Link href="/departements/gers" className="text-ipb-orange hover:underline">Gers (32)</Link>{' '}et du{' '}
                  <Link href="/departements/tarn" className="text-ipb-orange hover:underline">Tarn (81)</Link>.
                </p>
                <p>
                  Notre technique d'agrafage structurel permet de stabiliser les fissures causées par le retrait-gonflement des argiles, un phénomène qui touche particulièrement notre région. Pour les cas les plus graves, nous intervenons avec des solutions de renforcement de fondations adaptées (micropieux, reprise en sous-œuvre).
                </p>
                <p>
                  Chaque intervention commence par un{' '}
                  <Link href="/diagnostic" className="text-ipb-orange hover:underline">diagnostic instrumenté sur site</Link>
                  {' '}dont le montant est déduit à 100 % si vous nous confiez les travaux. Nous nous déplaçons dans toutes les villes listées ci-dessus, avec un délai d'intervention de 48 h en moyenne.
                </p>
                <p>
                  Pour les démarches d'assurance après reconnaissance de catastrophe naturelle sécheresse, consultez notre{' '}
                  <Link href="/fissure-secheresse-indemnisation" className="text-ipb-orange hover:underline">guide indemnisation CAT-NAT</Link>.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
