'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * BackButton — bouton retour discret éditorial.
 *
 * Deux modes :
 *   - href fourni → Link Next.js classique (préféré, SEO friendly + prefetch)
 *   - sans href → router.back() (utile pour articles/pages détail
 *     accessibles depuis plusieurs entrées)
 *
 * Style : flèche `←` + label, palette IPB sobre, hover orange.
 * Le texte est optionnel — sur mobile, on affiche juste la flèche si compact.
 */
interface BackButtonProps {
  href?: string;
  label?: string;
  /** Si true, masque le label sur mobile (icône seule) */
  compactMobile?: boolean;
  className?: string;
}

export function BackButton({
  href,
  label = 'Retour',
  compactMobile = false,
  className = '',
}: BackButtonProps) {
  const router = useRouter();

  const baseClass = `group inline-flex items-center gap-2 text-[12px] tracking-[0.06em] text-ipb-muted hover:text-ipb-orange transition-colors duration-300 font-medium ${className}`;

  const content = (
    <>
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5"
      >
        ←
      </span>
      <span className={compactMobile ? 'hidden sm:inline' : ''}>{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClass} aria-label={`${label}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={baseClass}
      aria-label={`${label} (page précédente)`}
    >
      {content}
    </button>
  );
}
