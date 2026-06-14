'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Plus, Trash2 } from 'lucide-react';
import { createRapport } from '@/app/admin/(app)/rapports/actions';

type Zone = { titre: string; observations: string; mesure: string; gravite: string };

const field =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200';
const label = 'mb-1 block text-sm font-medium text-slate-700';

const TYPES: [string, string][] = [
  ['FISSURES', 'Fissures'],
  ['HUMIDITE', 'Humidité'],
  ['EXPERTISE_ACHAT', 'Expertise avant achat'],
  ['MUR_PORTEUR', 'Mur porteur'],
];
const GRAVITES = ['À TRAITER', 'IMPORTANT', 'À SURVEILLER', 'INFO'];

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-60"
    >
      {pending ? 'Création…' : 'Créer le rapport'}
    </button>
  );
}

export function NewRapportForm({
  contacts,
}: {
  contacts: { id: string; name: string; city: string | null }[];
}) {
  const [error, formAction] = useFormState(createRapport, undefined);
  const [zones, setZones] = useState<Zone[]>([
    { titre: '', observations: '', mesure: '', gravite: 'À TRAITER' },
  ]);

  const update = (i: number, patch: Partial<Zone>) =>
    setZones((zs) => zs.map((z, j) => (j === i ? { ...z, ...patch } : z)));
  const add = () =>
    setZones((zs) => [...zs, { titre: '', observations: '', mesure: '', gravite: 'À TRAITER' }]);
  const remove = (i: number) =>
    setZones((zs) => (zs.length > 1 ? zs.filter((_, j) => j !== i) : zs));

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="zones" value={JSON.stringify(zones)} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="contactId">
            Client <span className="text-orange-600">*</span>
          </label>
          <select id="contactId" name="contactId" required defaultValue="" className={field}>
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
          <label className={label} htmlFor="type">
            Type de diagnostic
          </label>
          <select id="type" name="type" defaultValue="FISSURES" className={field}>
            {TYPES.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={label} htmlFor="title">
          Intitulé du rapport
        </label>
        <input
          id="title"
          name="title"
          defaultValue="Diagnostic pathologies de fissures"
          className={field}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="bienAdresse">
            Adresse du bien
          </label>
          <input id="bienAdresse" name="bienAdresse" className={field} placeholder="48 bis rue de Terris" />
        </div>
        <div>
          <label className={label} htmlFor="ville">
            Commune
          </label>
          <input id="ville" name="ville" className={field} placeholder="Plaisance-du-Touch" />
        </div>
      </div>

      {/* Zones de constat */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className={label + ' mb-0'}>Zones de constat (saisie terrain)</span>
          <button
            type="button"
            onClick={add}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-3.5 w-3.5" /> Ajouter une zone
          </button>
        </div>
        <div className="space-y-3">
          {zones.map((z, i) => (
            <div key={i} className="rounded-lg border border-slate-200 p-3">
              <div className="flex gap-2">
                <input
                  value={z.titre}
                  onChange={(e) => update(i, { titre: e.target.value })}
                  placeholder={`Zone ${i + 1} — ex. Mur extérieur côté entrée`}
                  className={field}
                />
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="shrink-0 rounded-lg border border-slate-300 px-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  aria-label="Supprimer la zone"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <textarea
                value={z.observations}
                onChange={(e) => update(i, { observations: e.target.value })}
                rows={3}
                placeholder="Observations brutes : ce que vous constatez sur place (l'IA développera l'analyse technique)…"
                className={field + ' mt-2'}
              />
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-xs text-slate-400">Mesure (optionnel)</span>
                  <input
                    value={z.mesure}
                    onChange={(e) => update(i, { mesure: e.target.value })}
                    placeholder="≈ 2 mm au fissuromètre"
                    className={field}
                  />
                </div>
                <div>
                  <span className="text-xs text-slate-400">Gravité estimée</span>
                  <select
                    value={z.gravite}
                    onChange={(e) => update(i, { gravite: e.target.value })}
                    className={field}
                  >
                    {GRAVITES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
        Après création, vous pourrez <strong>ajouter vos photos terrain</strong> (rattachées à
        chaque zone). L'IA développe ensuite vos constats et vos photos en rapport
        complet (analyses, références techniques, synthèse, préconisations, estimation),
        relu et validé avant envoi.
      </p>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <Submit />
    </form>
  );
}
