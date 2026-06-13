import Link from 'next/link';
import { CalendarClock, ReceiptText } from 'lucide-react';
import type { AppointmentStatus, AppointmentType } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState } from '@/components/admin/empty-state';
import { Avatar } from '@/components/admin/avatar';
import { isCalendarConfigured } from '@/lib/google/calendar';
import {
  createAppointment,
  updateAppointmentStatus,
  generateInvoiceFromAppointment,
} from '@/app/admin/(app)/agenda/actions';

export const dynamic = 'force-dynamic';

const TYPE_LABEL: Record<AppointmentType, string> = {
  DIAGNOSTIC_FISSURES: 'Diagnostic fissures',
  DIAGNOSTIC_HUMIDITE: 'Diagnostic humidité',
  EXPERTISE_ACHAT: 'Expertise achat',
  MUR_PORTEUR: 'Mur porteur',
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
  'h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200';

export default async function AgendaPage() {
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Agenda"
        subtitle="Rendez-vous de diagnostic et interventions."
      />

      {!isCalendarConfigured() && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800">
          Google Agenda non connecté : les RDV sont enregistrés en interne. La
          synchronisation et les invitations automatiques s'activeront une fois
          les identifiants Google fournis.
        </p>
      )}

      {/* Nouveau RDV */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Nouveau rendez-vous
        </h2>
        {contacts.length === 0 ? (
          <p className="text-sm text-slate-500">
            Créez d'abord un prospect pour planifier un RDV.
          </p>
        ) : (
          <form action={createAppointment} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Client
              </label>
              <select name="contactId" required defaultValue="" className={field}>
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
              <select name="type" defaultValue="DIAGNOSTIC_FISSURES" className={field}>
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
              <input type="datetime-local" name="start" required className={field} />
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
      </section>

      {/* Liste */}
      {dbError || appts.length === 0 ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <EmptyState
            icon={CalendarClock}
            title="Aucun rendez-vous"
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
                    <li key={a.id} className="flex flex-wrap items-center gap-3 px-5 py-3">
                      <span className="w-12 shrink-0 text-sm font-semibold tabular-nums text-slate-900">
                        {a.start.toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <Avatar name={a.contact.name} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-slate-900">{a.title}</p>
                        <p className="text-xs text-slate-400">
                          {a.contact.name}
                          {a.location ? ` · ${a.location}` : ''} ·{' '}
                          {TYPE_LABEL[a.type]}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_PILL[a.status]}`}
                      >
                        {STATUS_LABEL[a.status]}
                      </span>
                      <form action={updateAppointmentStatus} className="shrink-0">
                        <input type="hidden" name="appointmentId" value={a.id} />
                        <select
                          name="status"
                          defaultValue={a.status}
                          className="h-8 rounded-md border border-slate-300 px-2 text-xs outline-none focus:border-orange-500"
                        >
                          {Object.entries(STATUS_LABEL).map(([v, l]) => (
                            <option key={v} value={v}>
                              {l}
                            </option>
                          ))}
                        </select>
                        <button
                          type="submit"
                          className="ml-1 rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
                        >
                          OK
                        </button>
                      </form>
                      {a.factureId ? (
                        <Link
                          href={`/admin/factures/${a.factureId}`}
                          className="inline-flex shrink-0 items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                        >
                          <ReceiptText className="h-3.5 w-3.5" /> Facture
                        </Link>
                      ) : (
                        <form action={generateInvoiceFromAppointment} className="shrink-0">
                          <input type="hidden" name="appointmentId" value={a.id} />
                          <button
                            type="submit"
                            className="rounded-md border border-orange-200 bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 hover:bg-orange-100"
                          >
                            Générer la facture
                          </button>
                        </form>
                      )}
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
  return prisma.appointment.findMany({
    orderBy: { start: 'asc' },
    take: 100,
    include: { contact: true },
  });
}
