import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  StickyNote,
  PhoneCall,
  Bell,
  Sparkles,
} from 'lucide-react';
import type { ActivityType } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { Avatar } from '@/components/admin/avatar';
import {
  TierBadge,
  StageBadge,
  SOURCE_LABEL,
  SERVICE_LABEL,
  STAGE_LABEL,
} from '@/components/admin/badges';
import {
  changeStage,
  addActivity,
  scheduleRelance,
  completeRelance,
} from '@/app/admin/(app)/leads/actions';

export const dynamic = 'force-dynamic';

const OCCUPANT_LABEL: Record<string, string> = {
  PROPRIETAIRE: 'Propriétaire occupant',
  BAILLEUR: 'Propriétaire bailleur',
  LOCATAIRE: 'Locataire',
  ACHETEUR: "En projet d'achat",
  INVESTISSEUR: 'Investisseur / marchand de biens',
  INCONNU: 'Non précisé',
};

const ACTIVITY_ICON: Record<ActivityType, typeof Phone> = {
  NOTE: StickyNote,
  APPEL: PhoneCall,
  EMAIL: Mail,
  RDV: Clock,
  RELANCE: Bell,
  CHANGEMENT_ETAPE: Sparkles,
  SYSTEME: Sparkles,
};

export default async function LeadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  await guardAdminPage();
  const lead = await prisma.lead
    .findUnique({
      where: { id: params.id },
      include: {
        contact: true,
        activities: { orderBy: { createdAt: 'desc' } },
      },
    })
    .catch(() => null);

  if (!lead) notFound();

  const c = lead.contact;

  return (
    <div className="space-y-6">
      <Link
        href="/admin/leads"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Tous les prospects
      </Link>

      {/* En-tête fiche */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={c.name} />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              {c.name}
            </h1>
            <p className="text-sm text-slate-500">
              {SERVICE_LABEL[lead.service]} · {SOURCE_LABEL[lead.source]}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <TierBadge tier={lead.tier} />
          <StageBadge stage={lead.stage} />
          {c.phone && (
            <a
              href={`tel:${c.phone}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
            >
              <Phone className="h-4 w-4" />
              Appeler
            </a>
          )}
        </div>
      </div>

      {/* Suivi : étape, relance, activité */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Suivi
        </h2>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            {/* Changer d'étape */}
            <form action={changeStage} className="space-y-2">
              <input type="hidden" name="leadId" value={lead.id} />
              <label className="block text-sm font-medium text-slate-700">
                Étape du pipeline
              </label>
              <div className="flex flex-wrap gap-2">
                <select
                  name="stage"
                  defaultValue={lead.stage}
                  className="h-10 flex-1 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                >
                  {Object.entries(STAGE_LABEL).map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  Mettre à jour
                </button>
              </div>
              <input
                name="lostReason"
                placeholder="Motif (si perdu)"
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </form>

            {/* Planifier une relance */}
            <form action={scheduleRelance} className="space-y-2">
              <input type="hidden" name="leadId" value={lead.id} />
              <label className="block text-sm font-medium text-slate-700">
                Planifier une relance
              </label>
              <div className="flex flex-wrap gap-2">
                <input
                  type="date"
                  name="dueAt"
                  required
                  className="h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
                <input
                  name="content"
                  placeholder="Objet (ex. rappeler après devis)"
                  className="h-10 flex-1 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
                <button
                  type="submit"
                  className="h-10 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
                >
                  Planifier
                </button>
              </div>
            </form>
          </div>

          {/* Ajouter une activité */}
          <form action={addActivity} className="space-y-2">
            <input type="hidden" name="leadId" value={lead.id} />
            <label className="block text-sm font-medium text-slate-700">
              Consigner une activité
            </label>
            <select
              name="type"
              defaultValue="APPEL"
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            >
              <option value="APPEL">Appel</option>
              <option value="NOTE">Note</option>
              <option value="EMAIL">Email</option>
              <option value="RDV">RDV</option>
            </select>
            <textarea
              name="content"
              required
              rows={3}
              placeholder="Compte-rendu d'appel, note interne…"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
            <button
              type="submit"
              className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Ajouter
            </button>
          </form>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Colonne gauche : coordonnées + qualification */}
        <div className="space-y-5 lg:col-span-1">
          <Card title="Coordonnées">
            <dl className="space-y-3 text-sm">
              <IconRow icon={Phone} value={c.phone} href={c.phone ? `tel:${c.phone}` : undefined} />
              <IconRow icon={Mail} value={c.email} href={c.email ? `mailto:${c.email}` : undefined} />
              <IconRow
                icon={MapPin}
                value={
                  [c.address, [c.postalCode, c.city].filter(Boolean).join(' ')]
                    .filter(Boolean)
                    .join(', ') || null
                }
              />
            </dl>
            <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
              <Row label="Statut" value={OCCUPANT_LABEL[c.occupantStatus]} />
              <Row label="Type de bien" value={c.propertyType} />
              <Row
                label="Zone IPB"
                value={
                  c.inServiceArea === null
                    ? null
                    : c.inServiceArea
                      ? 'Oui'
                      : 'Hors zone'
                }
              />
            </div>
          </Card>

          <Card title="Qualification">
            <div className="space-y-2 text-sm">
              <Row
                label="Score"
                value={lead.score != null ? `${lead.score}/${lead.maxScore ?? 50}` : null}
              />
              <Row
                label="Risque diagnostic"
                value={lead.riskScore != null ? `${lead.riskScore}/100` : null}
              />
              <Row label="Priorité rappel" value={lead.callbackPriority} />
              <Row
                label="Valeur estimée"
                value={lead.value != null ? `${lead.value} €` : null}
              />
              <Row label="Reçu le" value={lead.createdAt.toLocaleString('fr-FR')} />
            </div>
            {lead.reasons.length > 0 && (
              <div className="mt-4 border-t border-slate-100 pt-4">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Pourquoi ce score
                </p>
                <ul className="mt-2 space-y-1.5">
                  {lead.reasons.map((r, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange-400" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </div>

        {/* Colonne droite : données formulaire + historique */}
        <div className="space-y-5 lg:col-span-2">
          <Card title="Données du formulaire">
            {lead.summary && (
              <p className="mb-3 text-sm font-medium text-slate-800">
                {lead.summary}
              </p>
            )}
            <pre className="overflow-x-auto rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
              {JSON.stringify(lead.payload, null, 2)}
            </pre>
          </Card>

          <Card title="Historique">
            {lead.activities.length === 0 ? (
              <p className="text-sm text-slate-500">Aucune activité.</p>
            ) : (
              <ol className="space-y-4">
                {lead.activities.map((a) => {
                  const Icon = ACTIVITY_ICON[a.type] ?? StickyNote;
                  return (
                    <li key={a.id} className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm text-slate-700">
                            {a.content || a.type}
                          </p>
                          {a.type === 'RELANCE' && !a.done && (
                            <form action={completeRelance} className="shrink-0">
                              <input type="hidden" name="activityId" value={a.id} />
                              <input type="hidden" name="leadId" value={lead.id} />
                              <button
                                type="submit"
                                className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
                              >
                                Marquer fait
                              </button>
                            </form>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs tabular-nums text-slate-400">
                          {a.createdAt.toLocaleString('fr-FR')}
                          {a.dueAt
                            ? ` · échéance ${a.dueAt.toLocaleDateString('fr-FR')}`
                            : ''}
                          {a.type === 'RELANCE' && a.done ? ' · ✓ effectuée' : ''}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </h2>
      {children}
    </section>
  );
}

function IconRow({
  icon: Icon,
  value,
  href,
}: {
  icon: typeof Phone;
  value?: string | null;
  href?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="h-4 w-4 shrink-0 text-slate-400" />
      {href ? (
        <a href={href} className="font-medium text-slate-700 hover:text-orange-600">
          {value}
        </a>
      ) : (
        <span className="text-slate-700">{value}</span>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-800">
        {value || <span className="text-slate-300">—</span>}
      </dd>
    </div>
  );
}
