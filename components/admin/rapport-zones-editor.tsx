'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Plus, Trash2, Check } from 'lucide-react';
import { updateRapportZones } from '@/app/admin/(app)/rapports/actions';
import { VoiceDictationButton } from '@/components/admin/voice-dictation-button';

type Zone = { titre: string; observations: string; mesure: string; gravite: string };

const field =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200';
const GRAVITES = ['À TRAITER', 'IMPORTANT', 'À SURVEILLER', 'INFO'];

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
    >
      <Check className="h-4 w-4" />
      {pending ? 'Enregistrement…' : 'Enregistrer la saisie'}
    </button>
  );
}

export function RapportZonesEditor({
  rapportId,
  initialZones,
}: {
  rapportId: string;
  initialZones: Zone[];
}) {
  const [error, formAction] = useFormState(updateRapportZones, undefined);
  const [zones, setZones] = useState<Zone[]>(
    initialZones.length
      ? initialZones
      : [{ titre: '', observations: '', mesure: '', gravite: 'À TRAITER' }]
  );

  const update = (i: number, patch: Partial<Zone>) =>
    setZones((zs) => zs.map((z, j) => (j === i ? { ...z, ...patch } : z)));
  const add = () =>
    setZones((zs) => [...zs, { titre: '', observations: '', mesure: '', gravite: 'À TRAITER' }]);
  const remove = (i: number) =>
    setZones((zs) => (zs.length > 1 ? zs.filter((_, j) => j !== i) : zs));

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="rapportId" value={rapportId} />
      <input type="hidden" name="zones" value={JSON.stringify(zones)} />

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
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Observations</span>
            <VoiceDictationButton
              onAppend={(t) =>
                update(i, {
                  observations: z.observations ? `${z.observations} ${t}` : t,
                })
              }
            />
          </div>
          <textarea
            value={z.observations}
            onChange={(e) => update(i, { observations: e.target.value })}
            rows={3}
            placeholder="Observations brutes constatées sur place (ou dictez-les)…"
            className={field + ' mt-1.5'}
          />
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <input
              value={z.mesure}
              onChange={(e) => update(i, { mesure: e.target.value })}
              placeholder="Mesure (≈ 2 mm)"
              className={field}
            />
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
      ))}

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          <Plus className="h-3.5 w-3.5" /> Ajouter une zone
        </button>
        <Submit />
      </div>
    </form>
  );
}
