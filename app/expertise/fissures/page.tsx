import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { fissureFaq } from '@/app/data/faqs';
import Image from 'next/image';
import Script from 'next/script';
import { DiagnosticHowToSchema, AgrafageHowToSchema } from '@/components/seo/HowToSchema';
import { ExpertiseFissuresBreadcrumb } from '@/components/seo/BreadcrumbSchema';

export const metadata = {
  title: 'Diagnostic et traitement des fissures · Toulouse · IPB',
  description: 'Cabinet de pathologie du bâtiment. Diagnostic instrumenté, agrafage structurel, reprise en sous-œuvre. Rapports reconnus par les assurances. Toulouse, Montauban, Auch, Albi.',
  keywords: [
    'expert fissures toulouse',
    'expertise fissure toulouse',
    'expert fissure maison toulouse',
    'expertise fissure haute-garonne',
    'expertise fissure tarn-et-garonne',
    'agrafage fissures',
    'fissures maison toulouse',
    'expertise fissure montauban',
    'expertise fissure auch',
    'expertise fissure albi',
    'diagnostic fissures prix',
    'rapport fissure assurance',
    'tassement différentiel toulouse',
    'sol argileux fissures',
    'RGA haute-garonne',
  ],
  alternates: { canonical: 'https://www.ipb-expertise.fr/expertise/fissures' },
  openGraph: {
    title: 'Diagnostic et traitement des fissures · Cabinet IPB Toulouse',
    description: "Diagnostic instrumenté, agrafage structurel, reprise en sous-œuvre. Rapports reconnus par les assurances. Décennale AXA.",
    url: 'https://www.ipb-expertise.fr/expertise/fissures',
    siteName: 'IPB - Institut de Pathologie du Bâtiment',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/images/fissures-avant-apres.webp', width: 1200, height: 630, alt: 'Avant et après agrafage de fissure structurelle — IPB Toulouse' }],
  },
};

const generateFaqJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": fissureFaq.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
});

const generateServiceJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Diagnostic et traitement de fissures",
  "provider": {
    "@type": "LocalBusiness",
    "name": "IPB - Institut de Pathologie du Bâtiment",
    "telephone": "+33582953375",
    "address": { "@type": "PostalAddress", "streetAddress": "13 rue du Recteur Dottin", "addressLocality": "Toulouse", "addressRegion": "Occitanie", "postalCode": "31100", "addressCountry": "FR" }
  },
  "areaServed": [{ "@type": "AdministrativeArea", "name": "Haute-Garonne (31)" }, { "@type": "AdministrativeArea", "name": "Tarn-et-Garonne (82)" }, { "@type": "AdministrativeArea", "name": "Gers (32)" }, { "@type": "AdministrativeArea", "name": "Tarn (81)" }],
  "description": "Diagnostic instrumenté de fissures, agrafage structurel, reprise en sous-œuvre. Rapports reconnus par les assurances. Décennale AXA."
});

const typesFissures = [
  {
    severity: 'Modérée',
    severityColor: 'bg-amber-500',
    title: 'Faïençage',
    width: '< 0,2 mm',
    desc: "Réseau de micro-fissures sur la peinture ou l'enduit. Cause principale : retrait de l'enduit ou variations thermiques.",
    action: "Surveillance simple, ravalement esthétique si gêne.",
  },
  {
    severity: 'Vigilance',
    severityColor: 'bg-orange-500',
    title: 'Fissures verticales',
    width: '0,2 à 2 mm',
    desc: "Fissure rectiligne au droit d'un angle ou d'une ouverture. Souvent liée à un retrait de la maçonnerie ou un léger tassement.",
    action: "Diagnostic instrumenté pour mesurer l'évolution. Agrafage si active.",
  },
  {
    severity: 'Active',
    severityColor: 'bg-red-500',
    title: 'Fissures en escalier',
    width: '> 2 mm',
    desc: "Fissure qui suit les joints horizontaux et verticaux des parpaings. Signe d'un tassement différentiel actif des fondations.",
    action: "Intervention nécessaire : agrafage, harpage ou reprise en sous-œuvre selon gravité.",
  },
  {
    severity: 'Critique',
    severityColor: 'bg-red-700',
    title: 'Fissures horizontales',
    width: '> 2 mm',
    desc: "Fissure à mi-hauteur d'un mur, parfois accompagnée de désordres intérieurs. Peut indiquer une rupture de chaînage ou une poussée latérale.",
    action: "Visite immédiate. Évaluation structurelle complète et plan de remédiation.",
  },
];

export default function FissuresPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqJsonLd()) }} />
      <Script id="service-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceJsonLd()) }} />
      <DiagnosticHowToSchema />
      <AgrafageHowToSchema />
      <ExpertiseFissuresBreadcrumb />

      <TopBar />
      <Navbar />

      <main id="main-content">
        {/* HERO éditorial */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto grid lg:grid-cols-[58fr_42fr] gap-12 lg:gap-16 px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28 items-center">
            <div>
              <RevealOnScroll>
                <Eyebrow>Expertise · Diagnostic de fissures</Eyebrow>
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
                  Une fissure dans votre maison.<br />
                  <em>Notre métier depuis 2019.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[560px]">
                  Une fissure n'est jamais anodine, mais elle n'est pas toujours grave. Notre cabinet vient sur place avec ses instruments, identifie la cause, et vous remet un rapport clair. Si des travaux sont nécessaires, ce sont nos équipes qui les exécutent — sous garantie décennale.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic gratuit
                  </MagneticButton>
                  <MagneticButton href="/blog/agrafage-vs-micropieux-choix" variant="ghost">
                    Agrafage ou micropieux ?
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll direction="right" delay={0.1} className="hidden lg:block">
              <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
                <Image
                  src="/images/fissures-avant-apres.webp"
                  alt="Avant et après agrafage de fissure structurelle — chantier IPB Tournefeuille"
                  fill
                  sizes="(max-width: 1024px) 0px, 500px"
                  className="object-cover"
                  priority
                />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* SECTION TYPES DE FISSURES — 2x2 avec barre colorée latérale */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
                <div className="lg:col-span-6">
                  <Eyebrow>Comprendre votre fissure</Eyebrow>
                  <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                    Quatre familles,<br /><em>quatre niveaux d'urgence.</em>
                  </h2>
                </div>
                <div className="lg:col-span-5 lg:col-start-8">
                  <p className="text-[15px] leading-[1.9] font-light text-ipb-muted">
                    Toutes les fissures n'ont pas la même origine ni la même gravité. Voici comment notre cabinet les classe à l'observation, avant le diagnostic instrumenté.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-6">
              {typesFissures.map((f, i) => (
                <RevealOnScroll key={f.title} delay={i * 0.06}>
                  <article className="relative bg-ipb-cream border border-ipb-rule rounded-[6px] p-8 pl-10 h-full">
                    <div className={`absolute left-0 top-8 bottom-8 w-1 ${f.severityColor} rounded-r-sm`} aria-hidden="true" />
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-ipb-light font-medium">
                        {f.severity}
                      </span>
                      <span className="text-[11px] text-ipb-muted">Largeur {f.width}</span>
                    </div>
                    <h3 className="font-serif text-ipb-text font-bold text-[24px] leading-tight mb-4">
                      {f.title}
                    </h3>
                    <p className="text-[14px] leading-[1.75] font-light text-ipb-muted mb-5">
                      {f.desc}
                    </p>
                    <p className="text-[13px] leading-[1.6] text-ipb-text font-medium pt-4 border-t border-ipb-rule">
                      {f.action}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* MÉTHODE — fond navy, image à gauche / liste à droite */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <RevealOnScroll direction="left" className="lg:col-span-5">
                <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
                  <Image
                    src="/images/fissure-coin-maison.webp"
                    alt="Diagnostic d'une fissure d'angle de façade par l'expert IPB"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </RevealOnScroll>

              <div className="lg:col-span-7">
                <RevealOnScroll>
                  <Eyebrow variant="dark">Notre méthode</Eyebrow>
                  <h2 className="font-serif text-white mb-10" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                    Du diagnostic instrumenté<br /><em>aux travaux sous garantie.</em>
                  </h2>
                </RevealOnScroll>

                <ul className="space-y-8">
                  {[
                    { titre: 'Diagnostic sur site', desc: 'Visite par notre expert sous 7 jours en moyenne. Mesure au fissuromètre, lecture du bâti, identification de la cause (sécheresse, tassement, défaut de chaînage).' },
                    { titre: 'Rapport opposable', desc: 'Document écrit reconnu par les assurances et les tribunaux. Photos, mesures, cause identifiée, préconisations chiffrées.' },
                    { titre: 'Choix de la solution', desc: "Agrafage structurel pour stabiliser le mur. Reprise en sous-œuvre par micropieux pour les tassements actifs. Le choix dépend du diagnostic, jamais d'une solution préconçue." },
                    { titre: 'Travaux par nos équipes', desc: 'Exécution sous garantie décennale AXA. Chantier propre, dans les délais annoncés. Tous les documents vous sont remis à la livraison.' },
                  ].map((etape, i) => (
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
                  Sur les fissures<br /><em>et leur traitement.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="space-y-3">
              {fissureFaq.map((item, i) => (
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
