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
  title: 'Fissure de fondation · Causes et solutions durables · Institut IPB',
  description: "Fissures dues aux fondations ? Causes (tassement différentiel, sol argileux, RGA). Comparatif des solutions : agrafage, micropieux, résine expansive. Institut IPB Toulouse, Montauban, Auch.",
  keywords: ['fissure fondation', 'tassement fondation', 'reprise en sous-œuvre', 'micropieux', 'agrafage fissures'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/fissure-fondation-maison' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const causesFondation = [
  { titre: 'Tassement différentiel', desc: "Une partie de la fondation s'enfonce plus que l'autre. Cause principale des fissures en escalier sur façade.", frequence: '60 %' },
  { titre: 'Sol argileux (RGA)', desc: "Les argiles gonflent et se rétractent selon l'humidité. Phénomène amplifié par les sécheresses récentes.", frequence: '85 %' },
  { titre: 'Fondations sous-dimensionnées', desc: "Fréquent dans les maisons des années 1960-1980. Semelles trop étroites ou pas assez profondes au regard du sol.", frequence: '40 %' },
];

const comparatifSolutions = [
  {
    solution: 'Agrafage structurel',
    prix: '8 000 – 18 000 €',
    delai: '3 à 5 jours',
    garantie: '10 ans',
    adapte: '85 % des cas',
    avantages: ['Adapté au bâti courant', 'Intervention rapide', 'Pas de terrassement lourd'],
    recommande: true,
  },
  {
    solution: 'Micropieux',
    prix: '25 000 – 50 000 €',
    delai: '2 à 3 semaines',
    garantie: '10 ans',
    adapte: 'Cas graves',
    avantages: ['Ancrage profond (10 à 15 m)', 'Tassements actifs majeurs', 'Bâtiments lourds'],
    recommande: false,
  },
  {
    solution: 'Résine expansive',
    prix: '5 000 – 15 000 €',
    delai: '1 à 2 jours',
    garantie: '10 ans',
    adapte: 'Tassements légers',
    avantages: ['Moins invasif', 'Rapide', "Sols compatibles uniquement"],
    recommande: false,
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment savoir si les fissures de ma maison viennent des fondations ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Les fissures de fondation se reconnaissent par leur forme en escalier (suivant les joints de maçonnerie), leur présence sur plusieurs murs, des portes et fenêtres qui coincent, et une évolution progressive. En Occitanie, une grande majorité des cas est liée au sol argileux (retrait-gonflement des argiles). Un diagnostic professionnel permet de confirmer l'origine.",
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte la réparation de fondations fissurées ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Cela dépend de la solution : agrafage structurel entre 8 000 et 18 000 € (convient à la majorité des cas), micropieux entre 25 000 et 50 000 € pour les cas graves, résine expansive entre 5 000 et 15 000 € pour les tassements légers. Toutes ces solutions sont couvertes par la garantie décennale.",
      },
    },
    {
      '@type': 'Question',
      name: "L'agrafage structurel est-il efficace pour les fissures de fondation ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, dans la grande majorité des cas. L'agrafage est la solution adaptée pour le bâti individuel courant : il redonne au mur sa cohérence en cousant la fissure avec des aciers inoxydables, sans terrassement. Pour les tassements actifs majeurs, on bascule sur micropieux.",
      },
    },
    {
      '@type': 'Question',
      name: "L'assurance prend-elle en charge les fissures de fondation ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, si votre commune a été reconnue en état de catastrophe naturelle pour la sécheresse de l'année concernée. Notre rapport documente les désordres et leur lien avec le retrait-gonflement des argiles. Voir notre guide indemnisation CAT-NAT.",
      },
    },
  ],
};

const faqItems = faqSchema.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }));

export default function FissureFondationPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="faq-schema-fondation" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <div className="bg-ipb-cream border-b border-ipb-rule py-3">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 text-sm text-ipb-muted">
          <Link href="/" className="hover:text-ipb-orange transition-colors">Accueil</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <Link href="/expertise/fissures" className="hover:text-ipb-orange transition-colors">Expert fissures</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <span className="text-ipb-text">Fissure de fondation</span>
        </div>
      </div>

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Pathologie structurelle profonde</Eyebrow>
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
                  Fissure de fondation.<br />
                  <em>Quand le sol bouge sous la maison.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  Les fissures qui partent du sol et remontent en escalier sur la façade signent un mouvement des fondations. Trois solutions techniques existent — agrafage, micropieux, résine expansive — et le diagnostic détermine laquelle s'impose.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic structure
                  </MagneticButton>
                  <MagneticButton href="/expertise/fissures" variant="ghost">
                    Voir notre méthode
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* CAUSES */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Trois causes dominantes</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Identifier la cause<br /><em>avant de choisir la solution.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-px bg-ipb-rule border border-ipb-rule">
              {causesFondation.map((c, i) => (
                <RevealOnScroll key={c.titre} delay={i * 0.06}>
                  <article className="bg-ipb-white p-8 lg:p-10 h-full flex flex-col">
                    <span className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-4">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-ipb-text font-bold text-[20px] leading-tight mb-3">
                      {c.titre}
                    </h3>
                    <p className="text-[14px] leading-[1.85] font-light text-ipb-muted mb-6 flex-grow">
                      {c.desc}
                    </p>
                    <div className="pt-4 border-t border-ipb-rule">
                      <span className="font-serif text-ipb-orange font-bold text-[28px] leading-none">{c.frequence}</span>
                      <span className="text-[12px] text-ipb-muted uppercase tracking-[0.14em] font-medium ml-2">des cas</span>
                    </div>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARATIF SOLUTIONS */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Comparatif des solutions</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Trois techniques,<br /><em>une bonne lecture du sol.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-px bg-ipb-rule border border-ipb-rule">
              {comparatifSolutions.map((s, i) => (
                <RevealOnScroll key={s.solution} delay={i * 0.06}>
                  <article className={`p-8 lg:p-10 h-full flex flex-col relative ${s.recommande ? 'bg-ipb-white border-t-2 border-ipb-orange' : 'bg-ipb-white'}`}>
                    {s.recommande && (
                      <span className="absolute top-6 right-6 text-[10px] uppercase tracking-[0.18em] font-bold text-ipb-orange border border-ipb-orange/30 bg-ipb-orange/5 px-2 py-1 rounded-[3px]">
                        Recommandé
                      </span>
                    )}
                    <span className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-4">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-ipb-text font-bold text-[20px] leading-tight mb-4">
                      {s.solution}
                    </h3>

                    <dl className="text-[12px] space-y-1.5 mb-6">
                      <div className="flex justify-between">
                        <dt className="text-ipb-muted">Prix</dt>
                        <dd className="font-medium text-ipb-text">{s.prix}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-ipb-muted">Délai</dt>
                        <dd className="font-medium text-ipb-text">{s.delai}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-ipb-muted">Garantie</dt>
                        <dd className="font-medium text-ipb-orange">{s.garantie}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-ipb-muted">Adapté</dt>
                        <dd className="font-medium text-ipb-text">{s.adapte}</dd>
                      </div>
                    </dl>

                    <ul className="space-y-2 pt-4 border-t border-ipb-rule">
                      {s.avantages.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-[12px] leading-[1.6] text-ipb-muted">
                          <span className="text-ipb-orange mt-0.5" aria-hidden="true">▸</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
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
                  Sur les fissures<br /><em>de fondation.</em>
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
                { href: '/microfissure-quand-sinquieter', title: 'Microfissure', desc: 'Quand s\'inquiéter' },
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
