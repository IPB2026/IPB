import Link from 'next/link';
import { Metadata } from 'next';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from '@/components/ui/SmartBackBar';
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Plan du Site · IPB Expert Fissures & Humidité Toulouse',
  description:
    "Plan complet du site IPB : services, villes d'intervention, blog. Expert fissures et humidité en Occitanie. ☎ 05 82 95 33 75",
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/plan-site',
  },
};

type Section = {
  eyebrow: string;
  titre: string;
  links: { href: string; label: string; sub?: string }[];
};

const sections: Section[] = [
  {
    eyebrow: '01',
    titre: 'Pages principales',
    links: [
      { href: '/', label: 'Accueil' },
      { href: '/diagnostic', label: 'Diagnostic gratuit' },
      { href: '/contact', label: 'Contact' },
      { href: '/notre-expert', label: "L'expert" },
      { href: '/avis-clients', label: 'Avis clients' },
      { href: '/blog', label: 'Blog' },
    ],
  },
  {
    eyebrow: '02',
    titre: 'Nos expertises',
    links: [
      { href: '/expertise/fissures', label: 'Expertise fissures & agrafage' },
      { href: '/expertise/humidite', label: "Traitement de l'humidité" },
      { href: '/expertise/mur-porteur', label: 'Ouverture de mur porteur' },
    ],
  },
  {
    eyebrow: '03',
    titre: 'Départements',
    links: [
      { href: '/departements', label: 'Vue d’ensemble' },
      { href: '/departements/haute-garonne', label: 'Haute-Garonne (31)' },
      { href: '/departements/tarn-et-garonne', label: 'Tarn-et-Garonne (82)' },
      { href: '/departements/gers', label: 'Gers (32)' },
      { href: '/departements/tarn', label: 'Tarn (81)' },
      { href: '/departements/ariege', label: 'Ariège (09)' },
      { href: '/departements/aude', label: 'Aude (11)' },
    ],
  },
  {
    eyebrow: '04',
    titre: "Zones d'intervention",
    links: [
      { href: '/zones-intervention', label: 'Mapping complet (56 villes)' },
      { href: '/quartiers', label: 'Quartiers Toulouse — fiches locales' },
      { href: '/expert-fissures-toulouse-31', label: 'Toulouse · pillar fissures' },
      { href: '/expert-humidite-toulouse-31', label: 'Toulouse · pillar humidité' },
      { href: '/expert-fissures-montauban-82', label: 'Montauban · pillar fissures' },
    ],
  },
  {
    eyebrow: '05',
    titre: 'Villes — Haute-Garonne',
    links: [
      { href: '/expert-fissures/colomiers', label: 'Colomiers' },
      { href: '/expert-fissures/muret', label: 'Muret' },
      { href: '/expert-fissures/tournefeuille', label: 'Tournefeuille' },
      { href: '/expert-fissures/blagnac', label: 'Blagnac' },
      { href: '/expert-fissures/balma', label: 'Balma' },
      { href: '/expert-fissures/cugnaux', label: 'Cugnaux' },
      { href: '/expert-fissures/plaisance-du-touch', label: 'Plaisance-du-Touch' },
    ],
  },
  {
    eyebrow: '06',
    titre: 'Villes — autres départements',
    links: [
      { href: '/expert-fissures/castelsarrasin', label: 'Castelsarrasin (82)' },
      { href: '/expert-fissures/moissac', label: 'Moissac (82)' },
      { href: '/expert-fissures/auch', label: 'Auch (32)' },
      { href: '/expert-fissures/condom', label: 'Condom (32)' },
      { href: '/expert-fissures/fleurance', label: 'Fleurance (32)' },
      { href: '/expert-fissures/albi', label: 'Albi (81)' },
      { href: '/expert-fissures/castres', label: 'Castres (81)' },
      { href: '/expert-fissures/gaillac', label: 'Gaillac (81)' },
    ],
  },
  {
    eyebrow: '07',
    titre: "Humidité par ville",
    links: [
      { href: '/expert-humidite/blagnac', label: 'Humidité Blagnac' },
      { href: '/expert-humidite/colomiers', label: 'Humidité Colomiers' },
      { href: '/expert-humidite/muret', label: 'Humidité Muret' },
      { href: '/expert-humidite/tournefeuille', label: 'Humidité Tournefeuille' },
    ],
  },
  {
    eyebrow: '08',
    titre: 'Blog — Fissures',
    links: [
      { href: '/blog/fissures-maison-toulouse-que-faire', label: 'Fissures maison Toulouse' },
      { href: '/blog/agrafage-vs-micropieux-choix', label: 'Agrafage vs micropieux' },
      { href: '/blog/fissures-escalier-tassement-differentiel', label: 'Fissures en escalier' },
      { href: '/blog/fissure-ouverture-porte-fenetre', label: 'Portes qui coincent' },
      { href: '/blog/fissure-facade-reboucher-ou-reparer', label: 'Reboucher ou réparer' },
      { href: '/blog/fissure-plafond-que-faire', label: 'Fissures au plafond' },
      { href: '/blog/prix-agrafage-fissures-2026', label: 'Prix agrafage 2026' },
    ],
  },
  {
    eyebrow: '09',
    titre: 'Blog — Humidité',
    links: [
      { href: '/blog/humidite-remontee-capillaire-solution', label: 'Remontées capillaires' },
      { href: '/blog/humidite-salpetre-traitement', label: 'Traitement salpêtre' },
      { href: '/blog/salpetre-toulouse-traitement-definitif', label: 'Salpêtre Toulouse' },
      { href: '/blog/merule-champignon-maison-danger', label: 'Mérule : le champignon' },
      { href: '/blog/traitement-humidite-injection-resine', label: 'Injection résine' },
      { href: '/blog/condensation-ou-infiltration', label: 'Condensation ou infiltration' },
      { href: '/blog/humidite-cave-sous-sol', label: 'Humidité en cave' },
    ],
  },
  {
    eyebrow: '10',
    titre: 'Blog — Conseils & assurance',
    links: [
      { href: '/blog/diagnostic-structurel-maison', label: 'Diagnostic structurel' },
      { href: '/blog/garantie-decennale-travaux-structure', label: 'Garantie décennale' },
      { href: '/blog/revente-maison-fissuree', label: 'Revente maison fissurée' },
      {
        href: '/blog/catastrophe-naturelle-secheresse-demarches-indemnisation',
        label: 'CAT-NAT sécheresse : démarches',
      },
      { href: '/blog/fondations-maison-ancienne-renforcement', label: 'Renforcement fondations' },
      { href: '/blog/assurance-fissures-maison-indemnisation', label: 'Assurance fissures' },
    ],
  },
  {
    eyebrow: '11',
    titre: 'Blog — Mur porteur',
    links: [
      { href: '/blog/prix-ouverture-mur-porteur-toulouse-2026', label: 'Prix ouverture mur porteur' },
      { href: '/blog/comment-savoir-si-mur-porteur', label: 'Reconnaître un mur porteur' },
      { href: '/blog/etude-de-cas-mur-porteur-4m-t3-toulouse', label: 'Étude de cas : T3 Toulouse' },
    ],
  },
  {
    eyebrow: '12',
    titre: 'Mentions légales',
    links: [
      { href: '/legal/mentions-legales', label: 'Mentions légales' },
      { href: '/legal/confidentialite', label: 'Politique de confidentialité' },
      { href: '/legal/cgv', label: 'Conditions générales de vente' },
    ],
  },
];

export default function PlanSitePage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO éditorial */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-12 lg:pt-16 pb-16 lg:pb-20">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Plan du site</Eyebrow>
              </RevealOnScroll>
              <RevealOnScroll delay={0.06}>
                <h1
                  className="font-serif text-ipb-text mb-8"
                  style={{
                    fontSize: 'clamp(40px, 4.4vw, 64px)',
                    lineHeight: 1.06,
                    letterSpacing: '-0.025em',
                    fontWeight: 700,
                  }}
                >
                  Toutes les pages,<br />
                  <em>en une seule vue.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted max-w-[580px]">
                  Navigation complète du site IPB : expertises, départements, villes
                  d'intervention, articles de fond. Pour aller à l'essentiel, partez du
                  diagnostic gratuit.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* GRILLE SECTIONS */}
        <section className="bg-ipb-white py-16 lg:py-20 border-y border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section, i) => (
                <RevealOnScroll key={section.titre} delay={(i % 3) * 0.05}>
                  <div className="bg-ipb-cream border border-ipb-rule rounded-[6px] p-7 h-full">
                    <p className="text-[10px] text-ipb-orange uppercase tracking-[0.18em] mb-3 font-medium">
                      {section.eyebrow}
                    </p>
                    <h2 className="font-serif text-ipb-text font-bold text-[20px] leading-tight mb-5">
                      {section.titre}
                    </h2>
                    <ul className="space-y-2.5">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-[13px] leading-[1.7] font-light text-ipb-muted hover:text-ipb-orange transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
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
