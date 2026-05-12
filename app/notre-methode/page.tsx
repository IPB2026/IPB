import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from '@/components/ui/SmartBackBar';
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Notre méthode de diagnostic · Sept étapes · IPB',
  description:
    "Comment l'institut lit un bâti, des premiers échanges au rapport remis. Sept étapes — premier contact, pré-diagnostic à distance, visite sur site, analyse en cabinet, calcul, rédaction, remise. Méthode IPB, Toulouse.",
  keywords: [
    'méthode diagnostic fissure',
    'protocole expertise bâtiment',
    'comment se passe un diagnostic structure',
    'visite expert fissures',
    'rapport expertise bâtiment',
    'institut pathologie bâtiment Toulouse',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/notre-methode',
  },
  openGraph: {
    title: 'Notre méthode de diagnostic · Sept étapes · IPB',
    description:
      "Comment l'institut lit un bâti, des premiers échanges au rapport remis. Sept étapes documentées.",
    url: 'https://www.ipb-expertise.fr/notre-methode',
    type: 'article',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const etapes = [
  {
    num: '01',
    titre: 'Le premier échange',
    paragraphe:
      "Quand vous nous écrivez ou nous appelez, le premier échange dure entre dix et vingt minutes. Nous écoutons votre récit — ce que vous voyez, depuis quand, dans quelles conditions le désordre est apparu. Nous posons quelques questions précises sur le bâti : type de fondations si connu, nature des murs, ancienneté de la construction, mouvements éventuels du sol. Cette phase nous permet de comprendre si le dossier nécessite un déplacement, quel matériel sera utile, et quel délai nous pouvons tenir. Nous ne facturons rien à ce stade. Si nous estimons qu'une visite n'est pas justifiée, nous le disons.",
    terrain:
      "Le carnet de premier contact contient une grille de quatorze questions structurées : ancienneté du bâti, nature des fondations, présence d'une cave, événements climatiques récents, antécédents de travaux. Cette grille sert à préqualifier le dossier sans avoir à se déplacer.",
  },
  {
    num: '02',
    titre: 'Le pré-diagnostic à distance',
    paragraphe:
      "À partir de votre description et des photos que vous transmettez, notre équipe examine les éléments visibles. Elle identifie les indices secondaires qu'une photo peut révéler : forme et orientation de la fissure, position dans le bâti, traces autour des ouvertures, nature de l'enduit. Cette étape ne remplace pas une visite mais elle oriente la suite. Pour environ un dossier sur cinq, le pré-diagnostic à distance suffit à donner une réponse claire — il s'agit d'un désordre stabilisé, esthétique, ou d'un cas qui ne relève pas de notre périmètre. Pour les autres, nous programmons une visite avec les bons instruments.",
    terrain:
      "Les photos utiles : une vue d'ensemble du bâti, une vue rapprochée du désordre avec un repère métrique (règle, pièce de monnaie), une vue de l'environnement immédiat (terrain, arbres, présence d'eau). Une simple photo cadrée de loin sans repère est rarement exploitable.",
  },
  {
    num: '03',
    titre: 'La visite sur site',
    paragraphe:
      "L'expert structure de l'institut se déplace. Selon le dossier, la visite dure entre une heure et trois heures. Elle commence par un tour du bâti à pied, sans instrument — observer d'abord, mesurer ensuite. Vient l'inspection rapprochée des désordres : mesure au fissuromètre, prise de photos datées et géolocalisées, examen des indices secondaires (portes, plinthes, carrelage, planchers). Si nécessaire, nous sondons les fondations à la tarière manuelle ou nous prélevons un échantillon de mortier. Vous êtes présent pendant la visite — c'est un échange, pas une auscultation silencieuse. Vos questions sont les bienvenues.",
    terrain:
      "Matériel standard de la visite : fissuromètre Saugnac à pince et fissuromètre adhésif (deux modes de mesure complémentaires), humidimètre Protimeter Surveymaster, niveau laser rotatif pour mesurer les défauts d'horizontalité, tarière manuelle pour les sondages de surface, appareil photo avec horodatage et géolocalisation activés.",
  },
  {
    num: '04',
    titre: "L'analyse en cabinet",
    paragraphe:
      "De retour au bureau, l'ingénieur ouvre votre dossier. Il consulte la carte BRGM des aléas pour votre commune (retrait-gonflement des argiles, mouvements de terrain), examine les arrêtés de catastrophe naturelle des dix dernières années, vérifie le plan cadastral et, si pertinent, consulte les archives techniques disponibles (permis de construire, anciennes ventes). Les mesures relevées sur site sont reportées dans une grille d'évaluation qui croise largeur, forme, évolution probable et indices secondaires. Ce travail prend en moyenne deux heures pour un dossier standard, davantage si la situation est complexe.",
    terrain:
      "Les sources consultées en cabinet sont publiques : Géorisques (BRGM) pour les aléas, Géoportail pour les plans cadastraux, le bulletin officiel des arrêtés de catastrophe naturelle. Aucun frais d'accès. Les documents internes (permis, ventes antérieures) sont demandés au propriétaire si nécessaire.",
  },
  {
    num: '05',
    titre: "Le calcul technique",
    paragraphe:
      "Quand le diagnostic révèle une atteinte structurelle, l'ingénieur procède aux calculs nécessaires : descente de charges, vérification des sections, dimensionnement de la solution de réparation envisagée. Selon les cas, le calcul porte sur des agrafes structurelles à dimensionner, sur la reprise en sous-œuvre par micropieux, ou sur la mise en place d'une poutre IPN ou HEB pour soutenir une zone affaiblie. Le calcul s'appuie sur les Eurocodes en vigueur et tient compte des charges permanentes, des charges d'exploitation et des charges climatiques propres au site. Il est consigné dans le rapport.",
    terrain:
      "Le calcul est mené à la main pour les cas simples et sur logiciel dédié pour les cas avec poutre composite ou descente de charges complexe. Les notes de calcul sont annexées au rapport quand le dossier le justifie.",
  },
  {
    num: '06',
    titre: 'La rédaction du rapport',
    paragraphe:
      "Le rapport est rédigé par l'ingénieur qui a mené la visite. Il comporte cinq parties fixes : le contexte du dossier, les constats sur site, l'analyse, les préconisations, les annexes (photos, plans, notes de calcul). La rédaction prend entre une demi-journée et deux jours selon la complexité. Le ton est descriptif, jamais conjectural — quand un point est incertain, le rapport le dit. Le document est relu par une seconde personne avant remise. Il est livré au format PDF, paginé, signé numériquement, avec les photos en pleine résolution.",
    terrain:
      "Le rapport-type fait entre douze et trente-cinq pages. Il est rédigé dans les formes attendues par les notaires, agents immobiliers, assureurs et magistrats. Il peut être annexé à un acte, présenté à un assureur, ou produit en pièce dans une procédure judiciaire.",
  },
  {
    num: '07',
    titre: "La remise et l'accompagnement",
    paragraphe:
      "Le rapport vous est remis par email, accompagné d'un appel téléphonique pour en parcourir les points clés. Si vous êtes en compromis, en vente, ou face à un assureur, nous pouvons échanger directement avec votre notaire, votre agent immobilier ou votre interlocuteur d'assurance — avec votre accord. Si le rapport préconise des travaux et que vous souhaitez nous les confier, nous les exécutons sous garantie décennale ; sinon, vous restez libre de consulter d'autres entreprises avec le rapport en main. Nous restons disponibles pour les questions complémentaires pendant les six mois qui suivent la remise.",
    terrain:
      "La remise au téléphone prend en moyenne quarante minutes. Aucun frais supplémentaire pour les questions complémentaires, dans la limite raisonnable de l'usage.",
  },
];

const orientations = [
  {
    titre: "Vous achetez et vous avez un doute",
    desc: "Avis structurel indépendant avant signature ou pendant le délai de rétractation.",
    href: '/expertise-avant-achat-immobilier-toulouse',
    cta: "Voir la page expertise avant achat",
  },
  {
    titre: 'Vous voyez apparaître une fissure récemment',
    desc: "Diagnostic instrumenté pour qualifier sa nature et son évolution probable.",
    href: '/expert-fissures-toulouse-31',
    cta: 'Voir la page diagnostic fissures',
  },
  {
    titre: "Vous suspectez un retrait-gonflement des argiles",
    desc: "Pathologie liée à la sécheresse — protocole spécifique BRGM et arrêtés cat-nat.",
    href: '/fissure-secheresse-indemnisation',
    cta: 'Voir la page sécheresse',
  },
  {
    titre: 'Vous projetez une ouverture de mur porteur',
    desc: "Étude structure, dimensionnement, exécution sous garantie décennale.",
    href: '/expert-mur-porteur',
    cta: 'Voir la page mur porteur',
  },
];

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: "Méthode de diagnostic en pathologie du bâtiment — IPB",
  description:
    "Méthode utilisée par l'Institut de Pathologie du Bâtiment pour diagnostiquer une fissure ou un désordre structurel : sept étapes du premier contact à la remise du rapport.",
  totalTime: 'P21D',
  step: etapes.map((e, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: e.titre,
    text: e.paragraphe,
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
      name: 'Notre méthode',
      item: 'https://www.ipb-expertise.fr/notre-methode',
    },
  ],
};

export default function NotreMethodePage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script
        id="howto-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Script
        id="breadcrumb-jsonld"
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
                <Eyebrow>Notre méthode</Eyebrow>
              </RevealOnScroll>
              <RevealOnScroll delay={0.06} variant="editorial">
                <h1
                  className="font-serif text-ipb-text mb-8"
                  style={{
                    fontSize: 'clamp(40px, 4vw, 62px)',
                    lineHeight: 1.06,
                    letterSpacing: '-0.025em',
                    fontWeight: 700,
                  }}
                >
                  Notre méthode de&nbsp;diagnostic.<br />
                  <em>Sept étapes, du premier échange au rapport remis.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-6 max-w-[640px]">
                  Notre méthode est la même quel que soit le dossier — un sinistré, un vendeur, un acheteur, un projet de rénovation. Elle se déroule en sept étapes, qui peuvent durer de quelques jours à quelques semaines selon la complexité du cas.
                </p>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[640px]">
                  Nous l'avons construite sur dix années d'études sur site et de rapports rédigés. Elle ne change pas selon les dossiers ; elle s'adapte selon les bâtis.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Décrire ma situation
                  </MagneticButton>
                  <MagneticButton href="tel:+33582953375" variant="ghost">
                    Appeler · 05 82 95 33 75
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* LES SEPT ÉTAPES */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Le déroulé complet</Eyebrow>
                <h2
                  className="font-serif text-ipb-text"
                  style={{
                    fontSize: 'clamp(32px, 3vw, 46px)',
                    lineHeight: 1.12,
                    letterSpacing: '-0.022em',
                    fontWeight: 700,
                  }}
                >
                  Les sept étapes,<br />
                  <em>de la première question au rapport en main.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <ol className="space-y-16 lg:space-y-20">
              {etapes.map((etape, i) => (
                <RevealOnScroll key={etape.num} delay={i * 0.04}>
                  <li className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-16 lg:pb-20 border-b border-ipb-rule last:border-b-0 last:pb-0">
                    {/* Numéro + titre */}
                    <div className="lg:col-span-4">
                      <span className="font-serif text-ipb-orange text-[14px] font-bold tracking-[0.18em] block mb-4">
                        ÉTAPE {etape.num}
                      </span>
                      <h3
                        className="font-serif text-ipb-text"
                        style={{
                          fontSize: 'clamp(24px, 2.2vw, 32px)',
                          lineHeight: 1.15,
                          letterSpacing: '-0.02em',
                          fontWeight: 700,
                        }}
                      >
                        {etape.titre}
                      </h3>
                    </div>

                    {/* Paragraphe + encadré "Sur le terrain" */}
                    <div className="lg:col-span-8 space-y-6">
                      <p className="text-[15px] leading-[1.9] font-light text-ipb-text">
                        {etape.paragraphe}
                      </p>

                      <aside
                        className="bg-ipb-cream border-l-2 border-ipb-orange pl-6 pr-5 py-5 rounded-r-[3px]"
                        aria-label="Note technique"
                      >
                        <p className="font-serif text-ipb-orange-d text-[11px] font-bold tracking-[0.18em] uppercase mb-3">
                          Sur le terrain
                        </p>
                        <p className="text-[14px] leading-[1.8] font-light text-ipb-muted">
                          {etape.terrain}
                        </p>
                      </aside>
                    </div>
                  </li>
                </RevealOnScroll>
              ))}
            </ol>
          </div>
        </section>

        {/* SELON VOTRE SITUATION — liens internes pages persona */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-12 max-w-2xl">
                <Eyebrow>Selon votre situation</Eyebrow>
                <h2
                  className="font-serif text-ipb-text"
                  style={{
                    fontSize: 'clamp(28px, 2.6vw, 38px)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.022em',
                    fontWeight: 700,
                  }}
                >
                  La méthode est la même.<br />
                  <em>Le point d'entrée diffère.</em>
                </h2>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mt-6 max-w-[600px]">
                  Selon ce que vous traversez, voici les pages qui répondent au plus près à votre cas.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {orientations.map((o, i) => (
                <RevealOnScroll key={o.href} delay={i * 0.05}>
                  <Link
                    href={o.href}
                    className="block bg-ipb-white border border-ipb-rule rounded-[6px] p-8 lg:p-10 transition-all duration-300 hover:border-ipb-orange hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
                  >
                    <h3 className="font-serif text-ipb-text font-bold text-[18px] leading-tight mb-3">
                      {o.titre}
                    </h3>
                    <p className="text-[14px] leading-[1.8] font-light text-ipb-muted mb-6">
                      {o.desc}
                    </p>
                    <span className="text-[13px] text-ipb-orange-d font-medium">
                      {o.cta} →
                    </span>
                  </Link>
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
