'use client';

import { useState } from 'react';
import { SubmitButton } from '@/components/admin/submit-button';
import { SlotPicker } from '@/components/admin/slot-picker';
import { createAppointment } from '@/app/admin/(app)/agenda/actions';

const field =
  'h-10 w-full rounded-lg border border-slate-300 px-3 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200';

type Contact = { id: string; name: string; city: string | null; address: string | null };

/**
 * Formulaire « Nouveau RDV » de l'agenda. Côté client pour SYNCHRONISER le lieu :
 * choisir un client remplit aussitôt le champ Lieu avec l'adresse de sa fiche
 * (l'admin peut ensuite l'ajuster). Pré-remplissage depuis un dossier respecté.
 */
export function NewAppointmentForm({
  contacts,
  typeOptions,
  experts,
  prefill,
  prefillLocation,
  minDate,
}: {
  contacts: Contact[];
  typeOptions: [string, string][];
  experts: { id: string; name: string }[];
  prefill: { contactId: string; type: string; leadId: string; devisId: string };
  prefillLocation: string;
  minDate?: string;
}) {
  const [contactId, setContactId] = useState(prefill.contactId);
  const [location, setLocation] = useState(prefillLocation);

  const onContactChange = (id: string) => {
    setContactId(id);
    // Remplit le Lieu avec l'adresse du client choisi (si renseignée sur sa fiche).
    const addr = contacts.find((c) => c.id === id)?.address;
    if (addr) setLocation(addr);
  };

  return (
    <form action={createAppointment} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {prefill.leadId && <input type="hidden" name="leadId" value={prefill.leadId} />}
      {prefill.devisId && <input type="hidden" name="devisId" value={prefill.devisId} />}
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Client</label>
        <select
          name="contactId"
          required
          value={contactId}
          onChange={(e) => onContactChange(e.target.value)}
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
        <label className="mb-1 block text-sm font-medium text-slate-700">Type</label>
        <select name="type" defaultValue={prefill.type} className={field}>
          {typeOptions.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Date et heure</label>
        <SlotPicker name="start" required minDate={minDate} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Durée (min)</label>
        <input type="number" name="durationMin" defaultValue={60} min={15} step={15} className={field} />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-medium text-slate-700">Lieu</label>
        <input
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Adresse du bien"
          className={field}
        />
      </div>
      {experts.length > 0 && (
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Diagnostiqueur</label>
          <select name="assignedToId" defaultValue="" className={field}>
            <option value="">Expert du dossier (par défaut)</option>
            {experts.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-slate-500">
            Reçoit la 2ᵉ invitation Google. Laissé vide&nbsp;: on prend l&apos;expert déjà assigné au
            dossier (sinon seule l&apos;invitation client part).
          </p>
        </div>
      )}
      <div className="sm:col-span-2 flex justify-end">
        <SubmitButton
          pendingLabel="Planification…"
          className="rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
        >
          Planifier le RDV
        </SubmitButton>
      </div>
    </form>
  );
}
