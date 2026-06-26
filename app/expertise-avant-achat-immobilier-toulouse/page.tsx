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
    "Expertise avant achat immobilier · Toulouse",
  description:
    "Diagnostic indépendant du bâti avant achat immobilier à Toulouse. Visite sous 72h, rapport sous 3 à 5 jours — compatible avec votre délai de rétractation.",
  keywords: [
    'expertise avant achat toulouse',
    'expertise immobilière toulouse',
    'avis structurel achat',
    'contre-expertise avant signature',
    'clause suspensive expertise',
    'fissure avant achat toulouse',
    'expert bâtiment avant achat 31',
    'rétractation acheteur immobilier',
  ],
  alternates: {
    canonical:
      'https://www.ipb-expertise.fr/expertise-avant-achat-immobilier-toulouse',
  },
  openGraph: {
    title:
      'Expertise avant achat immobilier · Diagnostic indépendant du bâti · Toulouse · IPB',
    description:
      "Diagnostic indépendant du bâti avant achat. Délais compatibles avec votre rétractation : visite sous 72h.",
    url: 'https://www.ipb-expertise.fr/expertise-avant-achat-immobilier-toulouse',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const moments = [
  {
    label: 'Moment A',
    titre: 'Vous visitez et vous avez un doute',
    desc: "Avant même de signer un compromis, vous voulez un avis technique. Nous nous déplaçons sur le bien (avec accord du vendeur ou de l'agence) et nous remettons un avis sous 3 à 5 jours ouvrés.",
  },
  {
    label: 'Moment B',
    titre: 'Vous êtes en compromis avec clause suspensive',
    desc: "Le délai de rétractation est court. Notre intervention en urgence est possible : visite sous 24 heures, avis intermédiaire dans la foulée, rapport définitif sous 3 à 5 jours ouvrés. Précisez-nous votre date butoir dès le premier échange.",
  },
  {
    label: 'Moment C',
    titre: 'Vous avez signé et vous voyez quelque chose',
    desc: "Signature passée, mais des désordres apparaissent ou s'aggravent. Selon le contexte, plusieurs voies sont ouvertes : mise en cause de la garantie décennale du constructeur, recours contre le vendeur sur dol ou vice caché. Notre rapport documente les éléments factuels indispensables au dossier.",
  },
];

const contenuRapport = [
  'Photos datées et géolocalisées des désordres observés',
  'Mesures au fissuromètre, dimensionnement précis',
  'Qualification de chaque désordre : esthétique, superficiel, structurel',
  'Identification des causes probables et de leur évolution prévisible',
  'Estimation des coûts de remise en état si interventions nécessaires',
  'Avis sur la stabilité globale du bâti',
  "Document utilisable comme pièce à un éventuel recours ou à une négociation",
];

const etapes = [
  {
    titre: 'Premier contact',
    desc: "Vous nous appelez ou nous écrivez. Nous évaluons en quelques heures si le dossier nécessite une visite et dans quel délai.",
  },
  {
    titre: "Coordination avec le vendeur ou l'agence",
    desc: "Nous prenons contact pour fixer le rendez-vous de visite.",
  },
  {
    titre: 'Visite sur site',
    desc: "Sous 72 heures en standard. Sous 24 heures en urgence selon disponibilité.",
  },
  {
    titre: 'Avis intermédiaire',
    desc: "Pour les dossiers urgents, un avis technique peut être donné dans les 48 heures suivant la visite, avant le rapport définitif.",
  },
  {
    titre: 'Rapport définitif',
    desc: "Remis sous 3 à 5 jours ouvrés après la visite. Document technique complet, versable au dossier d'achat.",
  },
];

const faqItems = [
  {
    question: "Le vendeur ne veut pas que je fasse intervenir un expert. Que faire ?",
    answer:
      "Le vendeur ne peut pas s'opposer à ce que vous fassiez expertiser un bien que vous envisagez d'acheter. Il peut en revanche refuser l'accès au bien — ce qui est, en soi, un signal. En pratique, dans la majorité des dossiers que nous traitons, l'accès est accordé sans difficulté, parfois en présence de l'agent immobilier. Si l'accès est refusé sans motif, nous pouvons rédiger un avis sur la base des éléments visibles depuis l'espace public et des photos disponibles.",
  },
  {
    question: "Mon agent immobilier dit que les diagnostics réglementaires suffisent. Est-ce vrai ?",
    answer:
      "Les diagnostics réglementaires (DPE, amiante, plomb, électricité, gaz, termites, ERP) couvrent ce que la loi impose au vendeur de communiquer. Aucun de ces diagnostics ne traite de la structure du bâti, des fissures, ou de la stabilité des fondations. Pour ces sujets, une expertise technique indépendante est le seul moyen d'obtenir un avis documenté.",
  },
  {
    question: "Combien coûte un recours sur vice caché ou sur dol ?",
    answer:
      "Cette question relève du droit, et nous orientons systématiquement vers un avocat spécialisé en droit immobilier. Notre intervention se limite à l'établissement du rapport technique qui documente les désordres et leurs causes — pièce centrale de tout recours, mais qui ne se substitue pas au conseil juridique.",
  },
  {
    question: "Vous intervenez sur les biens en VEFA ou en construction récente ?",
    answer:
      "Oui. Pour les biens en cours de livraison ou récemment livrés, nous pouvons intervenir en visite de pré-livraison, en accompagnement de réception, ou en contre-expertise après livraison. Sur les bâtiments de moins de 10 ans, la garantie décennale du constructeur peut être engagée — notre rapport documente les éléments factuels nécessaires à cette procédure.",
  },
  {
    question: "Peut-on faire l'expertise sans la présence du vendeur ?",
    answer:
      "Oui, c'est même le cas le plus fréquent. La présence de l'agent immobilier suffit généralement. Le vendeur n'est pas tenu d'être présent. La visite est un échange technique entre notre institut et vous (ou la personne que vous mandatez).",
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'IPB — Expertise avant achat immobilier',
  description:
    "Avis structurel indépendant avant achat. Délais compatibles avec la rétractation et les compromis sous échéance.",
  url: 'https://www.ipb-expertise.fr/expertise-avant-achat-immobilier-toulouse',
  telephone: '+33582953375',
  priceRange: '€€',
  areaServed: [
    { '@type': 'City', name: 'Toulouse' },
    { '@type': 'AdministrativeArea', name: 'Haute-Garonne' },
    { '@type': 'AdministrativeArea', name: 'Tarn-et-Garonne' },
    { '@type': 'AdministrativeArea', name: 'Gers' },
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
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.ipb-expertise.fr' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Expertise avant achat immobilier',
      item: 'https://www.ipb-expertise.fr/expertise-avant-achat-immobilier-toulouse',
    },
  ],
};

export default function ExpertiseAvantAchatPage() {
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
                <Eyebrow>Acheteur</Eyebrow>
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
                  Expertise avant achat<br />
                  <em>immobilier.</em>
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
                  Avis structurel indépendant. Délais compatibles avec votre rétractation.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.14}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[640px]">
                  Vous achetez. Vous avez vu des fissures, ou un doute sur la structure du bien. L'institut intervient en avis indépendant, sans aucun lien avec le vendeur ni l'agence. Notre rapport vous donne les éléments factuels pour décider — continuer, négocier, ou ne pas signer.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Décrire ma situation
                  </MagneticButton>
                  <MagneticButton href="tel:+33582953375" variant="ghost">
                    Pour un dossier urgent · 05 82 95 33 75
                  </MagneticButton>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.26} variant="subtle">
                <p className="text-[12px] leading-[1.7] tracking-[0.02em] text-ipb-light max-w-[640px]">
                  Pour les rétractations en cours et les compromis avancés, l'appel téléphonique permet une réponse immédiate.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* SECTION 1 — TROIS MOMENTS */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Les trois moments</Eyebrow>
                <h2
                  className="font-serif text-ipb-text"
                  style={{
                    fontSize: 'clamp(32px, 3vw, 46px)',
                    lineHeight: 1.12,
                    letterSpacing: '-0.022em',
                    fontWeight: 700,
                  }}
                >
                  À chaque étape de votre achat,<br />
                  <em>un rôle pour l'expertise.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
              {moments.map((m, i) => (
                <RevealOnScroll key={m.titre} delay={i * 0.06}>
                  <article className="border-t border-ipb-rule pt-8">
                    <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] uppercase mb-3">
                      {m.label}
                    </p>
                    <h3 className="font-serif text-ipb-text font-bold text-[20px] leading-tight mb-4">
                      {m.titre}
                    </h3>
                    <p className="text-[14px] leading-[1.85] font-light text-ipb-muted">
                      {m.desc}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2 — POURQUOI UN AVIS INDÉPENDANT */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <Eyebrow>L'indépendance</Eyebrow>
              <h2
                className="font-serif text-ipb-text mb-10"
                style={{
                  fontSize: 'clamp(32px, 3vw, 46px)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.022em',
                  fontWeight: 700,
                }}
              >
                Pourquoi un avis indépendant<br />
                <em>change la donne.</em>
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.08}>
              <div className="space-y-6 text-[15px] leading-[1.9] font-light text-ipb-text">
                <p>
                  L'agent immobilier défend les intérêts du vendeur. C'est son métier, ce n'est pas un reproche. Le diagnostiqueur missionné dans le cadre de la vente couvre les diagnostics réglementaires (DPE, amiante, plomb, électricité, gaz). Aucun de ces deux acteurs n'a vocation à analyser la structure du bâti.
                </p>
                <p>
                  L'institut est indépendant. Nous n'avons aucun lien avec le vendeur, l'agence, le notaire. Notre rapport dit ce que nous voyons.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* SECTION 3 — CONTENU DU RAPPORT */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <RevealOnScroll className="lg:col-span-5">
                <Eyebrow>Le rapport acheteur</Eyebrow>
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
                  Le rapport est rédigé par l'ingénieur qui a mené la visite. Il est livré au format PDF, paginé, signé numériquement, avec les photos en pleine résolution. Il peut être annexé à l'acte ou utilisé comme pièce technique dans une négociation ou un recours.
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

        {/* SECTION 4 — CAS SUIVI (cas représentatif rédigé en interne, à remplacer par un cas réel quand disponible) */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-12 max-w-2xl">
                <Eyebrow>Un cas suivi</Eyebrow>
                <h2
                  className="font-serif text-ipb-text"
                  style={{
                    fontSize: 'clamp(28px, 2.6vw, 38px)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.022em',
                    fontWeight: 700,
                  }}
                >
                  Toulouse Saint-Cyprien · Appartement T3<br />
                  <em>2024.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.08}>
              <article className="bg-ipb-white border border-ipb-rule rounded-[6px] p-8 lg:p-12 space-y-6 text-[15px] leading-[1.9] font-light text-ipb-text">
                <div>
                  <h3 className="font-serif text-ipb-orange-d text-[11px] font-bold tracking-[0.18em] uppercase mb-3">
                    Contexte
                  </h3>
                  <p>
                    Compromis signé sous condition suspensive de diagnostic du bâti. Bien : T3 de 65 m² au troisième étage d'un immeuble en pierre de 1965. Acheteur ayant remarqué une fissure verticale traversante de 4 mm en façade arrière, doublée d'une fissure intérieure correspondante dans le séjour. Délai de 18 jours avant l'échéance de la condition suspensive.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-ipb-orange-d text-[11px] font-bold tracking-[0.18em] uppercase mb-3">
                    Intervention
                  </h3>
                  <p>
                    Visite sur site programmée sous 24 heures avec accord de l'agence. Mesures au fissuromètre adhésif sur les deux faces de la fissure traversante, niveau laser pour vérifier l'horizontalité du plancher (basculement de 8 mm sur 5 m vers la façade), examen des indices secondaires. Consultation des archives du syndic confirmant l'absence de travaux structurels récents sur la copropriété. Avis intermédiaire transmis à l'acheteur dans les 48 heures suivant la visite. Rapport définitif remis en 4 jours ouvrés.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-ipb-orange-d text-[11px] font-bold tracking-[0.18em] uppercase mb-3">
                    Issue
                  </h3>
                  <p>
                    Le rapport a qualifié la fissure de stabilisée — absence de mouvement actif sur la base des indices observés (joints de carrelage intacts, pas de traces de réparation antérieure). L'acheteur a poursuivi la signature au prix annoncé, le rapport étant annexé à l'acte authentique sur recommandation du notaire.
                  </p>
                </div>
              </article>
            </RevealOnScroll>
          </div>
        </section>

        {/* SECTION 5 — PROCESSUS */}
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
                  Cinq étapes,<br />
                  <em>compatibles avec vos délais.</em>
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

        {/* SECTION 6 — TARIF ET DÉLAI */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-12 max-w-2xl">
                <Eyebrow>Tarif et délai</Eyebrow>
                <h2
                  className="font-serif text-ipb-text"
                  style={{
                    fontSize: 'clamp(28px, 2.6vw, 38px)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.022em',
                    fontWeight: 700,
                  }}
                >
                  Une visite, un avis intermédiaire<br />
                  <em>si urgence, un rapport en main.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.08}>
              <div className="bg-ipb-white border border-ipb-rule rounded-[6px] p-8 lg:p-10 space-y-8">
                <div>
                  <h3 className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-3">
                    TARIF
                  </h3>
                  <p className="text-[15px] leading-[1.85] font-light text-ipb-text">
                    Expertise standard avant achat. Pour les dossiers en urgence (rétractation en cours, compromis sous échéance), un supplément peut s'appliquer selon le délai demandé. Le tarif définitif vous est confirmé à l'issue du premier échange selon la complexité du dossier.
                  </p>
                </div>

                <div className="pt-8 border-t border-ipb-rule">
                  <h3 className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-3">
                    DÉLAI
                  </h3>
                  <p className="text-[15px] leading-[1.85] font-light text-ipb-text">
                    Visite sous 72h en standard, sous 24 heures en urgence. Avis intermédiaire dans les 48 heures suivant la visite pour les dossiers urgents. Rapport définitif remis sous 3 à 5 jours ouvrés.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* SECTION 7 — FAQ ACHETEUR */}
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
                  Sur l'expertise<br />
                  <em>avant achat.</em>
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
                Avant de signer,<br />
                <em>faites lire le bâti.</em>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[600px] mx-auto">
                Décrivez-nous le bien, votre échéance, et les désordres observés. Nous vous indiquons en quelques heures si nous pouvons intervenir dans vos délais.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.14}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton href="/diagnostic" variant="primary">
                  Décrire ma situation
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
