import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { humidityFaq } from '@/app/data/faqs';
import Image from 'next/image';
import Script from 'next/script';
import { ExpertiseHumiditeBreadcrumb } from '@/components/seo/BreadcrumbSchema';

export const metadata = {
  title: "Diagnostic Humidité et Infiltrations · Toulouse · IPB",
  description: "Remontées capillaires, infiltrations, condensation, salpêtre : l'institut identifie la cause exacte et conçoit le traitement. Travaux exécutés par les équipes du réseau IPB sous décennale 10 ans. ☎ 05 82 95 33 75",
  keywords: [
    'expert humidité toulouse',
    'expertise humidité haute-garonne',
    'diagnostic humidité maison',
    'remontées capillaires',
    'traitement humidité murs',
    'institut pathologie bâtiment toulouse',
    'salpêtre traitement',
    'cuvelage cave',
    'condensation murs',
    'infiltrations',
  ],
  alternates: { canonical: 'https://www.ipb-expertise.fr/expertise/humidite' },
  openGraph: {
    title: "Diagnostic Humidité et Infiltrations · Toulouse · IPB",
    description: "L'expert structure du réseau IPB identifie la cause exacte de l'humidité ; l'institut coordonne la solution, exécutée par les équipes du réseau IPB sous décennale 10 ans.",
    url: 'https://www.ipb-expertise.fr/expertise/humidite',
    type: 'website',
    images: [{ url: '/images/humidite-avant-apres.webp', width: 1200, height: 630, alt: 'Avant et après traitement humidité — chantier du réseau IPB' }],
  },
};

const generateFaqJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": humidityFaq.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
});

const generateServiceJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Diagnostic et traitement de l'humidité",
  "provider": {
    "@type": "LocalBusiness",
    "name": "IPB - Institut de Pathologie du Bâtiment",
    "telephone": "+33582953375",
    "address": { "@type": "PostalAddress", "streetAddress": "54 avenue Jean Jaurès", "addressLocality": "Tournefeuille", "addressRegion": "Occitanie", "postalCode": "31170", "addressCountry": "FR" }
  },
  "areaServed": [{ "@type": "AdministrativeArea", "name": "Haute-Garonne (31)" }, { "@type": "AdministrativeArea", "name": "Tarn-et-Garonne (82)" }, { "@type": "AdministrativeArea", "name": "Gers (32)" }, { "@type": "AdministrativeArea", "name": "Tarn (81)" }],
  "description": "Diagnostic instrumenté de l'humidité (remontées capillaires, infiltrations, condensation, cave humide). L'expert structure du réseau IPB identifie la cause exacte ; l'institut coordonne la solution, exécutée par les équipes du réseau IPB sous garantie décennale 10 ans."
});

const typesHumidite = [
  {
    severity: 'Cause',
    severityColor: 'bg-blue-500',
    title: 'Remontées capillaires',
    desc: "L'humidité du sol monte par capillarité dans les murs. Symptômes : taches blanches (salpêtre), enduit qui s'effrite, odeur en bas de murs.",
    action: "Injection de résine hydrophobe à la base du mur. Solution durable, garantie sur la durée.",
  },
  {
    severity: 'Cause',
    severityColor: 'bg-cyan-500',
    title: 'Condensation',
    desc: "Air chaud humide qui se condense sur les murs froids. Souvent lié à une mauvaise ventilation. Taches noires (moisissures), gouttelettes sur fenêtres.",
    action: "Étude des flux d'air, pose ou remplacement d'une VMC ou d'une VMI.",
  },
  {
    severity: 'Cause',
    severityColor: 'bg-teal-500',
    title: 'Infiltrations',
    desc: "Eau qui pénètre par la toiture, les murs extérieurs ou les fondations. Souvent ponctuel mais aggravable. Auréoles sur murs ou plafond.",
    action: "Identification du point d'entrée, traitement de l'étanchéité (toiture, façade, sous-sol).",
  },
  {
    severity: 'Cause',
    severityColor: 'bg-emerald-500',
    title: 'Cave humide',
    desc: "Sous-sol enterré soumis à la pression hydrostatique. Murs visiblement humides, odeur caractéristique, peinture qui cloque.",
    action: "Cuvelage par enduit imperméable ou drainage périphérique selon configuration.",
  },
];

export default function HumiditePage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqJsonLd()) }} />
      <Script id="service-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceJsonLd()) }} />
      <ExpertiseHumiditeBreadcrumb />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto grid lg:grid-cols-[58fr_42fr] gap-12 lg:gap-16 px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28 items-center">
            <div>
              <RevealOnScroll>
                <Eyebrow>Expertise · Humidité du bâti</Eyebrow>
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
                  L'humidité dans votre maison.<br />
                  <em>Identifier la cause, pas masquer le symptôme.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[560px]">
                  Tâches sur les murs, peinture qui cloque, odeur persistante&nbsp;: avant de traiter, il faut comprendre. L'expert structure du réseau IPB se déplace, hygromètre et caméra thermique à la main, pour identifier la cause exacte. Si des travaux sont nécessaires, les équipes du réseau IPB les exécutent sous décennale 10 ans.
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

            <RevealOnScroll direction="right" delay={0.1} className="hidden lg:block">
              <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
                <Image
                  src="/images/humidite-avant-apres.webp"
                  alt="Avant et après traitement de l'humidité — chantier du réseau IPB"
                  fill
                  sizes="(max-width: 1024px) 0px, 500px"
                  className="object-cover"
                  priority
                />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* QUATRE FAMILLES */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
                <div className="lg:col-span-6">
                  <Eyebrow>Quatre causes possibles</Eyebrow>
                  <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                    Identifier la cause<br /><em>avant tout traitement.</em>
                  </h2>
                </div>
                <div className="lg:col-span-5 lg:col-start-8">
                  <p className="text-[15px] leading-[1.9] font-light text-ipb-muted">
                    Quatre familles couvrent la majorité des cas que nous traitons en Occitanie. Chacune appelle un traitement différent — appliquer le mauvais ne sert à rien.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-6">
              {typesHumidite.map((h, i) => (
                <RevealOnScroll key={h.title} delay={i * 0.06}>
                  <article className="relative bg-ipb-cream border border-ipb-rule rounded-[6px] p-8 pl-10 h-full">
                    <div className={`absolute left-0 top-8 bottom-8 w-1 ${h.severityColor} rounded-r-sm`} aria-hidden="true" />
                    <p className="text-[10px] uppercase tracking-[0.16em] text-ipb-light font-medium mb-3">
                      {h.severity}
                    </p>
                    <h3 className="font-serif text-ipb-text font-bold text-[24px] leading-tight mb-4">
                      {h.title}
                    </h3>
                    <p className="text-[14px] leading-[1.75] font-light text-ipb-muted mb-5">
                      {h.desc}
                    </p>
                    <p className="text-[13px] leading-[1.6] text-ipb-text font-medium pt-4 border-t border-ipb-rule">
                      {h.action}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* MÉTHODE */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <RevealOnScroll direction="left" className="lg:col-span-5">
                <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
                  <Image
                    src="/images/salpetre-avant-apres.webp"
                    alt="Salpêtre traité par les équipes du réseau IPB sur les murs d'une maison ancienne"
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
                    Du diagnostic instrumenté<br /><em>au traitement durable.</em>
                  </h2>
                </RevealOnScroll>

                <ul className="space-y-8">
                  {[
                    { titre: 'Diagnostic sur place', desc: "Visite avec hygromètre, caméra thermique et test à la pesée. Mesure du taux d'humidité dans les murs, identification de la cause exacte." },
                    { titre: 'Rapport et préconisations', desc: "Document écrit sous 3 à 5 jours avec photos, mesures, cause identifiée et solutions chiffrées. Reconnu par les assurances en cas de litige." },
                    { titre: 'Conception du traitement', desc: "Injection de résine, cuvelage, ventilation, drainage&nbsp;: l'institut choisit la solution selon le diagnostic, jamais selon un produit qu'on voudrait vendre." },
                    { titre: 'Travaux exécutés par les équipes du réseau IPB', desc: "L'institut coordonne le chantier ; les équipes du réseau IPB exécutent les travaux sous garantie décennale 10 ans. Vérification post-traitement à 6 mois pour confirmer la disparition des symptômes." },
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
                  Sur l'humidité<br /><em>et son traitement.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="space-y-3">
              {humidityFaq.map((item, i) => (
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
