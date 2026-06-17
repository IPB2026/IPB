import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth-helpers';
import { ALLOWED_PHOTO_TYPES, MAX_PHOTO_BYTES, isBlobConfigured, getBlobToken } from '@/lib/blob';

export const runtime = 'nodejs';

/**
 * Génère les jetons d'upload direct vers Vercel Blob (client upload), ce qui
 * contourne la limite de taille des Server Actions pour les photos smartphone.
 * L'authentification est vérifiée avant toute émission de jeton.
 */
export async function POST(request: Request): Promise<NextResponse> {
  if (!isBlobConfigured()) {
    return NextResponse.json(
      { error: 'Stockage photos non configuré (BLOB_READ_WRITE_TOKEN absent).' },
      { status: 503 }
    );
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      // Token résolu de façon robuste (nom de variable insensible) — sinon le SDK
      // ne lit que process.env.BLOB_READ_WRITE_TOKEN et échoue si nommé autrement.
      token: getBlobToken(),
      body,
      request,
      onBeforeGenerateToken: async () => {
        const user = await getSessionUser();
        if (!user) throw new Error('Non autorisé');
        return {
          allowedContentTypes: ALLOWED_PHOTO_TYPES,
          maximumSizeInBytes: MAX_PHOTO_BYTES,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ userId: user.id }),
        };
      },
      // La ligne Photo en base est créée côté server action après l'upload
      // (attachRapportPhoto), ce qui évite une dépendance au webhook en local.
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    // Tracé pour diagnostic : un échec d'émission de jeton (auth, type, taille)
    // apparaît désormais dans les logs runtime Vercel.
    console.error('[blob-upload] échec génération jeton:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
