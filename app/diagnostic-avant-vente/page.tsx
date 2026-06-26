import { Metadata } from 'next';
import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from '@/components/ui/SmartBackBar';
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const metadata: Metadata = {
  title:
    'Diagnostic avant vente immobilière · Toulouse',
  description:
    "Vous vendez ? Un diagnostic indépendant du bâti avant la mise en vente rassure vos acheteurs et sécurise votre prix. Visite sous 72h en Occitanie.",
  keywords: [
    'diagnostic avant vente maison',
    'diagnostic vendeur immobilier',
    'faire expertiser avant de vendre',
    'diagnostic bâti avant vente toulouse',
    'expertise avant mise en vente',
    'rassurer acheteurs diagnostic',
    'diagnostic avant vente toulouse',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/diagnostic-avant-vente',
  },
  openGraph: {
    title:
      'Diagnostic avant vente immobilière · Rassurez vos acheteurs · IPB Toulouse',
    description:
      "Un diagnostic indépendant du bâti avant la mise en vente : vous désamorcez les doutes des acheteurs et vous sécurisez votre prix.",
    url: 'https://www.ipb-expertise.fr/diagnostic-avant-vente',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const benefices = [
  {
    titre: 'Vous désamorcez les doutes',
    desc: "Un rapport neutre, mesuré et daté vaut mieux que dix explications rassurantes. L'acheteur ne s'interroge plus — il lit.",
  },
  {
    titre: 'Vous protégez votre prix',
    desc: "Une décote négociée à la baisse au moment de la vente coûte bien plus cher qu'un diagnostic réalisé en amont, à froid.",
  },
  {
    titre: 'Vous sécurisez la transaction',
    desc: "Moins de visites qui tournent court, moins de rétractations, moins de risque de litige sur le vice caché. Et un notaire rassuré.",
  },
];

const contenuRapport = [
  'Photos datées et géolocalisées de chaque désordre observé',
  'Mesures instrumentées (fissuromètre, taux d’humidité selon le cas)',
  'Qualification de chaque désordre : esthétique, superficiel ou structurel',
  'Identification des causes probables et de leur évolution prévisible',
  "Avis de l'expert sur la stabilité globale du bâti",
  'Document clair, présentable à vos acheteurs, à l’agent immobilier et au notaire',
];

const situations = [
  {
    titre: 'Vous vendez avec des fissures',
    desc: "Un acheteur s'inquiète, une visite annulée, un compromis suspendu : le rapport qualifie précisément les désordres et sécurise la vente.",
    href: '/vendre-bien-avec-fissures',
    cta: 'Voir la page fissures',
  },
  {
    titre: "De l'humidité, du salpêtre, des traces",
    desc: "Remontées, infiltrations, condensation : on identifie la vraie origine et on l'objective dans un rapport, avant que l'acheteur n'en fasse un argument.",
    href: '/expertise/humidite',
    cta: 'Voir le diagnostic humidité',
  },
  {
    titre: 'Un doute structurel plus large',
    desc: "Vous ne savez pas exactement quoi faire diagnostiquer. Décrivez votre situation : l'institut vous oriente vers le diagnostic adapté.",
    href: '/diagnostic',
    cta: 'Décrire ma situation',
  },
];

const etapes = [
  {
    titre: 'Premier contact',
    desc: "Vous décrivez votre bien et le calendrier de votre vente. Nous évaluons sous 24h si une visite s'impose et dans quel délai.",
  },
  {
    titre: 'Visite sur site',
    desc: "L'expert se déplace sous 72h. Lecture du bâti, mesures, photos, échange direct.",
  },
  {
    titre: 'Rapport remis',
    desc: 'Document complet sous 3 à 5 jours ouvrés, prêt à être présenté à vos acheteurs et à votre notaire.',
  },
  {
    titre: "Si des travaux s'imposent",
    desc: "Vous restez libre : présenter le rapport et négocier, ou faire réaliser les travaux avant la vente. Le cas échéant, nous vous orientons vers des entreprises membres du réseau IPB.",
  },
];

const faqItems = [
  {
    question: 'Un diagnostic avant vente est-il obligatoire ?',
    answer:
      "Non. Aucun diagnostic de structure, de fissures ou d'humidité n'est légalement obligatoire pour vendre — les diagnostics réglementaires (DPE, amiante, plomb, etc.) ne couvrent pas ces sujets. Mais le présenter spontanément change tout : l'acheteur passe du soupçon à la lecture.",
  },
  {
    question: 'Combien de temps avant la mise en vente faut-il le faire ?',
    answer:
      "Idéalement 3 à 4 semaines avant la première visite. Cela laisse le temps de la visite et du rapport, et vous permet de présenter le document dès le premier rendez-vous.",
  },
  {
    question: 'Montrer un diagnostic, ça ne va pas faire peur aux acheteurs ?',
    answer:
      "C'est l'inverse. Ce qui inquiète un acheteur, c'est l'inconnu. Un rapport indépendant qui qualifie précisément un désordre — souvent bénin — désamorce la peur et transforme une discussion émotionnelle en discussion technique.",
  },
  {
    question: "Le rapport peut-il être annexé à l'acte de vente ?",
    answer:
      "Oui. Il est rédigé dans les formes attendues par les notaires et peut être annexé au compromis ou à l'acte si vous le souhaitez.",
  },
  {
    question: 'Si le rapport identifie des travaux, dois-je les faire avant de vendre ?',
    answer:
      "Non. Vous avez le choix : vendre un bien réparé, ou présenter le rapport et négocier en connaissance de cause. Dans les deux cas, vous décidez avec les bons éléments. Si vous optez pour les travaux, nous pouvons vous orienter vers des entreprises membres du réseau IPB.",
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'IPB — Diagnostic avant vente immobilière',
  description:
    "Diagnostic indépendant du bâti (fissures, humidité, structure) réalisé avant la mise en vente, pour objectiver l'état du bien, rassurer les acheteurs et sécuriser la transaction.",
  url: 'https://www.ipb-expertise.fr/diagnostic-avant-vente',
  serviceType: 'Diagnostic en pathologie du bâtiment — vente immobilière',
  provider: { '@id': 'https://www.ipb-expertise.fr#localbusiness' },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Haute-Garonne' },
    { '@type': 'AdministrativeArea', name: 'Tarn-et-Garonne' },
    { '@type': 'AdministrativeArea', name: 'Gers' },
    { '@type': 'AdministrativeArea', name: 'Tarn' },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Accueil',
      item: 'https://www.ipb-expertise.fr',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Diagnostic avant vente',
      item: 'https://www.ipb-expertise.fr/diagnostic-avant-vente',
    },
  ],
};

export default function DiagnosticAvantVentePage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Diagnostic · Côté vendeur</Eyebrow>
              </RevealOnScroll>
              <RevealOnScroll delay={0.06} variant="editorial">
                <h1
                  className="font-serif text-ipb-text mb-6"
                  style={{
                    fontSize: 'clamp(40px, 4vw, 62px)',
                    lineHeight: 1.06,
                    letterSpacing: '-0.025em',
                    fontWeight: 700,
                  }}
                >
                  Diagnostic avant vente&nbsp;:<br />
                  <em>vendez l'esprit tranquille.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <p
                  className="font-serif text-ipb-text mb-8 italic"
                  style={{
                    fontSize: 'clamp(20px, 1.8vw, 26px)',
                    lineHeight: 1.3,
                    letterSpacing: '-0.015em',
                    fontWeight: 400,
                  }}
                >
                  Le diagnostic indépendant qui rassure vos acheteurs.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.14}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[640px]">
                  Un bien qui suscite des questions — une fissure, une trace d'humidité, un doute sur la structure — se vend moins vite et moins cher. Un diagnostic indépendant, réalisé <em>avant</em> la mise en vente, transforme l'incertitude en information&nbsp;: vos acheteurs ne s'inquiètent plus, ils lisent. Et vous gardez la main sur votre prix.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Faire diagnostiquer mon bien
                  </MagneticButton>
                  <MagneticButton href="#pourquoi" variant="ghost">
                    Pourquoi diagnostiquer avant de vendre
                  </MagneticButton>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.26} variant="subtle">
                <p className="text-[12px] leading-[1.7] tracking-[0.02em] text-ipb-light">
                  Diagnostic indépendant · Visite sous 72h · Rapport remis sous 3 à 5 jours ouvrés
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* SECTION 1 — Pourquoi diagnostiquer avant de vendre */}
        <section id="pourquoi" className="bg-ipb-white py-24 lg:py-32 scroll-mt-24">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Pourquoi diagnostiquer avant de vendre</Eyebrow>
                <h2
                  className="font-serif text-ipb-text"
                  style={{
                    fontSize: 'clamp(32px, 3vw, 46px)',
                    lineHeight: 1.12,
                    letterSpacing: '-0.022em',
                    fontWeight: 700,
                  }}
                >
                  Un diagnostic en amont,<br />
                  <em>trois soucis en moins.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
              {benefices.map((b, i) => (
                <RevealOnScroll key={b.titre} delay={i * 0.06}>
                  <article className="border-t border-ipb-rule pt-8">
                    <h3 className="font-serif text-ipb-text font-bold text-[20px] leading-tight mb-4">
                      {b.titre}
                    </h3>
                    <p className="text-[14px] leading-[1.85] font-light text-ipb-muted">
                      {b.desc}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2 — L'indépendance, votre argument */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="border-l-2 border-ipb-orange pl-8 lg:pl-12">
                <Eyebrow>L'indépendance, votre argument</Eyebrow>
                <p
                  className="font-serif text-ipb-text"
                  style={{
                    fontSize: 'clamp(24px, 2.4vw, 36px)',
                    lineHeight: 1.25,
                    letterSpacing: '-0.018em',
                    fontWeight: 700,
                  }}
                >
                  Nous ne vendons pas les travaux. Notre seul produit, c'est un diagnostic juste.
                </p>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mt-6 max-w-[640px]">
                  C'est précisément ce qui rend notre rapport crédible aux yeux de vos acheteurs : nous n'avons aucun intérêt à dramatiser un désordre, ni à le minimiser. Cette neutralité, vous la mettez de votre côté de la table.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* SECTION 3 — Ce que contient le rapport */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <RevealOnScroll className="lg:col-span-5">
                <Eyebrow>Le rapport vendeur</Eyebrow>
                <h2
                  className="font-serif text-ipb-text mb-8"
                  style={{
                    fontSize: 'clamp(32px, 3vw, 46px)',
                    lineHeight: 1.12,
                    letterSpacing: '-0.022em',
                    fontWeight: 700,
                  }}
                >
                  Ce que documente<br />
                  <em>le rapport remis.</em>
                </h2>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted">
                  Le rapport est rédigé par l'expert qui a mené la visite. Livré au format PDF, paginé, avec les photos en pleine résolution, il peut être présenté à vos acheteurs, à l'agent immobilier ou annexé à l'acte par votre notaire.
                </p>
              </RevealOnScroll>

              <div className="lg:col-span-7">
                <RevealOnScroll delay={0.08}>
                  <div className="bg-ipb-cream border border-ipb-rule rounded-[6px] p-8 lg:p-10">
                    <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-6">
                      CONTENU DU RAPPORT
                    </p>
                    <ul className="space-y-4">
                      {contenuRapport.map((item) => (
                        <li
                          key={item}
                          className="grid grid-cols-[8px_1fr] gap-4 items-start pb-4 border-b border-ipb-rule last:border-b-0 last:pb-0"
                        >
                          <span className="text-ipb-orange mt-2" aria-hidden="true">▸</span>
                          <p className="text-[14px] leading-[1.8] font-light text-ipb-text">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — Selon votre situation (cross-links) */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Selon votre situation</Eyebrow>
                <h2
                  className="font-serif text-ipb-text"
                  style={{
                    fontSize: 'clamp(32px, 3vw, 46px)',
                    lineHeight: 1.12,
                    letterSpacing: '-0.022em',
                    fontWeight: 700,
                  }}
                >
                  Le bon diagnostic,<br />
                  <em>selon ce que montre votre bien.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-8">
              {situations.map((s, i) => (
                <RevealOnScroll key={s.titre} delay={i * 0.06}>
                  <Link
                    href={s.href}
                    className="group block h-full bg-ipb-white border border-ipb-rule rounded-[6px] p-8 hover:border-ipb-orange transition-colors"
                  >
                    <h3 className="font-serif text-ipb-text font-bold text-[19px] leading-tight mb-3 group-hover:text-ipb-orange transition-colors">
                      {s.titre}
                    </h3>
                    <p className="text-[14px] leading-[1.8] font-light text-ipb-muted mb-5">
                      {s.desc}
                    </p>
                    <span className="text-ipb-orange-d text-[13px] font-medium border-b border-ipb-orange-d pb-0.5 group-hover:gap-2 transition-all">
                      {s.cta} →
                    </span>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — Notre processus */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow variant="dark">Notre processus</Eyebrow>
                <h2
                  className="font-serif text-white"
                  style={{
                    fontSize: 'clamp(32px, 3vw, 46px)',
                    lineHeight: 1.12,
                    letterSpacing: '-0.022em',
                    fontWeight: 700,
                  }}
                >
                  Quatre étapes,<br />
                  <em>du premier contact au rapport.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <ol className="space-y-8">
              {etapes.map((etape, i) => (
                <RevealOnScroll key={etape.titre} delay={0.08 + i * 0.06}>
                  <li className="grid grid-cols-[40px_1fr] gap-5 items-start pb-8 border-b border-white/10">
                    <span className="font-serif text-ipb-orange-l text-[14px] font-bold tracking-wider pt-2">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-white text-[20px] font-bold leading-tight mb-2">
                        {etape.titre}
                      </h3>
                      <p className="text-[14px] leading-[1.75] font-light text-white/65">
                        {etape.desc}
                      </p>
                    </div>
                  </li>
                </RevealOnScroll>
              ))}
            </ol>
          </div>
        </section>

        {/* SECTION 6 — FAQ */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center mb-16">
                <Eyebrow className="justify-center">Questions fréquentes</Eyebrow>
                <h2
                  className="font-serif text-ipb-text"
                  style={{
                    fontSize: 'clamp(28px, 2.6vw, 38px)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.022em',
                    fontWeight: 700,
                  }}
                >
                  Sur le diagnostic<br />
                  <em>avant une vente.</em>
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
                      <span
                        className="text-ipb-orange text-2xl leading-none flex-shrink-0 transition-transform group-open:rotate-45 font-light"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <div className="px-6 lg:px-7 pb-7 -mt-2 text-[14px] leading-[1.85] font-light text-ipb-muted">
                      {item.answer}
                    </div>
                  </details>
                </RevealOnScroll>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/notre-methode"
                className="text-[13px] text-ipb-orange hover:underline"
              >
                Voir notre méthode complète de diagnostic →
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION FINALE — CTA */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <RevealOnScroll>
              <h2
                className="font-serif text-ipb-text mb-8"
                style={{
                  fontSize: 'clamp(32px, 3vw, 46px)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.022em',
                  fontWeight: 700,
                }}
              >
                Un diagnostic, et votre bien<br />
                <em>se présente de lui-même.</em>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[600px] mx-auto">
                Décrivez-nous votre bien et le calendrier de votre vente. Nous vous indiquons sous 24 heures si le dossier peut être traité dans vos délais.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.14}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton href="/diagnostic" variant="primary">
                  Faire diagnostiquer mon bien
                </MagneticButton>
                <MagneticButton href="tel:+33582953375" variant="ghost">
                  Appeler l'institut · 05 82 95 33 75
                </MagneticButton>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
