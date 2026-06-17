import Link from 'next/link';
import { ReceiptText, Download, Plus, Trash2, Send } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState } from '@/components/admin/empty-state';
import { MobileCardList, MobileCardRow } from '@/components/admin/mobile-card';
import { FactureStatusBadge, SERVICE_LABEL } from '@/components/admin/badges';
import { ConfirmSubmit } from '@/components/admin/confirm-submit';
import { SubmitButton } from '@/components/admin/submit-button';
import { deleteFacture } from '@/app/admin/(app)/factures/actions';
import { relanceFacture } from '@/app/admin/(app)/send-actions';
import { euros } from '@/lib/crm/company';

export const dynamic = 'force-dynamic';

export default async function FacturesListPage() {
  await guardAdminPage();
  let factures: Awaited<ReturnType<typeof load>> = [];
  let dbError = false;
  try {
    factures = await load();
  } catch {
    dbError = true;
  }

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
                amount={euros(Number(f.totalHT))}
                lines={[
                  [service ? SERVICE_LABEL[service] : null, f.contact.name].filter(Boolean).join(' · '),
                  overdue ? (
                    <span key="r" className="font-semibold text-red-600">
                      En retard · reste {euros(solde)}
                    </span>
                  ) : paid ? (
                    'Payée'
                  ) : (
                    `Reste dû ${euros(solde)}`
                  ),
                ]}
                action={
                  <div className="flex items-center gap-1">
                    {f.status === 'ENVOYEE' && !paid && (
                      <form action={relanceFacture}>
                        <input type="hidden" name="factureId" value={f.id} />
                        <input type="hidden" name="contactId" value={f.contactId} />
                        <input type="hidden" name="redirectTo" value="/admin/factures" />
                        <SubmitButton
                          pendingLabel="…"
                          title="Relancer le client (paiement en attente)"
                          className="inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-orange-600 active:bg-orange-50"
                        >
                          <Send className="h-4 w-4" />
                        </SubmitButton>
                      </form>
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
                      {euros(Number(f.totalHT))}
                    </td>
                    <td className="px-5 py-3 text-right tabular-nums">
                      {paid ? (
                        <span className="text-emerald-600">Payée</span>
                      ) : (
                        <span className="font-medium text-orange-600">{euros(solde)}</span>
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
                        {f.status === 'ENVOYEE' && !paid && (
                          <form action={relanceFacture}>
                            <input type="hidden" name="factureId" value={f.id} />
                            <input type="hidden" name="contactId" value={f.contactId} />
                            <input type="hidden" name="redirectTo" value="/admin/factures" />
                            <SubmitButton
                              pendingLabel="…"
                              title="Envoyer une relance bienveillante au client"
                              className="inline-flex h-8 items-center gap-1 rounded-lg border border-orange-200 bg-orange-50 px-2 text-xs font-semibold text-orange-700 hover:bg-orange-100"
                            >
                              <Send className="h-3.5 w-3.5" /> Relancer
                            </SubmitButton>
                          </form>
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
        </>
      )}
    </div>
  );
}

function load() {
  return prisma.facture.findMany({
    orderBy: { createdAt: 'desc' },
    include: { contact: true, devis: { select: { serviceType: true } } },
    take: 200,
  });
}
