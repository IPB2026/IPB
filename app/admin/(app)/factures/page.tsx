import Link from 'next/link';
import { ReceiptText, Download, Plus, Trash2, BadgeEuro } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState } from '@/components/admin/empty-state';
import { MobileCardList, MobileCardRow } from '@/components/admin/mobile-card';
import { FactureStatusBadge, SERVICE_LABEL } from '@/components/admin/badges';
import { ConfirmSubmit } from '@/components/admin/confirm-submit';
import { RelanceControl } from '@/components/admin/relance-control';
import { deleteFacture, recordFacturePayment } from '@/app/admin/(app)/factures/actions';
import { Pagination, parsePage } from '@/components/admin/pagination';
import { Money } from '@/components/admin/money';

export const dynamic = 'force-dynamic';

export default async function FacturesListPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  await guardAdminPage();
  const page = parsePage(searchParams.page);
  let loaded: Awaited<ReturnType<typeof load>> | null = null;
  let dbError = false;
  try {
    loaded = await load(page);
  } catch {
    dbError = true;
  }
  const factures = loaded?.factures ?? [];
  const total = loaded?.total ?? 0;

  const now = Date.now();
  // Enrichit + trie : retard d'abord, puis impayées, puis le reste (récentes en haut).
  const rows = factures
    .map((f) => {
      const total = Number(f.totalHT);
      const encaisse = Number(f.acompte ?? 0);
      const solde = Math.max(0, total - encaisse);
      const paid = f.status === 'PAYEE' || solde <= 0;
      const overdue =
        !paid && f.status === 'ENVOYEE' && f.dueDate != null && f.dueDate.getTime() < now;
      const joursRetard = overdue && f.dueDate ? Math.floor((now - f.dueDate.getTime()) / 86_400_000) : 0;
      const service = f.devis?.serviceType ?? null;
      return { f, total, solde, paid, overdue, joursRetard, service };
    })
    .sort((a, b) => {
      const rank = (r: typeof a) => (r.overdue ? 0 : !r.paid ? 1 : 2);
      const d = rank(a) - rank(b);
      if (d !== 0) return d;
      return b.f.createdAt.getTime() - a.f.createdAt.getTime();
    });

  const nbRetard = rows.filter((r) => r.overdue).length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Factures"
        subtitle={
          dbError
            ? undefined
            : `${factures.length} facture(s)${nbRetard > 0 ? ` · ${nbRetard} en retard` : ''}`
        }
        actions={
          <>
            <a
              href="/admin/exports?type=factures"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              CSV
            </a>
            <Link
              href="/admin/factures/nouveau"
              className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-orange-700"
            >
              <Plus className="h-4 w-4" />
              Nouvelle facture
            </Link>
          </>
        }
      />

      {dbError || rows.length === 0 ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <EmptyState
            icon={ReceiptText}
            title="Aucune facture"
            description="Les factures se créent en convertissant un devis accepté."
          />
        </div>
      ) : (
        <>
          {/* Mobile : cartes */}
          <MobileCardList>
            {rows.map(({ f, solde, paid, overdue, service }) => (
              <MobileCardRow
                key={f.id}
                href={`/admin/factures/${f.id}`}
                title={f.number}
                badge={<FactureStatusBadge status={f.status} />}
                amount={<Money value={Number(f.totalHT)} />}
                lines={[
                  [service ? SERVICE_LABEL[service] : null, f.contact.name].filter(Boolean).join(' · '),
                  overdue ? (
                    <span key="r" className="font-semibold text-red-600">
                      En retard · reste <Money value={solde} />
                    </span>
                  ) : paid ? (
                    'Payée'
                  ) : (
                    <span key="r">Reste dû <Money value={solde} /></span>
                  ),
                ]}
                action={
                  <div className="flex items-center gap-1">
                    {f.status === 'ENVOYEE' && !paid && (
                      <form action={recordFacturePayment}>
                        <input type="hidden" name="factureId" value={f.id} />
                        <input type="hidden" name="montant" value={solde} />
                        <ConfirmSubmit
                          message={`Marquer la facture ${f.number} comme payée (solde ${solde.toLocaleString('fr-FR')} €) ?`}
                          className="inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-emerald-600 active:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                        >
                          <BadgeEuro className="h-4 w-4" />
                        </ConfirmSubmit>
                      </form>
                    )}
                    {f.status === 'ENVOYEE' && !paid && (
                      <RelanceControl
                        kind="facture"
                        id={f.id}
                        contactId={f.contactId}
                        relanceCount={f.relanceCount}
                        redirectTo="/admin/factures"
                        compact
                      />
                    )}
                    <form action={deleteFacture}>
                      <input type="hidden" name="factureId" value={f.id} />
                      <ConfirmSubmit
                        message={`Supprimer définitivement la facture ${f.number} ? Action irréversible.`}
                        className="inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-red-500 active:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </ConfirmSubmit>
                    </form>
                  </div>
                }
              />
            ))}
          </MobileCardList>

          {/* Desktop : tableau */}
          <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-2.5">Numéro</th>
                  <th className="px-5 py-2.5">Client</th>
                  <th className="px-5 py-2.5">Service</th>
                  <th className="px-5 py-2.5">Statut</th>
                  <th className="px-5 py-2.5 text-right">Montant HT</th>
                  <th className="px-5 py-2.5 text-right">Solde</th>
                  <th className="px-5 py-2.5 text-right">Échéance</th>
                  <th className="px-5 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map(({ f, solde, paid, overdue, joursRetard, service }) => (
                  <tr key={f.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/factures/${f.id}`}
                        className="font-medium tabular-nums text-slate-900 hover:text-orange-600"
                      >
                        {f.number}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      <Link
                        href={`/admin/clients/${f.contactId}`}
                        className="hover:text-orange-600 hover:underline"
                      >
                        {f.contact.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {service ? SERVICE_LABEL[service] : '—'}
                    </td>
                    <td className="px-5 py-3">
                      <FactureStatusBadge status={f.status} />
                    </td>
                    <td className="px-5 py-3 text-right font-medium tabular-nums">
                      {<Money value={Number(f.totalHT)} />}
                    </td>
                    <td className="px-5 py-3 text-right tabular-nums">
                      {paid ? (
                        <span className="text-emerald-600">Payée</span>
                      ) : (
                        <Money value={solde} className="font-medium text-orange-600" />
                      )}
                    </td>
                    <td className="px-5 py-3 text-right text-xs tabular-nums">
                      {overdue ? (
                        <span className="inline-flex items-center rounded-md bg-red-50 px-1.5 py-0.5 font-semibold text-red-600">
                          Retard {joursRetard} j
                        </span>
                      ) : (
                        <span className="text-slate-400">
                          {f.dueDate ? f.dueDate.toLocaleDateString('fr-FR') : '—'}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        {!paid && f.status !== 'ANNULEE' && (
                          <form action={recordFacturePayment}>
                            <input type="hidden" name="factureId" value={f.id} />
                            <input type="hidden" name="montant" value={solde} />
                            <ConfirmSubmit
                              message={`Marquer la facture ${f.number} comme payée (solde ${solde.toLocaleString('fr-FR')} €) ?`}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-emerald-600 hover:bg-emerald-50"
                            >
                              <BadgeEuro className="h-4 w-4" />
                            </ConfirmSubmit>
                          </form>
                        )}
                        {f.status === 'ENVOYEE' && !paid && (
                          <RelanceControl
                            kind="facture"
                            id={f.id}
                            contactId={f.contactId}
                            relanceCount={f.relanceCount}
                            redirectTo="/admin/factures"
                          />
                        )}
                        <form action={deleteFacture}>
                          <input type="hidden" name="factureId" value={f.id} />
                          <ConfirmSubmit
                            message={`Supprimer définitivement la facture ${f.number} ? Action irréversible.`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </ConfirmSubmit>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} pageSize={FACTURES_PAGE_SIZE} total={total} basePath="/admin/factures" />
        </>
      )}
    </div>
  );
}

const FACTURES_PAGE_SIZE = 50;

async function load(page: number) {
  const [factures, total] = await Promise.all([
    prisma.facture.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * FACTURES_PAGE_SIZE,
      take: FACTURES_PAGE_SIZE,
      // Projection : seulement les champs affichés (pas la ligne contact entière).
      select: {
        id: true,
        number: true,
        status: true,
        totalHT: true,
        acompte: true,
        dueDate: true,
        relanceCount: true,
        createdAt: true,
        contactId: true,
        contact: { select: { name: true } },
        devis: { select: { serviceType: true } },
      },
    }),
    prisma.facture.count(),
  ]);
  return { factures, total };
}
