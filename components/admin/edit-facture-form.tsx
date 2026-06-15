'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { updateFacture } from '@/app/admin/(app)/factures/actions';

const field =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200';
const label = 'mb-1 block text-sm font-medium text-slate-700';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
    >
      {pending ? 'Enregistrement…' : 'Enregistrer les modifications'}
    </button>
  );
}

export function EditFactureForm({
  factureId,
  object,
  montant,
  dueDate,
}: {
  factureId: string;
  object: string;
  montant: number;
  /** Échéance au format YYYY-MM-DD (vide si absente). */
  dueDate: string;
}) {
  const [error, formAction] = useFormState(updateFacture, undefined);
  const [m, setM] = useState(montant);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="factureId" value={factureId} />
      <div>
        <label className={label} htmlFor="ef-object">
          Objet de la facture
        </label>
        <input
          id="ef-object"
          name="object"
          defaultValue={object}
          className={field}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="ef-montant">
            Montant (€ HT)
          </label>
          <input
            id="ef-montant"
            name="montant"
            type="number"
            min={1}
            step="10"
            value={m}
            onChange={(e) => setM(Number(e.target.value))}
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="ef-due">
            Échéance
          </label>
          <input
            id="ef-due"
            name="dueDate"
            type="date"
            defaultValue={dueDate}
            className={field}
          />
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <Submit />
    </form>
  );
}
