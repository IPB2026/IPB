import Link from 'next/link';
import { Plus, FileText, Download, Trash2 } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState } from '@/components/admin/empty-state';
import { MobileCardList, MobileCardRow } from '@/components/admin/mobile-card';
import { DevisStatusBadge, SERVICE_LABEL } from '@/components/admin/badges';
import { ConfirmSubmit } from '@/components/admin/confirm-submit';
import { deleteDevis } from '@/app/admin/(app)/devis/actions';
import { euros } from '@/lib/crm/company';

export const dynamic = 'force-dynamic';

export default async function DevisListPage() {
  await guardAdminPage();
  let devis: Awaited<ReturnType<typeof load>> = [];
  let dbError = false;
  try {
    devis = await load();
  } catch {
    dbError = true;
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Devis"
        subtitle={dbError ? undefined : `${devis.length} devis`}
        actions={
          <>
            <a
              href="/admin/exports?type=devis"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              CSV
            </a>
            <Link
              href="/admin/devis/nouveau"
              className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-orange-700"
            >
              <Plus className="h-4 w-4" />
              Nouveau devis
            </Link>
          </>
        }
      />

      {dbError || devis.length === 0 ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <EmptyState
            icon={FileText}
            title="Aucun devis"
            description="Créez un devis depuis un prospect."
            actionLabel="Nouveau devis"
            actionHref="/admin/devis/nouveau"
          />
        </div>
      ) : (
        <>
          {/* Mobile : cartes */}
          <MobileCardList>
            {devis.map((d) => (
              <MobileCardRow
                key={d.id}
                href={`/admin/devis/${d.id}`}
                title={d.number}
                badge={<DevisStatusBadge status={d.status} />}
                amount={euros(Number(d.totalHT))}
                lines={[
                  d.contact.name,
                  d.serviceType === 'AUTRE'
                    ? 'Devis travaux'
                    : d.serviceType
                      ? `Diagnostic ${SERVICE_LABEL[d.serviceType]}`
                      : d.object,
                ]}
                action={
                  <form action={deleteDevis}>
                    <input type="hidden" name="devisId" value={d.id} />
                    <ConfirmSubmit
                      message={`Supprimer définitivement le devis ${d.number} ? Action irréversible.`}
                      className="inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-red-500 active:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </ConfirmSubmit>
                  </form>
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
                  <th className="px-5 py-2.5">Type</th>
                  <th className="px-5 py-2.5">Statut</th>
                  <th className="px-5 py-2.5 text-right">Montant HT</th>
                  <th className="px-5 py-2.5 text-right">Créé</th>
                  <th className="px-5 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {devis.map((d) => (
                  <tr key={d.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/devis/${d.id}`}
                        className="font-medium tabular-nums text-slate-900 hover:text-orange-600"
                      >
                        {d.number}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      <Link
                        href={`/admin/clients/${d.contactId}`}
                        className="hover:text-orange-600 hover:underline"
                      >
                        {d.contact.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3">
                      {d.serviceType === 'AUTRE' ? (
                        <span className="inline-flex rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                          Travaux
                        </span>
                      ) : (
                        <span className="text-slate-600">
                          {d.serviceType ? SERVICE_LABEL[d.serviceType] : '—'}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <DevisStatusBadge status={d.status} />
                    </td>
                    <td className="px-5 py-3 text-right font-medium tabular-nums">
                      {euros(Number(d.totalHT))}
                    </td>
                    <td className="px-5 py-3 text-right text-xs tabular-nums text-slate-400">
                      {d.createdAt.toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <form action={deleteDevis}>
                        <input type="hidden" name="devisId" value={d.id} />
                        <ConfirmSubmit
                          message={`Supprimer définitivement le devis ${d.number} ? Action irréversible.`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </ConfirmSubmit>
                      </form>
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
  return prisma.devis.findMany({
    orderBy: { createdAt: 'desc' },
    include: { contact: true },
    take: 200,
  });
}
