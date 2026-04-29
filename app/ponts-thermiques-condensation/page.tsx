import { Metadata } from 'next';
import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Ponts thermiques et condensation · Causes et solutions · Institut IPB',
  description: "Condensation et moisissures aux angles des murs ? Ponts thermiques = zones froides. Diagnostic et solutions techniques (VMI, isolation). Institut IPB Toulouse, Montauban, Auch.",
  keywords: ['pont thermique', 'condensation mur', 'moisissures angles', 'isolation thermique'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/ponts-thermiques-condensation' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const zonesPontsThermiques = [
  { zone: 'Angles murs-plafond', frequence: '35 %' },
  { zone: 'Contours de fenêtres', frequence: '25 %' },
  { zone: "Murs donnant sur l'extérieur", frequence: '20 %' },
  { zone: 'Dalles de balcon', frequence: '10 %' },
  { zone: 'Jonction mur-sol', frequence: '10 %' },
];

const symptomes = [
  { titre: 'Moisissures aux angles', desc: 'Taches noires dans les coins murs-plafond, traces de condensation persistantes.' },
  { titre: 'Condensation sur vitres', desc: 'Buée persistante sur les fenêtres, surtout le matin et en hiver.' },
  { titre: 'Murs froids au toucher', desc: 'Différence de température nette entre zones isolées et ponts thermiques.' },
  { titre: 'Papier peint qui se décolle', desc: "L'humidité fait lâcher la colle, surtout dans les zones froides." },
];

const solutions = [
  { titre: 'Isolation par intérieur (ITI)', description: 'Pose de plaques isolantes sur les murs froids. Solution la moins coûteuse, mais réduit la surface habitable.', prix: '50–100 €/m²', efficacite: '70 %' },
  { titre: 'Isolation par extérieur (ITE)', description: "Enveloppe isolante sur la façade. Supprime la quasi-totalité des ponts thermiques sans réduire la surface intérieure.", prix: '150–250 €/m²', efficacite: '95 %', recommended: true },
  { titre: 'VMI — ventilation par insufflation', description: "Renouvelle l'air et baisse le taux d'humidité. Réduit la condensation sans toucher au bâti.", prix: '2 500–4 500 €', efficacite: '60 %' },
];

export default function PontsThermiquesPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <TopBar />
      <Navbar />
      <SmartBackBar />

      <div className="bg-ipb-cream border-b border-ipb-rule py-3">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 text-sm text-ipb-muted">
          <Link href="/" className="hover:text-ipb-orange transition-colors">Accueil</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <Link href="/expert-humidite-toulouse-31" className="hover:text-ipb-orange transition-colors">Expert humidité</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <span className="text-ipb-text">Ponts thermiques</span>
        </div>
      </div>

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto grid lg:grid-cols-[58fr_42fr] gap-12 lg:gap-16 px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28 items-center">
            <div>
              <RevealOnScroll>
                <Eyebrow>Zones froides et condensation</Eyebrow>
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
                  Ponts thermiques.<br />
                  <em>Là où l'isolation manque.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[560px]">
                  Un pont thermique est une zone où l'isolation est insuffisante ou absente. En hiver, ces zones sont froides : l'humidité de l'air s'y condense, créant moisissures et dégradations de surface. La VMI ou l'isolation thermique adaptée règle le problème.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic thermique
                  </MagneticButton>
                  <MagneticButton href="/expert-humidite-toulouse-31" variant="ghost">
                    Voir notre méthode
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll direction="right" delay={0.1} className="hidden lg:block">
              <div className="bg-ipb-white border border-ipb-rule rounded-[6px] p-8">
                <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-6">
                  OÙ SE TROUVENT-ILS ?
                </p>
                <ul className="space-y-4">
                  {zonesPontsThermiques.map((item) => (
                    <li key={item.zone} className="flex items-center justify-between gap-4 pb-3 border-b border-ipb-rule last:border-b-0 last:pb-0">
                      <p className="font-serif text-ipb-text font-medium text-[14px]">{item.zone}</p>
                      <span className="font-serif text-ipb-orange font-bold text-[18px] leading-none flex-shrink-0">{item.frequence}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* SYMPTÔMES */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Reconnaître le problème</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Quatre symptômes<br /><em>typiques.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ipb-rule border border-ipb-rule">
              {symptomes.map((item, i) => (
                <RevealOnScroll key={item.titre} delay={i * 0.04}>
                  <article className="bg-ipb-white p-7 lg:p-8 h-full">
                    <span className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-4 block">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-ipb-text font-bold text-[18px] leading-tight mb-3">
                      {item.titre}
                    </h3>
                    <p className="text-[13px] leading-[1.8] font-light text-ipb-muted">
                      {item.desc}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTIONS */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Solutions techniques</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Trois approches,<br /><em>selon votre projet.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-px bg-ipb-rule border border-ipb-rule">
              {solutions.map((sol, i) => (
                <RevealOnScroll key={sol.titre} delay={i * 0.06}>
                  <article className={`p-8 lg:p-10 h-full flex flex-col relative ${sol.recommended ? 'bg-ipb-white border-t-2 border-ipb-orange' : 'bg-ipb-white'}`}>
                    {sol.recommended && (
                      <span className="absolute top-6 right-6 text-[10px] uppercase tracking-[0.18em] font-bold text-ipb-orange border border-ipb-orange/30 bg-ipb-orange/5 px-2 py-1 rounded-[3px]">
                        Optimale
                      </span>
                    )}
                    <span className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-4">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-ipb-text font-bold text-[19px] leading-tight mb-3">
                      {sol.titre}
                    </h3>
                    <p className="text-[13px] leading-[1.8] font-light text-ipb-muted mb-6 flex-grow">
                      {sol.description}
                    </p>
                    <dl className="text-[12px] space-y-1.5 pt-4 border-t border-ipb-rule">
                      <div className="flex justify-between">
                        <dt className="text-ipb-muted">Prix</dt>
                        <dd className="font-medium text-ipb-text">{sol.prix}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-ipb-muted">Efficacité</dt>
                        <dd className="font-medium text-ipb-orange">{sol.efficacite}</dd>
                      </div>
                    </dl>
                  </article>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll delay={0.2}>
              <div className="mt-12 max-w-3xl mx-auto bg-ipb-white border-l-4 border-ipb-orange p-6 lg:p-7">
                <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-3">CONSEIL EXPERT</p>
                <p className="text-[14px] leading-[1.85] text-ipb-text">
                  La VMI seule peut suffire si le pont thermique est léger. Elle coûte moins cher qu'une isolation et réduit la condensation de 60 à 70 %. Sur ponts thermiques marqués, l'ITE reste la solution la plus durable.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Articles connexes */}
        <nav aria-label="Articles connexes" className="bg-ipb-white py-20 lg:py-24">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <p className="text-2xl font-serif font-bold text-ipb-text mb-8 text-center">Articles connexes</p>
            <div className="grid md:grid-cols-4 gap-px bg-ipb-rule border border-ipb-rule">
              {[
                { href: '/vmi-ventilation-insufflation', title: 'VMI', desc: 'Solution anti-condensation' },
                { href: '/condensation-ou-infiltration', title: 'Condensation ou infiltration ?', desc: 'Comment distinguer' },
                { href: '/moisissures-maison-sante', title: 'Moisissures', desc: 'Risques santé' },
                { href: '/remontees-capillaires-traitement', title: 'Remontées capillaires', desc: 'Autre cause humidité' },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="group block bg-ipb-white p-6 hover:bg-ipb-stone transition-colors duration-300">
                  <h3 className="font-serif text-ipb-text font-bold text-[15px] leading-tight mb-2 group-hover:text-ipb-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-[1.7] font-light text-ipb-muted">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
