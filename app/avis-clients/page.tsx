import { Metadata } from 'next';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { StatCounter } from '@/components/ui/StatCounter';
import { googleReviews } from '@/app/data/testimonials';

export const metadata: Metadata = {
  title: 'Avis Clients IPB · 4.9/5 Google · Toulouse',
  description: "Avis Google vérifiés en Occitanie : 4.9/5. Diagnostic fissures, humidité, expertise avant achat. Institut indépendant de pathologie du bâtiment. ☎ 05 82 95 33 75",
  keywords: ['avis IPB', 'avis expert fissures toulouse', 'témoignages clients institut', 'IPB expertise avis', 'note google'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/avis-clients' },
  openGraph: {
    title: 'Avis clients · 4.9/5 sur Google · IPB Toulouse',
    description: "Avis Google vérifiés de clients en Occitanie. Institut de pathologie du bâtiment.",
    url: 'https://www.ipb-expertise.fr/avis-clients',
  },
};

// Source de vérité : fiche Google Business Profile d'IPB-Expertise.
// Les Review[] ci-dessous sont un sous-ensemble visible des 18 avis totaux ;
// l'aggregateRating reflète le total réel de la fiche GBP.
const reviewsSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.ipb-expertise.fr#organization",
  "name": "IPB - Institut de Pathologie du Bâtiment",
  "image": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "54 avenue Jean Jaurès",
    "addressLocality": "Tournefeuille",
    "postalCode": "31170",
    "addressCountry": "FR"
  },
  "telephone": "+33582953375",
  "url": "https://www.ipb-expertise.fr",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "18"
  },
  "review": googleReviews.map(r => ({
    "@type": "Review",
    "author": { "@type": "Person", "name": r.name },
    "datePublished": r.date,
    "reviewBody": r.text,
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
  }))
};

export default function AvisClientsPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream pt-16 lg:pt-24 pb-16 lg:pb-20">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 items-end">
              <RevealOnScroll className="lg:col-span-7">
                <Eyebrow>Avis clients</Eyebrow>
                <h1
                  className="font-serif text-ipb-text"
                  style={{
                    fontSize: 'clamp(40px, 4vw, 62px)',
                    lineHeight: 1.06,
                    letterSpacing: '-0.025em',
                    fontWeight: 700,
                  }}
                >
                  Une note constante,<br />
                  <em>chantier après chantier.</em>
                </h1>
              </RevealOnScroll>

              <RevealOnScroll delay={0.06} className="lg:col-span-5 lg:border-l lg:border-ipb-rule lg:pl-12">
                <p className="font-serif text-ipb-text font-bold leading-none mb-3" style={{ fontSize: 'clamp(56px, 5.4vw, 84px)' }}>
                  <StatCounter value={4.9} decimals={1} /><span className="text-ipb-light">/5</span>
                </p>
                <p className="text-[12px] text-ipb-text uppercase tracking-[0.14em] font-medium mb-1">
                  Note moyenne sur Google
                </p>
                <p className="text-[13px] font-light text-ipb-muted leading-[1.7]">
                  Avis vérifiés sur la fiche Google d'IPB-Expertise
                </p>
                <a
                  href="https://maps.app.goo.gl/6yDtzs7D1UcKSdJf6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ipb-orange font-medium text-[13px] tracking-wide border-b border-ipb-orange pb-1 hover:gap-3 transition-all mt-6"
                >
                  Lire tous les avis sur Google →
                </a>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* GRILLE AVIS */}
        <section className="bg-ipb-white py-20 lg:py-28">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="mb-12">
              <p className="text-[12px] text-ipb-text uppercase tracking-[0.14em] font-medium mb-3">
                Sélection d'avis récents
              </p>
              <p className="text-ipb-muted text-[15px] leading-[1.7] max-w-2xl">
                Avis publiés par nos clients sur la fiche Google Business d'IPB-Expertise.
                Pour les consulter dans leur intégralité, suivez le lien Google en bas de page.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {googleReviews.map((r, i) => (
                <RevealOnScroll key={r.id} delay={(i % 3) * 0.06}>
                  <article className="bg-ipb-cream border border-ipb-rule rounded-[6px] p-7 lg:p-8 h-full flex flex-col">
                    <p className="text-[10px] text-ipb-light uppercase tracking-[0.16em] mb-4">
                      Avis Google
                    </p>
                    <blockquote className="font-serif text-ipb-text text-[16px] leading-[1.55] flex-1 mb-6">
                      <em className="not-italic text-ipb-orange text-2xl leading-none mr-1 align-top">«&nbsp;</em>
                      {r.text}
                      <em className="not-italic text-ipb-orange text-2xl leading-none ml-1 align-top">&nbsp;»</em>
                    </blockquote>
                    <footer className="flex items-center gap-3 pt-5 border-t border-ipb-rule">
                      <div className="h-px w-7 bg-ipb-orange flex-shrink-0" aria-hidden="true" />
                      <div className="flex-1">
                        <p className="font-serif text-ipb-text font-bold text-[14px] leading-tight">
                          {r.name}
                        </p>
                        <p className="text-[11px] text-ipb-light uppercase tracking-[0.12em] mt-0.5">
                          {r.location ? `${r.location} · ${r.date}` : r.date}
                        </p>
                      </div>
                    </footer>
                  </article>
                </RevealOnScroll>
              ))}
            </div>

            <div className="text-center mt-16">
              <a
                href="https://maps.app.goo.gl/6yDtzs7D1UcKSdJf6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-ipb-orange font-medium text-[14px] tracking-wide border-b border-ipb-orange pb-1 hover:gap-3 transition-all"
              >
                Voir tous les avis sur Google →
              </a>
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
