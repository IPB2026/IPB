import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from '@/components/ui/SmartBackBar';
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const metadata: Metadata = {
  title:
    'Retrait-gonflement des argiles · Pathologie, diagnostic, traitement · IPB',
  description:
    "Monographie clinique du retrait-gonflement des argiles : mécanisme géotechnique, signes sur le bâti, protocole de diagnostic, options de traitement, reconnaissance catastrophe naturelle. Institut IPB, Toulouse.",
  keywords: [
    'retrait-gonflement des argiles',
    'RGA',
    'sécheresse fissures',
    'tassement différentiel argile',
    'agrafage structurel argile',
    'micropieux RGA',
    'arrêté catastrophe naturelle sécheresse',
    'BRGM aléa argile',
  ],
  alternates: {
    canonical:
      'https://www.ipb-expertise.fr/expertise/retrait-gonflement-argiles',
  },
  openGraph: {
    title:
      'Retrait-gonflement des argiles · Pathologie, diagnostic, traitement · IPB',
    description:
      "Monographie clinique du retrait-gonflement des argiles : mécanisme, signes cliniques, protocole de diagnostic, options de traitement.",
    url: 'https://www.ipb-expertise.fr/expertise/retrait-gonflement-argiles',
    type: 'article',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const sommaire = [
  { num: '01', titre: "Qu'est-ce que le retrait-gonflement des argiles", href: '#qu-est-ce-que' },
  { num: '02', titre: 'Identification sur un bâti', href: '#identification' },
  { num: '03', titre: 'Le protocole de diagnostic', href: '#protocole' },
  { num: '04', titre: 'Les options de traitement', href: '#options' },
  { num: '05', titre: 'La reconnaissance catastrophe naturelle', href: '#cat-nat' },
  { num: '06', titre: 'Cas suivi', href: '#cas-suivi' },
];

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.ipb-expertise.fr' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Expertise',
      item: 'https://www.ipb-expertise.fr/expertise/fissures',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Retrait-gonflement des argiles',
      item: 'https://www.ipb-expertise.fr/expertise/retrait-gonflement-argiles',
    },
  ],
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Le retrait-gonflement des argiles — pathologie, diagnostic, traitement',
  description:
    "Monographie clinique du retrait-gonflement des argiles par l'Institut de Pathologie du Bâtiment.",
  url: 'https://www.ipb-expertise.fr/expertise/retrait-gonflement-argiles',
  author: { '@type': 'Organization', name: 'IPB — Institut de Pathologie du Bâtiment' },
  publisher: {
    '@type': 'Organization',
    name: 'IPB — Institut de Pathologie du Bâtiment',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.ipb-expertise.fr/images/IPB_Logo_HD.png',
    },
  },
  inLanguage: 'fr-FR',
};

export default function RGAPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-14 lg:pb-20">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Monographie</Eyebrow>
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
                  Le retrait-gonflement<br />
                  <em>des argiles.</em>
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
                  Pathologie, diagnostic, traitement.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.14}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted max-w-[640px]">
                  Le retrait-gonflement des argiles est, depuis vingt ans, la première cause de sinistres déclarés au titre de la garantie catastrophe naturelle en France. Cette monographie synthétise ce que l'institut sait du phénomène : son mécanisme géotechnique, les signes par lesquels il s'exprime sur un bâti, le protocole de diagnostic que nous appliquons, et les options de traitement quand l'intervention devient nécessaire.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* SOMMAIRE */}
        <section className="bg-ipb-white border-y border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 py-10">
            <RevealOnScroll>
              <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] uppercase mb-5">
                Sommaire
              </p>
              <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {sommaire.map((item) => (
                  <li key={item.num} className="grid grid-cols-[40px_1fr] gap-3">
                    <span className="font-serif text-ipb-orange-d text-[13px] font-bold tracking-wider pt-0.5">
                      {item.num}
                    </span>
                    <a
                      href={item.href}
                      className="text-[14px] leading-[1.6] text-ipb-text hover:text-ipb-orange-d transition-colors"
                    >
                      {item.titre}
                    </a>
                  </li>
                ))}
              </ol>
            </RevealOnScroll>
          </div>
        </section>

        {/* SECTION 1 — QU'EST-CE QUE LE RGA */}
        <section id="qu-est-ce-que" className="bg-ipb-white py-20 lg:py-28 scroll-mt-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] uppercase mb-4">
                Section 01
              </p>
              <h2
                className="font-serif text-ipb-text mb-8"
                style={{
                  fontSize: 'clamp(28px, 2.6vw, 38px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.022em',
                  fontWeight: 700,
                }}
              >
                Qu'est-ce que le retrait-gonflement des argiles
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.06}>
              <div className="space-y-6 text-[15px] leading-[1.9] font-light text-ipb-text">
                <p>
                  Les sols argileux ont une caractéristique physico-chimique particulière : ils retiennent l'eau dans la structure microscopique de leurs feuillets. Quand l'argile s'hydrate, elle gonfle ; quand elle se déshydrate, elle se rétracte. Ce comportement, parfaitement réversible à l'échelle du grain, devient lourd de conséquences à l'échelle d'une parcelle bâtie : un sol qui passe de l'état humide à l'état sec en été perd plusieurs centimètres de volume, puis les retrouve à l'hiver suivant. Ce sont ces mouvements verticaux et différentiels qui se transmettent aux fondations des bâtiments.
                </p>
                <p>
                  Le phénomène est saisonnier. Il s'amplifie pendant les épisodes de sécheresse prolongée — quand la teneur en eau du sol descend au-delà de ce que le bâti a connu pendant ses premières années de vie. Une maison construite à l'équilibre hydrique des années 1990 peut entrer en pathologie après une sécheresse sévère, parce que le sol qui la soutenait se rétracte plus qu'il ne l'a jamais fait. Les épisodes de 2003, 2018, 2019, 2022 et 2023 ont fait basculer un grand nombre de bâtis dans cette catégorie, en particulier en Occitanie et Nouvelle-Aquitaine.
                </p>
                <p>
                  Le contexte géologique se lit sur la <Link href="/lexique#carte-brgm" className="text-ipb-orange-d underline hover:no-underline">carte BRGM des aléas</Link>, consultable gratuitement sur Géorisques. Trois niveaux d'aléa sont distingués : faible, moyen, fort. En Haute-Garonne, plus de 70 % du territoire communal est classé en aléa moyen ou fort. La carte ne dit pas qu'un bâti situé en aléa fort connaîtra nécessairement des désordres ; elle dit qu'il y est exposé.
                </p>
                <p>
                  L'impact se concentre sur les <Link href="/lexique#fondation-superficielle" className="text-ipb-orange-d underline hover:no-underline">fondations superficielles</Link>, c'est-à-dire celles qui prennent appui dans les premiers mètres de sol — précisément ceux qui se rétractent. Les bâtiments fondés profondément, sur pieux ou micropieux ancrés sous la zone active de l'argile, sont peu concernés. Les bâtis anciens dépourvus de chaînage adapté, ou ceux dont l'étude de sol initiale a sous-estimé la nature argileuse du terrain, sont les plus vulnérables.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* SECTION 2 — IDENTIFICATION */}
        <section id="identification" className="bg-ipb-cream py-20 lg:py-28 scroll-mt-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] uppercase mb-4">
                Section 02
              </p>
              <h2
                className="font-serif text-ipb-text mb-8"
                style={{
                  fontSize: 'clamp(28px, 2.6vw, 38px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.022em',
                  fontWeight: 700,
                }}
              >
                Identification sur un bâti
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.06}>
              <p className="text-[15px] leading-[1.9] font-light text-ipb-text mb-8">
                Le retrait-gonflement des argiles laisse une signature reconnaissable. Quatre familles de signes orientent le diagnostic clinique avant toute mesure instrumentée.
              </p>
            </RevealOnScroll>

            <div className="space-y-8">
              <RevealOnScroll delay={0.08}>
                <article className="border-l-2 border-ipb-orange pl-6">
                  <h3 className="font-serif text-ipb-text font-bold text-[18px] leading-tight mb-2">
                    Localisation des fissures
                  </h3>
                  <p className="text-[14px] leading-[1.85] font-light text-ipb-muted">
                    Les fissures liées au retrait-gonflement apparaissent aux points stratégiques du bâti : angles extérieurs, encadrements de portes et fenêtres, zones de transition entre deux corps de bâtiment, jonction entre extension et bâti d'origine. Les fissures de pleine façade sont moins fréquentes ; quand elles existent, elles signalent un mouvement plus avancé.
                  </p>
                </article>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <article className="border-l-2 border-ipb-orange pl-6">
                  <h3 className="font-serif text-ipb-text font-bold text-[18px] leading-tight mb-2">
                    Forme typique des fissures
                  </h3>
                  <p className="text-[14px] leading-[1.85] font-light text-ipb-muted">
                    Sur les maçonneries traditionnelles (briques, pierre, parpaing), la fissure suit les joints en formant un escalier — c'est la <Link href="/lexique#lezarde" className="text-ipb-orange-d underline hover:no-underline">lézarde</Link> classique. Sur les constructions en béton ou les enduits monolithiques, on observe plus volontiers des fissures verticales ou obliques, parfois traversantes. La largeur dépasse le millimètre dès que le mouvement devient mesurable.
                  </p>
                </article>
              </RevealOnScroll>

              <RevealOnScroll delay={0.12}>
                <article className="border-l-2 border-ipb-orange pl-6">
                  <h3 className="font-serif text-ipb-text font-bold text-[18px] leading-tight mb-2">
                    Saisonnalité de l'évolution
                  </h3>
                  <p className="text-[14px] leading-[1.85] font-light text-ipb-muted">
                    Les fissures de retrait-gonflement oscillent avec les saisons. Elles tendent à s'élargir en fin d'été, quand le sol est le plus rétracté, et à se refermer partiellement en hiver, quand le sol est de nouveau gorgé d'eau. Cette respiration mesurable est un marqueur diagnostique fort : un fissuromètre adhésif posé en juin et relu en janvier le révèle clairement.
                  </p>
                </article>
              </RevealOnScroll>

              <RevealOnScroll delay={0.14}>
                <article className="border-l-2 border-ipb-orange pl-6">
                  <h3 className="font-serif text-ipb-text font-bold text-[18px] leading-tight mb-2">
                    Indices secondaires
                  </h3>
                  <p className="text-[14px] leading-[1.85] font-light text-ipb-muted">
                    Le tassement différentiel se propage à l'intérieur du bâti. Planchers qui s'inclinent légèrement, seuils de portes déformés, plinthes qui se décollent, carrelage qui se descelle, portes ou fenêtres qui coincent depuis quelques saisons : autant d'indices qui, croisés à des fissures externes, confirment l'origine structurelle du désordre.
                  </p>
                </article>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* SECTION 3 — PROTOCOLE DE DIAGNOSTIC */}
        <section id="protocole" className="bg-ipb-white py-20 lg:py-28 scroll-mt-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] uppercase mb-4">
                Section 03
              </p>
              <h2
                className="font-serif text-ipb-text mb-8"
                style={{
                  fontSize: 'clamp(28px, 2.6vw, 38px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.022em',
                  fontWeight: 700,
                }}
              >
                Le protocole de diagnostic
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.06}>
              <p className="text-[15px] leading-[1.9] font-light text-ipb-text mb-8">
                Le diagnostic d'un désordre lié au retrait-gonflement croise des observations sur site et des éléments documentaires consultés en cabinet. Le protocole comporte cinq étapes.
              </p>
            </RevealOnScroll>

            <ol className="space-y-6">
              {[
                {
                  num: '01',
                  titre: 'Visite sur site avec mesures',
                  desc: "Lecture du bâti, mesures au fissuromètre adhésif sur les principales fissures, prise de photos datées et géolocalisées. Les mesures sont reprises à plusieurs points de chaque tracé.",
                },
                {
                  num: '02',
                  titre: 'Consultation de la carte BRGM communale',
                  desc: "Vérification du niveau d'aléa retrait-gonflement (faible, moyen, fort) attribué à la commune et, quand l'échelle le permet, à la parcelle. La carte est publique et consultable sur Géorisques.",
                },
                {
                  num: '03',
                  titre: 'Vérification des arrêtés cat-nat',
                  desc: "Examen des arrêtés de catastrophe naturelle « sécheresse » dont la commune a bénéficié sur les dix dernières années, avec leurs périodes précises. Cette information éclaire la chronologie des désordres.",
                },
                {
                  num: '04',
                  titre: 'Examen des fondations',
                  desc: "Quand l'accès le permet, sondage à la tarière manuelle au pied des zones les plus touchées pour vérifier la nature et la profondeur des fondations. Une étude de sol complémentaire peut être recommandée si le diagnostic le justifie.",
                },
                {
                  num: '05',
                  titre: 'Étude des cycles d\'évolution',
                  desc: "Si les éléments transmis ne suffisent pas à conclure, mise en place de témoins de surveillance (fissuromètres adhésifs, jauges en plâtre) et lecture sur deux cycles été-hiver minimum. C'est la mesure dans le temps qui qualifie définitivement le désordre.",
                },
              ].map((etape, i) => (
                <RevealOnScroll key={etape.num} delay={i * 0.05}>
                  <li className="grid grid-cols-[40px_1fr] gap-5 items-start pb-6 border-b border-ipb-rule last:border-b-0">
                    <span className="font-serif text-ipb-orange text-[14px] font-bold tracking-wider pt-1">
                      {etape.num}
                    </span>
                    <div>
                      <h3 className="font-serif text-ipb-text text-[17px] font-bold leading-tight mb-2">
                        {etape.titre}
                      </h3>
                      <p className="text-[14px] leading-[1.85] font-light text-ipb-muted">
                        {etape.desc}
                      </p>
                    </div>
                  </li>
                </RevealOnScroll>
              ))}
            </ol>
          </div>
        </section>

        {/* SECTION 4 — OPTIONS DE TRAITEMENT */}
        <section id="options" className="bg-ipb-cream py-20 lg:py-28 scroll-mt-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] uppercase mb-4">
                Section 04
              </p>
              <h2
                className="font-serif text-ipb-text mb-8"
                style={{
                  fontSize: 'clamp(28px, 2.6vw, 38px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.022em',
                  fontWeight: 700,
                }}
              >
                Les options de traitement
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.06}>
              <p className="text-[15px] leading-[1.9] font-light text-ipb-text mb-10">
                Le diagnostic conditionne la nature du traitement. Plusieurs voies existent, chacune adaptée à un profil de désordre. Les ordres de grandeur de coût ci-dessous correspondent à des chantiers types en Occitanie en 2025 ; le devis précis dépend de la configuration du bâti et de l'accessibilité.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm bg-ipb-white border border-ipb-rule">
                  <thead>
                    <tr>
                      <th className="border-b border-ipb-rule px-5 py-4 text-left font-serif text-ipb-orange text-[12px] tracking-[0.18em] uppercase">
                        Solution
                      </th>
                      <th className="border-b border-ipb-rule px-5 py-4 text-left font-serif text-ipb-orange text-[12px] tracking-[0.18em] uppercase">
                        Indication
                      </th>
                      <th className="border-b border-ipb-rule px-5 py-4 text-left font-serif text-ipb-orange text-[12px] tracking-[0.18em] uppercase">
                        Ordre de grandeur
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-ipb-rule">
                      <td className="px-5 py-5 align-top font-serif font-bold text-ipb-text">
                        Surveillance
                      </td>
                      <td className="px-5 py-5 align-top text-ipb-muted font-light">
                        Désordre stabilisé, faible amplitude, absence d'indice secondaire.
                      </td>
                      <td className="px-5 py-5 align-top text-ipb-muted font-light">—</td>
                    </tr>
                    <tr className="border-b border-ipb-rule">
                      <td className="px-5 py-5 align-top font-serif font-bold text-ipb-text">
                        <Link href="/lexique#agrafage-structurel" className="hover:underline">
                          Agrafage structurel
                        </Link>
                      </td>
                      <td className="px-5 py-5 align-top text-ipb-muted font-light">
                        Fissures actives sur maçonnerie, désordre mesurable, fondations stables.
                      </td>
                      <td className="px-5 py-5 align-top text-ipb-muted font-light">
                        12 000 à 18 000 €
                      </td>
                    </tr>
                    <tr className="border-b border-ipb-rule">
                      <td className="px-5 py-5 align-top font-serif font-bold text-ipb-text">
                        <Link href="/lexique#reprise-en-sous-oeuvre" className="hover:underline">
                          Reprise en sous-œuvre
                        </Link>{' '}
                        par micropieux
                      </td>
                      <td className="px-5 py-5 align-top text-ipb-muted font-light">
                        Tassement actif majeur (supérieur à 10 cm), fondations défaillantes.
                      </td>
                      <td className="px-5 py-5 align-top text-ipb-muted font-light">
                        40 000 à 80 000 €
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-5 align-top font-serif font-bold text-ipb-text">
                        <Link href="/lexique#drainage-peripherique" className="hover:underline">
                          Drainage périphérique
                        </Link>
                      </td>
                      <td className="px-5 py-5 align-top text-ipb-muted font-light">
                        Désordre lié à l'eau (ruissellement, infiltrations) plus qu'à l'argile elle-même.
                      </td>
                      <td className="px-5 py-5 align-top text-ipb-muted font-light">
                        Variable selon la profondeur des fondations
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.14}>
              <p className="text-[14px] leading-[1.85] font-light text-ipb-muted mt-8">
                Les solutions ne sont pas exclusives. Un agrafage structurel peut être complété d'un drainage périphérique si l'apport d'eau aggrave le mouvement. Une reprise par micropieux peut suivre une période de surveillance qui aurait conclu à l'aggravation. Le choix dépend du diagnostic, jamais d'un produit qu'on chercherait à vendre.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* SECTION 5 — RECONNAISSANCE CAT-NAT */}
        <section id="cat-nat" className="bg-ipb-white py-20 lg:py-28 scroll-mt-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] uppercase mb-4">
                Section 05
              </p>
              <h2
                className="font-serif text-ipb-text mb-8"
                style={{
                  fontSize: 'clamp(28px, 2.6vw, 38px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.022em',
                  fontWeight: 700,
                }}
              >
                La reconnaissance catastrophe naturelle
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.06}>
              <div className="space-y-6 text-[15px] leading-[1.9] font-light text-ipb-text">
                <p>
                  Le régime français de catastrophe naturelle, institué par la loi du 13 juillet 1982, permet l'indemnisation par l'assurance des dommages causés à un bien par un phénomène naturel d'intensité anormale. La sécheresse y figure depuis 1989. La reconnaissance prend la forme d'un arrêté interministériel publié au Journal officiel, qui précise les communes concernées et la période couverte.
                </p>
                <p>
                  Vérifier si votre commune est reconnue se fait sur Géorisques, qui maintient un historique consultable des arrêtés. Une commune peut être reconnue pour une période donnée et non pour une autre — l'arrêté est précis. La déclaration auprès de l'assureur doit intervenir dans les dix jours suivant la publication de l'arrêté concerné. La franchise légale, fixée à 1 520 €, est applicable.
                </p>
                <p>
                  Si votre commune est reconnue, notre rapport documente le lien entre vos désordres et le retrait-gonflement, ce qui constitue une pièce technique pour votre dossier auprès de votre assureur. Il qualifie les désordres, mesure leur évolution, identifie le mécanisme géotechnique, et préconise les traitements adaptés. C'est une expertise technique. Les questions de droit, de procédure et de chiffrage relèvent ensuite de votre interlocuteur d'assurance et, si besoin, d'un avocat spécialisé.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* SECTION 6 — CAS SUIVI */}
        <section id="cas-suivi" className="bg-ipb-cream py-20 lg:py-28 scroll-mt-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] uppercase mb-4">
                Section 06
              </p>
              <h2
                className="font-serif text-ipb-text mb-8"
                style={{
                  fontSize: 'clamp(28px, 2.6vw, 38px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.022em',
                  fontWeight: 700,
                }}
              >
                Cas suivi
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.06}>
              <article className="bg-ipb-white border border-ipb-rule rounded-[6px] p-8 lg:p-12 space-y-6 text-[15px] leading-[1.9] font-light text-ipb-text">
                <p className="font-serif font-bold text-ipb-text text-[18px] leading-tight">
                  Tournefeuille, 2024 — Maison T4, 110 m², construite en 1995.
                </p>

                <div>
                  <h3 className="font-serif text-ipb-orange-d text-[11px] font-bold tracking-[0.18em] uppercase mb-3">
                    Désordre constaté
                  </h3>
                  <p>
                    Fissure traversante en escalier de 12 mm sur la façade nord-est. Apparition progressive depuis l'été 2022. Commune reconnue en arrêté de catastrophe naturelle « sécheresse » 2022.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-ipb-orange-d text-[11px] font-bold tracking-[0.18em] uppercase mb-3">
                    Diagnostic
                  </h3>
                  <p>
                    Tassement différentiel actif lié au retrait-gonflement des argiles. Carte BRGM : aléa fort sur la commune. Mesures au fissuromètre adhésif sur deux cycles complets confirmant l'évolution active. Sondage à la tarière au pied du pignon concerné : fondations superficielles à 60 cm de profondeur, sol argileux marqué.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-ipb-orange-d text-[11px] font-bold tracking-[0.18em] uppercase mb-3">
                    Préconisation
                  </h3>
                  <p>
                    Agrafage structurel par 18 agrafes inox + matage à la résine fibrée, complété par un ravalement souple sur la zone traitée. Pose de témoins de surveillance pour le suivi post-intervention.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-ipb-orange-d text-[11px] font-bold tracking-[0.18em] uppercase mb-3">
                    Suivi
                  </h3>
                  <p>
                    Sur deux cycles été-hiver post-intervention, aucune évolution constatée. Bâti stabilisé.
                  </p>
                </div>
              </article>
            </RevealOnScroll>
          </div>
        </section>

        {/* PIED ÉDITORIAL — sobre */}
        <section className="bg-ipb-white py-20 lg:py-28">
          <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
            <RevealOnScroll>
              <p className="text-[15px] leading-[1.9] font-light text-ipb-text">
                Si vous suspectez un retrait-gonflement des argiles sur votre bâti, vous pouvez décrire votre situation via le{' '}
                <Link href="/diagnostic" className="text-ipb-orange-d underline hover:no-underline">
                  pré-diagnostic en ligne
                </Link>
                . Un ingénieur de l'institut le consulte sous quarante-huit heures.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
