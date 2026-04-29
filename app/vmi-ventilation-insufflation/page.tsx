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
  title: 'VMI · Ventilation par insufflation · Prix, avantages et installation · Institut IPB',
  description: "VMI (ventilation mécanique par insufflation) : solution anti-condensation et moisissures. Prix 2 500 à 4 500 € installée. Avantages versus VMC. Installateur Toulouse, Montauban, Auch.",
  keywords: ['VMI', 'ventilation insufflation', 'anti condensation', 'VMI prix', 'VMI vs VMC'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/vmi-ventilation-insufflation' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const avantagesVMI = [
  { titre: 'Élimine la condensation', desc: "L'air insufflé assèche naturellement les surfaces froides et abaisse l'hygrométrie." },
  { titre: 'Supprime les moisissures', desc: "En supprimant l'humidité ambiante, on supprime leur milieu de vie." },
  { titre: 'Air filtré', desc: 'Filtration des pollens, particules fines et polluants extérieurs (filtres G4 + F7).' },
  { titre: 'Air préchauffé', desc: "L'air entre à température ambiante grâce à l'échangeur, pas de sensation de froid." },
  { titre: 'Économies de chauffage', desc: "Jusqu'à 30 % d'économies en hiver — l'air sec est plus facile à chauffer." },
  { titre: 'Installation simple', desc: 'Pas de gaines dans toutes les pièces — un seul point central suffit.' },
];

const comparatif = [
  { critere: 'Principe', vmi: "Insuffle de l'air neuf (surpression)", vmc: "Aspire l'air vicié (dépression)" },
  { critere: 'Condensation', vmi: 'Élimine efficacement', vmc: 'Peut aggraver dans certains cas' },
  { critere: 'Air entrant', vmi: 'Filtré et préchauffé', vmc: 'Non filtré' },
  { critere: 'Installation', vmi: 'Simple — un point unique', vmc: 'Complexe — gaines à tirer' },
  { critere: 'Rénovation', vmi: 'Idéale', vmc: 'Travaux importants' },
  { critere: 'Prix installé', vmi: '2 500 – 4 500 €', vmc: '3 000 – 8 000 €' },
];

export default function VMIPage() {
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
          <span className="text-ipb-text">VMI</span>
        </div>
      </div>

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Solution anti-condensation</Eyebrow>
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
                  VMI — ventilation par insufflation.<br />
                  <em>L'air entre, l'humidité sort.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  La VMI insuffle de l'air filtré et préchauffé dans votre maison, créant une légère surpression qui évacue naturellement l'humidité et empêche la condensation. Idéale en rénovation : pas de gaines à tirer, un seul point d'installation.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Devis VMI gratuit
                  </MagneticButton>
                  <MagneticButton href="/expert-humidite-toulouse-31" variant="ghost">
                    Voir notre méthode
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.24}>
              <div className="mt-16 grid grid-cols-3 gap-12 lg:gap-8 max-w-3xl pt-12 border-t border-ipb-rule">
                <div>
                  <p className="font-serif text-ipb-text font-bold leading-none mb-3" style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
                    −70<span className="text-ipb-orange"> %</span>
                  </p>
                  <p className="text-[12px] text-ipb-muted uppercase tracking-[0.14em] font-medium">condensation</p>
                </div>
                <div>
                  <p className="font-serif text-ipb-text font-bold leading-none mb-3" style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
                    −30<span className="text-ipb-orange"> %</span>
                  </p>
                  <p className="text-[12px] text-ipb-muted uppercase tracking-[0.14em] font-medium">chauffage</p>
                </div>
                <div>
                  <p className="font-serif text-ipb-text font-bold leading-none mb-3" style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
                    10<span className="text-ipb-orange"> ans</span>
                  </p>
                  <p className="text-[12px] text-ipb-muted uppercase tracking-[0.14em] font-medium">garantie</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* AVANTAGES */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Pourquoi la VMI</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Six bénéfices,<br /><em>une installation simple.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ipb-rule border border-ipb-rule">
              {avantagesVMI.map((item, i) => (
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

        {/* COMPARATIF VMI / VMC */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Comparatif technique</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  VMI versus VMC,<br /><em>quelle différence&nbsp;?</em>
                </h2>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.06}>
              <div className="border border-ipb-rule rounded-[6px] overflow-hidden">
                <div className="grid grid-cols-3 bg-ipb-navy text-white">
                  <div className="p-5 font-serif font-bold text-[14px]">Critère</div>
                  <div className="p-5 font-serif font-bold text-[14px] text-center border-l border-white/10 bg-ipb-orange/10 text-ipb-orange-l">VMI</div>
                  <div className="p-5 font-serif font-bold text-[14px] text-center border-l border-white/10">VMC</div>
                </div>
                {comparatif.map((row, i) => (
                  <div key={row.critere} className={`grid grid-cols-3 ${i < comparatif.length - 1 ? 'border-b border-ipb-rule' : ''}`}>
                    <div className="p-5 bg-ipb-white font-serif font-bold text-[14px] text-ipb-text">{row.critere}</div>
                    <div className="p-5 bg-ipb-cream text-[13px] leading-[1.7] text-ipb-text border-l border-ipb-rule">{row.vmi}</div>
                    <div className="p-5 bg-ipb-white text-[13px] leading-[1.7] font-light text-ipb-muted border-l border-ipb-rule">{row.vmc}</div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="mt-12 bg-ipb-white border-l-4 border-ipb-orange p-6 lg:p-7">
                <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-3">IDÉALE EN RÉNOVATION</p>
                <p className="text-[14px] leading-[1.85] text-ipb-text">
                  Contrairement à la VMC qui nécessite des gaines dans toutes les pièces, la VMI s'installe en un seul point (combles ou placard technique). Parfait pour les maisons anciennes du centre toulousain, des Minimes ou de Côte Pavée.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* PRIX */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <RevealOnScroll>
              <Eyebrow variant="dark" className="justify-center">Prix VMI installée</Eyebrow>
              <h2 className="font-serif text-white mb-12" style={{ fontSize: 'clamp(48px, 6vw, 96px)', lineHeight: 1.05, letterSpacing: '-0.025em', fontWeight: 700 }}>
                2 500 – 4 500&nbsp;€
              </h2>
              <p className="text-[14px] text-white/65 uppercase tracking-[0.14em] font-medium mb-16">
                Fourniture · installation · mise en service
              </p>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 text-left">
              <RevealOnScroll delay={0.08}>
                <div className="bg-ipb-navy p-7 h-full">
                  <p className="font-serif text-ipb-orange-l text-[12px] font-bold tracking-[0.18em] mb-4">INCLUS</p>
                  <ul className="text-[13px] leading-[1.85] text-white/85 space-y-1.5">
                    <li>▸ Centrale VMI</li>
                    <li>▸ Filtres G4 + F7</li>
                    <li>▸ Pose et raccordement</li>
                    <li>▸ Mise en service</li>
                  </ul>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.14}>
                <div className="bg-ipb-navy p-7 h-full">
                  <p className="font-serif text-ipb-orange-l text-[12px] font-bold tracking-[0.18em] mb-4">DÉLAIS</p>
                  <ul className="text-[13px] leading-[1.85] text-white/85 space-y-1.5">
                    <li>▸ Installation : 1 journée</li>
                    <li>▸ Effet immédiat</li>
                    <li>▸ Garantie 10 ans</li>
                  </ul>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <div className="bg-ipb-navy p-7 h-full">
                  <p className="font-serif text-ipb-orange-l text-[12px] font-bold tracking-[0.18em] mb-4">ENTRETIEN</p>
                  <ul className="text-[13px] leading-[1.85] text-white/85 space-y-1.5">
                    <li>▸ Filtres : 50 à 100 €/an</li>
                    <li>▸ Conso élec : ~100 €/an</li>
                    <li>▸ Maintenance minimale</li>
                  </ul>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Articles connexes */}
        <nav aria-label="Articles connexes" className="bg-ipb-cream py-20 lg:py-24">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <p className="text-2xl font-serif font-bold text-ipb-text mb-8 text-center">Articles connexes</p>
            <div className="grid md:grid-cols-4 gap-px bg-ipb-rule border border-ipb-rule">
              {[
                { href: '/condensation-ou-infiltration', title: 'Condensation ou infiltration ?', desc: 'Comment distinguer' },
                { href: '/moisissures-maison-sante', title: 'Moisissures', desc: 'Risques santé' },
                { href: '/ponts-thermiques-condensation', title: 'Ponts thermiques', desc: 'Zones froides' },
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
