import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  readDraft,
  writeDraft,
  clearDraft,
  purgeExpiredDrafts,
  formatAgo,
} from './field-draft';

/** localStorage minimal, conforme à l'API réellement utilisée par le module. */
function fakeStorage(opts: { throws?: boolean; quotaFull?: boolean } = {}) {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    key: (i: number) => Array.from(map.keys())[i] ?? null,
    getItem(k: string) {
      if (opts.throws) throw new Error('SecurityError');
      return map.get(k) ?? null;
    },
    setItem(k: string, v: string) {
      if (opts.quotaFull) throw new Error('QuotaExceededError');
      map.set(k, v);
    },
    removeItem: (k: string) => void map.delete(k),
    clear: () => map.clear(),
    _map: map,
  };
}

function installStorage(s: ReturnType<typeof fakeStorage>) {
  (globalThis as { window?: unknown }).window = { localStorage: s };
  return s;
}

const KEY = 'zones:rap_1';
const DAY = 24 * 60 * 60 * 1000;

describe('field-draft', () => {
  afterEach(() => {
    delete (globalThis as { window?: unknown }).window;
    vi.useRealTimers();
  });

  describe('aller-retour', () => {
    let s: ReturnType<typeof fakeStorage>;
    beforeEach(() => {
      s = installStorage(fakeStorage());
    });

    it('relit ce qui a été écrit', () => {
      expect(writeDraft(KEY, { zones: [{ titre: 'Cave' }] })).toBe(true);
      const draft = readDraft<{ zones: { titre: string }[] }>(KEY);
      expect(draft?.data.zones[0].titre).toBe('Cave');
      expect(typeof draft?.savedAt).toBe('number');
    });

    it('renvoie null quand rien n’a été écrit', () => {
      expect(readDraft(KEY)).toBeNull();
    });

    it('efface le brouillon (cas de l’enregistrement serveur réussi)', () => {
      writeDraft(KEY, { zones: [] });
      clearDraft(KEY);
      expect(readDraft(KEY)).toBeNull();
    });

    it('isole les rapports les uns des autres', () => {
      writeDraft('zones:rap_1', { v: 1 });
      writeDraft('zones:rap_2', { v: 2 });
      expect(readDraft<{ v: number }>('zones:rap_1')?.data.v).toBe(1);
      expect(readDraft<{ v: number }>('zones:rap_2')?.data.v).toBe(2);
    });

    it('ignore une entrée illisible au lieu de lever', () => {
      s._map.set('ipb_field_draft_v1:' + KEY, '{ pas du json');
      expect(readDraft(KEY)).toBeNull();
    });
  });

  describe('péremption', () => {
    it('écarte et supprime un brouillon de plus de 30 jours', () => {
      const s = installStorage(fakeStorage());
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-07-01T10:00:00Z'));
      writeDraft(KEY, { zones: [] });

      vi.setSystemTime(new Date('2026-08-05T10:00:00Z')); // + 35 jours
      expect(readDraft(KEY)).toBeNull();
      expect(s._map.size).toBe(0);
    });

    it('conserve un brouillon récent', () => {
      installStorage(fakeStorage());
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-07-01T10:00:00Z'));
      writeDraft(KEY, { zones: [] });

      vi.setSystemTime(new Date('2026-07-20T10:00:00Z')); // + 19 jours
      expect(readDraft(KEY)).not.toBeNull();
    });
  });

  describe('purge', () => {
    it('ne supprime que les brouillons périmés, et rien d’autre', () => {
      const s = installStorage(fakeStorage());
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-08-01T10:00:00Z'));

      s._map.set(
        'ipb_field_draft_v1:vieux',
        JSON.stringify({ savedAt: Date.now() - 40 * DAY, data: {} })
      );
      s._map.set(
        'ipb_field_draft_v1:recent',
        JSON.stringify({ savedAt: Date.now() - 2 * DAY, data: {} })
      );
      s._map.set('ipb_field_draft_v1:corrompu', 'nawak');
      s._map.set('autre_appli', 'à ne pas toucher');

      purgeExpiredDrafts();

      expect(s._map.has('ipb_field_draft_v1:vieux')).toBe(false);
      expect(s._map.has('ipb_field_draft_v1:corrompu')).toBe(false);
      expect(s._map.has('ipb_field_draft_v1:recent')).toBe(true);
      expect(s._map.has('autre_appli')).toBe(true);
    });
  });

  describe('stockage indisponible', () => {
    it('ne lève pas quand localStorage est inaccessible (navigation privée)', () => {
      installStorage(fakeStorage({ throws: true }));
      expect(() => purgeExpiredDrafts()).not.toThrow();
      expect(readDraft(KEY)).toBeNull();
      expect(writeDraft(KEY, { a: 1 })).toBe(false);
      expect(() => clearDraft(KEY)).not.toThrow();
    });

    it('signale un quota plein au lieu de lever', () => {
      installStorage(fakeStorage({ quotaFull: true }));
      expect(writeDraft(KEY, { a: 1 })).toBe(false);
    });

    it('ne lève pas côté serveur (pas de window)', () => {
      delete (globalThis as { window?: unknown }).window;
      expect(readDraft(KEY)).toBeNull();
      expect(writeDraft(KEY, { a: 1 })).toBe(false);
    });
  });

  describe('formatAgo', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-08-27T14:30:00'));
    });

    it('formule les délais courts en clair', () => {
      expect(formatAgo(Date.now() - 20_000)).toBe("à l'instant");
      expect(formatAgo(Date.now() - 4 * 60_000)).toBe('il y a 4 min');
      expect(formatAgo(Date.now() - 90 * 60_000)).toBe('il y a 2 h');
    });

    it('bascule sur l’heure au-delà de la journée', () => {
      expect(formatAgo(Date.now() - 30 * 60 * 60_000)).toMatch(/^hier à \d{2}:\d{2}$/);
      expect(formatAgo(Date.now() - 5 * DAY)).toMatch(/^le \d{2}\/\d{2}\/\d{4} à \d{2}:\d{2}$/);
    });
  });
});
