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
  description: "Étude technique et travaux structure à Toulouse : dimensionnement IPN/HEB, ouverture de mur porteur. Note de calcul opposable selon les Eurocodes. Un seul interlocuteur, du devis à la livraison. ☎ 05 82 95 33 75",
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
    description: "Étude technique et travaux structure : IPB prend en charge l'opération de A à Z. Note de calcul opposable selon les Eurocodes. Un seul interlocuteur, du devis à la livraison.",
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
  "description": "Étude technique et travaux structure à Toulouse : ouverture de mur porteur, dimensionnement IPN/HEB, reprise structurelle. Notes de calcul opposables selon les Eurocodes. Un seul interlocuteur, de l'étude à la livraison.",
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
    desc: "Pour les projets qui exigent un document opposable face à un syndic, un assureur ou un contrôleur technique. Rédigée selon les Eurocodes et signée sous décennale études dédiée.",
  },
  {
    titre: 'Diagnostic technique de structure',
    desc: "Avant achat, après sinistre, sur fissures et désordres. Compte-rendu écrit, mesures consignées, préconisations techniques motivées.",
  },
  {
    titre: 'Pose et travaux structure',
    desc: "Étaiement, dépose, pose du linteau ou de la poutre, finitions. Exécution sous décennale travaux dédiée (10 ans).",
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
    answer: "Quand votre projet exige une note de calcul opposable (Eurocodes, dimensionnement IPN/HEB), elle est rédigée selon les Eurocodes et signée sous décennale études dédiée. IPB porte le diagnostic et coordonne l'ensemble du chantier. Vous avez un seul interlocuteur, un dossier complet remis à la livraison.",
  },
  {
    question: "Sous quel délai un dossier d'étude est-il rendu ?",
    answer: "Visite technique sous 72 heures en moyenne. Étude technique de faisabilité remise sous 3 à 5 jours ouvrés. Pour une note de calcul opposable, le délai total est généralement de 7 à 12 jours ouvrés selon la complexité.",
  },
  {
    question: "Travaillez-vous avec les architectes d'intérieur et marchands de biens ?",
    answer: "Oui. L'institut intervient régulièrement comme partenaire technique des architectes d'intérieur (projets « espace ouvert »), des marchands de biens (rénovations rapides avant revente) et des agences immobilières (compte-rendu débloquant une vente sur fissure).",
  },
  {
    question: "L'étude technique est-elle incluse dans le devis travaux ?",
    answer: "Quand l'institut coordonne les travaux derrière, l'étude technique est intégrée à la prestation globale et facturée une seule fois. Si vous demandez uniquement la note de calcul (sans travaux), elle est facturée séparément, avec un devis transparent remis sous 24 heures.",
  },
  {
    question: "Quelles garanties couvrent votre chantier ?",
    answer: "Trois niveaux de garantie : la note de calcul est signée sous décennale études dédiée (10 ans) ; le chantier est exécuté sous décennale travaux dédiée (10 ans) ; IPB porte une responsabilité civile professionnelle sur l'accompagnement et la coordination. Les attestations des décennales métier vous sont remises avec le devis.",
  },
  {
    question: "Quel est le tarif d'une étude technique seule ?",
    answer: "Une étude de faisabilité standalone (sans travaux derrière) est facturée au cas par cas selon la complexité du projet — un mur porteur simple en RDC ne demande pas le même travail qu'un dossier copropriété ou un ouvrage complexe. Décrivez-nous votre projet et le devis détaillé vous est remis sous 24 h, sans engagement.",
  },
  {
    question: "Pouvez-vous relire une note de calcul faite par un autre BE ?",
    answer: "Oui. Nous proposons une mission de second regard sur étude tierce : lecture critique du dimensionnement, des hypothèses, de la méthode d'étaiement. Tarif calé au cas par cas selon la complexité. Utile pour les marchands de biens et architectes qui veulent un avis avant d'engager des travaux importants, ou les copropriétés qui doutent d'une étude reçue.",
  },
  {
    question: "Travaillez-vous sur des bâtiments tertiaires ou industriels ?",
    answer: "Notre cœur d'activité est le résidentiel (maison individuelle, immeuble en copropriété). Nous intervenons sur des projets tertiaires de petite taille (rénovation de boutiques, bureaux jusqu'à 500 m²). Pour les ouvrages industriels lourds, nous orientons vers des bureaux d'études spécialisés.",
  },
  {
    question: "Quelle est votre méthode d'intervention ?",
    answer: "IPB intervient en tant qu'institut coordinateur : la note de calcul est rédigée selon les Eurocodes et signée sous décennale études dédiée ; l'étaiement, l'ouverture, la pose et les finitions sont exécutés sous décennale travaux dédiée. IPB porte le diagnostic, coordonne l'opération et vous suit du premier appel à la levée des étais. Un seul interlocuteur, un dossier complet à la livraison.",
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
                <Eyebrow>Étude & travaux structure · sous un seul interlocuteur</Eyebrow>
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
                  L'étude, l'ouverture, les finitions.<br />
                  <em>Un seul institut prend en charge.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  Étude technique et travaux structure à Toulouse — mur porteur, IPN, reprise structurelle. IPB prend en charge l'opération de A à Z : diagnostic, étude selon les Eurocodes, étaiement, pose et finitions. Chaque étape sous sa décennale métier. Vous, vous parlez à une seule personne, du devis à la livraison.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic gratuit · 2 min
                  </MagneticButton>
                  <a
                    href="tel:0582953375"
                    className="inline-flex items-center justify-center gap-2 border border-ipb-text/15 text-ipb-text font-medium px-7 py-4 rounded-[3px] text-[14px] tracking-[0.02em] hover:border-ipb-orange hover:text-ipb-orange transition-colors min-h-[48px]"
                    aria-label="Appeler IPB au 05 82 95 33 75"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    05 82 95 33 75
                  </a>
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
                  desc: "Vos projets « espace ouvert » nécessitent une étude structure : nous sommes votre partenaire technique sous-traité, avec décennales métier dédiées et calendrier respecté.",
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
                  label: 'Décennale études dédiée',
                  desc: "La note de calcul opposable est rédigée selon les Eurocodes et signée sous décennale études (10 ans). Attestation conservée dans votre dossier.",
                },
                {
                  label: 'Décennale travaux dédiée',
                  desc: "Étaiement, ouverture, pose et finitions sont exécutés sous décennale travaux (10 ans) sur les corps de métier mobilisés (maçonnerie, structure, plâtrerie, revêtements).",
                },
                {
                  label: 'Dossier complet à la livraison',
                  desc: "Plans d'exécution, étude technique, attestations des décennales métier, photos de chantier. Tous les documents vous sont remis.",
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
                  Sur l'étude, les notes de calcul<br /><em>et nos garanties.</em>
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
