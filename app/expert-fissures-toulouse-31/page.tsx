import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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
  title: 'Expert fissures Toulouse (31) · Cabinet IPB · Diagnostic et agrafage structurel',
  description: "Cabinet de pathologie du bâtiment à Toulouse. Diagnostic instrumenté de fissures, agrafage structurel et reprise en sous-œuvre. Rapports reconnus par les assurances. Décennale AXA.",
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
    'micropieux toulouse',
    'rapport fissure assurance toulouse',
    'cabinet pathologie bâtiment toulouse',
  ],
  alternates: { canonical: 'https://www.ipb-expertise.fr/expert-fissures-toulouse-31' },
  openGraph: {
    title: 'Expert fissures Toulouse · Cabinet IPB',
    description: "Diagnostic instrumenté, agrafage structurel, reprise en sous-œuvre. Cabinet indépendant à Toulouse depuis 2019.",
    url: 'https://www.ipb-expertise.fr/expert-fissures-toulouse-31',
    type: 'website',
    images: [{
      url: '/images/fissures-avant-apres.webp',
      width: 1200,
      height: 630,
      alt: 'Avant et après agrafage de fissure structurelle — Cabinet IPB Toulouse',
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
    answer: "Notre cabinet vient sur site avec un fissuromètre, un niveau laser et une caméra thermique si nécessaire. Nous mesurons l'évolution, identifions la cause (sécheresse, tassement, défaut de chaînage) et rédigeons un rapport écrit sous 7 jours. Ce rapport est reconnu par votre assurance.",
  },
  {
    question: "Combien coûte une expertise fissures à Toulouse ?",
    answer: "Le diagnostic complet est facturé 249 € TTC, déductible si vous nous confiez ensuite les travaux. Cela inclut le déplacement, les mesures instrumentées et le rapport écrit.",
  },
  {
    question: "Mon assurance prend-elle en charge les fissures de sécheresse ?",
    answer: "Si votre commune a été reconnue en catastrophe naturelle pour la sécheresse de l'année concernée, votre assurance habitation couvre les réparations. Notre rapport documente les désordres et leur lien avec le retrait-gonflement des argiles.",
  },
  {
    question: "Quelle est la différence entre agrafage et micropieux ?",
    answer: "L'agrafage stabilise le mur en cousant la fissure avec des aciers inoxydables (12 000 à 18 000 €). Les micropieux reprennent les fondations en profondeur (40 000 à 60 000 €) — solution lourde réservée aux tassements actifs majeurs. Notre diagnostic détermine laquelle s'impose.",
  },
  {
    question: "Quels sont les délais d'intervention ?",
    answer: "Notre cabinet se déplace sous 7 jours en moyenne sur Toulouse et la Haute-Garonne. Pour les situations urgentes (fissure évolutive, danger), nous pouvons intervenir sous 48 heures.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "IPB - Cabinet de pathologie du bâtiment Toulouse",
  "description": "Cabinet indépendant en diagnostic et traitement des fissures structurelles. Toulouse, Haute-Garonne et Occitanie.",
  "url": "https://www.ipb-expertise.fr/expert-fissures-toulouse-31",
  "telephone": "+33582953375",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "13 rue du Recteur Dottin",
    "addressLocality": "Toulouse",
    "postalCode": "31100",
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
                  Cabinet IPB — pathologie du bâtiment à Toulouse depuis 2019. Diagnostic instrumenté, agrafage structurel et reprise en sous-œuvre. Nos rapports sont reconnus par les assurances et nous traitons en moyenne soixante-dix dossiers par an en Haute-Garonne.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic gratuit
                  </MagneticButton>
                  <MagneticButton href="/expertise/fissures" variant="ghost">
                    Voir notre méthode
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll direction="right" delay={0.1} className="hidden lg:block">
              <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
                <Image
                  src="/images/fissures-avant-apres.webp"
                  alt="Avant/après agrafage structurel à Toulouse — Cabinet IPB"
                  fill
                  sizes="(max-width: 1024px) 0px, 500px"
                  className="object-cover"
                  priority
                />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* CONTEXTE LOCAL — pourquoi Toulouse fissure */}
        <section className="bg-ipb-white py-24 lg:py-32">
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
                    Notre cabinet est spécialisé dans le diagnostic de ces désordres : nous identifions la cause exacte, mesurons l'évolution, et préconisons la solution la plus adaptée — agrafage dans 90 % des cas, micropieux pour les tassements majeurs.
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

        {/* COMMUNES COUVERTES */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <Eyebrow className="justify-center">Communes couvertes</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Notre cabinet intervient<br /><em>partout en Haute-Garonne.</em>
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

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
