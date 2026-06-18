'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Loader2, AlertTriangle } from 'lucide-react';

/**
 * Génération progressive du rapport : enchaîne des passes courtes
 * (POST /api/admin/rapports/[id]/generate-step) jusqu'à `done`, avec barre de
 * progression. Chaque passe tient sous le plafond de 60 s d'une fonction Vercel
 * Hobby — c'est ce qui permet un rapport complet sans plan payant.
 */
export function RapportGenerate({
  rapportId,
  disabled,
  hasContent,
  building,
}: {
  rapportId: string;
  disabled: boolean;
  hasContent: boolean; // un rapport complet existe déjà
  building: boolean; // une génération est en cours / interrompue (brouillon)
}) {
  const router = useRouter();
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState<{ step: number; total: number; label: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(reset: boolean) {
    setError(null);
    setRunning(true);
    setProgress(null);
    // Identifiant unique de CETTE génération : sert de verrou côté serveur pour
    // qu'un second onglet/clic ne vienne pas corrompre le même brouillon.
    const runId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    try {
      // Boucle d'étapes. Borne dure (garde-fou anti-boucle infinie) : au plus
      // ~1 squelette + 40 zones + 1 synthèse + marge.
      type StepResult = {
        done?: boolean;
        step?: number;
        total?: number;
        label?: string;
        error?: string;
      };
      for (let i = 0; i < 60; i++) {
        let data: StepResult = {};
        let ok = false;
        let status = 0;
        // Une passe peut échouer ponctuellement (502, réseau, pic de latence). La
        // route étant REPRENABLE (elle repart de l'étape non terminée, brouillon
        // préservé), on la relance UNE fois avant d'abandonner.
        for (let attempt = 0; attempt < 2 && !ok; attempt++) {
          const res = await fetch(`/api/admin/rapports/${rapportId}/generate-step`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ reset: reset && i === 0, runId }),
          });
          status = res.status;
          data = (await res.json().catch(() => ({}))) as StepResult;
          ok = res.ok && !data.error;
          if (!ok && attempt === 0) await new Promise((r) => setTimeout(r, 1200));
        }
        if (!ok) {
          setError(data.error || `Erreur ${status} — réessayez.`);
          setRunning(false);
          return;
        }
        setProgress({ step: data.step ?? 0, total: data.total ?? 0, label: data.label ?? '' });
        if (data.done) {
          setRunning(false);
          setProgress(null);
          router.refresh();
          return;
        }
      }
      setError('Génération anormalement longue — réessayez.');
      setRunning(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Échec de l'appel.");
      setRunning(false);
    }
  }

  const label = running
    ? progress
      ? `${progress.label} — ${progress.step}/${progress.total}…`
      : 'Démarrage…'
    : hasContent
      ? 'Régénérer'
      : building
        ? 'Reprendre la génération'
        : 'Générer le rapport';

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={() => run(hasContent)}
        disabled={disabled || running}
        className="inline-flex items-center gap-1.5 rounded-lg border border-orange-600 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50 disabled:opacity-50"
      >
        {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        {label}
      </button>
      {running && (
        <span className="text-[11px] text-slate-400">Ne fermez pas l’onglet pendant la génération.</span>
      )}
      {error && (
        <span className="inline-flex items-center gap-1 text-right text-xs text-red-600">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </span>
      )}
    </div>
  );
}
