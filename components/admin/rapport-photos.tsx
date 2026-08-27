'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { upload } from '@vercel/blob/client';
import {
  Camera,
  Trash2,
  Loader2,
  ImageOff,
  Info,
  AlertTriangle,
  RotateCw,
  WifiOff,
} from 'lucide-react';
import {
  attachRapportPhoto,
  updatePhotoMeta,
  deleteRapportPhoto,
} from '@/app/admin/(app)/rapports/actions';
import { MAX_PHOTO_BYTES, guessMimeFromName } from '@/lib/blob';
import { compressImage } from '@/lib/image-compression';
import {
  enqueuePhoto,
  removeQueuedPhoto,
  listQueuedPhotos,
  purgeOldQueuedPhotos,
} from '@/lib/photo-queue';
import { useOnline } from '@/hooks/useOnline';

export interface PhotoVM {
  id: string;
  url: string;
  caption: string | null;
  zoneRef: string | null;
  gravite: string | null;
}

const GRAVITES = ['', 'À TRAITER', 'IMPORTANT', 'À SURVEILLER', 'INFO'];
const field =
  'w-full rounded-md border border-slate-300 px-2.5 py-2 text-base outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 sm:py-1.5 sm:text-xs';

const UPLOAD_TIMEOUT_MS = 45_000; // un envoi qui dépasse 45 s est abandonné (jamais 15 min)
const CONCURRENCY = 3; // photos traitées en parallèle

type Step = 'optim' | 'envoi' | 'erreur';
interface Pending {
  key: string;
  name: string;
  preview: string; // object URL pour l'aperçu immédiat
  step: Step;
  error?: string;
  file: File; // fichier d'origine (pour réessayer)
}

const OFFLINE_MSG =
  'Hors ligne — la photo est conservée sur cet appareil et repartira au retour du réseau.';

let _seq = 0;
/** Clé unique ET durable : elle identifie la photo dans IndexedDB, donc elle doit
 *  rester valable après un rechargement de page (un compteur seul repartirait à 1). */
const nextKey = () =>
  `up_${Date.now().toString(36)}_${(++_seq).toString(36)}_${Math.random().toString(36).slice(2, 7)}`;

export function RapportPhotos({
  rapportId,
  photos,
  zones,
  blobConfigured,
  canEdit,
}: {
  rapportId: string;
  photos: PhotoVM[];
  zones: string[];
  blobConfigured: boolean;
  canEdit: boolean;
}) {
  const router = useRouter();
  const online = useOnline();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<Pending[]>([]);
  const [info, setInfo] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const busy = pending.some((p) => p.step !== 'erreur');
  /** Clés des photos en cours de traitement (voir runQueue). */
  const inFlight = useRef<Set<string>>(new Set());

  // Nettoyage des object URLs à la fin.
  useEffect(() => {
    return () => pending.forEach((p) => URL.revokeObjectURL(p.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const patch = (key: string, up: Partial<Pending>) =>
    setPending((ps) => ps.map((p) => (p.key === key ? { ...p, ...up } : p)));

  /** Envoi Blob avec timeout dur (AbortController) — l'envoi ne peut pas se figer. */
  async function uploadBlob(file: File) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), UPLOAD_TIMEOUT_MS);
    try {
      return await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/admin/blob-upload',
        // file.type peut être vide (Android) → repli sur l'extension.
        contentType: file.type || guessMimeFromName(file.name),
        abortSignal: ctrl.signal,
      });
    } finally {
      clearTimeout(timer);
    }
  }

  /** Envoi via NOTRE serveur (route /photo) : le navigateur ne contacte que le site,
   *  pas blob.vercel-storage.com (parfois bloqué par réseau/extension/proxy). Le
   *  serveur écrit dans Blob + enregistre en base. Renvoie true si réussi. */
  async function uploadViaServer(file: File): Promise<boolean> {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), UPLOAD_TIMEOUT_MS);
    try {
      const fd = new FormData();
      fd.set('file', file, file.name);
      const res = await fetch(`/api/admin/rapports/${rapportId}/photo`, {
        method: 'POST',
        body: fd,
        signal: ctrl.signal,
      });
      if (!res.ok) return false;
      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      return Boolean(data?.ok);
    } catch {
      return false;
    } finally {
      clearTimeout(timer);
    }
  }

  function friendlyError(e: unknown): string {
    const m = (e instanceof Error ? e.message : String(e)).toLowerCase();
    if (m.includes('abort') || m.includes('timeout')) return 'Envoi trop long (connexion lente) — réessayez.';
    if (m.includes('413') || m.includes('too large') || m.includes('size')) return 'Photo trop volumineuse (max 15 Mo).';
    if (m.includes('401') || m.includes('unauthorized') || m.includes('autoris')) return 'Session expirée — reconnectez-vous.';
    if (m.includes('429') || m.includes('rate')) return "Trop d'envois — patientez un instant.";
    if (m.includes('network') || m.includes('failed to fetch') || m.includes('fetch')) return 'Connexion instable — réessayez.';
    return e instanceof Error && e.message ? e.message : "Échec de l'envoi.";
  }

  /** Compression bornée dans le temps : si l'optimisation (décodage HEIC, canvas)
   *  se fige > 25 s, on envoie la photo telle quelle au lieu de rester bloqué. */
  async function compressBounded(file: File): Promise<{ file: File; note?: string }> {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<{ file: File; note?: string }>((resolve) => {
      timer = setTimeout(
        () => resolve({ file, note: 'Optimisation trop longue — photo envoyée telle quelle.' }),
        25000
      );
    });
    try {
      return await Promise.race([
        compressImage(file).then((r) => ({ file: r.file, note: r.note })),
        timeout,
      ]);
    } catch {
      return { file, note: undefined }; // au pire on envoie l'original
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  /** Traite UN fichier : compression (HEIC inclus) → envoi → enregistrement base. */
  async function processOne(p: Pending): Promise<boolean> {
    try {
      // Hors ligne : inutile de brûler 45 s de timeout, la photo est déjà en
      // sécurité sur l'appareil. Elle repartira sur l'événement « online ».
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        patch(p.key, { step: 'erreur', error: OFFLINE_MSG });
        return false;
      }
      patch(p.key, { step: 'optim', error: undefined });
      const { file: optimized, note } = await compressBounded(p.file);
      if (note) setInfo((prev) => prev ?? note);

      // La version compressée remplace l'originale dans la file locale : même
      // sécurité, beaucoup moins de stockage occupé sur le téléphone.
      if (optimized !== p.file) {
        void enqueuePhoto({
          key: p.key,
          rapportId,
          name: p.name,
          addedAt: Date.now(),
          file: optimized,
        });
      }

      // Aperçu mis à jour avec le JPEG (utile pour les HEIC, illisibles sinon).
      // Révocation FAITE HORS de l'updater (pas d'effet de bord dans setState).
      if (optimized !== p.file) {
        const fresh = URL.createObjectURL(optimized);
        URL.revokeObjectURL(p.preview);
        patch(p.key, { preview: fresh });
      }

      if (optimized.size > MAX_PHOTO_BYTES) {
        patch(p.key, { step: 'erreur', error: 'Dépasse 15 Mo même après optimisation.' });
        return false;
      }

      patch(p.key, { step: 'envoi' });

      // VOIE 1 (fiable) — via notre serveur. Le fichier compressé est petit
      // (< 4,5 Mo), donc dans la limite de corps d'une fonction serverless.
      if (optimized.size <= 4 * 1024 * 1024 && (await uploadViaServer(optimized))) {
        await removeQueuedPhoto(p.key);
        return true;
      }

      // VOIE 2 (repli) — upload direct navigateur → Blob (gros fichiers, ou serveur
      // indisponible), puis enregistrement en base via la server action.
      let blob: Awaited<ReturnType<typeof uploadBlob>> | null = null;
      let lastErr: unknown;
      for (let i = 0; i < 2; i++) {
        try {
          blob = await uploadBlob(optimized);
          break;
        } catch (e) {
          lastErr = e;
          if (i === 0) await new Promise((r) => setTimeout(r, 700));
        }
      }
      if (!blob) throw lastErr;

      const fd = new FormData();
      fd.set('rapportId', rapportId);
      fd.set('url', blob.url);
      fd.set('pathname', blob.pathname);
      fd.set('contentType', optimized.type || guessMimeFromName(optimized.name));
      const res = await attachRapportPhoto(fd);
      if (!res?.ok) throw new Error(res?.error ?? 'Enregistrement échoué.');
      await removeQueuedPhoto(p.key);
      return true;
    } catch (e) {
      patch(p.key, { step: 'erreur', error: friendlyError(e) });
      return false;
    }
  }

  /** Pool de concurrence : N photos traitées en parallèle. */
  async function runQueue(input: Pending[]) {
    // Garde anti-doublon : un cliché déjà en cours de traitement est ignoré. Sans
    // elle, un « Réessayer » manuel pendant la relance automatique du retour de
    // réseau enverrait deux fois la même photo — et la créerait en double.
    const items = input.filter((it) => !inFlight.current.has(it.key));
    if (items.length === 0) return;
    items.forEach((it) => inFlight.current.add(it.key));

    let idx = 0;
    let anyOk = false;
    const runners = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (idx < items.length) {
        const item = items[idx++];
        let ok = false;
        try {
          ok = await processOne(item);
        } finally {
          inFlight.current.delete(item.key);
        }
        if (ok) {
          anyOk = true;
          // Succès : on retire la carte provisoire (le refresh chargera la vraie).
          setPending((ps) => {
            const found = ps.find((x) => x.key === item.key);
            if (found) URL.revokeObjectURL(found.preview);
            return ps.filter((x) => x.key !== item.key);
          });
        }
      }
    });
    await Promise.all(runners);
    if (anyOk) router.refresh();
  }

  function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setInfo(null);
    const items: Pending[] = Array.from(files).map((file) => ({
      key: nextKey(),
      name: file.name,
      preview: URL.createObjectURL(file),
      step: 'optim' as Step,
      file,
    }));
    setPending((ps) => [...ps, ...items]);
    if (inputRef.current) inputRef.current.value = '';
    // Écriture sur l'appareil AVANT l'envoi : si la page est rechargée ou évincée
    // par iOS en pleine visite, le cliché est retrouvé au retour sur le rapport.
    for (const it of items) {
      void enqueuePhoto({
        key: it.key,
        rapportId,
        name: it.name,
        addedAt: Date.now(),
        file: it.file,
      });
    }
    void runQueue(items);
  }

  const retry = (key: string) => {
    const item = pending.find((p) => p.key === key);
    if (item) void runQueue([item]);
  };
  const dismiss = (key: string) => {
    void removeQueuedPhoto(key); // abandon explicite : on libère le stockage
    setPending((ps) => {
      const found = ps.find((x) => x.key === key);
      if (found) URL.revokeObjectURL(found.preview);
      return ps.filter((x) => x.key !== key);
    });
  };

  /* ── Reprise : photos restées en file d'une session précédente ── */
  const restored = useRef(false);
  useEffect(() => {
    if (restored.current || !canEdit || !blobConfigured) return;
    restored.current = true;
    let cancelled = false;
    (async () => {
      void purgeOldQueuedPhotos();
      const queued = await listQueuedPhotos(rapportId);
      if (cancelled || queued.length === 0) return;
      const reprise = navigator.onLine;
      const items: Pending[] = queued.map((q) => {
        const file =
          q.file instanceof File
            ? q.file
            : new File([q.file], q.name, { type: (q.file as Blob).type });
        return {
          key: q.key,
          name: q.name,
          preview: URL.createObjectURL(file),
          step: 'erreur' as Step,
          error: reprise ? 'Envoi interrompu — reprise en cours.' : OFFLINE_MSG,
          file,
        };
      });
      setPending((ps) => {
        const known = new Set(ps.map((x) => x.key));
        return [...ps, ...items.filter((x) => !known.has(x.key))];
      });
      setInfo(
        reprise
          ? `${items.length} photo(s) non transmise(s) retrouvée(s) sur cet appareil — envoi repris.`
          : `${items.length} photo(s) non transmise(s) conservée(s) sur cet appareil — envoi au retour du réseau.`
      );
      if (reprise) void runQueue(items);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Retour du réseau : on relance tout ce qui a échoué ── */
  const wasOnline = useRef(true);
  useEffect(() => {
    if (!wasOnline.current && online) {
      const failed = pending.filter((p) => p.step === 'erreur');
      if (failed.length) void runQueue(failed);
    }
    wasOnline.current = online;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online]);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Reportage photo terrain
          {photos.length > 0 && <span className="ml-2 text-slate-500">({photos.length})</span>}
        </h2>
        {canEdit && blobConfigured && (
          <>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => onFiles(e.target.files)}
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-orange-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
              {busy ? 'Traitement…' : 'Ajouter des photos'}
            </button>
          </>
        )}
      </div>

      {!blobConfigured && (
        <p className="mb-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          <ImageOff className="mt-0.5 h-4 w-4 shrink-0" />
          Stockage photos non configuré. Connectez un store <strong>Vercel Blob</strong> au projet
          (Storage → Blob) puis redéployez — l&apos;upload terrain s&apos;activera tout seul.
        </p>
      )}

      {canEdit && blobConfigured && !online && (
        <p className="mb-3 flex items-start gap-2 rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-xs text-slate-700">
          <WifiOff className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Hors ligne — continuez à photographier : les clichés sont conservés sur cet appareil
          et partent automatiquement au retour du réseau.
        </p>
      )}

      {blobConfigured && !canEdit && (
        <p className="mb-3 flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          L&apos;ajout de photos n&apos;est plus possible à ce stade (rapport pris en main par l&apos;IPB).
        </p>
      )}

      {info && (
        <p className="mb-3 flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {info}
        </p>
      )}

      {canEdit && blobConfigured && photos.length === 0 && pending.length === 0 && (
        <p className="mb-3 text-xs text-slate-400">
          Prenez la photo ou choisissez-la dans la galerie — elle est automatiquement optimisée
          (≈ 80 % plus légère, HEIC iPhone converti) avant l’envoi.
        </p>
      )}

      {photos.length === 0 && pending.length === 0 ? (
        <p className="text-sm text-slate-500">
          {canEdit
            ? 'Aucune photo. Vos clichés enrichiront l’analyse IA et le rapport PDF.'
            : 'Aucune photo transmise par le diagnostiqueur.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Cartes provisoires (en cours d'envoi / en erreur) */}
          {pending.map((p) => (
            <div key={p.key} className="overflow-hidden rounded-lg border border-slate-200">
              <div className="relative h-44 w-full bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.preview} alt={p.name} className="h-44 w-full object-cover opacity-60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-black/35 text-center text-white">
                  {p.step === 'erreur' ? (
                    <>
                      <AlertTriangle className="h-5 w-5 text-red-300" />
                      <span className="px-3 text-[11px] leading-tight">{p.error}</span>
                      <div className="mt-1 flex gap-2">
                        <button
                          type="button"
                          onClick={() => retry(p.key)}
                          className="inline-flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-800 hover:bg-white"
                        >
                          <RotateCw className="h-3 w-3" /> Réessayer
                        </button>
                        <button
                          type="button"
                          onClick={() => dismiss(p.key)}
                          className="rounded-md bg-white/20 px-2 py-1 text-[11px] font-medium hover:bg-white/30"
                        >
                          Retirer
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="text-[11px] font-medium">
                        {p.step === 'optim' ? 'Optimisation…' : 'Envoi…'}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="truncate p-2 text-[11px] text-slate-400">{p.name}</div>
            </div>
          ))}

          {/* Photos enregistrées */}
          {photos.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-lg border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.url}
                alt={p.caption || 'Photo terrain'}
                className="h-44 w-full bg-slate-100 object-cover"
              />
              {canEdit ? (
                <form
                  action={(fd) => {
                    fd.set('rapportId', rapportId);
                    fd.set('photoId', p.id);
                    startTransition(async () => {
                      await updatePhotoMeta(fd);
                      router.refresh();
                    });
                  }}
                  className="space-y-2 p-3"
                >
                  <input
                    name="caption"
                    defaultValue={p.caption ?? ''}
                    placeholder="Légende (ex. Fissure en escalier, angle SE)"
                    className={field}
                  />
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <select name="zoneRef" defaultValue={p.zoneRef ?? ''} className={field}>
                      <option value="">— Zone —</option>
                      {zones.map((z) => (
                        <option key={z} value={z}>
                          {z}
                        </option>
                      ))}
                    </select>
                    <select name="gravite" defaultValue={p.gravite ?? ''} className={field}>
                      {GRAVITES.map((g) => (
                        <option key={g} value={g}>
                          {g || '— Gravité —'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                    >
                      Enregistrer
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!window.confirm('Supprimer cette photo ? Action irréversible.')) return;
                        const fd = new FormData();
                        fd.set('rapportId', rapportId);
                        fd.set('photoId', p.id);
                        startTransition(async () => {
                          await deleteRapportPhoto(fd);
                          router.refresh();
                        });
                      }}
                      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Supprimer
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-1 p-3 text-xs text-slate-600">
                  {p.caption && <p className="font-medium text-slate-800">{p.caption}</p>}
                  <p className="text-slate-400">
                    {[p.zoneRef, p.gravite].filter(Boolean).join(' · ') || '—'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
