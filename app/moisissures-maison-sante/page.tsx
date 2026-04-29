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

export const metadata: Metadata = {
  title: 'Moisissures et santé · Risques et traitement définitif · Institut IPB',
  description: "Moisissures dans votre maison ? Risques santé (allergies, asthme, infections respiratoires), causes (humidité, ventilation) et traitement durable. Institut IPB Toulouse, Montauban, Auch.",
  keywords: ['moisissures maison', 'risques santé moisissures', 'traitement moisissures', 'allergies moisissures', 'ventilation maison'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/moisissures-maison-sante' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const risquesSante = [
  {
    titre: 'Problèmes respiratoires',
    desc: "Toux chronique, essoufflement, crises d'asthme aggravées. Les spores irritent les voies respiratoires.",
    cible: 'Tout le monde',
  },
  {
    titre: 'Allergies',
    desc: "Rhinite, yeux qui piquent, éternuements fréquents. Une part importante des allergies respiratoires est liée aux moisissures.",
    cible: 'Personnes allergiques',
  },
  {
    titre: "Risque accru chez l'enfant",
    desc: "Système immunitaire en développement = plus vulnérable. L'INSERM observe un risque accru d'asthme chez les enfants exposés.",
    cible: 'Enfants < 6 ans',
  },
];

const typesMoisissures = [
  { nom: 'Aspergillus', couleur: 'Noir/vert', danger: 'Élevé', lieu: 'Salles d\'eau, cuisines' },
  { nom: 'Cladosporium', couleur: 'Vert olive', danger: 'Modéré', lieu: 'Fenêtres, tissus' },
  { nom: 'Penicillium', couleur: 'Bleu/vert', danger: 'Modéré', lieu: 'Papiers peints, tapis' },
  { nom: 'Stachybotrys', couleur: 'Noir profond', danger: 'Très élevé', lieu: 'Murs humides — cas grave' },
];

const etapes = [
  { titre: 'Identifier la source', desc: "Remontées capillaires ? Condensation ? Infiltration ? Le diagnostic instrumenté détermine la cause exacte de l'humidité." },
  { titre: "Traiter l'humidité", desc: "Selon le diagnostic : injection résine (remontées capillaires), VMI (condensation), cuvelage (infiltrations). Garanties de 10 à 30 ans." },
  { titre: "Assainir l'air", desc: "Installation d'une VMI si nécessaire pour renouveler l'air et éviter toute récidive — air filtré, hygrométrie contrôlée." },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Les moisissures dans la maison sont-elles dangereuses pour la santé ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. Les moisissures libèrent des spores dans l'air qui causent des problèmes respiratoires (toux chronique, asthme), des allergies (rhinite, yeux irrités) et représentent un risque accru pour les enfants. Selon l'INSERM, les enfants vivant dans un logement avec moisissures ont un risque accru de développer de l'asthme. Une part importante des allergies respiratoires est liée aux moisissures.",
      },
    },
    {
      '@type': 'Question',
      name: "Comment éliminer définitivement les moisissures d'une maison ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Il faut traiter la cause de l'humidité, pas seulement nettoyer. Selon l'origine : injection de résine hydrophobe pour les remontées capillaires, installation d'une VMI (ventilation par insufflation) pour la condensation, cuvelage ou réparation pour les infiltrations. Le traitement de l'humidité est garanti de 10 à 30 ans selon la solution.",
      },
    },
    {
      '@type': 'Question',
      name: "Quels sont les symptômes d'une exposition aux moisissures ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Toux chronique, essoufflement, crises d'asthme aggravées, rhinite, yeux qui piquent, éternuements fréquents, irritations cutanées. Les personnes les plus vulnérables sont les enfants, les personnes allergiques, les asthmatiques et les personnes immunodéprimées. La moisissure noire Stachybotrys est particulièrement à surveiller — elle libère des mycotoxines.",
      },
    },
    {
      '@type': 'Question',
      name: 'Comment éviter le retour des moisissures après nettoyage ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Les moisissures reviennent systématiquement si la source d'humidité n'est pas traitée. Solutions durables : diagnostic professionnel pour identifier la cause exacte, traitement à la source (injection, VMI, cuvelage), ventilation suffisante (10 minutes d'aération par jour minimum), contrôle du taux d'humidité intérieur (idéalement 40 à 60 %).",
      },
    },
  ],
};

const faqItems = faqSchema.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }));

export default function MoisissuresSantePage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="faq-schema-moisissures" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <div className="bg-ipb-cream border-b border-ipb-rule py-3">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 text-sm text-ipb-muted">
          <Link href="/" className="hover:text-ipb-orange transition-colors">Accueil</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <Link href="/expert-humidite-toulouse-31" className="hover:text-ipb-orange transition-colors">Expert humidité</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <span className="text-ipb-text">Moisissures et santé</span>
        </div>
      </div>

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Risque sanitaire avéré</Eyebrow>
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
                  Moisissures et santé.<br />
                  <em>L'humidité a des conséquences invisibles.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  Les moisissures ne sont pas qu'un problème esthétique. Elles libèrent dans l'air des spores que vous respirez chaque jour. Pour s'en débarrasser durablement, il faut traiter la cause — l'humidité — et pas seulement nettoyer la surface.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic sanitaire
                  </MagneticButton>
                  <MagneticButton href="/expert-humidite-toulouse-31" variant="ghost">
                    Voir notre méthode
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.24}>
              <div className="mt-16 bg-ipb-white border-l-4 border-ipb-orange p-6 lg:p-7 max-w-3xl">
                <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-3">SIGNAL INSERM</p>
                <p className="text-[14px] leading-[1.85] text-ipb-text">
                  Selon l'INSERM, les enfants vivant dans un logement présentant des moisissures ont un risque accru de développer de l'asthme dans les premières années de vie. Une part importante des allergies respiratoires est attribuée à l'exposition aux spores fongiques.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* RISQUES SANTÉ */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Comprendre les risques</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Trois familles d'effets<br /><em>sur la santé.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-px bg-ipb-rule border border-ipb-rule">
              {risquesSante.map((r, i) => (
                <RevealOnScroll key={r.titre} delay={i * 0.06}>
                  <article className="bg-ipb-white p-8 lg:p-10 h-full flex flex-col">
                    <span className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-4">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-ipb-text font-bold text-[19px] leading-tight mb-3">
                      {r.titre}
                    </h3>
                    <p className="text-[13px] leading-[1.85] font-light text-ipb-muted mb-6 flex-grow">
                      {r.desc}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-ipb-orange border-t border-ipb-rule pt-4">
                      {r.cible}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* TYPES DE MOISISSURES */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Les principaux types</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Toutes ne sont pas égales<br /><em>face au danger.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.06}>
              <div className="border border-ipb-rule rounded-[6px] overflow-hidden">
                <div className="grid grid-cols-4 bg-ipb-navy text-white">
                  <div className="p-5 font-serif font-bold text-[14px]">Type</div>
                  <div className="p-5 font-serif font-bold text-[14px] border-l border-white/10">Couleur</div>
                  <div className="p-5 font-serif font-bold text-[14px] border-l border-white/10 text-center">Danger</div>
                  <div className="p-5 font-serif font-bold text-[14px] border-l border-white/10">Localisation</div>
                </div>
                {typesMoisissures.map((t, i) => (
                  <div key={t.nom} className={`grid grid-cols-4 ${i < typesMoisissures.length - 1 ? 'border-b border-ipb-rule' : ''} ${t.danger === 'Très élevé' ? 'bg-red-50' : 'bg-ipb-white'}`}>
                    <div className="p-5 font-serif font-bold text-[14px] text-ipb-text">{t.nom}</div>
                    <div className="p-5 text-[13px] font-light text-ipb-muted border-l border-ipb-rule">{t.couleur}</div>
                    <div className="p-5 text-[13px] text-center border-l border-ipb-rule">
                      <span className={`text-[11px] uppercase tracking-[0.14em] font-bold px-2 py-1 rounded-[3px] border ${
                        t.danger === 'Très élevé' ? 'text-red-700 border-red-200 bg-red-50' :
                        t.danger === 'Élevé' ? 'text-ipb-orange border-ipb-orange/30 bg-ipb-orange/5' :
                        'text-amber-700 border-amber-200 bg-amber-50'
                      }`}>{t.danger}</span>
                    </div>
                    <div className="p-5 text-[13px] font-light text-ipb-muted border-l border-ipb-rule">{t.lieu}</div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="mt-12 bg-ipb-white border-l-4 border-red-500 p-6 lg:p-7">
                <p className="font-serif text-red-700 text-[12px] font-bold tracking-[0.18em] mb-3">MOISISSURE NOIRE — STACHYBOTRYS</p>
                <p className="text-[14px] leading-[1.85] text-ipb-text">
                  Si vous observez des taches noires profondes et humides, quittez la pièce et appelez un expert sans délai. Cette moisissure libère des mycotoxines dangereuses pour la santé.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* MÉTHODE EN 3 ÉTAPES */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow variant="dark">Notre approche</Eyebrow>
                <h2 className="font-serif text-white" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Traiter la cause,<br /><em>pas le symptôme.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <ul className="space-y-8">
              {etapes.map((etape, i) => (
                <RevealOnScroll key={etape.titre} delay={0.08 + i * 0.06}>
                  <li className="grid grid-cols-[40px_1fr] gap-5 items-start pb-8 border-b border-white/10">
                    <span className="font-serif text-ipb-orange-l text-[14px] font-bold tracking-wider pt-2">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-white text-[20px] font-bold leading-tight mb-2">{etape.titre}</h3>
                      <p className="text-[14px] leading-[1.75] font-light text-white/65">{etape.desc}</p>
                    </div>
                  </li>
                </RevealOnScroll>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center mb-16">
                <Eyebrow className="justify-center">Questions fréquentes</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Sur les moisissures<br /><em>et la santé.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <RevealOnScroll key={item.question} delay={i * 0.04}>
                  <details className="group bg-ipb-cream border border-ipb-rule rounded-[6px]">
                    <summary className="cursor-pointer list-none flex items-start justify-between gap-6 p-6 lg:p-7">
                      <h3 className="font-serif text-ipb-text font-bold text-[17px] leading-tight pr-2">
                        {item.question}
                      </h3>
                      <span className="text-ipb-orange text-2xl leading-none flex-shrink-0 transition-transform group-open:rotate-45 font-light" aria-hidden="true">+</span>
                    </summary>
                    <div className="px-6 lg:px-7 pb-7 -mt-2 text-[14px] leading-[1.85] font-light text-ipb-muted">
                      {item.answer}
                    </div>
                  </details>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Articles connexes */}
        <nav aria-label="Articles connexes" className="bg-ipb-cream py-20 lg:py-24">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <p className="text-2xl font-serif font-bold text-ipb-text mb-8 text-center">Articles connexes</p>
            <div className="grid md:grid-cols-4 gap-px bg-ipb-rule border border-ipb-rule">
              {[
                { href: '/expertise/humidite', title: 'Guide humidité', desc: 'Toutes nos solutions' },
                { href: '/salpetre-mur-traitement', title: 'Salpêtre', desc: 'Causes et traitement' },
                { href: '/remontee-capillaire-solution', title: 'Remontées capillaires', desc: 'Solutions durables' },
                { href: '/merule-champignon-traitement', title: 'Mérule', desc: "Le champignon lignivore" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="group block bg-ipb-white p-6 hover:bg-ipb-stone transition-colors duration-300">
                  <h3 className="font-serif text-ipb-text font-bold text-[15px] leading-tight mb-2 group-hover:text-ipb-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-[1.7] font-light text-ipb-muted">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
