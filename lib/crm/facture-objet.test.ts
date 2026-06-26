import { describe, it, expect } from 'vitest';
import {
  factureObjet,
  factureObjetForService,
  sanitizeStructurel,
} from '@/lib/crm/facture-objet';

describe('factureObjet — assainissement « structurel » sur la facture', () => {
  it('reformule l\'objet « expertise structurelle avant achat » (override)', () => {
    expect(factureObjet('Expertise structurelle avant achat')).toBe(
      'Diagnostic du bâti avant achat'
    );
  });

  it('laisse passer les objets déjà propres (registre diagnostic)', () => {
    for (const ok of [
      'Diagnostic des pathologies de fissures',
      'Diagnostic humidité et infiltrations',
      'Étude de faisabilité — ouverture de mur porteur',
      'Accompagnement et coordination des travaux de reprise',
    ]) {
      expect(factureObjet(ok)).toBe(ok);
    }
  });

  it('ne laisse JAMAIS « structurel » dans l\'objet (filet de sécurité)', () => {
    for (const dirty of [
      'Expertise structurelle avant achat',
      'expertise structurelle du bâti',
      'Diagnostic structurel complet',
      'Analyse structurelle des désordres',
    ]) {
      expect(factureObjet(dirty)).not.toMatch(/structurel/i);
    }
  });

  it('trim les espaces parasites', () => {
    expect(factureObjet('  Expertise structurelle avant achat  ')).toBe(
      'Diagnostic du bâti avant achat'
    );
  });
});

describe('factureObjetForService — reprend le gabarit devis, assaini', () => {
  it('mappe chaque service sur un objet sans « structurel »', () => {
    for (const svc of ['FISSURES', 'HUMIDITE', 'EXPERTISE_ACHAT', 'MUR_PORTEUR', 'AUTRE'] as const) {
      const objet = factureObjetForService(svc);
      expect(objet.length).toBeGreaterThan(0);
      expect(objet).not.toMatch(/structurel/i);
    }
  });

  it('EXPERTISE_ACHAT → « Diagnostic du bâti avant achat »', () => {
    expect(factureObjetForService('EXPERTISE_ACHAT')).toBe('Diagnostic du bâti avant achat');
  });

  it('FISSURES reprend bien le libellé du gabarit devis', () => {
    expect(factureObjetForService('FISSURES')).toBe('Diagnostic des pathologies de fissures');
  });
});

describe('sanitizeStructurel — préserve la casse de tête', () => {
  it('« Expertise … » → « Diagnostic … », « expertise … » → « diagnostic … »', () => {
    expect(sanitizeStructurel('Expertise structurelle')).toBe('Diagnostic indépendant');
    expect(sanitizeStructurel('une expertise structurelle')).toBe('une diagnostic indépendant');
  });
});
