import Link from 'next/link';

interface ArticleRef {
  slug: string;
  title: string;
  category: string;
}

const categoryLabels: Record<string, string> = {
  fissures: 'Fissures',
  humidite: 'Humidité',
  conseils: 'Conseils',
  expertise: 'Expertise',
};

interface PrevNextNavProps {
  prev: ArticleRef | null;
  next: ArticleRef | null;
}

/**
 * Navigation chronologique entre articles. Présentée à la fin de chaque
 * article pour booster l'engagement (temps passé sur le site = signal SEO
 * fort) et la découverte de contenu connexe.
 */
export function PrevNextNav({ prev, next }: PrevNextNavProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Navigation entre articles"
      className="mt-16 grid gap-4 sm:grid-cols-2 border-t border-ipb-rule pt-10"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group block bg-ipb-white border border-ipb-rule rounded-[6px] p-6 hover:border-ipb-orange hover:-translate-y-0.5 transition-all"
        >
          <p className="text-[10px] uppercase tracking-[0.18em] text-ipb-light font-semibold mb-3 flex items-center gap-2">
            <span aria-hidden="true">←</span> Article précédent
          </p>
          <p className="text-[10px] uppercase tracking-[0.14em] text-ipb-orange font-medium mb-2">
            {categoryLabels[prev.category] ?? prev.category}
          </p>
          <p className="font-serif font-bold text-[16px] leading-tight text-ipb-text group-hover:text-ipb-orange transition-colors">
            {prev.title}
          </p>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group block bg-ipb-white border border-ipb-rule rounded-[6px] p-6 hover:border-ipb-orange hover:-translate-y-0.5 transition-all sm:text-right"
        >
          <p className="text-[10px] uppercase tracking-[0.18em] text-ipb-light font-semibold mb-3 flex items-center gap-2 sm:justify-end">
            Article suivant <span aria-hidden="true">→</span>
          </p>
          <p className="text-[10px] uppercase tracking-[0.14em] text-ipb-orange font-medium mb-2">
            {categoryLabels[next.category] ?? next.category}
          </p>
          <p className="font-serif font-bold text-[16px] leading-tight text-ipb-text group-hover:text-ipb-orange transition-colors">
            {next.title}
          </p>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
