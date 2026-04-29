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
  title: "Microfissure : quand s'inquiéter ? · Guide expert · Institut IPB",
  description: "Microfissures sur votre façade ? Toutes ne sont pas dangereuses. Guide pour différencier fissure esthétique et structurelle, critères d'alerte. Institut IPB Toulouse, Montauban, Auch.",
  keywords: ['microfissure', 'fissure façade', 'faïençage', 'fissure superficielle', "quand s'inquiéter fissure"],
  alternates: { canonical: 'https://www.ipb-expertise.fr/microfissure-quand-sinquieter' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const typesClassification = [
  { type: 'Faïençage', ouverture: '< 0,2 mm', aspect: 'Réseau de fines lignes', danger: 'Aucun', action: 'Surveillance simple', niveau: 'faible' },
  { type: 'Microfissure', ouverture: '0,2 – 1 mm', aspect: 'Ligne unique visible', danger: 'Faible', action: 'Surveiller évolution', niveau: 'faible' },
  { type: 'Fissure légère', ouverture: '1 – 2 mm', aspect: 'Visible, peut être suivie', danger: 'Modéré', action: 'Diagnostic recommandé', niveau: 'moyen' },
  { type: 'Fissure structurelle', ouverture: '> 2 mm', aspect: 'Large, parfois traversante', danger: 'Élevé', action: 'Intervention urgente', niveau: 'eleve' },
];

const signesAlerte = [
  { signe: "La fissure s'agrandit au fil des semaines", urgent: true },
  { signe: 'Forme en escalier (suit les joints)', urgent: true },
  { signe: 'Portes ou fenêtres qui coincent', urgent: true },
  { signe: "Fissures visibles à l'intérieur aussi", urgent: true },
  { signe: 'Craquements dans les murs', urgent: true },
  { signe: "Fissure uniquement sur l'enduit extérieur", urgent: false },
  { signe: 'Réseau de petites lignes (faïençage)', urgent: false },
  { signe: 'Fissure stable depuis des années', urgent: false },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Quand faut-il s'inquiéter d'une microfissure sur une façade ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Il faut s'inquiéter si la microfissure s'agrandit, si elle a une forme en escalier (suivant les joints de maçonnerie), si vos portes ou fenêtres coincent, si des fissures apparaissent aussi à l'intérieur, ou si vous entendez des craquements. En revanche, un faïençage (réseau de petites lignes inférieur à 0,2 mm) stable est généralement bénin.",
      },
    },
    {
      '@type': 'Question',
      name: 'Comment savoir si une microfissure est structurelle ou superficielle ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La classification se fait principalement par l'ouverture : moins de 0,2 mm (faïençage, aucun danger), 0,2 à 1 mm (microfissure, surveillance), 1 à 2 mm (fissure légère, diagnostic recommandé), plus de 2 mm (fissure structurelle, intervention urgente). Le test du témoin (ruban adhésif daté collé en travers de la fissure) permet de surveiller l'évolution.",
      },
    },
    {
      '@type': 'Question',
      name: 'Une microfissure peut-elle disparaître toute seule ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non, une fissure ne se referme pas spontanément. Elle peut être stabilisée si la cause (mouvement de terrain, sécheresse, retrait du béton) cesse. Le faïençage peut être masqué par un nouvel enduit. Une microfissure structurelle nécessite un traitement (agrafage, injection résine époxy ou polyuréthane).",
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte un diagnostic de microfissure ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Le diagnostic instrumenté est une prestation d'expertise sur site, déductible à 100 % si vous nous confiez les travaux. L'expert mesure les fissures (fissuromètre), pose des témoins, identifie la cause et rédige un rapport opposable.",
      },
    },
  ],
};

const faqItems = faqSchema.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }));

export default function MicrofissurePage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="faq-schema-microfissure" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <div className="bg-ipb-cream border-b border-ipb-rule py-3">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 text-sm text-ipb-muted">
          <Link href="/" className="hover:text-ipb-orange transition-colors">Accueil</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <Link href="/expertise/fissures" className="hover:text-ipb-orange transition-colors">Expert fissures</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <span className="text-ipb-text">Microfissure</span>
        </div>
      </div>

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Guide d'évaluation</Eyebrow>
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
                  Microfissure&nbsp;:<br />
                  <em>quand faut-il s'inquiéter&nbsp;?</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  Toutes les microfissures ne sont pas dangereuses. Le critère qui compte vraiment, c'est l'ouverture (en millimètres) — couplée à l'évolution dans le temps. Ce guide détaille la classification professionnelle des fissures pour vous aider à décider.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic gratuit
                  </MagneticButton>
                  <MagneticButton href="/expertise/fissures" variant="ghost">
                    Voir notre méthode
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* CLASSIFICATION */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Classification professionnelle</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Quatre niveaux,<br /><em>une lecture en mm.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.06}>
              <div className="border border-ipb-rule rounded-[6px] overflow-hidden">
                <div className="grid grid-cols-5 bg-ipb-navy text-white">
                  <div className="p-5 font-serif font-bold text-[14px]">Type</div>
                  <div className="p-5 font-serif font-bold text-[14px] border-l border-white/10 text-center">Ouverture</div>
                  <div className="p-5 font-serif font-bold text-[14px] border-l border-white/10">Aspect</div>
                  <div className="p-5 font-serif font-bold text-[14px] border-l border-white/10 text-center">Danger</div>
                  <div className="p-5 font-serif font-bold text-[14px] border-l border-white/10">Action</div>
                </div>
                {typesClassification.map((row, i) => (
                  <div key={row.type} className={`grid grid-cols-5 ${i < typesClassification.length - 1 ? 'border-b border-ipb-rule' : ''} ${row.niveau === 'eleve' ? 'bg-red-50' : 'bg-ipb-white'}`}>
                    <div className="p-5 font-serif font-bold text-[14px] text-ipb-text">{row.type}</div>
                    <div className="p-5 font-serif font-bold text-[14px] text-ipb-orange text-center border-l border-ipb-rule">{row.ouverture}</div>
                    <div className="p-5 text-[13px] font-light text-ipb-muted border-l border-ipb-rule">{row.aspect}</div>
                    <div className="p-5 text-[13px] text-center border-l border-ipb-rule">
                      <span className={`text-[11px] uppercase tracking-[0.14em] font-bold px-2 py-1 rounded-[3px] border ${
                        row.niveau === 'eleve' ? 'text-red-700 border-red-200 bg-red-50' :
                        row.niveau === 'moyen' ? 'text-ipb-orange border-ipb-orange/30 bg-ipb-orange/5' :
                        'text-emerald-700 border-emerald-200 bg-emerald-50'
                      }`}>{row.danger}</span>
                    </div>
                    <div className="p-5 text-[13px] font-light text-ipb-text border-l border-ipb-rule">{row.action}</div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* SIGNES D'ALERTE */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Lire les autres signes</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  L'ouverture seule<br /><em>ne suffit pas.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <RevealOnScroll delay={0.06}>
                <div>
                  <p className="font-serif text-red-700 text-[12px] font-bold tracking-[0.18em] mb-5">SIGNAUX D'URGENCE</p>
                  <ul className="space-y-3">
                    {signesAlerte.filter((s) => s.urgent).map((s) => (
                      <li key={s.signe} className="flex items-start gap-3 bg-ipb-white border-l-4 border-red-500 p-4">
                        <span className="text-red-500 mt-0.5" aria-hidden="true">▸</span>
                        <span className="text-[14px] leading-[1.7] text-ipb-text">{s.signe}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.14}>
                <div>
                  <p className="font-serif text-emerald-700 text-[12px] font-bold tracking-[0.18em] mb-5">SIGNAUX RASSURANTS</p>
                  <ul className="space-y-3">
                    {signesAlerte.filter((s) => !s.urgent).map((s) => (
                      <li key={s.signe} className="flex items-start gap-3 bg-ipb-white border-l-4 border-emerald-500 p-4">
                        <span className="text-emerald-500 mt-0.5" aria-hidden="true">▸</span>
                        <span className="text-[14px] leading-[1.7] text-ipb-text">{s.signe}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* TEST TÉMOIN */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-12 max-w-2xl">
                <Eyebrow variant="dark">Le test du témoin</Eyebrow>
                <h2 className="font-serif text-white" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Évolue ou stable&nbsp;?<br /><em>Trois minutes pour le savoir.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.08}>
              <ol className="space-y-6 text-[15px] leading-[1.85] font-light text-white/85">
                <li className="grid grid-cols-[40px_1fr] gap-5 items-start">
                  <span className="font-serif text-ipb-orange-l text-[14px] font-bold tracking-wider pt-1">01</span>
                  <p>Collez un ruban adhésif (ou un témoin plâtre) <strong className="text-white font-medium">en travers de la fissure</strong>, en notant la date au stylo.</p>
                </li>
                <li className="grid grid-cols-[40px_1fr] gap-5 items-start">
                  <span className="font-serif text-ipb-orange-l text-[14px] font-bold tracking-wider pt-1">02</span>
                  <p>Attendez <strong className="text-white font-medium">3 à 6 mois</strong>, en passant par une période sèche et une période humide si possible.</p>
                </li>
                <li className="grid grid-cols-[40px_1fr] gap-5 items-start">
                  <span className="font-serif text-ipb-orange-l text-[14px] font-bold tracking-wider pt-1">03</span>
                  <p>Si le témoin est <strong className="text-white font-medium">cassé ou décollé</strong>, la fissure est active : un diagnostic instrumenté est nécessaire. Si intact, elle est probablement stabilisée.</p>
                </li>
              </ol>
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
                  Sur les microfissures<br /><em>et leur évaluation.</em>
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
                { href: '/fissure-horizontale-danger', title: 'Fissure horizontale', desc: 'Danger structurel' },
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
