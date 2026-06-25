import type { ReactNode } from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';

/**
 * Bande CTA éditoriale réutilisable, à placer en milieu/bas de page longue
 * (entre les sections de contenu et la FAQ) pour capter le visiteur convaincu
 * avant qu'il n'atteigne le CtaFinal. Style cream sobre — délibérément distinct
 * des sections navy pour ne pas dupliquer leur registre visuel.
 *
 * Ne porte AUCUN tracking propre : le diagnostic et le tel sont déjà instrumentés
 * (lib/analytics) à l'arrivée — ce composant ne fait que router.
 */
export function InlineCta({
  eyebrow = 'Prêt à avancer ?',
  title,
  text = "Décrivez votre situation en 2 minutes. L'institut vous rappelle sous 48 h avec un premier avis — gratuitement et sans engagement.",
}: {
  eyebrow?: string;
  title?: ReactNode;
  text?: string;
}) {
  return (
    <section className="bg-ipb-cream border-y border-ipb-rule">
      <div className="max-w-ipb mx-auto px-6 lg:px-12 py-14 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-[600px]">
            <p className="text-[10px] uppercase tracking-[0.18em] text-ipb-orange font-semibold mb-3">{eyebrow}</p>
            <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(24px, 2.3vw, 32px)', lineHeight: 1.18, letterSpacing: '-0.02em', fontWeight: 700 }}>
              {title ?? <>Un diagnostic clair, <em>avant toute décision.</em></>}
            </h2>
            <p className="mt-4 text-[14px] leading-[1.8] font-light text-ipb-muted">{text}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <MagneticButton href="/diagnostic" variant="primary">
              Mon diagnostic · 2 min
            </MagneticButton>
            <a
              href="tel:0582953375"
              className="inline-flex items-center justify-center gap-2 border border-ipb-text/15 text-ipb-text font-medium px-7 py-4 rounded-[3px] text-[14px] tracking-[0.02em] hover:border-ipb-orange hover:text-ipb-orange transition-colors min-h-[48px]"
              aria-label="Appeler IPB au 05 82 95 33 75"
            >
              05 82 95 33 75
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
