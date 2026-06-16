'use client';

import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { upload } from '@vercel/blob/client';
import { Camera, Trash2, Loader2, ImageOff, Info } from 'lucide-react';
import {
  attachRapportPhoto,
  updatePhotoMeta,
  deleteRapportPhoto,
} from '@/app/admin/(app)/rapports/actions';
import { MAX_PHOTO_BYTES, guessMimeFromName } from '@/lib/blob';
import { compressImages } from '@/lib/image-compression';

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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [progress, setProgress] = useState<
    { phase: 'compress' | 'upload'; done: number; total: number } | null
  >(null);
  const [isPending, startTransition] = useTransition();

  // Upload Blob avec quelques tentatives (réseau terrain instable, jeton ~temporaire).
  async function uploadWithRetry(file: File, tries = 3) {
    let lastErr: unknown;
    for (let i = 0; i < tries; i++) {
      try {
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/admin/blob-upload',
          // file.type peut être VIDE (Android/Samsung) → repli sur l'extension,
          // sinon Vercel Blob refuse le jeton avant tout contrôle de taille.
          contentType: file.type || guessMimeFromName(file.name),
        });
        return { url: blob.url, pathname: blob.pathname };
      } catch (e) {
        lastErr = e;
        if (i < tries - 1) await new Promise((r) => setTimeout(r, 800 * 2 ** i));
      }
    }
    throw lastErr;
  }

  function friendlyError(e: unknown): string {
    const m = (e instanceof Error ? e.message : String(e)).toLowerCase();
    if (m.includes('413') || m.includes('too large') || m.includes('size'))
      return 'Photo trop volumineuse (max 15 Mo).';
    if (m.includes('401') || m.includes('unauthorized') || m.includes('autoris'))
      return 'Session expirée — reconnectez-vous puis réessayez.';
    if (m.includes('429') || m.includes('rate'))
      return "Trop d'envois d'affilée — patientez un instant et réessayez.";
    if (m.includes('network') || m.includes('failed to fetch') || m.includes('fetch'))
      return 'Connexion instable — réessayez.';
    return e instanceof Error && e.message ? e.message : "Échec de l'envoi.";
  }

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setInfo(null);
    setBusy(true);
    try {
      const list = Array.from(files);
      // 1) Compression client (Canvas) AVANT upload : ~80 % de poids en moins.
      setProgress({ phase: 'compress', done: 0, total: list.length });
      const compressed = await compressImages(list, {}, (done, total) =>
        setProgress({ phase: 'compress', done, total })
      );
      const notes = new Set<string>();
      // 2) Upload séquentiel + enregistrement en base.
      for (let i = 0; i < compressed.length; i++) {
        const { file, note } = compressed[i];
        if (note) notes.add(note);
        if (file.size > MAX_PHOTO_BYTES) {
          notes.add(`« ${file.name} » dépasse 15 Mo — non envoyée.`);
          continue;
        }
        setProgress({ phase: 'upload', done: i, total: compressed.length });
        const { url, pathname } = await uploadWithRetry(file);
        const fd = new FormData();
        fd.set('rapportId', rapportId);
        fd.set('url', url);
        fd.set('pathname', pathname);
        fd.set('contentType', file.type || guessMimeFromName(file.name));
        await attachRapportPhoto(fd);
      }
      if (notes.size) setInfo(Array.from(notes).join(' '));
      router.refresh();
    } catch (e) {
      setError(friendlyError(e));
    } finally {
      setBusy(false);
      setProgress(null);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  const busyLabel = progress
    ? `${progress.phase === 'compress' ? 'Optimisation' : 'Envoi'} ${Math.min(
        progress.done + 1,
        progress.total
      )}/${progress.total}…`
    : 'Envoi…';

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Reportage photo terrain
          {photos.length > 0 && (
            <span className="ml-2 text-slate-500">({photos.length})</span>
          )}
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
              disabled={busy}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-orange-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-60"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Camera className="h-4 w-4" />
              )}
              {busy ? busyLabel : 'Ajouter des photos'}
            </button>
          </>
        )}
      </div>

      {!blobConfigured && (
        <p className="mb-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          <ImageOff className="mt-0.5 h-4 w-4 shrink-0" />
          Stockage photos non configuré. Définissez <code>BLOB_READ_WRITE_TOKEN</code>{' '}
          (Vercel Blob) pour activer l'upload terrain.
        </p>
      )}

      {error && (
        <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </p>
      )}

      {info && (
        <p className="mb-3 flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {info}
        </p>
      )}

      {canEdit && blobConfigured && photos.length === 0 && !busy && (
        <p className="mb-3 text-xs text-slate-400">
          Astuce : prenez la photo ou choisissez-la dans la galerie — elle est
          automatiquement optimisée (≈ 80 % plus légère) avant l’envoi.
        </p>
      )}

      {photos.length === 0 ? (
        <p className="text-sm text-slate-500">
          {canEdit
            ? 'Aucune photo. Prenez vos clichés sur place — ils enrichiront l’analyse IA et le rapport PDF.'
            : 'Aucune photo transmise par le diagnostiqueur.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {photos.map((p) => (
            <div
              key={p.id}
              className="overflow-hidden rounded-lg border border-slate-200"
            >
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
                    <select
                      name="zoneRef"
                      defaultValue={p.zoneRef ?? ''}
                      className={field}
                    >
                      <option value="">— Zone —</option>
                      {zones.map((z) => (
                        <option key={z} value={z}>
                          {z}
                        </option>
                      ))}
                    </select>
                    <select
                      name="gravite"
                      defaultValue={p.gravite ?? ''}
                      className={field}
                    >
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
