/**
 * Helpers Vercel Blob — stockage des photos terrain.
 * Sans BLOB_READ_WRITE_TOKEN configuré, l'upload est désactivé proprement
 * (l'UI affiche un message ; la saisie texte des rapports reste fonctionnelle).
 */
export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export const MAX_PHOTO_BYTES = 15 * 1024 * 1024; // 15 Mo (photos smartphone)
export const ALLOWED_PHOTO_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
];
