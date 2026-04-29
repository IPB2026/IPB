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
  title: "Zones d'intervention par département · Institut IPB",
  description:
    "L'institut IPB intervient en Haute-Garonne (31), Tarn-et-Garonne (82), Gers (32), Tarn (81), Ariège (09) et Aude (11). Diagnostic instrumenté de fissures et d'humidité, intervention sous 48 h.",
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/departements',
  },
  openGraph: {
    title: "Zones d'intervention par département · Institut IPB",
    description: "Six départements couverts en Occitanie. Diagnostic fissures et humidité sous 48 h.",
    url: 'https://www.ipb-expertise.fr/departements',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const departements = [
  {
    slug: 'haute-garonne',
    nom: 'Haute-Garonne',
    code: '31',
    villes: 'Toulouse, Colomiers, Blagnac, Muret, Tournefeuille',
    badge: 'Zone principale',
  },
  {
    slug: 'tarn',
    nom: 'Tarn',
    code: '81',
    villes: 'Albi, Castres, Gaillac, Lavaur, Mazamet',
    badge: null,
  },
  {
    slug: 'tarn-et-garonne',
    nom: 'Tarn-et-Garonne',
    code: '82',
    villes: 'Montauban, Castelsarrasin, Moissac, Caussade',
    badge: null,
  },
  {
    slug: 'gers',
    nom: 'Gers',
    code: '32',
    villes: "Auch, Condom, Fleurance, L'Isle-Jourdain",
    badge: null,
  },
  {
    slug: 'ariege',
    nom: 'Ariège',
    code: '09',
    villes: 'Foix, Pamiers, Saint-Girons, Lavelanet',
    badge: null,
  },
  {
    slug: 'aude',
    nom: 'Aude',
    code: '11',
    villes: 'Carcassonne, Narbonne, Castelnaudary, Limoux',
    badge: null,
  },
];

export default function DepartementsPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>{`${departements.length} départements couverts`}</Eyebrow>
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
                  Expert fissures et humidité<br />
                  <em>dans le Sud-Ouest.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  Basés à Toulouse, nous intervenons dans six départements d'Occitanie pour le diagnostic et le traitement des fissures structurelles et de l'humidité. Déplacement inclus dans la prestation, intervention sous 48 h.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic gratuit
                  </MagneticButton>
                  <MagneticButton href="/zones-intervention" variant="ghost">
                    Voir toutes les villes
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* LISTE DÉPARTEMENTS */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Nos six départements</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Cliquez sur un département<br /><em>pour la page locale.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ipb-rule border border-ipb-rule">
              {departements.map((dept, i) => (
                <RevealOnScroll key={dept.slug} delay={i * 0.04}>
                  <Link
                    href={`/departements/${dept.slug}`}
                    className="group relative block h-full p-8 lg:p-10 bg-ipb-white hover:bg-ipb-stone transition-colors duration-300"
                  >
                    {dept.badge && (
                      <span className="absolute top-6 right-6 text-[10px] uppercase tracking-[0.18em] font-bold text-ipb-orange border border-ipb-orange/30 bg-ipb-orange/5 px-2 py-1 rounded-[3px]">
                        {dept.badge}
                      </span>
                    )}

                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="font-serif text-ipb-orange font-bold text-[40px] leading-none">
                        {dept.code}
                      </span>
                      <h3 className="font-serif text-ipb-text font-bold text-[22px] leading-tight group-hover:text-ipb-orange transition-colors">
                        {dept.nom}
                      </h3>
                    </div>

                    <p className="text-[14px] leading-[1.85] font-light text-ipb-muted mb-6">
                      {dept.villes}
                    </p>

                    <span className="text-[13px] text-ipb-orange font-medium">
                      Voir la page département →
                    </span>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
