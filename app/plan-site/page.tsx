import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plan du site · Institut IPB · Fissures et humidité Toulouse',
  description: "Plan complet du site IPB : pages principales, expertises, départements, villes d'intervention, mentions légales et articles de blog.",
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/plan-site',
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface SectionProps {
  eyebrow: string;
  titre: string;
  children: React.ReactNode;
}

function Section({ eyebrow, titre, children }: SectionProps) {
  return (
    <article className="bg-ipb-white border border-ipb-rule p-7 lg:p-8">
      <p className="font-serif text-ipb-orange text-[11px] font-bold tracking-[0.18em] mb-3 uppercase">
        {eyebrow}
      </p>
      <h2 className="font-serif text-ipb-text font-bold text-[18px] leading-tight mb-5">
        {titre}
      </h2>
      <ul className="space-y-2.5 text-[14px]">
        {children}
      </ul>
    </article>
  );
}

interface ItemProps {
  href: string;
  children: React.ReactNode;
  highlight?: boolean;
}

function Item({ href, children, highlight }: ItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={`block text-ipb-text hover:text-ipb-orange transition-colors ${highlight ? 'font-medium text-ipb-orange' : 'font-light'}`}
      >
        {children}
      </Link>
    </li>
  );
}

export default function PlanSitePage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-16 lg:pb-20">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Plan du site</Eyebrow>
              </RevealOnScroll>
              <RevealOnScroll delay={0.06}>
                <h1
                  className="font-serif text-ipb-text mb-6"
                  style={{
                    fontSize: 'clamp(36px, 3.6vw, 56px)',
                    lineHeight: 1.06,
                    letterSpacing: '-0.025em',
                    fontWeight: 700,
                  }}
                >
                  Toutes les pages<br />
                  <em>de l'institut IPB.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted max-w-[620px]">
                  Accédez rapidement à toutes les pages du site : expertises, zones d'intervention, articles de blog et mentions légales.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* CONTENU PLAN */}
        <section className="bg-ipb-white py-16 lg:py-24">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ipb-rule border border-ipb-rule">
              <Section eyebrow="01" titre="Pages principales">
                <Item href="/">Accueil</Item>
                <Item href="/notre-expert">L'institut · Notre expert</Item>
                <Item href="/diagnostic">Diagnostic gratuit</Item>
                <Item href="/rdv-cabinet">Prendre rendez-vous au cabinet</Item>
                <Item href="/contact">Contact</Item>
                <Item href="/blog">Blog</Item>
                <Item href="/avis-clients">Avis clients</Item>
                <Item href="/partenaires">Partenaires</Item>
              </Section>

              <Section eyebrow="02" titre="Nos expertises">
                <Item href="/expertise/fissures">Diagnostic et traitement des fissures</Item>
                <Item href="/expertise/humidite">Diagnostic et traitement de l'humidité</Item>
                <Item href="/expertise/mur-porteur">Ouverture de mur porteur</Item>
                <Item href="/bureau-etude-structure-toulouse">Bureau d'études structure</Item>
                <Item href="/expertise-avant-achat-immobilier-toulouse">Expertise avant achat immobilier</Item>
                <Item href="/calcul-prix-mur-porteur">Calculateur de prix mur porteur</Item>
              </Section>

              <Section eyebrow="03" titre="Pages locales pilier">
                <Item href="/expert-fissures-toulouse-31">Expert fissures Toulouse (31)</Item>
                <Item href="/expert-fissures-montauban-82">Expert fissures Montauban (82)</Item>
                <Item href="/expert-humidite-toulouse-31">Expert humidité Toulouse (31)</Item>
                <Item href="/zones-intervention">Zones d'intervention (56 villes)</Item>
                <Item href="/quartiers">Quartiers de Toulouse</Item>
                <Item href="/carte-secheresse-occitanie">Carte sécheresse Occitanie</Item>
              </Section>

              <Section eyebrow="04" titre="Départements">
                <Item href="/departements">Tous nos départements</Item>
                <Item href="/departements/haute-garonne">Haute-Garonne (31)</Item>
                <Item href="/departements/tarn-et-garonne">Tarn-et-Garonne (82)</Item>
                <Item href="/departements/gers">Gers (32)</Item>
                <Item href="/departements/tarn">Tarn (81)</Item>
                <Item href="/departements/ariege">Ariège (09)</Item>
                <Item href="/departements/aude">Aude (11)</Item>
              </Section>

              <Section eyebrow="05" titre="Pages problèmes — fissures">
                <Item href="/fissure-en-escalier-causes">Fissure en escalier — causes</Item>
                <Item href="/fissure-horizontale-danger">Fissure horizontale — danger</Item>
                <Item href="/microfissure-quand-sinquieter">Microfissure — quand s'inquiéter</Item>
                <Item href="/fissure-fondation-maison">Fissure de fondation</Item>
                <Item href="/fissure-secheresse-indemnisation">Fissure sécheresse — indemnisation</Item>
                <Item href="/agrafage-fissures">Agrafage de fissures</Item>
              </Section>

              <Section eyebrow="06" titre="Pages problèmes — humidité">
                <Item href="/remontee-capillaire-solution">Remontées capillaires</Item>
                <Item href="/salpetre-mur-traitement">Salpêtre mur — traitement</Item>
                <Item href="/moisissures-maison-sante">Moisissures et santé</Item>
                <Item href="/cave-humide-solutions">Cave humide — solutions</Item>
                <Item href="/condensation-ou-infiltration">Condensation ou infiltration</Item>
                <Item href="/ponts-thermiques-condensation">Ponts thermiques</Item>
                <Item href="/merule-champignon-traitement">Mérule — traitement</Item>
                <Item href="/vmi-ventilation-insufflation">VMI — ventilation par insufflation</Item>
              </Section>

              <Section eyebrow="07" titre="Pages villes — Haute-Garonne (31)">
                <Item href="/expert-fissures/toulouse">Expert fissures Toulouse</Item>
                <Item href="/expert-fissures/colomiers">Colomiers</Item>
                <Item href="/expert-fissures/muret">Muret</Item>
                <Item href="/expert-fissures/tournefeuille">Tournefeuille</Item>
                <Item href="/expert-fissures/blagnac">Blagnac</Item>
                <Item href="/expert-fissures/balma">Balma</Item>
                <Item href="/zones-intervention" highlight>Voir les 56 villes →</Item>
              </Section>

              <Section eyebrow="08" titre="Pages villes — Autres départements">
                <Item href="/expert-fissures/montauban">Montauban (82)</Item>
                <Item href="/expert-fissures/castelsarrasin">Castelsarrasin (82)</Item>
                <Item href="/expert-fissures/moissac">Moissac (82)</Item>
                <Item href="/expert-fissures/auch">Auch (32)</Item>
                <Item href="/expert-fissures/condom">Condom (32)</Item>
                <Item href="/expert-fissures/albi">Albi (81)</Item>
                <Item href="/expert-fissures/castres">Castres (81)</Item>
              </Section>

              <Section eyebrow="09" titre="Services par ville">
                <Item href="/agrafage-fissures/toulouse">Agrafage Toulouse</Item>
                <Item href="/agrafage-fissures/colomiers">Agrafage Colomiers</Item>
                <Item href="/traitement-humidite/toulouse">Humidité Toulouse</Item>
                <Item href="/traitement-humidite/blagnac">Humidité Blagnac</Item>
                <Item href="/expert-mur-porteur/toulouse">Mur porteur Toulouse</Item>
                <Item href="/expert-mur-porteur/montauban">Mur porteur Montauban</Item>
              </Section>

              <Section eyebrow="10" titre="Blog — Fissures">
                <Item href="/blog/fissures-maison-toulouse-que-faire">Fissures maison Toulouse</Item>
                <Item href="/blog/agrafage-vs-micropieux-choix">Agrafage vs micropieux</Item>
                <Item href="/blog/fissures-escalier-tassement-differentiel">Fissures en escalier</Item>
                <Item href="/blog/fissure-ouverture-porte-fenetre">Portes qui coincent</Item>
                <Item href="/blog/fissure-facade-reboucher-ou-reparer">Reboucher ou réparer</Item>
                <Item href="/blog/fissure-plafond-que-faire">Fissures au plafond</Item>
                <Item href="/blog/prix-agrafage-fissures-2026">Prix agrafage 2026</Item>
              </Section>

              <Section eyebrow="11" titre="Blog — Humidité">
                <Item href="/blog/humidite-remontee-capillaire-solution">Remontées capillaires</Item>
                <Item href="/blog/humidite-salpetre-traitement">Traitement salpêtre</Item>
                <Item href="/blog/salpetre-toulouse-traitement-definitif" highlight>Salpêtre Toulouse</Item>
                <Item href="/blog/merule-champignon-maison-danger" highlight>Mérule : champignon destructeur</Item>
                <Item href="/blog/traitement-humidite-injection-resine">Injection résine</Item>
                <Item href="/blog/ventilation-humidite-condensation">VMC et condensation</Item>
                <Item href="/blog/humidite-cave-sous-sol">Humidité en cave</Item>
              </Section>

              <Section eyebrow="12" titre="Blog — Conseils & expertise">
                <Item href="/blog/diagnostic-structurel-maison">Diagnostic structurel</Item>
                <Item href="/blog/garantie-decennale-travaux-structure">Garantie décennale</Item>
                <Item href="/blog/revente-maison-fissuree">Revente maison fissurée</Item>
                <Item href="/blog/catastrophe-naturelle-secheresse-demarches-indemnisation">CAT-NAT sécheresse — démarches</Item>
                <Item href="/blog/fissure-maison-neuve-garantie-decennale">Fissure maison neuve</Item>
                <Item href="/blog/assurance-fissures-maison-indemnisation">Indemnisation assurance</Item>
                <Item href="/blog/fondations-maison-ancienne-renforcement">Renforcement de fondations</Item>
                <Item href="/blog/secheresse-argile-haute-garonne">Sol argileux Haute-Garonne</Item>
                <Item href="/blog/expert-batiment-independant-vs-expert-assurance">Expert indépendant vs expert assurance</Item>
              </Section>

              <Section eyebrow="13" titre="Mentions légales">
                <Item href="/legal/mentions-legales">Mentions légales</Item>
                <Item href="/legal/confidentialite">Politique de confidentialité</Item>
                <Item href="/legal/cgv">CGV</Item>
              </Section>
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
