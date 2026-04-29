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
  title: 'Condensation ou infiltration ? · Guide diagnostic humidité · Institut IPB',
  description: "Murs humides : condensation ou infiltration ? Comment différencier, identifier la cause exacte et choisir le bon traitement. Diagnostic instrumenté Institut IPB Toulouse, Montauban, Auch.",
  keywords: ['condensation mur', 'infiltration eau', 'diagnostic humidité', 'différence condensation infiltration'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/condensation-ou-infiltration' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const comparatif = [
  { critere: 'Localisation', condensation: 'Fenêtres, angles, murs froids (nord)', infiltration: 'Partout, souvent en bas de mur ou plafond' },
  { critere: 'Moment', condensation: "Hiver surtout, quand il fait froid dehors", infiltration: 'Après la pluie ou en permanence' },
  { critere: 'Aspect', condensation: 'Buée, gouttelettes, moisissures noires', infiltration: 'Taches humides, auréoles, coulures' },
  { critere: 'Toucher', condensation: 'Surface mouillée mais mur sec en profondeur', infiltration: 'Mur humide en profondeur' },
  { critere: 'Odeur', condensation: 'Moisi localisé', infiltration: 'Humidité généralisée, odeur de cave' },
];

const tests = [
  { nom: 'Test de la feuille alu', methode: "Collez une feuille d'alu sur le mur humide pendant 48 h", resultat: "Si humidité côté mur = infiltration. Si côté pièce = condensation." },
  { nom: 'Test météo', methode: "Observez si l'humidité augmente après la pluie", resultat: "Oui = infiltration. Non (augmente quand il fait froid) = condensation." },
  { nom: 'Test saison', methode: 'Le problème est-il pire en hiver ?', resultat: "Oui = probablement condensation. Toute l'année = infiltration." },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Comment savoir si c'est de la condensation ou une infiltration d'eau ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La condensation se manifeste par de la buée et des gouttelettes sur les fenêtres et murs froids (surtout en hiver, côté nord), avec des moisissures noires localisées. L'infiltration produit des taches humides, auréoles et coulures, souvent après la pluie ou en permanence, avec un mur humide en profondeur. Le test de la feuille d'aluminium (collée 48 h sur le mur) permet de trancher.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le meilleur traitement contre la condensation dans une maison ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La solution la plus efficace est l'installation d'une VMI (ventilation mécanique par insufflation) qui renouvelle l'air et évacue l'humidité (2 500 à 4 500 €). L'isolation des ponts thermiques supprime les zones froides où se forme la condensation. En complément, une aération quotidienne de 10 minutes minimum est recommandée.",
      },
    },
    {
      '@type': 'Question',
      name: "Quels sont les signes d'une infiltration d'eau dans un mur ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Taches humides persistantes, auréoles ou coulures, mur humide en profondeur (pas seulement en surface), odeur d'humidité généralisée, aggravation après les épisodes de pluie. Contrairement à la condensation, l'infiltration peut se manifester toute l'année.",
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte un diagnostic humidité pour identifier la cause ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Le diagnostic humidité est une prestation d'expertise réalisée sur site par l'institut, déductible à 100 % si vous nous confiez les travaux. L'expert identifie la cause exacte (condensation, infiltration, remontées capillaires) en 1 h 30 grâce à des mesures instrumentées (humidimètre, caméra thermique).",
      },
    },
  ],
};

const faqItems = faqSchema.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }));

export default function CondensationInfiltrationPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="faq-schema-condensation" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <div className="bg-ipb-cream border-b border-ipb-rule py-3">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 text-sm text-ipb-muted">
          <Link href="/" className="hover:text-ipb-orange transition-colors">Accueil</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <Link href="/expert-humidite-toulouse-31" className="hover:text-ipb-orange transition-colors">Expert humidité</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <span className="text-ipb-text">Condensation ou infiltration</span>
        </div>
      </div>

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Guide de diagnostic</Eyebrow>
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
                  Condensation ou infiltration&nbsp;?<br />
                  <em>Le traitement n'est pas le même.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  La question est cruciale : se tromper de diagnostic, c'est perdre du temps et de l'argent. Ce guide vous aide à identifier la cause à partir de critères visuels, de tests simples et — si le doute persiste — d'un diagnostic instrumenté sur site.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic expert
                  </MagneticButton>
                  <MagneticButton href="/expert-humidite-toulouse-31" variant="ghost">
                    Voir notre méthode
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.24}>
              <div className="mt-16 grid md:grid-cols-2 gap-px bg-ipb-rule border border-ipb-rule">
                <div className="bg-ipb-white p-8">
                  <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-3">CONDENSATION</p>
                  <h3 className="font-serif text-ipb-text font-bold text-[19px] leading-tight mb-3">
                    Air chaud + surface froide = gouttelettes
                  </h3>
                  <p className="text-[13px] leading-[1.75] font-light text-ipb-muted">
                    Solution : VMI, isolation des ponts thermiques, aération.
                  </p>
                </div>
                <div className="bg-ipb-white p-8">
                  <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-3">INFILTRATION</p>
                  <h3 className="font-serif text-ipb-text font-bold text-[19px] leading-tight mb-3">
                    Eau qui entre par fissure, joint ou défaut d'étanchéité
                  </h3>
                  <p className="text-[13px] leading-[1.75] font-light text-ipb-muted">
                    Solution : injection résine, cuvelage, réparation du clos-couvert.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* COMPARATIF */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Comparatif détaillé</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Cinq critères<br /><em>pour différencier.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.06}>
              <div className="border border-ipb-rule rounded-[6px] overflow-hidden">
                <div className="grid grid-cols-3 bg-ipb-navy text-white">
                  <div className="p-5 font-serif font-bold text-[14px]">Critère</div>
                  <div className="p-5 font-serif font-bold text-[14px] text-center border-l border-white/10">Condensation</div>
                  <div className="p-5 font-serif font-bold text-[14px] text-center border-l border-white/10">Infiltration</div>
                </div>
                {comparatif.map((row, i) => (
                  <div key={row.critere} className={`grid grid-cols-3 ${i < comparatif.length - 1 ? 'border-b border-ipb-rule' : ''}`}>
                    <div className="p-5 bg-ipb-cream font-serif font-bold text-[14px] text-ipb-text">{row.critere}</div>
                    <div className="p-5 bg-ipb-white text-[13px] leading-[1.7] font-light text-ipb-muted border-l border-ipb-rule">{row.condensation}</div>
                    <div className="p-5 bg-ipb-white text-[13px] leading-[1.7] font-light text-ipb-muted border-l border-ipb-rule">{row.infiltration}</div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* TESTS DIY */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>À faire vous-même</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Trois tests simples<br /><em>avant l'expertise.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-px bg-ipb-rule border border-ipb-rule">
              {tests.map((test, i) => (
                <RevealOnScroll key={test.nom} delay={i * 0.06}>
                  <article className="bg-ipb-white p-7 lg:p-8 h-full flex flex-col">
                    <span className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-4">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-ipb-text font-bold text-[18px] leading-tight mb-4">
                      {test.nom}
                    </h3>
                    <div className="mb-4">
                      <p className="text-[11px] uppercase tracking-[0.14em] text-ipb-muted font-bold mb-1">Méthode</p>
                      <p className="text-[13px] leading-[1.75] font-light text-ipb-muted">{test.methode}</p>
                    </div>
                    <div className="pt-4 border-t border-ipb-rule">
                      <p className="text-[11px] uppercase tracking-[0.14em] text-ipb-orange font-bold mb-1">Interprétation</p>
                      <p className="text-[13px] leading-[1.75] text-ipb-text">{test.resultat}</p>
                    </div>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTIONS */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow variant="dark">La solution selon la cause</Eyebrow>
                <h2 className="font-serif text-white" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Deux pathologies,<br /><em>deux familles de traitements.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <RevealOnScroll delay={0.08}>
                <div>
                  <p className="font-serif text-ipb-orange-l text-[12px] font-bold tracking-[0.18em] mb-4">SI C'EST DE LA CONDENSATION</p>
                  <ul className="space-y-5">
                    <li>
                      <h3 className="font-serif text-white text-[18px] font-bold mb-1">VMI (ventilation par insufflation)</h3>
                      <p className="text-[13px] leading-[1.75] font-light text-white/65">Renouvelle l'air et évacue l'humidité. 2 500 à 4 500 €.</p>
                    </li>
                    <li>
                      <h3 className="font-serif text-white text-[18px] font-bold mb-1">Isolation des ponts thermiques</h3>
                      <p className="text-[13px] leading-[1.75] font-light text-white/65">Supprime les zones froides où se forme la condensation.</p>
                    </li>
                    <li>
                      <h3 className="font-serif text-white text-[18px] font-bold mb-1">Aération quotidienne</h3>
                      <p className="text-[13px] leading-[1.75] font-light text-white/65">10 min par jour minimum, même en hiver.</p>
                    </li>
                  </ul>
                  <Link href="/vmi-ventilation-insufflation" className="mt-8 inline-block text-[13px] text-ipb-orange-l font-medium hover:underline">
                    En savoir plus sur la VMI →
                  </Link>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.14}>
                <div>
                  <p className="font-serif text-ipb-orange-l text-[12px] font-bold tracking-[0.18em] mb-4">SI C'EST UNE INFILTRATION</p>
                  <ul className="space-y-5">
                    <li>
                      <h3 className="font-serif text-white text-[18px] font-bold mb-1">Injection résine (remontées capillaires)</h3>
                      <p className="text-[13px] leading-[1.75] font-light text-white/65">Barrière étanche à la base des murs. 80 à 120 € par mètre linéaire.</p>
                    </li>
                    <li>
                      <h3 className="font-serif text-white text-[18px] font-bold mb-1">Cuvelage (caves et sous-sols)</h3>
                      <p className="text-[13px] leading-[1.75] font-light text-white/65">Étanchéité des parois enterrées. 150 à 250 €/m².</p>
                    </li>
                    <li>
                      <h3 className="font-serif text-white text-[18px] font-bold mb-1">Réparation du clos-couvert</h3>
                      <p className="text-[13px] leading-[1.75] font-light text-white/65">Si l'eau vient de l'extérieur (toiture, joints, façade).</p>
                    </li>
                  </ul>
                  <Link href="/remontees-capillaires-traitement" className="mt-8 inline-block text-[13px] text-ipb-orange-l font-medium hover:underline">
                    En savoir plus sur l'injection résine →
                  </Link>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center mb-16">
                <Eyebrow className="justify-center">Questions fréquentes</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Distinguer<br /><em>les deux pathologies.</em>
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

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
