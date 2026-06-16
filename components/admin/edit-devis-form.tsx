'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { updateDevis } from '@/app/admin/(app)/devis/actions';

const field =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200';
const label = 'mb-1 block text-sm font-medium text-slate-700';

const SERVICES: [string, string][] = [
  ['FISSURES', 'Diagnostic fissures'],
  ['HUMIDITE', 'Diagnostic humidité'],
  ['EXPERTISE_ACHAT', 'Expertise avant achat'],
  ['MUR_PORTEUR', 'Faisabilité mur porteur'],
];

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

export function EditDevisForm({
  devisId,
  serviceType,
  prix,
  bienConcerne,
  validUntil,
  isSurMesure = false,
  hasFrais = false,
}: {
  devisId: string;
  serviceType: string;
  prix: number;
  bienConcerne: string;
  validUntil: string;
  isSurMesure?: boolean;
  hasFrais?: boolean;
}) {
  const [error, formAction] = useFormState(updateDevis, undefined);
  const [p, setP] = useState(prix > 0 ? String(prix) : '');

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="devisId" value={devisId} />
      {isSurMesure && (
        <p className="rounded-lg border border-orange-200 bg-orange-50/40 px-3 py-2 text-xs text-orange-700">
          Devis sur-mesure — le contenu (objet, déroulé, livrable) est figé. Vous pouvez ajuster
          le prix, le bien, la validité et les frais.
        </p>
      )}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {!isSurMesure && (
          <div>
            <label className={label} htmlFor="ed-service">
              Type de diagnostic
            </label>
            <select
              id="ed-service"
              name="serviceType"
              defaultValue={SERVICES.some(([v]) => v === serviceType) ? serviceType : 'FISSURES'}
              className={field}
            >
              {SERVICES.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label className={label} htmlFor="ed-prix">
            Montant (€ HT)
          </label>
          <input
            id="ed-prix"
            name="prix"
            type="text"
            inputMode="decimal"
            value={p}
            onChange={(e) => setP(e.target.value.replace(/[^0-9.,]/g, ''))}
            placeholder="ex. 450"
            className={field}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="ed-bien">
            Bien concerné
          </label>
          <input id="ed-bien" name="bienConcerne" defaultValue={bienConcerne} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="ed-valid">
            Valable jusqu&apos;au
          </label>
          <input id="ed-valid" name="validUntil" type="date" defaultValue={validUntil} className={field} />
        </div>
      </div>
      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
        <input
          type="checkbox"
          name="fraisDeplacement"
          defaultChecked={hasFrais}
          className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
        />
        Frais de déplacement (50 € HT)
      </label>
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}
      <Submit />
    </form>
  );
}
