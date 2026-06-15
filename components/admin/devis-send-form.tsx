'use client';

import { useState } from 'react';
import { Mail, CalendarClock } from 'lucide-react';
import { sendDevis, sendDevisWithSlots } from '@/app/admin/(app)/send-actions';

type UpcomingAppt = { id: string; label: string };

/**
 * Envoi du devis au client. Deux chemins :
 *  - « Envoyer simplement » : e-mail devis classique.
 *  - « Envoyer + proposer la visite » : ouvre 3 créneaux (datetime-local) que le
 *    client choisit en répondant. Garde-fou côté serveur : ≥ 3 jours + anti-conflit.
 *
 * `minDateTime` (calculé côté serveur = aujourd'hui + 3 j) borne les sélecteurs.
 * `upcoming` rappelle les RDV déjà planifiés pour éviter les chevauchements.
 */
export function DevisSendForm({
  devisId,
  minDateTime,
  upcoming,
}: {
  devisId: string;
  minDateTime: string;
  upcoming: UpcomingAppt[];
}) {
  const [withSlots, setWithSlots] = useState(false);

  if (!withSlots) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setWithSlots(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-700"
        >
          <CalendarClock className="h-4 w-4" />
          Envoyer + proposer la visite
        </button>
        <form action={sendDevis}>
          <input type="hidden" name="devisId" value={devisId} />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Mail className="h-4 w-4" />
            Envoyer simplement
          </button>
        </form>
      </div>
    );
  }

  return (
    <form
      action={sendDevisWithSlots}
      className="w-full rounded-xl border border-orange-200 bg-orange-50/40 p-4"
    >
      <input type="hidden" name="devisId" value={devisId} />
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
        <CalendarClock className="h-4 w-4 text-orange-600" />
        Créneaux proposés pour la visite sur site
      </div>
      <p className="mb-3 text-xs text-slate-500">
        Le client choisit en répondant à l'e-mail. Chaque créneau doit être à au
        moins 3 jours et ne pas chevaucher un rendez-vous existant.
      </p>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <label key={i} className="block">
            <span className="mb-1 block text-xs font-medium text-slate-600">
              Créneau {i + 1}
              {i === 0 ? '' : ' (option.)'}
            </span>
            <input
              type="datetime-local"
              name={`slot${i}`}
              min={minDateTime}
              step={1800}
              required={i === 0}
              className="h-10 w-full rounded-lg border border-slate-300 px-2 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </label>
        ))}
      </div>

      {upcoming.length > 0 && (
        <div className="mt-3 rounded-lg border border-slate-200 bg-white px-3 py-2">
          <div className="mb-1 text-xs font-semibold text-slate-500">
            RDV déjà planifiés (à éviter)
          </div>
          <ul className="space-y-0.5">
            {upcoming.map((a) => (
              <li key={a.id} className="text-xs text-slate-600">
                • {a.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-700"
        >
          <Mail className="h-4 w-4" />
          Envoyer le devis + créneaux
        </button>
        <button
          type="button"
          onClick={() => setWithSlots(false)}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-800"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
