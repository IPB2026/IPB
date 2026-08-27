/**
 * File d'attente photo durable (IndexedDB).
 *
 * Raison d'être : sur le terrain, une photo prise sans réseau ne vivait jusqu'ici
 * que dans l'état React de la page. Onglet évincé par iOS, téléphone verrouillé,
 * rechargement — et le reportage photo était perdu, sans trace ni moyen de le
 * refaire (le client est déjà reparti). Chaque photo est donc écrite sur l'appareil
 * AVANT toute tentative d'envoi, et n'en est retirée qu'une fois enregistrée en base.
 *
 * IndexedDB (et non localStorage) : seul stockage capable de conserver des Blob
 * binaires, et disponible sur iOS Safari comme sur Chrome Android.
 */

const DB_NAME = 'ipb-terrain';
const DB_VERSION = 1;
const STORE = 'photo_queue';
/** Une photo non envoyée au bout de 14 jours ne sera plus jamais envoyée. */
const MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000;

export interface QueuedPhoto {
  key: string;
  rapportId: string;
  name: string;
  addedAt: number;
  file: File | Blob;
}

let dbPromise: Promise<IDBDatabase | null> | null = null;

/** Ouvre la base. Renvoie null si IndexedDB est indisponible (navigation privée,
 *  quota refusé) — la saisie continue alors en mémoire, sans durabilité. */
function openDb(): Promise<IDBDatabase | null> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve) => {
    try {
      if (typeof indexedDB === 'undefined') return resolve(null);
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          const os = db.createObjectStore(STORE, { keyPath: 'key' });
          os.createIndex('rapportId', 'rapportId', { unique: false });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
      req.onblocked = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
  return dbPromise;
}

function tx(db: IDBDatabase, mode: IDBTransactionMode) {
  return db.transaction(STORE, mode).objectStore(STORE);
}

/** Enregistre (ou remplace) une photo en attente. Un même `key` réécrit l'entrée :
 *  on stocke d'abord l'original, puis la version compressée, plus légère. */
export async function enqueuePhoto(item: QueuedPhoto): Promise<boolean> {
  const db = await openDb();
  if (!db) return false;
  return new Promise((resolve) => {
    try {
      const req = tx(db, 'readwrite').put(item);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false); // quota dépassé : non bloquant
    } catch {
      resolve(false);
    }
  });
}

export async function removeQueuedPhoto(key: string): Promise<void> {
  const db = await openDb();
  if (!db) return;
  await new Promise<void>((resolve) => {
    try {
      const req = tx(db, 'readwrite').delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

/** Photos encore en attente pour ce rapport, de la plus ancienne à la plus récente. */
export async function listQueuedPhotos(rapportId: string): Promise<QueuedPhoto[]> {
  const db = await openDb();
  if (!db) return [];
  return new Promise((resolve) => {
    try {
      const req = tx(db, 'readonly').index('rapportId').getAll(rapportId);
      req.onsuccess = () => {
        const rows = (req.result as QueuedPhoto[]) ?? [];
        resolve(rows.sort((a, b) => a.addedAt - b.addedAt));
      };
      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

/** Supprime les photos trop anciennes, tous rapports confondus (hygiène du stockage). */
export async function purgeOldQueuedPhotos(): Promise<void> {
  const db = await openDb();
  if (!db) return;
  await new Promise<void>((resolve) => {
    try {
      const store = tx(db, 'readwrite');
      const req = store.getAll();
      req.onsuccess = () => {
        const cutoff = Date.now() - MAX_AGE_MS;
        for (const row of (req.result as QueuedPhoto[]) ?? []) {
          if (row.addedAt < cutoff) store.delete(row.key);
        }
        resolve();
      };
      req.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}
