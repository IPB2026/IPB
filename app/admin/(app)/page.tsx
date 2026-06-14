import Link from 'next/link';
import { Users, Flame, Clock, Inbox, Plus, Wrench, CalendarClock } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { StatCard } from '@/components/admin/stat-card';
import { EmptyState } from '@/components/admin/empty-state';
import { Avatar } from '@/components/admin/avatar';
import { completeRelance } from '@/app/admin/(app)/leads/actions';
import {
  TierBadge,
  StageBadge,
  SOURCE_LABEL,
  SERVICE_LABEL,
} from '@/components/admin/badges';

export const dynamic = 'force-dynamic';

async function getStats() {
  const now = new Date();
  const [total, byTier, hotOpen, recent, relancesDues, relances, aPlanifier] =
    await Promise.all([
      prisma.lead.count(),
      prisma.lead.groupBy({ by: ['tier'], _count: { _all: true } }),
      prisma.lead.count({
        where: { tier: 'HOT', stage: { notIn: ['GAGNE', 'PERDU'] } },
      }),
      prisma.lead.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        include: { contact: true },
      }),
      prisma.activity.count({
        where: { type: 'RELANCE', done: false, dueAt: { lte: now } },
      }),
      prisma.activity.findMany({
        where: { type: 'RELANCE', done: false },
        orderBy: { dueAt: 'asc' },
        take: 8,
        include: { lead: { include: { contact: true } } },
      }),
      // Devis acceptés sans RDV de lancement des travaux planifié
      prisma.devis.findMany({
        where: { status: 'ACCEPTE', coordinationAppts: { none: {} } },
        orderBy: { acceptedAt: 'desc' },
        take: 8,
        include: { contact: true },
      }),
    ]);

  const tierCount = (t: string) =>
    byTier.find((b) => b.tier === t)?._count._all ?? 0;

  return {
    total,
    hot: tierCount('HOT'),
    warm: tierCount('WARM'),
    cold: tierCount('COLD'),
    hotOpen,
    relancesDues,
    recent,
    relances,
    aPlanifier,
  };
}

const newProspectBtn = (
  <Link
    href="/admin/leads/nouveau"
    className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-orange-700"
  >
    <Plus className="h-4 w-4" />
    Nouveau prospect
  </Link>
);

export default async function DashboardPage() {
  await guardAdminPage();
  let stats: Awaited<ReturnType<typeof getStats>> | null = null;
  try {
    stats = await getStats();
  } catch {
    stats = null;
  }

  if (!stats) {
    return (
      <div className="space-y-6">
        <PageHeader title="Tableau de bord" />
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <p className="font-semibold text-amber-900">
            Base de données non connectée
          </p>
          <p className="mt-1 text-sm text-amber-800">
            Configurez <code className="rounded bg-amber-100 px-1">DATABASE_URL</code>{' '}
            dans <code className="rounded bg-amber-100 px-1">.env.local</code> puis
            lancez la migration (voir <code>SETUP_CRM.md</code>). Le back-office
            s&apos;activera automatiquement.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tableau de bord"
        subtitle="Vue d'ensemble de votre activité commerciale."
        actions={newProspectBtn}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total prospects" value={stats.total} icon={Users} />
        <StatCard
          label="Chauds à traiter"
          value={stats.hotOpen}
          icon={Flame}
          tone="orange"
          hint="Non clôturés"
        />
        <StatCard
          label="Relances dues"
          value={stats.relancesDues}
          icon={Clock}
          tone="amber"
        />
        <StatCard
          label="Tièdes / Froids"
          value={`${stats.warm} / ${stats.cold}`}
          icon={Inbox}
          tone="blue"
        />
      </div>

      {stats.aPlanifier.length > 0 && (
        <section className="overflow-hidden rounded-xl border border-orange-200 bg-white">
          <div className="flex items-center gap-2 border-b border-orange-200 bg-orange-50/60 px-5 py-3.5">
            <Wrench className="h-4 w-4 text-orange-600" />
            <h2 className="text-sm font-semibold text-slate-900">
              À planifier : lancement des travaux
            </h2>
          </div>
          <ul className="divide-y divide-slate-100">
            {stats.aPlanifier.map((d) => (
              <li key={d.id} className="flex items-center gap-3 px-5 py-3">
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/admin/devis/${d.id}`}
                    className="font-medium text-slate-900 hover:text-orange-600"
                  >
                    {d.contact.name}
                  </Link>
                  <span className="ml-2 text-sm text-slate-500">
                    {d.object} · {d.number}
                  </span>
                </div>
                <Link
                  href={
                    `/admin/agenda?type=LANCEMENT_TRAVAUX&contactId=${d.contactId}` +
                    `&devisId=${d.id}${d.leadId ? `&leadId=${d.leadId}` : ''}`
                  }
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700 hover:bg-orange-100"
                >
                  <CalendarClock className="h-3.5 w-3.5" />
                  Planifier
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {stats.relances.length > 0 && (
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-3.5">
            <h2 className="text-sm font-semibold text-slate-900">
              Relances à faire
            </h2>
          </div>
          <ul className="divide-y divide-slate-100">
            {stats.relances.map((r) => {
              const overdue = !!r.dueAt && r.dueAt < new Date();
              return (
                <li key={r.id} className="flex items-center gap-3 px-5 py-3">
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      overdue ? 'bg-red-500' : 'bg-amber-400'
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    {r.lead ? (
                      <Link
                        href={`/admin/leads/${r.leadId}`}
                        className="font-medium text-slate-900 hover:text-orange-600"
                      >
                        {r.lead.contact.name}
                      </Link>
                    ) : (
                      <span className="font-medium text-slate-900">—</span>
                    )}
                    <span className="ml-2 text-sm text-slate-500">
                      {r.content}
                    </span>
                  </div>
                  <span
                    className={`shrink-0 text-xs tabular-nums ${
                      overdue ? 'text-red-600' : 'text-slate-400'
                    }`}
                  >
                    {r.dueAt?.toLocaleDateString('fr-FR')}
                  </span>
                  <form action={completeRelance} className="shrink-0">
                    <input type="hidden" name="activityId" value={r.id} />
                    <input type="hidden" name="leadId" value={r.leadId ?? ''} />
                    <button
                      type="submit"
                      className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
                    >
                      Fait
                    </button>
                  </form>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
          <h2 className="text-sm font-semibold text-slate-900">
            Derniers prospects
          </h2>
          <Link
            href="/admin/leads"
            className="text-sm font-medium text-orange-600 transition-colors hover:text-orange-700"
          >
            Tout voir
          </Link>
        </div>

        {stats.recent.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="Aucun prospect pour l'instant"
            description="Les demandes du site et vos saisies manuelles apparaîtront ici."
            actionLabel="Ajouter un prospect"
            actionHref="/admin/leads/nouveau"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-2.5">Contact</th>
                  <th className="px-5 py-2.5">Service</th>
                  <th className="px-5 py-2.5">Source</th>
                  <th className="px-5 py-2.5">Tier</th>
                  <th className="px-5 py-2.5">Étape</th>
                  <th className="px-5 py-2.5 text-right">Reçu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.recent.map((lead) => (
                  <tr
                    key={lead.id}
                    className="group transition-colors duration-150 hover:bg-slate-50"
                  >
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="flex items-center gap-3"
                      >
                        <Avatar name={lead.contact.name} size="sm" />
                        <span>
                          <span className="block font-medium text-slate-900 group-hover:text-orange-600">
                            {lead.contact.name}
                          </span>
                          <span className="block text-xs text-slate-400">
                            {lead.contact.phone || lead.contact.email || '—'}
                          </span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {SERVICE_LABEL[lead.service]}
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {SOURCE_LABEL[lead.source]}
                    </td>
                    <td className="px-5 py-3">
                      <TierBadge tier={lead.tier} />
                    </td>
                    <td className="px-5 py-3">
                      <StageBadge stage={lead.stage} />
                    </td>
                    <td className="px-5 py-3 text-right text-xs tabular-nums text-slate-400">
                      {lead.createdAt.toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
