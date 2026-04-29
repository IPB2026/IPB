import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { villesData, villeSlugs, type VilleInfo } from '@/app/data/villes';
import { getVilleMurPorteurFallback } from '@/app/data/villes-mur-porteur';
import { VilleBreadcrumb } from '@/components/seo/BreadcrumbSchema';
import { generateLocalFAQ, buildFAQPageJsonLd, IPB_AGGREGATE_RATING } from '@/lib/seo/localFAQ';

export async function generateStaticParams() {
  return villeSlugs.map((ville) => ({ ville }));
}

export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }): Promise<Metadata> {
  const { ville } = await params;
  const villeData = villesData[ville];
  if (!villeData) return { title: 'Expert fissures | IPB' };

  const deptCode = villeData.codePostal.slice(0, 2);
  const villeNom = villeData.nom;
  const slug = ville;

  // Canonical override : sur Toulouse, /expert-fissures/toulouse pointe vers /expert-fissures-toulouse-31
  // pour résoudre la cannibalisation entre les 3 URLs ciblant la même intention.
  const canonicalUrl = ville === 'toulouse'
    ? 'https://www.ipb-expertise.fr/expert-fissures-toulouse-31'
    : `https://www.ipb-expertise.fr/expert-fissures/${ville}`;

  const description = villeData.risqueRGA === 'tres-fort' || villeData.risqueRGA === 'fort'
    ? `Institut de pathologie du bâtiment à ${villeNom} (${deptCode}). Diagnostic instrumenté de fissures, agrafage structurel, reprise en sous-œuvre. Zone à risque RGA ${villeData.risqueRGA}. Décennale AXA.`
    : `Institut de pathologie du bâtiment à ${villeNom} (${deptCode}). Diagnostic instrumenté de fissures, agrafage structurel et reprise en sous-œuvre. Rapports reconnus par les assurances.`;

  return {
    title: `Expert fissures ${villeNom} (${deptCode}) · Institut IPB`,
    description,
    keywords: [
      `expert fissures ${slug}`,
      `expertise fissure ${slug}`,
      `fissures maison ${slug}`,
      `agrafage fissures ${slug}`,
      `diagnostic fissures ${deptCode}`,
      `institut pathologie bâtiment ${slug}`,
      `tassement différentiel ${slug}`,
      `sol argileux ${slug}`,
      `RGA ${slug}`,
      `catastrophe naturelle sécheresse ${slug}`,
      `micropieux ${slug}`,
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `Expert fissures ${villeNom} · Institut IPB`,
      description: `Institut de pathologie du bâtiment intervenant à ${villeNom}. Diagnostic, agrafage, reprise en sous-œuvre.`,
      url: `https://www.ipb-expertise.fr/expert-fissures/${ville}`,
      type: 'website',
      images: [{ url: '/images/fissures-avant-apres.webp', width: 1200, height: 630, alt: `Expert fissures ${villeNom} — IPB` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Expert fissures ${villeNom} · IPB`,
      description: `Institut de pathologie du bâtiment à ${villeNom}.`,
    },
    robots: { index: true, follow: true },
  };
}

function risqueLabel(r?: string) {
  if (r === 'tres-fort') return 'Très fort';
  if (r === 'fort') return 'Fort';
  if (r === 'moyen') return 'Moyen';
  if (r === 'faible') return 'Faible';
  return 'À évaluer';
}

export default async function ExpertFissuresVillePage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const villeData: VilleInfo | undefined = villesData[ville];
  if (!villeData) notFound();

  const villeNom = villeData.nom;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `IPB · Expert fissures ${villeNom}`,
    "description": `Institut de pathologie du bâtiment intervenant à ${villeNom}. Diagnostic instrumenté, agrafage structurel et reprise en sous-œuvre.`,
    "areaServed": { "@type": "City", "name": villeNom },
    "aggregateRating": IPB_AGGREGATE_RATING,
    "provider": {
      "@type": "LocalBusiness",
      "name": "IPB - Institut de Pathologie du Bâtiment",
      "telephone": "+33582953375",
      "aggregateRating": IPB_AGGREGATE_RATING,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "13 rue du Recteur Dottin",
        "addressLocality": "Toulouse",
        "postalCode": "31100",
        "addressRegion": "Occitanie",
        "addressCountry": "FR"
      }
    }
  };

  // FAQPage géolocalisé — rich snippets locales
  const localFAQ = generateLocalFAQ({
    villeNom,
    codePostal: villeData.codePostal,
    departement: villeData.departement,
    risqueRGA: villeData.risqueRGA,
    quartiersRisque: villeData.quartiersRisque,
    typesConstruction: villeData.typesConstruction,
  });
  const faqPageJsonLd = buildFAQPageJsonLd(localFAQ);

  const villeMurPorteur = getVilleMurPorteurFallback(ville);

  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="service-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }} />
      <VilleBreadcrumb villeName={villeNom} villeSlug={ville} service="fissures" />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO local */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto grid lg:grid-cols-[58fr_42fr] gap-12 lg:gap-16 px-6 lg:px-12 pt-12 lg:pt-16 pb-20 lg:pb-28 items-center">
            <div>
              <RevealOnScroll>
                <Eyebrow>Page locale · {villeData.departement}</Eyebrow>
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
                  <em>à {villeNom}.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[560px]">
                  {villeData.description}
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic gratuit à {villeNom}
                  </MagneticButton>
                  <MagneticButton href="/expertise/fissures" variant="ghost">
                    Notre méthode
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll direction="right" delay={0.1} className="hidden lg:block">
              <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
                <Image
                  src="/images/fissures-avant-apres.webp"
                  alt={`Expert fissures à ${villeNom} — Institut IPB`}
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
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <RevealOnScroll className="lg:col-span-5">
                <Eyebrow>Le bâti à {villeNom}</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Pourquoi les maisons<br /><em>de {villeNom} fissurent.</em>
                </h2>

                {/* Stats locales */}
                <div className="mt-10 grid grid-cols-2 gap-6">
                  {villeData.population && (
                    <div>
                      <p className="text-[10px] text-ipb-light uppercase tracking-[0.16em] mb-1">Habitants</p>
                      <p className="font-serif text-ipb-text font-bold text-[22px] leading-tight">
                        {villeData.population}
                      </p>
                    </div>
                  )}
                  {villeData.risqueRGA && (
                    <div>
                      <p className="text-[10px] text-ipb-light uppercase tracking-[0.16em] mb-1">Risque RGA</p>
                      <p className="font-serif text-ipb-text font-bold text-[22px] leading-tight">
                        {risqueLabel(villeData.risqueRGA)}
                      </p>
                    </div>
                  )}
                  {villeData.tauxSinistralite && (
                    <div>
                      <p className="text-[10px] text-ipb-light uppercase tracking-[0.16em] mb-1">Taux sinistralité</p>
                      <p className="font-serif text-ipb-text font-bold text-[22px] leading-tight">
                        {villeData.tauxSinistralite}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] text-ipb-light uppercase tracking-[0.16em] mb-1">Distance</p>
                    <p className="font-serif text-ipb-text font-bold text-[22px] leading-tight">
                      {villeData.distance} de Toulouse
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              <div className="lg:col-span-7 space-y-5 text-[15px] leading-[1.9] font-light text-ipb-muted">
                {villeData.geologie && (
                  <RevealOnScroll delay={0.06}>
                    <p>
                      <strong className="font-medium text-ipb-text not-italic">Géologie locale.</strong>{' '}
                      {villeData.geologie}
                    </p>
                  </RevealOnScroll>
                )}
                {villeData.specificitesFissures && (
                  <RevealOnScroll delay={0.12}>
                    <p>
                      <strong className="font-medium text-ipb-text not-italic">Spécificités à {villeNom}.</strong>{' '}
                      {villeData.specificitesFissures}
                    </p>
                  </RevealOnScroll>
                )}
                {villeData.historiqueLocal && (
                  <RevealOnScroll delay={0.18}>
                    <p>
                      <strong className="font-medium text-ipb-text not-italic">Historique local.</strong>{' '}
                      {villeData.historiqueLocal}
                    </p>
                  </RevealOnScroll>
                )}
                {villeData.conseillExpert && (
                  <RevealOnScroll delay={0.24}>
                    <div className="border-l-2 border-ipb-orange pl-6 mt-4">
                      <p className="font-serif text-[16px] italic">
                        <em className="not-italic text-ipb-orange">«&nbsp;</em>
                        {villeData.conseillExpert}
                        <em className="not-italic text-ipb-orange">&nbsp;»</em>
                      </p>
                      <p className="text-[11px] text-ipb-light uppercase tracking-[0.14em] mt-3 not-italic">
                        — Ludovic D., fondateur de l’institut
                      </p>
                    </div>
                  </RevealOnScroll>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* QUARTIERS / PROBLÈMES */}
        {(!!villeData.quartiersRisque?.length || !!villeData.problemesFrequents?.length) && (
          <section className="bg-ipb-cream py-24 lg:py-32">
            <div className="max-w-ipb mx-auto px-6 lg:px-12">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {!!villeData.quartiersRisque?.length && (
                  <RevealOnScroll>
                    <Eyebrow>Quartiers à surveiller</Eyebrow>
                    <h3 className="font-serif text-ipb-text font-bold text-[24px] leading-tight mb-6">
                      Les zones les plus touchées<br />à {villeNom}
                    </h3>
                    <ul className="space-y-3 text-[14px] leading-[1.7]">
                      {villeData.quartiersRisque.map((q) => (
                        <li key={q} className="flex gap-3 text-ipb-muted">
                          <span className="text-ipb-orange flex-shrink-0">—</span>
                          {q}
                        </li>
                      ))}
                    </ul>
                  </RevealOnScroll>
                )}

                {!!villeData.problemesFrequents?.length && (
                  <RevealOnScroll delay={0.06}>
                    <Eyebrow>Problèmes fréquents</Eyebrow>
                    <h3 className="font-serif text-ipb-text font-bold text-[24px] leading-tight mb-6">
                      Ce qu'on observe le plus souvent<br />sur les chantiers
                    </h3>
                    <ul className="space-y-3 text-[14px] leading-[1.7]">
                      {villeData.problemesFrequents.map((p) => (
                        <li key={p} className="flex gap-3 text-ipb-muted">
                          <span className="text-ipb-orange flex-shrink-0">—</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </RevealOnScroll>
                )}
              </div>
            </div>
          </section>
        )}

        {/* COMMUNES PROCHES */}
        {!!villeData.communesProches?.length && (
          <section className="bg-ipb-white py-20 lg:py-24 border-y border-ipb-rule">
            <div className="max-w-ipb mx-auto px-6 lg:px-12 text-center">
              <RevealOnScroll>
                <p className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mb-4">
                  Communes alentour également couvertes
                </p>
                <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
                  {villeData.communesProches.map((c) => {
                    const slugProche = c
                      .toLowerCase()
                      .normalize('NFD')
                      .replace(/[̀-ͯ]/g, '')
                      .replace(/['\s]+/g, '-');
                    return villeSlugs.includes(slugProche) ? (
                      <Link
                        key={c}
                        href={`/expert-fissures/${slugProche}`}
                        className="bg-ipb-cream border border-ipb-rule rounded-[3px] px-4 py-2 text-[13px] font-light text-ipb-text hover:border-ipb-orange transition-colors"
                      >
                        {c}
                      </Link>
                    ) : (
                      <span
                        key={c}
                        className="bg-ipb-cream border border-ipb-rule rounded-[3px] px-4 py-2 text-[13px] font-light text-ipb-text"
                      >
                        {c}
                      </span>
                    );
                  })}
                </div>
              </RevealOnScroll>
            </div>
          </section>
        )}

        {/* LIENS INTERNES */}
        <section className="bg-ipb-cream py-20 lg:py-24">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-6">
            {[
              { href: '/expertise/fissures', titre: 'Notre méthode', desc: 'Diagnostic instrumenté, agrafage, reprise en sous-œuvre.' },
              { href: `/expert-mur-porteur/${villeMurPorteur}`, titre: 'Ouverture de mur porteur', desc: 'Étude de structure et travaux par notre institut.' },
              { href: '/blog/agrafage-vs-micropieux-choix', titre: 'Agrafage ou micropieux ?', desc: 'Notre guide pour choisir la bonne solution structurelle.' },
            ].map((card) => (
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
