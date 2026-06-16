'use client';

import { useId, useState } from 'react';

/**
 * Saisie du nom du contact, en deux modes :
 *  - Particulier → Prénom + Nom (le nom complet est recomposé côté serveur).
 *  - Entreprise → Raison sociale seule (ni prénom ni nom).
 * Seuls les champs du mode actif sont dans le DOM → la server action reçoit soit
 * prenom/nom, soit company, et compose le `name` du contact en conséquence.
 */
export function NameFields({
  defPrenom = '',
  defNom = '',
  defCompany = '',
  defaultMode,
  fieldClass,
  labelClass,
}: {
  defPrenom?: string;
  defNom?: string;
  defCompany?: string;
  defaultMode?: 'particulier' | 'entreprise';
  fieldClass: string;
  labelClass: string;
}) {
  const uid = useId();
  const [mode, setMode] = useState<'particulier' | 'entreprise'>(
    defaultMode ?? (defCompany ? 'entreprise' : 'particulier')
  );

  return (
    <div className="space-y-3">
      <div className="inline-flex rounded-lg border border-slate-300 p-0.5 text-sm">
        {(['particulier', 'entreprise'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
              mode === m
                ? 'bg-orange-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {m === 'particulier' ? 'Particulier' : 'Entreprise'}
          </button>
        ))}
      </div>

      {mode === 'particulier' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${uid}-prenom`} className={labelClass}>
              Prénom
            </label>
            <input
              id={`${uid}-prenom`}
              name="prenom"
              defaultValue={defPrenom}
              className={fieldClass}
              placeholder="Jean"
            />
          </div>
          <div>
            <label htmlFor={`${uid}-nom`} className={labelClass}>
              Nom <span className="text-orange-600">*</span>
            </label>
            <input
              id={`${uid}-nom`}
              name="nom"
              defaultValue={defNom}
              required
              className={fieldClass}
              placeholder="Dupont"
            />
          </div>
        </div>
      ) : (
        <div>
          <label htmlFor={`${uid}-company`} className={labelClass}>
            Raison sociale / nom de l&apos;entreprise <span className="text-orange-600">*</span>
          </label>
          <input
            id={`${uid}-company`}
            name="company"
            defaultValue={defCompany}
            required
            className={fieldClass}
            placeholder="SCI des Vivans, Agence Martin…"
          />
        </div>
      )}
    </div>
  );
}
