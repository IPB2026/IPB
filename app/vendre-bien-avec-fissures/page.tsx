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
  title:
    "Rapport d'expertise fissures pour vente immobilière · Toulouse · IPB",
  description:
    'Vous vendez un bien avec fissures. Notre rapport documente les désordres, qualifie leur nature structurelle ou esthétique, et sécurise votre transaction. Visite sous 72 heures en Occitanie.',
  keywords: [
    'vendre maison avec fissures',
    'rapport expertise fissure pour vendre',
    'diagnostic fissure obligatoire vente',
    'fissures et compromis de vente',
    'décote maison fissure',
    'rapport fissures vente Toulouse',
    'expertise fissures avant mise en vente',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/vendre-bien-avec-fissures',
  },
  openGraph: {
    title:
      "Rapport d'expertise fissures pour vente immobilière · Toulouse · IPB",
    description:
      'Notre rapport documente les désordres, qualifie leur nature, et présente les éléments factuels qui sécurisent la transaction.',
    url: 'https://www.ipb-expertise.fr/vendre-bien-avec-fissures',
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
    titre: 'Avant la mise en vente',
    desc: "Vous savez que votre bien comporte des fissures. Vous préférez les documenter en amont pour les présenter sereinement à vos visiteurs. Le rapport établi à froid, avec mesures et qualification, devient une pièce du dossier de vente.",
  },
  {
    titre: 'Pendant les visites',
    desc: "Plusieurs visiteurs ont commenté les fissures. Vous percevez que cela freine. Un rapport indépendant transforme une discussion émotionnelle en discussion technique : votre bien n'est plus suspect, il est documenté.",
  },
  {
    titre: 'Après une rétractation ou une renégociation',
    desc: "Un acheteur s'est rétracté ou propose une décote significative en évoquant les fissures. Le rapport permet de qualifier précisément l'enjeu et, le cas échéant, de présenter à un autre acheteur les éléments objectifs.",
  },
];

const contenuRapport = [
  'Photos datées et géolocalisées de chaque désordre identifié',
  'Mesures au fissuromètre, dimensionnement précis',
  'Qualification de chaque fissure : esthétique, superficielle, ou structurelle',
  "Identification des causes probables (retrait-gonflement des argiles, tassement différentiel, défaut d'exécution, etc.)",
  'Préconisations chiffrées de réparation, le cas échéant',
  "Avis de l'ingénieur structure sur la stabilité globale du bâti",
  'Document conforme aux attentes des notaires, agents immobiliers et acquéreurs',
];

const etapes = [
  {
    titre: 'Premier contact',
    desc: "Vous décrivez votre situation. Nous évaluons en 24 heures si le dossier nécessite une visite.",
  },
  {
    titre: 'Visite sur site',
    desc: "Notre ingénieur structure se déplace sous 72 heures en moyenne. Mesures, photos, échange direct.",
  },
  {
    titre: 'Rédaction du rapport',
    desc: 'Document remis sous 3 à 5 jours ouvrés après la visite.',
  },
  {
    titre: 'Remise et accompagnement',
    desc: "Le rapport vous est remis. Nous restons disponibles pour répondre aux questions de votre notaire ou agent immobilier.",
  },
  {
    titre: 'Si nécessaire, traitement',
    desc: "Si le rapport préconise des travaux, nous pouvons les réaliser. La décennale couvre l'étude et l'exécution.",
  },
];

const faqItems = [
  {
    question:
      "Mon agent immobilier dit qu'un diagnostic n'est pas obligatoire. Pourquoi en faire un ?",
    answer:
      "Aucun diagnostic fissures n'est légalement obligatoire pour vendre. Mais en pratique, présenter un rapport indépendant à un acheteur transforme la discussion. Il ne s'interroge plus, il lit. Dans les ventes que nous avons accompagnées, c'est souvent ce qui a permis à la transaction de se conclure au prix prévu.",
  },
  {
    question: 'Combien de temps avant ma vente faut-il faire le rapport ?',
    answer:
      'Idéalement 3 à 4 semaines avant la mise en ligne ou la première visite. Cela laisse le temps de la visite, du rapport, et permet de présenter le document dès la première visite.',
  },
  {
    question: 'Le rapport peut-il aussi servir si je mets en location ?',
    answer:
      "Oui. Pour une mise en location, le rapport est moins fréquemment demandé, mais il sécurise le bailleur en cas de litige sur l'état du bâti.",
  },
  {
    question: 'Puis-je présenter le rapport au notaire ?',
    answer:
      "Oui, le rapport est rédigé dans les formes attendues par les notaires et peut être annexé à l'acte si vous le souhaitez.",
  },
  {
    question:
      'Si le rapport identifie des travaux nécessaires, dois-je les faire avant de vendre ?',
    answer:
      "Non. Vous avez le choix : faire les travaux et vendre un bien réparé, ou présenter le rapport et négocier la décote correspondante avec l'acheteur. Dans les deux cas, vous avez les éléments pour décider.",
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: "Rapport d'expertise fissures pour vente immobilière",
  description:
    "Diagnostic instrumenté des fissures, qualification structurelle ou esthétique, et rédaction d'un rapport conforme aux attentes des notaires et agents immobiliers.",
  url: 'https://www.ipb-expertise.fr/vendre-bien-avec-fissures',
  serviceType: 'Expertise en pathologie du bâtiment — vente immobilière',
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
      name: 'Vendre un bien avec fissures',
      item: 'https://www.ipb-expertise.fr/vendre-bien-avec-fissures',
    },
  ],
};

export default function VendreBienAvecFissuresPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script
        id="service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
                <Eyebrow>Vendeur</Eyebrow>
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
                  Vendre un bien<br />
                  <em>avec fissures.</em>
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
                  Le rapport technique qui sécurise la transaction.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.14}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[640px]">
                  Quand un acheteur potentiel remarque des fissures, la discussion s'enlise. Le rapport de l'institut documente précisément les désordres, qualifie leur nature, et présente les éléments factuels qui permettent à votre vente de se conclure dans les conditions prévues.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Programmer une visite pour ma vente
                  </MagneticButton>
                  <MagneticButton href="#cas-de-vente" variant="ghost">
                    Lire un cas de vente similaire
                  </MagneticButton>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.26} variant="subtle">
                <p className="text-[12px] leading-[1.7] tracking-[0.02em] text-ipb-light">
                  Visite sous 72 heures · Rapport remis sous 3 à 5 jours ouvrés · Conforme aux attentes des notaires et agents immobiliers
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* SECTION 1 — Les trois moments d'un vendeur */}
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
                  À chaque étape de la vente,<br />
                  <em>un rôle pour le rapport.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
              {moments.map((m, i) => (
                <RevealOnScroll key={m.titre} delay={i * 0.06}>
                  <article className="border-t border-ipb-rule pt-8">
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

        {/* SECTION 2 — Ce que contient le rapport */}
        <section className="bg-ipb-cream py-24 lg:py-32">
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
                  Le rapport est rédigé par l'ingénieur qui a mené la visite. Il est livré au format PDF, paginé, signé numériquement, avec les photos en pleine résolution. Il peut être annexé à un acte ou présenté à un notaire.
                </p>
              </RevealOnScroll>

              <div className="lg:col-span-7">
                <RevealOnScroll delay={0.08}>
                  <div className="bg-ipb-white border border-ipb-rule rounded-[6px] p-8 lg:p-10">
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

        {/* SECTION 3 — Cas suivi (cas représentatif rédigé en interne, à remplacer par un cas réel quand disponible) */}
        <section id="cas-de-vente" className="bg-ipb-white py-24 lg:py-32 scroll-mt-24">
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
                  Léguevin · Maison T4 de plain-pied<br />
                  <em>2024.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.08}>
              <article className="bg-ipb-cream border border-ipb-rule rounded-[6px] p-8 lg:p-12 space-y-6 text-[15px] leading-[1.9] font-light text-ipb-text">
                <div>
                  <h3 className="font-serif text-ipb-orange-d text-[11px] font-bold tracking-[0.18em] uppercase mb-3">
                    Contexte
                  </h3>
                  <p>
                    Succession en vue d'une mise en vente. Maison de 1992 sur dalle, 110 m², façade enduite. Une fissure verticale traversante de 8 mm sur le pignon nord-est et plusieurs fissures fines au pourtour des ouvertures. Trois visites avaient été annulées par les acheteurs après remarque sur la stabilité visible du bâti.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-ipb-orange-d text-[11px] font-bold tracking-[0.18em] uppercase mb-3">
                    Intervention
                  </h3>
                  <p>
                    Visite sur site programmée six jours après le premier contact. Mesures au fissuromètre adhésif sur les trois principales fissures, sondage à la tarière manuelle au pied du pignon concerné, consultation de la carte BRGM (commune classée en aléa moyen au retrait-gonflement des argiles, arrêté de catastrophe naturelle « sécheresse » 2022). Rédaction du rapport en onze jours, qualifiant les désordres comme stabilisés et liés à un épisode de retrait passé, avec préconisation de surveillance sur deux cycles saisonniers et matage cosmétique des fissures les plus visibles.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-ipb-orange-d text-[11px] font-bold tracking-[0.18em] uppercase mb-3">
                    Issue
                  </h3>
                  <p>
                    Le rapport a été présenté en quatrième visite. La transaction s'est conclue au prix annoncé, sans demande de décote ; le rapport a été annexé au compromis à la demande du notaire.
                  </p>
                </div>
              </article>
            </RevealOnScroll>
          </div>
        </section>

        {/* SECTION 4 — Notre processus pour un dossier vente */}
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
                  <em>du premier contact à la remise.</em>
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

        {/* SECTION 5 — Tarif et délai */}
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
                  Trois semaines, du premier contact<br />
                  <em>au rapport en main.</em>
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
                    Diagnostic instrumenté complet. Le tarif définitif vous est confirmé à l'issue du premier échange selon la complexité du dossier.
                  </p>
                </div>

                <div className="pt-8 border-t border-ipb-rule">
                  <h3 className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-3">
                    DÉLAI
                  </h3>
                  <p className="text-[15px] leading-[1.85] font-light text-ipb-text">
                    Visite sous 72 heures · Rapport remis sous 3 à 5 jours ouvrés après visite · Total : moins de deux semaines entre votre demande et le rapport en main.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* SECTION 6 — FAQ vendeur */}
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
                  Sur la vente<br />
                  <em>d'un bien avec fissures.</em>
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
                Une vente, un rapport,<br />
                <em>une transaction qui se conclut.</em>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[600px] mx-auto">
                Décrivez-nous votre situation et le calendrier de votre vente. Nous vous indiquons sous 24 heures si le dossier peut être traité dans vos délais.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.14}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton href="/diagnostic" variant="primary">
                  Programmer une visite
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
