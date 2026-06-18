import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth-helpers';
import {
  isBlobConfigured,
  getBlobToken,
  guessMimeFromName,
  ALLOWED_PHOTO_TYPES,
  MAX_PHOTO_BYTES,
} from '@/lib/blob';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/**
 * Upload photo terrain CÔTÉ SERVEUR (le navigateur poste le fichier compressé ici,
 * et c'est NOTRE serveur qui écrit dans Vercel Blob via put()).
 *
 * Pourquoi : l'upload direct navigateur → blob.vercel-storage.com échoue chez
 * certains clients (réseau/extension/proxy qui bloque le domaine Blob) — alors que
 * le site lui-même est joignable. Comme la photo est compressée (~500 Ko) avant
 * envoi, elle tient sous la limite de corps des fonctions serverless (≈ 4,5 Mo).
 * Le composant garde l'upload direct en repli pour les fichiers volumineux.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  let user;
  try {
    user = await requireUser();
  } catch {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
  }

  if (!isBlobConfigured()) {
    return NextResponse.json({ error: 'Stockage photos non configuré.' }, { status: 503 });
  }

  const id = params.id;
  const rapport = await prisma.rapport.findUnique({
    where: { id },
    select: { id: true, authorId: true },
  });
  if (!rapport) return NextResponse.json({ error: 'Rapport introuvable.' }, { status: 404 });
  // Même cloisonnement que loadOwned : ADMIN partout, EXPERT sur ses rapports.
  if (user.role !== 'ADMIN' && rapport.authorId !== user.id) {
    return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Aucun fichier reçu.' }, { status: 400 });
  }
  if (file.size > MAX_PHOTO_BYTES) {
    return NextResponse.json({ error: 'Photo trop volumineuse (max 15 Mo).' }, { status: 413 });
  }

  // Type MIME fiabilisé (jamais vide pour une vraie image → affichage + vision OK).
  const contentType = file.type || guessMimeFromName(file.name);
  if (!ALLOWED_PHOTO_TYPES.includes(contentType)) {
    return NextResponse.json({ error: 'Format d’image non supporté.' }, { status: 415 });
  }

  try {
    const blob = await put(file.name || 'photo.jpg', file, {
      access: 'public',
      token: getBlobToken(),
      addRandomSuffix: true,
      contentType,
    });
    const count = await prisma.photo.count({ where: { rapportId: id } });
    const photo = await prisma.photo.create({
      data: {
        rapportId: id,
        url: blob.url,
        pathname: blob.pathname,
        contentType,
        position: count,
      },
    });
    revalidatePath(`/admin/rapports/${id}`);
    return NextResponse.json({ ok: true, photo: { id: photo.id, url: photo.url } });
  } catch (err) {
    console.error('[photo upload serveur] échec:', err);
    Sentry.captureException(err, { tags: { area: 'photo-upload' }, extra: { rapportId: id } });
    return NextResponse.json({ error: 'Envoi serveur échoué.' }, { status: 502 });
  }
}
