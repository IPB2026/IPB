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
  title: 'Mérule · Identification, dangers et traitement urgence · Institut IPB',
  description: "Mérule (champignon lignivore destructeur du bois) ? Comment la reconnaître, ses dangers structurels, le traitement professionnel à mettre en œuvre. Intervention urgence Toulouse, Montauban, Auch.",
  keywords: ['mérule', 'champignon bois', 'traitement mérule', 'mérule pleureuse', 'pourriture bois', 'lignivore'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/merule-champignon-traitement' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const signesReconnaissance = [
  { signe: 'Filaments blancs cotonneux', detail: 'Mycélium visible sur le bois et les murs.', niveau: 'haut' },
  { signe: 'Fructification brune ou orangée', detail: "Corps du champignon, aspect de crêpe.", niveau: 'critique' },
  { signe: 'Odeur forte de champignon', detail: 'Terreuse, persistante, caractéristique.', niveau: 'haut' },
  { signe: "Bois qui s'effrite", detail: 'Le bois se désagrège au toucher, structure fragilisée.', niveau: 'critique' },
  { signe: 'Poudre brune (spores)', detail: 'Dépôt brun-rouille sur les surfaces alentour.', niveau: 'haut' },
  { signe: 'Cordons gris sur les murs', detail: 'Filaments permettant au champignon de se propager.', niveau: 'critique' },
];

const etapesTraitement = [
  { titre: "Diagnostic et identification", desc: "Confirmation visuelle et — si nécessaire — analyse mycologique. Cartographie de la zone infestée." },
  { titre: "Suppression de la source d'humidité", desc: "Sans cela, la mérule revient. On traite l'infiltration, la fuite ou la condensation à l'origine." },
  { titre: 'Retrait des bois infectés', desc: "Avec une marge de sécurité d'au moins un mètre au-delà de la zone visible." },
  { titre: 'Traitement fongicide certifié', desc: "Injection et pulvérisation sur les zones non démontées (poutres, maçonnerie alentour)." },
  { titre: 'Reconstruction', desc: 'Remplacement des éléments structurels retirés, finitions, suivi à 6 et 12 mois.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment reconnaître la mérule dans une maison ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La mérule se reconnaît par plusieurs signes : filaments blancs cotonneux (mycélium) sur le bois et les murs, fructification brune ou orangée en forme de crêpe, odeur forte de champignon terreux, bois qui s'effrite au toucher, poudre brune (spores) sur les surfaces, et cordons gris sur les murs permettant au champignon de se propager.",
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte un traitement contre la mérule ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Le coût varie de 5 000 € pour un cas localisé à plus de 50 000 € si la charpente entière est touchée. Le traitement comprend le diagnostic, le retrait des bois infectés (avec 1 m de marge), le traitement fongicide par injection et pulvérisation, puis la reconstruction. Plus le diagnostic est précoce, plus la facture est réduite.",
      },
    },
    {
      '@type': 'Question',
      name: 'La mérule est-elle dangereuse pour la santé ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La mérule libère des spores qui peuvent provoquer des irritations respiratoires et des réactions allergiques. Mais son principal danger est structurel : elle détruit le bois de la maison (charpente, plancher, poutres) en quelques mois. Elle peut traverser les murs en maçonnerie, se développe sans lumière et croît de plusieurs centimètres par semaine.",
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on traiter la mérule soi-même ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non, il est fortement déconseillé. Gratter ou arracher le champignon libère les spores et propage l'infestation. La javel est inefficace. Seul un traitement professionnel complet (diagnostic, suppression de la source d'humidité, retrait des bois infectés, traitement fongicide certifié) permet d'éradiquer la mérule.",
      },
    },
  ],
};

const faqItems = faqSchema.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }));

export default function MerulePage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="faq-schema-merule" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <div className="bg-ipb-cream border-b border-ipb-rule py-3">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 text-sm text-ipb-muted">
          <Link href="/" className="hover:text-ipb-orange transition-colors">Accueil</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <Link href="/expert-humidite-toulouse-31" className="hover:text-ipb-orange transition-colors">Expert humidité</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <span className="text-ipb-text">Mérule</span>
        </div>
      </div>

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Champignon lignivore — situation d'urgence</Eyebrow>
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
                  Mérule.<br />
                  <em>Le champignon qui dévore le bois.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  La mérule (<em>Serpula lacrymans</em>) est le champignon lignivore le plus destructeur du bâtiment. Elle se développe sans lumière, traverse les maçonneries, et peut détruire une charpente en quelques mois. Plus le diagnostic est précoce, plus la facture est contenue.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic urgence
                  </MagneticButton>
                  <MagneticButton href="/expert-humidite-toulouse-31" variant="ghost">
                    Voir notre méthode
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.24}>
              <div className="mt-16 bg-ipb-white border-l-4 border-red-500 p-6 lg:p-7 max-w-3xl">
                <p className="font-serif text-red-700 text-[12px] font-bold tracking-[0.18em] mb-3">SIGNALEMENT IMPORTANT</p>
                <p className="text-[14px] leading-[1.85] text-ipb-text">
                  Si vous suspectez une mérule, ne grattez pas le champignon et ne tentez pas un traitement maison : vous propageriez les spores. Contactez un expert sous 24 à 48 h pour cartographier la zone infestée et arrêter la progression.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* SIGNES DE RECONNAISSANCE */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Identifier la mérule</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Six signes<br /><em>qui doivent alerter.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ipb-rule border border-ipb-rule">
              {signesReconnaissance.map((s, i) => (
                <RevealOnScroll key={s.signe} delay={i * 0.04}>
                  <article className="bg-ipb-white p-7 lg:p-8 h-full relative">
                    <span className={`absolute top-6 right-6 text-[10px] uppercase tracking-[0.18em] font-bold px-2 py-1 rounded-[3px] border ${s.niveau === 'critique' ? 'text-red-700 border-red-200 bg-red-50' : 'text-ipb-orange border-ipb-orange/30 bg-ipb-orange/5'}`}>
                      {s.niveau === 'critique' ? 'Critique' : 'Alerte'}
                    </span>
                    <span className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-4 block">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-ipb-text font-bold text-[17px] leading-tight mb-3 pr-20">
                      {s.signe}
                    </h3>
                    <p className="text-[13px] leading-[1.8] font-light text-ipb-muted">
                      {s.detail}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ÉTAPES DU TRAITEMENT */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow variant="dark">Notre méthode</Eyebrow>
                <h2 className="font-serif text-white" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Cinq étapes<br /><em>pour éradiquer la mérule.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <ul className="space-y-8">
              {etapesTraitement.map((etape, i) => (
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

            <RevealOnScroll delay={0.4}>
              <div className="mt-12 bg-white/5 border border-white/10 p-6 lg:p-7 rounded-[6px]">
                <p className="font-serif text-ipb-orange-l text-[12px] font-bold tracking-[0.18em] mb-3">FOURCHETTES DE PRIX</p>
                <p className="text-[14px] leading-[1.85] text-white/85">
                  Cas localisé : à partir de <strong className="text-white font-medium">5 000 €</strong>. Charpente entière touchée : jusqu'à <strong className="text-white font-medium">50 000 €</strong>. La précocité du diagnostic peut diviser la facture par dix.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center mb-16">
                <Eyebrow className="justify-center">Questions fréquentes</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Sur la mérule<br /><em>et son traitement.</em>
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
                { href: '/moisissures-maison-sante', title: 'Moisissures', desc: 'Risques santé' },
                { href: '/cave-humide-solutions', title: 'Cave humide', desc: 'Cuvelage et drainage' },
                { href: '/remontee-capillaire-solution', title: 'Remontées capillaires', desc: "Cause d'humidité fréquente" },
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
