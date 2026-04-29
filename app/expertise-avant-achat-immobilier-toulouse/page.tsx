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

export const metadata: Metadata = {
  title: "Expertise avant achat immobilier à Toulouse · Institut IPB",
  description: "Expertise immobilière indépendante avant achat à Toulouse : détection des fissures, de l'humidité et des désordres structurels. Rapport sous 48 à 72 h, opposable à l'assurance et utile pour négocier le prix.",
  keywords: [
    'expertise avant achat toulouse',
    'expertise immobilière toulouse',
    'vice caché immobilier',
    'diagnostic avant achat maison',
    'expertise structure avant achat',
    'fissure avant achat toulouse',
    'humidité avant achat toulouse',
    'expert bâtiment avant achat 31',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/expertise-avant-achat-immobilier-toulouse',
  },
  openGraph: {
    title: 'Expertise avant achat immobilier · IPB Toulouse',
    description: "Inspection technique complète avant signature : fissures, humidité, structure, toiture. Rapport sous 48 à 72 h.",
    url: 'https://www.ipb-expertise.fr/expertise-avant-achat-immobilier-toulouse',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const faqItems = [
  {
    question: "Pourquoi faire une expertise avant d'acheter ?",
    answer: "L'expertise avant achat permet de détecter les désordres cachés (fissures structurelles, humidité, défauts de toiture, vices d'exécution) AVANT la signature. Cet investissement modeste peut éviter des dizaines de milliers d'euros de travaux non anticipés, ou fournir les arguments techniques pour négocier le prix de vente.",
  },
  {
    question: "Que comprend l'expertise avant achat ?",
    answer: "Inspection visuelle complète, détection de l'humidité à l'humidimètre, analyse des fissures (mesure, lecture instrumentée si nécessaire), vérification de la toiture et de la charpente accessibles, contrôle des installations visibles, et rapport détaillé avec photos, mesures et recommandations chiffrées.",
  },
  {
    question: "Le rapport est-il utilisable pour négocier ?",
    answer: "Oui. Si nous détectons des désordres, le rapport chiffré documente le coût des reprises à prévoir. C'est un argument technique opposable au vendeur — soit pour négocier une baisse, soit pour exiger les travaux avant la vente.",
  },
  {
    question: "Sous quel délai recevrai-je le rapport ?",
    answer: "Vous recevez votre rapport complet sous 48 à 72 h après la visite. En cas d'urgence (compromis en cours, délai de rétractation), nous pouvons accélérer à 24 h.",
  },
  {
    question: "L'expertise est-elle obligatoire ?",
    answer: "Non, mais fortement recommandée. Les diagnostics obligatoires (DPE, amiante, plomb, électricité, gaz) ne couvrent pas l'état structurel ni le clos-couvert. Notre expertise complète ces diagnostics sur la partie pathologie du bâtiment.",
  },
  {
    question: "Intervenez-vous seulement à Toulouse ?",
    answer: "Notre institut intervient sur toute la Haute-Garonne (31), le Tarn-et-Garonne (82), le Gers (32), le Tarn (81) et l'Ariège (09). Le déplacement est inclus dans la prestation jusqu'à 50 km autour de Toulouse, au-delà il est facturé au coût réel.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "IPB - Expertise avant achat immobilier",
  "description": "Expertise immobilière avant achat à Toulouse : détection des fissures, de l'humidité et des désordres structurels.",
  "url": "https://www.ipb-expertise.fr/expertise-avant-achat-immobilier-toulouse",
  "telephone": "+33582953375",
  "priceRange": "€€",
  "areaServed": [
    { "@type": "City", "name": "Toulouse" },
    { "@type": "AdministrativeArea", "name": "Haute-Garonne" },
    { "@type": "AdministrativeArea", "name": "Tarn-et-Garonne" },
    { "@type": "AdministrativeArea", "name": "Gers" },
  ],
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

const inspections = [
  { titre: 'Fissures structurelles', desc: 'Murs porteurs, façades, fondations. Mesure, lecture, et caractérisation.' },
  { titre: 'Humidité', desc: 'Remontées capillaires, infiltrations, condensation. Mesures à l\'humidimètre.' },
  { titre: 'Toiture & charpente', desc: 'État général accessible, tuiles, faîtage, infiltrations visibles.' },
  { titre: 'Installations visibles', desc: 'Tableau électrique, plomberie apparente, ventilation.' },
  { titre: 'Maçonnerie', desc: 'État des murs, joints, enduits, fissurations de surface.' },
  { titre: 'Conformité du bâti', desc: 'Extensions, modifications, cohérence avec les déclarations.' },
];

const etapes = [
  { titre: 'Vous nous contactez', desc: "Envoyez-nous l'adresse du bien, la date souhaitée, et le contexte (compromis, délai de rétractation, point d'inquiétude particulier)." },
  { titre: 'Visite sur place', desc: "Notre expert inspecte le bien en 1 h 30 à 2 h. Présence de l'acheteur recommandée pour les questions techniques." },
  { titre: 'Rapport détaillé', desc: "Vous recevez le rapport complet sous 48 à 72 h, avec photos, mesures et estimations chiffrées des reprises." },
  { titre: 'Décision éclairée', desc: "Vous achetez en confiance ou vous négociez avec un argumentaire technique opposable." },
];

export default function ExpertiseAvantAchatPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
                <Eyebrow>Expertise immobilière indépendante</Eyebrow>
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
                  Expertise avant achat&nbsp;immobilier<br />
                  <em>à Toulouse.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  Vous achetez un bien à Toulouse. Avant de signer, nous venons sur place avec hygromètre, fissuromètre et caméra thermique pour identifier les désordres structurels et les vices d'exécution. Rapport opposable sous 48 à 72 h, utile pour décider — ou pour négocier.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Réserver mon expertise
                  </MagneticButton>
                  <MagneticButton href="/notre-expert" variant="ghost">
                    Qui réalise l'expertise
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* POURQUOI — édito + liste inspections */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <RevealOnScroll className="lg:col-span-5">
                <Eyebrow>Pourquoi avant achat</Eyebrow>
                <h2 className="font-serif text-ipb-text mb-8" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Les diagnostics obligatoires<br /><em>ne couvrent pas la structure.</em>
                </h2>
                <div className="space-y-5 text-[15px] leading-[1.9] font-light text-ipb-muted">
                  <p>
                    DPE, amiante, plomb, électricité, gaz : les diagnostics obligatoires couvrent la performance énergétique et les risques sanitaires, mais pas l'état structurel du bien. Une fissure active, une remontée capillaire ancienne ou un défaut de chaînage ne sont visibles que par un expert en pathologie du bâtiment.
                  </p>
                  <p>
                    En zone toulousaine, où plus de 70 % du territoire est classé en risque RGA moyen à fort, l'enjeu est concret : un tassement différentiel non détecté à la signature peut représenter <strong className="text-ipb-text font-medium">15 000 à 50 000 €</strong> de reprise plus tard, à la charge de l'acquéreur.
                  </p>
                  <p>
                    Notre expertise indépendante vous donne deux choses : la lecture technique du bien, et — si désordres — un rapport chiffré opposable au vendeur pour négocier ou exiger les travaux avant la vente.
                  </p>
                </div>
              </RevealOnScroll>

              <div className="lg:col-span-7">
                <RevealOnScroll delay={0.08}>
                  <div className="bg-ipb-cream border border-ipb-rule rounded-[6px] p-8 lg:p-10">
                    <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-6">
                      CE QUE NOUS INSPECTONS
                    </p>
                    <ul className="space-y-5">
                      {inspections.map((item) => (
                        <li key={item.titre} className="grid grid-cols-[8px_1fr] gap-4 items-start pb-5 border-b border-ipb-rule last:border-b-0 last:pb-0">
                          <span className="text-ipb-orange mt-2" aria-hidden="true">▸</span>
                          <div>
                            <h3 className="font-serif text-ipb-text font-bold text-[17px] leading-tight mb-1">{item.titre}</h3>
                            <p className="text-[14px] leading-[1.7] font-light text-ipb-muted">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESSUS */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow variant="dark">Le déroulé</Eyebrow>
                <h2 className="font-serif text-white" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  De la prise de contact<br /><em>à la décision d'achat.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <ul className="space-y-8">
              {etapes.map((etape, i) => (
                <RevealOnScroll key={etape.titre} delay={0.08 + i * 0.06}>
                  <li className="grid grid-cols-[40px_1fr] gap-5 items-start pb-8 border-b border-white/10">
                    <span className="font-serif text-ipb-orange-l text-[14px] font-bold tracking-wider pt-2">
                      0{i + 1}
                    </span>
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

        {/* CONTENU INCLUS — passage citatable AI */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-12 max-w-2xl">
                <Eyebrow>Ce que comprend l'expertise</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Une visite, un rapport,<br /><em>une décision éclairée.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.08}>
              <div className="bg-ipb-white border border-ipb-rule rounded-[6px] p-8 lg:p-12">
                <ul className="space-y-4 text-[15px] leading-[1.85] text-ipb-text">
                  <li className="flex items-start gap-3">
                    <span className="text-ipb-orange mt-2" aria-hidden="true">▸</span>
                    <span>Inspection complète sur site (1 h 30 à 2 h)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ipb-orange mt-2" aria-hidden="true">▸</span>
                    <span>Mesures d'humidité à l'humidimètre, contrôle hygrométrique</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ipb-orange mt-2" aria-hidden="true">▸</span>
                    <span>Lecture instrumentée des fissures et caractérisation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ipb-orange mt-2" aria-hidden="true">▸</span>
                    <span>Rapport détaillé avec photos, mesures, recommandations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ipb-orange mt-2" aria-hidden="true">▸</span>
                    <span>Estimation chiffrée des reprises identifiées</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ipb-orange mt-2" aria-hidden="true">▸</span>
                    <span>Livraison sous 48 à 72 h (24 h en urgence)</span>
                  </li>
                </ul>

                <p className="text-[13px] text-ipb-muted mt-8 pt-8 border-t border-ipb-rule">
                  Tarif communiqué sous 24 h après description de votre bien et de la date de visite souhaitée.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center mb-16">
                <Eyebrow className="justify-center">Questions fréquentes</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Sur l'expertise<br /><em>avant achat.</em>
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
                      <span className="text-ipb-orange text-2xl leading-none flex-shrink-0 transition-transform group-open:rotate-45 font-light" aria-hidden="true">+</span>
                    </summary>
                    <div className="px-6 lg:px-7 pb-7 -mt-2 text-[14px] leading-[1.85] font-light text-ipb-muted">
                      {item.answer}
                    </div>
                  </details>
                </RevealOnScroll>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/notre-expert" className="text-[13px] text-ipb-orange hover:underline">
                Découvrir Ludovic D., ingénieur structure et fondateur de l'institut →
              </Link>
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
