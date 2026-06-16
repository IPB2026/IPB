'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { upload } from '@vercel/blob/client';
import { Camera, Trash2, Loader2, ImageOff, Info, AlertTriangle, RotateCw } from 'lucide-react';
import {
  attachRapportPhoto,
  updatePhotoMeta,
  deleteRapportPhoto,
} from '@/app/admin/(app)/rapports/actions';
import { MAX_PHOTO_BYTES, guessMimeFromName } from '@/lib/blob';
import { compressImage } from '@/lib/image-compression';

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

let _seq = 0;
const nextKey = () => `up_${++_seq}`;

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<Pending[]>([]);
  const [info, setInfo] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const busy = pending.some((p) => p.step !== 'erreur');

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

  function friendlyError(e: unknown): string {
    const m = (e instanceof Error ? e.message : String(e)).toLowerCase();
    if (m.includes('abort') || m.includes('timeout')) return 'Envoi trop long (connexion lente) — réessayez.';
    if (m.includes('413') || m.includes('too large') || m.includes('size')) return 'Photo trop volumineuse (max 15 Mo).';
    if (m.includes('401') || m.includes('unauthorized') || m.includes('autoris')) return 'Session expirée — reconnectez-vous.';
    if (m.includes('429') || m.includes('rate')) return "Trop d'envois — patientez un instant.";
    if (m.includes('network') || m.includes('failed to fetch') || m.includes('fetch')) return 'Connexion instable — réessayez.';
    return e instanceof Error && e.message ? e.message : "Échec de l'envoi.";
  }

  /** Traite UN fichier : compression (HEIC inclus) → envoi → enregistrement base. */
  async function processOne(p: Pending): Promise<boolean> {
    try {
      patch(p.key, { step: 'optim', error: undefined });
      const { file: optimized, note } = await compressImage(p.file);
      if (note) setInfo((prev) => prev ?? note);

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
      await attachRapportPhoto(fd);
      return true;
    } catch (e) {
      patch(p.key, { step: 'erreur', error: friendlyError(e) });
      return false;
    }
  }

  /** Pool de concurrence : N photos traitées en parallèle. */
  async function runQueue(items: Pending[]) {
    let idx = 0;
    let anyOk = false;
    const runners = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (idx < items.length) {
        const item = items[idx++];
        const ok = await processOne(item);
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
    void runQueue(items);
  }

  const retry = (key: string) => {
    const item = pending.find((p) => p.key === key);
    if (item) void runQueue([item]);
  };
  const dismiss = (key: string) =>
    setPending((ps) => {
      const found = ps.find((x) => x.key === key);
      if (found) URL.revokeObjectURL(found.preview);
      return ps.filter((x) => x.key !== key);
    });

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
          Stockage photos non configuré. Définissez <code>BLOB_READ_WRITE_TOKEN</code> (Vercel Blob)
          pour activer l&apos;upload terrain.
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
