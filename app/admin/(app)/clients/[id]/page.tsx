import Link from 'next/link';
import { notFound } from 'next/navigation';
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
} from 'lucide-react';
import type {
  DevisStatus,
  FactureStatus,
  ReportStatus,
  AppointmentStatus,
} from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { euros } from '@/lib/crm/company';
import { computeDossier } from '@/lib/crm/dossier';
import { Avatar } from '@/components/admin/avatar';
import { ContactEditForm } from '@/components/admin/contact-edit-form';

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
  await guardAdminPage();

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
        rapports: { orderBy: { createdAt: 'desc' } },
        appointments: { orderBy: { start: 'desc' } },
        activities: { orderBy: { createdAt: 'desc' }, take: 12 },
      },
    })
    .catch(() => null);

  if (!c) notFound();

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

  const lead = c.leads[0] ?? null;
  const next = nextStep(dossier, c.id, lead?.id);
  const diagnostiqueur = lead?.assignedTo?.name || lead?.assignedTo?.email || '—';
  const adresse =
    [c.address, [c.postalCode, c.city].filter(Boolean).join(' ')]
      .filter(Boolean)
      .join(', ') || '—';

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/admin/clients"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Tous les clients
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
            </div>
            <p className="mt-0.5 text-sm text-slate-500">
              {[c.city, dossier.clientSince ? `client depuis ${dossier.clientSince.toLocaleDateString('fr-FR')}` : null]
                .filter(Boolean)
                .join(' · ') || 'Fiche client'}
            </p>
          </div>
          <div className="flex gap-2">
            {c.phone && (
              <a
                href={`tel:${c.phone}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Phone className="h-4 w-4" /> Appeler
              </a>
            )}
            {c.email && (
              <a
                href={`mailto:${c.email}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-700"
              >
                <Mail className="h-4 w-4" /> Écrire
              </a>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          <Metric label="Diagnostiqueur" value={diagnostiqueur} />
          <Metric
            label="Montant dossier"
            value={dossier.montant != null ? euros(dossier.montant) : '—'}
          />
          <Metric
            label="Travaux"
            value={dossier.travauxAPlanifier ? 'À planifier' : '—'}
            tone={dossier.travauxAPlanifier ? 'text-orange-600' : 'text-slate-800'}
          />
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

      {/* Prochaine étape — fil conducteur du dossier */}
      {next && (
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
            {c.devis.length + c.factures.length + c.rapports.length + c.appointments.length === 0 ? (
              <p className="text-sm text-slate-500">Aucun document pour ce dossier.</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {c.devis.map((d) => (
                  <DocRow
                    key={d.id}
                    icon={FileText}
                    href={`/admin/devis/${d.id}`}
                    title={`Devis ${d.number}`}
                    sub={`${d.object} · ${euros(Number(d.totalHT))}`}
                    pill={DEVIS_PILL[d.status]}
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
                {c.factures.map((f) => (
                  <DocRow
                    key={f.id}
                    icon={Receipt}
                    href={`/admin/factures/${f.id}`}
                    title={`Facture ${f.number}`}
                    sub={`${f.object} · ${euros(Number(f.totalHT))}`}
                    pill={FACTURE_PILL[f.status]}
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

      {/* Historique */}
      <Card title="Historique">
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
      </Card>
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
        title: 'Suivi client — décision travaux',
        desc: "Le rapport est remis. S'il veut engager les travaux, émettez le devis d'accompagnement.",
        label: 'Créer le devis travaux',
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
}: {
  icon: typeof FileText;
  href: string;
  title: string;
  sub?: string | null;
  pill: [string, string];
}) {
  return (
    <li>
      <Link href={href} className="flex items-center gap-3 py-2.5 hover:opacity-80">
        <Icon className="h-[18px] w-[18px] shrink-0 text-slate-500" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-800">{title}</p>
          {sub ? <p className="truncate text-xs text-slate-400">{sub}</p> : null}
        </div>
        <Pill tone={pill[1]}>{pill[0]}</Pill>
      </Link>
    </li>
  );
}
