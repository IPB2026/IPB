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
  title: 'Fissure sécheresse · Indemnisation CAT-NAT et démarches · Institut IPB',
  description: "Fissures de maison après sécheresse ? Guide complet de l'indemnisation CAT-NAT : démarches, délais (10 jours), franchise, expertise assurance et contre-expertise. Institut IPB Toulouse, Montauban, Auch.",
  keywords: ['fissure sécheresse', 'CAT-NAT', 'catastrophe naturelle', 'indemnisation fissures', 'RGA'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/fissure-secheresse-indemnisation' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const etapesIndemnisation = [
  {
    titre: 'Arrêté CAT-NAT publié',
    desc: "Votre commune doit être reconnue en état de catastrophe naturelle sécheresse. Vérifiez la publication au Journal Officiel via Légifrance.",
    delai: 'Variable',
  },
  {
    titre: "Déclaration à l'assurance",
    desc: "Vous avez 10 jours après publication de l'arrêté pour déclarer le sinistre par lettre recommandée à votre assureur. Ce délai est strict.",
    delai: '10 jours max',
  },
  {
    titre: 'Expertise assurance',
    desc: "L'assureur mandate un expert qui évalue les dommages, vérifie le lien avec la sécheresse et propose un chiffrage. Vous pouvez demander une contre-expertise.",
    delai: '2 à 3 mois',
  },
  {
    titre: 'Indemnisation',
    desc: "Versement de l'indemnité après déduction de la franchise légale. Si la commune a connu plusieurs arrêtés en 5 ans, la franchise peut être majorée.",
    delai: '~3 mois après accord',
  },
];

const communes31 = ['Toulouse', 'Colomiers', 'Tournefeuille', 'Blagnac', 'Muret', 'Cugnaux', 'Plaisance-du-Touch', 'Balma', 'Ramonville-Saint-Agne', 'Castanet-Tolosan'];
const communes82 = ['Montauban', 'Castelsarrasin', 'Moissac', 'Caussade', "Valence d'Agen", 'Montech', 'Verdun-sur-Garonne', 'Nègrepelisse'];
const communes32 = ['Auch', 'Condom', 'Fleurance', 'Lectoure', "L'Isle-Jourdain", 'Mirande', 'Nogaro', 'Gimont'];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment être indemnisé pour des fissures dues à la sécheresse ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pour être indemnisé, votre commune doit être reconnue en état de catastrophe naturelle sécheresse (arrêté CAT-NAT publié au Journal Officiel). Vous avez ensuite 10 jours pour déclarer le sinistre à votre assurance habitation. L'assureur mandate un expert. L'indemnisation intervient environ 3 mois après accord, moins la franchise légale (1 534 € pour une maison individuelle).",
      },
    },
    {
      '@type': 'Question',
      name: "Quel est le délai pour déclarer des fissures sécheresse à l'assurance ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Vous avez exactement 10 jours après la publication de l'arrêté de catastrophe naturelle au Journal Officiel pour déclarer le sinistre à votre assurance par lettre recommandée. Passé ce délai, votre demande d'indemnisation peut être rejetée. Vérifiez régulièrement sur Légifrance.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le montant de la franchise CAT-NAT pour une maison individuelle ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La franchise légale pour une catastrophe naturelle sécheresse sur une maison individuelle est de 1 534 € (montant fixé par l'État). Si votre commune a fait l'objet de plus de 3 arrêtés CAT-NAT en 5 ans, la franchise peut être doublée, triplée ou quadruplée selon le nombre.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on contester l'expertise de l'assurance ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. Vous pouvez faire réaliser une contre-expertise indépendante si l'expert de votre assurance sous-évalue les dommages ou conteste le lien avec la sécheresse. Un rapport technique indépendant renforce considérablement votre dossier. L'institut IPB réalise des expertises opposables (prestation déductible des travaux).",
      },
    },
  ],
};

const faqItems = faqSchema.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }));

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment être indemnisé pour des fissures dues à la sécheresse (CAT-NAT)',
  description: "Démarche complète d'indemnisation après reconnaissance de catastrophe naturelle sécheresse, en quatre étapes.",
  totalTime: 'P5M',
  step: etapesIndemnisation.map((etape, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: etape.titre,
    text: etape.desc,
    url: `https://www.ipb-expertise.fr/fissure-secheresse-indemnisation#etape-${i + 1}`,
  })),
};

export default function FissureSecheressePage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="faq-schema-secheresse" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="howto-jsonld-secheresse" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <div className="bg-ipb-cream border-b border-ipb-rule py-3">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 text-sm text-ipb-muted">
          <Link href="/" className="hover:text-ipb-orange transition-colors">Accueil</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <Link href="/expertise/fissures" className="hover:text-ipb-orange transition-colors">Expert fissures</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <span className="text-ipb-text">Sécheresse / CAT-NAT</span>
        </div>
      </div>

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Indemnisation CAT-NAT sécheresse</Eyebrow>
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
                  Fissures de sécheresse.<br />
                  <em>Démarches d'indemnisation.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  Si votre commune est reconnue en état de catastrophe naturelle sécheresse, votre assurance habitation couvre les réparations. La procédure est strictement encadrée — 10 jours pour déclarer, expertise mandatée, franchise légale. Voici la marche à suivre.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic CAT-NAT
                  </MagneticButton>
                  <MagneticButton href="/carte-secheresse-occitanie" variant="ghost">
                    Carte sécheresse Occitanie
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.24}>
              <div className="mt-16 bg-ipb-white border-l-4 border-ipb-orange p-6 lg:p-7 max-w-3xl">
                <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-3">DÉLAI CRUCIAL</p>
                <p className="text-[14px] leading-[1.85] text-ipb-text">
                  Vous avez <strong className="text-ipb-text font-medium">10 jours</strong> après publication de l'arrêté CAT-NAT au Journal Officiel pour déclarer le sinistre à votre assurance — par lettre recommandée. Passé ce délai, la demande peut être rejetée.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ÉTAPES */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow variant="dark">Le parcours en 4 étapes</Eyebrow>
                <h2 className="font-serif text-white" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  De l'arrêté CAT-NAT<br /><em>à l'indemnisation.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <ul className="space-y-8">
              {etapesIndemnisation.map((etape, i) => (
                <RevealOnScroll key={etape.titre} delay={0.08 + i * 0.06}>
                  <li className="grid grid-cols-[40px_1fr_auto] gap-5 items-start pb-8 border-b border-white/10">
                    <span className="font-serif text-ipb-orange-l text-[14px] font-bold tracking-wider pt-2">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-white text-[20px] font-bold leading-tight mb-2">{etape.titre}</h3>
                      <p className="text-[14px] leading-[1.75] font-light text-white/65">{etape.desc}</p>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-ipb-orange-l whitespace-nowrap pt-3">
                      {etape.delai}
                    </span>
                  </li>
                </RevealOnScroll>
              ))}
            </ul>
          </div>
        </section>

        {/* CHIFFRES CLÉS */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-12 max-w-2xl">
                <Eyebrow>Les chiffres clés</Eyebrow>
                <h2 className="font-serif text-ipb-text mb-6" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Les ordres de grandeur<br /><em>à connaître.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.06}>
              <div className="bg-ipb-cream border border-ipb-rule rounded-[6px] divide-y divide-ipb-rule">
                <div className="p-6 lg:p-7 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-ipb-text font-bold text-[17px] leading-tight mb-1">Franchise légale</h3>
                    <p className="text-[13px] font-light text-ipb-muted">Maison individuelle, fixée par l'État</p>
                  </div>
                  <span className="font-serif text-ipb-orange font-bold text-[24px] leading-none">1 534 €</span>
                </div>
                <div className="p-6 lg:p-7 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-ipb-text font-bold text-[17px] leading-tight mb-1">Délai de déclaration</h3>
                    <p className="text-[13px] font-light text-ipb-muted">Après publication de l'arrêté CAT-NAT</p>
                  </div>
                  <span className="font-serif text-ipb-orange font-bold text-[24px] leading-none">10 jours</span>
                </div>
                <div className="p-6 lg:p-7 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-ipb-text font-bold text-[17px] leading-tight mb-1">Délai d'indemnisation</h3>
                    <p className="text-[13px] font-light text-ipb-muted">Après accord de l'assureur</p>
                  </div>
                  <span className="font-serif text-ipb-orange font-bold text-[24px] leading-none">~3 mois</span>
                </div>
                <div className="p-6 lg:p-7 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-ipb-text font-bold text-[17px] leading-tight mb-1">Majoration de franchise</h3>
                    <p className="text-[13px] font-light text-ipb-muted">Au-delà de 3 arrêtés en 5 ans</p>
                  </div>
                  <span className="font-serif text-ipb-orange font-bold text-[24px] leading-none">×2 à ×4</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* COMMUNES RECONNUES */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Communes fréquemment reconnues</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Trois départements,<br /><em>des arrêtés réguliers.</em>
                </h2>
                <p className="text-[14px] leading-[1.85] font-light text-ipb-muted mt-6">
                  Liste indicative — vérifiez systématiquement la publication officielle au Journal Officiel via Légifrance avant de déclarer un sinistre.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-px bg-ipb-rule border border-ipb-rule">
              {[
                { dept: 'Haute-Garonne (31)', communes: communes31 },
                { dept: 'Tarn-et-Garonne (82)', communes: communes82 },
                { dept: 'Gers (32)', communes: communes32 },
              ].map((d, i) => (
                <RevealOnScroll key={d.dept} delay={i * 0.06}>
                  <div className="bg-ipb-white p-7 lg:p-8 h-full">
                    <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-5">{d.dept}</p>
                    <ul className="space-y-2">
                      {d.communes.map((c) => (
                        <li key={c} className="text-[13px] text-ipb-text font-light">{c}</li>
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
                  Sur l'indemnisation<br /><em>CAT-NAT sécheresse.</em>
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
                { href: '/fissure-fondation-maison', title: 'Fissure de fondation', desc: 'Solutions techniques' },
                { href: '/fissure-en-escalier-causes', title: 'Fissure en escalier', desc: 'Tassement différentiel' },
                { href: '/microfissure-quand-sinquieter', title: 'Microfissure', desc: "Quand s'inquiéter" },
                { href: '/carte-secheresse-occitanie', title: 'Carte sécheresse', desc: 'Zones touchées en Occitanie' },
                { href: '/expertise/fissures', title: 'Guide complet fissures', desc: 'Notre expertise' },
                { href: '/expert-fissures-toulouse-31', title: 'Expert fissures Toulouse', desc: 'Page locale' },
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
