/**
 * Helpers Vercel Blob — stockage des photos terrain.
 * Sans token configuré, l'upload est désactivé proprement (l'UI affiche un
 * message ; la saisie texte des rapports reste fonctionnelle).
 */

/**
 * Récupère le token Vercel Blob de façon ROBUSTE. Le nom standard est
 * `BLOB_READ_WRITE_TOKEN`, mais selon la façon dont le store est connecté, Vercel
 * peut nommer la variable différemment (préfixe du store, ex. `Vercel_READ_WRITE_TOKEN`,
 * `IPB_PHOTOS_READ_WRITE_TOKEN`…). Or la VALEUR commence toujours par
 * `vercel_blob_rw_`. On cherche donc d'abord le nom standard, sinon n'importe
 * quelle variable dont la valeur a ce préfixe → l'upload marche quel que soit le nom.
 */
export function getBlobToken(): string | undefined {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  for (const v of Object.values(process.env)) {
    if (typeof v === 'string' && v.startsWith('vercel_blob_rw_')) return v;
  }
  return undefined;
}

export function isBlobConfigured(): boolean {
  return Boolean(getBlobToken());
}

export const MAX_PHOTO_BYTES = 15 * 1024 * 1024; // 15 Mo (photos smartphone)
export const ALLOWED_PHOTO_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
];

/**
 * Déduit le type MIME d'après l'extension du nom de fichier. Indispensable car
 * certains navigateurs/appareils (Samsung Internet, anciens Android, mode avion)
 * renvoient un `file.type` VIDE — ce qui fait refuser le jeton Vercel Blob avant
 * même le contrôle de taille. Serveur-safe (aucune API navigateur).
 */
export function guessMimeFromName(name: string): string {
  const ext = name.toLowerCase().match(/\.([a-z0-9]+)$/)?.[1] ?? '';
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'heic':
      return 'image/heic';
    case 'heif':
      return 'image/heif';
    default:
      // Repli sûr : un type figurant dans ALLOWED_PHOTO_TYPES (sinon le jeton
      // Vercel Blob serait refusé). Les GIF/formats exotiques sont rares ici.
      return 'image/jpeg';
  }
}
