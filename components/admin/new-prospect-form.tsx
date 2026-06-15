'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createProspect } from '@/app/admin/(app)/leads/actions';
import {
  SERVICE_LABEL,
  TIER_LABEL,
  TIER_DOT,
} from '@/components/admin/badges';
import { VoiceDictationButton } from '@/components/admin/voice-dictation-button';

const OCCUPANT_OPTIONS: [string, string][] = [
  ['INCONNU', 'Non précisé'],
  ['PROPRIETAIRE', 'Propriétaire occupant'],
  ['BAILLEUR', 'Propriétaire bailleur'],
  ['LOCATAIRE', 'Locataire'],
  ['ACHETEUR', "En projet d'achat"],
  ['INVESTISSEUR', 'Investisseur / marchand de biens'],
];

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-orange-600 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-orange-700 disabled:opacity-60 sm:text-sm"
    >
      {pending ? 'Enregistrement…' : 'Enregistrer le prospect'}
    </button>
  );
}

const field =
  'w-full rounded-lg border border-slate-300 px-3 py-3 text-base outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 sm:py-2.5 sm:text-sm';
const labelCls = 'mb-1 block text-sm font-medium text-slate-700';

export function NewProspectForm({
  experts = [],
}: {
  experts?: { id: string; name: string }[];
}) {
  const [error, formAction] = useFormState(createProspect, undefined);
  const [note, setNote] = useState('');

  return (
    <form action={formAction} className="space-y-5">
      {/* Essentiel : prénom + nom */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="prenom" className={labelCls}>
            Prénom
          </label>
          <input id="prenom" name="prenom" autoFocus className={field} placeholder="Jean" />
        </div>
        <div>
          <label htmlFor="nom" className={labelCls}>
            Nom <span className="text-orange-600">*</span>
          </label>
          <input id="nom" name="nom" required className={field} placeholder="Dupont" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelCls}>
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            className={field}
            placeholder="06 12 34 56 78"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input id="email" name="email" type="email" inputMode="email" className={field} placeholder="client@email.fr" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className={labelCls}>
            Ville / code postal
          </label>
          <input id="city" name="city" className={field} placeholder="31600 Muret" />
        </div>
        <div>
          <label htmlFor="address" className={labelCls}>
            Adresse du bien
          </label>
          <input
            id="address"
            name="address"
            className={field}
            placeholder="33 chemin des Vivans, 31600 Muret"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className={labelCls}>
            Service concerné
          </label>
          <select id="service" name="service" defaultValue="AUTRE" className={field}>
            {Object.entries(SERVICE_LABEL).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="occupantStatus" className={labelCls}>
            Statut
          </label>
          <select id="occupantStatus" name="occupantStatus" defaultValue="INCONNU" className={field}>
            {OCCUPANT_OPTIONS.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Qualification rapide (tier) */}
      <div>
        <span className={labelCls}>Priorité ressentie</span>
        <div className="grid grid-cols-3 gap-2">
          {(['HOT', 'WARM', 'COLD'] as const).map((t, i) => (
            <label
              key={t}
              className="flex cursor-pointer items-center justify-center rounded-lg border border-slate-300 px-2 py-3 text-sm font-medium text-slate-700 transition-colors has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50 has-[:checked]:text-orange-700 sm:py-2"
            >
              <input
                type="radio"
                name="tier"
                value={t}
                defaultChecked={i === 1}
                className="sr-only"
              />
              <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${TIER_DOT[t]}`} />
              {TIER_LABEL[t]}
            </label>
          ))}
        </div>
      </div>

      {experts.length > 0 && (
        <div>
          <label htmlFor="assignedToId" className={labelCls}>
            Assigner à un diagnostiqueur
          </label>
          <select id="assignedToId" name="assignedToId" defaultValue="" className={field}>
            <option value="">— Aucun (non assigné) —</option>
            {experts.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-slate-400">
            Le diagnostiqueur retrouvera ce prospect dans son espace pour réaliser le diagnostic.
          </p>
        </div>
      )}

      <div>
        <div className="mb-1 flex items-center justify-between gap-2">
          <label htmlFor="note" className={labelCls + ' mb-0'}>
            Note d&apos;appel
          </label>
          <VoiceDictationButton
            onAppend={(t) => setNote((n) => (n ? `${n} ${t}` : t))}
          />
        </div>
        <textarea
          id="note"
          name="note"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className={field}
          placeholder="Ce que dit le client : nature du problème, urgence, contexte… (ou dictez)"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="relanceDate" className={labelCls}>
            Rappeler le (planifie une relance)
          </label>
          <input id="relanceDate" name="relanceDate" type="date" className={field} />
        </div>
        <div>
          <label htmlFor="value" className={labelCls}>
            Prix du diagnostic (€)
          </label>
          <input id="value" name="value" inputMode="decimal" className={field} placeholder="ex. 450" />
          <p className="mt-1 text-xs text-slate-400">
            Repris automatiquement dans le devis — pas besoin de le ressaisir.
          </p>
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <Submit />
    </form>
  );
}
