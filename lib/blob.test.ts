import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  guessMimeFromName,
  getBlobToken,
  isBlobConfigured,
  ALLOWED_PHOTO_TYPES,
} from './blob';

describe('guessMimeFromName', () => {
  it('mappe les extensions connues (insensible à la casse)', () => {
    expect(guessMimeFromName('photo.jpg')).toBe('image/jpeg');
    expect(guessMimeFromName('IMG_001.JPEG')).toBe('image/jpeg');
    expect(guessMimeFromName('x.png')).toBe('image/png');
    expect(guessMimeFromName('x.webp')).toBe('image/webp');
    expect(guessMimeFromName('x.heic')).toBe('image/heic');
    expect(guessMimeFromName('x.heif')).toBe('image/heif');
  });

  it('retombe sur image/jpeg pour une extension absente ou exotique', () => {
    expect(guessMimeFromName('sansextension')).toBe('image/jpeg');
    expect(guessMimeFromName('capture.gif')).toBe('image/jpeg');
  });

  it('ne renvoie QUE des types autorisés (sinon le jeton Blob serait refusé)', () => {
    for (const n of ['a.jpg', 'b.png', 'c.webp', 'd.heic', 'e.bmp', 'noext']) {
      expect(ALLOWED_PHOTO_TYPES).toContain(guessMimeFromName(n));
    }
  });
});

describe('getBlobToken / isBlobConfigured', () => {
  const saved = { ...process.env };

  beforeEach(() => {
    // État propre : retirer tout token Blob (standard OU nommé autrement).
    for (const k of Object.keys(process.env)) {
      if (k === 'BLOB_READ_WRITE_TOKEN' || String(process.env[k]).startsWith('vercel_blob_rw_')) {
        delete process.env[k];
      }
    }
  });
  afterEach(() => {
    process.env = { ...saved };
  });

  it('lit le nom standard BLOB_READ_WRITE_TOKEN', () => {
    process.env.BLOB_READ_WRITE_TOKEN = 'vercel_blob_rw_STANDARD';
    expect(getBlobToken()).toBe('vercel_blob_rw_STANDARD');
    expect(isBlobConfigured()).toBe(true);
  });

  it('détecte un token nommé autrement, par sa valeur (préfixe vercel_blob_rw_)', () => {
    process.env.IPB_PHOTOS_READ_WRITE_TOKEN = 'vercel_blob_rw_CUSTOMNAME';
    expect(getBlobToken()).toBe('vercel_blob_rw_CUSTOMNAME');
    expect(isBlobConfigured()).toBe(true);
  });

  it('renvoie undefined / false si aucun token', () => {
    expect(getBlobToken()).toBeUndefined();
    expect(isBlobConfigured()).toBe(false);
  });
});
