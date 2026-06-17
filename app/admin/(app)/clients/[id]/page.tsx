import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  FileText,
  Receipt,
  ClipboardCheck,
  CalendarClock,
  Check,
  Circle,
  Send,
} from 'lucide-react';
import type {
  DevisStatus,
  FactureStatus,
  ReportStatus,
  AppointmentStatus,
} from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getSessionUser, listExperts } from '@/lib/auth-helpers';
import { euros } from '@/lib/crm/company';
import { computeDossier } from '@/lib/crm/dossier';
import { Avatar } from '@/components/admin/avatar';
import { ContactEditForm } from '@/components/admin/contact-edit-form';
import { PayloadView } from '@/components/admin/payload-view';
import { StageBadge, PhaseBadge, PHASE_LABEL, PIPELINE_FLOW } from '@/components/admin/badges';
import {
  changeStage,
  assignLead,
  scheduleRelance,
  addActivity,
} from '@/app/admin/(app)/leads/actions';
import { acceptDevis } from '@/app/admin/(app)/devis/actions';
import { recordFacturePayment } from '@/app/admin/(app)/factures/actions';
import { sendFacture } from '@/app/admin/(app)/send-actions';
import { RelanceControl } from '@/components/admin/relance-control';
import { ConfirmSubmit } from '@/components/admin/confirm-submit';

export const dynamic = 'force-dynamic';

const OCCUPANT_LABEL: Record<string, string> = {
  PROPRIETAIRE: 'Propriétaire occupant',
  BAILLEUR: 'Propriétaire bailleur',
  LOCATAIRE: 'Locataire',
  ACHETEUR: "En projet d'achat",
  INVESTISSEUR: 'Investisseur / marchand de biens',
  INCONNU: 'Non précisé',
};
const DEVIS_PILL: Record<DevisStatus, [string, string]> = {
  BROUILLON: ['Brouillon', 'bg-slate-100 text-slate-600'],
  ENVOYE: ['Envoyé', 'bg-blue-50 text-blue-700'],
  ACCEPTE: ['Accepté', 'bg-emerald-50 text-emerald-700'],
  REFUSE: ['Refusé', 'bg-red-50 text-red-700'],
  EXPIRE: ['Expiré', 'bg-slate-100 text-slate-500'],
};
const FACTURE_PILL: Record<FactureStatus, [string, string]> = {
  BROUILLON: ['Brouillon', 'bg-slate-100 text-slate-600'],
  ENVOYEE: ['Envoyée', 'bg-blue-50 text-blue-700'],
  PAYEE: ['Payée', 'bg-emerald-50 text-emerald-700'],
  ANNULEE: ['Annulée', 'bg-slate-100 text-slate-500'],
};
const RAPPORT_PILL: Record<ReportStatus, [string, string]> = {
  BROUILLON: ['Brouillon', 'bg-slate-100 text-slate-600'],
  SOUMIS: ['Soumis', 'bg-amber-50 text-amber-700'],
  GENERE: ['Généré', 'bg-blue-50 text-blue-700'],
  VALIDE: ['Validé', 'bg-emerald-50 text-emerald-700'],
  ENVOYE: ['Envoyé', 'bg-violet-50 text-violet-700'],
};
const APPT_PILL: Record<AppointmentStatus, [string, string]> = {
  PLANIFIE: ['Planifié', 'bg-blue-50 text-blue-700'],
  CONFIRME: ['Confirmé', 'bg-violet-50 text-violet-700'],
  REALISE: ['Réalisé', 'bg-emerald-50 text-emerald-700'],
  ANNULE: ['Annulé', 'bg-slate-100 text-slate-500'],
};

function Pill({ tone, children }: { tone: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${tone}`}>
      {children}
    </span>
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

function Metric({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-lg bg-slate-50 px-3 py-2.5">
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className={`mt-0.5 text-sm font-medium ${tone ?? 'text-slate-800'}`}>{value}</p>
    </div>
  );
}

export default async function ClientFichePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getSessionUser();
  if (!user) redirect('/admin/login');
  const isAdmin = user.role === 'ADMIN';

  const c = await prisma.contact
    .findUnique({
      where: { id: params.id },
      include: {
        leads: {
          orderBy: { createdAt: 'desc' },
          include: { assignedTo: { select: { name: true, email: true } } },
        },
        devis: { orderBy: { createdAt: 'desc' } },
        factures: { orderBy: { createdAt: 'desc' } },
        // updatedAt desc (≈ date d'envoi) — ALIGNÉ sur liste/pipeline/pilotage,
        // pour que rapportEnvoyeAt (donc SUIVI/TERMINÉ) soit cohérent partout.
        rapports: { orderBy: { updatedAt: 'desc' } },
        appointments: { orderBy: { start: 'desc' } },
        activities: { orderBy: { createdAt: 'desc' }, take: 12 },
      },
    })
    .catch(() => null);

  if (!c) notFound();

  // Cloisonnement EXPERT : un diagnostiqueur n'accède qu'aux fiches de SES
  // dossiers (prospect assigné ou rapport dont il est l'auteur). Et il ne verra
  // ni devis, ni factures, ni montants (sections gardées par `isAdmin`).
  if (!isAdmin) {
    const allowed =
      c.leads.some((l) => l.assignedToId === user.id) ||
      c.rapports.some((r) => r.authorId === user.id);
    if (!allowed) redirect('/admin/rapports');
  }

  const lead = c.leads[0] ?? null;
  const dossier = computeDossier({
    devis: c.devis.map((d) => ({
      status: d.status,
      totalHT: Number(d.totalHT),
      acceptedAt: d.acceptedAt,
      serviceType: d.serviceType,
    })),
    factures: c.factures.map((f) => ({ status: f.status })),
    rapports: c.rapports.map((r) => ({
      status: r.status,
      budgetHT: r.budgetHT != null ? Number(r.budgetHT) : null,
    })),
    appointments: c.appointments.map((a) => ({ type: a.type, status: a.status })),
    stage: lead?.stage ?? null,
    rapportEnvoyeAt: c.rapports.find((r) => r.status === 'ENVOYE')?.updatedAt ?? null,
  });

  const next = nextStep(dossier, c.id, lead?.id);
  // RÈGLE MÉTIER : un diagnostiqueur ne s'assigne qu'APRÈS validation du devis.
  // (Mais un dossier DÉJÀ assigné reste gérable — pour pouvoir le réassigner/désassigner.)
  const devisAccepte = c.devis.some((d) => d.status === 'ACCEPTE');
  const canAssign = devisAccepte || Boolean(lead?.assignedToId);
  const experts = isAdmin && lead && canAssign ? await listExperts() : [];
  // Sélecteur d'étape aligné sur le pipeline : on affiche la phase COURANTE du
  // dossier (A_RAPPELER replié sur Nouveau, comme dans le pipeline).
  const stageSel = dossier.phase === 'A_RAPPELER' ? 'NOUVEAU' : dossier.phase;
  const stageInFlow = PIPELINE_FLOW.some((p) => p.phase === stageSel);
  const diagnostiqueur = lead?.assignedTo?.name || lead?.assignedTo?.email || '—';
  const adresse =
    [c.address, [c.postalCode, c.city].filter(Boolean).join(' ')]
      .filter(Boolean)
      .join(', ') || '—';

  // Récap financier du dossier (facturé / encaissé / reste dû).
  const factureTotal = c.factures
    .filter((f) => ['ENVOYEE', 'PAYEE'].includes(f.status))
    .reduce((s, f) => s + Number(f.totalHT), 0);
  const encaisse = c.factures.reduce((s, f) => s + Number(f.acompte ?? 0), 0);
  const resteDu = Math.max(0, factureTotal - encaisse);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href={isAdmin ? '/admin/clients' : '/admin/rapports'}
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {isAdmin ? 'Tous les clients' : 'Mes interventions'}
      </Link>

      {/* En-tête */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar name={c.name} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                {c.name}
              </h1>
              {dossier.isClient ? (
                <Pill tone="bg-emerald-100 text-emerald-700">Client</Pill>
              ) : (
                <Pill tone="bg-slate-100 text-slate-600">Prospect</Pill>
              )}
              <PhaseBadge phase={dossier.phase} />
            </div>
            <p className="mt-0.5 text-sm text-slate-500">
              {[c.city, dossier.clientSince ? `client depuis ${dossier.clientSince.toLocaleDateString('fr-FR')}` : null]
                .filter(Boolean)
                .join(' · ') || 'Fiche client'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {c.phone && (
              <a
                href={`tel:${c.phone}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Phone className="h-4 w-4" /> Appeler
              </a>
            )}
            {isAdmin && (
              <>
                <Link
                  href={`/admin/devis/nouveau?contactId=${c.id}${
                    lead?.id ? `&leadId=${lead.id}` : ''
                  }`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <FileText className="h-4 w-4" /> Devis
                </Link>
                <Link
                  href={`/admin/factures/nouveau?contactId=${c.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-700"
                >
                  <Receipt className="h-4 w-4" /> Facture
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Essentiel : téléphone + adresse du bien, toujours en avant. */}
        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 py-2.5">
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
              Téléphone
            </div>
            {c.phone ? (
              <a href={`tel:${c.phone}`} className="text-sm font-semibold tabular-nums text-slate-900 hover:text-orange-600">
                {c.phone}
              </a>
            ) : (
              <span className="text-sm text-slate-300">—</span>
            )}
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 py-2.5">
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
              Adresse du bien
            </div>
            <div className="truncate text-sm font-semibold text-slate-900" title={adresse}>
              {adresse}
            </div>
          </div>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          <Metric label="Diagnostiqueur" value={diagnostiqueur} />
          {isAdmin && (
            <Metric
              label={dossier.montant != null ? 'Montant (signé)' : 'Montant devis'}
              value={
                dossier.montant != null
                  ? euros(dossier.montant)
                  : dossier.montantDevis != null
                    ? euros(dossier.montantDevis)
                    : '—'
              }
            />
          )}
          {isAdmin && factureTotal > 0 && (
            <Metric label="Facturé" value={euros(factureTotal)} />
          )}
          {isAdmin && factureTotal > 0 && (
            <Metric
              label="Reste dû"
              value={resteDu > 0 ? euros(resteDu) : 'Soldé'}
              tone={resteDu > 0 ? 'text-orange-600' : 'text-emerald-600'}
            />
          )}
          {isAdmin && dossier.travauxAPlanifier && (
            <Metric label="Travaux" value="À planifier" tone="text-orange-600" />
          )}
        </div>
      </div>

      {/* Suivi de dossier */}
      <Card title="Suivi du dossier">
        <ol className="flex flex-wrap gap-x-2 gap-y-3">
          {dossier.steps.map((s, i) => (
            <li key={s.key} className="flex items-center gap-2">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                  s.done
                    ? 'bg-emerald-500 text-white'
                    : s.current
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-200 text-slate-400'
                }`}
              >
                {s.done ? <Check className="h-3 w-3" /> : <Circle className="h-2 w-2 fill-current" />}
              </span>
              <span
                className={`text-xs ${
                  s.current ? 'font-semibold text-orange-700' : s.done ? 'text-slate-700' : 'text-slate-400'
                }`}
              >
                {s.label}
              </span>
              {i < dossier.steps.length - 1 && (
                <span className="ml-1 hidden h-px w-5 bg-slate-200 sm:block" />
              )}
            </li>
          ))}
        </ol>
      </Card>

      {/* Prochaine étape — fil conducteur du dossier (pilotage ADMIN) */}
      {isAdmin && next && (
        <div className="rounded-xl border border-orange-200 bg-orange-50/70 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-orange-700">
            Prochaine étape
          </p>
          <p className="mt-1 text-base font-semibold text-slate-900">
            {next.title}
          </p>
          <p className="mt-0.5 text-sm text-slate-600">{next.desc}</p>
          <Link
            href={next.href}
            className="mt-3 inline-flex h-10 items-center gap-1.5 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white hover:bg-orange-700"
          >
            {next.label} →
          </Link>
        </div>
      )}

      {/* Actions : diagnostiqueur, relance, activité, statut (ADMIN).
          L'étape du pipeline n'est PLUS réglée à la main ici : elle découle
          automatiquement du dossier (devis envoyé → RDV → visite → facture →
          rapport). On garde seulement l'action humaine « perdu / rouvrir ». */}
      {isAdmin && lead && (
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Actions <StageBadge stage={lead.stage} />
              <Link
                href="/admin/pipeline"
                className="text-[11px] font-medium normal-case tracking-normal text-orange-600 hover:underline"
              >
                voir le pipeline →
              </Link>
            </h2>
            <form action={changeStage}>
              <input type="hidden" name="leadId" value={lead.id} />
              <input
                type="hidden"
                name="stage"
                value={lead.stage === 'PERDU' ? 'A_RAPPELER' : 'PERDU'}
              />
              <button
                type="submit"
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                  lead.stage === 'PERDU'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    : 'border-slate-300 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {lead.stage === 'PERDU' ? 'Rouvrir le dossier' : 'Marquer perdu'}
              </button>
            </form>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="space-y-4">
              <form action={changeStage} className="space-y-2">
                <input type="hidden" name="leadId" value={lead.id} />
                <label className="block text-sm font-medium text-slate-700">
                  Faire évoluer l&apos;étape
                </label>
                <div className="flex flex-wrap gap-2">
                  <select
                    name="stage"
                    defaultValue={stageSel}
                    className="h-10 flex-1 rounded-lg border border-slate-300 px-3 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  >
                    {/* MÊMES phases que la page Pipeline (PIPELINE_FLOW). Les étapes
                        amont sont réglables à la main ; celles après la visite
                        (facture, paiement, rapport, suivi) avancent AUTOMATIQUEMENT
                        → affichées mais désactivées. */}
                    {!stageInFlow && (
                      <option value={stageSel} disabled>
                        {PHASE_LABEL[stageSel] ?? stageSel} · état actuel
                      </option>
                    )}
                    {PIPELINE_FLOW.map((p) => (
                      <option key={p.phase} value={p.phase} disabled={!p.editable}>
                        {PHASE_LABEL[p.phase]}
                        {p.editable ? '' : ' · auto'}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Mettre à jour
                  </button>
                </div>
                <p className="text-xs text-slate-400">
                  Ce sont les étapes de la page Pipeline. Après la visite, elles
                  avancent toutes seules dès que vous créez le document (facture,
                  paiement, rapport…) — vous ne réglez que l&apos;amont.
                </p>
              </form>
              {canAssign ? (
                <form action={assignLead} className="space-y-2">
                  <input type="hidden" name="leadId" value={lead.id} />
                  <label className="block text-sm font-medium text-slate-700">
                    Diagnostiqueur assigné
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <select
                      name="assignedToId"
                      defaultValue={lead.assignedToId ?? ''}
                      className="h-10 flex-1 rounded-lg border border-slate-300 px-3 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
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
                      className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      Assigner
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Diagnostiqueur assigné
                  </label>
                  <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2.5 text-xs text-slate-500">
                    Disponible une fois le devis validé — le diagnostiqueur ne reçoit
                    le dossier qu&apos;après l&apos;accord du client.
                  </p>
                </div>
              )}
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
                    className="h-10 rounded-lg border border-slate-300 px-3 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  />
                  <input
                    name="content"
                    placeholder="Objet (ex. rappeler après devis)"
                    className="h-10 flex-1 rounded-lg border border-slate-300 px-3 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  />
                  <button
                    type="submit"
                    className="h-10 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white hover:bg-orange-700"
                  >
                    Planifier
                  </button>
                </div>
              </form>
            </div>
            <form action={addActivity} className="space-y-2">
              <input type="hidden" name="leadId" value={lead.id} />
              <label className="block text-sm font-medium text-slate-700">
                Consigner une activité
              </label>
              <select
                name="type"
                defaultValue="APPEL"
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
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
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
              <button
                type="submit"
                className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Ajouter
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Données du formulaire web (discret) — ADMIN */}
      {isAdmin && lead && (lead.summary || (!!lead.payload && typeof lead.payload === 'object')) && (
        <details className="overflow-hidden rounded-xl border border-slate-200 bg-white [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:bg-slate-50">
            <span>Données du formulaire</span>
            <span className="text-[11px] font-medium normal-case tracking-normal text-orange-600">
              Afficher
            </span>
          </summary>
          <div className="px-5 pb-5">
            {lead.summary && (
              <p className="mb-3 text-sm font-medium text-slate-800">{lead.summary}</p>
            )}
            <PayloadView data={lead.payload} />
          </div>
        </details>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Coordonnées & bien */}
        <div className="lg:col-span-1">
          <Card title="Coordonnées & bien">
            <dl className="space-y-2.5 text-sm">
              {c.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                  <a href={`tel:${c.phone}`} className="font-medium text-slate-700 hover:text-orange-600">
                    {c.phone}
                  </a>
                </div>
              )}
              {c.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                  <a href={`mailto:${c.email}`} className="font-medium text-slate-700 hover:text-orange-600">
                    {c.email}
                  </a>
                </div>
              )}
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <span className="text-slate-700">{adresse}</span>
              </div>
              <div className="border-t border-slate-100 pt-2.5">
                <Row label="Statut" value={OCCUPANT_LABEL[c.occupantStatus]} />
                <Row label="Type de bien" value={c.propertyType} />
                {lead && <Row label="Demande" value={lead.summary} />}
              </div>
            </dl>
            <details className="mt-3 border-t border-slate-100 pt-3 [&_summary::-webkit-details-marker]:hidden">
              <summary className="cursor-pointer list-none text-xs font-medium text-orange-600 hover:text-orange-700">
                Modifier les coordonnées
              </summary>
              <div className="mt-3">
                <ContactEditForm contact={c} />
              </div>
            </details>
          </Card>
        </div>

        {/* Documents du dossier */}
        <div className="lg:col-span-2">
          <Card title="Documents du dossier">
            {(isAdmin ? c.devis.length + c.factures.length : 0) +
              c.rapports.length +
              c.appointments.length ===
            0 ? (
              <p className="text-sm text-slate-500">Aucun document pour ce dossier.</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {isAdmin &&
                  c.devis.map((d) => (
                    <DocRow
                      key={d.id}
                      icon={FileText}
                      href={`/admin/devis/${d.id}`}
                      title={`Devis ${d.number}`}
                      sub={`${d.object} · ${euros(Number(d.totalHT))}`}
                      pill={DEVIS_PILL[d.status]}
                      action={
                        d.status === 'ENVOYE' ? (
                          <div className="flex flex-wrap items-center justify-end gap-2">
                            <form action={acceptDevis}>
                              <input type="hidden" name="devisId" value={d.id} />
                              <ConfirmSubmit
                                message="Valider ce devis ? Le client passe en « gagné » et la visite de diagnostic peut être planifiée."
                                className="inline-flex h-8 items-center gap-1 whitespace-nowrap rounded-lg border border-emerald-200 bg-emerald-50 px-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                              >
                                <Check className="h-3.5 w-3.5" /> Valider
                              </ConfirmSubmit>
                            </form>
                            <RelanceControl kind="devis" id={d.id} contactId={c.id} relanceCount={d.relanceCount} />
                          </div>
                        ) : undefined
                      }
                    />
                  ))}
                {c.rapports.map((r) => (
                  <DocRow
                    key={r.id}
                    icon={ClipboardCheck}
                    href={`/admin/rapports/${r.id}`}
                    title={`Rapport ${r.number}`}
                    sub={r.title}
                    pill={RAPPORT_PILL[r.status]}
                  />
                ))}
                {isAdmin &&
                  c.factures.map((f) => (
                    <DocRow
                      key={f.id}
                      icon={Receipt}
                      href={`/admin/factures/${f.id}`}
                      title={`Facture ${f.number}`}
                      sub={`${f.object} · ${euros(Number(f.totalHT))}`}
                      pill={FACTURE_PILL[f.status]}
                      action={
                        f.status === 'ENVOYEE' ? (
                          <div className="flex flex-wrap items-center justify-end gap-2">
                            <form action={recordFacturePayment}>
                              <input type="hidden" name="factureId" value={f.id} />
                              <input
                                type="hidden"
                                name="montant"
                                value={Math.max(0, Number(f.totalHT) - Number(f.acompte ?? 0))}
                              />
                              <ConfirmSubmit
                                message="Marquer cette facture comme payée (soldée) ? Le client recevra la confirmation de règlement et la rédaction du rapport est déclenchée."
                                className="inline-flex h-8 items-center gap-1 whitespace-nowrap rounded-lg border border-emerald-200 bg-emerald-50 px-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                              >
                                <Check className="h-3.5 w-3.5" /> Payée
                              </ConfirmSubmit>
                            </form>
                            <RelanceControl kind="facture" id={f.id} contactId={c.id} relanceCount={f.relanceCount} />
                          </div>
                        ) : f.status === 'BROUILLON' ? (
                          <form action={sendFacture}>
                            <input type="hidden" name="factureId" value={f.id} />
                            <ConfirmSubmit
                              message="Envoyer cette facture au client par e-mail (PDF joint) ?"
                              className="inline-flex h-8 items-center gap-1 whitespace-nowrap rounded-lg border border-orange-200 bg-orange-50 px-2 text-xs font-semibold text-orange-700 hover:bg-orange-100"
                            >
                              <Send className="h-3.5 w-3.5" /> Envoyer
                            </ConfirmSubmit>
                          </form>
                        ) : undefined
                      }
                    />
                  ))}
                {c.appointments.map((a) => (
                  <DocRow
                    key={a.id}
                    icon={CalendarClock}
                    href="/admin/agenda"
                    title={a.title}
                    sub={a.start.toLocaleString('fr-FR')}
                    pill={APPT_PILL[a.status]}
                  />
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>

      {/* Historique — discret (replié) */}
      <details className="overflow-hidden rounded-xl border border-slate-200 bg-white [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:bg-slate-50">
          <span>Historique{c.activities.length ? ` · ${c.activities.length}` : ''}</span>
          <span className="text-[11px] font-medium normal-case tracking-normal text-orange-600">
            Afficher
          </span>
        </summary>
        <div className="px-5 pb-5">
          {c.activities.length === 0 ? (
            <p className="text-sm text-slate-500">Aucune activité.</p>
          ) : (
            <ol className="space-y-3">
              {c.activities.map((a) => (
                <li key={a.id} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-slate-700">{a.content || a.type}</p>
                    <p className="text-xs tabular-nums text-slate-400">
                      {a.createdAt.toLocaleString('fr-FR')}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </details>
    </div>
  );
}

/**
 * Fil conducteur : déduit l'action à mener maintenant selon l'étape courante du
 * dossier (devis → accord → visite → facture → paiement → rapport → travaux).
 */
function nextStep(
  dossier: ReturnType<typeof computeDossier>,
  contactId: string,
  leadId?: string
): { title: string; desc: string; label: string; href: string } | null {
  const cur = dossier.steps.find((s) => s.current);
  if (!cur) return null;
  const l = leadId ? `&leadId=${leadId}` : '';
  switch (cur.key) {
    case 'devis':
      return {
        title: 'Créer et envoyer le devis',
        desc: 'Établissez le devis de diagnostic pour ce dossier.',
        label: 'Créer un devis',
        href: `/admin/devis/nouveau?contactId=${contactId}${l}`,
      };
    case 'client':
      return {
        title: "En attente d'acceptation du devis",
        desc: "Le devis a été envoyé. Marquez-le accepté dès réception de l'accord.",
        label: 'Voir les devis',
        href: '/admin/devis',
      };
    case 'rdv':
      return {
        title: 'Planifier la visite de diagnostic',
        desc: 'Devis accepté : proposez un créneau (le client reçoit l’invitation).',
        label: 'Planifier la visite',
        href: `/admin/agenda?contactId=${contactId}${l}`,
      };
    case 'visite':
      return {
        title: 'Réaliser la visite',
        desc: 'Le RDV est planifié. Marquez la visite « réalisée » une fois faite.',
        label: "Ouvrir l'agenda",
        href: '/admin/agenda',
      };
    case 'facture':
      return {
        title: 'Émettre la facture',
        desc: 'La visite est faite : générez la facture depuis le RDV.',
        label: "Ouvrir l'agenda",
        href: '/admin/agenda',
      };
    case 'paiement':
      return {
        title: 'Encaisser le paiement',
        desc: 'La facture est envoyée. Enregistrez le règlement à réception.',
        label: 'Voir les factures',
        href: '/admin/factures',
      };
    case 'rapport':
      return {
        title: 'Rédiger et envoyer le rapport',
        desc: 'Paiement reçu : le rapport est à remettre sous 3 à 5 jours ouvrés.',
        label: 'Ouvrir les rapports',
        href: '/admin/rapports',
      };
    case 'suivi':
      return {
        title: 'Suivi client',
        desc: "Le rapport est remis. Faites le point avec le client sur les préconisations — s'il souhaite engager les travaux, proposez le devis d'accompagnement.",
        label: 'Créer un devis travaux',
        href: `/admin/devis/nouveau-travaux?contactId=${contactId}${l}`,
      };
    case 'travaux':
      return {
        title: 'Planifier le lancement des travaux',
        desc: 'Le devis travaux est en place : planifiez le lancement.',
        label: 'Planifier',
        href: `/admin/agenda?type=LANCEMENT_TRAVAUX&contactId=${contactId}`,
      };
    default:
      return null;
  }
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between gap-4 py-0.5">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-800">
        {value || <span className="text-slate-300">—</span>}
      </dd>
    </div>
  );
}

function DocRow({
  icon: Icon,
  href,
  title,
  sub,
  pill,
  action,
}: {
  icon: typeof FileText;
  href: string;
  title: string;
  sub?: string | null;
  pill: [string, string];
  action?: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-2 py-2.5">
      <Link href={href} className="flex min-w-0 flex-1 items-center gap-3 hover:opacity-80">
        <Icon className="h-[18px] w-[18px] shrink-0 text-slate-500" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-800">{title}</p>
          {sub ? <p className="truncate text-xs text-slate-400">{sub}</p> : null}
        </div>
        <Pill tone={pill[1]}>{pill[0]}</Pill>
      </Link>
      {action}
    </li>
  );
}

