import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Testimonials } from '@/components/home/Testimonials';
import { PersonaCards, type PersonaCard } from '@/components/home/PersonaCards';

const fissuresPersonas: PersonaCard[] = [
  {
    label: 'Sinistré',
    titre: 'Vous voyez apparaître une fissure',
    desc: "Quelque chose a changé sur votre façade ou à l'intérieur. L'expert structure du réseau IPB lit le bâti ; l'institut qualifie le désordre et vous indique la suite à donner.",
    href: '/diagnostic',
    cta: 'Décrire ma situation',
  },
  {
    label: 'Vendeur',
    titre: 'Vous vendez un bien comportant des fissures',
    desc: "Un acheteur s'inquiète, une visite annulée, un compromis suspendu. Notre rapport sécurise la transaction et présente les éléments factuels au notaire.",
    href: '/vendre-bien-avec-fissures',
    cta: 'Voir la page vendeur',
  },
  {
    label: 'Acheteur',
    titre: 'Vous achetez et vous avez un doute',
    desc: "Avant de signer, vous voulez un avis structurel indépendant. Nos délais sont compatibles avec votre rétractation ou votre clause suspensive.",
    href: '/expertise-avant-achat-immobilier-toulouse',
    cta: 'Voir la page acheteur',
  },
];
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { StatCounter } from '@/components/ui/StatCounter';
import { fissureFaq } from '@/app/data/faqs';
import Image from 'next/image';
import Script from 'next/script';
import { ExpertiseFissuresBreadcrumb } from '@/components/seo/BreadcrumbSchema';

export const metadata = {
  title: 'Diagnostic et Traitement Fissures · Toulouse · Décennale 10 ans',
  description: "Diagnostic instrumenté, agrafage structurel. Rapport technique reconnu par les assurances. Décennale 10 ans sur les travaux. Toulouse, Montauban. ☎ 05 82 95 33 75",
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
    title: 'Diagnostic et Traitement Fissures · Toulouse · IPB',
    description: "Diagnostic instrumenté, agrafage structurel. Rapport technique reconnu par les assurances. Décennale 10 ans sur les travaux.",
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
    "address": { "@type": "PostalAddress", "streetAddress": "54 avenue Jean Jaurès", "addressLocality": "Tournefeuille", "addressRegion": "Occitanie", "postalCode": "31170", "addressCountry": "FR" }
  },
  "areaServed": [{ "@type": "AdministrativeArea", "name": "Haute-Garonne (31)" }, { "@type": "AdministrativeArea", "name": "Tarn-et-Garonne (82)" }, { "@type": "AdministrativeArea", "name": "Gers (32)" }, { "@type": "AdministrativeArea", "name": "Tarn (81)" }],
  "description": "Diagnostic instrumenté de fissures, agrafage structurel, reprise en sous-œuvre. Rapports reconnus par les assurances. Décennale 10 ans dédiée sur les travaux."
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
    severityColor: 'bg-ipb-orange',
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
      <ExpertiseFissuresBreadcrumb />

      <TopBar />
      <Navbar />
      <SmartBackBar />

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
                  <em>L'institut qui la comprend.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[560px]">
                  Une fissure n'est jamais anodine, mais elle n'est pas toujours grave. L'expert structure du réseau IPB se déplace, mesure, identifie la cause ; l'institut vous remet un rapport clair. Si des travaux sont nécessaires, les équipes du réseau IPB les exécutent sous décennale 10 ans.
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
                    <span>Décennale 10 ans</span>
                  </li>
                </ul>
              </RevealOnScroll>
            </div>

            <RevealOnScroll direction="right" delay={0.1} className="hidden lg:block">
              <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
                <Image
                  src="/images/fissure-mur-real.webp"
                  alt="Fissure structurelle observée sur une maison en Occitanie — diagnostic IPB"
                  fill
                  sizes="(max-width: 1024px) 0px, 500px"
                  className="object-cover"
                  priority
                />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* SECTION PERSONAS — placée juste après le Hero pour permettre
            le routage immédiat. Un visiteur acheteur ou vendeur arrivé
            sur cette page Google fissures peut basculer immédiatement
            vers sa page persona dédiée. Conversion supérieure. */}
        <PersonaCards
          eyebrow="Selon votre situation"
          title={<>Trois cas, <em>trois approches.</em></>}
          intro="Une fissure n'a pas le même sens selon que vous habitez la maison, que vous la vendez, ou que vous l'achetez. Voici la page qui correspond à votre situation."
          background="white"
          personas={fissuresPersonas}
        />

        {/* RECONNAISSANCE DU PROBLÈME (PAS — miroir du visiteur) */}
        <section className="bg-ipb-white py-20 lg:py-24 border-t border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <RevealOnScroll>
                  <Eyebrow>Si vous lisez cette page…</Eyebrow>
                  <h2 className="font-serif text-ipb-text mb-8" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.18, letterSpacing: '-0.022em', fontWeight: 700 }}>
                    Vous avez vu apparaître une fissure<br /><em>et vous vous demandez si c'est grave.</em>
                  </h2>
                </RevealOnScroll>
                <div className="space-y-5 text-[15px] leading-[1.9] font-light text-ipb-muted">
                  <RevealOnScroll delay={0.06}>
                    <p>
                      Elle s'est peut-être agrandie cet été. Elle est peut-être en escalier le long d'un angle, ou horizontale à mi-hauteur d'un mur. Vous hésitez : <em>est-ce qu'une lézarde de 2 mm est dangereuse ?</em> Est-ce que ça va s'arrêter tout seul ? Est-ce que votre assurance prendra en charge ?
                    </p>
                  </RevealOnScroll>
                  <RevealOnScroll delay={0.12}>
                    <p className="text-ipb-text">
                      Notre rôle commence avant les travaux. Notre institut se déplace, mesure l'évolution, identifie la <strong className="not-italic">cause exacte</strong> — sécheresse, défaut de chaînage, infiltration — et vous dit honnêtement si une intervention est nécessaire ou si vous pouvez attendre.
                    </p>
                  </RevealOnScroll>
                </div>
              </div>

              <RevealOnScroll direction="right" delay={0.1} className="lg:col-span-5">
                <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
                  <Image
                    src="/images/fissure-facade-verticale.webp"
                    alt="Fissure verticale traversante sur façade en Haute-Garonne — observée lors d'un diagnostic IPB"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* SECTION TYPES DE FISSURES — 2x2 avec barre colorée latérale */}
        <section className="bg-ipb-cream py-24 lg:py-32">
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
                    Toutes les fissures n'ont pas la même origine ni la même gravité. Voici comment le réseau IPB les classe à l'observation, avant le diagnostic instrumenté.
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

        {/* CAUSES — d'où vient la fissure (profondeur de contenu + RGA local) */}
        <section className="bg-ipb-white py-24 lg:py-32 border-t border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
                <div className="lg:col-span-6">
                  <Eyebrow>D'où vient votre fissure</Eyebrow>
                  <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                    Trois causes principales,<br /><em>un même réflexe : diagnostiquer.</em>
                  </h2>
                </div>
                <div className="lg:col-span-5 lg:col-start-8">
                  <p className="text-[15px] leading-[1.9] font-light text-ipb-muted">
                    Une fissure est toujours le symptôme d'autre chose. Identifier la cause exacte conditionne la solution — et évite de traiter l'apparence sans régler le fond.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: '01', titre: 'Le retrait-gonflement des argiles', desc: "Première cause dans le Sud-Ouest. Les sols argileux gonflent l'hiver et se rétractent lors des étés secs ; les fondations suivent ce mouvement. Depuis la sécheresse de 2022, des centaines de communes de Haute-Garonne et du Tarn-et-Garonne ont été reconnues en catastrophe naturelle." },
                { num: '02', titre: 'Un défaut de structure ou de conception', desc: "Absence ou rupture de chaînage, fondations sous-dimensionnées, surcharge, ouverture mal reprise : la maçonnerie travaille là où elle ne devrait pas. Fréquent sur le bâti ancien ou les extensions mal liaisonnées." },
                { num: '03', titre: "L'eau et les infiltrations", desc: "Une fuite, un drainage défaillant ou des remontées d'humidité fragilisent le sol d'assise et la maçonnerie. La fissure n'est alors qu'un signal — la cause réelle est hydraulique." },
              ].map((c, i) => (
                <RevealOnScroll key={c.num} delay={i * 0.06}>
                  <article className="h-full bg-ipb-cream border border-ipb-rule rounded-[6px] p-8">
                    <span className="font-serif text-ipb-orange text-[14px] font-bold tracking-wider">{c.num}</span>
                    <h3 className="font-serif text-ipb-text font-bold text-[20px] leading-tight mt-3 mb-4">{c.titre}</h3>
                    <p className="text-[14px] leading-[1.75] font-light text-ipb-muted">{c.desc}</p>
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
                    alt="Diagnostic d'une fissure d'angle de façade par l'expert structure du réseau IPB"
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
                    { titre: 'Diagnostic sur site', desc: "Visite par l'expert structure du réseau IPB sous 72h en moyenne. Mesure au fissuromètre, lecture du bâti, identification de la cause (sécheresse, tassement, défaut de chaînage)." },
                    { titre: 'Rapport technique', desc: "Document écrit reconnu comme pièce technique par les assurances dans les dossiers CAT-NAT. Photos, mesures, cause identifiée, préconisations chiffrées." },
                    { titre: 'Conception de la solution', desc: "Agrafage structurel pour stabiliser le mur — solution adaptée à 90 % des cas. Pour les rares tassements actifs nécessitant une reprise en sous-œuvre, nous coordonnons l'intervention avec un spécialiste. Le choix dépend du diagnostic, jamais d'une solution préconçue." },
                    { titre: 'Travaux exécutés par les équipes du réseau IPB', desc: "L'institut coordonne le chantier ; les équipes du réseau IPB exécutent les travaux sous garantie décennale 10 ans. Chantier propre, dans les délais annoncés. Tous les documents vous sont remis à la livraison." },
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

                {/* CTA après la liste — démarre l'étape 1 */}
                <RevealOnScroll delay={0.36}>
                  <div className="mt-10 pt-2">
                    <a
                      href="/diagnostic"
                      className="inline-flex items-center justify-center gap-2 bg-ipb-orange text-white font-bold px-8 py-4 rounded-[3px] text-[14px] tracking-[0.03em] hover:bg-[#b35519] transition-colors min-h-[48px]"
                    >
                      Commencer par l'étape 1
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                    <p className="mt-3 text-[12px] text-white/55">Diagnostic en ligne · 2 minutes · sans engagement</p>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>

        {/* CHIFFRES — réassurance chiffrée (version claire) */}
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

        {/* TRANSPARENCE DES COÛTS — proportionnalité, pas d'acompte, devis avant engagement */}
        <section className="bg-ipb-white py-24 lg:py-32 border-y border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <RevealOnScroll className="lg:col-span-5">
                <Eyebrow>Combien ça coûte</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Une approche<br /><em>proportionnée et transparente.</em>
                </h2>
                <p className="mt-6 text-[15px] leading-[1.9] font-light text-ipb-muted">
                  Pas d'acompte, pas de prix gonflé : chaque étape est chiffrée à l'avance, et nous privilégions toujours la solution la plus juste plutôt que la plus lourde.
                </p>
              </RevealOnScroll>

              <ul className="lg:col-span-7 space-y-5">
                {[
                  { titre: 'Diagnostic en ligne', prix: 'Gratuit', desc: "Vous décrivez votre situation en 2 minutes. Premier avis de l'expert structure du réseau IPB, sans engagement." },
                  { titre: 'Visite sur site & rapport', prix: 'Sur devis', desc: "Coût communiqué avant tout engagement, sans acompte. Vous réglez à l'issue de la visite ; le rapport vous est remis 3 à 5 jours après." },
                  { titre: 'Agrafage structurel', prix: 'Solution proportionnée', desc: "Quand des travaux sont nécessaires, l'agrafage suffit dans 90 % des cas — généralement 3 à 4 fois moins coûteux qu'une reprise en sous-œuvre par micropieux (30 000 à 60 000 €). Chiffré précisément après diagnostic, sous décennale 10 ans." },
                ].map((t, i) => (
                  <RevealOnScroll key={t.titre} delay={i * 0.06}>
                    <li className="flex items-start justify-between gap-6 bg-ipb-cream border border-ipb-rule rounded-[6px] p-6">
                      <div>
                        <h3 className="font-serif text-ipb-text font-bold text-[18px] leading-tight mb-2">{t.titre}</h3>
                        <p className="text-[13px] leading-[1.7] font-light text-ipb-muted">{t.desc}</p>
                      </div>
                      <span className="flex-shrink-0 text-[11px] uppercase tracking-[0.12em] text-ipb-orange font-semibold pt-1 text-right max-w-[110px]">{t.prix}</span>
                    </li>
                  </RevealOnScroll>
                ))}
              </ul>
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

        {/* MAILLAGE INTERNE — pour aller plus loin (comprendre · analyses · villes) */}
        <section className="bg-ipb-cream py-24 lg:py-32 border-t border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <Eyebrow>Pour aller plus loin</Eyebrow>
              <h2 className="font-serif text-ipb-text mb-14" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                Comprendre, approfondir,<br /><em>trouver l'expert près de chez vous.</em>
              </h2>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
              {[
                {
                  titre: 'Comprendre vos fissures',
                  links: [
                    { href: '/fissure-en-escalier-causes', label: 'Fissures en escalier : causes et dangers' },
                    { href: '/fissure-horizontale-danger', label: 'Fissures horizontales : risques structurels' },
                    { href: '/microfissure-quand-sinquieter', label: "Microfissures : quand s'inquiéter ?" },
                    { href: '/fissure-fondation-maison', label: 'Fissures de fondation' },
                    { href: '/fissure-secheresse-indemnisation', label: 'Fissures & sécheresse : indemnisation' },
                  ],
                },
                {
                  titre: 'Nos analyses',
                  links: [
                    { href: '/blog/prix-maison-fissuree', label: "Prix d'une maison fissurée" },
                    { href: '/blog/evaluer-gravite-fissure-maison', label: "Évaluer la gravité d'une fissure" },
                    { href: '/blog/agrafage-vs-micropieux-choix', label: 'Agrafage ou micropieux : comment choisir' },
                    { href: '/blog/secheresse-argile-haute-garonne', label: 'Sécheresse & argiles en Haute-Garonne' },
                    { href: '/lexique', label: 'Lexique de la pathologie du bâtiment' },
                    { href: '/notre-methode', label: 'Notre méthode, étape par étape' },
                  ],
                },
                {
                  titre: 'Un expert près de chez vous',
                  links: [
                    { href: '/expert-fissures-toulouse-31', label: 'Expert fissures à Toulouse' },
                    { href: '/expert-fissures/montauban', label: 'Expert fissures à Montauban' },
                    { href: '/expert-fissures/colomiers', label: 'Expert fissures à Colomiers' },
                    { href: '/expert-fissures/muret', label: 'Expert fissures à Muret' },
                    { href: '/zones-intervention', label: "Toutes nos zones d'intervention" },
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
                Vous obtenez un premier avis de l'expert structure du réseau IPB, gratuitement. <strong className="text-ipb-text not-italic">Si la situation ne nécessite pas d'intervention, on vous le dira</strong> — c'est l'engagement de l'institut. Mieux vaut un avis juste qu'un devis vendu.
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
