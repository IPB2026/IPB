'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createDevis } from '@/app/admin/(app)/devis/actions';

const field =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200';
const label = 'mb-1 block text-sm font-medium text-slate-700';

const SERVICES: [string, string][] = [
  ['FISSURES', 'Diagnostic fissures'],
  ['HUMIDITE', 'Diagnostic humidité'],
  ['EXPERTISE_ACHAT', 'Expertise avant achat'],
  ['MUR_PORTEUR', 'Faisabilité mur porteur'],
];

const eur = (n: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n || 0);

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
  defaultServiceType,
  defaultBien,
  defaultPrix,
  leadId,
}: {
  contacts: { id: string; name: string; city: string | null }[];
  defaultContactId?: string;
  defaultServiceType?: string;
  defaultBien?: string;
  defaultPrix?: number;
  leadId?: string;
}) {
  const [error, formAction] = useFormState(createDevis, undefined);
  const [prix, setPrix] = useState(defaultPrix && defaultPrix > 0 ? defaultPrix : 449);
  const serviceDefault =
    defaultServiceType && SERVICES.some(([v]) => v === defaultServiceType)
      ? defaultServiceType
      : 'FISSURES';

  return (
    <form action={formAction} className="space-y-5">
      {leadId && <input type="hidden" name="leadId" value={leadId} />}
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
          <label className={label} htmlFor="serviceType">
            Type de diagnostic
          </label>
          <select id="serviceType" name="serviceType" defaultValue={serviceDefault} className={field}>
            {SERVICES.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="prix">
            Montant du diagnostic (€ HT) <span className="text-orange-600">*</span>
          </label>
          <input
            id="prix"
            name="prix"
            type="number"
            min={1}
            step="10"
            value={prix}
            onChange={(e) => setPrix(Number(e.target.value))}
            className={field}
          />
          {defaultPrix && defaultPrix > 0 ? (
            <p className="mt-1 text-xs text-emerald-600">
              Pré-rempli depuis la fiche prospect — modifiable.
            </p>
          ) : null}
        </div>
        <div>
          <label className={label} htmlFor="validUntil">
            Valable jusqu&apos;au
          </label>
          <input id="validUntil" name="validUntil" type="date" className={field} />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="bienConcerne">
          Bien concerné
        </label>
        <input
          id="bienConcerne"
          name="bienConcerne"
          defaultValue={defaultBien ?? ''}
          placeholder="Maison individuelle — 33 chemin des Vivans, 31600 Muret"
          className={field}
        />
      </div>

      <div className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">
        Le contenu du devis (déroulé de l&apos;intervention, livrable, diagnostiqueur mandaté,
        conditions) est généré automatiquement selon le type de diagnostic. Le diagnostic sur
        site apparaît en « — » ; le montant porte la coordination et la mise en forme du rapport.
        <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-2">
          <span className="font-medium">Net à payer · TVA non applicable (293 B)</span>
          <span className="text-lg font-bold tabular-nums text-orange-600">{eur(prix)}</span>
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <Submit />
    </form>
  );
}
