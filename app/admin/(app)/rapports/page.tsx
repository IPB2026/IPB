import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Plus, ClipboardCheck, MapPin, ArrowRight } from 'lucide-react';
import type { ReportStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState } from '@/components/admin/empty-state';
import { MobileCardList, MobileCardRow } from '@/components/admin/mobile-card';
import { SERVICE_LABEL } from '@/components/admin/badges';
import { startRapportFromLead } from '@/app/admin/(app)/rapports/actions';

export const dynamic = 'force-dynamic';

const STATUS_LABEL: Record<ReportStatus, string> = {
  BROUILLON: 'Brouillon',
  SOUMIS: 'Soumis — à traiter',
  GENERE: 'Généré — à valider',
  VALIDE: 'Validé',
  ENVOYE: 'Envoyé',
};
const STATUS_PILL: Record<ReportStatus, string> = {
  BROUILLON: 'bg-slate-100 text-slate-600 ring-slate-500/10',
  SOUMIS: 'bg-amber-50 text-amber-700 ring-amber-600/10',
  GENERE: 'bg-blue-50 text-blue-700 ring-blue-600/10',
  VALIDE: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  ENVOYE: 'bg-violet-50 text-violet-700 ring-violet-600/10',
};

function StatusPill({ status }: { status: ReportStatus }) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_PILL[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

export default async function RapportsListPage() {
  const user = await getSessionUser();
  if (!user) redirect('/admin/login');

  if (user.role === 'EXPERT') return <ExpertView expertId={user.id} />;
  return <AdminView />;
}

/* ─────────────────────────  Vue diagnostiqueur  ───────────────────────── */

async function ExpertView({ expertId }: { expertId: string }) {
  let leads: Awaited<ReturnType<typeof loadAssignedLeads>> = [];
  let rapportByLead = new Map<string, { id: string; status: ReportStatus }>();
  let dbError = false;
  try {
    leads = await loadAssignedLeads(expertId);
    const rapports = await prisma.rapport.findMany({
      where: { authorId: expertId },
      select: { id: true, status: true, leadId: true },
    });
    rapportByLead = new Map(
      rapports.filter((r) => r.leadId).map((r) => [r.leadId as string, r])
    );
  } catch {
    dbError = true;
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Mes interventions"
        subtitle={
          dbError ? undefined : `${leads.length} prospect(s) assigné(s)`
        }
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {dbError || leads.length === 0 ? (
          <EmptyState
            icon={ClipboardCheck}
            title="Aucune intervention assignée"
            description="Les prospects que l'on vous assigne apparaîtront ici, avec leurs coordonnées, pour réaliser le diagnostic."
          />
        ) : (
          <ul className="divide-y divide-slate-100">
            {leads.map((lead) => {
              const rapport = rapportByLead.get(lead.id);
              return (
                <li
                  key={lead.id}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 font-medium text-slate-900">
                      {lead.contact.name}
                      {!rapport && (
                        <span className="inline-flex rounded-md bg-orange-50 px-1.5 py-0.5 text-xs font-semibold text-orange-700 ring-1 ring-inset ring-orange-600/20">
                          Nouveau
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                      <span>{SERVICE_LABEL[lead.service]}</span>
                      {lead.contact.city && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {lead.contact.city}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {rapport ? (
                      <>
                        <StatusPill status={rapport.status} />
                        <Link
                          href={`/admin/rapports/${rapport.id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                          Ouvrir
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </>
                    ) : (
                      <form action={startRapportFromLead}>
                        <input type="hidden" name="leadId" value={lead.id} />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-orange-700"
                        >
                          <Plus className="h-4 w-4" />
                          Démarrer le diagnostic
                        </button>
                      </form>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function loadAssignedLeads(expertId: string) {
  return prisma.lead.findMany({
    where: { assignedToId: expertId },
    orderBy: { createdAt: 'desc' },
    take: 200,
    select: {
      id: true,
      service: true,
      contact: { select: { name: true, city: true } },
    },
  });
}

/* ──────────────────────────────  Vue admin  ────────────────────────────── */

async function AdminView() {
  let rapports: Awaited<ReturnType<typeof loadAll>> = [];
  let dbError = false;
  try {
    rapports = await loadAll();
  } catch {
    dbError = true;
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Rapports d'expertise"
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

      {dbError || rapports.length === 0 ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <EmptyState
            icon={ClipboardCheck}
            title="Aucun rapport"
            description="Les rapports créés par vos diagnostiqueurs (ou par vous) apparaîtront ici."
            actionLabel="Nouveau rapport"
            actionHref="/admin/rapports/nouveau"
          />
        </div>
      ) : (
        <>
          {/* Mobile : cartes */}
          <MobileCardList>
            {rapports.map((r) => (
              <MobileCardRow
                key={r.id}
                href={`/admin/rapports/${r.id}`}
                title={r.number}
                badge={<StatusPill status={r.status} />}
                lines={[
                  r.contact.name,
                  r.author?.name || r.author?.email || 'Diagnostiqueur —',
                ]}
              />
            ))}
          </MobileCardList>

          {/* Desktop : tableau */}
          <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-2.5">Référence</th>
                  <th className="px-5 py-2.5">Client</th>
                  <th className="px-5 py-2.5">Diagnostiqueur</th>
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
                    <td className="px-5 py-3 text-slate-500">
                      {r.author?.name || r.author?.email || '—'}
                    </td>
                    <td className="px-5 py-3">
                      <StatusPill status={r.status} />
                    </td>
                    <td className="px-5 py-3 text-right text-xs tabular-nums text-slate-400">
                      {r.createdAt.toLocaleDateString('fr-FR')}
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

function loadAll() {
  return prisma.rapport.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      contact: { select: { name: true } },
      author: { select: { name: true, email: true } },
    },
    take: 200,
  });
}
