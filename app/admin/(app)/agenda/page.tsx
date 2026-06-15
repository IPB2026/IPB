import Link from 'next/link';
import { CalendarClock, ReceiptText, Plus } from 'lucide-react';
import type { AppointmentStatus, AppointmentType } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState } from '@/components/admin/empty-state';
import { Avatar } from '@/components/admin/avatar';
import { isCalendarConfigured } from '@/lib/google/calendar';
import { AgendaWeek, type WeekAppt } from '@/components/admin/agenda-week';
import { ConfirmSubmit } from '@/components/admin/confirm-submit';

/** Lundi 00:00 de la semaine contenant `d`. */
function startOfWeek(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  const offset = (x.getDay() + 6) % 7; // 0 = lundi
  x.setDate(x.getDate() - offset);
  return x;
}
const ymd = (d: Date) => d.toISOString().slice(0, 10);
import {
  createAppointment,
  updateAppointmentStatus,
  rescheduleAppointment,
  generateInvoiceFromAppointment,
} from '@/app/admin/(app)/agenda/actions';

export const dynamic = 'force-dynamic';

const TYPE_LABEL: Record<AppointmentType, string> = {
  DIAGNOSTIC_FISSURES: 'Diagnostic fissures',
  DIAGNOSTIC_HUMIDITE: 'Diagnostic humidité',
  EXPERTISE_ACHAT: 'Expertise achat',
  MUR_PORTEUR: 'Mur porteur',
  LANCEMENT_TRAVAUX: 'Lancement travaux',
  AUTRE: 'Autre',
};

const STATUS_LABEL: Record<AppointmentStatus, string> = {
  PLANIFIE: 'Planifié',
  CONFIRME: 'Confirmé',
  REALISE: 'Réalisé',
  ANNULE: 'Annulé',
};
const STATUS_PILL: Record<AppointmentStatus, string> = {
  PLANIFIE: 'bg-blue-50 text-blue-700 ring-blue-600/10',
  CONFIRME: 'bg-violet-50 text-violet-700 ring-violet-600/10',
  REALISE: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  ANNULE: 'bg-slate-100 text-slate-500 ring-slate-500/10',
};

const field =
  'h-10 w-full rounded-lg border border-slate-300 px-3 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200';

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: {
    contactId?: string;
    type?: string;
    leadId?: string;
    devisId?: string;
    vue?: string;
    semaine?: string;
  };
}) {
  await guardAdminPage();
  const prefill = {
    contactId: searchParams.contactId ?? '',
    type:
      searchParams.type && searchParams.type in TYPE_LABEL
        ? (searchParams.type as AppointmentType)
        : 'DIAGNOSTIC_FISSURES',
    leadId: searchParams.leadId ?? '',
    devisId: searchParams.devisId ?? '',
  };
  let appts: Awaited<ReturnType<typeof loadAppts>> = [];
  let contacts: { id: string; name: string; city: string | null }[] = [];
  let dbError = false;
  try {
    [appts, contacts] = await Promise.all([
      loadAppts(),
      prisma.contact.findMany({
        orderBy: { createdAt: 'desc' },
        take: 300,
        select: { id: true, name: true, city: true },
      }),
    ]);
  } catch {
    dbError = true;
  }

  // Regroupe par jour
  const groups = new Map<string, typeof appts>();
  for (const a of appts) {
    const key = a.start.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(a);
  }

  // Vue « semaine » (lecture seule)
  const isWeek = searchParams.vue === 'semaine';
  const weekStart = startOfWeek(
    searchParams.semaine ? new Date(searchParams.semaine) : new Date()
  );
  let weekAppts: WeekAppt[] = [];
  if (isWeek && !dbError) {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);
    try {
      const rows = await prisma.appointment.findMany({
        where: { start: { gte: weekStart, lt: weekEnd }, status: { not: 'ANNULE' } },
        orderBy: { start: 'asc' },
        include: { contact: { select: { name: true } } },
      });
      weekAppts = rows.map((a) => ({
        id: a.id,
        start: a.start,
        title: a.title,
        contactName: a.contact.name,
        type: a.type,
        status: a.status,
      }));
    } catch {
      /* dbError déjà géré */
    }
  }
  const prevWeek = new Date(weekStart);
  prevWeek.setDate(weekStart.getDate() - 7);
  const nextWeek = new Date(weekStart);
  nextWeek.setDate(weekStart.getDate() + 7);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Agenda"
        subtitle="Rendez-vous de diagnostic et interventions."
      />

      {isCalendarConfigured() ? (
        <p className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs text-emerald-800">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Google Agenda connecté : chaque RDV est synchronisé et le client reçoit
          une invitation automatique (modification et annulation incluses).
        </p>
      ) : (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800">
          Google Agenda non connecté : les RDV sont enregistrés en interne. La
          synchronisation et les invitations automatiques s'activeront une fois
          les identifiants Google fournis.
        </p>
      )}

      {/* Nouveau RDV — repliable (ouvert si on arrive avec un pré-remplissage) */}
      <details
        open={Boolean(prefill.contactId)}
        className="group overflow-hidden rounded-xl border border-slate-200 bg-white [&_summary::-webkit-details-marker]:hidden"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3.5 text-sm font-semibold text-slate-900">
          Nouveau rendez-vous
          <Plus className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-45" />
        </summary>
        <div className="border-t border-slate-100 p-5">
        {contacts.length === 0 ? (
          <p className="text-sm text-slate-500">
            Créez d'abord un prospect pour planifier un RDV.
          </p>
        ) : (
          <form action={createAppointment} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {prefill.leadId && (
              <input type="hidden" name="leadId" value={prefill.leadId} />
            )}
            {prefill.devisId && (
              <input type="hidden" name="devisId" value={prefill.devisId} />
            )}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Client
              </label>
              <select
                name="contactId"
                required
                defaultValue={prefill.contactId}
                className={field}
              >
                <option value="" disabled>
                  Choisir un prospect…
                </option>
                {contacts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                    {c.city ? ` — ${c.city}` : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Type
              </label>
              <select name="type" defaultValue={prefill.type} className={field}>
                {Object.entries(TYPE_LABEL).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Date et heure
              </label>
              <input type="datetime-local" name="start" step={1800} required className={field} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Durée (min)
              </label>
              <input
                type="number"
                name="durationMin"
                defaultValue={60}
                min={15}
                step={15}
                className={field}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Lieu
              </label>
              <input
                name="location"
                placeholder="Adresse du bien"
                className={field}
              />
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
              >
                Planifier le RDV
              </button>
            </div>
          </form>
        )}
        </div>
      </details>

      {/* Bascule Liste / Semaine */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5">
          <Link
            href="/admin/agenda"
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              !isWeek ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Liste
          </Link>
          <Link
            href="/admin/agenda?vue=semaine"
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              isWeek ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Semaine
          </Link>
        </div>
        {isWeek && (
          <div className="ml-auto flex items-center gap-2 text-sm">
            <Link
              href={`/admin/agenda?vue=semaine&semaine=${ymd(prevWeek)}`}
              className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-slate-600 hover:bg-slate-50"
              aria-label="Semaine précédente"
            >
              ←
            </Link>
            <span className="font-medium tabular-nums text-slate-700">
              Sem. du {weekStart.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
            </span>
            <Link
              href={`/admin/agenda?vue=semaine&semaine=${ymd(nextWeek)}`}
              className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-slate-600 hover:bg-slate-50"
              aria-label="Semaine suivante"
            >
              →
            </Link>
          </div>
        )}
      </div>

      {isWeek ? (
        <AgendaWeek weekStart={weekStart} appts={weekAppts} />
      ) : dbError || appts.length === 0 ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <EmptyState
            icon={CalendarClock}
            title="Aucun rendez-vous à venir"
            description="Planifiez un RDV ci-dessus ou depuis une fiche prospect."
          />
        </div>
      ) : (
        <div className="space-y-5">
          {[...groups.entries()].map(([day, items]) => (
            <div key={day}>
              <h3 className="mb-2 text-sm font-semibold capitalize text-slate-900">
                {day}
              </h3>
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <ul className="divide-y divide-slate-100">
                  {items.map((a) => (
                    <li key={a.id} className="px-4 py-3.5 sm:px-5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <span className="w-11 shrink-0 text-sm font-semibold tabular-nums text-slate-900">
                          {a.start.toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        <Avatar name={a.contact.name} size="sm" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-slate-900">{a.title}</p>
                          <p className="truncate text-xs text-slate-400">
                            {a.contact.name}
                            {a.location ? ` · ${a.location}` : ''}
                          </p>
                          {isCalendarConfigured() && (
                            <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[11px] font-medium">
                              {a.googleEventId ? (
                                <span className="text-emerald-600">✓ Dans l&apos;agenda Google</span>
                              ) : (
                                <span className="text-amber-600">Non synchronisé</span>
                              )}
                              {a.googleEventId &&
                                (a.contact.email ? (
                                  <span className="text-emerald-600">· ✓ Invitation envoyée</span>
                                ) : (
                                  <span className="text-slate-400">· client sans e-mail</span>
                                ))}
                            </p>
                          )}
                        </div>
                        <span
                          className={`inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_PILL[a.status]}`}
                        >
                          {STATUS_LABEL[a.status]}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                        <form
                          action={updateAppointmentStatus}
                          className="flex items-center gap-1"
                        >
                          <input type="hidden" name="appointmentId" value={a.id} />
                          <select
                            name="status"
                            defaultValue={a.status}
                            className="h-10 sm:h-9 rounded-lg border border-slate-300 px-2 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                          >
                            {Object.entries(STATUS_LABEL).map(([v, l]) => (
                              <option key={v} value={v}>
                                {l}
                              </option>
                            ))}
                          </select>
                          <button
                            type="submit"
                            className="h-9 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                          >
                            OK
                          </button>
                        </form>
                        {a.factureId ? (
                          <Link
                            href={`/admin/factures/${a.factureId}`}
                            className="inline-flex h-9 items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-3 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
                          >
                            <ReceiptText className="h-4 w-4" /> Facture
                          </Link>
                        ) : (
                          <form action={generateInvoiceFromAppointment}>
                            <input type="hidden" name="appointmentId" value={a.id} />
                            <button
                              type="submit"
                              className="h-10 sm:h-9 rounded-lg border border-orange-200 bg-orange-50 px-3 text-sm font-medium text-orange-700 hover:bg-orange-100"
                            >
                              Facturer
                            </button>
                          </form>
                        )}
                        {a.status !== 'ANNULE' && (
                          <form action={updateAppointmentStatus}>
                            <input type="hidden" name="appointmentId" value={a.id} />
                            <input type="hidden" name="status" value="ANNULE" />
                            <ConfirmSubmit
                              message="Annuler ce rendez-vous ? Il sera retiré de l'agenda Google et le client sera prévenu."
                              className="h-10 sm:h-9 rounded-lg border border-red-200 bg-red-50 px-3 text-sm font-medium text-red-700 hover:bg-red-100"
                            >
                              Annuler
                            </ConfirmSubmit>
                          </form>
                        )}
                      </div>
                      </div>
                      <details className="mt-2 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="cursor-pointer list-none text-xs font-medium text-slate-400 hover:text-slate-700">
                          Décaler le RDV
                        </summary>
                        <form
                          action={rescheduleAppointment}
                          className="mt-2 flex flex-wrap items-end gap-2"
                        >
                          <input type="hidden" name="appointmentId" value={a.id} />
                          <input
                            type="datetime-local"
                            name="start"
                            step={1800}
                            required
                            className="h-10 sm:h-9 rounded-lg border border-slate-300 px-2 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                          />
                          <input
                            type="number"
                            name="durationMin"
                            defaultValue={60}
                            min={15}
                            step={15}
                            className="h-10 sm:h-9 w-20 rounded-lg border border-slate-300 px-2 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                          />
                          <input
                            name="location"
                            placeholder="Lieu"
                            defaultValue={a.location ?? ''}
                            className="h-10 sm:h-9 min-w-0 flex-1 rounded-lg border border-slate-300 px-2 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                          />
                          <button
                            type="submit"
                            className="h-9 rounded-lg bg-slate-900 px-3 text-sm font-semibold text-white hover:bg-slate-800"
                          >
                            Décaler
                          </button>
                        </form>
                      </details>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function loadAppts() {
  // Vue « Liste » = ce qui arrive. On part du début de la journée (un RDV du
  // matin reste visible) et on remonte les prochains en premier. Les RDV passés
  // restent consultables via la vue Semaine / l'historique de chaque fiche.
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  return prisma.appointment.findMany({
    where: { start: { gte: startOfToday } },
    orderBy: { start: 'asc' },
    take: 100,
    include: { contact: true },
  });
}
