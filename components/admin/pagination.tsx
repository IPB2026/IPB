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

  const btn =
    'inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 hover:bg-slate-50';
  const disabled = 'pointer-events-none opacity-40';

  return (
    <nav className="mt-4 flex items-center justify-between" aria-label="Pagination">
      <p className="text-xs text-slate-400 tabular-nums">
        {from}–{to} sur {total}
      </p>
      <div className="flex items-center gap-2">
        <Link href={href(page - 1)} className={`${btn} ${page <= 1 ? disabled : ''}`} aria-disabled={page <= 1}>
          <ChevronLeft className="h-4 w-4" /> Précédent
        </Link>
        <span className="text-xs font-medium text-slate-500 tabular-nums">
          Page {page} / {pages}
        </span>
        <Link href={href(page + 1)} className={`${btn} ${page >= pages ? disabled : ''}`} aria-disabled={page >= pages}>
          Suivant <ChevronRight className="h-4 w-4" />
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
