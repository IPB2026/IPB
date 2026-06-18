'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2, Plus, Trash2, AlertTriangle } from 'lucide-react';
import { updateRapportContent } from '@/app/admin/(app)/rapports/actions';
import type { ReportContent } from '@/lib/ai/report';

/**
 * Éditeur du contenu GÉNÉRÉ d'un rapport. Le diagnostiqueur (après génération) ou
 * l'IPB (avant envoi) peut relire et corriger TOUT le texte : synthèse, contexte,
 * analyse par zone, estimation, orientations, conclusion. Les tableaux de synthèse
 * auto (synthèse des désordres, matrice de criticité) sont préservés tels quels.
 */

const field =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200';
const GRAVITES = ['À TRAITER', 'IMPORTANT', 'À SURVEILLER', 'INFO', 'BON ÉTAT'];

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1 block text-xs font-medium text-slate-500">{children}</label>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

/** Éditeur d'une liste de chaînes (puces) : textarea par item + ajout/suppression. */
function StringList({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((v, i) => (
        <div key={i} className="flex gap-2">
          <textarea
            value={v}
            onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))}
            rows={2}
            placeholder={placeholder}
            className={field}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="shrink-0 rounded-lg border border-slate-300 px-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
            aria-label="Supprimer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
      >
        <Plus className="h-3.5 w-3.5" /> Ajouter
      </button>
    </div>
  );
}

export function RapportContentEditor({
  rapportId,
  initialContent,
}: {
  rapportId: string;
  initialContent: ReportContent;
}) {
  const router = useRouter();
  const [c, setC] = useState<ReportContent>(initialContent);
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const set = <K extends keyof ReportContent>(k: K, v: ReportContent[K]) =>
    setC((prev) => ({ ...prev, [k]: v }));

  const setZone = (i: number, patch: Partial<ReportContent['zones'][number]>) =>
    setC((prev) => ({ ...prev, zones: prev.zones.map((z, j) => (j === i ? { ...z, ...patch } : z)) }));

  const setEstim = (i: number, patch: Partial<ReportContent['estimationTravaux'][number]>) =>
    setC((prev) => ({
      ...prev,
      estimationTravaux: prev.estimationTravaux.map((e, j) => (j === i ? { ...e, ...patch } : e)),
    }));

  const setOrient = (i: number, patch: Partial<ReportContent['orientations'][number]>) =>
    setC((prev) => ({
      ...prev,
      orientations: prev.orientations.map((o, j) => (j === i ? { ...o, ...patch } : o)),
    }));

  const save = () => {
    setMsg(null);
    start(async () => {
      const res = await updateRapportContent(rapportId, JSON.stringify(c));
      if (res.ok) {
        setMsg({ ok: true, text: 'Modifications enregistrées.' });
        router.refresh();
      } else {
        setMsg({ ok: false, text: res.error ?? 'Échec de l’enregistrement.' });
      }
    });
  };

  const budget = (c.estimationTravaux ?? []).reduce((s, e) => s + (Number(e.montantHT) || 0), 0);

  return (
    <div className="space-y-4">
      <Section title="Synthèse">
        <div>
          <Label>Gravité globale</Label>
          <input value={c.graviteGlobale ?? ''} onChange={(e) => set('graviteGlobale', e.target.value)} className={field} />
        </div>
        <div>
          <Label>Conclusion générale</Label>
          <textarea value={c.conclusionGenerale ?? ''} onChange={(e) => set('conclusionGenerale', e.target.value)} rows={3} className={field} />
        </div>
      </Section>

      <Section title="Contexte de la mission">
        <div>
          <Label>Objet de la mission</Label>
          <textarea value={c.objetMission ?? ''} onChange={(e) => set('objetMission', e.target.value)} rows={2} className={field} />
        </div>
        <div>
          <Label>Description du bien</Label>
          <textarea value={c.descriptionBien ?? ''} onChange={(e) => set('descriptionBien', e.target.value)} rows={2} className={field} />
        </div>
        <div>
          <Label>Contexte de localisation</Label>
          <textarea value={c.contexteLocalisation ?? ''} onChange={(e) => set('contexteLocalisation', e.target.value)} rows={3} className={field} />
        </div>
        <div>
          <Label>Limites &amp; périmètre</Label>
          <textarea value={c.limites ?? ''} onChange={(e) => set('limites', e.target.value)} rows={3} className={field} />
        </div>
      </Section>

      {c.zones.map((z, i) => (
        <Section key={i} title={`Zone ${i + 1}`}>
          <div className="flex gap-2">
            <input value={z.titre ?? ''} onChange={(e) => setZone(i, { titre: e.target.value })} placeholder="Titre de la zone" className={field} />
            <button
              type="button"
              onClick={() => set('zones', c.zones.filter((_, j) => j !== i))}
              className="shrink-0 rounded-lg border border-slate-300 px-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
              aria-label="Supprimer la zone"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div>
            <Label>Description du désordre</Label>
            <textarea value={z.description ?? ''} onChange={(e) => setZone(i, { description: e.target.value })} rows={3} className={field} />
          </div>
          <div>
            <Label>Analyse causale (par probabilité)</Label>
            <StringList items={z.analyseCausale ?? []} onChange={(next) => setZone(i, { analyseCausale: next })} placeholder="Mécanisme possible…" />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <Label>Mesure</Label>
              <input value={z.mesure ?? ''} onChange={(e) => setZone(i, { mesure: e.target.value })} className={field} />
            </div>
            <div>
              <Label>Gravité</Label>
              <select value={z.gravite ?? ''} onChange={(e) => setZone(i, { gravite: e.target.value })} className={field}>
                {GRAVITES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Label>Références techniques</Label>
            <StringList items={z.refsTechniques ?? []} onChange={(next) => setZone(i, { refsTechniques: next })} placeholder="DTU, ITSIM, BRGM…" />
          </div>
          <div>
            <Label>Préconisation</Label>
            <textarea value={z.preconisation ?? ''} onChange={(e) => setZone(i, { preconisation: e.target.value })} rows={2} className={field} />
          </div>
          <div>
            <Label>Encadré (verdict synthétique)</Label>
            <input value={z.encadre ?? ''} onChange={(e) => setZone(i, { encadre: e.target.value })} className={field} />
          </div>
        </Section>
      ))}

      <Section title="Estimation budgétaire des travaux">
        {c.estimationTravaux.map((e, i) => (
          <div key={i} className="grid grid-cols-1 gap-2 rounded-lg border border-slate-100 p-2 sm:grid-cols-[1fr_90px_110px_80px_auto]">
            <input value={e.designation ?? ''} onChange={(ev) => setEstim(i, { designation: ev.target.value })} placeholder="Désignation" className={field} />
            <input value={e.unite ?? ''} onChange={(ev) => setEstim(i, { unite: ev.target.value })} placeholder="Unité" className={field} />
            <input type="number" value={e.montantHT ?? 0} onChange={(ev) => setEstim(i, { montantHT: Number(ev.target.value) })} placeholder="€ HT" className={field} />
            <input type="number" value={e.tva ?? 10} onChange={(ev) => setEstim(i, { tva: Number(ev.target.value) })} placeholder="TVA %" className={field} />
            <button
              type="button"
              onClick={() => set('estimationTravaux', c.estimationTravaux.filter((_, j) => j !== i))}
              className="rounded-lg border border-slate-300 px-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
              aria-label="Supprimer le poste"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => set('estimationTravaux', [...c.estimationTravaux, { designation: '', unite: 'forfait', montantHT: 0, tva: 10 }])}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-3.5 w-3.5" /> Ajouter un poste
          </button>
          <span className="text-sm font-bold text-orange-600">Total {budget.toLocaleString('fr-FR')} € HT</span>
        </div>
      </Section>

      <Section title="Orientations">
        {c.orientations.map((o, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-slate-100 p-2">
            <div className="flex gap-2">
              <input value={o.titre ?? ''} onChange={(e) => setOrient(i, { titre: e.target.value })} placeholder="Titre" className={field} />
              <button
                type="button"
                onClick={() => set('orientations', c.orientations.filter((_, j) => j !== i))}
                className="shrink-0 rounded-lg border border-slate-300 px-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                aria-label="Supprimer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <textarea value={o.detail ?? ''} onChange={(e) => setOrient(i, { detail: e.target.value })} rows={2} placeholder="Détail" className={field} />
          </div>
        ))}
        <button
          type="button"
          onClick={() => set('orientations', [...c.orientations, { titre: '', detail: '' }])}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          <Plus className="h-3.5 w-3.5" /> Ajouter une orientation
        </button>
      </Section>

      <Section title="Conclusion">
        <div>
          <Label>Conclusion</Label>
          <textarea value={c.conclusion ?? ''} onChange={(e) => set('conclusion', e.target.value)} rows={3} className={field} />
        </div>
        <div>
          <Label>Recommandations finales</Label>
          <StringList items={c.conclusionFinale ?? []} onChange={(next) => set('conclusionFinale', next)} placeholder="Recommandation…" />
        </div>
      </Section>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          {pending ? 'Enregistrement…' : 'Enregistrer les modifications'}
        </button>
        {msg && (
          <span className={`inline-flex items-center gap-1 text-xs ${msg.ok ? 'text-emerald-600' : 'text-red-600'}`}>
            {!msg.ok && <AlertTriangle className="h-3.5 w-3.5" />}
            {msg.text}
          </span>
        )}
      </div>
      <p className="text-[11px] text-slate-400">
        Les tableaux de synthèse (synthèse des désordres, matrice de criticité) sont générés
        automatiquement et conservés tels quels ; régénérez le rapport pour les recalculer.
      </p>
    </div>
  );
}
