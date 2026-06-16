'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Plus, X, Send } from 'lucide-react';
import { sendAppointmentProposals } from '@/app/admin/(app)/agenda/actions';

const field =
  'h-10 w-full rounded-lg border border-slate-300 px-3 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200';

const TYPES: [string, string][] = [
  ['DIAGNOSTIC_FISSURES', 'Diagnostic fissures'],
  ['DIAGNOSTIC_HUMIDITE', 'Diagnostic humidité'],
  ['EXPERTISE_ACHAT', 'Expertise achat'],
  ['MUR_PORTEUR', 'Mur porteur'],
  ['AUTRE', 'Autre'],
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-60"
    >
      <Send className="h-4 w-4" />
      {pending ? 'Envoi…' : 'Envoyer la proposition'}
    </button>
  );
}

export function AppointmentProposalForm({
  contacts,
  prefill,
}: {
  contacts: { id: string; name: string; city: string | null }[];
  prefill?: { contactId?: string; type?: string; leadId?: string };
}) {
  const [rows, setRows] = useState<number[]>([0, 1, 2]);
  const [seq, setSeq] = useState(3);

  if (contacts.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        Aucun client avec e-mail. Renseignez l&apos;e-mail d&apos;un prospect pour lui proposer des créneaux.
      </p>
    );
  }

  const addRow = () => {
    setRows((r) => (r.length >= 6 ? r : [...r, seq]));
    setSeq((s) => s + 1);
  };
  const removeRow = (id: number) => setRows((r) => (r.length > 1 ? r.filter((x) => x !== id) : r));

  return (
    <form action={sendAppointmentProposals} className="space-y-4">
      {prefill?.leadId && <input type="hidden" name="leadId" value={prefill.leadId} />}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Client</label>
          <select name="contactId" required defaultValue={prefill?.contactId ?? ''} className={field}>
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
          <label className="mb-1 block text-sm font-medium text-slate-700">Type d&apos;intervention</label>
          <select name="type" defaultValue={prefill?.type ?? 'DIAGNOSTIC_FISSURES'} className={field}>
            {TYPES.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Créneaux proposés <span className="font-normal text-slate-400">(le client en choisira un)</span>
        </label>
        <div className="space-y-2">
          {rows.map((id, i) => (
            <div key={id} className="flex items-center gap-2">
              <span className="w-5 shrink-0 text-center text-xs font-medium text-slate-400">{i + 1}</span>
              <input
                type="datetime-local"
                name="slot"
                step={1800}
                required={i === 0}
                className={field}
              />
              <button
                type="button"
                onClick={() => removeRow(id)}
                disabled={rows.length <= 1}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-300 text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-30"
                aria-label="Retirer ce créneau"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        {rows.length < 6 && (
          <button
            type="button"
            onClick={addRow}
            className="mt-2 inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-3.5 w-3.5" /> Ajouter un créneau
          </button>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Message personnalisé <span className="font-normal text-slate-400">(optionnel)</span>
        </label>
        <textarea
          name="message"
          rows={2}
          placeholder="Ex. « Suite à notre échange, voici quelques disponibilités pour la visite. »"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        />
      </div>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
