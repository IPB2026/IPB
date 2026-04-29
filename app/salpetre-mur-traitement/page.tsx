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

export const metadata: Metadata = {
  title: 'Salpêtre · Causes, dangers et traitement par injection résine · Institut IPB',
  description: "Salpêtre (poudre blanche) sur vos murs ? C'est le signe d'une remontée capillaire. Traitement par injection résine hydrophobe garanti 30 ans. Institut IPB Toulouse, Montauban, Auch.",
  keywords: ['salpêtre mur', 'poudre blanche mur', 'nitrate potassium', 'traitement salpêtre', 'humidité murs', 'salpêtre toulouse'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/salpetre-mur-traitement' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const faussesSolutions = [
  { solution: 'Brosser le salpêtre', resultat: 'Réapparaît en quelques semaines', efficacite: '0 %' },
  { solution: 'Peinture anti-humidité', resultat: 'Cloque et s\'écaille rapidement', efficacite: '0 %' },
  { solution: 'Enduit « respirant »', resultat: 'Masque temporairement', efficacite: '10 %' },
  { solution: 'Produit anti-salpêtre', resultat: 'Effet 3 à 6 mois maximum', efficacite: '20 %' },
];

const etapesTraitement = [
  { num: '01', titre: 'Diagnostic', desc: "Mesure du taux d'humidité, localisation des zones touchées avec humidimètre à sonde.", duree: '1 h 30' },
  { num: '02', titre: 'Perçage', desc: 'Forages tous les 12 cm à la base du mur sur la périphérie concernée.', duree: '1 jour' },
  { num: '03', titre: 'Injection', desc: 'Résine hydrophobe injectée par gravité ou sous pression. La barrière étanche se forme.', duree: '1 à 2 jours' },
  { num: '04', titre: 'Séchage', desc: "Le mur s'assèche naturellement, le salpêtre disparaît. Suivi inclus à 3 et 6 mois.", duree: '3 à 6 mois' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment traiter définitivement le salpêtre sur un mur ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Le seul traitement efficace et durable est l'injection de résine hydrophobe à la base des murs pour stopper les remontées capillaires, cause du salpêtre. Le procédé consiste à percer des trous tous les 12 cm, puis à injecter la résine. Le mur s'assèche en 3 à 6 mois et le salpêtre disparaît. Traitement garanti 30 ans.",
      },
    },
    {
      '@type': 'Question',
      name: 'Le salpêtre est-il dangereux pour la santé ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Le salpêtre (nitrate de potassium KNO₃) en lui-même est peu toxique, mais il signale un problème d'humidité important qui favorise le développement de moisissures dangereuses pour la santé (allergies, asthme, problèmes respiratoires). Il dégrade aussi les matériaux et diminue l'isolation thermique.",
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi le salpêtre revient-il après nettoyage ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Le salpêtre revient car le nettoyage ne traite que le symptôme, pas la cause. L'eau continue de remonter par capillarité, transportant les sels minéraux du sol. En s'évaporant, elle dépose de nouveaux cristaux à la surface.",
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte un traitement anti-salpêtre par injection de résine ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Le traitement par injection de résine hydrophobe se situe entre 80 et 120 € par mètre linéaire de mur traité. Le diagnostic préalable est déduit à 100 % des travaux. L'intervention dure 1 à 2 jours et le séchage complet du mur prend 3 à 6 mois. Garanti 30 ans.",
      },
    },
  ],
};

const faqItems = faqSchema.mainEntity.map((q) => ({
  question: q.name,
  answer: q.acceptedAnswer.text,
}));

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment traiter le salpêtre sur un mur définitivement',
  description: "Méthode professionnelle de l'institut IPB pour éliminer le salpêtre en coupant la cause à la base du mur (injection résine hydrophobe).",
  totalTime: 'P6M',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'EUR', value: '3500' },
  supply: [{ '@type': 'HowToSupply', name: 'Résine hydrophobe silicone ou silane' }],
  tool: [
    { '@type': 'HowToTool', name: 'Humidimètre à sonde' },
    { '@type': 'HowToTool', name: 'Perforateur professionnel' },
    { '@type': 'HowToTool', name: 'Pompe à injection' },
  ],
  step: etapesTraitement.map((etape, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: etape.titre,
    text: etape.desc,
    url: `https://www.ipb-expertise.fr/salpetre-mur-traitement#etape-${i + 1}`,
  })),
};

export default function SalpetrePage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="faq-schema-salpetre" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="howto-jsonld-salpetre" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      {/* Breadcrumb */}
      <div className="bg-ipb-cream border-b border-ipb-rule py-3">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 text-sm text-ipb-muted">
          <Link href="/" className="hover:text-ipb-orange transition-colors">Accueil</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <Link href="/expert-humidite-toulouse-31" className="hover:text-ipb-orange transition-colors">Expert humidité</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <span className="text-ipb-text">Salpêtre</span>
        </div>
      </div>

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto grid lg:grid-cols-[58fr_42fr] gap-12 lg:gap-16 px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28 items-center">
            <div>
              <RevealOnScroll>
                <Eyebrow>Signe de remontées capillaires</Eyebrow>
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
                  Salpêtre sur vos murs.<br />
                  <em>Traiter la cause, pas le symptôme.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[560px]">
                  Cette poudre blanche cristalline au pied de vos murs n'est pas de la moisissure : c'est du <strong className="text-ipb-text font-medium">nitrate de potassium</strong>. Elle révèle une remontée capillaire qui ne se règlera pas toute seule. La seule solution durable : couper la cause à la base du mur.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic gratuit
                  </MagneticButton>
                  <MagneticButton href="/expert-humidite-toulouse-31" variant="ghost">
                    Voir notre méthode
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll direction="right" delay={0.1} className="hidden lg:block">
              <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
                <Image
                  src="/images/salpetre-avant-apres.webp"
                  alt="Avant et après traitement du salpêtre par injection résine — Institut IPB"
                  fill
                  sizes="(max-width: 1024px) 0px, 500px"
                  className="object-cover"
                  priority
                />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* QU'EST-CE QUE LE SALPÊTRE */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <Eyebrow>Comprendre le phénomène</Eyebrow>
              <h2 className="font-serif text-ipb-text mb-8" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                Qu'est-ce que le salpêtre&nbsp;?
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.06}>
              <div className="space-y-5 text-[15px] leading-[1.9] font-light text-ipb-muted">
                <p>
                  Le salpêtre — chimiquement <strong className="text-ipb-text font-medium">nitrate de potassium (KNO₃)</strong> — se forme quand l'eau chargée en sels minéraux remonte par capillarité dans le mur. En s'évaporant à la surface, l'eau laisse des cristaux blancs qui s'accumulent en pied de mur.
                </p>
                <p>
                  La poudre blanche n'est donc pas la cause du problème : c'est le <strong className="text-ipb-text font-medium">marqueur visible d'une remontée d'eau</strong>. Tant que la remontée n'est pas coupée, le salpêtre réapparaît, quelles que soient les actions de surface.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* FAUSSES SOLUTIONS */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Attention aux fausses solutions</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Ce qui ne fonctionne pas,<br /><em>et pourquoi.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="bg-ipb-white border border-ipb-rule rounded-[6px]">
              {faussesSolutions.map((item, i) => (
                <RevealOnScroll key={item.solution} delay={i * 0.04}>
                  <div className={`flex items-center justify-between gap-6 p-6 lg:p-7 ${i < faussesSolutions.length - 1 ? 'border-b border-ipb-rule' : ''}`}>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-ipb-text font-bold text-[17px] leading-tight mb-1">
                        {item.solution}
                      </h3>
                      <p className="text-[13px] leading-[1.7] font-light text-ipb-muted">
                        {item.resultat}
                      </p>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-red-700 border border-red-200 bg-red-50 px-3 py-1.5 rounded-[3px] flex-shrink-0">
                      {item.efficacite}
                    </span>
                  </div>
                </RevealOnScroll>
              ))}

              <RevealOnScroll>
                <div className="flex items-center justify-between gap-6 p-6 lg:p-7 bg-ipb-cream border-t-2 border-ipb-orange">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-ipb-text font-bold text-[17px] leading-tight mb-1">
                      Injection résine hydrophobe
                    </h3>
                    <p className="text-[13px] leading-[1.7] font-light text-ipb-muted">
                      Traitement de la cause = résultat durable
                    </p>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-ipb-orange border border-ipb-orange/30 bg-ipb-orange/5 px-3 py-1.5 rounded-[3px] flex-shrink-0">
                    95 % · 30 ans
                  </span>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* PROCESSUS */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow variant="dark">Le seul traitement efficace</Eyebrow>
                <h2 className="font-serif text-white" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Quatre étapes,<br /><em>une cause coupée à la base.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <ul className="space-y-8">
              {etapesTraitement.map((etape, i) => (
                <RevealOnScroll key={etape.num} delay={0.08 + i * 0.06}>
                  <li className="grid grid-cols-[40px_1fr_auto] gap-5 items-start pb-8 border-b border-white/10">
                    <span className="font-serif text-ipb-orange-l text-[14px] font-bold tracking-wider pt-2">
                      {etape.num}
                    </span>
                    <div>
                      <h3 className="font-serif text-white text-[20px] font-bold leading-tight mb-2">{etape.titre}</h3>
                      <p className="text-[14px] leading-[1.75] font-light text-white/65">{etape.desc}</p>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-ipb-orange-l whitespace-nowrap pt-3">
                      {etape.duree}
                    </span>
                  </li>
                </RevealOnScroll>
              ))}
            </ul>

            <RevealOnScroll delay={0.3}>
              <div className="mt-16 grid grid-cols-3 gap-8 lg:gap-12 pt-12 border-t border-white/10">
                <div>
                  <p className="font-serif text-white font-bold leading-none mb-3" style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
                    80–120<span className="text-ipb-orange-l">€</span>
                  </p>
                  <p className="text-[12px] text-white uppercase tracking-[0.14em] font-medium">par mètre linéaire</p>
                </div>
                <div>
                  <p className="font-serif text-white font-bold leading-none mb-3" style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
                    30<span className="text-ipb-orange-l"> ans</span>
                  </p>
                  <p className="text-[12px] text-white uppercase tracking-[0.14em] font-medium">de garantie</p>
                </div>
                <div>
                  <p className="font-serif text-white font-bold leading-none mb-3" style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
                    95<span className="text-ipb-orange-l"> %</span>
                  </p>
                  <p className="text-[12px] text-white uppercase tracking-[0.14em] font-medium">d'efficacité</p>
                </div>
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
                  Sur le salpêtre<br /><em>et son traitement.</em>
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

        {/* Articles connexes */}
        <nav aria-label="Articles connexes" className="bg-ipb-cream py-20 lg:py-24">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <p className="text-2xl font-serif font-bold text-ipb-text mb-8 text-center">
              Articles connexes
            </p>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-px bg-ipb-rule border border-ipb-rule">
              {[
                { href: '/remontees-capillaires-traitement', title: 'Remontées capillaires', desc: 'La cause du salpêtre' },
                { href: '/moisissures-maison-sante', title: 'Moisissures', desc: 'Risques santé' },
                { href: '/cave-humide-solutions', title: 'Cave humide', desc: 'Solutions cuvelage' },
                { href: '/vmi-ventilation-insufflation', title: 'VMI', desc: 'Ventilation par insufflation' },
                { href: '/expertise/humidite', title: 'Guide humidité', desc: 'Toutes nos solutions' },
                { href: '/expertise/fissures', title: 'Fissures', desc: 'Diagnostic et agrafage' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group block bg-ipb-white p-6 hover:bg-ipb-stone transition-colors duration-300"
                >
                  <h3 className="font-serif text-ipb-text font-bold text-[15px] leading-tight mb-2 group-hover:text-ipb-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[12px] leading-[1.7] font-light text-ipb-muted">
                    {item.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
