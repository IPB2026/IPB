import type { Metadata } from 'next';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { CalculatorClient } from './CalculatorClient';

export const metadata: Metadata = {
  title: "Calculateur Prix Mur Porteur Toulouse · Gratuit 2 min",
  description: "Estimez votre prix d'ouverture mur porteur en 2 min. Gratuit, sans inscription. Tarifs IPB Occitanie. Décennale AXA. ☎ 05 82 95 33 75",
  keywords: [
    'prix ouverture mur porteur toulouse',
    'devis mur porteur en ligne',
    'calculateur prix mur porteur',
    'estimation mur porteur gratuit',
    'prix poutre IPN HEB',
    'tarif ouverture mur porteur',
  ],
  alternates: { canonical: 'https://www.ipb-expertise.fr/calcul-prix-mur-porteur' },
  openGraph: {
    title: "Calculateur Prix Mur Porteur Toulouse · IPB",
    description: "Estimation gratuite en 2 minutes. Tarifs réels IPB. Décennale AXA.",
    url: 'https://www.ipb-expertise.fr/calcul-prix-mur-porteur',
    type: 'website',
  },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Calculateur prix ouverture de mur porteur",
  "url": "https://www.ipb-expertise.fr/calcul-prix-mur-porteur",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "creator": {
    "@type": "Organization",
    "name": "IPB - Institut de Pathologie du Bâtiment",
    "url": "https://www.ipb-expertise.fr",
  }
};

export default function CalculatorPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="tool-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream pt-16 lg:pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <RevealOnScroll>
              <Eyebrow className="justify-center">Outil interactif · sans inscription</Eyebrow>
              <h1
                className="font-serif text-ipb-text mb-6"
                style={{
                  fontSize: 'clamp(36px, 4vw, 56px)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.025em',
                  fontWeight: 700,
                }}
              >
                Combien coûte une ouverture de mur porteur&nbsp;?<br /><em>Estimation en deux minutes.</em>
              </h1>
              <p className="text-[15px] leading-[1.85] font-light text-ipb-muted max-w-xl mx-auto">
                Quatre questions, deux minutes. Notre calculateur vous donne une fourchette précise, basée sur les chantiers réalisés ces derniers mois en Haute-Garonne, Tarn-et-Garonne, Gers, Tarn et Ariège.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* CALCULATEUR — placé en premier pour que l'utilisateur démarre tout
            de suite l'estimation personnalisée. Le tableau de prix moyens
            arrive ensuite comme repère/comparaison. */}
        <section className="bg-ipb-cream pb-12">
          <div className="max-w-2xl mx-auto px-6 lg:px-12">
            <RevealOnScroll delay={0.06}>
              <CalculatorClient />
            </RevealOnScroll>
          </div>
        </section>

        {/* GUIDE DES PRIX (zone éditoriale après le calculateur) */}
        <section className="bg-ipb-cream pb-20 lg:pb-28">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <h2
                className="font-serif text-ipb-text mb-8"
                style={{ fontSize: 'clamp(24px, 2.4vw, 34px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}
              >
                Prix moyens d'une ouverture de mur porteur à Toulouse
              </h2>
              <p className="text-[15px] leading-[1.85] font-light text-ipb-muted mb-8 max-w-2xl">
                Les fourchettes ci-dessous sont calculées à partir de chantiers IPB livrés ces 24 derniers mois. Elles incluent l'étude structure, la pose de la poutre, l'étaiement, l'ouverture et les finitions. <strong className="text-ipb-text not-italic">Décennale AXA incluse</strong>.
              </p>

              <div className="overflow-x-auto -mx-6 lg:mx-0 px-6 lg:px-0 mb-10">
                <table className="w-full text-[14px] border-collapse">
                  <thead>
                    <tr className="border-b-2 border-ipb-rule">
                      <th className="text-left py-3 pr-4 font-serif font-bold text-ipb-text">Configuration</th>
                      <th className="text-left py-3 pr-4 font-serif font-bold text-ipb-text">Largeur d'ouverture</th>
                      <th className="text-right py-3 font-serif font-bold text-ipb-text">Prix TTC*</th>
                    </tr>
                  </thead>
                  <tbody className="text-ipb-muted">
                    <tr className="border-b border-ipb-rule">
                      <td className="py-3 pr-4 font-medium text-ipb-text">Cuisine ouverte standard (RDC seul, mur brique foraine)</td>
                      <td className="py-3 pr-4">2,5 m × 2,2 m</td>
                      <td className="py-3 text-right font-bold text-ipb-text">3 400 – 6 000 €</td>
                    </tr>
                    <tr className="border-b border-ipb-rule">
                      <td className="py-3 pr-4 font-medium text-ipb-text">Suite parentale (RDC ou étage, mur parpaing)</td>
                      <td className="py-3 pr-4">3,0 m × 2,2 m</td>
                      <td className="py-3 text-right font-bold text-ipb-text">5 100 – 8 500 €</td>
                    </tr>
                    <tr className="border-b border-ipb-rule">
                      <td className="py-3 pr-4 font-medium text-ipb-text">Plateau loft (étage habité au-dessus)</td>
                      <td className="py-3 pr-4">4,0 m × 2,4 m</td>
                      <td className="py-3 text-right font-bold text-ipb-text">7 700 – 12 000 €</td>
                    </tr>
                    <tr className="border-b border-ipb-rule">
                      <td className="py-3 pr-4 font-medium text-ipb-text">Création de baie vitrée (mur extérieur porteur)</td>
                      <td className="py-3 pr-4">3,0 m × 2,4 m</td>
                      <td className="py-3 text-right font-bold text-ipb-text">8 500 – 15 300 €</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-ipb-text">Grande baie vitrée signature</td>
                      <td className="py-3 pr-4">5,0 m × 2,4 m</td>
                      <td className="py-3 text-right font-bold text-ipb-text">12 750 – 21 250 €</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-[12px] text-ipb-light mt-3">
                  *Étude structure + dimensionnement IPN/HEB + étaiement + travaux + finitions. Hors démarches mairie spécifiques.
                </p>
              </div>

              <h3 className="font-serif text-ipb-text mb-4 font-bold not-italic" style={{ fontSize: 'clamp(20px, 1.8vw, 24px)' }}>
                Ce qui fait varier le prix
              </h3>
              <ul className="text-[14px] leading-[1.85] font-light text-ipb-muted space-y-2 mb-8 list-disc pl-5">
                <li><strong className="text-ipb-text not-italic">La portée de l'ouverture</strong> : au-delà de 3 m, on passe d'un IPN classique à un HEB plus lourd, ce qui ajoute 500 à 2 000 € selon le profil.</li>
                <li><strong className="text-ipb-text not-italic">La nature du mur</strong> : la brique foraine toulousaine se découpe relativement bien ; le parpaing armé ou la pierre nécessitent plus de matage et de scellement.</li>
                <li><strong className="text-ipb-text not-italic">Ce qui se trouve au-dessus</strong> : un seul niveau habité allège l'étaiement ; deux étages ou des combles aménagés exigent un dimensionnement renforcé.</li>
                <li><strong className="text-ipb-text not-italic">Les démarches administratives</strong> : la déclaration préalable de travaux est suffisante dans la plupart des cas. En copropriété, l'assemblée générale ajoute 4 à 8 semaines de délai.</li>
              </ul>

              {/* Encadré différenciation : positionnement IPB vs marché */}
              <div className="bg-ipb-white border-l-2 border-ipb-orange p-6 rounded-r-[3px] mb-2">
                <p className="text-[10px] text-ipb-orange uppercase tracking-[0.18em] font-semibold mb-3">
                  Note technique · l'approche IPB
                </p>
                <p className="text-[14px] leading-[1.85] font-light text-ipb-muted">
                  Pour les ouvertures de petite portée (jusqu'à 2,5 m, charges modérées), une intervention sans note de calcul formelle est techniquement possible et fréquente sur le marché. <strong className="text-ipb-text not-italic">IPB inclut systématiquement une étude technique signée</strong> dans toutes ses interventions, garantie décennale AXA oblige.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* COMMENT ON CALCULE */}
        <section className="bg-ipb-white py-24 lg:py-32 border-y border-ipb-rule">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <Eyebrow>Comment fonctionne ce calculateur</Eyebrow>
              <h2
                className="font-serif text-ipb-text mb-10"
                style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}
              >
                Quatre paramètres,<br /><em>une fourchette honnête.</em>
              </h2>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-[14px] leading-[1.85] font-light text-ipb-muted">
              {[
                { titre: 'Type de projet', desc: 'Permet d\'orienter la portée et la nature de la finition (cuisine ouverte, baie vitrée jardin, suite parentale).' },
                { titre: 'Dimensions de l\'ouverture', desc: 'La largeur conditionne le choix et le coût de la poutre (IPN ou HEB selon les charges).' },
                { titre: 'Type de mur', desc: 'Brique foraine, parpaing ou pierre — l\'effort de découpe et le scellement varient.' },
                { titre: 'Configuration de l\'étage', desc: "Ce qui se trouve au-dessus (combles, étage habité, deux étages) impacte le dimensionnement de la poutre." },
              ].map(({ titre, desc }) => (
                <RevealOnScroll key={titre} delay={0.04}>
                  <div>
                    <h3 className="font-serif text-ipb-text font-bold text-[18px] mb-2 not-italic">{titre}</h3>
                    <p>{desc}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <div className="mt-12 pt-10 border-t border-ipb-rule text-[13px] leading-[1.7] font-light text-ipb-muted">
              <p>
                Cet outil donne une fourchette de prix indicative basée sur les chantiers récents de l’institut à Toulouse, Saint-Cyprien, Carmes, Tournefeuille, Pamiers et alentour. <strong className="text-ipb-text not-italic">Le devis ferme nécessite une visite technique sur site</strong> — c'est gratuit et sans engagement.
              </p>
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
