import { Metadata } from 'next';
import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Cave humide · Cuvelage, drainage et solutions · Institut IPB Toulouse',
  description: "Cave humide ou sous-sol inondé ? Causes (infiltrations, nappe, condensation), solutions techniques (cuvelage, drainage, VMI) et tarifs. Institut IPB Toulouse, Montauban, Auch.",
  keywords: ['cave humide', 'cuvelage cave', 'drainage sous-sol', 'infiltration cave', 'étanchéité sous-sol'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/cave-humide-solutions' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const solutions = [
  {
    titre: 'Cuvelage',
    description: "Revêtement étanche appliqué sur les parois. Résiste à la pression de l'eau.",
    prix: '150–250 €/m²',
    adapte: 'Infiltrations latérales',
    garantie: '10 ans',
  },
  {
    titre: 'Drainage périphérique',
    description: "Tranchée drainante autour des fondations, qui évacue l'eau avant qu'elle n'entre.",
    prix: '150–300 €/ml',
    adapte: 'Nappe phréatique haute',
    garantie: '20 ans',
  },
  {
    titre: 'Pompe de relevage',
    description: "Évacue l'eau qui s'accumule dans un puisard. Solution complémentaire au drainage.",
    prix: '800–2 000 €',
    adapte: 'Inondations récurrentes',
    garantie: '5 ans',
  },
  {
    titre: 'VMI — ventilation par insufflation',
    description: "Élimine la condensation et l'humidité ambiante par insufflation d'air sain.",
    prix: '2 500–4 500 €',
    adapte: 'Condensation',
    garantie: '10 ans',
  },
];

const causesCave = [
  { cause: 'Infiltrations latérales', frequence: '45 %', signe: "Eau qui suinte des murs" },
  { cause: 'Remontées par le sol', frequence: '25 %', signe: 'Sol toujours humide' },
  { cause: 'Condensation', frequence: '20 %', signe: 'Buée, moisissures' },
  { cause: 'Nappe phréatique', frequence: '10 %', signe: 'Inondation saisonnière' },
];

const cuvelageEtapes = [
  { titre: 'Préparation du support', desc: "Nettoyage, traitement des fissures, application d'un primaire d'accrochage." },
  { titre: 'Application multicouche', desc: 'Deux à trois couches de mortier hydrofuge ou résine époxy selon le support.' },
  { titre: "Résistance à la pression", desc: "Jusqu'à 7 bars de pression d'eau (équivalent 70 m de profondeur)." },
];

const cuvelageQuand = [
  "Infiltrations d'eau à travers les murs",
  'Cave régulièrement inondée',
  "Pression d'eau latérale (nappe)",
  "Projet d'aménagement du sous-sol",
  'Cave avec salpêtre persistant',
];

export default function CaveHumidePage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <TopBar />
      <Navbar />
      <SmartBackBar />

      {/* Breadcrumb */}
      <div className="bg-ipb-cream border-b border-ipb-rule py-3">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 text-sm text-ipb-muted">
          <Link href="/" className="hover:text-ipb-orange transition-colors">Accueil</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <Link href="/expert-humidite-toulouse-31" className="hover:text-ipb-orange transition-colors">Expert humidité</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <span className="text-ipb-text">Cave humide</span>
        </div>
      </div>

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto grid lg:grid-cols-[58fr_42fr] gap-12 lg:gap-16 px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28 items-center">
            <div>
              <RevealOnScroll>
                <Eyebrow>Sous-sols et caves enterrées</Eyebrow>
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
                  Cave humide.<br />
                  <em>Cuvelage, drainage, VMI.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[560px]">
                  En Occitanie, une grande partie des caves présente un défaut d'étanchéité — infiltrations latérales, remontées par le sol ou condensation. Chaque cause a sa solution. Le cuvelage reste la plus durable pour les espaces enterrés soumis à la pression de l'eau.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic cave gratuit
                  </MagneticButton>
                  <MagneticButton href="/expert-humidite-toulouse-31" variant="ghost">
                    Voir notre méthode
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll direction="right" delay={0.1} className="hidden lg:block">
              <div className="bg-ipb-white border border-ipb-rule rounded-[6px] p-8">
                <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-6">
                  QUELLE EST LA CAUSE ?
                </p>
                <ul className="space-y-5">
                  {causesCave.map((item) => (
                    <li key={item.cause} className="flex items-start justify-between gap-4 pb-4 border-b border-ipb-rule last:border-b-0 last:pb-0">
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-ipb-text font-bold text-[15px] leading-tight mb-1">{item.cause}</p>
                        <p className="text-[12px] text-ipb-muted leading-relaxed">{item.signe}</p>
                      </div>
                      <span className="font-serif text-ipb-orange font-bold text-[20px] leading-none flex-shrink-0">{item.frequence}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* SOLUTIONS */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Quatre solutions techniques</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Selon votre cause,<br /><em>la bonne technique.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ipb-rule border border-ipb-rule">
              {solutions.map((s, i) => (
                <RevealOnScroll key={s.titre} delay={i * 0.04}>
                  <article className="bg-ipb-white p-7 lg:p-8 h-full flex flex-col">
                    <span className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-4">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-ipb-text font-bold text-[19px] leading-tight mb-3">
                      {s.titre}
                    </h3>
                    <p className="text-[13px] leading-[1.8] font-light text-ipb-muted mb-6 flex-grow">
                      {s.description}
                    </p>
                    <dl className="text-[12px] space-y-1.5 pt-4 border-t border-ipb-rule">
                      <div className="flex justify-between">
                        <dt className="text-ipb-muted">Prix</dt>
                        <dd className="font-medium text-ipb-text">{s.prix}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-ipb-muted">Adapté</dt>
                        <dd className="font-medium text-ipb-text">{s.adapte}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-ipb-muted">Garantie</dt>
                        <dd className="font-medium text-ipb-orange">{s.garantie}</dd>
                      </div>
                    </dl>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* FOCUS CUVELAGE */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <RevealOnScroll className="lg:col-span-6">
                <Eyebrow variant="dark">Solution principale</Eyebrow>
                <h2 className="font-serif text-white mb-8" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Le cuvelage,<br /><em>l'étanchéité totale.</em>
                </h2>
                <p className="text-[15px] leading-[1.9] font-light text-white/65 mb-10">
                  Le cuvelage consiste à appliquer un revêtement étanche (mortier hydrofuge ou résine époxy) sur toutes les parois de la cave. Il résiste à la pression de l'eau et transforme votre cave humide en espace sain et utilisable.
                </p>

                <ul className="space-y-6">
                  {cuvelageEtapes.map((etape, i) => (
                    <RevealOnScroll key={etape.titre} delay={0.08 + i * 0.06}>
                      <li className="grid grid-cols-[40px_1fr] gap-5 items-start pb-6 border-b border-white/10">
                        <span className="font-serif text-ipb-orange-l text-[14px] font-bold tracking-wider pt-1">
                          0{i + 1}
                        </span>
                        <div>
                          <h3 className="font-serif text-white text-[18px] font-bold leading-tight mb-2">{etape.titre}</h3>
                          <p className="text-[13px] leading-[1.75] font-light text-white/65">{etape.desc}</p>
                        </div>
                      </li>
                    </RevealOnScroll>
                  ))}
                </ul>

                <RevealOnScroll delay={0.3}>
                  <div className="mt-10 grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                    <div>
                      <p className="text-[10px] text-ipb-orange-l uppercase tracking-[0.18em] font-bold mb-2">Prix cuvelage</p>
                      <p className="font-serif text-white font-bold leading-none" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>
                        150–250<span className="text-ipb-orange-l text-[18px]"> €/m²</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-ipb-orange-l uppercase tracking-[0.18em] font-bold mb-2">Garantie</p>
                      <p className="font-serif text-white font-bold leading-none" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>
                        10<span className="text-ipb-orange-l text-[18px]"> ans</span>
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              </RevealOnScroll>

              <RevealOnScroll className="lg:col-span-6" delay={0.1}>
                <div className="bg-white/5 border border-white/10 rounded-[6px] p-8 lg:p-10">
                  <p className="font-serif text-ipb-orange-l text-[12px] font-bold tracking-[0.18em] mb-5">
                    QUAND CHOISIR LE CUVELAGE ?
                  </p>
                  <ul className="space-y-4">
                    {cuvelageQuand.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[14px] leading-[1.7] text-white/85">
                        <span className="text-ipb-orange-l mt-1.5" aria-hidden="true">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 p-5 bg-ipb-orange/10 border-l-4 border-ipb-orange-l rounded-r-[3px]">
                    <p className="text-[13px] leading-[1.75] text-white/85">
                      <strong className="text-white font-medium">À noter :</strong> le cuvelage ne convient pas si le problème vient uniquement de la condensation. Dans ce cas, la VMI est plus adaptée.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Articles connexes */}
        <nav aria-label="Articles connexes" className="bg-ipb-cream py-20 lg:py-24">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <p className="text-2xl font-serif font-bold text-ipb-text mb-8 text-center">
              Articles connexes
            </p>
            <div className="grid md:grid-cols-4 gap-px bg-ipb-rule border border-ipb-rule">
              {[
                { href: '/remontees-capillaires-traitement', title: 'Remontées capillaires', desc: 'Injection résine' },
                { href: '/moisissures-maison-sante', title: 'Moisissures', desc: 'Risques santé' },
                { href: '/vmi-ventilation-insufflation', title: 'VMI', desc: 'Ventilation par insufflation' },
                { href: '/condensation-ou-infiltration', title: 'Condensation ou infiltration ?', desc: 'Comment distinguer' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group block bg-ipb-white p-6 lg:p-7 hover:bg-ipb-stone transition-colors duration-300"
                >
                  <h3 className="font-serif text-ipb-text font-bold text-[15px] leading-tight mb-2 group-hover:text-ipb-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-[1.7] font-light text-ipb-muted">
                    {item.desc}
                  </p>
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
