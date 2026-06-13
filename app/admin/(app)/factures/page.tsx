import Link from 'next/link';
import { ReceiptText } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState } from '@/components/admin/empty-state';
import { FactureStatusBadge } from '@/components/admin/badges';
import { euros } from '@/lib/crm/company';

export const dynamic = 'force-dynamic';

export default async function FacturesListPage() {
  let factures: Awaited<ReturnType<typeof load>> = [];
  let dbError = false;
  try {
    factures = await load();
  } catch {
    dbError = true;
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Factures"
        subtitle={dbError ? undefined : `${factures.length} facture(s)`}
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {dbError || factures.length === 0 ? (
          <EmptyState
            icon={ReceiptText}
            title="Aucune facture"
            description="Les factures se créent en convertissant un devis accepté."
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
                  <th className="px-5 py-2.5 text-right">Échéance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {factures.map((f) => (
                  <tr key={f.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/factures/${f.id}`}
                        className="font-medium tabular-nums text-slate-900 hover:text-orange-600"
                      >
                        {f.number}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{f.contact.name}</td>
                    <td className="px-5 py-3 text-slate-600">{f.object}</td>
                    <td className="px-5 py-3">
                      <FactureStatusBadge status={f.status} />
                    </td>
                    <td className="px-5 py-3 text-right font-medium tabular-nums">
                      {euros(Number(f.totalHT))}
                    </td>
                    <td className="px-5 py-3 text-right text-xs tabular-nums text-slate-400">
                      {f.dueDate ? f.dueDate.toLocaleDateString('fr-FR') : '—'}
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
  return prisma.facture.findMany({
    orderBy: { createdAt: 'desc' },
    include: { contact: true },
    take: 200,
  });
}
