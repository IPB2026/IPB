/**
 * Compression d'image 100 % client-side, SANS dépendance npm (API Canvas native).
 *
 * Objectif terrain : une photo smartphone (5–15 Mo) est redimensionnée à 1920 px
 * max et ré-encodée en JPEG qualité 0.7 AVANT l'upload Vercel Blob. Gain typique
 * ~80 % (ex. 6 Mo → ~1 Mo) → upload rapide en 4G, stockage allégé, et conversion
 * implicite HEIC→JPEG quand le navigateur sait décoder le HEIC (Safari iOS).
 *
 * Robustesse : on ne JETTE jamais. Si le décodage échoue (HEIC sur Chrome/Android),
 * on retourne le fichier ORIGINAL — l'upload reste possible.
 */

export interface CompressOptions {
  /** Plus grande dimension conservée (px). Def. 1920. */
  maxDimension?: number;
  /** Qualité JPEG (0–1). Def. 0.7 — compromis netteté/poids pour le terrain. */
  quality?: number;
  /** En dessous de cette taille, on ne compresse pas (inutile). Def. 500 Ko. */
  minFileSize?: number;
}

export interface CompressResult {
  /** Fichier compressé, ou l'original en repli. */
  file: File;
  isCompressed: boolean;
  originalSize: number;
  finalSize: number;
  /** Info non bloquante (ex. HEIC non décodé). */
  note?: string;
}

const DEFAULTS = {
  maxDimension: 1920,
  quality: 0.7,
  minFileSize: 500 * 1024,
};

/**
 * Lit le tag EXIF d'orientation (0x0112) dans l'en-tête JPEG. Renvoie 1 (normal)
 * si absent/illisible (PNG/WebP n'ont pas d'EXIF → 1, donc aucune rotation).
 *
 * On décode TOUJOURS le bitmap avec `imageOrientation: 'none'` (pixels bruts sur
 * tous les navigateurs : l'option est honorée si supportée, sinon l'ancien défaut
 * était déjà 'none'), puis on applique nous-mêmes cette orientation. Approche
 * déterministe : ni double rotation, ni dépendance à une détection de feature.
 */
async function readExifOrientation(file: File): Promise<number> {
  try {
    // Les 64 premiers Ko suffisent largement à contenir le bloc APP1/EXIF.
    const buf = await file.slice(0, 64 * 1024).arrayBuffer();
    const view = new DataView(buf);
    if (view.byteLength < 2 || view.getUint16(0) !== 0xffd8) return 1; // pas un JPEG
    let offset = 2;
    while (offset + 4 < view.byteLength) {
      const marker = view.getUint16(offset);
      const size = view.getUint16(offset + 2);
      if (marker === 0xffe1) {
        // APP1 — vérifier "Exif\0\0"
        if (offset + 10 > view.byteLength || view.getUint32(offset + 4) !== 0x45786966) break;
        const tiff = offset + 10;
        if (tiff + 8 > view.byteLength) break;
        const little = view.getUint16(tiff) === 0x4949;
        const get16 = (o: number) => view.getUint16(o, little);
        const get32 = (o: number) => view.getUint32(o, little);
        const ifd0 = tiff + get32(tiff + 4);
        if (ifd0 + 2 > view.byteLength) break;
        const entries = get16(ifd0);
        for (let i = 0; i < entries; i++) {
          const entry = ifd0 + 2 + i * 12;
          if (entry + 10 > view.byteLength) break;
          if (get16(entry) === 0x0112) {
            const val = get16(entry + 8);
            return val >= 1 && val <= 8 ? val : 1;
          }
        }
        break;
      }
      if ((marker & 0xff00) !== 0xff00) break;
      offset += 2 + size;
    }
  } catch {
    /* lecture EXIF best-effort */
  }
  return 1;
}

/** Applique la transformation correspondant à l'orientation EXIF sur le contexte. */
function applyOrientation(
  ctx: CanvasRenderingContext2D,
  orientation: number,
  w: number,
  h: number
) {
  switch (orientation) {
    case 2:
      ctx.transform(-1, 0, 0, 1, w, 0);
      break;
    case 3:
      ctx.transform(-1, 0, 0, -1, w, h);
      break;
    case 4:
      ctx.transform(1, 0, 0, -1, 0, h);
      break;
    case 5:
      ctx.transform(0, 1, 1, 0, 0, 0);
      break;
    case 6:
      ctx.transform(0, 1, -1, 0, h, 0);
      break;
    case 7:
      ctx.transform(0, -1, -1, 0, h, w);
      break;
    case 8:
      ctx.transform(0, -1, 1, 0, 0, w);
      break;
    default:
      break; // 1 = normal
  }
}

const jpgName = (name: string) => name.replace(/\.[^./\\]+$/, '') + '.jpg';

export async function compressImage(
  file: File,
  opts: CompressOptions = {}
): Promise<CompressResult> {
  const { maxDimension, quality, minFileSize } = { ...DEFAULTS, ...opts };
  const base: CompressResult = {
    file,
    isCompressed: false,
    originalSize: file.size,
    finalSize: file.size,
  };

  // Non-image ou trop petit : on ne touche pas.
  if (typeof window === 'undefined' || typeof createImageBitmap === 'undefined') {
    return base;
  }
  if (!file.type.startsWith('image/') && !/\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)) {
    return base;
  }
  if (file.size < minFileSize) return base;

  const isHeic = /heic|heif/i.test(file.type) || /\.(heic|heif)$/i.test(file.name);

  let bitmap: ImageBitmap;
  // Pixels bruts (déterministe), puis rotation EXIF appliquée par nos soins.
  const manualOrientation = await readExifOrientation(file);
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'none' });
  } catch {
    // HEIC non décodable (Chrome/Android) ou format exotique → on garde l'original.
    return {
      ...base,
      note: isHeic
        ? 'Photo iPhone (HEIC) conservée telle quelle — visible sur Safari.'
        : 'Image non compressée (format non décodé).',
    };
  }

  try {
    // Forme canonique : on travaille en dimensions SOURCE (brutes), et le canvas
    // échange largeur/hauteur pour les orientations 90°/270° (5–8).
    const swap = manualOrientation >= 5 && manualOrientation <= 8;
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const sw = Math.max(1, Math.round(bitmap.width * scale)); // largeur source mise à l'échelle
    const sh = Math.max(1, Math.round(bitmap.height * scale)); // hauteur source mise à l'échelle

    const canvas = document.createElement('canvas');
    canvas.width = swap ? sh : sw;
    canvas.height = swap ? sw : sh;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      bitmap.close?.();
      return base;
    }

    // La transformation EXIF utilise les dimensions SOURCE (sw, sh) ; on dessine
    // ensuite le bitmap à cette taille dans le repère transformé.
    applyOrientation(ctx, manualOrientation, sw, sh);
    ctx.drawImage(bitmap, 0, 0, sw, sh);
    bitmap.close?.();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', quality)
    );
    if (!blob) return base;

    // Anti-gonflement : si le JPEG produit est plus lourd, garder l'original.
    if (blob.size >= file.size && !isHeic) return base;

    const out = new File([blob], jpgName(file.name), {
      type: 'image/jpeg',
      lastModified: file.lastModified,
    });
    return {
      file: out,
      isCompressed: true,
      originalSize: file.size,
      finalSize: out.size,
    };
  } catch {
    return base;
  }
}

/** Compresse une liste de fichiers en séquence (peu coûteux : 2–5 photos). */
export async function compressImages(
  files: File[],
  opts: CompressOptions = {},
  onProgress?: (done: number, total: number) => void
): Promise<CompressResult[]> {
  const out: CompressResult[] = [];
  for (let i = 0; i < files.length; i++) {
    onProgress?.(i, files.length);
    // eslint-disable-next-line no-await-in-loop
    out.push(await compressImage(files[i], opts));
  }
  onProgress?.(files.length, files.length);
  return out;
}
