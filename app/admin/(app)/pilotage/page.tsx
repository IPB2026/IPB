import {
  TrendingUp,
  Wallet,
  Target,
  Clock,
  Users,
} from 'lucide-react';
import { guardAdminPage } from '@/lib/auth-helpers';
import { euros } from '@/lib/crm/company';
import { computeKpis, type KpiData } from '@/lib/crm/kpis';
import { SERVICE_LABEL } from '@/components/admin/badges';
import { PageHeader } from '@/components/admin/page-header';

export const dynamic = 'force-dynamic';

export default async function PilotagePage() {
  await guardAdminPage();

  let kpi: KpiData | null = null;
  let dbError = false;
  try {
    kpi = await computeKpis();
  } catch {
    dbError = true;
  }

  if (dbError || !kpi) {
    return (
      <div className="space-y-5">
        <PageHeader title="Pilotage" subtitle="Indicateurs de l'activité" />
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Données indisponibles (connexion à la base).
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pilotage"
        subtitle="Chiffre d'affaires, conversion, délais et activité — en temps réel."
      />

      {/* Indicateurs clés */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat
          icon={TrendingUp}
          label="CA signé (devis acceptés)"
          value={euros(kpi.ca.signe)}
          tone="text-emerald-600"
        />
        <Stat
          icon={Wallet}
          label="CA encaissé (factures payées)"
          value={euros(kpi.ca.encaisse)}
          sub={`${euros(kpi.ca.facture)} facturé`}
        />
        <Stat
          icon={Target}
          label="Conversion prospect → client"
          value={`${kpi.conversion.rate} %`}
          sub={`${kpi.conversion.clients} / ${kpi.conversion.prospects} prospects`}
        />
        <Stat
          icon={Clock}
          label="Délai moyen demande → rapport"
          value={kpi.delaiMoyenJours != null ? `${kpi.delaiMoyenJours} j` : '—'}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Tendance mensuelle */}
        <Panel title="Prospects reçus — 12 derniers mois">
          <MonthlyBars data={kpi.leadsParMois} />
        </Panel>

        {/* Entonnoir */}
        <Panel title="Pipeline — répartition par étape">
          <HBars
            data={kpi.funnel.map((f) => ({ label: f.label, count: f.count }))}
            tone="bg-blue-500"
          />
        </Panel>

        {/* Répartition par service */}
        <Panel title="Répartition par service">
          {kpi.parService.length === 0 ? (
            <Empty />
          ) : (
            <HBars
              data={kpi.parService.map((s) => ({
                label: SERVICE_LABEL[s.service],
                count: s.count,
              }))}
              tone="bg-orange-500"
            />
          )}
        </Panel>

        {/* Activité diagnostiqueurs */}
        <Panel title="Activité des diagnostiqueurs">
          {kpi.diagnostiqueurs.length === 0 ? (
            <Empty label="Aucun diagnostiqueur." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                    <th className="pb-2">Diagnostiqueur</th>
                    <th className="pb-2 text-center">Assignés</th>
                    <th className="pb-2 text-center">En cours</th>
                    <th className="pb-2 text-center">Réalisés</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {kpi.diagnostiqueurs.map((d) => (
                    <tr key={d.name}>
                      <td className="py-2 font-medium text-slate-800">
                        <span className="inline-flex items-center gap-2">
                          <Users className="h-4 w-4 text-slate-400" />
                          {d.name}
                        </span>
                      </td>
                      <td className="py-2 text-center tabular-nums text-slate-600">
                        {d.assignes}
                      </td>
                      <td className="py-2 text-center tabular-nums text-amber-600">
                        {d.enCours}
                      </td>
                      <td className="py-2 text-center tabular-nums font-semibold text-emerald-600">
                        {d.realises}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </div>

      <p className="text-xs text-slate-400">
        Totaux : {kpi.totals.prospects} prospects · {kpi.totals.clients} clients ·{' '}
        {kpi.totals.devis} devis · {kpi.totals.factures} factures ·{' '}
        {kpi.totals.rapports} rapports. Montants en € HT (TVA non applicable, art. 293 B).
      </p>
    </div>
  );
}

/* ── Présentation ── */

function Stat({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
  sub?: string;
  tone?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon className="h-4 w-4" />
        <span className="text-[11px] font-medium uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className={`mt-2 text-2xl font-semibold tabular-nums ${tone ?? 'text-slate-900'}`}>
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Empty({ label = 'Aucune donnée.' }: { label?: string }) {
  return <p className="text-sm text-slate-400">{label}</p>;
}

function MonthlyBars({ data }: { data: { label: string; count: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div>
      <div className="flex h-36 items-end gap-1.5">
        {data.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1">
            <span className="text-[10px] tabular-nums text-slate-400">
              {d.count > 0 ? d.count : ''}
            </span>
            <div
              className="w-full rounded-t bg-gradient-to-t from-orange-500 to-orange-400"
              style={{ height: `${(d.count / max) * 100}%`, minHeight: d.count > 0 ? 4 : 0 }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-1.5">
        {data.map((d, i) => (
          <span
            key={i}
            className="flex-1 text-center text-[10px] text-slate-400"
          >
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function HBars({
  data,
  tone,
}: {
  data: { label: string; count: number }[];
  tone: string;
}) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <ul className="space-y-2.5">
      {data.map((d, i) => (
        <li key={i} className="flex items-center gap-3">
          <span className="w-28 shrink-0 truncate text-xs text-slate-500">
            {d.label}
          </span>
          <div className="h-5 flex-1 overflow-hidden rounded bg-slate-100">
            <div
              className={`h-full rounded ${tone}`}
              style={{ width: `${(d.count / max) * 100}%`, minWidth: d.count > 0 ? 6 : 0 }}
            />
          </div>
          <span className="w-8 shrink-0 text-right text-xs font-medium tabular-nums text-slate-600">
            {d.count}
          </span>
        </li>
      ))}
    </ul>
  );
}
