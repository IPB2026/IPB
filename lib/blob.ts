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
