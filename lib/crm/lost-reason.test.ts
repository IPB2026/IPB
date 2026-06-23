import { describe, it, expect } from 'vitest';
import { lostReasonCodeFromText } from './lost-reason';

describe('lostReasonCodeFromText — motif de perte structuré (T2)', () => {
  it('détecte le prix', () => {
    expect(lostReasonCodeFromText('trop cher pour le client')).toBe('PRIX');
    expect(lostReasonCodeFromText('budget insuffisant')).toBe('PRIX');
  });
  it('détecte le délai', () => {
    expect(lostReasonCodeFromText('délai trop long')).toBe('DELAI');
  });
  it('détecte un concurrent', () => {
    expect(lostReasonCodeFromText('parti chez un autre cabinet')).toBe('CONCURRENT');
  });
  it('détecte un abandon', () => {
    expect(lostReasonCodeFromText('injoignable, plus de nouvelle')).toBe('ABANDON');
  });
  it('AUTRE par défaut, null si vide', () => {
    expect(lostReasonCodeFromText('raison inhabituelle')).toBe('AUTRE');
    expect(lostReasonCodeFromText('')).toBeNull();
  });
});
