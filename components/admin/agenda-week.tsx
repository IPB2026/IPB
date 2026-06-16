import Link from 'next/link';
import type { AppointmentStatus, AppointmentType } from '@prisma/client';

/**
 * Vue agenda « semaine » — 7 jours en colonnes (desktop) ou empilés (mobile),
 * chaque RDV en pastille compacte cliquable (→ fiche client). Les actions
 * (statut, re-planification, facturation) restent dans la vue « Liste ».
 */

export interface WeekAppt {
  id: string;
  start: Date;
  title: string;
  contactName: string;
  contactId: string;
  type: AppointmentType;
  status: AppointmentStatus;
}

const STATUS_DOT: Record<AppointmentStatus, string> = {
  PLANIFIE: 'bg-blue-500',
  CONFIRME: 'bg-violet-500',
  REALISE: 'bg-emerald-500',
  ANNULE: 'bg-slate-300',
};

const DAY_NAMES = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export function AgendaWeek({
  weekStart,
  appts,
}: {
  weekStart: Date;
  appts: WeekAppt[];
}) {
  const today = new Date();
  const isToday = (d: Date) =>
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();

  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    const dayAppts = appts
      .filter((a) => {
        const s = a.start;
        return (
          s.getDate() === date.getDate() &&
          s.getMonth() === date.getMonth() &&
          s.getFullYear() === date.getFullYear()
        );
      })
      .sort((a, b) => a.start.getTime() - b.start.getTime());
    return { date, dayAppts, label: DAY_NAMES[i] };
  });

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-7">
      {days.map(({ date, dayAppts, label }, i) => (
        <div
          key={i}
          className={`rounded-xl border bg-white p-3 ${
            isToday(date) ? 'border-orange-300 ring-1 ring-orange-200' : 'border-slate-200'
          }`}
        >
          <div className="mb-2 flex items-baseline justify-between">
            <span
              className={`text-xs font-semibold ${
                isToday(date) ? 'text-orange-600' : 'text-slate-700'
              }`}
            >
              {label}
            </span>
            <span className="text-xs tabular-nums text-slate-400">
              {date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
            </span>
          </div>
          {dayAppts.length === 0 ? (
            <p className="py-1 text-xs text-slate-300">—</p>
          ) : (
            <ul className="space-y-1.5">
              {dayAppts.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/admin/clients/${a.contactId}`}
                    className="block rounded-lg bg-slate-50 px-2 py-1.5 text-xs hover:bg-slate-100"
                  >
                    <span className="flex items-center gap-1.5 font-semibold tabular-nums text-slate-800">
                      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[a.status]}`} />
                      {a.start.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span className="mt-0.5 block truncate text-slate-600">
                      {a.contactName}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
