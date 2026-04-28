import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

/**
 * ServiceList — liste architecturale numérotée 01-04.
 * Pattern signature IPB : PAS des cards, une vraie liste éditoriale.
 *
 * Format : grid 56px / 1fr / 48px
 *  - Numéro Playfair 12px → orange au hover
 *  - Titre Playfair 22px
 *  - Cercle 40×40 avec flèche → translate(4px) au hover
 *
 * Ordre : Fissures EN PREMIER (priorité SEO historique GSC).
 *
 * Cf. IPB_Design_Handoff.md §5.5
 */
const services = [
  {
    num: '01',
    title: 'Diagnostic et traitement des fissures',
    desc: 'Visite sur site, mesure au fissuromètre, identification de la cause. Solutions adaptées : agrafage structurel, harpage, reprise en sous-œuvre. Nos rapports sont reconnus par les assurances.',
    href: '/expertise/fissures',
  },
  {
    num: '02',
    title: 'Ouverture de mur porteur et baie vitrée',
    desc: "Étude de structure par notre ingénieur, dimensionnement de la poutre IPN ou HEB, étaiement, ouverture, finitions. Chantier en 3 à 5 jours.",
    href: '/expertise/mur-porteur',
  },
  {
    num: '03',
    title: 'Expertise avant achat immobilier',
    desc: "Analyse technique du bien avant signature : structure, fissures, désordres apparents et cachés. Rapport remis sous 7 jours.",
    href: '/expertise-avant-achat-immobilier-toulouse',
  },
  {
    num: '04',
    title: "Bureau d'études structure",
    desc: "Calcul de poutres, étude de charges, plans d'exécution. Pour particuliers, architectes d'intérieur, marchands de biens.",
    href: '/bureau-etude-structure-toulouse',
  },
];

export function ServiceList() {
  return (
    <section className="bg-ipb-cream py-24 lg:py-32">
      <div className="max-w-ipb mx-auto px-6 lg:px-12">
        <RevealOnScroll>
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-5">
              <Eyebrow>Nos expertises</Eyebrow>
              <h2
                className="font-serif text-ipb-text"
                style={{
                  fontSize: 'clamp(32px, 3vw, 46px)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.022em',
                  fontWeight: 700,
                }}
              >
                Quatre métiers,<br />
                <em>une seule structure.</em>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-[15px] leading-[1.9] font-light text-ipb-muted">
                Notre cabinet s'occupe de la structure des bâtiments anciens et neufs en Occitanie. Particuliers comme professionnels font appel à IPB pour la rigueur de nos diagnostics et la qualité de nos chantiers.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="border-t border-ipb-rule">
          {services.map((service, i) => (
            <RevealOnScroll key={service.num} delay={i * 0.06}>
              <Link
                href={service.href}
                className="group relative grid grid-cols-[56px_1fr_48px] lg:grid-cols-[80px_1fr_64px] gap-4 lg:gap-8 items-center py-8 lg:py-12 border-b border-ipb-rule px-2 -mx-2"
              >
                {/* Ligne orange qui s'étend de gauche à droite au hover */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 -bottom-px h-px bg-ipb-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                />
                <span className="font-serif text-[12px] font-bold text-ipb-rule group-hover:text-ipb-orange transition-colors duration-500 tracking-wider">
                  {service.num}
                </span>
                <div className="transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1.5">
                  <h3
                    className="font-serif text-ipb-text mb-2 group-hover:text-ipb-orange transition-colors duration-500"
                    style={{ fontSize: 'clamp(20px, 1.8vw, 26px)', fontWeight: 700, lineHeight: 1.3 }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-[14px] leading-[1.75] font-light text-ipb-muted max-w-[640px]">
                    {service.desc}
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-full border-[1.5px] border-ipb-rule group-hover:border-ipb-orange flex items-center justify-center text-ipb-rule group-hover:text-ipb-orange transition-all duration-500 justify-self-end"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1" aria-hidden="true">
                    <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
