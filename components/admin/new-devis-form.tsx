'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Plus, Trash2 } from 'lucide-react';
import { createDevis } from '@/app/admin/(app)/devis/actions';

type Line = {
  designation: string;
  detail: string;
  unit: string;
  qty: number;
  unitPrice: number;
};

const field =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200';
const label = 'mb-1 block text-sm font-medium text-slate-700';

const eur = (n: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
    n || 0
  );

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-60"
    >
      {pending ? 'Création…' : 'Créer le devis'}
    </button>
  );
}

export function NewDevisForm({
  contacts,
  defaultContactId,
}: {
  contacts: { id: string; name: string; city: string | null }[];
  defaultContactId?: string;
}) {
  const [error, formAction] = useFormState(createDevis, undefined);
  const [lines, setLines] = useState<Line[]>([
    {
      designation: 'Diagnostic pathologies de fissures',
      detail: '',
      unit: 'Forfait',
      qty: 1,
      unitPrice: 0,
    },
  ]);

  const total = lines.reduce((s, l) => s + (l.qty || 0) * (l.unitPrice || 0), 0);

  const update = (i: number, patch: Partial<Line>) =>
    setLines((ls) => ls.map((l, j) => (j === i ? { ...l, ...patch } : l)));
  const add = () =>
    setLines((ls) => [
      ...ls,
      { designation: '', detail: '', unit: 'Forfait', qty: 1, unitPrice: 0 },
    ]);
  const remove = (i: number) =>
    setLines((ls) => (ls.length > 1 ? ls.filter((_, j) => j !== i) : ls));

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />

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
          <label className={label} htmlFor="validUntil">
            Valable jusqu'au
          </label>
          <input id="validUntil" name="validUntil" type="date" className={field} />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="object">
          Objet <span className="text-orange-600">*</span>
        </label>
        <input
          id="object"
          name="object"
          required
          defaultValue="Diagnostic pathologies de fissures"
          className={field}
        />
      </div>

      <div>
        <label className={label} htmlFor="bienConcerne">
          Bien concerné
        </label>
        <input
          id="bienConcerne"
          name="bienConcerne"
          placeholder="Maison individuelle — 33 chemin des Vivans, 31600 Muret"
          className={field}
        />
      </div>

      <div>
        <label className={label} htmlFor="introLetter">
          Lettre d'introduction (optionnel)
        </label>
        <textarea
          id="introLetter"
          name="introLetter"
          rows={3}
          placeholder="Suite à notre échange, nous vous adressons notre proposition pour l'examen des fissures constatées…"
          className={field}
        />
      </div>

      {/* Lignes */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className={label + ' mb-0'}>Prestations</span>
          <button
            type="button"
            onClick={add}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-3.5 w-3.5" /> Ajouter une ligne
          </button>
        </div>
        <div className="space-y-3">
          {lines.map((l, i) => (
            <div key={i} className="rounded-lg border border-slate-200 p-3">
              <div className="flex gap-2">
                <input
                  value={l.designation}
                  onChange={(e) => update(i, { designation: e.target.value })}
                  placeholder="Désignation"
                  className={field}
                />
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="shrink-0 rounded-lg border border-slate-300 px-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  aria-label="Supprimer la ligne"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <input
                value={l.detail}
                onChange={(e) => update(i, { detail: e.target.value })}
                placeholder="Détail (optionnel — ex. adresse du bien)"
                className={field + ' mt-2 text-xs'}
              />
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div>
                  <span className="text-xs text-slate-400">Unité</span>
                  <input
                    value={l.unit}
                    onChange={(e) => update(i, { unit: e.target.value })}
                    className={field}
                  />
                </div>
                <div>
                  <span className="text-xs text-slate-400">Qté</span>
                  <input
                    type="number"
                    min={0}
                    step="0.5"
                    value={l.qty}
                    onChange={(e) => update(i, { qty: Number(e.target.value) })}
                    className={field}
                  />
                </div>
                <div>
                  <span className="text-xs text-slate-400">P.U. (€ HT)</span>
                  <input
                    type="number"
                    min={0}
                    step="1"
                    value={l.unitPrice}
                    onChange={(e) =>
                      update(i, { unitPrice: Number(e.target.value) })
                    }
                    className={field}
                  />
                </div>
              </div>
              <p className="mt-1 text-right text-xs text-slate-500">
                Total ligne : {eur(l.qty * l.unitPrice)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
        <span className="text-sm font-medium text-slate-600">
          Total HT · {/* franchise TVA 293 B */}TVA non applicable
        </span>
        <span className="text-lg font-bold tabular-nums text-slate-900">
          {eur(total)}
        </span>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <Submit />
    </form>
  );
}
