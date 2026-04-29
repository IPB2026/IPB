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
  title: 'Expert humidité Toulouse (31) · Institut IPB · Diagnostic instrumenté et injection résine',
  description: "Stoppez l'humidité dans vos murs à Toulouse. Institut IPB : diagnostic instrumenté (humidimètre, caméra thermique), injection résine hydrophobe garantie 30 ans, cuvelage, VMI. Décennale AXA.",
  keywords: [
    'expert humidité toulouse',
    'traitement humidité maison 31',
    'remontées capillaires toulouse',
    'injection résine hydrophobe toulouse',
    'salpêtre mur traitement',
    'moisissures maison toulouse',
    'cave humide toulouse',
    'cuvelage cave 31',
    'VMI ventilation toulouse',
    'humidité mur intérieur',
    'condensation maison',
    'infiltration eau mur',
    'mérule toulouse',
    'assèchement murs humides',
    'diagnostic humidité toulouse',
    'institut pathologie bâtiment toulouse',
  ],
  alternates: { canonical: 'https://www.ipb-expertise.fr/expert-humidite-toulouse-31' },
  openGraph: {
    title: 'Expert humidité Toulouse · Institut IPB',
    description: "Stoppez l'humidité chez vous à Toulouse. Diagnostic instrumenté, injection résine hydrophobe, cuvelage, VMI. Institut IPB depuis 2019.",
    url: 'https://www.ipb-expertise.fr/expert-humidite-toulouse-31',
    type: 'website',
    images: [{
      url: '/images/salpetre-avant-apres.webp',
      width: 1200,
      height: 630,
      alt: "Avant et après traitement du salpêtre par injection résine — Institut IPB Toulouse",
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert humidité Toulouse · IPB',
    description: "Stoppez l'humidité chez vous à Toulouse. Diagnostic instrumenté, injection résine, cuvelage. Décennale AXA.",
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
    question: "Comment savoir si j'ai des remontées capillaires ?",
    answer: "Les signes typiques sont le salpêtre (poudre blanche à la base des murs), la peinture qui cloque, le papier peint qui se décolle, une odeur de moisi persistante et des taches d'humidité montant parfois jusqu'à 1,50 m. Notre humidimètre à sonde permet de mesurer la teneur réelle en eau du mur et de distinguer remontées capillaires, condensation et infiltration.",
  },
  {
    question: "Combien coûte un traitement humidité à Toulouse ?",
    answer: "Le traitement par injection résine hydrophobe se situe entre 80 et 150 €/ml de mur traité. Pour une maison moyenne, comptez 2 500 à 6 000 €. Le diagnostic est une prestation sur site déductible des travaux si vous nous confiez ensuite l'intervention.",
  },
  {
    question: "Quelle est la durée de la garantie ?",
    answer: "Nos traitements par injection résine hydrophobe sont garantis 30 ans. Le cuvelage de cave est garanti 10 ans. Les attestations sont remises avec le rapport de fin de chantier.",
  },
  {
    question: "Combien de temps pour assécher les murs ?",
    answer: "Après injection, le traitement est efficace immédiatement (la barrière hydrophobe stoppe la remontée). Le séchage des murs eux-mêmes prend ensuite 6 à 12 mois selon leur épaisseur et leur exposition. Un suivi est inclus à 3 et 6 mois.",
  },
  {
    question: "Intervenez-vous en cave et sous-sol ?",
    answer: "Oui. Nous proposons le cuvelage pour les caves et sous-sols, c'est-à-dire l'application d'un revêtement imperméable adapté à la pression de l'eau. Cette solution traite les espaces enterrés là où l'injection résine seule ne suffirait pas.",
  },
  {
    question: "Pourquoi un diagnostic instrumenté avant tout traitement ?",
    answer: "Traiter des remontées capillaires avec un déshumidificateur ou de la condensation avec une injection résine, c'est jeter l'argent par la fenêtre. Notre humidimètre, notre caméra thermique et — si nécessaire — un test à la bombe à carbure identifient précisément la source de l'humidité avant tout devis.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "IPB - Institut de pathologie du bâtiment Toulouse",
  "description": "Institut indépendant en diagnostic et traitement de l'humidité. Toulouse, Haute-Garonne et Occitanie.",
  "url": "https://www.ipb-expertise.fr/expert-humidite-toulouse-31",
  "telephone": "+33582953375",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "13 rue du Recteur Dottin",
    "addressLocality": "Toulouse",
    "postalCode": "31100",
    "addressRegion": "Occitanie",
    "addressCountry": "FR",
  },
  "areaServed": [
    { "@type": "City", "name": "Toulouse" },
    { "@type": "AdministrativeArea", "name": "Haute-Garonne (31)" },
    { "@type": "AdministrativeArea", "name": "Tarn-et-Garonne (82)" },
    { "@type": "AdministrativeArea", "name": "Gers (32)" },
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

const problematiques = [
  { href: '/remontee-capillaire-solution', titre: 'Remontées capillaires', desc: "L'eau du sol qui monte dans les murs par capillarité." },
  { href: '/salpetre-mur-traitement', titre: 'Salpêtre', desc: "Dépôts blancs cristallisés sur les murs humides." },
  { href: '/moisissures-maison-sante', titre: 'Moisissures', desc: 'Champignons noirs sur murs et plafonds — enjeu sanitaire.' },
  { href: '/cave-humide-solutions', titre: 'Cave humide', desc: 'Infiltrations et condensation en sous-sol enterré.' },
  { href: '/condensation-ou-infiltration', titre: 'Condensation', desc: 'Eau qui se forme sur les surfaces froides intérieures.' },
  { href: '/merule-champignon-traitement', titre: 'Mérule', desc: 'Le champignon lignivore qui dégrade les bois de structure.' },
];

const solutions = [
  {
    titre: 'Injection résine hydrophobe',
    desc: "Barrière étanche injectée dans le mur à la base. Stoppe définitivement la remontée capillaire en bloquant l'absorption de l'eau du sol.",
    garantie: '30 ans',
  },
  {
    titre: 'Cuvelage de cave',
    desc: "Étanchéité totale des sous-sols et caves enterrées par application d'un revêtement imperméable adapté à la pression de l'eau.",
    garantie: '10 ans',
  },
  {
    titre: 'VMI — Ventilation par insufflation',
    desc: "Système qui insuffle de l'air sain et asséchant dans le logement. Solution complémentaire pour traiter la condensation et les moisissures.",
    garantie: 'Constructeur',
  },
];

export default function ExpertHumiditeToulousePage() {
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
                  Expert humidité<br />
                  <em>à Toulouse et Haute-Garonne.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  Institut IPB — pathologie du bâtiment à Toulouse depuis 2019. Diagnostic instrumenté de l'humidité (humidimètre, caméra thermique, bombe à carbure), injection résine hydrophobe, cuvelage et VMI. Avant de traiter, nous identifions la cause exacte.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic gratuit
                  </MagneticButton>
                  <MagneticButton href="/expertise/humidite" variant="ghost">
                    Voir notre méthode
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* CONTEXTE LOCAL — pourquoi Toulouse est touchée */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <RevealOnScroll className="lg:col-span-5">
                <Eyebrow>Le contexte toulousain</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Sols argileux,<br /><em>climat semi-continental, bâti ancien.</em>
                </h2>
              </RevealOnScroll>

              <div className="lg:col-span-7 space-y-5 text-[15px] leading-[1.9] font-light text-ipb-muted">
                <RevealOnScroll delay={0.06}>
                  <p>
                    Plus de 80 % des sols de la Haute-Garonne sont argileux. L'argile retient l'eau comme une éponge : elle gonfle en période de pluie et pousse l'humidité vers les fondations. Les maisons construites sans barrière étanche — la majorité des constructions antérieures à 1990 — absorbent cette humidité par capillarité.
                  </p>
                </RevealOnScroll>
                <RevealOnScroll delay={0.12}>
                  <p>
                    Toulouse alterne entre des hivers humides (~800 mm de précipitations annuelles) et des étés caniculaires. Ce contraste provoque des cycles de gonflement et retrait du sol qui stressent les fondations et aggravent les remontées capillaires. En hiver, la condensation sur les murs froids crée un terrain propice aux moisissures, surtout dans les logements mal ventilés.
                  </p>
                </RevealOnScroll>
                <RevealOnScroll delay={0.18}>
                  <p>
                    42 % des logements toulousains ont été construits avant 1975, avant les réglementations thermiques et les normes d'étanchéité modernes. Ces maisons n'ont souvent ni membrane d'étanchéité en pied de mur, ni ventilation mécanique. Résultat : les remontées capillaires peuvent atteindre 1,50 m de hauteur.
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
                { value: 523, suffix: '+', label: 'Maisons assainies' },
                { value: 30, suffix: ' ans', label: "Garantie injection" },
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

        {/* PROBLÉMATIQUES — topic cluster humidité */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Six familles d'humidité</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Avant de traiter,<br /><em>nous identifions la cause.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ipb-rule border border-ipb-rule">
              {problematiques.map((p, i) => (
                <RevealOnScroll key={p.titre} delay={i * 0.04}>
                  <Link
                    href={p.href}
                    className="block bg-ipb-white p-8 lg:p-10 h-full hover:bg-ipb-stone transition-colors duration-300 group"
                  >
                    <h3 className="font-serif text-ipb-text font-bold text-[20px] leading-tight mb-3 group-hover:text-ipb-orange transition-colors">
                      {p.titre}
                    </h3>
                    <p className="text-[14px] leading-[1.85] font-light text-ipb-muted mb-5">
                      {p.desc}
                    </p>
                    <span className="text-[13px] text-ipb-orange font-medium">
                      Lire le guide →
                    </span>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTIONS */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Nos solutions techniques</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Trois techniques,<br /><em>une logique : couper la cause.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-px bg-ipb-rule border border-ipb-rule">
              {solutions.map((s, i) => (
                <RevealOnScroll key={s.titre} delay={i * 0.06}>
                  <article className="bg-ipb-white p-8 lg:p-10 h-full flex flex-col">
                    <span className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-4">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-ipb-text font-bold text-[20px] leading-tight mb-3">
                      {s.titre}
                    </h3>
                    <p className="text-[14px] leading-[1.85] font-light text-ipb-muted mb-6 flex-grow">
                      {s.desc}
                    </p>
                    <p className="text-[12px] text-ipb-orange uppercase tracking-[0.14em] font-bold">
                      Garantie {s.garantie}
                    </p>
                  </article>
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

        {/* FAQ */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center mb-16">
                <Eyebrow className="justify-center">Questions fréquentes</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Sur l'humidité<br /><em>en Haute-Garonne.</em>
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
