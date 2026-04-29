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
  title: 'Fissure en escalier · Causes, dangers et réparation · Institut IPB',
  description: "Fissure en escalier sur votre mur ? C'est le signe d'un tassement différentiel. Causes (sol argileux, sécheresse), dangers structurels et solutions (agrafage, micropieux). Institut IPB Toulouse, Montauban, Auch.",
  keywords: ['fissure en escalier', 'fissure diagonale', 'tassement différentiel', 'sol argileux', 'agrafage fissures', 'expert fissures toulouse'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/fissure-en-escalier-causes' },
  openGraph: {
    title: 'Fissure en escalier · Institut IPB',
    description: "Une fissure en escalier révèle un tassement différentiel. Diagnostic instrumenté et traitement par agrafage. Institut IPB Occitanie.",
    url: 'https://www.ipb-expertise.fr/fissure-en-escalier-causes',
    type: 'article',
    images: [{ url: '/images/fissure-facade-diagonale.webp', width: 1200, height: 630, alt: 'Fissure en escalier sur mur — Institut IPB' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const causes = [
  { titre: 'Tassement différentiel', desc: "Une partie de la fondation s'enfonce plus que l'autre — le mur subit des contraintes de cisaillement qui suivent les joints." },
  { titre: 'Retrait-gonflement des argiles (RGA)', desc: "Les sols argileux gonflent avec l'eau, se rétractent en sécheresse. C'est la cause numéro 1 en Occitanie." },
  { titre: 'Défaut de fondations', desc: "Fondations sous-dimensionnées ou mal ancrées. Fréquent dans les maisons des années 1960-1980." },
  { titre: 'Travaux environnants', desc: 'Construction voisine, piscine, arbres trop proches : ces modifications déstabilisent le sol et déséquilibrent les fondations.' },
];

const signesGravite = [
  { signe: 'Ouverture < 2 mm', niveau: 'Surveillance', niveauColor: 'emerald' },
  { signe: 'Ouverture 2 – 5 mm', niveau: 'Intervention recommandée', niveauColor: 'amber' },
  { signe: 'Ouverture 5 – 10 mm', niveau: 'Urgence modérée', niveauColor: 'orange' },
  { signe: 'Ouverture > 10 mm', niveau: 'Urgence structurelle', niveauColor: 'red' },
];

const faqItems = [
  { question: 'Une fissure en escalier est-elle dangereuse ?', answer: "Oui, c'est le signe d'un mouvement structurel actif. Sans traitement, elle va s'aggraver et peut compromettre la stabilité du bâtiment. Une intervention de stabilisation est généralement nécessaire." },
  { question: 'Peut-on simplement reboucher une fissure en escalier ?', answer: "Non, reboucher sans traiter la cause est inutile : la fissure réapparaîtra. Il faut d'abord stabiliser la structure (agrafage), puis réparer." },
  { question: 'Combien coûte la réparation ?', answer: "L'agrafage coûte entre 8 000 et 18 000 € selon l'étendue des désordres. Cette technique convient à la grande majorité des cas de fissures structurelles sur bâti courant." },
  { question: "La fissure est-elle couverte par l'assurance ?", answer: "Si votre commune est reconnue en catastrophe naturelle sécheresse pour l'année concernée, oui. Notre rapport documente le lien avec le RGA et accompagne votre dossier." },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Fissure en escalier · Causes, dangers et solutions de réparation",
  "description": "Guide complet sur les fissures en escalier : comprendre les causes, évaluer la gravité et choisir la bonne solution de réparation.",
  "author": { "@type": "Organization", "name": "IPB - Institut de Pathologie du Bâtiment" },
  "publisher": { "@type": "Organization", "name": "IPB", "logo": { "@type": "ImageObject", "url": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png" } },
  "datePublished": "2024-01-15",
  "dateModified": "2025-02-04",
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment réparer une fissure en escalier sur un mur',
  description: "Méthode IPB en quatre étapes pour stabiliser durablement une fissure en escalier — diagnostic instrumenté, étude de structure, agrafage, finitions.",
  totalTime: 'P14D',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'EUR', value: '13000' },
  supply: [
    { '@type': 'HowToSupply', name: 'Aciers inoxydables pour agrafage' },
    { '@type': 'HowToSupply', name: 'Mortier haute performance' },
  ],
  tool: [
    { '@type': 'HowToTool', name: 'Fissuromètre' },
    { '@type': 'HowToTool', name: 'Niveau laser' },
    { '@type': 'HowToTool', name: 'Caméra thermique' },
  ],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Diagnostic instrumenté',
      text: "Diagnostic sur site avec fissuromètre et niveau laser. Pose de témoins datés, identification de la cause.",
      url: 'https://www.ipb-expertise.fr/fissure-en-escalier-causes#etape-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Étude de structure',
      text: "Note de calcul signée par notre ingénieur, choix de la technique de stabilisation (agrafage dans 90 % des cas).",
      url: 'https://www.ipb-expertise.fr/fissure-en-escalier-causes#etape-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Agrafage structurel',
      text: "Couture du mur avec des aciers inoxydables scellés au mortier haute performance. Le mur retrouve sa cohérence monolithique.",
      url: 'https://www.ipb-expertise.fr/fissure-en-escalier-causes#etape-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Reprise des finitions',
      text: "Enduit, peinture si demandée. Levée des étais. Tous les documents techniques sont remis au client.",
      url: 'https://www.ipb-expertise.fr/fissure-en-escalier-causes#etape-4',
    },
  ],
};

export default function FissureEscalierPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="article-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Script id="faq-schema-escalier" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="howto-jsonld-escalier" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <div className="bg-ipb-cream border-b border-ipb-rule py-3">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 text-sm text-ipb-muted">
          <Link href="/" className="hover:text-ipb-orange transition-colors">Accueil</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <Link href="/expertise/fissures" className="hover:text-ipb-orange transition-colors">Expert fissures</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <span className="text-ipb-text">Fissure en escalier</span>
        </div>
      </div>

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Mouvement structurel actif</Eyebrow>
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
                  Fissure en escalier.<br />
                  <em>La signature du tassement différentiel.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  Une fissure diagonale qui suit les joints de mortier en marches d'escalier signe presque toujours un tassement différentiel : une partie de la maison s'enfonce plus que l'autre. C'est le cas le plus fréquent que nous traitons en zone toulousaine.
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

        {/* SCHEMA TYPIQUE */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-12 max-w-2xl">
                <Eyebrow>Reconnaître le motif</Eyebrow>
                <h2 className="font-serif text-ipb-text mb-6" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Pourquoi en escalier&nbsp;?<br /><em>Le chemin de moindre résistance.</em>
                </h2>
                <p className="text-[15px] leading-[1.85] font-light text-ipb-muted">
                  La fissure suit les joints horizontaux et verticaux de la maçonnerie en formant des « marches d'escalier » parce que c'est le chemin de moindre résistance dans le mur. Le mortier des joints cède avant les briques ou parpaings.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* CAUSES */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Quatre causes principales</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Pourquoi cette fissure<br /><em>apparaît-elle&nbsp;?</em>
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

        {/* GRAVITÉ */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow variant="dark">Évaluer la gravité</Eyebrow>
                <h2 className="font-serif text-white" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Votre fissure<br /><em>est-elle grave&nbsp;?</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="space-y-3">
              {signesGravite.map((s, i) => (
                <RevealOnScroll key={s.signe} delay={0.06 + i * 0.05}>
                  <div className="grid grid-cols-[80px_1fr_auto] gap-6 items-center bg-white/5 border border-white/10 p-5 lg:p-6 rounded-[6px]">
                    <span className="font-serif text-ipb-orange-l text-[14px] font-bold tracking-wider">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-white text-[16px] font-bold">{s.signe}</h3>
                    <span className={`text-[11px] uppercase tracking-[0.18em] font-bold px-2 py-1 rounded-[3px] border whitespace-nowrap ${
                      s.niveauColor === 'red' ? 'text-red-400 border-red-400/30 bg-red-500/10' :
                      s.niveauColor === 'orange' ? 'text-ipb-orange-l border-ipb-orange-l/30 bg-ipb-orange-l/10' :
                      s.niveauColor === 'amber' ? 'text-amber-300 border-amber-300/30 bg-amber-300/10' :
                      'text-emerald-300 border-emerald-300/30 bg-emerald-300/10'
                    }`}>{s.niveau}</span>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* RÉPARATION */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-12 max-w-2xl">
                <Eyebrow>Notre méthode</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Comment nous réparons<br /><em>votre fissure.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.06}>
              <ol className="space-y-6 text-[15px] leading-[1.85] font-light text-ipb-muted">
                <li className="grid grid-cols-[40px_1fr] gap-5 items-start">
                  <span className="font-serif text-ipb-orange text-[14px] font-bold tracking-wider pt-1">01</span>
                  <p><strong className="text-ipb-text font-medium">Diagnostic instrumenté</strong> sur site avec fissuromètre et niveau laser. Pose de témoins datés, identification de la cause.</p>
                </li>
                <li className="grid grid-cols-[40px_1fr] gap-5 items-start">
                  <span className="font-serif text-ipb-orange text-[14px] font-bold tracking-wider pt-1">02</span>
                  <p><strong className="text-ipb-text font-medium">Étude structure</strong> : note de calcul signée par notre ingénieur, choix de la technique de stabilisation (agrafage dans 90 % des cas).</p>
                </li>
                <li className="grid grid-cols-[40px_1fr] gap-5 items-start">
                  <span className="font-serif text-ipb-orange text-[14px] font-bold tracking-wider pt-1">03</span>
                  <p><strong className="text-ipb-text font-medium">Agrafage structurel</strong> : couture du mur avec des aciers inoxydables scellés au mortier haute performance. Le mur retrouve sa cohérence monolithique.</p>
                </li>
                <li className="grid grid-cols-[40px_1fr] gap-5 items-start">
                  <span className="font-serif text-ipb-orange text-[14px] font-bold tracking-wider pt-1">04</span>
                  <p><strong className="text-ipb-text font-medium">Reprise des finitions</strong> : enduit, peinture si demandée. Levée des étais. Tous les documents techniques vous sont remis.</p>
                </li>
              </ol>
            </RevealOnScroll>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center mb-16">
                <Eyebrow className="justify-center">Questions fréquentes</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Sur les fissures<br /><em>en escalier.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <RevealOnScroll key={item.question} delay={i * 0.04}>
                  <details className="group bg-ipb-white border border-ipb-rule rounded-[6px]">
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
        <nav aria-label="Articles connexes" className="bg-ipb-white py-20 lg:py-24">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <p className="text-2xl font-serif font-bold text-ipb-text mb-8 text-center">Articles connexes</p>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-px bg-ipb-rule border border-ipb-rule">
              {[
                { href: '/fissure-horizontale-danger', title: 'Fissure horizontale', desc: 'Danger structurel' },
                { href: '/microfissure-quand-sinquieter', title: 'Microfissure', desc: "Quand s'inquiéter" },
                { href: '/fissure-fondation-maison', title: 'Fissure de fondation', desc: 'Solutions durables' },
                { href: '/fissure-secheresse-indemnisation', title: 'Sécheresse / CAT-NAT', desc: 'Démarches assurance' },
                { href: '/expertise/fissures', title: 'Guide complet fissures', desc: 'Notre expertise' },
                { href: '/expertise/humidite', title: 'Humidité', desc: "Diagnostic et solutions" },
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
