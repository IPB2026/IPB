import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import type { VilleInfo } from '@/app/data/villes';
import { generateLocalFAQ, buildFAQPageJsonLd } from '@/lib/seo/localFAQ';

/**
 * ServiceVilleTemplate — template générique éditorial pour les pages
 * locales par service (expert-humidite, agrafage-fissures, traitement-humidite,
 * etc.). Mutualise le pattern Hero + contexte local + liens internes.
 */
interface ServiceVilleTemplateProps {
  villeData: VilleInfo;
  ville: string;
  /** Nom du service en H1 ("Traitement de l'humidité", "Agrafage de fissures"…) */
  serviceTitle: string;
  /** Eyebrow contextuel ("Expertise · Humidité du bâti"…) */
  eyebrowLabel: string;
  /** Description longue (paragraphe d'accroche) */
  description: string;
  /** Image hero (chemin /images/...) */
  heroImage: string;
  /** Alt texte image hero */
  heroAlt: string;
  /** Lien CTA "Notre méthode" en bas du Hero */
  methodHref: string;
  /** Champ ville à mettre en valeur dans le contexte (geologie, specificitesFissures, etc.) */
  contextField?: keyof VilleInfo;
  /** Cards "Pour aller plus loin" */
  relatedCards: Array<{ href: string; titre: string; desc: string }>;
}

export function ServiceVilleTemplate({
  villeData,
  ville,
  serviceTitle,
  eyebrowLabel,
  description,
  heroImage,
  heroAlt,
  methodHref,
  contextField,
  relatedCards,
}: ServiceVilleTemplateProps) {
  const villeNom = villeData.nom;
  const contextText = contextField ? (villeData[contextField] as string | undefined) : undefined;

  // FAQPage JSON-LD géolocalisé — rich snippets locales pour les routes service
  const localFAQ = generateLocalFAQ({
    villeNom,
    codePostal: villeData.codePostal,
    departement: villeData.departement,
    risqueRGA: villeData.risqueRGA,
    quartiersRisque: villeData.quartiersRisque,
    typesConstruction: villeData.typesConstruction,
  });
  const faqPageJsonLd = buildFAQPageJsonLd(localFAQ);

  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script
        id="service-ville-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <TopBar />
      <Navbar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto grid lg:grid-cols-[58fr_42fr] gap-12 lg:gap-16 px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28 items-center">
            <div>
              <RevealOnScroll>
                <Eyebrow>{eyebrowLabel} · {villeData.departement}</Eyebrow>
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
                  {serviceTitle}<br />
                  <em>à {villeNom}.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[560px]">
                  {description}
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic gratuit
                  </MagneticButton>
                  <MagneticButton href={methodHref} variant="ghost">
                    Notre méthode
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll direction="right" delay={0.1} className="hidden lg:block">
              <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
                <Image
                  src={heroImage}
                  alt={heroAlt}
                  fill
                  sizes="(max-width: 1024px) 0px, 500px"
                  className="object-cover"
                  priority
                />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* CONTEXTE LOCAL */}
        {(contextText || villeData.description) && (
          <section className="bg-ipb-white py-24 lg:py-32">
            <div className="max-w-4xl mx-auto px-6 lg:px-12">
              <RevealOnScroll>
                <Eyebrow>Le bâti à {villeNom}</Eyebrow>
                <h2 className="font-serif text-ipb-text mb-8" style={{ fontSize: 'clamp(28px, 2.6vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Spécificités locales<br /><em>de notre intervention.</em>
                </h2>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-5">
                  {villeData.description}
                </p>
                {contextText && (
                  <p className="text-[15px] leading-[1.9] font-light text-ipb-muted">
                    {contextText}
                  </p>
                )}
              </RevealOnScroll>
            </div>
          </section>
        )}

        {/* CARTES "POUR ALLER PLUS LOIN" */}
        <section className="bg-ipb-cream py-20 lg:py-24">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-6">
            {relatedCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group bg-ipb-white border border-ipb-rule rounded-[6px] p-7 hover:border-ipb-orange hover:shadow-[0_12px_36px_rgba(11,24,38,0.07)] hover:-translate-y-0.5 transition-all"
              >
                <p className="text-[10px] text-ipb-light uppercase tracking-[0.16em] mb-3">Pour aller plus loin</p>
                <h3 className="font-serif text-ipb-text font-bold text-[20px] leading-tight mb-3 group-hover:text-ipb-orange transition-colors">
                  {card.titre}
                </h3>
                <p className="text-[13px] leading-[1.7] font-light text-ipb-muted mb-4">{card.desc}</p>
                <span className="text-ipb-orange text-[12px] font-medium border-b border-ipb-orange pb-0.5">
                  Lire →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
