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
  title: 'Fissure horizontale · Danger structurel et solutions · Institut IPB',
  description: "Fissure horizontale sur un mur porteur ? C'est un signal d'alerte prioritaire selon les guides de pathologie du bâtiment (CSTB, AQC, CTMNC). Diagnostic urgent recommandé. Institut IPB Toulouse, Montauban, Auch.",
  keywords: ['fissure horizontale', 'fissure mur porteur', 'tassement structurel', 'agrafage', 'expert fissures'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/fissure-horizontale-danger' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const causes = [
  { titre: 'Poussée des terres', desc: 'Pression latérale exercée par un remblai, un terrain en pente ou une nappe phréatique sur un mur enterré.' },
  { titre: 'Désolidarisation du plancher', desc: "Le plancher a perdu son ancrage dans le mur — chaînage défaillant, déformation excessive du bois ou du béton." },
  { titre: 'Flexion du linteau', desc: "Au-dessus d'une ouverture, le linteau plie sous la charge. Une fissure horizontale peut apparaître juste sous lui." },
  { titre: 'Tassement de la fondation', desc: 'Mouvement du sol sous une partie du bâti qui crée une rotation du mur et une fissure horizontale en bas.' },
];

const comparatifTypes = [
  { type: 'Verticale', danger: 'Faible à modéré', cause: 'Retrait, mouvement léger', niveauColor: 'amber' },
  { type: 'En escalier', danger: 'Modéré à élevé', cause: 'Tassement différentiel', niveauColor: 'orange' },
  { type: 'Horizontale (mur porteur)', danger: 'Élevé — alerte prioritaire', cause: 'Contrainte structurelle majeure', niveauColor: 'red' },
  { type: 'Faïençage', danger: 'Très faible', cause: "Retrait de l'enduit", niveauColor: 'emerald' },
];

const queFaire = [
  { titre: 'À FAIRE', items: [
    'Photographier la fissure avec une règle pour mesurer (date sur la photo)',
    'Poser un témoin daté en travers (ruban adhésif ou plâtre)',
    'Surveiller l\'évolution sur 2 à 4 semaines',
    'Contacter un expert en pathologie du bâtiment sous 24 à 48 h',
  ] },
  { titre: 'À NE PAS FAIRE', items: [
    'Reboucher la fissure sans diagnostic préalable',
    'Repeindre par-dessus en espérant que ça tienne',
    'Ignorer si la fissure traverse de part en part',
    'Procéder à des travaux sans note de calcul d\'ingénieur',
  ] },
];

const faqItems = [
  { question: 'Une fissure horizontale est-elle plus grave qu\'une fissure verticale ?', answer: "Oui. Sur un mur porteur, une fissure horizontale est classée par les guides de pathologie du bâtiment (CSTB, AQC, CTMNC) parmi les signaux d'alerte prioritaires. Une fissure verticale signale plutôt un retrait ou un mouvement léger." },
  { question: "Une fissure horizontale peut-elle apparaître soudainement ?", answer: "Oui, après un événement (séisme léger, fuite d'eau majeure, modification structurelle voisine). Mais le plus souvent, elle se développe progressivement sous l'effet de contraintes répétées." },
  { question: "Quel délai pour intervenir ?", answer: "Un diagnostic instrumenté est recommandé sous 24 à 48 h. La pose de témoins permet de mesurer l'activité du mouvement et de prioriser l'intervention." },
  { question: "Quel traitement appliquer ?", answer: "Selon le diagnostic : agrafage si la cause est latérale (poussée, désolidarisation), reprise du linteau si la cause est en partie haute, micropieux si le mouvement vient des fondations. Une note de calcul d'ingénieur est indispensable avant tout chantier." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer },
  })),
};

export default function FissureHorizontalePage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="faq-jsonld-horizontale" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <div className="bg-ipb-cream border-b border-ipb-rule py-3">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 text-sm text-ipb-muted">
          <Link href="/" className="hover:text-ipb-orange transition-colors">Accueil</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <Link href="/expertise/fissures" className="hover:text-ipb-orange transition-colors">Expert fissures</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <span className="text-ipb-text">Fissure horizontale</span>
        </div>
      </div>

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Signal d'alerte prioritaire — pathologie du bâtiment</Eyebrow>
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
                  Fissure horizontale.<br />
                  <em>Quand le mur porteur souffre.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  Une fissure parfaitement horizontale sur un mur porteur figure parmi les signaux d'alerte prioritaires identifiés par les guides de pathologie du bâtiment (CSTB, AQC, CTMNC). Un diagnostic expert est recommandé sous 24 à 48 h.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic urgence
                  </MagneticButton>
                  <MagneticButton href="/expertise/fissures" variant="ghost">
                    Voir notre méthode
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.24}>
              <div className="mt-16 bg-ipb-white border-l-4 border-red-500 p-6 lg:p-7 max-w-3xl">
                <p className="font-serif text-red-700 text-[12px] font-bold tracking-[0.18em] mb-3">SIGNAL D'ALERTE PRIORITAIRE</p>
                <p className="text-[14px] leading-[1.85] text-ipb-text">
                  Une fissure parfaitement horizontale sur un mur porteur — surtout si elle traverse, si elle s'élargit, ou si elle s'accompagne de portes/fenêtres qui coincent — appelle un diagnostic instrumenté <strong className="text-ipb-text font-medium">sous 24 à 48 h</strong>.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* CAUSES */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Pourquoi cette fissure est dangereuse</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Quatre mécanismes<br /><em>qui mettent le mur sous contrainte.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-px bg-ipb-rule border border-ipb-rule">
              {causes.map((c, i) => (
                <RevealOnScroll key={c.titre} delay={i * 0.04}>
                  <article className="bg-ipb-white p-8 lg:p-10 h-full">
                    <span className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-4 block">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-ipb-text font-bold text-[20px] leading-tight mb-3">
                      {c.titre}
                    </h3>
                    <p className="text-[14px] leading-[1.85] font-light text-ipb-muted">
                      {c.desc}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARATIF DES TYPES */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Comparatif des types de fissures</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Toutes les fissures<br /><em>n'ont pas le même poids.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.06}>
              <div className="border border-ipb-rule rounded-[6px] overflow-hidden">
                <div className="grid grid-cols-3 bg-ipb-navy text-white">
                  <div className="p-5 font-serif font-bold text-[14px]">Type</div>
                  <div className="p-5 font-serif font-bold text-[14px] border-l border-white/10 text-center">Niveau de danger</div>
                  <div className="p-5 font-serif font-bold text-[14px] border-l border-white/10">Cause typique</div>
                </div>
                {comparatifTypes.map((row, i) => (
                  <div key={row.type} className={`grid grid-cols-3 ${i < comparatifTypes.length - 1 ? 'border-b border-ipb-rule' : ''} ${row.niveauColor === 'red' ? 'bg-red-50' : 'bg-ipb-white'}`}>
                    <div className="p-5 font-serif font-bold text-[14px] text-ipb-text">{row.type}</div>
                    <div className="p-5 text-[13px] text-center border-l border-ipb-rule">
                      <span className={`text-[11px] uppercase tracking-[0.14em] font-bold px-2 py-1 rounded-[3px] border ${
                        row.niveauColor === 'red' ? 'text-red-700 border-red-200 bg-red-50' :
                        row.niveauColor === 'orange' ? 'text-ipb-orange border-ipb-orange/30 bg-ipb-orange/5' :
                        row.niveauColor === 'amber' ? 'text-amber-700 border-amber-200 bg-amber-50' :
                        'text-emerald-700 border-emerald-200 bg-emerald-50'
                      }`}>{row.danger}</span>
                    </div>
                    <div className="p-5 text-[13px] font-light text-ipb-muted border-l border-ipb-rule">{row.cause}</div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* QUE FAIRE */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow variant="dark">Que faire immédiatement</Eyebrow>
                <h2 className="font-serif text-white" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Les bons réflexes,<br /><em>les pièges à éviter.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {queFaire.map((bloc, i) => (
                <RevealOnScroll key={bloc.titre} delay={0.06 + i * 0.06}>
                  <div>
                    <p className={`font-serif text-[12px] font-bold tracking-[0.18em] mb-5 ${bloc.titre === 'À FAIRE' ? 'text-emerald-300' : 'text-red-300'}`}>
                      {bloc.titre}
                    </p>
                    <ul className="space-y-3">
                      {bloc.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[14px] leading-[1.7] text-white/85">
                          <span className={`mt-1 ${bloc.titre === 'À FAIRE' ? 'text-emerald-400' : 'text-red-400'}`} aria-hidden="true">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealOnScroll>
              ))}
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
                  Sur les fissures<br /><em>horizontales.</em>
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
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-px bg-ipb-rule border border-ipb-rule">
              {[
                { href: '/fissure-en-escalier-causes', title: 'Fissure en escalier', desc: 'Tassement différentiel' },
                { href: '/microfissure-quand-sinquieter', title: 'Microfissure', desc: "Quand s'inquiéter" },
                { href: '/fissure-fondation-maison', title: 'Fissure de fondation', desc: 'Solutions durables' },
                { href: '/fissure-secheresse-indemnisation', title: 'Sécheresse / CAT-NAT', desc: 'Démarches assurance' },
                { href: '/expertise/fissures', title: 'Guide complet fissures', desc: 'Notre expertise' },
                { href: '/expertise/humidite', title: 'Humidité', desc: 'Diagnostic et solutions' },
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
