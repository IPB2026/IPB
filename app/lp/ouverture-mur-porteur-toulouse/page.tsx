import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { LandingShell } from '@/components/landing/LandingShell';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { StatCounter } from '@/components/ui/StatCounter';

export const metadata: Metadata = {
  title: "Ouverture de mur porteur Toulouse — Devis sous 7 jours · IPB",
  description: "Institut structure intégré : étude technique, calcul de poutre, ouverture, finitions. 4 000 à 10 000 € pour 2,5 m. Décennale AXA.",
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.ipb-expertise.fr/expertise/mur-porteur' },
};

export default function LandingMurPorteurToulouse() {
  return (
    <LandingShell>
      <Script id="lp-mp-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "IPB · Ouverture mur porteur Toulouse",
          "telephone": "+33582953375",
          "address": { "@type": "PostalAddress", "addressLocality": "Toulouse", "postalCode": "31100" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "15" },
          "offers": { "@type": "Offer", "priceRange": "4000-20000 EUR", "priceCurrency": "EUR" }
        })
      }} />

      <section className="bg-ipb-cream pt-12 lg:pt-16 pb-12 lg:pb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[6fr_5fr] gap-10 lg:gap-12 items-center">
            <div>
              <p className="text-ipb-orange text-[11px] uppercase tracking-[0.18em] font-medium mb-4">
                Bureau d'études + travaux · Décennale AXA
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
                Ouvrir un mur porteur à Toulouse&nbsp;?<br />
                <em>Étude + travaux par le même institut.</em>
              </h1>
              <p className="text-[15px] leading-[1.85] font-light text-ipb-muted mb-8">
                Notre ingénieur calcule la poutre IPN ou HEB. Nos équipes l'installent. Tout en interne, tout sous décennale unique. <strong className="font-medium text-ipb-text not-italic">Estimation sous 7 jours.</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <MagneticButton href="/calcul-prix-mur-porteur?utm_source=ads&utm_medium=cpc&utm_campaign=mur_porteur_toulouse" variant="primary">
                  Estimer mon projet en 2 min
                </MagneticButton>
                <a
                  href="tel:0582953375"
                  className="inline-flex items-center justify-center gap-2 bg-ipb-navy text-white font-semibold text-[13px] tracking-[0.03em] rounded-[3px] px-7 py-[15px] hover:bg-[#1a2d40] transition-colors"
                >
                  05 82 95 33 75
                </a>
              </div>

              <ul className="space-y-2 text-[13px] text-ipb-muted leading-[1.7]">
                {[
                  '<strong class="text-ipb-text not-italic font-medium">Calcul technique signé</strong> — opposable face à un assureur ou un contrôleur',
                  '<strong class="text-ipb-text not-italic font-medium">Chantier 3 à 5 jours</strong> — étaiement, ouverture, pose poutre, finitions',
                  '<strong class="text-ipb-text not-italic font-medium">Tarifs constatés Toulouse</strong> — 4 000 à 10 000 € pour 2,5 m TTC',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-ipb-orange flex-shrink-0">—</span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
              <Image
                src="/images/baie-coulissante-apres.webp"
                alt="Baie coulissante installée après ouverture mur porteur — chantier IPB Toulouse"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ipb-navy/90 via-ipb-navy/40 to-transparent p-6">
                <p className="text-[10px] text-white/60 uppercase tracking-[0.16em] mb-1">Chantier livré</p>
                <p className="font-serif text-white font-bold text-[18px] leading-tight">
                  T3 Saint-Cyprien — ouverture 4,2 m
                </p>
                <p className="text-white/70 text-[13px] mt-1">Vendu 21 jours après · +28 000 € à la revente</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ipb-navy py-12">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: 850, suffix: '+', label: 'Chantiers livrés' },
              { value: 5, suffix: ' j', label: 'Chantier moyen' },
              { value: 4.9, decimals: 1, suffix: '/5', label: 'Avis Google' },
              { value: 10, suffix: ' ans', label: 'Décennale AXA' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-serif text-white font-bold leading-none mb-2" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>
                  <StatCounter value={s.value} decimals={s.decimals || 0} />
                  <span className="text-ipb-orange-l">{s.suffix}</span>
                </p>
                <p className="text-[10px] text-white/55 uppercase tracking-[0.14em]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ipb-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-ipb-text text-center mb-12" style={{ fontSize: 'clamp(28px, 2.6vw, 36px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
            Comment ça marche,<br /><em>en quatre étapes.</em>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {[
              { num: '01', titre: 'Estimation en ligne', desc: 'Notre calculateur vous donne une fourchette précise en 2 minutes.' },
              { num: '02', titre: 'Visite technique', desc: "Notre ingénieur passe sur place. Calcul de poutre, méthode d'étaiement." },
              { num: '03', titre: 'Devis ferme + planning', desc: 'Sous 7 jours après visite. Toutes les démarches préparées avec vous.' },
              { num: '04', titre: 'Chantier 3 à 5 jours', desc: "Étaiement, ouverture, pose poutre, finitions. Tous documents remis à la livraison." },
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

      <section className="bg-ipb-cream py-16 lg:py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-ipb-text mb-6" style={{ fontSize: 'clamp(26px, 2.4vw, 36px)', lineHeight: 1.18, letterSpacing: '-0.022em', fontWeight: 700 }}>
            Estimez votre projet maintenant.
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MagneticButton href="/calcul-prix-mur-porteur?utm_source=ads&utm_medium=cpc&utm_campaign=mur_porteur_toulouse" variant="primary">
              Calculer le prix en 2 min
            </MagneticButton>
            <a
              href="tel:0582953375"
              className="inline-flex items-center justify-center gap-2 bg-ipb-navy text-white font-semibold text-[13px] tracking-[0.03em] rounded-[3px] px-7 py-[15px]"
            >
              05 82 95 33 75
            </a>
          </div>
          <p className="text-[12px] text-ipb-light mt-4">Sans inscription · Devis gratuit · Décennale AXA</p>
        </div>
      </section>
    </LandingShell>
  );
}
