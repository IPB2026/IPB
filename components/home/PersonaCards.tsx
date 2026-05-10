import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

/**
 * PersonaCards — section qui parle directement aux personas.
 *
 * Utilisé sur la home (4 personas IPB) et adapté sur les pages
 * thématiques (fissures = 3 personas concernés, mur porteur =
 * sous-profils de rénovateurs).
 *
 * Grid 2 colonnes sur md+ (4 personas → 2×2), stack vertical sur
 * mobile pour rester cohérent avec la consigne "section qui se lit
 * de haut en bas sur mobile".
 *
 * Cf. cahier des charges §2.1 et §0.2 (ton institut).
 */

export interface PersonaCard {
  /** Label en haut de la card (ex. "Sinistré", "Cuisine ouverte") */
  label: string;
  /** Titre court adressé directement au persona */
  titre: string;
  /** Description sobre, 2 à 3 phrases */
  desc: string;
  /** URL interne vers la page dédiée */
  href: string;
  /** Libellé du lien sortant */
  cta: string;
}

interface PersonaCardsProps {
  eyebrow?: string;
  /** Titre H2 — accepte ReactNode pour les sauts de ligne et italiques */
  title: React.ReactNode;
  /** Sous-titre / paragraphe d'intro optionnel */
  intro?: string;
  personas: PersonaCard[];
  /** Fond de la section. Choisir selon la couleur des sections voisines. */
  background?: 'cream' | 'white';
}

export function PersonaCards({
  eyebrow = 'Selon votre situation',
  title,
  intro,
  personas,
  background = 'cream',
}: PersonaCardsProps) {
  const bgClass = background === 'cream' ? 'bg-ipb-cream' : 'bg-ipb-white';
  // Pour les cards : fond inverse de la section pour ressortir
  const cardBgClass = background === 'cream' ? 'bg-ipb-white' : 'bg-ipb-cream';

  return (
    <section className={`${bgClass} py-24 lg:py-32`}>
      <div className="max-w-ipb mx-auto px-6 lg:px-12">
        <RevealOnScroll>
          <div className="mb-12 lg:mb-16 max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2
              className="font-serif text-ipb-text"
              style={{
                fontSize: 'clamp(32px, 3vw, 46px)',
                lineHeight: 1.12,
                letterSpacing: '-0.022em',
                fontWeight: 700,
              }}
            >
              {title}
            </h2>
            {intro && (
              <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mt-6 max-w-[600px]">
                {intro}
              </p>
            )}
          </div>
        </RevealOnScroll>

        {/* Grid 2 cols desktop, stack mobile */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {personas.map((persona, i) => (
            <RevealOnScroll key={persona.href + i} delay={i * 0.05}>
              <Link
                href={persona.href}
                className={`group block ${cardBgClass} border border-ipb-rule rounded-[6px] p-8 lg:p-10 h-full transition-all duration-300 hover:border-ipb-orange hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)]`}
              >
                <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] uppercase mb-4">
                  {persona.label}
                </p>
                <h3
                  className="font-serif text-ipb-text font-bold mb-4"
                  style={{
                    fontSize: 'clamp(20px, 2vw, 24px)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.018em',
                  }}
                >
                  {persona.titre}
                </h3>
                <p className="text-[14px] leading-[1.85] font-light text-ipb-muted mb-6">
                  {persona.desc}
                </p>
                <span className="text-[13px] text-ipb-orange-d font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  {persona.cta}
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
