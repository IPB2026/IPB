import Link from 'next/link';
import { Search, Users, FileText, Receipt, ClipboardCheck } from 'lucide-react';
import { guardAdminPage } from '@/lib/auth-helpers';
import { globalSearch, type SearchHit } from '@/lib/crm/search';
import { PageHeader } from '@/components/admin/page-header';

export const dynamic = 'force-dynamic';

export default async function RecherchePage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  await guardAdminPage();
  const q = (searchParams.q ?? '').trim();
  const results = q ? await globalSearch(q) : null;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Recherche"
        subtitle="Prospects, clients, devis, factures et rapports."
      />

      <form method="get" className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          name="q"
          defaultValue={q}
          autoFocus
          placeholder="Nom, n° de devis/facture/rapport, e-mail, téléphone, ville…"
          className="h-11 w-full rounded-xl border border-slate-300 pl-10 pr-3 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        />
      </form>

      {results === null ? (
        <p className="text-sm text-slate-400">
          Saisissez au moins 2 caractères pour lancer une recherche.
        </p>
      ) : results.total === 0 ? (
        <p className="text-sm text-slate-500">
          Aucun résultat pour «&nbsp;{q}&nbsp;».
        </p>
      ) : (
        <div className="space-y-5">
          <Group
            title="Prospects & clients"
            icon={Users}
            hits={results.contacts}
          />
          <Group title="Devis" icon={FileText} hits={results.devis} />
          <Group title="Factures" icon={Receipt} hits={results.factures} />
          <Group title="Rapports" icon={ClipboardCheck} hits={results.rapports} />
        </div>
      )}
    </div>
  );
}

function Group({
  title,
  icon: Icon,
  hits,
}: {
  title: string;
  icon: typeof Users;
  hits: SearchHit[];
}) {
  if (hits.length === 0) return null;
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <h2 className="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
        <Icon className="h-4 w-4" />
        {title}
        <span className="ml-auto tabular-nums text-slate-300">{hits.length}</span>
      </h2>
      <ul className="divide-y divide-slate-100">
        {hits.map((h) => (
          <li key={h.id}>
            <Link
              href={h.href}
              className="flex flex-col px-4 py-2.5 hover:bg-slate-50"
            >
              <span className="text-sm font-medium text-slate-800">{h.title}</span>
              {h.subtitle && (
                <span className="truncate text-xs text-slate-400">{h.subtitle}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
