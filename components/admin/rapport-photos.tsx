'use client';

import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { upload } from '@vercel/blob/client';
import { Camera, Trash2, Loader2, ImageOff } from 'lucide-react';
import {
  attachRapportPhoto,
  updatePhotoMeta,
  deleteRapportPhoto,
} from '@/app/admin/(app)/rapports/actions';

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
  const [isPending, startTransition] = useTransition();

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setBusy(true);
    try {
      for (const file of Array.from(files)) {
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/admin/blob-upload',
          contentType: file.type,
        });
        const fd = new FormData();
        fd.set('rapportId', rapportId);
        fd.set('url', blob.url);
        fd.set('pathname', blob.pathname);
        fd.set('contentType', file.type);
        await attachRapportPhoto(fd);
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Échec de l'envoi.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

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
              capture="environment"
              multiple
              className="hidden"
              onChange={(e) => onFiles(e.target.files)}
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-60"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Camera className="h-4 w-4" />
              )}
              {busy ? 'Envoi…' : 'Ajouter des photos'}
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
