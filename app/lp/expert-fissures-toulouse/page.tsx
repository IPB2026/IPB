import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { LandingShell } from '@/components/landing/LandingShell';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { StatCounter } from '@/components/ui/StatCounter';

/**
 * Landing page Ads — Campagne "Fissures urgentes Toulouse".
 *
 * URL canonical : /lp/expert-fissures-toulouse
 * Robots : noindex (la home /expert-fissures-toulouse-31 reste indexée)
 *
 * Cf. PLAN_LEADGEN.md Vague O.1
 */

export const metadata: Metadata = {
  title: "Expert Fissures Toulouse · Diagnostic Sous 7 Jours · AXA",
  description: "Diagnostic structurel à Toulouse, agrafage. 850 chantiers depuis 2019. Décennale AXA. Sous 7 jours. ☎ 05 82 95 33 75",
  robots: { index: false, follow: false }, // Landing Ads : ne pas indexer (évite duplicate content avec la page SEO)
  alternates: { canonical: 'https://www.ipb-expertise.fr/expert-fissures-toulouse-31' },
};

export default function LandingFissuresToulouse() {
  return (
    <LandingShell>
      <Script id="lp-fissures-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "IPB · Expert fissures Toulouse",
          "telephone": "+33582953375",
          "address": { "@type": "PostalAddress", "addressLocality": "Toulouse", "postalCode": "31100" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "15" },
        })
      }} />

      {/* HERO conversion */}
      <section className="bg-ipb-cream pt-12 lg:pt-16 pb-12 lg:pb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[6fr_5fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-ipb-orange text-[11px] uppercase tracking-[0.18em] font-medium mb-4">
                Institut à Toulouse · Décennale AXA
              </p>
              <h1
                className="font-serif text-ipb-text mb-6"
                style={{
                  fontSize: 'clamp(34px, 4vw, 52px)',
                  lineHeight: 1.06,
                  letterSpacing: '-0.025em',
                  fontWeight: 700,
                }}
              >
                Une fissure dans votre maison&nbsp;?<br />
                <em>Notre institut vient sur place sous 7 jours.</em>
              </h1>
              <p className="text-[15px] leading-[1.85] font-light text-ipb-muted mb-8">
                Diagnostic instrumenté (fissuromètre, niveau laser), rapport écrit reconnu par les assurances, agrafage structurel par nos équipes. Tout en interne, garantie 10 ans AXA.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <MagneticButton href="/diagnostic?utm_source=ads&utm_medium=cpc&utm_campaign=fissures_toulouse" variant="primary">
                  Demander un diagnostic
                </MagneticButton>
                <a
                  href="tel:0582953375"
                  className="inline-flex items-center justify-center gap-2 bg-ipb-navy text-white font-semibold text-[13px] tracking-[0.03em] rounded-[3px] px-7 py-[15px] hover:bg-[#1a2d40] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 1h2.5l1 3-1.5 1c1 2 2.5 3.5 4.5 4.5l1-1.5 3 1V12c0 .5-.5 1-1 1-6 0-11-5-11-11 0-.5.5-1 1-1z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  05 82 95 33 75
                </a>
              </div>

              {/* Trust signals compact */}
              <ul className="space-y-2 text-[13px] text-ipb-muted leading-[1.7]">
                {[
                  '<strong class="text-ipb-text not-italic font-medium">Rapport reconnu par les assurances</strong> — opposable en cas de litige CAT-NAT',
                  '<strong class="text-ipb-text not-italic font-medium">Agrafage par nos équipes</strong> — pas de sous-traitance, garantie unique',
                  '<strong class="text-ipb-text not-italic font-medium">Institut créé en 2019</strong> — 850 chantiers livrés en Occitanie',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-ipb-orange flex-shrink-0">—</span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Photo + bandeau preuve */}
            <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
              <Image
                src="/images/fissures-avant-apres.webp"
                alt="Avant/après agrafage de fissure structurelle — Institut IPB Toulouse"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ipb-navy/90 via-ipb-navy/40 to-transparent p-6">
                <p className="text-[10px] text-white/60 uppercase tracking-[0.16em] mb-1">Chantier livré</p>
                <p className="font-serif text-white font-bold text-[18px] leading-tight">
                  Maison à Tournefeuille — sécheresse 2022
                </p>
                <p className="text-white/70 text-[13px] mt-1">Indemnisation 92% obtenue avec notre rapport</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bandeau preuves chiffrées */}
      <section className="bg-ipb-navy py-12">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: 850, suffix: '+', label: 'Chantiers livrés' },
              { value: 4.9, decimals: 1, suffix: '/5', label: 'Avis Google' },
              { value: 7, suffix: ' j', label: 'Délai de visite' },
              { value: 10, suffix: ' ans', label: 'Décennale AXA' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-serif text-white font-bold leading-none mb-2" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>
                  <StatCounter value={s.value} decimals={s.decimals || 0} />
                  <span className="text-ipb-orange-l">{s.suffix}</span>
                </p>
                <p className="text-[10px] text-white/75 uppercase tracking-[0.14em]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche : 3 étapes */}
      <section className="bg-ipb-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-ipb-text text-center mb-12" style={{ fontSize: 'clamp(28px, 2.6vw, 36px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
            Comment ça marche,<br /><em>en trois étapes.</em>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[
              { num: '01', titre: 'Vous nous décrivez la situation', desc: "En ligne en 2 minutes ou par téléphone. On valide la zone d'intervention et l'urgence." },
              { num: '02', titre: 'Visite technique sous 7 jours', desc: "Notre institut vient sur place avec instruments de mesure. Diagnostic en 1h, rapport sous 7 jours." },
              { num: '03', titre: 'Travaux par nos équipes', desc: "Si l'agrafage est nécessaire : devis ferme, planning précis, exécution sous garantie 10 ans." },
            ].map((etape) => (
              <div key={etape.num}>
                <p className="font-serif text-ipb-orange text-[14px] font-bold tracking-wider mb-4">{etape.num}</p>
                <h3 className="font-serif text-ipb-text font-bold text-[20px] leading-tight mb-3">{etape.titre}</h3>
                <p className="text-[14px] leading-[1.85] font-light text-ipb-muted">{etape.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA répété */}
      <section className="bg-ipb-cream py-16 lg:py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-ipb-text mb-6" style={{ fontSize: 'clamp(26px, 2.4vw, 36px)', lineHeight: 1.18, letterSpacing: '-0.022em', fontWeight: 700 }}>
            Prêt à faire venir l’institut&nbsp;?
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MagneticButton href="/diagnostic?utm_source=ads&utm_medium=cpc&utm_campaign=fissures_toulouse" variant="primary">
              Demander un diagnostic
            </MagneticButton>
            <a
              href="tel:0582953375"
              className="inline-flex items-center justify-center gap-2 bg-ipb-navy text-white font-semibold text-[13px] tracking-[0.03em] rounded-[3px] px-7 py-[15px]"
            >
              05 82 95 33 75
            </a>
          </div>
          <p className="text-[12px] text-ipb-light mt-4">Devis gratuit · Sans engagement · Confidentiel</p>
        </div>
      </section>
    </LandingShell>
  );
}
