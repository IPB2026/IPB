import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Pagination serveur réutilisable. Conserve les autres paramètres d'URL (filtres,
 * recherche) et n'affiche rien s'il n'y a qu'une page. Liens = navigation native
 * (pas de JS), compatible RSC.
 */
export function Pagination({
  page,
  pageSize,
  total,
  basePath,
  params = {},
}: {
  page: number;
  pageSize: number;
  total: number;
  /** Chemin de base, ex. "/admin/clients". */
  basePath: string;
  /** Autres paramètres d'URL à conserver (q, etat…). */
  params?: Record<string, string>;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;

  const href = (p: number) => {
    const sp = new URLSearchParams(params);
    if (p > 1) sp.set('page', String(p));
    else sp.delete('page');
    const qs = sp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);

  // Numéros de page affichés : 1 … (page-1) page (page+1) … N (fenêtre glissante).
  const nums: (number | '…')[] = [];
  const add = (n: number) => nums.push(n);
  const windowStart = Math.max(2, page - 1);
  const windowEnd = Math.min(pages - 1, page + 1);
  add(1);
  if (windowStart > 2) nums.push('…');
  for (let p = windowStart; p <= windowEnd; p++) add(p);
  if (windowEnd < pages - 1) nums.push('…');
  if (pages > 1) add(pages);

  const arrow =
    'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50';
  const disabled = 'pointer-events-none opacity-40';

  return (
    <nav className="mt-4 flex flex-wrap items-center justify-between gap-3" aria-label="Pagination">
      <p className="text-xs text-slate-400 tabular-nums">
        {from}–{to} sur {total}
      </p>
      <div className="flex items-center gap-1.5">
        <Link href={href(page - 1)} className={`${arrow} ${page <= 1 ? disabled : ''}`} aria-label="Page précédente" aria-disabled={page <= 1}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
        {nums.map((n, i) =>
          n === '…' ? (
            <span key={`e${i}`} className="px-1 text-sm text-slate-400">…</span>
          ) : (
            <Link
              key={n}
              href={href(n)}
              aria-current={n === page ? 'page' : undefined}
              className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2.5 text-sm font-medium tabular-nums ${
                n === page ? 'bg-slate-900 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {n}
            </Link>
          )
        )}
        <Link href={href(page + 1)} className={`${arrow} ${page >= pages ? disabled : ''}`} aria-label="Page suivante" aria-disabled={page >= pages}>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </nav>
  );
}

/** Lit/normalise le numéro de page depuis les searchParams. */
export function parsePage(raw: string | string[] | undefined): number {
  const n = parseInt(Array.isArray(raw) ? raw[0] : raw ?? '1', 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}
