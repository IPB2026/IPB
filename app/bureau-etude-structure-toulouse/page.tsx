import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bureau d'études structure à Toulouse · IPN, HEB, mur porteur · Institut IPB",
  description: "Confiez votre étude structure au bureau d'études intégré IPB à Toulouse. Note de calcul IPN/HEB, dimensionnement de poutre, expertise mur porteur, ouvrages neufs et rénovation. Décennale AXA, réponse 24 h.",
  keywords: [
    'bureau études structure toulouse',
    'bureau études structure haute-garonne',
    'note de calcul IPN toulouse',
    'dimensionnement poutre HEB',
    'ingénieur structure toulouse',
    'calcul mur porteur toulouse',
    'étude béton armé toulouse',
    'bureau études bâtiment toulouse',
    'expertise structure 31',
    'note de calcul ouverture mur',
  ],
  alternates: { canonical: 'https://www.ipb-expertise.fr/bureau-etude-structure-toulouse' },
  openGraph: {
    title: "Bureau d'études structure · IPB Toulouse",
    description: "Confiez votre étude structure à notre ingénieur à Toulouse. Note de calcul opposable, dimensionnement IPN/HEB, étude charge, contrôle des ouvrages. Décennale AXA.",
    url: 'https://www.ipb-expertise.fr/bureau-etude-structure-toulouse',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "IPB Bureau d'études structure",
  "@id": "https://www.ipb-expertise.fr/bureau-etude-structure-toulouse#service",
  "description": "Bureau d'études structure à Toulouse : note de calcul IPN/HEB, dimensionnement de poutre, expertise mur porteur, ouvrages neufs et rénovation.",
  "areaServed": [
    { "@type": "City", "name": "Toulouse" },
    { "@type": "AdministrativeArea", "name": "Haute-Garonne" },
    { "@type": "AdministrativeArea", "name": "Tarn-et-Garonne" },
    { "@type": "AdministrativeArea", "name": "Gers" },
    { "@type": "AdministrativeArea", "name": "Tarn" },
  ],
  "provider": { "@type": "LocalBusiness", "name": "IPB - Institut de Pathologie du Bâtiment", "telephone": "+33582953375" },
};

const prestations = [
  {
    titre: 'Dimensionnement IPN, HEB ou IPE',
    desc: "Calcul des charges reprises, choix de la poutre, vérification de la flèche et du déversement selon les normes en vigueur (Eurocode). Note de calcul signée par notre ingénieur.",
  },
  {
    titre: 'Étude de mur porteur',
    desc: "Identification du caractère porteur, descente de charges, méthode d'étaiement, plan d'exécution. Document opposable face à un syndic ou une assurance.",
  },
  {
    titre: 'Diagnostic structure',
    desc: "Avant achat, après sinistre, sur fissures et désordres. Rapport reconnu par les assurances et les tribunaux.",
  },
  {
    titre: 'Béton armé',
    desc: "Plancher, longrine, semelle, poteau. Calculs Eurocode 2, plans de ferraillage. Pour ouvrages neufs comme rénovations lourdes.",
  },
  {
    titre: "Mission de maîtrise d'œuvre",
    desc: "Conception, consultation des entreprises, suivi de chantier, réception. Pour les rénovations lourdes intégrant plusieurs corps d'état.",
  },
  {
    titre: 'Contre-expertise',
    desc: "Confrontation avec un rapport d'expert d'assurance, contestation amiable ou judiciaire. Documents techniques opposables.",
  },
];

const faqItems = [
  {
    question: "Qu'est-ce qu'une note de calcul, et pourquoi est-elle opposable ?",
    answer: "Une note de calcul est un document technique signé par un ingénieur structure. Elle justifie, selon les Eurocodes, le dimensionnement d'un ouvrage (poutre, plancher, mur porteur). Elle engage la responsabilité de son auteur et de son assureur, ce qui la rend opposable à une assurance, un syndic ou un tribunal.",
  },
  {
    question: "Sous quel délai un calcul de poutre est-il rendu ?",
    answer: "Pour une étude standard (poutre IPN ou HEB sur portée courante), notre bureau d'études rend la note de calcul sous 5 à 7 jours ouvrés après la visite. Les dossiers complexes ou comportant plusieurs ouvrages peuvent demander 10 à 15 jours.",
  },
  {
    question: "Travaillez-vous avec les architectes d'intérieur et marchands de biens ?",
    answer: "Oui. L'institut intervient régulièrement en sous-traitance technique pour les architectes d'intérieur (projets « espace ouvert »), les marchands de biens (rénovations rapides avant revente) et les agences immobilières (rapport débloquant une vente sur fissure).",
  },
  {
    question: "Le calcul technique est-il inclus dans le devis travaux ?",
    answer: "Quand l'institut réalise les travaux derrière, oui : l'étude technique est intégrée à la prestation globale et facturée une seule fois. Si vous voulez seulement la note de calcul (sans travaux), elle est facturée séparément, avec un devis transparent remis sous 24 h.",
  },
  {
    question: "Êtes-vous couverts en décennale ?",
    answer: "Oui. L'institut IPB est couvert par une garantie décennale AXA France (police n° 10564321) qui couvre à la fois l'étude technique et les travaux exécutés derrière. Une attestation est remise avec chaque devis.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer },
  })),
};

export default function BureauEtudeStructurePage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="bureau-etudes-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Bureau d'études structure intégré</Eyebrow>
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
                  Bureau d'études structure&nbsp;à Toulouse.<br />
                  <em>IPN, HEB, mur porteur.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  Calcul technique signé par notre ingénieur, dimensionnement de la poutre (IPN, HEB ou IPE), expertise mur porteur, contrôle des ouvrages. Nous intervenons aux côtés des particuliers, des architectes, des marchands de biens et des entreprises du bâtiment.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Demander un calcul de poutre
                  </MagneticButton>
                  <MagneticButton href="/expertise/mur-porteur" variant="ghost">
                    Voir notre méthode
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* PRESTATIONS */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Nos prestations</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Six missions structurelles,<br /><em>une même rigueur Eurocode.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ipb-rule border border-ipb-rule">
              {prestations.map((p, i) => (
                <RevealOnScroll key={p.titre} delay={i * 0.04}>
                  <article className="bg-ipb-white p-8 lg:p-10 h-full flex flex-col">
                    <span className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-4">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-ipb-text font-bold text-[20px] leading-tight mb-3">
                      {p.titre}
                    </h3>
                    <p className="text-[14px] leading-[1.85] font-light text-ipb-muted">
                      {p.desc}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* CIBLES B2B + PARTICULIERS */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Pour qui travaillons-nous</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Particuliers, architectes,<br /><em>marchands de biens, agences.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {[
                {
                  href: '/partenaires/architectes-interieur',
                  titre: "Architectes d'intérieur & décorateurs",
                  desc: "Vos projets « espace ouvert » nécessitent une étude structure : nous sommes votre partenaire technique sous-traité, avec décennale active et calendrier respecté.",
                },
                {
                  href: '/partenaires/marchands-de-biens',
                  titre: 'Marchands de biens & investisseurs',
                  desc: "Acheter un T3 toulousain pour ouvrir cuisine et salon avant revente : nous chiffrons et exécutons en délai serré, dossier complet remis à la livraison.",
                },
                {
                  href: '/partenaires/agences-immobilieres',
                  titre: 'Agences immobilières',
                  desc: "Une vente bloquée à cause d'une fissure : notre rapport rassure l'acquéreur, débloque la transaction, et le diagnostic est déductible des travaux.",
                },
                {
                  href: '/diagnostic',
                  titre: 'Particuliers',
                  desc: "Votre projet personnel : ouverture de mur porteur, création de baie vitrée, agrafage de fissures, expertise avant achat. Un seul interlocuteur du calcul à la livraison.",
                },
              ].map((cible, i) => (
                <RevealOnScroll key={cible.titre} delay={i * 0.06}>
                  <Link
                    href={cible.href}
                    className="block bg-ipb-white border border-ipb-rule rounded-[6px] p-8 lg:p-10 h-full hover:shadow-[0_12px_36px_rgba(11,24,38,0.07)] transition-shadow duration-500"
                  >
                    <h3 className="font-serif text-ipb-text font-bold text-[22px] leading-tight mb-4">
                      {cible.titre}
                    </h3>
                    <p className="text-[14px] leading-[1.85] font-light text-ipb-muted mb-6">
                      {cible.desc}
                    </p>
                    <span className="text-[13px] text-ipb-orange font-medium">
                      En savoir plus →
                    </span>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* GARANTIES */}
        <section className="bg-ipb-navy py-24 lg:py-28">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow variant="dark">Nos garanties</Eyebrow>
                <h2 className="font-serif text-white" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Un calcul opposable,<br /><em>une décennale active.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-12 lg:gap-8">
              {[
                {
                  label: 'Décennale AXA France',
                  desc: "Police n° 10564321 — couvre l'étude et les travaux exécutés derrière. Attestation remise à chaque devis.",
                },
                {
                  label: 'Calcul technique signé',
                  desc: "Note de calcul signée par notre ingénieur structure, opposable face à une assurance, un syndic ou un tribunal.",
                },
                {
                  label: 'Dossier complet à la livraison',
                  desc: "Plans d'exécution, notes de calcul, attestations, photos de chantier. Tous les documents techniques vous sont remis.",
                },
              ].map((g, i) => (
                <RevealOnScroll key={g.label} delay={i * 0.06}>
                  <div className="lg:border-l lg:border-white/10 lg:pl-8">
                    <h3 className="font-serif text-white font-bold text-[20px] leading-tight mb-3">
                      {g.label}
                    </h3>
                    <p className="text-[14px] leading-[1.85] font-light text-white/65">
                      {g.desc}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center mb-16">
                <Eyebrow className="justify-center">Questions fréquentes</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Sur le bureau d'études<br /><em>et les notes de calcul.</em>
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

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
