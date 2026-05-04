import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Testimonials } from '@/components/home/Testimonials';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { StatCounter } from '@/components/ui/StatCounter';

export const metadata: Metadata = {
  title: 'Expert Fissures Toulouse 31 · Diagnostic 48h · AXA',
  description: "Diagnostic fissures à Toulouse : agrafage structurel, rapport opposable assurance. 70 dossiers/an. Décennale AXA. Sous 48h. ☎ 05 82 95 33 75",
  keywords: [
    'expert fissures toulouse',
    'expert fissure toulouse',
    'expertise fissure toulouse',
    'expert fissure maison toulouse',
    'expert fissures haute garonne',
    'agrafage fissures toulouse',
    'diagnostic fissures toulouse',
    'fissures maison toulouse',
    'tassement différentiel toulouse',
    'sol argileux fissures toulouse',
    'catastrophe naturelle sécheresse toulouse',
    'rapport fissure assurance toulouse',
    'institut pathologie bâtiment toulouse',
  ],
  alternates: { canonical: 'https://www.ipb-expertise.fr/expert-fissures-toulouse-31' },
  openGraph: {
    title: 'Expert Fissures Toulouse · Décennale AXA · IPB',
    description: "Diagnostic, agrafage structurel, rapport opposable assurance. Décennale AXA. 70 dossiers/an.",
    url: 'https://www.ipb-expertise.fr/expert-fissures-toulouse-31',
    type: 'website',
    images: [{
      url: '/images/fissures-avant-apres.webp',
      width: 1200,
      height: 630,
      alt: 'Avant et après agrafage de fissure structurelle — Institut IPB Toulouse',
    }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const communes = [
  'Toulouse', 'Colomiers', 'Tournefeuille', 'Blagnac', 'Muret',
  'Cugnaux', 'Plaisance-du-Touch', 'Balma', "L'Union", 'Ramonville-Saint-Agne',
  'Saint-Orens-de-Gameville', 'Castanet-Tolosan', 'Fonsorbes', 'Portet-sur-Garonne', 'Quint-Fonsegrives',
];

const faqItems = [
  {
    question: "Comment se déroule une expertise fissures à Toulouse ?",
    answer: "Notre institut vient sur site avec un fissuromètre, un niveau laser et une caméra thermique si nécessaire. Nous mesurons l'évolution, identifions la cause (sécheresse, tassement, défaut de chaînage) et rédigeons un rapport écrit sous 7 jours. Ce rapport est reconnu par votre assurance.",
  },
  {
    question: "Comment se passe une expertise fissures à Toulouse ?",
    answer: "Le diagnostic complet est réalisé sur site et déductible des travaux si vous nous confiez ensuite l'intervention. Il inclut le déplacement, les mesures instrumentées et le rapport écrit. Le tarif précis vous est communiqué sous 24 heures après description de votre situation.",
  },
  {
    question: "Mon assurance prend-elle en charge les fissures de sécheresse ?",
    answer: "Si votre commune a été reconnue en catastrophe naturelle pour la sécheresse de l'année concernée, votre assurance habitation couvre les réparations. Notre rapport documente les désordres et leur lien avec le retrait-gonflement des argiles.",
  },
  {
    question: "Quelle est la différence entre agrafage et micropieux ?",
    answer: "L'agrafage stabilise le mur en cousant la fissure avec des aciers inoxydables (12 000 à 18 000 €). Les micropieux reprennent les fondations en profondeur (40 000 à 60 000 €) — intervention lourde réservée aux tassements actifs majeurs. Notre institut réalise l'agrafage structurel ; pour les rares cas nécessitant des micropieux, nous orientons vers un partenaire spécialisé après diagnostic.",
  },
  {
    question: "Quels sont les délais d'intervention ?",
    answer: "Notre institut se déplace sous 7 jours en moyenne sur Toulouse et la Haute-Garonne. Pour les situations urgentes (fissure évolutive, danger), nous pouvons intervenir sous 48 heures.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "IPB - Institut de pathologie du bâtiment Toulouse",
  "description": "Institut indépendant en diagnostic et traitement des fissures structurelles. Toulouse, Haute-Garonne et Occitanie.",
  "url": "https://www.ipb-expertise.fr/expert-fissures-toulouse-31",
  "telephone": "+33582953375",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "54 avenue Jean Jaurès",
    "addressLocality": "Tournefeuille",
    "postalCode": "31170",
    "addressRegion": "Occitanie",
    "addressCountry": "FR"
  },
  "areaServed": [
    { "@type": "City", "name": "Toulouse" },
    { "@type": "AdministrativeArea", "name": "Haute-Garonne" },
  ],
  "priceRange": "€€",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "15"
  }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
};

export default function ExpertFissuresToulousePage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto grid lg:grid-cols-[58fr_42fr] gap-12 lg:gap-16 px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28 items-center">
            <div>
              <RevealOnScroll>
                <Eyebrow>Page locale · Toulouse · Haute-Garonne (31)</Eyebrow>
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
                  <em>à Toulouse et Haute-Garonne.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[560px]">
                  Institut IPB — pathologie du bâtiment à Toulouse depuis 2019. Diagnostic instrumenté, agrafage structurel et reprise en sous-œuvre. Nos rapports sont reconnus par les assurances et nous traitons en moyenne soixante-dix dossiers par an en Haute-Garonne.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic gratuit en 2 min
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

              {/* Mini trust-line sous les CTA — preuves rapides scannables */}
              <RevealOnScroll delay={0.22}>
                <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 text-[12px] text-ipb-muted font-light">
                  <li className="flex items-center gap-1.5">
                    <span className="text-ipb-orange" aria-hidden="true">✓</span>
                    <span>Sans engagement</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-ipb-orange" aria-hidden="true">✓</span>
                    <span>Réponse sous 48h</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-ipb-orange" aria-hidden="true">✓</span>
                    <span>Décennale AXA</span>
                  </li>
                </ul>
              </RevealOnScroll>
            </div>

            <RevealOnScroll direction="right" delay={0.1} className="hidden lg:block">
              <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
                <Image
                  src="/images/fissure-mur-toulousain-real.webp"
                  alt="Fissure structurelle sur un mur toulousain — diagnostic IPB Haute-Garonne"
                  fill
                  sizes="(max-width: 1024px) 0px, 500px"
                  className="object-cover"
                  priority
                />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* RECONNAISSANCE DU PROBLÈME (PAS — miroir du visiteur) */}
        <section className="bg-ipb-white py-20 lg:py-24 border-t border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <RevealOnScroll>
                  <Eyebrow>Si vous lisez cette page…</Eyebrow>
                  <h2 className="font-serif text-ipb-text mb-8" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.18, letterSpacing: '-0.022em', fontWeight: 700 }}>
                    Vous avez vu apparaître des fissures<br /><em>et vous vous demandez si c'est grave.</em>
                  </h2>
                </RevealOnScroll>
                <div className="space-y-5 text-[15px] leading-[1.9] font-light text-ipb-muted">
                  <RevealOnScroll delay={0.06}>
                    <p>
                      Elles se sont peut-être agrandies cet été. Elles sont peut-être en escalier le long d'un angle, ou horizontales à mi-hauteur d'un mur. Vous hésitez : <em>est-ce qu'une lézarde de 2 mm est dangereuse ?</em> Est-ce que ça va s'arrêter tout seul ? Est-ce que votre assurance prendra en charge ?
                    </p>
                  </RevealOnScroll>
                  <RevealOnScroll delay={0.12}>
                    <p>
                      Surtout, vous ne voulez pas faire la mauvaise chose : payer 15 000 € de rustines qui fissureront à nouveau l'été prochain. Ou attendre trop longtemps et voir le devis passer de 12 000 € à 35 000 €.
                    </p>
                  </RevealOnScroll>
                  <RevealOnScroll delay={0.18}>
                    <p className="text-ipb-text">
                      Notre rôle commence avant les travaux. Notre ingénieur se déplace, mesure l'évolution, identifie la <strong className="not-italic">cause exacte</strong> — sécheresse, défaut de chaînage, infiltration — et vous dit honnêtement si une intervention est nécessaire ou si vous pouvez attendre.
                    </p>
                  </RevealOnScroll>
                </div>
              </div>

              <RevealOnScroll direction="right" delay={0.1} className="lg:col-span-5">
                <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
                  <Image
                    src="/images/fissure-mur-real.webp"
                    alt="Fissure structurelle observée sur une maison en Haute-Garonne — diagnostic IPB"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* CONTEXTE LOCAL — pourquoi Toulouse fissure */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <RevealOnScroll className="lg:col-span-5">
                <Eyebrow>Le contexte toulousain</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Un sol argileux,<br /><em>des étés de plus en plus secs.</em>
                </h2>
              </RevealOnScroll>

              <div className="lg:col-span-7 space-y-5 text-[15px] leading-[1.9] font-light text-ipb-muted">
                <RevealOnScroll delay={0.06}>
                  <p>
                    Toulouse et la Haute-Garonne reposent en grande partie sur des sols argileux gonflants. Ces argiles se contractent en été (sécheresse) et se dilatent en hiver (saturation). Les fondations bougent en conséquence — c'est ce qu'on appelle le retrait-gonflement des argiles, ou RGA.
                  </p>
                </RevealOnScroll>
                <RevealOnScroll delay={0.12}>
                  <p>
                    Depuis la sécheresse historique de 2022, plusieurs centaines de communes de la Haute-Garonne ont été reconnues en état de catastrophe naturelle. Les maisons construites avant 1970, sans fondations dimensionnées pour ce phénomène, sont les plus exposées. Les fissures apparaissent souvent au droit des angles, en escalier sur les façades, ou horizontalement à mi-hauteur.
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
                { value: 850, suffix: '+', label: 'Chantiers livrés' },
                { value: 70, label: 'Dossiers par an', sublabel: 'en moyenne' },
                { value: 4.9, decimals: 1, suffix: '/5', label: 'Avis Google' },
                { value: 10, suffix: ' ans', label: 'Décennale AXA' },
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

        {/* PROCESSUS EN 4 ÉTAPES — démystifier le parcours, réduire l'anxiété */}
        <section className="bg-ipb-white py-24 lg:py-32 border-y border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <RevealOnScroll>
                  <Eyebrow>Notre processus</Eyebrow>
                  <h2 className="font-serif text-ipb-text mb-6" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                    De votre première description<br /><em>aux travaux livrés.</em>
                  </h2>
                </RevealOnScroll>
                <RevealOnScroll delay={0.06}>
                  <p className="text-[14px] leading-[1.85] font-light text-ipb-muted mb-8">
                    Quatre étapes claires, un seul interlocuteur, aucune surprise. Tout commence par une description en ligne — gratuite, sans engagement.
                  </p>
                </RevealOnScroll>
                <RevealOnScroll delay={0.12}>
                  <MagneticButton href="/diagnostic" variant="primary">
                    Commencer par l'étape 1
                  </MagneticButton>
                </RevealOnScroll>
              </div>

              <ul className="lg:col-span-8 space-y-7">
                {[
                  {
                    titre: 'Vous décrivez votre situation',
                    detail: 'Diagnostic en ligne en 2 minutes. Vous nous expliquez où sont les fissures, depuis quand, leur largeur. Vous pouvez joindre une photo. Aucune coordonnée demandée avant la dernière étape.',
                    delai: 'Étape 1 · 2 min en ligne',
                  },
                  {
                    titre: 'Notre ingénieur vous rappelle',
                    detail: 'Sous 48h ouvrées, premier avis téléphonique : ce que nous lisons dans vos descriptions, urgent ou non, démarches assurance possibles. Souvent ce premier échange suffit à vous rassurer.',
                    delai: 'Étape 2 · Sous 48h',
                  },
                  {
                    titre: 'Visite expert sur site',
                    detail: 'Mesures au fissuromètre, niveau laser, caméra thermique si nécessaire. Nous identifions la cause exacte (sécheresse, défaut chaînage, infiltration). La visite est offerte si vous nous confiez le traitement.',
                    delai: 'Étape 3 · Sur rendez-vous',
                  },
                  {
                    titre: 'Rapport, devis, travaux',
                    detail: 'Rapport écrit opposable aux assurances sous 7 jours. Devis détaillé. Si vous confirmez : agrafage structurel sous garantie décennale AXA, chantier 3 à 5 jours selon ampleur.',
                    delai: 'Étape 4 · Travaux décennale',
                  },
                ].map((etape, i) => (
                  <RevealOnScroll key={etape.titre} delay={0.08 + i * 0.05}>
                    <li className="grid grid-cols-[44px_1fr] gap-5 pb-7 border-b border-ipb-rule last:border-b-0 last:pb-0">
                      <span className="font-serif text-ipb-orange text-[18px] font-bold tracking-wider pt-1">
                        0{i + 1}
                      </span>
                      <div>
                        <p className="text-[10px] text-ipb-light uppercase tracking-[0.16em] mb-1.5">{etape.delai}</p>
                        <h3 className="font-serif text-ipb-text font-bold text-[18px] sm:text-[20px] leading-tight mb-2">{etape.titre}</h3>
                        <p className="text-[14px] leading-[1.75] font-light text-ipb-muted">{etape.detail}</p>
                      </div>
                    </li>
                  </RevealOnScroll>
                ))}
              </ul>
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
                  Notre institut intervient<br /><em>partout en Haute-Garonne.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {communes.map((commune) => (
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

        {/* PREUVE SOCIALE — avis clients vérifiés */}
        <Testimonials />

        {/* FAQ */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center mb-16">
                <Eyebrow className="justify-center">Questions fréquentes</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Sur les fissures<br /><em>en Haute-Garonne.</em>
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
          </div>
        </section>

        {/* Aller plus loin — maillage interne blog */}
        <section className="bg-ipb-cream border-t border-ipb-rule py-20 lg:py-24">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center mb-12">
                <Eyebrow className="justify-center">Pour aller plus loin</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(24px, 2.2vw, 32px)', lineHeight: 1.2, letterSpacing: '-0.02em', fontWeight: 700 }}>
                  Comprendre ses fissures <em>avant l'expertise.</em>
                </h2>
              </div>
            </RevealOnScroll>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/fissure-en-escalier-causes" className="group block bg-white border border-ipb-rule rounded-[6px] p-6 hover:border-ipb-orange transition-colors">
                <div className="text-[11px] uppercase tracking-wider text-ipb-orange font-bold mb-2">Article expertise</div>
                <h3 className="font-serif font-bold text-ipb-text text-[16px] leading-snug mb-3 group-hover:text-ipb-orange transition-colors">Fissures en escalier : causes et danger réel</h3>
                <p className="text-[13px] text-ipb-muted leading-relaxed">Pourquoi elles apparaissent à Toulouse, et comment les distinguer des fissures cosmétiques.</p>
              </Link>
              <Link href="/microfissure-quand-sinquieter" className="group block bg-white border border-ipb-rule rounded-[6px] p-6 hover:border-ipb-orange transition-colors">
                <div className="text-[11px] uppercase tracking-wider text-ipb-orange font-bold mb-2">Article expertise</div>
                <h3 className="font-serif font-bold text-ipb-text text-[16px] leading-snug mb-3 group-hover:text-ipb-orange transition-colors">Microfissure : quand s'inquiéter ?</h3>
                <p className="text-[13px] text-ipb-muted leading-relaxed">Critères de gravité, signes d'évolution, et seuil d'intervention pour un expert.</p>
              </Link>
              <Link href="/fissure-secheresse-indemnisation" className="group block bg-white border border-ipb-rule rounded-[6px] p-6 hover:border-ipb-orange transition-colors">
                <div className="text-[11px] uppercase tracking-wider text-ipb-orange font-bold mb-2">Démarches</div>
                <h3 className="font-serif font-bold text-ipb-text text-[16px] leading-snug mb-3 group-hover:text-ipb-orange transition-colors">Sécheresse RGA : indemnisation CAT-NAT</h3>
                <p className="text-[13px] text-ipb-muted leading-relaxed">Constituer son dossier, contre-expertise, délais. Spécifique Haute-Garonne.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* RENVERSEMENT DU RISQUE — bloc d'apaisement avant le CTA final */}
        <section className="bg-ipb-white py-16 lg:py-20 border-t border-ipb-rule">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <RevealOnScroll>
              <p className="text-[10px] text-ipb-orange uppercase tracking-[0.18em] font-semibold mb-4">
                Vous hésitez ?
              </p>
              <p className="font-serif text-ipb-text mb-5" style={{ fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: 1.4, letterSpacing: '-0.015em', fontWeight: 500 }}>
                Le diagnostic en ligne ne vous engage à rien.
              </p>
              <p className="text-[15px] leading-[1.85] font-light text-ipb-muted">
                Vous obtenez un premier avis d'un ingénieur structure, gratuitement. <strong className="text-ipb-text not-italic">Si la situation ne nécessite pas d'intervention, on vous le dira</strong> — c'est l'engagement de l'institut. Mieux vaut un avis juste qu'un devis vendu.
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
