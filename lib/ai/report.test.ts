import { describe, it, expect, vi } from 'vitest';

// report.ts démarre par `import 'server-only'` (qui jette hors d'un contexte
// serveur RSC) → on neutralise ce module pour pouvoir tester sa logique pure.
vi.mock('server-only', () => ({}));

import { isReportDraft, isVisionSupported } from './report';

describe('isReportDraft', () => {
  it('reconnaît un brouillon en cours (building === true)', () => {
    expect(
      isReportDraft({ building: true, step: 1, total: 3, model: 'x', zones: [] })
    ).toBe(true);
  });

  it('rejette un rapport fini, une erreur, ou une valeur vide', () => {
    expect(isReportDraft({ objetMission: '…', zones: [] })).toBe(false); // rapport complet
    expect(isReportDraft({ error: 'boom' })).toBe(false); // erreur
    expect(isReportDraft(null)).toBe(false);
    expect(isReportDraft(undefined)).toBe(false);
    expect(isReportDraft('building')).toBe(false);
    expect(isReportDraft({ building: false })).toBe(false);
  });
});

describe('isVisionSupported', () => {
  it('accepte JPEG / PNG / WebP via contentType', () => {
    expect(isVisionSupported({ url: 'x', contentType: 'image/jpeg' })).toBe(true);
    expect(isVisionSupported({ url: 'x', contentType: 'image/png' })).toBe(true);
    expect(isVisionSupported({ url: 'x', contentType: 'image/webp' })).toBe(true);
  });

  it('REJETTE le HEIC/HEIF (sinon tout l’appel vision échoue en 400)', () => {
    expect(isVisionSupported({ url: 'x.heic', contentType: 'image/heic' })).toBe(false);
    expect(isVisionSupported({ url: 'x', contentType: 'image/heif' })).toBe(false);
  });

  it('déduit du suffixe d’URL quand le contentType manque', () => {
    expect(isVisionSupported({ url: 'https://blob/abc.jpg' })).toBe(true);
    expect(isVisionSupported({ url: 'https://blob/abc.png?token=1' })).toBe(true);
    expect(isVisionSupported({ url: 'https://blob/abc.heic' })).toBe(false);
  });
});
