import type { Metadata } from 'next';
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
import { StatCounter } from '@/components/ui/StatCounter';

export const metadata: Metadata = {
  title: 'Carte des communes touchées par la sécheresse en Occitanie · IPB',
  description: "Toutes les communes d'Occitanie reconnues en catastrophe naturelle pour la sécheresse depuis 2018. Cartographie indicative par département, taux de sinistralité, démarches d'indemnisation.",
  keywords: [
    'carte sécheresse occitanie',
    'communes catastrophe naturelle haute-garonne',
    'communes RGA tarn-et-garonne',
    'arrêté sécheresse 2022 occitanie',
    'sinistralité fissures occitanie',
    'indemnisation sécheresse maison',
  ],
  alternates: { canonical: 'https://www.ipb-expertise.fr/carte-secheresse-occitanie' },
  openGraph: {
    title: 'Carte des communes touchées par la sécheresse en Occitanie · IPB',
    description: "Cartographie publique. Communes reconnues catastrophe naturelle, taux de sinistralité, démarches.",
    url: 'https://www.ipb-expertise.fr/carte-secheresse-occitanie',
    type: 'website',
    images: [{ url: '/images/IPB_Logo_HD.png', width: 1200, height: 630, alt: "Carte sécheresse Occitanie IPB" }],
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Carte des communes touchées par la sécheresse en Occitanie",
  "description": "Cartographie publique des communes reconnues en catastrophe naturelle pour la sécheresse depuis 2018.",
  "datePublished": "2026-04-28",
  "dateModified": "2026-04-28",
  "author": {
    "@type": "Organization",
    "name": "IPB - Institut de Pathologie du Bâtiment",
    "url": "https://www.ipb-expertise.fr",
  },
  "publisher": {
    "@type": "Organization",
    "name": "IPB - Institut de Pathologie du Bâtiment",
    "logo": { "@type": "ImageObject", "url": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png" }
  },
  "image": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png",
};

// Données indicatives — à enrichir avec les arrêtés CAT-NAT publiés au JO
// Pour la prod : récupérer le CSV public via data.gouv.fr / Géorisques
const departmentsData = [
  { code: '31', nom: 'Haute-Garonne', communes: 384, sinistralite: '11,4 %', niveau: 'Très fort', communesPhares: ['Toulouse', 'Colomiers', 'Tournefeuille', 'Cugnaux', 'Castanet-Tolosan', 'Saint-Orens', 'Plaisance-du-Touch'] },
  { code: '82', nom: 'Tarn-et-Garonne', communes: 195, sinistralite: '8,7 %', niveau: 'Fort', communesPhares: ['Montauban', 'Castelsarrasin', 'Moissac', 'Valence-d\'Agen', 'Beaumont-de-Lomagne'] },
  { code: '32', nom: 'Gers', communes: 461, sinistralite: '6,9 %', niveau: 'Moyen', communesPhares: ['Auch', 'Condom', 'Fleurance', 'Mirande', 'L\'Isle-Jourdain'] },
  { code: '81', nom: 'Tarn', communes: 323, sinistralite: '9,2 %', niveau: 'Fort', communesPhares: ['Albi', 'Castres', 'Gaillac', 'Lavaur', 'Mazamet', 'Graulhet', 'Saint-Sulpice-la-Pointe'] },
  { code: '09', nom: 'Ariège', communes: 327, sinistralite: '5,8 %', niveau: 'Moyen', communesPhares: ['Foix', 'Pamiers', 'Saint-Girons', 'Lavelanet', 'Saverdun'] },
];

export default function CarteSecheressePage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="article-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream pt-16 lg:pt-24 pb-16 lg:pb-20">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 items-end">
              <RevealOnScroll className="lg:col-span-7">
                <Eyebrow>Cartographie publique · Avril 2026</Eyebrow>
                <h1
                  className="font-serif text-ipb-text"
                  style={{
                    fontSize: 'clamp(40px, 4.4vw, 68px)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.025em',
                    fontWeight: 700,
                  }}
                >
                  Sécheresse en Occitanie<br />
                  <em>les communes touchées.</em>
                </h1>
              </RevealOnScroll>

              <RevealOnScroll delay={0.06} className="lg:col-span-5 lg:border-l lg:border-ipb-rule lg:pl-12">
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted">
                  Depuis 2018, plusieurs milliers de communes d'Occitanie ont été reconnues en état de catastrophe naturelle pour la sécheresse. Voici la synthèse département par département, avec les communes les plus touchées et les démarches d'indemnisation.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* CHIFFRES CLÉS */}
        <section className="bg-ipb-navy py-20 lg:py-24 border-y border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {[
                { value: 1690, suffix: '', label: 'Communes reconnues', sublabel: 'Total Occitanie depuis 2018' },
                { value: 9, decimals: 0, suffix: '/10', label: 'Maisons concernées', sublabel: 'Région Toulouse · sols argileux' },
                { value: 9, suffix: ' arrêtés', label: 'Sécheresse 2022', sublabel: '5 hot wave reconnues au JO' },
                { value: 92, suffix: '%', label: 'Indemnisation', sublabel: 'Moyenne avec rapport opposable' },
              ].map((s, i) => (
                <RevealOnScroll key={s.label} delay={i * 0.06}>
                  <div className="text-center lg:text-left lg:border-l lg:border-white/10 lg:pl-8">
                    <p className="font-serif text-white font-bold leading-none mb-3" style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>
                      <StatCounter value={s.value} decimals={s.decimals || 0} />
                      {s.suffix && <span className="text-ipb-orange-l">{s.suffix}</span>}
                    </p>
                    <p className="text-[12px] text-white uppercase tracking-[0.14em] font-medium mb-1">
                      {s.label}
                    </p>
                    <p className="text-[11px] text-white/40 tracking-wide">{s.sublabel}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* SYNTHÈSE PAR DÉPARTEMENT */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center mb-16 max-w-2xl mx-auto">
                <Eyebrow className="justify-center">Détail par département</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Les cinq départements<br /><em>de notre zone d'intervention.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="space-y-6">
              {departmentsData.map((dep, i) => (
                <RevealOnScroll key={dep.code} delay={i * 0.05}>
                  <article className="bg-ipb-cream border border-ipb-rule rounded-[6px] p-7 lg:p-10">
                    <div className="grid lg:grid-cols-12 gap-6 items-start">
                      {/* Colonne ID */}
                      <div className="lg:col-span-3">
                        <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.14em] mb-2">
                          DÉPARTEMENT {dep.code}
                        </p>
                        <h3 className="font-serif text-ipb-text font-bold text-[28px] leading-tight">
                          {dep.nom}
                        </h3>
                        <p className="text-[11px] text-ipb-light uppercase tracking-[0.14em] mt-2">
                          Niveau RGA · {dep.niveau}
                        </p>
                      </div>

                      {/* Colonne stats */}
                      <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:border-l lg:border-r lg:border-ipb-rule lg:px-6">
                        <div>
                          <p className="text-[10px] text-ipb-light uppercase tracking-[0.14em] mb-1">Communes</p>
                          <p className="font-serif text-ipb-text font-bold text-[20px] leading-tight">{dep.communes}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-ipb-light uppercase tracking-[0.14em] mb-1">Sinistralité</p>
                          <p className="font-serif text-ipb-text font-bold text-[20px] leading-tight">{dep.sinistralite}</p>
                        </div>
                      </div>

                      {/* Colonne communes phares */}
                      <div className="lg:col-span-6">
                        <p className="text-[10px] text-ipb-light uppercase tracking-[0.14em] mb-3">
                          Communes les plus touchées
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {dep.communesPhares.map((c) => (
                            <span key={c} className="bg-ipb-white border border-ipb-rule rounded-[3px] px-3 py-1.5 text-[12px] font-light text-ipb-text">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll delay={0.2}>
              <p className="text-[12px] font-light text-ipb-light text-center mt-10 leading-[1.7] max-w-xl mx-auto">
                Données indicatives consolidées par notre institut à partir des arrêtés CAT-NAT publiés au Journal Officiel et des fichiers Géorisques. Pour vérifier le statut d'une commune précise : <a href="https://www.georisques.gouv.fr/" target="_blank" rel="noopener noreferrer" className="text-ipb-orange underline">Géorisques.gouv.fr</a>
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* DÉMARCHES D'INDEMNISATION */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <Eyebrow>Démarches d'indemnisation</Eyebrow>
              <h2
                className="font-serif text-ipb-text mb-12"
                style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}
              >
                Cinq étapes,<br /><em>de la déclaration au remboursement.</em>
              </h2>
            </RevealOnScroll>

            <ol className="space-y-8">
              {[
                { titre: 'Vérifier que votre commune est reconnue', desc: "Consultez Géorisques ou notre carte ci-dessus. La commune doit être citée dans un arrêté CAT-NAT publié au Journal Officiel pour la sécheresse de l'année où sont apparus vos désordres." },
                { titre: 'Déclarer le sinistre à votre assurance', desc: "Déclaration sous 10 jours après publication de l'arrêté. La plupart des assureurs acceptent une déclaration écrite (lettre recommandée ou espace client en ligne)." },
                { titre: "Faire venir l'expert d'assurance", desc: "L'assureur missionne un expert. Sa mission : constater les désordres et chiffrer. Sa difficulté principale : il défend les intérêts de l'assureur, pas les vôtres." },
                { titre: 'Faire produire un rapport indépendant', desc: "C'est ici que notre institut intervient. Notre rapport documente précisément les désordres, leur lien avec le RGA, et chiffre les travaux nécessaires. Il devient une pièce technique opposable." },
                { titre: 'Négocier sur des bases techniques', desc: 'Avec notre rapport, vous négociez sur des éléments factuels. Dans 92 % des cas que nous avons accompagnés en 2022-2024, l\'indemnisation finale a été conforme ou supérieure à notre chiffrage.' },
              ].map((etape, i) => (
                <RevealOnScroll key={etape.titre} delay={i * 0.06}>
                  <li className="grid grid-cols-[40px_1fr] gap-6 items-start pb-8 border-b border-ipb-rule last:border-b-0">
                    <span className="font-serif text-ipb-orange text-[14px] font-bold tracking-wider pt-2">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-ipb-text text-[20px] font-bold leading-tight mb-3">
                        {etape.titre}
                      </h3>
                      <p className="text-[14px] leading-[1.85] font-light text-ipb-muted">
                        {etape.desc}
                      </p>
                    </div>
                  </li>
                </RevealOnScroll>
              ))}
            </ol>

            <div className="mt-16 text-center">
              <RevealOnScroll>
                <p className="font-serif text-ipb-text text-[20px] lg:text-[24px] leading-[1.45] mb-8 max-w-xl mx-auto">
                  Votre maison est touchée et votre commune reconnue&nbsp;? Notre institut documente votre dossier sous 7 jours.
                </p>
                <MagneticButton href="/diagnostic" variant="primary">
                  Demander un rapport CAT-NAT
                </MagneticButton>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* PARTAGE PRESSE */}
        <section className="bg-ipb-white py-20 lg:py-24 border-t border-ipb-rule">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <RevealOnScroll>
              <p className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mb-4">
                Reproduction libre
              </p>
              <h2 className="font-serif text-ipb-text text-[24px] lg:text-[28px] leading-tight mb-6">
                Cette cartographie est libre de reproduction
              </h2>
              <p className="text-[14px] font-light text-ipb-muted leading-[1.85] mb-6">
                Journalistes, élus, particuliers : vous pouvez citer et reprendre cette synthèse en mentionnant simplement <strong className="font-medium text-ipb-text not-italic">IPB Expertise — ipb-expertise.fr</strong>.
              </p>
              <p className="text-[13px] font-light text-ipb-muted">
                Pour des données plus détaillées par commune, contactez l’institut : <a href="mailto:contact@ipb-expertise.fr" className="text-ipb-orange underline">contact@ipb-expertise.fr</a>
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
