import Link from 'next/link';
import { UserCheck, ArrowRight, Download } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { euros } from '@/lib/crm/company';
import { computeDossier } from '@/lib/crm/dossier';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState } from '@/components/admin/empty-state';
import { Avatar } from '@/components/admin/avatar';
import { MobileCardList, MobileCardRow } from '@/components/admin/mobile-card';

export const dynamic = 'force-dynamic';

export default async function ClientsPage() {
  await guardAdminPage();

  let clients: Awaited<ReturnType<typeof load>> = [];
  let dbError = false;
  try {
    clients = await load();
  } catch {
    dbError = true;
  }

  const rows = clients.map((c) => {
    const dossier = computeDossier({
      devis: c.devis.map((d) => ({
        status: d.status,
        totalHT: Number(d.totalHT),
        acceptedAt: d.acceptedAt,
        serviceType: d.serviceType,
      })),
      factures: c.factures.map((f) => ({ status: f.status })),
      rapports: c.rapports.map((r) => ({ status: r.status })),
      appointments: c.appointments.map((a) => ({ type: a.type, status: a.status })),
    });
    const current = dossier.steps.find((s) => s.current);
    return { c, dossier, currentLabel: current?.label ?? 'Dossier complet' };
  });

  return (
    <div className="space-y-5">
      <PageHeader
        title="Clients"
        subtitle={dbError ? undefined : `${rows.length} client(s) signé(s)`}
        actions={
          <a
            href="/admin/exports?type=clients"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            CSV
          </a>
        }
      />

      {dbError || rows.length === 0 ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <EmptyState
            icon={UserCheck}
            title="Aucun client pour l'instant"
            description="Un prospect devient client dès qu'un devis est accepté. Il apparaîtra alors ici avec son dossier."
          />
        </div>
      ) : (
        <>
          {/* Mobile : cartes */}
          <MobileCardList>
            {rows.map(({ c, dossier, currentLabel }) => (
              <MobileCardRow
                key={c.id}
                href={`/admin/clients/${c.id}`}
                leading={<Avatar name={c.name} size="sm" />}
                title={c.name}
                badge={
                  <span className="shrink-0 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/10">
                    {currentLabel}
                  </span>
                }
                amount={dossier.montant != null ? euros(dossier.montant) : undefined}
                lines={[c.city || c.phone || c.email || '—']}
              />
            ))}
          </MobileCardList>

          {/* Desktop : tableau */}
          <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-2.5">Client</th>
                  <th className="px-5 py-2.5">Étape du dossier</th>
                  <th className="px-5 py-2.5 text-right">Montant</th>
                  <th className="px-5 py-2.5 text-right">Client depuis</th>
                  <th className="px-5 py-2.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map(({ c, dossier, currentLabel }) => (
                  <tr key={c.id} className="group transition-colors hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <Link href={`/admin/clients/${c.id}`} className="flex items-center gap-3">
                        <Avatar name={c.name} size="sm" />
                        <span>
                          <span className="block font-medium text-slate-900 group-hover:text-orange-600">
                            {c.name}
                          </span>
                          <span className="block text-xs text-slate-400">
                            {c.city || c.phone || c.email || '—'}
                          </span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/10">
                        {currentLabel}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-medium tabular-nums">
                      {dossier.montant != null ? euros(dossier.montant) : '—'}
                    </td>
                    <td className="px-5 py-3 text-right text-xs tabular-nums text-slate-400">
                      {dossier.clientSince
                        ? dossier.clientSince.toLocaleDateString('fr-FR')
                        : '—'}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/clients/${c.id}`}
                        className="inline-flex items-center text-slate-400 group-hover:text-orange-600"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
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
  return prisma.contact.findMany({
    where: {
      OR: [{ devis: { some: { status: 'ACCEPTE' } } }, { factures: { some: {} } }],
    },
    orderBy: { updatedAt: 'desc' },
    take: 300,
    select: {
      id: true,
      name: true,
      city: true,
      phone: true,
      email: true,
      devis: { select: { status: true, totalHT: true, acceptedAt: true, serviceType: true } },
      factures: { select: { status: true } },
      rapports: { select: { status: true } },
      appointments: { select: { type: true, status: true } },
    },
  });
}
