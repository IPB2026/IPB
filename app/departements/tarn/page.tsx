import { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from '@/components/ui/SmartBackBar';
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const metadata: Metadata = {
  title: "Expert fissures & humidité dans le Tarn (81)",
  description:
    'Expert fissures et humidité Tarn (81) : Albi, Castres, Gaillac. Diagnostic instrumenté, rapport 3-5 jours. ☎ 05 82 95 33 75',
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/departements/tarn',
  },
};

const villesTarn = [
  { nom: 'Albi', slug: 'albi', cp: '81000', population: '50 000', distance: '75 km' },
  { nom: 'Castres', slug: 'castres', cp: '81100', population: '42 000', distance: '80 km' },
  { nom: 'Gaillac', slug: 'gaillac', cp: '81600', population: '16 000', distance: '60 km' },
  { nom: 'Mazamet', slug: 'mazamet', cp: '81200', population: '10 000', distance: '95 km' },
  { nom: 'Graulhet', slug: 'graulhet', cp: '81300', population: '12 000', distance: '65 km' },
  { nom: 'Lavaur', slug: 'lavaur', cp: '81500', population: '11 000', distance: '45 km' },
  { nom: 'Carmaux', slug: 'carmaux', cp: '81400', population: '10 000', distance: '85 km' },
  { nom: 'Saint-Sulpice-la-Pointe', slug: 'saint-sulpice-la-pointe', cp: '81370', population: '9 000', distance: '35 km' },
];

const communesDetail = [
  {
    nom: 'Albi',
    alea: 'fort',
    sol: 'Le sous-sol albigeois est composé de molasses argilo-calcaires oligocènes dans le centre, et d\u2019argiles du Stampien en périphérie',
    desordre: 'À Albi, les fissures sont souvent liées à l\u2019hétérogénéité du terrain : zones de remblais côtoyant des argiles naturelles',
  },
  {
    nom: 'Carmaux',
    alea: 'moyen',
    sol: 'Le sous-sol carmausin est marqué par l\u2019exploitation houillère historique',
    desordre: 'À Carmaux, les fissures peuvent avoir deux origines : le RGA classique ou les mouvements liés aux anciennes galeries minières',
  },
  {
    nom: 'Castres',
    alea: 'moyen',
    sol: 'Castres repose sur des formations variées : alluvions de l\u2019Agout dans la vallée, molasses et argiles sur les coteaux',
    desordre: 'Les fissures à Castres apparaissent souvent aux jonctions entre bâti ancien et extensions récentes, du fait des différences de fondations.',
  },
  {
    nom: 'Gaillac',
    alea: 'fort',
    sol: 'Gaillac présente un sous-sol complexe : terrasses alluviales en fond de vallée, molasses argileuses sur les coteaux viticoles',
    desordre: 'Les fissures sur les coteaux viticoles sont souvent aggravées par les anciennes pratiques culturales (drainage, arrachage de vignes) qui ont modifié le comportement hydrique des sols.',
  },
  {
    nom: 'Graulhet',
    alea: 'fort',
    sol: 'Graulhet repose sur des terrasses du Dadou, composées d\u2019argiles et d\u2019alluvions',
    desordre: 'Les fissures à Graulhet touchent particulièrement les constructions anciennes du centre et les pavillons des années 80.',
  },
  {
    nom: 'Lavaur',
    alea: 'fort',
    sol: 'Lavaur repose sur des terrasses fluviatiles de l\u2019Agout, composées d\u2019argiles, graviers et limons',
    desordre: 'Lavaur est l\u2019une des villes du Tarn les plus touchées par les fissures RGA',
  },
  {
    nom: 'Mazamet',
    alea: 'moyen',
    sol: 'Mazamet est située à la transition entre les schistes de la Montagne Noire et les molasses de la plaine',
    desordre: 'Les fissures à Mazamet sont souvent liées aux pentes et à l\u2019hétérogénéité du sous-sol',
  },
  {
    nom: 'Rabastens',
    alea: 'fort',
    sol: 'Rabastens est construite sur des terrasses du Tarn, avec des argiles gonflantes en surface',
    desordre: 'Les fissures à Rabastens apparaissent souvent sur les maisons de moins de 20 ans, construites sur des argiles mal identifiées.',
  },
  {
    nom: 'Saint-Sulpice-la-Pointe',
    alea: 'très fort',
    sol: 'Saint-Sulpice repose sur des terrasses de l\u2019Agout, avec des argiles gonflantes en surface',
    desordre: 'Saint-Sulpice présente un taux de sinistralité parmi les plus élevés de la région',
  },
];

const problemesRegion = [
  {
    titre: 'Sols argileux du Lauragais',
    description:
      "L'ouest du département, proche de Toulouse, présente des sols argileux très sensibles au retrait-gonflement.",
  },
  {
    titre: 'Maisons en brique foraine',
    description:
      'Le bâti traditionnel en brique foraine est sensible aux mouvements de terrain et aux infiltrations capillaires.',
  },
  {
    titre: 'Climat contrasté',
    description:
      "Entre influences atlantiques et méditerranéennes, le Tarn connaît des alternances de sécheresse et de pluies intenses.",
  },
];

const stats = [
  { valeur: '319', label: 'Communes' },
  { valeur: '390K', label: 'Habitants' },
  { valeur: '120+', label: 'Arrêtés CAT-NAT' },
  { valeur: '48h', label: 'Délai intervention' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'IPB Expertise — Tarn',
  description: 'Expert en diagnostic fissures et humidité dans le Tarn',
  url: 'https://www.ipb-expertise.fr/departements/tarn',
  telephone: '+33582953375',
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Tarn',
  },
};

export default function TarnPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <BreadcrumbJsonLd path="/departements/tarn" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO éditorial */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-12 lg:pt-16 pb-20 lg:pb-24">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Département du Tarn · 81</Eyebrow>
              </RevealOnScroll>
              <RevealOnScroll delay={0.06}>
                <h1
                  className="font-serif text-ipb-text mb-8"
                  style={{
                    fontSize: 'clamp(40px, 4.4vw, 64px)',
                    lineHeight: 1.06,
                    letterSpacing: '-0.025em',
                    fontWeight: 700,
                  }}
                >
                  Expert fissures & humidité<br />
                  <em>dans le Tarn.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted max-w-[580px] mb-10">
                  D'Albi à Castres, en passant par Gaillac et Lavaur, nous intervenons dans tout
                  le département pour diagnostiquer les fissures et identifier l'origine de
                  l'humidité. Rapports d'inspection documentés, remis sous 3 à 5 jours.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic
                  </MagneticButton>
                  <MagneticButton href="/expertise/fissures" variant="ghost">
                    Notre méthode
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-ipb-white py-16 lg:py-20 border-y border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((s, i) => (
                <RevealOnScroll key={s.label} delay={i * 0.05}>
                  <div>
                    <p className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mb-2">{s.label}</p>
                    <p className="font-serif text-ipb-text font-bold text-[40px] leading-none">
                      {s.valeur}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* PROBLÉMATIQUES RÉGIONALES */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <Eyebrow>Spécificités du bâti tarnais</Eyebrow>
              <h2
                className="font-serif text-ipb-text mb-12"
                style={{
                  fontSize: 'clamp(28px, 2.6vw, 42px)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.022em',
                  fontWeight: 700,
                }}
              >
                Trois pathologies dominantes,<br />
                <em>connues de notre institut.</em>
              </h2>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-6">
              {problemesRegion.map((probleme, i) => (
                <RevealOnScroll key={probleme.titre} delay={i * 0.06}>
                  <div className="bg-ipb-white border border-ipb-rule rounded-[6px] p-7 h-full">
                    <p className="text-[10px] text-ipb-orange uppercase tracking-[0.18em] mb-3 font-medium">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="font-serif text-ipb-text font-bold text-[20px] leading-tight mb-4">
                      {probleme.titre}
                    </h3>
                    <p className="text-[13px] leading-[1.8] font-light text-ipb-muted">
                      {probleme.description}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* VILLES D'INTERVENTION */}
        <section className="bg-ipb-white py-24 lg:py-28 border-y border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <Eyebrow>Villes d'intervention</Eyebrow>
              <h2
                className="font-serif text-ipb-text mb-12"
                style={{
                  fontSize: 'clamp(28px, 2.6vw, 42px)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.022em',
                  fontWeight: 700,
                }}
              >
                Huit communes principales,<br />
                <em>tout le département.</em>
              </h2>
            </RevealOnScroll>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {villesTarn.map((ville, i) => (
                <RevealOnScroll key={ville.nom} delay={i * 0.03}>
                  {/* LOT 3bis : ces communes sont couvertes au niveau départemental,
                      elles n'ont plus de page dédiée — pas de lien vers une 301. */}
                  <div className="group block bg-ipb-cream border border-ipb-rule rounded-[6px] p-5 h-full">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-serif font-bold text-[16px] text-ipb-text group-hover:text-ipb-orange transition-colors">
                        {ville.nom}
                      </h3>
                      <span className="text-[10px] text-ipb-light tracking-wider">{ville.cp}</span>
                    </div>
                    <p className="text-[12px] leading-[1.7] font-light text-ipb-muted">
                      {ville.population} hab. · {ville.distance} de Toulouse
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <p className="mt-10 text-center text-[13px] text-ipb-light italic">
              + toutes les communes du Tarn — délai d'intervention équivalent.
            </p>
          </div>
        </section>


      {/* Communes du département — matériau fusionné depuis les pages
          /expert-fissures/{ville} et /expert-humidite/{ville} consolidées en 301
          au LOT 3bis (2026-08). Contenu qualitatif uniquement : les champs
          porteurs de chiffres non sourcés (taux de sinistralité, variations de
          déclarations) ont été écartés, pas reversés. */}
      <section className="bg-ipb-white py-16 lg:py-20 border-y border-ipb-rule">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-4">
            Ce que nous observons, commune par commune
          </h2>
          <p className="text-lg text-ipb-muted mb-10 max-w-3xl">
            Le sol ne se comporte pas de la même façon d&apos;une commune à l&apos;autre. Voici,
            pour les principales, la nature du terrain et le type de désordre qui en découle.
          </p>
          <div className="space-y-8">
            {communesDetail.map((c) => (
              <div key={c.nom} className="border-l-2 border-ipb-orange pl-6">
                <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                  <h3 className="font-serif text-[22px] font-bold text-ipb-text">{c.nom}</h3>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-ipb-muted">
                    aléa retrait-gonflement {c.alea}
                  </span>
                </div>
                <p className="text-[14px] leading-[1.85] font-light text-ipb-muted mb-2">{c.sol}.</p>
                <p className="text-[14px] leading-[1.85] font-light text-ipb-muted">{c.desordre}.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* DÉPARTEMENTS LIMITROPHES */}
        <section className="bg-ipb-cream py-20 lg:py-24">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 text-center">
            <RevealOnScroll>
              <p className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mb-5">
                Départements limitrophes également couverts
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { href: '/departements/haute-garonne', label: 'Haute-Garonne (31)' },
                  { href: '/departements/tarn-et-garonne', label: 'Tarn-et-Garonne (82)' },
                  { href: '/departements/aude', label: 'Aude (11)' },
                ].map((dep) => (
                  <Link
                    key={dep.href}
                    href={dep.href}
                    className="bg-ipb-white border border-ipb-rule rounded-[3px] px-5 py-2.5 text-[13px] font-light text-ipb-text hover:border-ipb-orange hover:text-ipb-orange transition-colors"
                  >
                    {dep.label}
                  </Link>
                ))}
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
