import Link from 'next/link';

/**
 * Liste en cartes pour mobile (remplace les tableaux qui débordent sur petit
 * écran). À utiliser en `md:hidden`, le `<table>` restant en `hidden md:block`.
 * Chaque carte est entièrement cliquable — l'info clé (statut, montant) reste
 * toujours visible, sans scroll horizontal.
 */

export function MobileCardList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white md:hidden">
      {children}
    </ul>
  );
}

export function MobileCardRow({
  href,
  title,
  badge,
  amount,
  lines,
  leading,
}: {
  href: string;
  title: React.ReactNode;
  badge?: React.ReactNode;
  amount?: React.ReactNode;
  lines?: React.ReactNode[];
  leading?: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-start gap-3 px-4 py-3.5 transition-colors active:bg-slate-50"
      >
        {leading}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate font-medium text-slate-900">{title}</span>
            {badge}
          </div>
          {lines
            ?.filter(Boolean)
            .map((l, i) => (
              <p key={i} className="mt-0.5 truncate text-xs text-slate-500">
                {l}
              </p>
            ))}
        </div>
        {amount != null && (
          <span className="shrink-0 self-center text-sm font-semibold tabular-nums text-slate-800">
            {amount}
          </span>
        )}
      </Link>
    </li>
  );
}
