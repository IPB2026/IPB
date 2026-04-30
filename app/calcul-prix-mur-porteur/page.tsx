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
  description: "Estimez votre prix d'ouverture mur porteur Toulouse en 2 min. Gratuit, sans inscription. Tarifs réels IPB. Décennale AXA. ☎ 05 82 95 33 75",
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
                Combien coûte une ouverture de mur porteur&nbsp;à Toulouse&nbsp;?<br /><em>Estimation en deux minutes.</em>
              </h1>
              <p className="text-[15px] leading-[1.85] font-light text-ipb-muted max-w-xl mx-auto">
                Quatre questions, deux minutes. Notre calculateur vous donne une fourchette précise, basée sur les chantiers réalisés ces derniers mois en Haute-Garonne, Tarn-et-Garonne, Gers, Tarn et Ariège.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* CALCULATEUR */}
        <section className="bg-ipb-cream pb-20 lg:pb-28">
          <div className="max-w-2xl mx-auto px-6 lg:px-12">
            <RevealOnScroll delay={0.06}>
              <CalculatorClient />
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
