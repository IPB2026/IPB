'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import {
  createDevisTravaux,
  updateDevisTravaux,
} from '@/app/admin/(app)/devis/actions';

const field =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200';
const label = 'mb-1 block text-sm font-medium text-slate-700';

const eur = (n: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
    n || 0
  );

function Submit({ mode }: { mode: 'create' | 'edit' }) {
  const { pending } = useFormStatus();
  const base =
    mode === 'create'
      ? 'rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-60'
      : 'h-10 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60';
  return (
    <button type="submit" disabled={pending} className={base}>
      {pending
        ? mode === 'create'
          ? 'Création…'
          : 'Enregistrement…'
        : mode === 'create'
          ? "Créer le devis travaux"
          : 'Enregistrer les modifications'}
    </button>
  );
}

export function DevisTravauxForm({
  mode,
  devisId,
  contactId,
  leadId,
  prix,
  bienConcerne,
  validUntil,
}: {
  mode: 'create' | 'edit';
  devisId?: string;
  contactId?: string;
  leadId?: string;
  prix?: number;
  bienConcerne?: string;
  validUntil?: string;
}) {
  const [error, formAction] = useFormState(
    mode === 'create' ? createDevisTravaux : updateDevisTravaux,
    undefined
  );
  const [p, setP] = useState(prix ?? 0);

  return (
    <form action={formAction} className="space-y-4">
      {mode === 'create' ? (
        <>
          <input type="hidden" name="contactId" value={contactId} />
          {leadId && <input type="hidden" name="leadId" value={leadId} />}
        </>
      ) : (
        <input type="hidden" name="devisId" value={devisId} />
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="dt-prix">
            Montant de l&apos;accompagnement (€ HT){' '}
            <span className="text-orange-600">*</span>
          </label>
          <input
            id="dt-prix"
            name="prix"
            type="number"
            min={1}
            max={100000}
            step="50"
            value={p}
            onChange={(e) => setP(Number(e.target.value))}
            className={field}
          />
          <p className="mt-1 text-xs text-slate-400">
            Honoraires de coordination IPB. Les travaux sont chiffrés et exécutés
            par les équipes de réalisation du réseau.
          </p>
        </div>
        <div>
          <label className={label} htmlFor="dt-valid">
            Valable jusqu&apos;au
          </label>
          <input
            id="dt-valid"
            name="validUntil"
            type="date"
            defaultValue={validUntil ?? ''}
            className={field}
          />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="dt-bien">
          Bien concerné
        </label>
        <input
          id="dt-bien"
          name="bienConcerne"
          defaultValue={bienConcerne ?? ''}
          placeholder="Maison individuelle — 33 chemin des Vivans, 31600 Muret"
          className={field}
        />
      </div>

      <div className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">
        Le contenu du devis (programme de travaux, suivi de chantier, réception)
        est généré automatiquement. IPB coordonne la mission ; les travaux sont
        exécutés par les équipes de réalisation du réseau, sous leur garantie
        décennale.
        <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-2">
          <span className="font-medium">Net à payer · TVA non applicable (293 B)</span>
          <span className="text-lg font-bold tabular-nums text-orange-600">
            {eur(p)}
          </span>
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <Submit mode={mode} />
    </form>
  );
}
