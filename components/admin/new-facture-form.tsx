'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createFacture } from '@/app/admin/(app)/factures/actions';

const field =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-base outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 sm:text-sm';
const label = 'mb-1 block text-sm font-medium text-slate-700';

// Objets de facture proposés, travaillés par domaine d'expertise. L'admin choisit
// une proposition (modifiable) ou « Rédiger moi-même » pour un objet libre.
const OBJET_SUGGESTIONS: { domain: string; options: string[] }[] = [
  {
    domain: 'Fissures',
    options: [
      'Diagnostic des pathologies de fissures',
      'Diagnostic visuel et instrumenté des fissures',
    ],
  },
  {
    domain: 'Humidité',
    options: [
      'Diagnostic humidité et infiltrations',
      "Diagnostic des désordres d'humidité (remontées capillaires, infiltrations, condensation)",
    ],
  },
  {
    domain: 'Avant achat',
    options: [
      'Diagnostic du bâti avant achat',
      'Diagnostic indépendant avant acquisition immobilière',
    ],
  },
  {
    domain: 'Mur porteur',
    options: ['Étude de faisabilité — ouverture de mur porteur'],
  },
];
const ALL_OBJET_SUGGESTIONS = OBJET_SUGGESTIONS.flatMap((g) => g.options);

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
  defaultObject,
  defaultMontant,
}: {
  contacts: { id: string; name: string; city: string | null }[];
  defaultContactId?: string;
  defaultObject?: string;
  defaultMontant?: string;
}) {
  const [error, formAction] = useFormState(createFacture, undefined);
  // Prix LIBRE, pré-rempli avec le prix du devis (modifiable).
  const [montant, setMontant] = useState(defaultMontant ?? '');
  // Objet : proposition par domaine (modifiable) ou rédaction libre. Pré-rempli
  // avec l'objet du domaine du dossier.
  const [objet, setObjet] = useState(defaultObject ?? '');

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
        <label className={label} htmlFor="object-suggest">
          Objet de la facture <span className="text-orange-600">*</span>
        </label>
        <select
          id="object-suggest"
          value={ALL_OBJET_SUGGESTIONS.includes(objet) ? objet : '__custom__'}
          onChange={(e) =>
            setObjet(e.target.value === '__custom__' ? '' : e.target.value)
          }
          className={`${field} mb-2`}
        >
          {OBJET_SUGGESTIONS.map((g) => (
            <optgroup key={g.domain} label={g.domain}>
              {g.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </optgroup>
          ))}
          <option value="__custom__">✏️ Rédiger l&apos;objet moi-même</option>
        </select>
        <input
          id="object"
          name="object"
          required
          value={objet}
          onChange={(e) => setObjet(e.target.value)}
          placeholder="Objet de la facture (modifiable)"
          className={field}
        />
        <p className="mt-1 text-xs text-slate-400">
          Choisis une proposition par domaine ci-dessus (ajustable), ou « Rédiger
          l&apos;objet moi-même » pour le saisir librement.
        </p>
      </div>

      <div>
        <label className={label} htmlFor="montant">
          Montant (€ HT) <span className="text-orange-600">*</span>
        </label>
        <input
          id="montant"
          name="montant"
          type="text"
          inputMode="decimal"
          value={montant}
          onChange={(e) => setMontant(e.target.value.replace(/[^0-9.,]/g, ''))}
          placeholder="ex. 450"
          className={field}
        />
        <p className="mt-1 text-xs text-slate-400">
          {defaultMontant
            ? 'Pré-rempli avec le prix du devis — modifiable librement. '
            : 'Prix libre (€ HT). '}
          TVA non applicable (art. 293 B). Pour un dossier de diagnostic, la structure
          « diagnostic à 0 € + coordination au prix » est appliquée automatiquement ;
          sinon une ligne forfait.
        </p>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <Submit />
    </form>
  );
}
