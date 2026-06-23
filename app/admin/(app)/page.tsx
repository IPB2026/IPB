import Link from 'next/link';
import {
  Users,
  UserCheck,
  Clock,
  Inbox,
  Plus,
  Columns3,
  CalendarClock,
  Sparkles,
  ClipboardCheck,
  FileText,
  Receipt,
  ArrowRight,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import { Prisma } from '@prisma/client';
import { Money } from '@/components/admin/money';
import { DIAGNOSTIC_VISIT_TYPES } from '@/lib/crm/dossier';
import { CLIENT_CONTACT_WHERE } from '@/lib/crm/client-status';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { StatCard } from '@/components/admin/stat-card';
import { EmptyState } from '@/components/admin/empty-state';
import { Avatar } from '@/components/admin/avatar';
import { MobileCardRow } from '@/components/admin/mobile-card';
import { completeRelance } from '@/app/admin/(app)/leads/actions';
import { updateAppointmentStatus } from '@/app/admin/(app)/agenda/actions';
import { SubmitButton } from '@/components/admin/submit-button';
import {
  PhaseBadge,
  SOURCE_LABEL,
  SERVICE_LABEL,
} from '@/components/admin/badges';
import { computeDossier } from '@/lib/crm/dossier';
import { closeResolvedRelances } from '@/lib/crm/relances-cleanup';

export const dynamic = 'force-dynamic';

/**
 * Phase RÉELLE du dossier d'un prospect récent (source unique `computeDossier`),
 * pour que le tableau de bord affiche la même étape que la fiche et le pipeline.
 */
function recentPhase(lead: {
  stage: string;
  manualPhase?: string | null;
  contact: {
    devis: { status: string; totalHT: unknown; acceptedAt: Date | null; serviceType: string | null }[];
    factures: { status: string }[];
    rapports: { status: string; updatedAt: Date; budgetHT: unknown }[];
    appointments: { type: string; status: string }[];
  };
}): string {
  const c = lead.contact;
  return computeDossier({
    devis: c.devis.map((d) => ({
      status: d.status as never,
      totalHT: Number(d.totalHT),
      acceptedAt: d.acceptedAt,
      serviceType: d.serviceType as never,
    })),
    factures: c.factures.map((f) => ({ status: f.status as never })),
    rapports: c.rapports.map((r) => ({
      status: r.status as never,
      budgetHT: r.budgetHT != null ? Number(r.budgetHT) : null,
    })),
    appointments: c.appointments.map((a) => ({ type: a.type as never, status: a.status as never })),
    stage: lead.stage,
    manualPhase: lead.manualPhase ?? null,
    rapportEnvoyeAt: c.rapports.find((r) => r.status === 'ENVOYE')?.updatedAt ?? null,
  }).phase;
}

async function getStats() {
  const now = new Date();
  // Cohérence d'abord : on referme les relances dont le motif est déjà résolu
  // (rapport transmis, devis tranché) → le tableau de bord ne montre que des tâches
  // réellement en phase avec le statut des clients.
  await closeResolvedRelances();
  // Filtre PARTAGÉ « visite à planifier » (devis diagnostic accepté, client sans
  // visite diagnostic ni facture émise) — un seul point de vérité pour la liste
  // ET le compteur (plus de risque de divergence, et logique définie une fois).
  const visiteAPlanifierWhere: Prisma.DevisWhereInput = {
    status: 'ACCEPTE',
    // Devis « diagnostic » = tout sauf AUTRE (sentinelle travaux), sur-mesure
    // (serviceType null) INCLUS : en SQL, { not: 'AUTRE' } exclut les NULL, d'où
    // le OR — sinon un devis sur-mesure accepté n'apparaîtrait jamais ici.
    OR: [{ serviceType: { not: 'AUTRE' } }, { serviceType: null }],
    contact: {
      appointments: {
        none: {
          type: {
            in: [...DIAGNOSTIC_VISIT_TYPES],
          },
        },
      },
      factures: { none: { status: { in: ['ENVOYEE', 'PAYEE'] } } },
    },
  };
  // Cockpit d'alertes : RDV diagnostic dont la visite est passée mais jamais
  // clôturée (→ la facture J+1 ne partira jamais), et devis envoyés restés sans
  // réponse depuis > 14 jours (à relancer ou à classer perdu).
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const il14j = new Date(now.getTime() - 14 * 86_400_000);
  // « Devis sans réponse » : daté sur sentAt (date d'envoi FIABLE, non bumpée par
  // l'incrément relanceCount du cron) ; repli updatedAt pour les devis legacy.
  const sansReponseWhere: Prisma.DevisWhereInput = {
    status: 'ENVOYE',
    OR: [
      { sentAt: { lt: il14j } },
      { AND: [{ sentAt: null }, { updatedAt: { lt: il14j } }] },
    ],
  };
  const [
    total,
    clients,
    nouveaux,
    recent,
    relancesDues,
    relances,
    aPlanifier,
    rapportsSoumis,
    rapportsAValider,
    facturesImpayees,
    devisEnAttente,
    rapportsSoumisCount,
    rapportsAValiderCount,
    facturesImpayeesCount,
    aPlanifierCount,
    facturesAEnvoyer,
    facturesAEnvoyerCount,
    rdvACloturer,
    rdvACloturerCount,
    devisSansReponse,
    devisSansReponseCount,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.contact.count({
      where: { archivedAt: null, ...CLIENT_CONTACT_WHERE },
    }),
    prisma.lead.count({ where: { stage: 'NOUVEAU' } }),
    prisma.lead.findMany({
      take: 8,
      where: { contact: { archivedAt: null } },
      orderBy: { createdAt: 'desc' },
      // On charge les artefacts du dossier pour afficher la PHASE réelle
      // (source unique) au lieu de l'étape brute → cohérence dashboard ↔ fiche.
      include: {
        contact: {
          include: {
            devis: { select: { status: true, totalHT: true, acceptedAt: true, serviceType: true } },
            factures: { select: { status: true } },
            rapports: { select: { status: true, updatedAt: true, budgetHT: true } },
            appointments: { select: { type: true, status: true } },
          },
        },
      },
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
    // Devis diagnostic acceptés dont le client n'a PAS encore de visite planifiée
    // → étape normale du cycle (≠ travaux, qui sont exceptionnels).
    prisma.devis.findMany({
      where: visiteAPlanifierWhere,
      orderBy: { acceptedAt: 'desc' },
      take: 8,
      include: { contact: true },
    }),
    // Rapports soumis par les diagnostiqueurs → à générer. EXCLUT les clients qui
    // ont DÉJÀ un rapport transmis (brouillon résiduel = ne doit plus apparaître
    // « à faire » alors que le client est servi).
    prisma.rapport.findMany({
      where: { status: 'SOUMIS', contact: { rapports: { none: { status: 'ENVOYE' } } } },
      orderBy: { updatedAt: 'desc' },
      take: 8,
      include: { contact: true },
    }),
    // Rapports générés → à valider et envoyer (même exclusion : client déjà servi).
    prisma.rapport.findMany({
      where: { status: 'GENERE', contact: { rapports: { none: { status: 'ENVOYE' } } } },
      orderBy: { updatedAt: 'desc' },
      take: 8,
      include: { contact: true },
    }),
    // Factures envoyées non payées
    prisma.facture.findMany({
      where: { status: 'ENVOYEE' },
      orderBy: { createdAt: 'asc' },
      take: 8,
      include: { contact: true },
    }),
    // Devis envoyés en attente d'acceptation
    prisma.devis.count({ where: { status: 'ENVOYE' } }),
    // Compteurs réels (les listes ci-dessus sont plafonnées à 8 pour l'affichage)
    prisma.rapport.count({ where: { status: 'SOUMIS', contact: { rapports: { none: { status: 'ENVOYE' } } } } }),
    prisma.rapport.count({ where: { status: 'GENERE', contact: { rapports: { none: { status: 'ENVOYE' } } } } }),
    prisma.facture.count({ where: { status: 'ENVOYEE' } }),
    prisma.devis.count({ where: visiteAPlanifierWhere }),
    // Factures en BROUILLON (générées après la visite, à relire et envoyer).
    prisma.facture.findMany({
      where: { status: 'BROUILLON' },
      orderBy: { createdAt: 'asc' },
      take: 8,
      include: { contact: true },
    }),
    prisma.facture.count({ where: { status: 'BROUILLON' } }),
    // Visites diagnostic passées non clôturées (statut PLANIFIE, date dépassée) :
    // tant qu'elles ne sont pas « réalisées », la facturation J+1 ne se déclenche
    // pas. On les fait remonter pour un passage en « réalisée » en 1 clic.
    prisma.appointment.findMany({
      where: {
        status: 'PLANIFIE',
        start: { lt: startOfToday },
        type: { in: [...DIAGNOSTIC_VISIT_TYPES] },
      },
      orderBy: { start: 'asc' },
      take: 8,
      include: { contact: true },
    }),
    prisma.appointment.count({
      where: {
        status: 'PLANIFIE',
        start: { lt: startOfToday },
        type: { in: [...DIAGNOSTIC_VISIT_TYPES] },
      },
    }),
    // Devis envoyés restés sans réponse depuis > 14 j → à relancer ou classer.
    prisma.devis.findMany({
      where: sansReponseWhere,
      orderBy: { updatedAt: 'asc' },
      take: 8,
      include: { contact: true },
    }),
    prisma.devis.count({ where: sansReponseWhere }),
  ]);

  return {
    total,
    clients,
    nouveaux,
    relancesDues,
    recent,
    relances,
    aPlanifier,
    rapportsSoumis,
    rapportsAValider,
    facturesImpayees,
    devisEnAttente,
    rapportsSoumisCount,
    rapportsAValiderCount,
    facturesImpayeesCount,
    aPlanifierCount,
    facturesAEnvoyer,
    facturesAEnvoyerCount,
    rdvACloturer,
    rdvACloturerCount,
    devisSansReponse,
    devisSansReponseCount,
  };
}

// Type de RDV de visite selon le diagnostic du devis accepté.
const VISIT_TYPE: Record<string, string> = {
  FISSURES: 'DIAGNOSTIC_FISSURES',
  HUMIDITE: 'DIAGNOSTIC_HUMIDITE',
  EXPERTISE_ACHAT: 'EXPERTISE_ACHAT',
  MUR_PORTEUR: 'MUR_PORTEUR',
};

const headerActions = (
  <>
    <Link
      href="/admin/pipeline"
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
    >
      <Columns3 className="h-4 w-4" />
      Pipeline
    </Link>
    <Link
      href="/admin/leads/nouveau"
      className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-orange-700"
    >
      <Plus className="h-4 w-4" />
      Nouveau prospect
    </Link>
  </>
);

export default async function DashboardPage() {
  await guardAdminPage();
  let stats: Awaited<ReturnType<typeof getStats>> | null = null;
  try {
    stats = await getStats();
  } catch (e) {
    // On loggue la VRAIE erreur (visible dans les logs Vercel) au lieu de l'avaler.
    console.error('[dashboard] connexion/chargement base échoué :', e);
    stats = null;
  }

  if (!stats) {
    return (
      <div className="space-y-6">
        <PageHeader title="Tableau de bord" />
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <p className="font-semibold text-amber-900">
            Base de données momentanément indisponible
          </p>
          <p className="mt-1 text-sm text-amber-800">
            La connexion à la base n&apos;a pas abouti. Réessayez dans un instant —
            c&apos;est souvent temporaire (réveil de la base).
          </p>
          <a
            href="/admin"
            className="mt-3 inline-flex h-9 items-center rounded-lg bg-amber-600 px-4 text-sm font-semibold text-white hover:bg-amber-700"
          >
            Réessayer
          </a>
          <p className="mt-3 text-xs text-amber-700/80">
            Si le problème persiste : vérifiez la variable{' '}
            <code className="rounded bg-amber-100 px-1">DATABASE_URL</code> sur
            Vercel (connexion Neon « pooled », <strong>sans</strong>{' '}
            <code className="rounded bg-amber-100 px-1">channel_binding</code>).
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
        actions={headerActions}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Prospects" value={stats.total} icon={Users} href="/admin/clients?etat=prospects" />
        <StatCard
          label="Nouveaux à traiter"
          value={stats.nouveaux}
          icon={Inbox}
          tone="orange"
          href="/admin/clients"
        />
        <StatCard
          label="Relances dues"
          value={stats.relancesDues}
          icon={Clock}
          tone="amber"
          href="/admin/clients"
        />
        <StatCard label="Clients" value={stats.clients} icon={UserCheck} tone="blue" href="/admin/clients?etat=clients" />
      </div>

      {/* Centre de pilotage : à traiter */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-900">À traiter</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          <ActionTile href="/admin/rapports" count={stats.rapportsSoumisCount} label="Rapports à générer" icon={Sparkles} tone="amber" />
          <ActionTile href="/admin/rapports" count={stats.rapportsAValiderCount} label="Rapports à valider" icon={ClipboardCheck} tone="blue" />
          <ActionTile href="/admin/devis" count={stats.devisEnAttente} label="Devis en attente" icon={FileText} tone="slate" />
          <ActionTile href="/admin/factures" count={stats.facturesAEnvoyerCount} label="Factures à envoyer" icon={Receipt} tone="orange" />
          <ActionTile href="/admin/factures" count={stats.facturesImpayeesCount} label="Factures impayées" icon={Receipt} tone="red" />
          <ActionTile href="/admin/clients" count={stats.relancesDues} label="Relances dues" icon={Clock} tone="amber" />
          <ActionTile href="/admin/devis" count={stats.aPlanifierCount} label="Visites à planifier" icon={CalendarClock} tone="orange" />
        </div>
      </section>

      {/* COCKPIT — Visites à clôturer (visite passée non marquée réalisée :
          bloque la facturation J+1 tant qu'on ne la clôture pas). */}
      {stats.rdvACloturer.length > 0 && (
        <section className="overflow-hidden rounded-xl border border-red-200 bg-white">
          <div className="flex items-center justify-between border-b border-red-200 bg-red-50/50 px-5 py-3.5">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Visites à clôturer</h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Visite passée non marquée « réalisée » — la facture ne se génère pas tant que ce n&apos;est pas fait.
              </p>
            </div>
            <Link href="/admin/agenda" className="text-xs font-medium text-orange-600 hover:underline">
              Agenda →
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {stats.rdvACloturer.map((a) => (
              <li key={a.id} className="flex items-center gap-3 px-5 py-3">
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/admin/clients/${a.contactId}`}
                    className="font-medium text-slate-900 hover:text-orange-600"
                  >
                    {a.contact.name}
                  </Link>
                  <span className="ml-2 text-sm text-slate-500">
                    {a.title} · {a.start.toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <form action={updateAppointmentStatus} className="shrink-0">
                  <input type="hidden" name="appointmentId" value={a.id} />
                  <input type="hidden" name="status" value="REALISE" />
                  <SubmitButton
                    pendingLabel="…"
                    spinner
                    className="h-8 rounded-lg border border-emerald-300 bg-emerald-50 px-2.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Marquer réalisée
                  </SubmitButton>
                </form>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* COCKPIT — Devis sans réponse (>14 j) : à relancer (1 clic sur la fiche)
          ou à classer perdu. */}
      {stats.devisSansReponse.length > 0 && (
        <section className="overflow-hidden rounded-xl border border-amber-200 bg-white">
          <div className="flex items-center justify-between border-b border-amber-200 bg-amber-50/50 px-5 py-3.5">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Devis sans réponse</h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Envoyés depuis plus de 14 jours — à relancer (1 clic sur la fiche) ou à classer perdu.
              </p>
            </div>
            <Link href="/admin/devis" className="text-xs font-medium text-orange-600 hover:underline">
              Tout voir →
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {stats.devisSansReponse.map((d) => (
              <WorkRow
                key={d.id}
                href={`/admin/clients/${d.contactId}`}
                name={d.contact.name}
                detail={<>Devis {d.number} · <Money value={Number(d.totalHT)} /> · envoyé le {(d.sentAt ?? d.updatedAt).toLocaleDateString('fr-FR')}</>}
                action="À relancer"
                tone="bg-amber-50 text-amber-700"
              />
            ))}
          </ul>
        </section>
      )}

      {/* Rapports à traiter (générés par les diagnostiqueurs) */}
      {(stats.rapportsSoumis.length > 0 || stats.rapportsAValider.length > 0) && (
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
            <h2 className="text-sm font-semibold text-slate-900">Rapports à traiter</h2>
            <Link href="/admin/rapports" className="text-xs font-medium text-orange-600 hover:underline">
              Tout voir →
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {stats.rapportsSoumis.map((r) => (
              <WorkRow
                key={r.id}
                href={`/admin/rapports/${r.id}`}
                name={r.contact.name}
                detail={`${r.number} — saisie terrain soumise`}
                action="À générer"
                tone="bg-amber-50 text-amber-700"
              />
            ))}
            {stats.rapportsAValider.map((r) => (
              <WorkRow
                key={r.id}
                href={`/admin/rapports/${r.id}`}
                name={r.contact.name}
                detail={`${r.number} — généré par l'IA`}
                action="À valider"
                tone="bg-blue-50 text-blue-700"
              />
            ))}
          </ul>
        </section>
      )}

      {/* Factures à envoyer (générées en BROUILLON après la visite) */}
      {stats.facturesAEnvoyer.length > 0 && (
        <section className="overflow-hidden rounded-xl border border-orange-200 bg-white">
          <div className="flex items-center justify-between border-b border-orange-200 bg-orange-50/40 px-5 py-3.5">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Factures à envoyer</h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Générées automatiquement après la visite — à relire, puis envoyer en 1 clic.
              </p>
            </div>
            <Link href="/admin/factures" className="text-xs font-medium text-orange-600 hover:underline">
              Tout voir →
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {stats.facturesAEnvoyer.map((f) => (
              <WorkRow
                key={f.id}
                href={`/admin/factures/${f.id}`}
                name={f.contact.name}
                detail={<>{f.number} — <Money value={Number(f.totalHT)} /></>}
                action="À envoyer"
                tone="bg-orange-50 text-orange-700"
              />
            ))}
          </ul>
        </section>
      )}

      {/* Factures impayées */}
      {stats.facturesImpayees.length > 0 && (
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
            <h2 className="text-sm font-semibold text-slate-900">Factures impayées</h2>
            <Link href="/admin/factures" className="text-xs font-medium text-orange-600 hover:underline">
              Tout voir →
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {stats.facturesImpayees.map((f) => (
              <WorkRow
                key={f.id}
                href={`/admin/factures/${f.id}`}
                name={f.contact.name}
                detail={<>{f.number} — <Money value={Number(f.totalHT)} /></>}
                action="En attente"
                tone="bg-red-50 text-red-700"
              />
            ))}
          </ul>
        </section>
      )}

      {stats.aPlanifier.length > 0 && (
        <section className="overflow-hidden rounded-xl border border-orange-200 bg-white">
          <div className="flex items-center gap-2 border-b border-orange-200 bg-orange-50/60 px-5 py-3.5">
            <CalendarClock className="h-4 w-4 text-orange-600" />
            <h2 className="text-sm font-semibold text-slate-900">
              À planifier : visite sur site
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
                    `/admin/agenda?type=${VISIT_TYPE[d.serviceType ?? 'FISSURES'] ?? 'DIAGNOSTIC_FISSURES'}` +
                    `&contactId=${d.contactId}${d.leadId ? `&leadId=${d.leadId}` : ''}`
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
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
            <h2 className="text-sm font-semibold text-slate-900">
              Relances à faire
            </h2>
            <Link href="/admin/clients" className="text-xs font-medium text-orange-600 hover:underline">
              Tous les clients →
            </Link>
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
                        href={`/admin/clients/${r.lead.contactId}`}
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
                  {r.lead?.contact.phone && (
                    <a
                      href={`tel:${r.lead.contact.phone}`}
                      aria-label={`Appeler ${r.lead.contact.name}`}
                      className="inline-flex h-11 w-11 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-md text-orange-600 hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  )}
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
            href="/admin/clients"
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
            actionLabel="Nouveau prospect"
            actionHref="/admin/leads/nouveau"
          />
        ) : (
          <>
            {/* Mobile : cartes */}
            <ul className="divide-y divide-slate-100 md:hidden">
              {stats.recent.map((lead) => (
                <MobileCardRow
                  key={lead.id}
                  href={`/admin/clients/${lead.contactId}`}
                  leading={<Avatar name={lead.contact.name} size="sm" />}
                  title={lead.contact.name}
                  badge={<PhaseBadge phase={recentPhase(lead)} />}
                  lines={[
                    lead.contact.phone || lead.contact.email || '—',
                    SERVICE_LABEL[lead.service],
                  ]}
                  action={
                    lead.contact.phone ? (
                      <a
                        href={`tel:${lead.contact.phone}`}
                        aria-label={`Appeler ${lead.contact.name}`}
                        className="inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-orange-600 active:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                    ) : undefined
                  }
                />
              ))}
            </ul>

            {/* Desktop : tableau */}
            <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-2.5">Contact</th>
                  <th className="px-5 py-2.5">Service</th>
                  <th className="px-5 py-2.5">Source</th>
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
                        href={`/admin/clients/${lead.contactId}`}
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
                      <PhaseBadge phase={recentPhase(lead)} />
                    </td>
                    <td className="px-5 py-3 text-right text-xs tabular-nums text-slate-400">
                      {lead.createdAt.toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

const TILE_TONE: Record<string, string> = {
  amber: 'text-amber-700',
  blue: 'text-blue-700',
  red: 'text-red-700',
  orange: 'text-orange-700',
  slate: 'text-slate-700',
};

// Fond + bordure teintés (légers) quand la tuile demande une action (count > 0),
// pour guider l'œil vers ce qui compte sans surcharger l'écran.
const TILE_ACTIVE: Record<string, string> = {
  amber: 'border-amber-200 bg-amber-50/50 hover:bg-amber-50',
  blue: 'border-blue-200 bg-blue-50/50 hover:bg-blue-50',
  red: 'border-red-200 bg-red-50/50 hover:bg-red-50',
  orange: 'border-orange-200 bg-orange-50/50 hover:bg-orange-50',
  slate: 'border-slate-200 bg-white hover:bg-slate-50',
};

function ActionTile({
  href,
  count,
  label,
  icon: Icon,
  tone,
}: {
  href: string;
  count: number;
  label: string;
  icon: typeof Clock;
  tone: keyof typeof TILE_TONE;
}) {
  const active = count > 0;
  return (
    <Link
      href={href}
      className={`flex flex-col gap-1 rounded-xl border p-3.5 transition-colors ${
        active ? TILE_ACTIVE[tone] : 'border-slate-100 bg-white opacity-60 hover:opacity-100'
      }`}
    >
      <Icon className={`h-[18px] w-[18px] ${active ? TILE_TONE[tone] : 'text-slate-400'}`} />
      <span className={`text-2xl font-semibold tabular-nums ${active ? 'text-slate-900' : 'text-slate-400'}`}>
        {count}
      </span>
      <span className="text-xs leading-tight text-slate-500">{label}</span>
    </Link>
  );
}

function WorkRow({
  href,
  name,
  detail,
  action,
  tone,
}: {
  href: string;
  name: string;
  detail: React.ReactNode;
  action: string;
  tone: string;
}) {
  return (
    <li>
      <Link href={href} className="group flex items-center gap-3 px-5 py-3 hover:bg-slate-50">
        <div className="min-w-0 flex-1">
          <span className="font-medium text-slate-900 group-hover:text-orange-600">{name}</span>
          <span className="ml-2 text-sm text-slate-500">{detail}</span>
        </div>
        <span className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${tone}`}>
          {action}
        </span>
        <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 group-hover:text-orange-500" />
      </Link>
    </li>
  );
}
