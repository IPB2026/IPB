import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Plus, ClipboardCheck } from 'lucide-react';
import type { ReportStatus, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState } from '@/components/admin/empty-state';

export const dynamic = 'force-dynamic';

const STATUS_LABEL: Record<ReportStatus, string> = {
  BROUILLON: 'Brouillon',
  GENERE: 'Généré',
  VALIDE: 'Validé',
  ENVOYE: 'Envoyé',
};
const STATUS_PILL: Record<ReportStatus, string> = {
  BROUILLON: 'bg-slate-100 text-slate-600 ring-slate-500/10',
  GENERE: 'bg-blue-50 text-blue-700 ring-blue-600/10',
  VALIDE: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  ENVOYE: 'bg-violet-50 text-violet-700 ring-violet-600/10',
};

export default async function RapportsListPage() {
  const user = await getSessionUser();
  if (!user) redirect('/admin/login');
  const isExpert = user.role === 'EXPERT';

  let rapports: Awaited<ReturnType<typeof load>> = [];
  let dbError = false;
  try {
    rapports = await load(isExpert ? user.id : undefined);
  } catch {
    dbError = true;
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title={isExpert ? 'Mes interventions' : "Rapports d'expertise"}
        subtitle={dbError ? undefined : `${rapports.length} rapport(s)`}
        actions={
          <Link
            href="/admin/rapports/nouveau"
            className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-orange-700"
          >
            <Plus className="h-4 w-4" />
            Nouveau rapport
          </Link>
        }
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {dbError || rapports.length === 0 ? (
          <EmptyState
            icon={ClipboardCheck}
            title="Aucun rapport"
            description="Créez un rapport depuis vos constats terrain ; l'IA le rédige."
            actionLabel="Nouveau rapport"
            actionHref="/admin/rapports/nouveau"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-2.5">Référence</th>
                  <th className="px-5 py-2.5">Client</th>
                  <th className="px-5 py-2.5">Intitulé</th>
                  <th className="px-5 py-2.5">Statut</th>
                  <th className="px-5 py-2.5 text-right">Créé</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rapports.map((r) => (
                  <tr key={r.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/rapports/${r.id}`}
                        className="font-medium tabular-nums text-slate-900 hover:text-orange-600"
                      >
                        {r.number}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{r.contact.name}</td>
                    <td className="px-5 py-3 text-slate-600">{r.title}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_PILL[r.status]}`}
                      >
                        {STATUS_LABEL[r.status]}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-xs tabular-nums text-slate-400">
                      {r.createdAt.toLocaleDateString('fr-FR')}
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

function load(authorId?: string) {
  const where: Prisma.RapportWhereInput = authorId ? { authorId } : {};
  return prisma.rapport.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { contact: true },
    take: 200,
  });
}
