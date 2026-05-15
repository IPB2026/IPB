import { Metadata } from 'next';
import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from '@/components/ui/SmartBackBar';
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Départements Occitanie · Expert Fissures & Humidité',
  description:
    "IPB intervient en Haute-Garonne, Tarn-et-Garonne, Gers, Tarn, Ariège, Aude. Diagnostic sous 48h. Décennale 10 ans sur les travaux. ☎ 05 82 95 33 75",
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/departements',
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
    slug: 'tarn',
    nom: 'Tarn',
    code: '81',
    villes: 'Albi, Castres, Gaillac, Lavaur, Mazamet',
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
        {/* HERO éditorial */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-20 lg:pb-24">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Zones d'intervention · Occitanie</Eyebrow>
              </RevealOnScroll>
              <RevealOnScroll delay={0.06}>
                <h1
                  className="font-serif text-ipb-text mb-8"
                  style={{
                    fontSize: 'clamp(40px, 4.4vw, 68px)',
                    lineHeight: 1.06,
                    letterSpacing: '-0.025em',
                    fontWeight: 700,
                  }}
                >
                  Six départements,<br />
                  <em>un seul institut.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted max-w-[580px] mb-10">
                  Basés à Tournefeuille, nous intervenons en Haute-Garonne, Tarn-et-Garonne,
                  Gers, Tarn, Ariège et Aude. Diagnostic de fissures, ouverture de mur porteur,
                  traitement de l'humidité — partout où nous nous déplaçons.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic gratuit
                  </MagneticButton>
                  <MagneticButton href="/zones-intervention" variant="ghost">
                    Voir la carte d'intervention
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* GRILLE DÉPARTEMENTS */}
        <section className="bg-ipb-white py-20 lg:py-24 border-y border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <Eyebrow>Choisir un département</Eyebrow>
              <h2
                className="font-serif text-ipb-text mb-12"
                style={{
                  fontSize: 'clamp(28px, 2.6vw, 40px)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.022em',
                  fontWeight: 700,
                }}
              >
                Chaque département a son terrain,<br />
                <em>son climat, ses pathologies.</em>
              </h2>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departements.map((dept, i) => (
                <RevealOnScroll key={dept.slug} delay={i * 0.04}>
                  <Link
                    href={`/departements/${dept.slug}`}
                    className="group block bg-ipb-white border border-ipb-rule rounded-[6px] p-7 hover:border-ipb-orange hover:shadow-[0_12px_36px_rgba(11,24,38,0.07)] hover:-translate-y-0.5 transition-all h-full"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        {dept.badge && (
                          <p className="text-[10px] text-ipb-orange uppercase tracking-[0.18em] mb-2 font-medium">
                            {dept.badge}
                          </p>
                        )}
                        <h3 className="font-serif text-ipb-text font-bold text-[24px] leading-tight group-hover:text-ipb-orange transition-colors">
                          {dept.nom}
                        </h3>
                      </div>
                      <span className="font-serif text-ipb-light text-[40px] leading-none font-bold">
                        {dept.code}
                      </span>
                    </div>
                    <p className="text-[13px] leading-[1.7] font-light text-ipb-muted mb-5">
                      {dept.villes}
                    </p>
                    <span className="text-ipb-orange text-[12px] font-medium border-b border-ipb-orange pb-0.5">
                      Voir les interventions →
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
