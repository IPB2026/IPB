'use client';

import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import {
  Plus,
  Trash2,
  Check,
  Sparkles,
  Loader2,
  WifiOff,
  RotateCcw,
  X,
  HardDriveDownload,
} from 'lucide-react';
import {
  updateRapportZones,
  structureDictation,
} from '@/app/admin/(app)/rapports/actions';
import { VoiceDictationButton } from '@/components/admin/voice-dictation-button';
import {
  readDraft,
  writeDraft,
  clearDraft,
  purgeExpiredDrafts,
  formatAgo,
} from '@/lib/field-draft';
import { useOnline } from '@/hooks/useOnline';

type Zone = { titre: string; observations: string; mesure: string; gravite: string };
/** Ce que l'on conserve sur l'appareil : les zones ET la dictée en cours. */
type DraftData = { zones: Zone[]; dictee: string };

const field =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200';
const GRAVITES = ['À TRAITER', 'IMPORTANT', 'À SURVEILLER', 'INFO'];

const OFFLINE_MSG =
  "Hors ligne — votre saisie est conservée sur cet appareil et sera enregistrée automatiquement au retour du réseau.";
const NETWORK_MSG =
  "Réseau indisponible — votre saisie est conservée sur cet appareil. Elle repartira dès que la connexion revient.";

const emptyZone = (): Zone => ({ titre: '', observations: '', mesure: '', gravite: 'À TRAITER' });
/** Critère d'enregistrement côté serveur — répliqué ici pour prévenir l'utilisateur. */
const isComplete = (z: Zone) => Boolean(z.titre.trim() && z.observations.trim());
const snapshot = (zones: Zone[]) => JSON.stringify(zones);

export function RapportZonesEditor({
  rapportId,
  initialZones,
}: {
  rapportId: string;
  initialZones: Zone[];
}) {
  const draftKey = `zones:${rapportId}`;
  const online = useOnline();

  const [zones, setZones] = useState<Zone[]>(
    initialZones.length ? initialZones : [emptyZone()]
  );
  const [dictee, setDictee] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiPending, startAi] = useTransition();
  const [saving, startSave] = useTransition();

  // Dernier état réellement enregistré côté serveur : sert à savoir si la saisie
  // en cours diverge (donc s'il reste quelque chose à transmettre).
  const [serverSnapshot, setServerSnapshot] = useState(() => snapshot(zones));
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [localSavedAt, setLocalSavedAt] = useState<number | null>(null);
  const [needsSync, setNeedsSync] = useState(false);
  const needsSyncRef = useRef(false);
  const setNeedsSyncBoth = (v: boolean) => {
    needsSyncRef.current = v;
    setNeedsSync(v);
  };

  // Brouillon retrouvé sur l'appareil (saisie d'une session précédente jamais
  // transmise). Copie en mémoire : l'autosave peut réécrire le stockage sans
  // détruire ce que l'on propose de restaurer.
  const [recovered, setRecovered] = useState<{ data: DraftData; savedAt: number } | null>(null);

  const dirty = snapshot(zones) !== serverSnapshot;

  /* ── Au montage : purge des vieux brouillons + détection d'une saisie orpheline ── */
  useEffect(() => {
    purgeExpiredDrafts();
    const draft = readDraft<DraftData>(draftKey);
    if (!draft?.data?.zones?.length) return;
    // On ne propose la restauration que si le brouillon diffère de ce que le
    // serveur nous a servi (sinon il n'apporte rien).
    if (snapshot(draft.data.zones) === snapshot(initialZones.length ? initialZones : [emptyZone()])) {
      clearDraft(draftKey);
      return;
    }
    setRecovered({ data: draft.data, savedAt: draft.savedAt });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Autosave local : à chaque frappe, débounce court ── */
  useEffect(() => {
    const t = setTimeout(() => {
      if (writeDraft<DraftData>(draftKey, { zones, dictee })) setLocalSavedAt(Date.now());
    }, 500);
    return () => clearTimeout(t);
  }, [zones, dictee, draftKey]);

  const update = (i: number, patch: Partial<Zone>) =>
    setZones((zs) => zs.map((z, j) => (j === i ? { ...z, ...patch } : z)));
  const add = () => setZones((zs) => [...zs, emptyZone()]);
  const remove = (i: number) =>
    setZones((zs) => (zs.length > 1 ? zs.filter((_, j) => j !== i) : zs));

  /* ── Enregistrement serveur ── */
  const save = useCallback(() => {
    setError(null);
    setNotice(null);
    startSave(async () => {
      const payload = zones;
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        setNeedsSyncBoth(true);
        setNotice(OFFLINE_MSG); // situation prévue et maîtrisée : pas une erreur rouge
        return;
      }
      try {
        const fd = new FormData();
        fd.set('rapportId', rapportId);
        fd.set('zones', JSON.stringify(payload));
        const err = await updateRapportZones(undefined, fd);
        if (err) {
          setError(err); // refus métier (zones incomplètes) : rien à resynchroniser
          return;
        }
        // Le serveur n'enregistre que les zones ayant un titre ET des observations :
        // sans avertissement, une zone à moitié remplie disparaîtrait en silence.
        const dropped = payload.length - payload.filter(isComplete).length;
        setNotice(
          dropped > 0
            ? `${dropped} zone(s) incomplète(s) non transmise(s) : un titre ET des observations sont nécessaires. Elles restent sur cet appareil.`
            : null
        );
        // On ne libère le brouillon local que si le serveur a tout repris.
        if (dropped === 0) clearDraft(draftKey);
        setNeedsSyncBoth(false);
        setServerSnapshot(snapshot(payload));
        setSavedAt(Date.now());
      } catch {
        // Échec réseau : la saisie reste sur l'appareil, on retentera au retour.
        setNeedsSyncBoth(true);
        setNotice(NETWORK_MSG);
      }
    });
  }, [zones, rapportId, draftKey]);

  /* ── Retour du réseau : on retransmet ce qui n'est pas passé ── */
  const wasOnline = useRef(true);
  useEffect(() => {
    if (!wasOnline.current && online && needsSyncRef.current) save();
    wasOnline.current = online;
  }, [online, save]);

  // Dictée libre → zones structurées par l'IA, fusionnées dans l'éditeur.
  const structurer = () => {
    setAiError(null);
    startAi(async () => {
      try {
        const res = await structureDictation(rapportId, dictee);
        if (res.error || !res.zones) {
          setAiError(res.error ?? 'Aucune zone détectée.');
          return;
        }
        const fresh: Zone[] = res.zones.map((z) => ({
          titre: z.titre ?? '',
          observations: z.observations ?? '',
          mesure: z.mesure ?? '',
          gravite: z.gravite || 'À SURVEILLER',
        }));
        setZones((prev) => {
          const kept = prev.filter((z) => z.titre.trim() || z.observations.trim());
          return [...kept, ...fresh];
        });
        setDictee('');
      } catch {
        setAiError(
          online
            ? "La structuration a échoué — votre texte est conservé, réessayez."
            : "Hors ligne — votre dictée est conservée sur cet appareil, structurez-la au retour du réseau."
        );
      }
    });
  };

  return (
    <div className="space-y-3">
      {/* Saisie orpheline retrouvée sur l'appareil */}
      {recovered && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-3">
          <p className="flex items-start gap-2 text-sm font-medium text-amber-900">
            <HardDriveDownload className="mt-0.5 h-4 w-4 shrink-0" />
            Une saisie non transmise a été retrouvée sur cet appareil (
            {formatAgo(recovered.savedAt)}).
          </p>
          <p className="mt-1 pl-6 text-xs text-amber-800">
            {recovered.data.zones.length} zone(s). La restaurer remplacera la saisie
            actuellement affichée.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 pl-6">
            <button
              type="button"
              onClick={() => {
                setZones(recovered.data.zones.length ? recovered.data.zones : [emptyZone()]);
                setDictee(recovered.data.dictee || '');
                setRecovered(null);
              }}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-700"
            >
              <RotateCcw className="h-4 w-4" /> Restaurer cette saisie
            </button>
            <button
              type="button"
              onClick={() => {
                clearDraft(draftKey);
                setRecovered(null);
              }}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-amber-300 px-3 py-2 text-sm font-medium text-amber-900 hover:bg-amber-100"
            >
              <X className="h-4 w-4" /> Ignorer
            </button>
          </div>
        </div>
      )}

      {/* Bandeau réseau : le diagnostiqueur doit savoir, en cave, que rien n'est perdu */}
      {!online && (
        <p className="flex items-start gap-2 rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-xs text-slate-700">
          <WifiOff className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {OFFLINE_MSG}
        </p>
      )}

      {/* Dictée rapide : le diagnostiqueur parle, l'IA range en zones */}
      <div className="rounded-lg border border-orange-200 bg-orange-50/40 p-3">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
            <Sparkles className="h-4 w-4 text-orange-600" />
            Dictée rapide
          </span>
          <VoiceDictationButton
            onAppend={(t) => setDictee((d) => (d ? `${d} ${t}` : t))}
          />
        </div>
        <p className="mb-2 text-xs text-slate-500">
          Décrivez tout à voix haute (ou à l&apos;écrit), d&apos;une traite. L&apos;IA découpe
          ensuite vos constats en zones — que vous relisez et complétez.
        </p>
        <textarea
          value={dictee}
          onChange={(e) => setDictee(e.target.value)}
          rows={3}
          placeholder="Ex. « Grosse fissure en escalier sur le mur sud du séjour, environ 3 mm. Dans la cave, traces d'humidité et salpêtre en bas du mur. »"
          className={field}
        />
        {aiError && <p className="mt-1.5 text-xs text-red-600">{aiError}</p>}
        <button
          type="button"
          onClick={structurer}
          disabled={aiPending || !dictee.trim() || !online}
          className="mt-2 inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-orange-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-60"
        >
          {aiPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Structuration…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Structurer en zones
            </>
          )}
        </button>
        {!online && dictee.trim() && (
          <p className="mt-1.5 text-xs text-slate-500">
            La structuration IA nécessite du réseau — votre texte est conservé.
          </p>
        )}
      </div>

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

      {notice && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          {notice}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          <Plus className="h-3.5 w-3.5" /> Ajouter une zone
        </button>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          {saving ? 'Enregistrement…' : 'Enregistrer la saisie'}
        </button>
      </div>

      {/* État de la saisie : local vs serveur. Court, factuel, toujours visible. */}
      <p className="text-xs text-slate-500">
        {needsSync ? (
          <span className="text-amber-700">
            En attente de réseau — conservée sur cet appareil
            {localSavedAt ? ` (${formatAgo(localSavedAt)})` : ''}.
          </span>
        ) : dirty ? (
          <span>
            Modifications non enregistrées
            {localSavedAt ? ` — conservées sur cet appareil (${formatAgo(localSavedAt)})` : ''}.
          </span>
        ) : savedAt ? (
          <span className="text-emerald-700">Saisie enregistrée {formatAgo(savedAt)}.</span>
        ) : (
          <span>Saisie à jour.</span>
        )}
      </p>
    </div>
  );
}
