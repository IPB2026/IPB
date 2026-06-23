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
  Trash2,
} from 'lucide-react';
import type {
  DevisStatus,
  FactureStatus,
  ReportStatus,
  AppointmentStatus,
} from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getSessionUser, listExperts } from '@/lib/auth-helpers';
import { computeDossier, dossierInputFromContact } from '@/lib/crm/dossier';
import { Avatar } from '@/components/admin/avatar';
import { ContactEditForm } from '@/components/admin/contact-edit-form';
import { PayloadView } from '@/components/admin/payload-view';
import { PhaseBadge, PHASE_LABEL, MANUAL_PHASE_OPTIONS, STEP_TO_PHASE } from '@/components/admin/badges';
import {
  changeStage,
  clearManualPhase,
  assignLead,
  scheduleRelance,
  addActivity,
} from '@/app/admin/(app)/leads/actions';
import { acceptDevis, quickCreateDevis, setDevisMontant } from '@/app/admin/(app)/devis/actions';
import { recordFacturePayment } from '@/app/admin/(app)/factures/actions';
import { sendFacture, sendRapport } from '@/app/admin/(app)/send-actions';
import { archiveContact } from '@/app/admin/(app)/contact-actions';
import { Money } from '@/components/admin/money';
import { updateAppointmentStatus } from '@/app/admin/(app)/agenda/actions';
import { RelanceControl } from '@/components/admin/relance-control';
import { ConfirmSubmit } from '@/components/admin/confirm-submit';
import { CallButton } from '@/components/admin/call-button';
import { AssistantIPB } from '@/components/admin/assistant-ipb';
import { importExternalDocument } from '@/app/admin/(app)/clients/import-document-actions';

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

function Metric({ label, value, tone }: { label: string; value: React.ReactNode; tone?: string }) {
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
  const dossier = computeDossier(
    dossierInputFromContact(c, { stage: lead?.stage, manualPhase: lead?.manualPhase })
  );

  const next = nextStep(dossier, c.id, lead?.id);
  // RÈGLE MÉTIER : un diagnostiqueur ne s'assigne qu'APRÈS validation du devis.
  // (Mais un dossier DÉJÀ assigné reste gérable — pour pouvoir le réassigner/désassigner.)
  const devisAccepte = c.devis.some((d) => d.status === 'ACCEPTE');
  const canAssign = devisAccepte || Boolean(lead?.assignedToId);
  const experts = isAdmin && lead && canAssign ? await listExperts() : [];
  // Sélecteur d'étape : on présélectionne la phase COURANTE du dossier. En mode
  // manuel, c'est la phase forcée ; sinon la phase dérivée des artefacts.
  const stageSel = dossier.phase === 'A_RAPPELER' ? 'A_RAPPELER' : dossier.phase;
  // Le dossier est-il piloté À LA MAIN (override actif) ou en suivi automatique ?
  const isManual = Boolean(lead?.manualPhase);
  // La phase courante figure-t-elle dans la liste déroulante ? (sinon on l'ajoute)
  const stageInOptions = MANUAL_PHASE_OPTIONS.some((p) => p.phase === stageSel);
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
              <CallButton
                contactId={c.id}
                phone={c.phone}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              />
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
              value={<Money value={dossier.montant ?? dossier.montantDevis} />}
            />
          )}
          {isAdmin && factureTotal > 0 && (
            <Metric label="Facturé" value={<Money value={factureTotal} />} />
          )}
          {isAdmin && factureTotal > 0 && (
            <Metric
              label="Reste dû"
              value={resteDu > 0 ? <Money value={resteDu} /> : 'Soldé'}
              tone={resteDu > 0 ? 'text-orange-600' : 'text-emerald-600'}
            />
          )}
          {isAdmin && dossier.travauxAPlanifier && (
            <Metric label="Travaux" value="À planifier" tone="text-orange-600" />
          )}
        </div>
      </div>

      {/* Suivi de dossier — chaque palier est cliquable (ADMIN) : un clic règle la
          phase à cette étape (liberté totale, sans passer par le menu déroulant). */}
      <Card title="Suivi du dossier">
        {isAdmin && lead && (
          <p className="mb-3 text-xs text-slate-400">
            Cliquez sur une étape pour y placer le dossier directement.
          </p>
        )}
        <ol className="flex flex-wrap gap-x-2 gap-y-3">
          {dossier.steps.map((s, i) => {
            const dot = (
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
            );
            const labelCls = `text-xs ${
              s.current ? 'font-semibold text-orange-700' : s.done ? 'text-slate-700' : 'text-slate-400'
            }`;
            const targetPhase = STEP_TO_PHASE[s.key];
            return (
              <li key={s.key} className="flex items-center gap-2">
                {isAdmin && lead && targetPhase ? (
                  <form action={changeStage}>
                    <input type="hidden" name="leadId" value={lead.id} />
                    <input type="hidden" name="stage" value={targetPhase} />
                    <button
                      type="submit"
                      title={`Placer le dossier à : ${s.label}`}
                      className="flex items-center gap-2 rounded-md px-1 py-0.5 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                    >
                      {dot}
                      <span className={labelCls}>{s.label}</span>
                    </button>
                  </form>
                ) : (
                  <>
                    {dot}
                    <span className={labelCls}>{s.label}</span>
                  </>
                )}
                {i < dossier.steps.length - 1 && (
                  <span className="ml-1 hidden h-px w-5 bg-slate-200 sm:block" />
                )}
              </li>
            );
          })}
        </ol>
      </Card>

      {/* Assistant IPB — copilote IA (résumé + action + brouillon e-mail) */}
      {isAdmin && (
        <AssistantIPB contactId={c.id} clientEmail={c.email} />
      )}

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

      {/* Actions : étape (TOUTE phase réglable à la main), diagnostiqueur, relance,
          activité, statut (ADMIN). Liberté totale : le réglage manuel pose un
          override (lead.manualPhase) qui prime sur la dérivation automatique ; un
          bouton « revenir au suivi auto » la rend de nouveau déduite des documents. */}
      {isAdmin && lead && (
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Actions <PhaseBadge phase={dossier.phase} />
              {isManual ? (
                <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold normal-case tracking-normal text-orange-700 ring-1 ring-orange-600/10">
                  réglé à la main
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium normal-case tracking-normal text-slate-500">
                  suivi auto
                </span>
              )}
              <Link
                href="/admin/pipeline"
                className="text-[11px] font-medium normal-case tracking-normal text-orange-600 hover:underline"
              >
                voir le pipeline →
              </Link>
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              {isManual && (
                <form action={clearManualPhase}>
                  <input type="hidden" name="leadId" value={lead.id} />
                  <button
                    type="submit"
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50"
                  >
                    Revenir au suivi auto
                  </button>
                </form>
              )}
              {lead.stage === 'PERDU' ? (
                <form action={clearManualPhase}>
                  <input type="hidden" name="leadId" value={lead.id} />
                  <button
                    type="submit"
                    className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                  >
                    Rouvrir le dossier
                  </button>
                </form>
              ) : (
                <form action={changeStage}>
                  <input type="hidden" name="leadId" value={lead.id} />
                  <input type="hidden" name="stage" value="PERDU" />
                  <button
                    type="submit"
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50"
                  >
                    Marquer perdu
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="space-y-4">
              <form action={changeStage} className="space-y-2">
                <input type="hidden" name="leadId" value={lead.id} />
                <label className="block text-sm font-medium text-slate-700">
                  Régler l&apos;étape (manuel)
                </label>
                <div className="flex flex-wrap gap-2">
                  <select
                    name="stage"
                    defaultValue={stageSel}
                    className="h-10 flex-1 rounded-lg border border-slate-300 px-3 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  >
                    {/* LIBERTÉ TOTALE : toutes les phases sont réglables à la main,
                        même celles habituellement déduites (facture, paiement,
                        rapport…). Aucun document n'est requis pour cocher une étape. */}
                    {!stageInOptions && (
                      <option value={stageSel}>
                        {PHASE_LABEL[stageSel] ?? stageSel} · état actuel
                      </option>
                    )}
                    {MANUAL_PHASE_OPTIONS.map((p) => (
                      <option key={p.phase} value={p.phase}>
                        {p.label}
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
                  Vous réglez n&apos;importe quelle étape librement — sans avoir à
                  générer le document correspondant. Votre choix prime sur l&apos;avancement
                  automatique jusqu&apos;à ce que vous cliquiez « revenir au suivi auto ».
                </p>
              </form>

              {/* Devis express : créer un devis diagnostic en 2 clics (service +
                  montant) sans passer par la page dédiée. Redirige vers le devis
                  créé (brouillon) pour relecture/envoi. */}
              <form action={quickCreateDevis} className="space-y-2">
                <input type="hidden" name="contactId" value={c.id} />
                <input type="hidden" name="leadId" value={lead.id} />
                <label className="block text-sm font-medium text-slate-700">
                  Devis express
                </label>
                <div className="flex flex-wrap gap-2">
                  <select
                    name="serviceType"
                    defaultValue="FISSURES"
                    className="h-10 flex-1 rounded-lg border border-slate-300 px-3 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  >
                    <option value="FISSURES">Fissures</option>
                    <option value="HUMIDITE">Humidité</option>
                    <option value="EXPERTISE_ACHAT">Expertise achat</option>
                    <option value="MUR_PORTEUR">Mur porteur</option>
                  </select>
                  <input
                    name="prix"
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    placeholder="€ HT"
                    aria-label="Montant HT du devis"
                    className="h-10 w-28 rounded-lg border border-slate-300 px-3 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  />
                  <button
                    type="submit"
                    className="h-10 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white hover:bg-orange-700"
                  >
                    Créer
                  </button>
                </div>
                <p className="text-xs text-slate-400">
                  Crée un devis diagnostic en brouillon et l&apos;ouvre pour relecture
                  puis envoi.
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
                {isAdmin && lead && (lead.channel || lead.utmSource || lead.utmCampaign) && (
                  <Row
                    label="Origine"
                    value={[
                      lead.channel,
                      lead.utmSource,
                      lead.utmCampaign && `« ${lead.utmCampaign} »`,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  />
                )}
                {isAdmin && lead?.landingPage && (
                  <Row label="Page d'arrivée" value={lead.landingPage} />
                )}
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
            {isAdmin && (
              <details className="mt-3 border-t border-slate-100 pt-3 [&_summary::-webkit-details-marker]:hidden">
                <summary className="cursor-pointer list-none text-xs font-medium text-red-600 hover:text-red-700">
                  Supprimer ce client
                </summary>
                <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3">
                  <p className="text-xs text-red-700">
                    Met ce client à la <strong>corbeille</strong> : il disparaît du CRM mais reste
                    récupérable pendant 30 jours, avant suppression définitive automatique.
                  </p>
                  <form action={archiveContact} className="mt-2.5">
                    <input type="hidden" name="contactId" value={c.id} />
                    <ConfirmSubmit
                      message={`Mettre « ${c.name} » à la corbeille ? Le client disparaît du CRM mais reste récupérable 30 jours.`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" /> Mettre à la corbeille
                    </ConfirmSubmit>
                  </form>
                </div>
              </details>
            )}
          </Card>
        </div>

        {/* Documents du dossier */}
        <div className="lg:col-span-2">
          <Card title="Documents du dossier">
            {/* Importer un document établi HORS CRM (devis/facture/rapport déjà
                produit ailleurs) → rangé dans sa catégorie, PDF stocké. */}
            {isAdmin && (
              <details className="mb-3 rounded-lg border border-slate-200 bg-slate-50 p-3 [&_summary::-webkit-details-marker]:hidden">
                <summary className="cursor-pointer list-none text-xs font-semibold text-orange-600 hover:text-orange-700">
                  + Importer un document fait hors CRM
                </summary>
                <form action={importExternalDocument} className="mt-3 space-y-2">
                  <input type="hidden" name="contactId" value={c.id} />
                  <div className="flex flex-wrap gap-2">
                    <select
                      name="kind"
                      defaultValue="rapport"
                      className="h-9 rounded-lg border border-slate-300 px-2 text-sm outline-none focus:border-orange-500"
                    >
                      <option value="devis">Devis</option>
                      <option value="facture">Facture</option>
                      <option value="rapport">Rapport</option>
                    </select>
                    <input
                      name="objet"
                      placeholder="Objet / titre"
                      className="h-9 flex-1 rounded-lg border border-slate-300 px-2 text-sm outline-none focus:border-orange-500"
                    />
                    <input
                      name="prix"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="€ HT (devis/facture)"
                      className="h-9 w-32 rounded-lg border border-slate-300 px-2 text-sm outline-none focus:border-orange-500"
                    />
                  </div>
                  <input
                    name="file"
                    type="file"
                    accept="application/pdf"
                    className="block w-full text-xs text-slate-500 file:mr-3 file:rounded-md file:border-0 file:bg-slate-200 file:px-3 file:py-1.5 file:text-xs file:font-medium hover:file:bg-slate-300"
                  />
                  <button
                    type="submit"
                    className="h-9 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white hover:bg-orange-700"
                  >
                    Importer dans le dossier
                  </button>
                  <p className="text-[11px] text-slate-400">
                    Le document est rangé dans sa catégorie. Pour devis/facture, le
                    prix porte sur la coordination (le diagnostic reste à 0).
                  </p>
                </form>
              </details>
            )}
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
                      sub={
                        <>
                          {d.object} · <Money value={Number(d.totalHT)} />
                          {d.externalUrl ? (
                            <>
                              {' · '}
                              <a href={d.externalUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                                PDF externe
                              </a>
                            </>
                          ) : null}
                        </>
                      }
                      pill={DEVIS_PILL[d.status]}
                      action={
                        <div className="flex flex-wrap items-center justify-end gap-2">
                          {/* Montant éditable en place (porte sur la coordination) */}
                          <form action={setDevisMontant} className="flex items-center gap-1">
                            <input type="hidden" name="devisId" value={d.id} />
                            <input
                              name="prix"
                              type="number"
                              min="0"
                              step="1"
                              inputMode="numeric"
                              defaultValue={Math.round(Number(d.totalHT))}
                              aria-label={`Montant HT du devis ${d.number}`}
                              className="h-8 w-24 rounded-md border border-slate-300 px-2 text-xs outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
                            />
                            <button
                              type="submit"
                              title="Mettre à jour le montant (coordination)"
                              className="h-8 rounded-md border border-slate-300 px-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                            >
                              € OK
                            </button>
                          </form>
                          {d.status === 'ENVOYE' && (
                            <>
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
                            </>
                          )}
                        </div>
                      }
                    />
                  ))}
                {c.rapports.map((r) => (
                  <DocRow
                    key={r.id}
                    icon={ClipboardCheck}
                    href={`/admin/rapports/${r.id}`}
                    title={`Rapport ${r.number}`}
                    sub={
                      r.externalUrl ? (
                        <>
                          {r.title} ·{' '}
                          <a href={r.externalUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                            PDF externe
                          </a>
                        </>
                      ) : (
                        r.title
                      )
                    }
                    pill={RAPPORT_PILL[r.status]}
                    action={
                      isAdmin && r.status === 'VALIDE' ? (
                        <form action={sendRapport}>
                          <input type="hidden" name="rapportId" value={r.id} />
                          <ConfirmSubmit
                            message="Envoyer le rapport au client par e-mail (PDF joint) ?"
                            className="inline-flex h-8 items-center gap-1 whitespace-nowrap rounded-lg border border-orange-200 bg-orange-50 px-2 text-xs font-semibold text-orange-700 hover:bg-orange-100"
                          >
                            <Send className="h-3.5 w-3.5" /> Envoyer
                          </ConfirmSubmit>
                        </form>
                      ) : undefined
                    }
                  />
                ))}
                {isAdmin &&
                  c.factures.map((f) => (
                    <DocRow
                      key={f.id}
                      icon={Receipt}
                      href={`/admin/factures/${f.id}`}
                      title={`Facture ${f.number}`}
                      sub={
                        <>
                          {f.object} · <Money value={Number(f.totalHT)} />
                          {f.externalUrl ? (
                            <>
                              {' · '}
                              <a href={f.externalUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                                PDF externe
                              </a>
                            </>
                          ) : null}
                        </>
                      }
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
                    action={
                      isAdmin && a.status === 'PLANIFIE' ? (
                        <form action={updateAppointmentStatus}>
                          <input type="hidden" name="appointmentId" value={a.id} />
                          <input type="hidden" name="status" value="REALISE" />
                          <ConfirmSubmit
                            message="Marquer cette visite comme réalisée ? La facture brouillon sera générée pour ce diagnostic."
                            className="inline-flex h-8 items-center gap-1 whitespace-nowrap rounded-lg border border-emerald-200 bg-emerald-50 px-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                          >
                            <Check className="h-3.5 w-3.5" /> Réalisée
                          </ConfirmSubmit>
                        </form>
                      ) : undefined
                    }
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
  sub?: React.ReactNode;
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

