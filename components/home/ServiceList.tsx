import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

/**
 * ServiceList — 4 services regroupés en 3 familles.
 *
 * Familles (HOME-IPB-CONTENU-FINAL §6) :
 *  - Diagnostic de pathologies : 01 fissures, 02 humidité
 *  - Expertise : 03 avant achat, 04 avant vente
 *
 * Cf. IPB_Design_Handoff.md §5.5
 */
const services = [
  {
    num: '01',
    family: 'Diagnostic de pathologies',
    title: 'Diagnostic et traitement des fissures',
    desc: "Visite sur site, mesure au fissuromètre, identification de la cause — tassement, retrait-gonflement des argiles, défaut de structure. On vous remet un rapport reconnu par les assurances, avec des préconisations claires. Si des travaux s'imposent, on vous oriente vers des entreprises membres du réseau IPB.",
    href: '/expertise/fissures',
  },
  {
    num: '02',
    family: 'Diagnostic de pathologies',
    title: 'Diagnostic humidité et infiltrations',
    desc: "Remontées capillaires, infiltrations, condensation : on confond souvent les origines, et on traite à côté. L'institut identifie la cause exacte et préconise la solution juste. Un diagnostic juste évite des travaux inutiles.",
    href: '/expertise/humidite',
  },
  {
    num: '03',
    family: 'Expertise',
    title: 'Diagnostic du bâti avant achat immobilier',
    desc: "Analyse indépendante du bâti avant signature : fissures, désordres apparents et cachés, état de la structure. Rapport remis sous 3 à 5 jours, compatible avec votre délai de rétractation. Un avis sans aucun lien avec le vendeur ni l'agence.",
    href: '/expertise-avant-achat-immobilier-toulouse',
  },
  {
    num: '04',
    family: 'Expertise',
    title: 'Diagnostic avant vente immobilière',
    desc: "Vous vendez ? Un diagnostic indépendant du bâti avant la mise en vente rassure vos acheteurs, objective les doutes et sécurise votre prix. Vous abordez la transaction avec un dossier clair.",
    href: '/diagnostic-avant-vente',
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
                Une seule spécialité&nbsp;:<br />
                <em>le diagnostic de votre bâti.</em>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-[15px] leading-[1.9] font-light text-ipb-muted">
                Fissures, humidité, avant achat, avant vente&nbsp;: on identifie la cause et on vous remet des préconisations claires, en toute indépendance — en Occitanie.
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
                <span aria-hidden="true" className="font-serif text-[12px] font-bold text-ipb-rule group-hover:text-ipb-orange transition-colors duration-500 tracking-wider">
                  {service.num}
                </span>
                <div className="transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1.5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-ipb-orange-d font-medium mb-2">
                    {service.family}
                  </p>
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
