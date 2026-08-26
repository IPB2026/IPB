import { describe, it, expect } from 'vitest';
import { lostReasonCodeFromText, estRecyclable } from './lost-reason';

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

describe('recyclage des dossiers perdus', () => {
  it('un motif conjoncturel se recycle', () => {
    expect(estRecyclable('PRIX')).toBe(true);
    expect(estRecyclable('DELAI')).toBe(true);
  });

  it('un motif définitif ne se recycle pas', () => {
    // Les travaux ont été faits ailleurs, ou le besoin a disparu : relancer
    // serait du harcèlement, pas de la prospection.
    expect(estRecyclable('CONCURRENT')).toBe(false);
    expect(estRecyclable('ABANDON')).toBe(false);
    expect(estRecyclable('AUTRE')).toBe(false);
  });

  it('un dossier sans motif ne déclenche rien', () => {
    expect(estRecyclable(null)).toBe(false);
    expect(estRecyclable(undefined)).toBe(false);
  });

  it('le texte libre du gérant alimente bien le recyclage', () => {
    expect(estRecyclable(lostReasonCodeFromText('trop cher pour nous'))).toBe(true);
    expect(estRecyclable(lostReasonCodeFromText('délai trop long'))).toBe(true);
    expect(estRecyclable(lostReasonCodeFromText('passé par un autre cabinet'))).toBe(false);
  });
});
