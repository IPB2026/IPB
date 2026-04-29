import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Traitement remontées capillaires · Injection résine hydrophobe · Institut IPB',
  description: "Traitement définitif des remontées capillaires par injection de résine hydrophobe. Processus, durée, prix, garantie 30 ans. Institut IPB Toulouse, Montauban, Auch (31-82-32).",
  keywords: ['remontées capillaires', 'injection résine', 'humidité murs', 'salpêtre', 'traitement humidité'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/remontees-capillaires-traitement' },
  openGraph: {
    title: 'Traitement remontées capillaires · Institut IPB',
    description: "Traitement définitif des remontées capillaires par injection. Résultat visible en 3 mois. Garantie 30 ans.",
    url: 'https://www.ipb-expertise.fr/remontees-capillaires-traitement',
    type: 'article',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const symptomes = [
  { titre: 'Salpêtre', desc: 'Poudre blanche cristalline au pied des murs.' },
  { titre: 'Peinture qui cloque', desc: 'Cloques et écaillage en partie basse.' },
  { titre: 'Moisissures', desc: 'Taches noires persistantes près du sol.' },
  { titre: 'Odeur de moisi', desc: 'Odeur persistante même après aération.' },
  { titre: 'Auréoles humides', desc: "Marques d'humidité qui montent du sol jusqu'à 1,50 m." },
  { titre: 'Enduit dégradé', desc: "Enduit qui se décolle ou s'effrite, plinthes qui gondolent." },
];

const etapesTraitement = [
  {
    titre: 'Diagnostic instrumenté',
    desc: "Mesure du taux d'humidité à différentes hauteurs avec humidimètre à sonde. Identification précise des zones concernées et de leur ampleur.",
    duree: '1 h 30',
  },
  {
    titre: 'Perçage calibré',
    desc: "Perçage tous les 10 à 15 cm à la base du mur, en quinconce. Profondeur égale aux deux tiers de l'épaisseur du mur.",
    duree: '1 jour',
  },
  {
    titre: 'Injection résine hydrophobe',
    desc: "Injection basse pression de résine silicone ou silane. Diffusion progressive et formation d'une barrière étanche continue.",
    duree: '1 à 2 jours',
  },
  {
    titre: 'Séchage naturel',
    desc: "Le mur évacue progressivement l'humidité accumulée. Comptez environ 1 mois par centimètre d'épaisseur. Suivi inclus à 3 et 6 mois.",
    duree: '6 à 12 mois',
  },
];

export default function RemonteesCapillairesPage() {
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
          <span className="text-ipb-text">Traitement remontées capillaires</span>
        </div>
      </div>

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Traitement par injection — garanti 30 ans</Eyebrow>
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
                  Traitement des remontées capillaires.<br />
                  <em>Injection résine hydrophobe.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  L'eau du sol remonte dans vos murs par capillarité — comme une éponge. L'injection de résine hydrophobe en pied de mur crée une barrière étanche durable qui stoppe le phénomène. Voici la méthode IPB en quatre étapes.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic gratuit
                  </MagneticButton>
                  <MagneticButton href="/remontee-capillaire-solution" variant="ghost">
                    Comprendre le phénomène
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.24}>
              <div className="mt-16 grid grid-cols-3 gap-8 lg:gap-12 max-w-2xl pt-12 border-t border-ipb-rule">
                <div>
                  <p className="font-serif text-ipb-text font-bold leading-none mb-3" style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
                    30<span className="text-ipb-orange"> ans</span>
                  </p>
                  <p className="text-[12px] text-ipb-muted uppercase tracking-[0.14em] font-medium">de garantie</p>
                </div>
                <div>
                  <p className="font-serif text-ipb-text font-bold leading-none mb-3" style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
                    95<span className="text-ipb-orange"> %</span>
                  </p>
                  <p className="text-[12px] text-ipb-muted uppercase tracking-[0.14em] font-medium">d'efficacité</p>
                </div>
                <div>
                  <p className="font-serif text-ipb-text font-bold leading-none mb-3" style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
                    48<span className="text-ipb-orange"> h</span>
                  </p>
                  <p className="text-[12px] text-ipb-muted uppercase tracking-[0.14em] font-medium">barrière active</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* SYMPTÔMES */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Reconnaître les remontées capillaires</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Six symptômes<br /><em>en pied de mur.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ipb-rule border border-ipb-rule">
              {symptomes.map((s, i) => (
                <RevealOnScroll key={s.titre} delay={i * 0.04}>
                  <article className="bg-ipb-white p-7 lg:p-8 h-full">
                    <span className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-4 block">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-ipb-text font-bold text-[18px] leading-tight mb-3">
                      {s.titre}
                    </h3>
                    <p className="text-[13px] leading-[1.8] font-light text-ipb-muted">
                      {s.desc}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESSUS */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow variant="dark">Notre méthode en 4 étapes</Eyebrow>
                <h2 className="font-serif text-white" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Du diagnostic<br /><em>au mur sec.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <ul className="space-y-8">
              {etapesTraitement.map((etape, i) => (
                <RevealOnScroll key={etape.titre} delay={0.08 + i * 0.06}>
                  <li className="grid grid-cols-[40px_1fr_auto] gap-5 items-start pb-8 border-b border-white/10">
                    <span className="font-serif text-ipb-orange-l text-[14px] font-bold tracking-wider pt-2">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-white text-[20px] font-bold leading-tight mb-2">{etape.titre}</h3>
                      <p className="text-[14px] leading-[1.75] font-light text-white/65">{etape.desc}</p>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-ipb-orange-l whitespace-nowrap pt-3">
                      {etape.duree}
                    </span>
                  </li>
                </RevealOnScroll>
              ))}
            </ul>
          </div>
        </section>

        {/* PRIX */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-12 max-w-2xl">
                <Eyebrow>Tarifs traitement injection</Eyebrow>
                <h2 className="font-serif text-ipb-text mb-6" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Trois lignes,<br /><em>tout est dit.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.06}>
              <div className="bg-ipb-white border border-ipb-rule rounded-[6px] divide-y divide-ipb-rule">
                <div className="flex items-center justify-between p-6 lg:p-7">
                  <div>
                    <h3 className="font-serif text-ipb-text font-bold text-[17px] leading-tight mb-1">Diagnostic instrumenté</h3>
                    <p className="text-[13px] font-light text-ipb-muted">Expertise sur site, rapport détaillé, déduit à 100 % des travaux.</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-6 lg:p-7">
                  <div className="flex-1">
                    <h3 className="font-serif text-ipb-text font-bold text-[17px] leading-tight mb-1">Injection résine</h3>
                    <p className="text-[13px] font-light text-ipb-muted">Par mètre linéaire de mur traité.</p>
                  </div>
                  <span className="font-serif text-ipb-orange font-bold text-[20px] leading-none">80 – 120 €</span>
                </div>
                <div className="flex items-center justify-between p-6 lg:p-7">
                  <div className="flex-1">
                    <h3 className="font-serif text-ipb-text font-bold text-[17px] leading-tight mb-1">Maison individuelle type</h3>
                    <p className="text-[13px] font-light text-ipb-muted">Selon le linéaire à traiter.</p>
                  </div>
                  <span className="font-serif text-ipb-orange font-bold text-[20px] leading-none">2 000 – 5 000 €</span>
                </div>
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
                { href: '/remontee-capillaire-solution', title: 'Remontées capillaires', desc: 'Comprendre le phénomène' },
                { href: '/salpetre-mur-traitement', title: 'Salpêtre', desc: 'Symptôme visible' },
                { href: '/cave-humide-solutions', title: 'Cave humide', desc: 'Cuvelage et drainage' },
                { href: '/expertise/humidite', title: 'Guide humidité', desc: 'Toutes nos solutions' },
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
