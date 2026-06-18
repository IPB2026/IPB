'use client';

import { useState } from 'react';

const field =
  'h-10 rounded-lg border border-slate-300 px-2 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200';

// Créneaux par tranches de 30 min, 08:00 → 19:00 (aucune minute libre type 14:26).
export const TIME_OPTIONS: string[] = (() => {
  const out: string[] = [];
  for (let h = 8; h <= 19; h++) {
    for (const m of ['00', '30']) {
      if (h === 19 && m === '30') break;
      out.push(`${String(h).padStart(2, '0')}:${m}`);
    }
  }
  return out;
})();

/**
 * Sélecteur de créneau = date + heure par tranches de 30 min. Écrit la valeur
 * combinée « YYYY-MM-DDTHH:mm » dans un input caché `name`, directement
 * exploitable par `new Date()` côté serveur. Partagé par tous les formulaires
 * qui positionnent un horaire (nouveau RDV, proposition de créneaux, devis).
 */
export function SlotPicker({
  name,
  minDate,
  required = false,
  initialDate = '',
  initialTime = '',
}: {
  name: string;
  minDate?: string;
  required?: boolean;
  initialDate?: string;
  initialTime?: string;
}) {
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  return (
    <div className="flex flex-1 flex-wrap gap-2">
      <input
        type="date"
        min={minDate}
        value={date}
        required={required}
        onChange={(e) => setDate(e.target.value)}
        className={`${field} min-w-[9rem] flex-1`}
      />
      <select
        value={time}
        required={required}
        onChange={(e) => setTime(e.target.value)}
        className={`${field} w-28`}
      >
        <option value="">Heure…</option>
        {TIME_OPTIONS.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <input type="hidden" name={name} value={date && time ? `${date}T${time}` : ''} />
    </div>
  );
}
