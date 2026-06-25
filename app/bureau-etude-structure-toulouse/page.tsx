import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { StatCounter } from '@/components/ui/StatCounter';
import { Testimonials } from '@/components/home/Testimonials';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';

// EN ATTENTE DÉCISION CLIENT (brief §5) : reformulation en
// « Coordination d'études structure » — IPB n'a pas de bureau d'études
// intégré et fait intervenir un bureau d'études pour les projets le
// nécessitant. URL conservée pour ne pas casser le SEO historique.
export const metadata: Metadata = {
  title: "Étude de structure & mur porteur à Toulouse · IPB",
  description: "Étude de structure pour mur porteur, baie vitrée ou reprise à Toulouse : note de calcul Eurocodes par un bureau d'études partenaire, travaux exécutés sous décennale par le réseau IPB. Étude sous 3 à 5 jours. ☎ 05 82 95 33 75",
  keywords: [
    'étude structure toulouse',
    'étude structure haute-garonne',
    'note de calcul IPN toulouse',
    'dimensionnement poutre HEB',
    'étude mur porteur toulouse',
    'calcul mur porteur toulouse',
    'expertise structure 31',
    'coordination étude structure toulouse',
    'bureau études structure toulouse',
  ],
  alternates: { canonical: 'https://www.ipb-expertise.fr/bureau-etude-structure-toulouse' },
  openGraph: {
    title: "Étude de structure & mur porteur à Toulouse · IPB",
    description: "L'institut IPB coordonne l'étude de structure de votre projet et le chantier qui suit. Note de calcul rédigée selon les Eurocodes par un bureau d'études&nbsp;; travaux exécutés par les équipes du réseau IPB sous décennale.",
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
  "name": "Coordination d'études structure IPB",
  "@id": "https://www.ipb-expertise.fr/bureau-etude-structure-toulouse#service",
  "description": "L'institut IPB coordonne l'étude de structure (mur porteur, IPN/HEB, reprise structurelle) et les travaux qui suivent. Note de calcul rédigée selon les Eurocodes par un bureau d'études&nbsp;; travaux exécutés sous décennale par les équipes du réseau IPB.",
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
    desc: "Identification du caractère porteur, descente de charges, méthode d'étaiement, choix du profil (IPN, HEB, IPE). Étude technique remise sous 3 à 5 jours après visite.",
  },
  {
    titre: 'Coordination de la note de calcul opposable',
    desc: "Pour les projets qui exigent un document opposable face à un syndic, un assureur ou un contrôleur technique. L'institut commande la note de calcul à un bureau d'études, la relit, et l'intègre au dossier remis au client.",
  },
  {
    titre: 'Diagnostic technique de structure',
    desc: "Avant achat, après sinistre, sur fissures et désordres. Compte-rendu écrit, mesures consignées, préconisations techniques motivées.",
  },
  {
    titre: 'Travaux de structure',
    desc: "Étaiement, dépose, pose du linteau ou de la poutre, finitions. L'institut coordonne ; les équipes de réalisation du réseau IPB exécutent sous garantie décennale 10 ans.",
  },
  {
    titre: "Accompagnement de l'architecte ou du maître d'œuvre",
    desc: "Pour les rénovations lourdes intégrant plusieurs corps d'état, l'institut intervient aux côtés des architectes et maîtres d'œuvre comme référent structure.",
  },
  {
    titre: 'Second regard sur étude tierce',
    desc: "Lecture critique d'une étude reçue (artisan, BE externe) : cohérence du dimensionnement, hypothèses, méthode d'étaiement. Utile pour copropriétés et marchands de biens.",
  },
];

const faqItems = [
  {
    question: "Qui signe la note de calcul opposable sur vos chantiers ?",
    answer: "Quand votre projet exige une note de calcul opposable (Eurocodes, dimensionnement IPN/HEB), elle est rédigée et signée par un bureau d'études structure que l'institut mandate. IPB coordonne le dossier, relit la note, et l'intègre à votre livrable. Vous avez un seul interlocuteur, un dossier complet remis à la livraison.",
  },
  {
    question: "Sous quel délai un dossier d'étude est-il rendu ?",
    answer: "Visite technique sous 72h en moyenne. Étude technique de faisabilité remise sous 3 à 5 jours. Pour une note de calcul opposable produite par notre bureau d'études partenaire, le délai total est généralement de 10 à 15 jours ouvrés selon la complexité.",
  },
  {
    question: "Travaillez-vous avec les architectes d'intérieur et marchands de biens ?",
    answer: "Oui. L'institut intervient régulièrement comme référent structure des architectes d'intérieur (projets « espace ouvert »), des marchands de biens (rénovations rapides avant revente) et des agences immobilières (compte-rendu débloquant une vente sur fissure).",
  },
  {
    question: "L'étude technique est-elle incluse dans le devis travaux ?",
    answer: "Quand l'institut coordonne les travaux derrière, l'étude technique est intégrée à la prestation globale et facturée une seule fois. Si vous demandez uniquement la note de calcul (sans travaux), elle est facturée séparément, avec un devis transparent remis sous 48h.",
  },
  {
    question: "Quelles garanties couvrent votre chantier ?",
    answer: "Trois niveaux de garantie : la note de calcul est signée par le bureau d'études qui la rédige, sous sa décennale études ; les travaux sont exécutés par les équipes de réalisation du réseau IPB sous garantie décennale 10 ans ; IPB porte une responsabilité civile professionnelle sur le diagnostic, la conception et la coordination. Les attestations vous sont remises avec le devis.",
  },
  {
    question: "Quel est le tarif d'une étude technique seule ?",
    answer: "Une étude de faisabilité (sans travaux derrière) est facturée au cas par cas selon la complexité du projet — un mur porteur simple en RDC ne demande pas le même travail qu'un dossier copropriété ou un ouvrage complexe. Décrivez-nous votre projet et le devis détaillé vous est remis sous 48h, sans engagement.",
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
    answer: "IPB intervient en tant qu'institut coordinateur : l'institut diagnostique, conçoit le projet, et fait intervenir un bureau d'études pour les notes de calcul opposables. Les équipes de réalisation du réseau IPB exécutent ensuite l'étaiement, l'ouverture, la pose et les finitions sous garantie décennale 10 ans. Vous parlez à un seul interlocuteur, du premier appel à la levée des étais.",
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
      <BreadcrumbSchema items={[{ name: 'Étude de structure', href: '/bureau-etude-structure-toulouse' }]} showVisual={false} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Coordination d'études structure · un seul interlocuteur</Eyebrow>
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
                  <em>Un seul institut coordonne.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  Coordination d'études structure à Toulouse — mur porteur, IPN/HEB, reprise structurelle. L'institut diagnostique votre projet, fait intervenir un bureau d'études pour la note de calcul opposable selon les Eurocodes, et coordonne le chantier ensuite. Travaux exécutés par les équipes du réseau IPB sous garantie décennale 10 ans. Vous parlez à une seule personne, du diagnostic à la livraison.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Mon diagnostic en 2 min
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

        {/* PROCESSUS CLIENT — du projet à la levée des étais */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow variant="dark">Comment ça se passe</Eyebrow>
                <h2 className="font-serif text-white" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  De votre projet<br /><em>à la levée des étais.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <ul className="grid md:grid-cols-2 gap-x-12 gap-y-2">
              {[
                { titre: 'Diagnostic & faisabilité', desc: "Visite sur site sous 72h en moyenne. L'institut identifie le caractère porteur, établit la descente de charges et la méthode d'étaiement. Étude de faisabilité remise sous 3 à 5 jours." },
                { titre: 'Note de calcul Eurocodes', desc: "Quand le projet l'exige, l'institut mandate un bureau d'études qui dimensionne et signe la note de calcul opposable (IPN, HEB, IPE) sous sa décennale études." },
                { titre: 'Travaux coordonnés', desc: "Étaiement, dépose, pose du linteau ou de la poutre, finitions : les équipes de réalisation du réseau IPB exécutent sous garantie décennale 10 ans, dans les délais annoncés." },
                { titre: 'Livraison & dossier complet', desc: "Plans d'exécution, étude technique, attestations de décennale, photos de chantier : tous les documents vous sont remis à la levée des étais." },
              ].map((etape, i) => (
                <RevealOnScroll key={etape.titre} delay={0.06 + i * 0.06}>
                  <li className="grid grid-cols-[40px_1fr] gap-5 items-start py-7 border-b border-white/10">
                    <span className="font-serif text-ipb-orange-l text-[14px] font-bold tracking-wider pt-1">0{i + 1}</span>
                    <div>
                      <h3 className="font-serif text-white text-[20px] font-bold leading-tight mb-2">{etape.titre}</h3>
                      <p className="text-[14px] leading-[1.75] font-light text-white/65">{etape.desc}</p>
                    </div>
                  </li>
                </RevealOnScroll>
              ))}
            </ul>
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
                  desc: "Vos projets « espace ouvert » nécessitent une étude structure : l'institut conçoit et coordonne, les équipes du réseau IPB exécutent sous décennale, calendrier respecté.",
                },
                {
                  href: '/partenaires/marchands-de-biens',
                  titre: 'Marchands de biens & investisseurs',
                  desc: "Acheter un T3 toulousain pour ouvrir cuisine et salon avant revente : nous chiffrons et exécutons en délai serré, dossier complet remis à la livraison.",
                },
                {
                  href: '/partenaires/agences-immobilieres',
                  titre: 'Agences immobilières',
                  desc: "Une vente bloquée à cause d'une fissure : la note de synthèse rassure l'acquéreur et débloque la transaction. Un seul interlocuteur, du diagnostic à la signature.",
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

        {/* COÛT & CAS CONCRET */}
        <section className="bg-ipb-white py-24 lg:py-32 border-y border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <RevealOnScroll>
                <Eyebrow>Combien ça coûte</Eyebrow>
                <h2 className="font-serif text-ipb-text mb-6" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Un prix clair,<br /><em>chiffré avant tout engagement.</em>
                </h2>
                <div className="space-y-4 text-[15px] leading-[1.9] font-light text-ipb-muted">
                  <p>
                    Le coût d'une ouverture de mur porteur dépend de la portée, du profil retenu (IPN, HEB), de l'étaiement nécessaire et de l'accès au chantier. La note de calcul opposable, quand elle est requise, s'ajoute à l'étude de faisabilité.
                  </p>
                  <p className="text-ipb-text">
                    Pas d'acompte, pas de surprise : vous recevez un devis détaillé sous 48h, et l'étude est intégrée à la prestation quand l'institut coordonne les travaux derrière.
                  </p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/calcul-prix-mur-porteur" variant="primary">
                    Estimer le prix en ligne
                  </MagneticButton>
                  <a
                    href="/blog/prix-ouverture-mur-porteur-toulouse-2026"
                    className="inline-flex items-center justify-center gap-2 border border-ipb-text/15 text-ipb-text font-medium px-7 py-4 rounded-[3px] text-[14px] tracking-[0.02em] hover:border-ipb-orange hover:text-ipb-orange transition-colors min-h-[48px]"
                  >
                    Guide des prix 2026
                  </a>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <a
                  href="/blog/etude-de-cas-mur-porteur-4m-t3-toulouse"
                  className="block bg-ipb-cream border border-ipb-rule rounded-[6px] p-8 lg:p-10 h-full hover:shadow-[0_12px_36px_rgba(11,24,38,0.07)] transition-shadow duration-500"
                >
                  <span className="text-[10px] uppercase tracking-[0.18em] text-ipb-orange font-semibold">Cas concret</span>
                  <h3 className="font-serif text-ipb-text font-bold text-[24px] leading-tight mt-3 mb-4">
                    Ouverture de 4 m dans un T3 toulousain
                  </h3>
                  <p className="text-[14px] leading-[1.85] font-light text-ipb-muted mb-6">
                    Étude de faisabilité, note de calcul HEB, étaiement et ouverture d'un mur porteur de 4 mètres dans un appartement toulousain : déroulé complet, choix techniques et délais réels.
                  </p>
                  <span className="text-[13px] text-ipb-orange font-medium">Lire l'étude de cas →</span>
                </a>
              </RevealOnScroll>
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
                  Une chaîne de garanties,<br /><em>un seul interlocuteur.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-12 lg:gap-8">
              {[
                {
                  label: 'Étude signée par un bureau d\'études',
                  desc: "La note de calcul opposable est rédigée selon les Eurocodes et signée par le bureau d'études mandaté par l'institut, sous sa décennale études (10 ans).",
                },
                {
                  label: 'Travaux sous décennale 10 ans',
                  desc: "Étaiement, ouverture, pose et finitions sont exécutés par les équipes de réalisation du réseau IPB, sous garantie décennale 10 ans.",
                },
                {
                  label: 'Dossier complet à la livraison',
                  desc: "Plans d'exécution, étude technique, attestations de garantie décennale, photos de chantier. Tous les documents vous sont remis.",
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

        {/* CHIFFRES — réassurance chiffrée */}
        <section className="bg-ipb-cream py-20 lg:py-24 border-t border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {[
                { value: 850, suffix: '+', label: 'Chantiers · réseau IPB' },
                { value: 4.9, decimals: 1, suffix: '/5', label: 'Avis Google' },
                { value: 72, suffix: 'h', label: 'Visite en moyenne' },
                { value: 10, suffix: ' ans', label: 'Décennale sur les travaux' },
              ].map((s, i) => (
                <RevealOnScroll key={s.label} delay={i * 0.06}>
                  <div className="text-center lg:text-left lg:border-l lg:border-ipb-rule lg:pl-8">
                    <p className="font-serif text-ipb-text font-bold leading-none mb-3" style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}>
                      <StatCounter value={s.value} decimals={s.decimals || 0} />
                      {s.suffix && <span className="text-ipb-orange">{s.suffix}</span>}
                    </p>
                    <p className="text-[12px] text-ipb-muted uppercase tracking-[0.14em] font-medium">{s.label}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* PREUVE SOCIALE — avis clients vérifiés */}
        <Testimonials />

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

        {/* MAILLAGE INTERNE — projet · analyses · pros */}
        <section className="bg-ipb-white py-24 lg:py-32 border-t border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <Eyebrow>Pour aller plus loin</Eyebrow>
              <h2 className="font-serif text-ipb-text mb-14" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                Votre projet structure,<br /><em>de l'estimation à la réalisation.</em>
              </h2>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
              {[
                {
                  titre: 'Votre projet',
                  links: [
                    { href: '/calcul-prix-mur-porteur', label: "Estimer le prix d'une ouverture" },
                    { href: '/expertise/mur-porteur', label: 'Ouverture de mur porteur' },
                    { href: '/expert-mur-porteur/toulouse', label: 'Mur porteur à Toulouse' },
                    { href: '/expertise-avant-achat-immobilier-toulouse', label: 'Expertise avant achat' },
                  ],
                },
                {
                  titre: 'Nos analyses',
                  links: [
                    { href: '/blog/comment-savoir-si-mur-porteur', label: 'Comment savoir si un mur est porteur' },
                    { href: '/blog/prix-ouverture-mur-porteur-toulouse-2026', label: "Prix d'une ouverture en 2026" },
                    { href: '/blog/etude-de-cas-mur-porteur-4m-t3-toulouse', label: 'Étude de cas : ouverture de 4 m' },
                    { href: '/lexique', label: 'Lexique de la pathologie du bâtiment' },
                    { href: '/notre-methode', label: 'Notre méthode, étape par étape' },
                  ],
                },
                {
                  titre: 'Vous êtes un pro',
                  links: [
                    { href: '/partenaires/architectes-interieur', label: "Architectes d'intérieur" },
                    { href: '/partenaires/marchands-de-biens', label: 'Marchands de biens' },
                    { href: '/partenaires/agences-immobilieres', label: 'Agences immobilières' },
                  ],
                },
              ].map((col, ci) => (
                <RevealOnScroll key={col.titre} delay={ci * 0.08}>
                  <div>
                    <h3 className="text-[11px] uppercase tracking-[0.16em] text-ipb-light font-semibold mb-5 pb-3 border-b border-ipb-rule">{col.titre}</h3>
                    <ul className="space-y-3.5">
                      {col.links.map((l) => (
                        <li key={l.href}>
                          <a href={l.href} className="group inline-flex items-start gap-2 text-[14px] leading-snug text-ipb-text hover:text-ipb-orange transition-colors">
                            <span className="text-ipb-orange/50 group-hover:text-ipb-orange transition-colors pt-0.5" aria-hidden="true">→</span>
                            <span>{l.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
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
