'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createFacture } from '@/app/admin/(app)/factures/actions';

const field =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-base outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 sm:text-sm';
const label = 'mb-1 block text-sm font-medium text-slate-700';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-60"
    >
      {pending ? 'Création…' : 'Créer la facture'}
    </button>
  );
}

export function NewFactureForm({
  contacts,
  defaultContactId,
}: {
  contacts: { id: string; name: string; city: string | null }[];
  defaultContactId?: string;
}) {
  const [error, formAction] = useFormState(createFacture, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="contactId">
            Client <span className="text-orange-600">*</span>
          </label>
          <select
            id="contactId"
            name="contactId"
            required
            defaultValue={defaultContactId ?? ''}
            className={field}
          >
            <option value="" disabled>
              Choisir un client…
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
          <label className={label} htmlFor="dueDate">
            Échéance
          </label>
          <input id="dueDate" name="dueDate" type="date" className={field} />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="object">
          Objet de la facture <span className="text-orange-600">*</span>
        </label>
        <input
          id="object"
          name="object"
          required
          placeholder="Ex. Diagnostic des pathologies de fissures"
          className={field}
        />
      </div>

      <div>
        <label className={label} htmlFor="montant">
          Montant (€ HT) <span className="text-orange-600">*</span>
        </label>
        <input
          id="montant"
          name="montant"
          type="number"
          inputMode="numeric"
          min={1}
          step="1"
          className={field}
        />
        <p className="mt-1 text-xs text-slate-400">
          TVA non applicable (art. 293 B). Une ligne forfait est créée ; tu peux
          l&apos;affiner ensuite.
        </p>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <Submit />
    </form>
  );
}
