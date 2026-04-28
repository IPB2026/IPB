import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

/**
 * CaseStudies — 3 études de cas réelles.
 *
 * Brief client : "la partie trois maisons trois transformations c'est
 * catastrophique, les trois photos ne correspondent pas du tout au cas
 * présentés, d'ailleurs les deux premières concernent la même maison."
 *
 * Correction : 2 cas FISSURES + 1 cas MUR PORTEUR (équilibre demandé,
 * fissures > mur porteur car priorité SEO historique GSC : 1321 imp
 * sur top 7 requêtes fissures vs 0 imp pour mur porteur).
 *
 * Photos réaffectées en cohérence stricte avec le sujet de chaque cas :
 *  - fissures-avant-apres.webp → cas Tournefeuille
 *  - fissure-coin-maison.webp → cas Castanet
 *  - baie-coulissante-apres.webp → cas Saint-Cyprien
 */
const cases = [
  {
    type: 'Fissures',
    image: '/images/fissures-avant-apres.webp',
    imageAlt: 'Avant et après agrafage structurel sur fissure de façade — chantier IPB Tournefeuille',
    title: 'Maison sinistrée par la sécheresse',
    location: 'Tournefeuille, Haute-Garonne',
    surface: 'Maison T4 · 110 m²',
    duree: '8 jours',
    facts: [
      "Fissure traversante en escalier de 12 mm sur la façade nord-est",
      "Tassement différentiel reconnu en catastrophe naturelle 2022",
      "14 agrafes inox + 6 micropieux Ø178 mm",
    ],
    constat: "Le rapport a été transmis à l'expert d'assurance. L'indemnisation a couvert 92 % du chantier.",
  },
  {
    type: 'Fissures',
    image: '/images/fissure-coin-maison.webp',
    imageAlt: 'Fissure verticale au coin d\'une façade traitée par agrafage — chantier IPB Castanet-Tolosan',
    title: 'Fissures sur les angles de façade',
    location: 'Castanet-Tolosan, Haute-Garonne',
    surface: 'Maison T5 · 145 m²',
    duree: '6 jours',
    facts: [
      "Fissures verticales au droit des angles, 5 à 8 mm d'ouverture",
      "Diagnostic : retrait-gonflement des argiles (RGA fort)",
      "Agrafage structurel + matage à la résine fibrée",
    ],
    constat: "Suivi du déplacement sur deux cycles été/hiver : aucune évolution constatée.",
  },
  {
    type: 'Mur porteur',
    image: '/images/baie-coulissante-apres.webp',
    imageAlt: 'Baie vitrée coulissante installée après ouverture de mur porteur — chantier IPB Saint-Cyprien',
    title: "Cuisine ouverte sur séjour",
    location: 'Toulouse, Saint-Cyprien',
    surface: "T3 · 60 m² · 1er étage",
    duree: '5 jours',
    facts: [
      "Ouverture de 4,2 m sur mur porteur en briques foraines",
      "Pose d'une poutre HEB 220 dimensionnée par l'ingénieur",
      "Étaiement provisoire, finitions enduit complet",
    ],
    constat: "Le bien a été remis en vente trois semaines après le chantier.",
  },
];

export function CaseStudies() {
  return (
    <section className="bg-ipb-cream py-24 lg:py-32">
      <div className="max-w-ipb mx-auto px-6 lg:px-12">
        <RevealOnScroll>
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-6">
              <Eyebrow>Chantiers récents</Eyebrow>
              <h2
                className="font-serif text-ipb-text"
                style={{
                  fontSize: 'clamp(32px, 3vw, 46px)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.022em',
                  fontWeight: 700,
                }}
              >
                Trois interventions,<br />
                <em>en Haute-Garonne.</em>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-[15px] leading-[1.9] font-light text-ipb-muted">
                Trois chantiers menés ces derniers mois. Adresses et photos issues de nos archives — pas des illustrations stock.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cases.map((c, i) => (
            <RevealOnScroll key={c.title} delay={i * 0.06}>
              <article className="bg-ipb-white border border-ipb-rule rounded-[6px] overflow-hidden h-full flex flex-col group hover:shadow-[0_12px_36px_rgba(11,24,38,0.07)] transition-shadow duration-500">
                {/* Photo avec parallax doux scroll-tied */}
                <div className="relative aspect-[4/3] bg-ipb-stone">
                  <ParallaxImage
                    src={c.image}
                    alt={c.imageAlt}
                    intensity={0.18}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="absolute inset-0"
                    imageClassName="transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-ipb-white/90 backdrop-blur-sm text-ipb-text text-[10px] uppercase tracking-[0.16em] font-medium px-3 py-1.5 rounded-[2px]">
                      {c.type}
                    </span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-7 lg:p-8 flex-1 flex flex-col">
                  <h3 className="font-serif text-ipb-text text-[22px] font-bold leading-[1.3] mb-3">
                    {c.title}
                  </h3>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-ipb-light uppercase tracking-[0.1em] mb-5">
                    <span>{c.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{c.surface}</span>
                    <span aria-hidden="true">·</span>
                    <span>{c.duree}</span>
                  </div>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {c.facts.map((fact) => (
                      <li key={fact} className="flex gap-3 text-[13px] text-ipb-muted leading-[1.6] font-light">
                        <span className="text-ipb-orange flex-shrink-0 mt-1.5" aria-hidden="true">—</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-[13px] text-ipb-text italic leading-[1.6] pt-5 border-t border-ipb-rule">
                    {c.constat}
                  </p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.2}>
          <div className="mt-16 text-center">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 text-ipb-orange font-medium text-[13px] tracking-wide border-b border-ipb-orange pb-1 hover:gap-3 transition-all"
            >
              Décrire ma situation au cabinet →
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
