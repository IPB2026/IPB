import Link from 'next/link';
import { Plus, FileText } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState } from '@/components/admin/empty-state';
import { DevisStatusBadge } from '@/components/admin/badges';
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
          <Link
            href="/admin/devis/nouveau"
            className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-orange-700"
          >
            <Plus className="h-4 w-4" />
            Nouveau devis
          </Link>
        }
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {dbError || devis.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="Aucun devis"
            description="Créez un devis depuis un prospect."
            actionLabel="Nouveau devis"
            actionHref="/admin/devis/nouveau"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-2.5">Numéro</th>
                  <th className="px-5 py-2.5">Client</th>
                  <th className="px-5 py-2.5">Objet</th>
                  <th className="px-5 py-2.5">Statut</th>
                  <th className="px-5 py-2.5 text-right">Montant HT</th>
                  <th className="px-5 py-2.5 text-right">Créé</th>
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
                    <td className="px-5 py-3 text-slate-600">{d.contact.name}</td>
                    <td className="px-5 py-3 text-slate-600">{d.object}</td>
                    <td className="px-5 py-3">
                      <DevisStatusBadge status={d.status} />
                    </td>
                    <td className="px-5 py-3 text-right font-medium tabular-nums">
                      {euros(Number(d.totalHT))}
                    </td>
                    <td className="px-5 py-3 text-right text-xs tabular-nums text-slate-400">
                      {d.createdAt.toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
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
