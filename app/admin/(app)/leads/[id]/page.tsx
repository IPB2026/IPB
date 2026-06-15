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
  FilePlus2,
} from 'lucide-react';
import type { ActivityType } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { guardAdminPage, listExperts } from '@/lib/auth-helpers';
import { Avatar } from '@/components/admin/avatar';
import {
  StageBadge,
  SOURCE_LABEL,
  SERVICE_LABEL,
  STAGE_LABEL,
  PIPELINE_STAGES,
} from '@/components/admin/badges';
import {
  changeStage,
  addActivity,
  scheduleRelance,
  completeRelance,
  assignLead,
} from '@/app/admin/(app)/leads/actions';
import { QualificationForm } from '@/components/admin/qualification-form';
import { ContactEditForm } from '@/components/admin/contact-edit-form';
import { ConfirmSubmit } from '@/components/admin/confirm-submit';
import { mergeContacts } from '@/app/admin/(app)/contact-actions';
import type { QualificationRecord } from '@/lib/crm/qualification';

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
  const [lead, experts] = await Promise.all([
    prisma.lead
      .findUnique({
        where: { id: params.id },
        include: {
          contact: true,
          assignedTo: { select: { id: true, name: true, email: true } },
          activities: { orderBy: { createdAt: 'desc' } },
        },
      })
      .catch(() => null),
    listExperts(),
  ]);

  if (!lead) notFound();

  const c = lead.contact;
  const qual = extractQualification(lead.payload);

  // Doublons potentiels : même téléphone ou même e-mail sur une autre fiche.
  const duplicates =
    c.phone || c.email
      ? await prisma.contact
          .findMany({
            where: {
              id: { not: c.id },
              OR: [
                ...(c.phone ? [{ phone: c.phone }] : []),
                ...(c.email ? [{ email: c.email }] : []),
              ],
            },
            select: { id: true, name: true, phone: true, email: true },
            take: 3,
          })
          .catch(() => [])
      : [];

  return (
    <div className="space-y-6">
      <Link
        href="/admin/leads"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Tous les prospects
      </Link>

      {duplicates.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-900">Doublon possible</p>
          <p className="mt-0.5 text-sm text-amber-800">
            Une autre fiche partage le même téléphone ou e-mail. Fusionnez-la dans
            celle-ci pour regrouper tout l&apos;historique.
          </p>
          <ul className="mt-3 space-y-2">
            {duplicates.map((d) => (
              <li
                key={d.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white px-3 py-2"
              >
                <span className="text-sm">
                  <span className="font-medium text-slate-800">{d.name}</span>
                  <span className="text-slate-400"> · {d.phone || d.email}</span>
                </span>
                <form action={mergeContacts}>
                  <input type="hidden" name="targetId" value={c.id} />
                  <input type="hidden" name="sourceId" value={d.id} />
                  <ConfirmSubmit
                    message={`Fusionner « ${d.name} » dans cette fiche ? Tout son historique (devis, factures, RDV, rapports) sera rattaché ici, puis la fiche en double sera supprimée.`}
                    className="rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-100"
                  >
                    Fusionner ici
                  </ConfirmSubmit>
                </form>
              </li>
            ))}
          </ul>
        </div>
      )}

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
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <StageBadge stage={lead.stage} />
          </div>
          <div className="flex gap-2">
            {c.phone && (
              <a
                href={`tel:${c.phone}`}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:flex-none sm:py-2"
              >
                <Phone className="h-4 w-4" />
                Appeler
              </a>
            )}
            <Link
              href={
                `/admin/devis/nouveau?contactId=${lead.contactId}` +
                `&serviceType=${lead.service}&leadId=${lead.id}` +
                `&bien=${encodeURIComponent(
                  [c.address, [c.postalCode, c.city].filter(Boolean).join(' ')]
                    .filter(Boolean)
                    .join(', ')
                )}`
              }
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-orange-600 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-700 sm:flex-none sm:py-2"
            >
              <FilePlus2 className="h-4 w-4" />
              Créer un devis
            </Link>
          </div>
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
                  {[...PIPELINE_STAGES, 'PERDU' as const].map((v) => (
                    <option key={v} value={v}>
                      {STAGE_LABEL[v]}
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

            {/* Assigner à un diagnostiqueur */}
            <form action={assignLead} className="space-y-2">
              <input type="hidden" name="leadId" value={lead.id} />
              <label className="block text-sm font-medium text-slate-700">
                Diagnostiqueur assigné
              </label>
              <div className="flex flex-wrap gap-2">
                <select
                  name="assignedToId"
                  defaultValue={lead.assignedToId ?? ''}
                  className="h-10 flex-1 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                >
                  <option value="">— Non assigné —</option>
                  {experts.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  Assigner
                </button>
              </div>
              {lead.assignedTo && (
                <p className="text-xs text-slate-400">
                  Actuellement : {lead.assignedTo.name || lead.assignedTo.email}
                </p>
              )}
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

      {/* Qualification structurée (appel) */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Qualification (appel)
          </h2>
          {qual?.at && (
            <span className="text-xs text-slate-400">
              Dernière mise à jour le {new Date(qual.at).toLocaleDateString('fr-FR')}
            </span>
          )}
        </div>
        <p className="mb-4 text-sm text-slate-500">
          Pour un prospect reçu par téléphone : renseignez ces 4 critères, le tier
          (HOT/WARM/COLD) est calculé et appliqué automatiquement.
        </p>
        <QualificationForm leadId={lead.id} current={qual} />
        {qual?.reasons && qual.reasons.length > 0 && (
          <div className="mt-4 border-t border-slate-100 pt-3">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Critères retenus
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {qual.reasons.map((r, i) => (
                <li
                  key={i}
                  className="rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-600"
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}
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
            <details className="mt-4 border-t border-slate-100 pt-3 [&_summary::-webkit-details-marker]:hidden">
              <summary className="cursor-pointer list-none text-xs font-medium text-orange-600 hover:text-orange-700">
                Modifier les coordonnées
              </summary>
              <div className="mt-3">
                <ContactEditForm contact={c} />
              </div>
            </details>
          </Card>

          <Card title="Repères">
            <div className="space-y-2 text-sm">
              <Row label="Reçu le" value={lead.createdAt.toLocaleString('fr-FR')} />
              <Row label="Source" value={SOURCE_LABEL[lead.source]} />
              <Row
                label="Valeur estimée"
                value={lead.value != null ? `${lead.value} €` : null}
              />
            </div>
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
            <PayloadView data={lead.payload} />
          </Card>

          <details className="overflow-hidden rounded-xl border border-slate-200 bg-white [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:bg-slate-50">
              <span>Historique{lead.activities.length ? ` · ${lead.activities.length}` : ''}</span>
              <span className="text-[11px] font-medium normal-case tracking-normal text-orange-600">Afficher</span>
            </summary>
            <div className="px-5 pb-5">
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
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

/** Extrait la qualification d'appel rangée dans `payload.qualification`. */
function extractQualification(payload: unknown): QualificationRecord | null {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return null;
  const q = (payload as Record<string, unknown>).qualification;
  if (!q || typeof q !== 'object') return null;
  return q as QualificationRecord;
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

function humanize(key: string): string {
  const s = key
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function renderValue(v: unknown): string {
  if (v == null) return '—';
  if (Array.isArray(v)) return v.map((x) => renderValue(x)).join(', ');
  if (typeof v === 'object') {
    return Object.entries(v as Record<string, unknown>)
      .filter(([, x]) => x != null && x !== '')
      .map(([k, x]) => `${humanize(k)} : ${renderValue(x)}`)
      .join(' · ');
  }
  if (typeof v === 'boolean') return v ? 'Oui' : 'Non';
  return String(v);
}

/** Rendu lisible du payload du formulaire (remplace l'ancien dump JSON brut). */
function PayloadView({ data }: { data: unknown }) {
  if (!data || typeof data !== 'object') {
    return <p className="text-sm text-slate-500">Aucune donnée détaillée.</p>;
  }
  const entries = Object.entries(data as Record<string, unknown>).filter(
    ([, v]) => v != null && v !== '' && !(Array.isArray(v) && v.length === 0)
  );
  if (entries.length === 0) {
    return <p className="text-sm text-slate-500">Aucune donnée détaillée.</p>;
  }
  return (
    <dl className="divide-y divide-slate-100 text-sm">
      {entries.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-6 py-1.5">
          <dt className="shrink-0 text-slate-500">{humanize(k)}</dt>
          <dd className="text-right font-medium text-slate-800">{renderValue(v)}</dd>
        </div>
      ))}
    </dl>
  );
}
