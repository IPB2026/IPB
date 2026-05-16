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
import { StatCounter } from '@/components/ui/StatCounter';

export const metadata: Metadata = {
  title: 'Expert Fissures Montauban 82 · RGA Sécheresse · Décennale 10 ans',
  description: "Spécialiste fissures Montauban et 82, zone à risque RGA. 234 diagnostics. Agrafage structurel. Décennale 10 ans sur les travaux. ☎ 05 82 95 33 75",
  keywords: [
    'expert fissures montauban',
    'expertise fissures montauban',
    'expert fissure tarn et garonne',
    'agrafage fissures montauban',
    'diagnostic fissures 82',
    'fissures maison montauban',
    'tassement différentiel tarn et garonne',
    'sécheresse RGA tarn et garonne',
    'catastrophe naturelle sécheresse 82',
    'institut pathologie bâtiment montauban',
  ],
  alternates: { canonical: 'https://www.ipb-expertise.fr/expert-fissures-montauban-82' },
  openGraph: {
    title: 'Expert Fissures Montauban · RGA Sécheresse · IPB',
    description: "Spécialiste fissures Tarn-et-Garonne. Diagnostic IPB, agrafage exécuté par les équipes du réseau IPB sous décennale 10 ans. Rapport reconnu par les assurances. Réseau IPB actif depuis 2019.",
    url: 'https://www.ipb-expertise.fr/expert-fissures-montauban-82',
    type: 'website',
    images: [{
      url: '/images/fissures-avant-apres.webp',
      width: 1200,
      height: 630,
      alt: 'Avant et après agrafage de fissure structurelle — Institut IPB Montauban',
    }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const communesTarnEtGaronne = [
  'Montauban', 'Castelsarrasin', 'Moissac', 'Caussade', 'Montech',
  "Valence d'Agen", 'Beaumont-de-Lomagne', 'Grisolles', 'Labastide-Saint-Pierre',
  'Nègrepelisse', 'Verdun-sur-Garonne', 'Lafrançaise',
];

const faqItems = [
  {
    question: "Comment se déroule une expertise fissures à Montauban ?",
    answer: "Notre institut se déplace sur site avec fissuromètre, niveau laser et caméra thermique si nécessaire. Nous mesurons l'évolution, identifions la cause (sécheresse, tassement différentiel, défaut de chaînage) et rédigeons un rapport écrit sous 3 à 5 jours ouvrés. Ce rapport est reconnu par les assurances.",
  },
  {
    question: "Intervenez-vous sur tout le Tarn-et-Garonne ?",
    answer: "Oui, nous couvrons l'intégralité du département 82 : Montauban, Castelsarrasin, Moissac, Caussade et toutes les communes environnantes. Le déplacement est inclus dans la prestation de diagnostic.",
  },
  {
    question: "Le Tarn-et-Garonne est-il particulièrement touché par les fissures ?",
    answer: "Oui. Plus de 70 % du territoire du Tarn-et-Garonne est classé en risque moyen à fort de retrait-gonflement des argiles. Depuis 2020, plusieurs dizaines de communes du département ont été reconnues en état de catastrophe naturelle pour la sécheresse.",
  },
  {
    question: "Le diagnostic est-il gratuit à Montauban ?",
    answer: "Le diagnostic est une vraie expertise technique sur site : c'est une prestation payante qui inclut le déplacement, l'analyse instrumentée et le rapport détaillé. Son montant est intégralement déduit si vous nous confiez les travaux.",
  },
  {
    question: "Quelle est la différence entre agrafage et micropieux ?",
    answer: "L'agrafage stabilise le mur en cousant la fissure avec des aciers inoxydables (8 000 à 15 000 €). Les micropieux reprennent les fondations en profondeur (25 000 à 50 000 €) — intervention lourde réservée aux tassements actifs majeurs. L'institut conçoit l'agrafage structurel et nos équipes de réalisation l'exécutent ; pour les rares cas nécessitant des micropieux, nous coordonnons l'intervention avec un spécialiste après diagnostic.",
  },
  {
    question: "Combien de temps pour recevoir le rapport ?",
    answer: "Vous recevez votre rapport détaillé sous 48 à 72 h après la visite, avec photos, analyse instrumentée et préconisations de traitement.",
  },
  {
    question: "Quel est le prix d'un agrafage à Montauban ?",
    answer: "Le prix d'un agrafage structurel à Montauban et dans le Tarn-et-Garonne se situe entre 8 000 et 15 000 € TTC pour une façade complète, soit en moyenne 100 à 130 €/ml de fissure traitée. Le tarif varie selon la nature du mur (brique foraine, parpaing, pierre), la longueur de la fissure et la complexité d'accès. Devis ferme remis sous 72h après diagnostic.",
  },
  {
    question: "Ma commune est-elle reconnue en CAT-NAT sécheresse pour 2022 et 2023 ?",
    answer: "De nombreuses communes du Tarn-et-Garonne ont été reconnues en catastrophe naturelle sécheresse pour 2022 (arrêté JO du 18/01/2023) et 2023 (arrêté JO du 28/02/2024). Vérifiez sur georisques.gouv.fr ou demandez-nous : nous tenons à jour la liste des arrêtés sur tout le 82. Si votre commune est reconnue, vous avez 10 jours après publication pour déclarer votre sinistre à l'assureur.",
  },
  {
    question: "Combien de temps entre le diagnostic et la fin des travaux ?",
    answer: "Le calendrier type d'un chantier fissures à Montauban : diagnostic + rapport sous 7-10 jours, devis sous 14 jours après le rapport, démarrage du chantier 3 à 4 semaines après acceptation du devis (commande matériel + planning), travaux 5 à 10 jours selon l'ampleur. Soit en moyenne 2 à 3 mois entre la première visite et la livraison du chantier.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "IPB - Institut de pathologie du bâtiment Montauban",
  "description": "Institut indépendant en diagnostic et traitement des fissures structurelles. Montauban, Tarn-et-Garonne et Occitanie.",
  "url": "https://www.ipb-expertise.fr/expert-fissures-montauban-82",
  "telephone": "+33582953375",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Montauban",
    "addressRegion": "Tarn-et-Garonne",
    "postalCode": "82000",
    "addressCountry": "FR",
  },
  "areaServed": [
    { "@type": "City", "name": "Montauban" },
    { "@type": "AdministrativeArea", "name": "Tarn-et-Garonne" },
  ],
  "priceRange": "€€",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer },
  })),
};

export default function ExpertFissuresMontaubanPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="local-business-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
                <Eyebrow>Page locale · Montauban · Tarn-et-Garonne (82)</Eyebrow>
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
                  Expert fissures<br />
                  <em>à Montauban et Tarn-et-Garonne.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  Institut IPB — pathologie du bâtiment. Réseau IPB actif sur tout le Tarn-et-Garonne depuis 2019. Diagnostic instrumenté, conception de la solution (agrafage structurel, reprise en sous-œuvre) ; travaux exécutés par les équipes de réalisation du réseau IPB sous décennale. Nos rapports sont reconnus par les assurances.
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

        {/* CONTEXTE LOCAL — pourquoi Montauban fissure */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <RevealOnScroll className="lg:col-span-5">
                <Eyebrow>Le contexte tarn-et-garonnais</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Plus de 70 % du département<br /><em>en risque RGA moyen à fort.</em>
                </h2>
              </RevealOnScroll>

              <div className="lg:col-span-7 space-y-5 text-[15px] leading-[1.9] font-light text-ipb-muted">
                <RevealOnScroll delay={0.06}>
                  <p>
                    Le Tarn-et-Garonne repose en grande partie sur des sols argileux gonflants, particulièrement marqués dans les vallées du Tarn, de la Garonne et de l'Aveyron. Ces argiles se contractent en été (sécheresse) et se dilatent en hiver (saturation). Les fondations bougent en conséquence — c'est ce qu'on appelle le retrait-gonflement des argiles, ou RGA.
                  </p>
                </RevealOnScroll>
                <RevealOnScroll delay={0.12}>
                  <p>
                    Depuis la sécheresse historique de 2022, plusieurs dizaines de communes du département — dont Montauban, Castelsarrasin, Moissac et Caussade — ont été reconnues en état de catastrophe naturelle. Les maisons construites avant 1970, sans fondations dimensionnées pour ce phénomène, sont les plus exposées. Les fissures apparaissent souvent au droit des angles, en escalier sur les façades, ou horizontalement à mi-hauteur.
                  </p>
                </RevealOnScroll>
                <RevealOnScroll delay={0.18}>
                  <p>
                    Notre institut est spécialisé dans le diagnostic de ces désordres et dans la mise en œuvre de l'agrafage structurel — solution suffisante dans 90 % des cas. Pour les rares tassements majeurs nécessitant une reprise en sous-œuvre par micropieux, nous orientons vers un partenaire spécialisé après diagnostic.
                  </p>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>

        {/* CHIFFRES */}
        <section className="bg-ipb-navy py-24 lg:py-28">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {[
                { value: 234, suffix: '+', label: 'Diagnostics réalisés', sublabel: 'sur le 82' },
                { value: 48, suffix: ' h', label: 'Délai de visite', sublabel: 'en moyenne' },
                { value: 4.9, decimals: 1, suffix: '/5', label: 'Avis Google' },
                { value: 10, suffix: ' ans', label: 'Décennale dédiée' },
              ].map((s, i) => (
                <RevealOnScroll key={s.label} delay={i * 0.06}>
                  <div className="text-center lg:text-left lg:border-l lg:border-white/10 lg:pl-8">
                    <p className="font-serif text-white font-bold leading-none mb-3" style={{ fontSize: 'clamp(48px, 5.5vw, 80px)' }}>
                      <StatCounter value={s.value} decimals={s.decimals || 0} />
                      {s.suffix && <span className="text-ipb-orange-l">{s.suffix}</span>}
                    </p>
                    <p className="text-[12px] text-white uppercase tracking-[0.14em] font-medium">
                      {s.label}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* COMMUNES COUVERTES */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <Eyebrow className="justify-center">Communes couvertes</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Notre institut intervient<br /><em>partout en Tarn-et-Garonne.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {communesTarnEtGaronne.map((commune) => (
                <span
                  key={commune}
                  className="bg-ipb-white border border-ipb-rule rounded-[3px] px-4 py-2 text-[13px] font-light text-ipb-text hover:border-ipb-orange transition-colors"
                >
                  {commune}
                </span>
              ))}
              <span className="text-ipb-muted text-[13px] px-4 py-2">+ communes alentour</span>
            </div>

            <p className="text-center text-[13px] text-ipb-muted mt-8">
              <Link href="/zones-intervention" className="text-ipb-orange hover:underline">
                Voir toutes nos zones d'intervention →
              </Link>
            </p>
          </div>
        </section>

        {/* TYPES DE FISSURES & SOLUTIONS — passage citatable AI */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-12 max-w-2xl">
                <Eyebrow>Sur les types de fissures</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Quatre familles, quatre lectures<br /><em>du sol et de la structure.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="space-y-8 text-[15px] leading-[1.9] font-light text-ipb-muted">
              <RevealOnScroll delay={0.06}>
                <div>
                  <h3 className="font-serif text-ipb-text font-bold text-[20px] mb-2">Fissures en escalier</h3>
                  <p>Suivent les joints de maçonnerie. Signature visuelle d'un tassement différentiel — une partie de la maison s'enfonce plus que l'autre. Très fréquentes après un été sec sur sol argileux.</p>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <div>
                  <h3 className="font-serif text-ipb-text font-bold text-[20px] mb-2">Fissures horizontales sur mur porteur</h3>
                  <p>Les guides de pathologie du bâtiment (CSTB, AQC, CTMNC) les classent parmi les signaux d'alerte prioritaires. Diagnostic recommandé sous 24 à 48 h.</p>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div>
                  <h3 className="font-serif text-ipb-text font-bold text-[20px] mb-2">Fissures autour des ouvertures</h3>
                  <p>Portes ou fenêtres qui frottent, ne ferment plus, ou s'ouvrent seules : la structure travaille. Souvent associé à un tassement progressif.</p>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.24}>
                <div>
                  <h3 className="font-serif text-ipb-text font-bold text-[20px] mb-2">Fissures de fondation</h3>
                  <p>Visibles en bas des murs ou en sous-sol. Nécessitent un diagnostic technique : agrafage structurel dans 90 % des cas. Pour les reprises en profondeur (micropieux), nous orientons vers un partenaire spécialisé.</p>
                </div>
              </RevealOnScroll>
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
                  Sur les fissures<br /><em>en Tarn-et-Garonne.</em>
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
