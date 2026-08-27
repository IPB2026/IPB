/**
 * Sauvegarde locale de la saisie terrain (localStorage).
 *
 * Raison d'être : un diagnostiqueur saisit ses constats dans une cave ou un vide
 * sanitaire, sans réseau. Sans copie locale, tout ce qu'il tape est perdu si la
 * connexion tombe, si l'onglet est évincé de la mémoire (fréquent sur iPhone) ou
 * si le téléphone se verrouille. Le brouillon local est le filet de sécurité : il
 * survit au rechargement et n'est effacé qu'après un enregistrement serveur réussi.
 *
 * localStorage (et non IndexedDB) : la saisie texte est petite, l'écriture doit
 * être synchrone et immédiate à chaque frappe. Les photos, elles, passent par
 * IndexedDB (voir lib/photo-queue.ts).
 */

const PREFIX = 'ipb_field_draft_v1:';
/** Au-delà, un brouillon oublié n'a plus de valeur : on le purge. */
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export interface FieldDraft<T> {
  savedAt: number;
  data: T;
}

/** localStorage peut lever (Safari navigation privée, quota). Jamais bloquant. */
function store(): Storage | null {
  try {
    if (typeof window === 'undefined') return null;
    const s = window.localStorage;
    s.getItem(PREFIX); // force l'accès : lève ici si indisponible
    return s;
  } catch {
    return null;
  }
}

export function readDraft<T>(key: string): FieldDraft<T> | null {
  const s = store();
  if (!s) return null;
  try {
    const raw = s.getItem(PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FieldDraft<T>;
    if (typeof parsed?.savedAt !== 'number') return null;
    if (Date.now() - parsed.savedAt > MAX_AGE_MS) {
      s.removeItem(PREFIX + key);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/** Renvoie false si l'écriture a échoué (quota plein) — l'appelant peut alerter. */
export function writeDraft<T>(key: string, data: T): boolean {
  const s = store();
  if (!s) return false;
  try {
    s.setItem(PREFIX + key, JSON.stringify({ savedAt: Date.now(), data }));
    return true;
  } catch {
    return false;
  }
}

export function clearDraft(key: string): void {
  const s = store();
  if (!s) return;
  try {
    s.removeItem(PREFIX + key);
  } catch {
    /* sans conséquence */
  }
}

/** Purge les brouillons périmés (appelée au montage d'un écran de saisie). */
export function purgeExpiredDrafts(): void {
  const s = store();
  if (!s) return;
  try {
    const stale: string[] = [];
    for (let i = 0; i < s.length; i++) {
      const k = s.key(i);
      if (!k || !k.startsWith(PREFIX)) continue;
      try {
        const { savedAt } = JSON.parse(s.getItem(k) || '{}') as { savedAt?: number };
        if (typeof savedAt !== 'number' || Date.now() - savedAt > MAX_AGE_MS) stale.push(k);
      } catch {
        stale.push(k); // illisible → inutile
      }
    }
    stale.forEach((k) => s.removeItem(k));
  } catch {
    /* sans conséquence */
  }
}

/** Horodatage lisible sur le terrain : « il y a 4 min », « hier à 18:12 ». */
export function formatAgo(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.round(diff / 60000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `il y a ${h} h`;
  const d = new Date(ts);
  const heure = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  return h < 48 ? `hier à ${heure}` : `le ${d.toLocaleDateString('fr-FR')} à ${heure}`;
}
