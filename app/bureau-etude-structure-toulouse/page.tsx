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
  title: "Étude structure & travaux Toulouse · Mur porteur, IPN · IPB",
  description: "Étude technique et travaux structure à Toulouse : dimensionnement IPN/HEB, ouverture de mur porteur. Décennale AXA. Note de calcul opposable co-signée par notre BE partenaire. ☎ 05 82 95 33 75",
  keywords: [
    'étude structure toulouse',
    'étude structure haute-garonne',
    'note de calcul IPN toulouse',
    'dimensionnement poutre HEB',
    'étude mur porteur toulouse',
    'calcul mur porteur toulouse',
    'expertise structure 31',
    'note de calcul ouverture mur',
    'bureau études structure toulouse',
  ],
  alternates: { canonical: 'https://www.ipb-expertise.fr/bureau-etude-structure-toulouse' },
  openGraph: {
    title: "Étude structure & travaux · IPB Toulouse",
    description: "Étude technique et travaux portés par l'institut. Note de calcul opposable co-signée par notre bureau d'études structure partenaire. Décennale AXA active.",
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
  "@type": "Service",
  "name": "Étude structure et travaux IPB",
  "@id": "https://www.ipb-expertise.fr/bureau-etude-structure-toulouse#service",
  "description": "Étude technique et travaux structure à Toulouse : ouverture de mur porteur, dimensionnement IPN/HEB, reprise structurelle. Notes de calcul opposables co-signées par notre bureau d'études structure partenaire.",
  "areaServed": [
    { "@type": "City", "name": "Toulouse" },
    { "@type": "AdministrativeArea", "name": "Haute-Garonne" },
    { "@type": "AdministrativeArea", "name": "Tarn-et-Garonne" },
    { "@type": "AdministrativeArea", "name": "Gers" },
    { "@type": "AdministrativeArea", "name": "Tarn" },
  ],
  "provider": { "@type": "LocalBusiness", "name": "IPB — Institut de Pathologie du Bâtiment", "telephone": "+33582953375" },
};

const prestations = [
  {
    titre: 'Étude de faisabilité mur porteur',
    desc: "Identification du caractère porteur, descente de charges, méthode d'étaiement, choix du profil (IPN, HEB, IPE). Étude technique remise sous 3 à 5 jours ouvrés après visite.",
  },
  {
    titre: 'Note de calcul opposable',
    desc: "Pour les projets qui exigent un document opposable face à un syndic, un assureur ou un contrôleur technique, la note de calcul est co-signée par notre bureau d'études structure partenaire, sous sa propre décennale études.",
  },
  {
    titre: 'Diagnostic technique de structure',
    desc: "Avant achat, après sinistre, sur fissures et désordres. Compte-rendu écrit, mesures consignées, préconisations techniques motivées.",
  },
  {
    titre: 'Pose et travaux structure',
    desc: "Étaiement, dépose, pose du linteau ou de la poutre, finitions. Réalisation par nos équipes sous garantie décennale AXA active.",
  },
  {
    titre: 'Suivi de chantier en partenariat',
    desc: "Pour les rénovations lourdes intégrant plusieurs corps d'état, nous travaillons aux côtés des architectes et maîtres d'œuvre comme partenaire structure.",
  },
  {
    titre: 'Second regard sur étude tierce',
    desc: "Lecture critique d'une étude reçue (artisan, BE externe) : cohérence du dimensionnement, hypothèses, méthode d'étaiement. Utile pour copropriétés et marchands de biens.",
  },
];

const faqItems = [
  {
    question: "Qui signe la note de calcul opposable sur vos chantiers ?",
    answer: "Quand votre projet exige une note de calcul opposable (Eurocodes, dimensionnement IPN/HEB, descente de charges complexe), elle est rédigée et signée par notre bureau d'études structure partenaire, sous sa propre décennale études. L'institut IPB porte le diagnostic préalable, la pose et les finitions, sous décennale AXA travaux. Le client reçoit un dossier unique avec les deux attestations.",
  },
  {
    question: "Sous quel délai un dossier d'étude est-il rendu ?",
    answer: "Visite technique sous 72 heures en moyenne. Étude technique de faisabilité remise sous 3 à 5 jours ouvrés. Pour une note de calcul opposable co-signée par notre BE partenaire, le délai total est généralement de 7 à 12 jours ouvrés selon la complexité.",
  },
  {
    question: "Travaillez-vous avec les architectes d'intérieur et marchands de biens ?",
    answer: "Oui. L'institut intervient régulièrement comme partenaire technique des architectes d'intérieur (projets « espace ouvert »), des marchands de biens (rénovations rapides avant revente) et des agences immobilières (compte-rendu débloquant une vente sur fissure).",
  },
  {
    question: "L'étude technique est-elle incluse dans le devis travaux ?",
    answer: "Quand l'institut réalise les travaux derrière, l'étude technique est intégrée à la prestation globale et facturée une seule fois. Si vous demandez uniquement la note de calcul (sans travaux), elle est facturée séparément, avec un devis transparent remis sous 24 heures.",
  },
  {
    question: "Êtes-vous couverts en décennale ?",
    answer: "Oui. L'institut IPB est couvert par une garantie décennale AXA France (contrat Construction BATISSUR n° 0000022511730204) sur ses activités de travaux : maçonnerie et béton armé, charpente bois, couverture, menuiseries, plâtrerie, revêtements. Pour les notes de calcul opposables, c'est la décennale études de notre BE partenaire qui s'applique. Les deux attestations sont remises avec le devis.",
  },
  {
    question: "Quel est le tarif d'une étude technique seule ?",
    answer: "Une étude de faisabilité standalone (sans travaux derrière) est facturée entre 500 € et 1 500 € TTC selon la complexité : 500-700 € pour un mur porteur simple en RDC, 800-1 200 € pour une portée importante ou un dossier copropriété, 1 200-1 500 € pour les ouvrages complexes. Le devis vous est remis sous 24 h après description du projet.",
  },
  {
    question: "Pouvez-vous relire une note de calcul faite par un autre BE ?",
    answer: "Oui. Nous proposons une mission de second regard sur étude tierce : lecture critique du dimensionnement, des hypothèses, de la méthode d'étaiement. Coût : 400-800 € selon la complexité. Utile pour les marchands de biens et architectes qui veulent un avis avant d'engager des travaux importants, ou les copropriétés qui doutent d'une étude reçue.",
  },
  {
    question: "Travaillez-vous sur des bâtiments tertiaires ou industriels ?",
    answer: "Notre cœur d'activité est le résidentiel (maison individuelle, immeuble en copropriété). Nous intervenons sur des projets tertiaires de petite taille (rénovation de boutiques, bureaux jusqu'à 500 m²). Pour les ouvrages industriels lourds, nous orientons vers des bureaux d'études spécialisés.",
  },
  {
    question: "Comment fonctionne le partenariat avec votre BE structure ?",
    answer: "Nous travaillons avec un bureau d'études structure indépendant, qui dispose de sa propre décennale études et signe les notes de calcul opposables. L'institut IPB porte le diagnostic, l'interface client, la pose et les finitions. Le client a un interlocuteur unique (IPB), un devis unique, et reçoit en livraison un dossier complet avec les deux attestations d'assurance.",
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
                <Eyebrow>Étude & travaux, sous une seule responsabilité</Eyebrow>
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
                  On étudie. On pose.<br />
                  <em>La décennale couvre les deux.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  Étude technique de structure à Toulouse — mur porteur, IPN, reprise structurelle. Le diagnostic, la pose et les finitions sont portés par l'institut sous décennale AXA travaux. Pour les notes de calcul opposables (Eurocodes), nous travaillons avec un bureau d'études structure partenaire qui co-signe le dossier sous sa propre décennale études.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Demander une étude
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
                  Six prestations structure,<br /><em>une même continuité étude-travaux.</em>
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
                  Deux décennales,<br /><em>un seul interlocuteur.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-12 lg:gap-8">
              {[
                {
                  label: 'Décennale travaux AXA',
                  desc: "Contrat Construction BATISSUR n° 0000022511730204 — couvre les travaux portés par l'institut (maçonnerie, structure bois, couverture, plâtrerie, revêtements).",
                },
                {
                  label: 'Décennale études partenaire',
                  desc: "Lorsqu'une note de calcul opposable est requise, elle est co-signée par notre bureau d'études structure partenaire, sous sa propre décennale études.",
                },
                {
                  label: 'Dossier complet à la livraison',
                  desc: "Plans d'exécution, étude technique, attestations d'assurance des deux acteurs, photos de chantier. Tous les documents vous sont remis.",
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
                  Sur l'étude, les notes de calcul<br /><em>et notre BE partenaire.</em>
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
