import Link from 'next/link';
import {
  TrendingUp,
  Wallet,
  Target,
  Clock,
  Users,
  Coins,
  ShoppingBag,
  FileCheck2,
  Send,
  Receipt,
  Gauge,
  Radio,
  Star,
} from 'lucide-react';
import { guardAdminPage } from '@/lib/auth-helpers';
import type { ReactNode } from 'react';
import { Money } from '@/components/admin/money';
import { computeKpis, type KpiData } from '@/lib/crm/kpis';
import { SERVICE_LABEL } from '@/components/admin/badges';
import { PageHeader } from '@/components/admin/page-header';

// ISR : le pilotage (≈15 requêtes + calcul par dossier) est recalculé au plus une
// fois par minute, pas à chaque affichage ni à chaque mutation → page quasi instantanée.
export const revalidate = 60;

/** Libellés lisibles des canaux d'acquisition (cf. attribution first-touch). */
const CANAL_LABEL: Record<string, string> = {
  ADS: 'Publicité (Ads)',
  SEO: 'Référencement (SEO)',
  SOCIAL: 'Réseaux sociaux',
  REFERRAL: 'Site référent',
  DIRECT: 'Direct / inconnu',
};

export default async function PilotagePage() {
  await guardAdminPage();

  let kpi: KpiData | null = null;
  let dbError = false;
  try {
    kpi = await computeKpis();
  } catch (e) {
    console.error('[pilotage] connexion/chargement base échoué :', e);
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

      {/* Argent — la ligne qui compte. CA = revenu signé, même non encaissé. */}
      <div>
        <h2 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Chiffre d&apos;affaires (€ HT)
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
          <Stat
            icon={Send}
            label="Pipe (devis en cours)"
            value={<Money value={kpi.pipe.montant} />}
            tone="text-blue-600"
            sub={`${kpi.pipe.nb} devis envoyé(s) à signer`}
          />
          <Stat
            icon={Gauge}
            label="Prévision pondérée"
            value={<Money value={kpi.forecastPondere} />}
            tone="text-indigo-600"
            sub="CA attendu (pondéré par phase)"
          />
          <Stat
            icon={TrendingUp}
            label="Chiffre d'affaires (signé)"
            value={<Money value={kpi.ca.signe} />}
            tone="text-emerald-600"
            sub={`${kpi.devis.acceptes} devis accepté(s)`}
          />
          <Stat
            icon={Coins}
            label="Facturé"
            value={<Money value={kpi.ca.facture} />}
          />
          <Stat
            icon={Wallet}
            label="Encaissé"
            value={<Money value={kpi.ca.encaisse} />}
            tone="text-emerald-600"
          />
          <Stat
            icon={Clock}
            label="Reste à encaisser"
            value={<Money value={kpi.ca.resteAEncaisser} />}
            tone={kpi.ca.resteAEncaisser > 0 ? 'text-orange-600' : 'text-slate-900'}
          />
        </div>
      </div>

      {/* Activité & performance commerciale */}
      <div>
        <h2 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Activité & performance
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
          <Stat
            icon={FileCheck2}
            label="Acceptation des devis"
            value={`${kpi.devis.tauxAcceptation} %`}
            sub={`${kpi.devis.acceptes} / ${kpi.devis.emis} devis`}
          />
          <Stat
            icon={Receipt}
            label="Taux de facturation"
            value={`${kpi.ca.tauxFacturation} %`}
            sub="du CA signé déjà facturé"
            tone={kpi.ca.tauxFacturation < 80 && kpi.ca.signe > 0 ? 'text-orange-600' : undefined}
          />
          <Stat
            icon={ShoppingBag}
            label="Panier moyen"
            value={<Money value={kpi.devis.panierMoyen} />}
            sub="par devis accepté"
          />
          <Stat
            icon={Target}
            label="Conversion prospect → client"
            value={`${kpi.conversion.rate} %`}
            sub={`${kpi.conversion.clients} / ${kpi.conversion.prospects} prospects`}
          />
          <Stat
            icon={Clock}
            label="Délai moyen → rapport"
            value={kpi.delaiMoyenJours != null ? `${kpi.delaiMoyenJours} j` : '—'}
            sub={`${kpi.rapportsLivres} rapport(s) livré(s)`}
          />
          <Stat
            icon={Gauge}
            label="Vélocité devis → validation"
            value={kpi.delaiValidationJours != null ? `${kpi.delaiValidationJours} j` : '—'}
            sub="délai moyen d'acceptation"
            tone="text-indigo-600"
          />
          <Stat
            icon={Star}
            label="Avis Google"
            value={`${kpi.avis.taux} %`}
            sub={`${kpi.avis.recus} / ${kpi.avis.demandes} demandés`}
            tone="text-amber-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Tendance mensuelle */}
        <Panel title="Prospects reçus — 12 derniers mois">
          <MonthlyBars data={kpi.leadsParMois} />
        </Panel>

        {/* Entonnoir (cliquable → pipeline) */}
        <Panel title="Pipeline — répartition par phase" href="/admin/pipeline">
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

        {/* Performance par canal d'acquisition (exploite l'attribution) */}
        <Panel title="Performance par canal d'acquisition">
          {kpi.parCanal.length === 0 ? (
            <Empty />
          ) : (
            <div className="overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    <th className="py-2">
                      <span className="inline-flex items-center gap-1.5">
                        <Radio className="h-3.5 w-3.5" /> Canal
                      </span>
                    </th>
                    <th className="py-2 text-right">Leads</th>
                    <th className="py-2 text-right">Clients</th>
                    <th className="py-2 text-right">Conversion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {kpi.parCanal.map((c) => (
                    <tr key={c.canal}>
                      <td className="py-2 font-medium text-slate-700">{CANAL_LABEL[c.canal] ?? c.canal}</td>
                      <td className="py-2 text-right tabular-nums text-slate-600">{c.leads}</td>
                      <td className="py-2 text-right tabular-nums text-slate-600">{c.clients}</td>
                      <td className="py-2 text-right tabular-nums font-semibold text-emerald-600">
                        {c.taux} %
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
        Montants en € HT — TVA non applicable, art. 293 B du CGI.
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
  value: ReactNode;
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

function Panel({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {href ? (
          <Link href={href} className="hover:text-orange-600">
            {title} →
          </Link>
        ) : (
          title
        )}
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
