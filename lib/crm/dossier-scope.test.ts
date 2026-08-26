import { describe, it, expect } from 'vitest';
import { computeDossier, dossierInputFromLead, artifactsOfLead } from './dossier';

/**
 * Vague 1 de l'audit d'août 2026 — le dossier devient l'unité de calcul.
 *
 * Le défaut corrigé ici était SILENCIEUX : la phase se calculait sur tous les
 * artefacts du CONTACT, donc la nouvelle demande d'un ancien client héritait du
 * cycle précédent, sortait en « Terminé » et disparaissait du pipeline (aucune
 * colonne ne porte cette phase). Rien ne le signalait — d'où ces tests, qui sont
 * le seul garde-fou possible contre son retour.
 */

const ANCIEN = 'lead-2025';
const NOUVEAU = 'lead-2026';

/** Dossier clos l'an dernier : devis accepté, payé, rapport livré. */
const artefactsAnciens = {
  devis: [
    {
      leadId: ANCIEN,
      status: 'ACCEPTE' as const,
      totalHT: 690,
      acceptedAt: new Date('2025-03-01'),
      serviceType: 'FISSURES' as const,
    },
  ],
  factures: [{ leadId: ANCIEN, status: 'PAYEE' as const }],
  rapports: [
    {
      leadId: ANCIEN,
      status: 'ENVOYE' as const,
      updatedAt: new Date('2025-03-20'),
      budgetHT: null,
    },
  ],
  appointments: [
    { leadId: ANCIEN, type: 'DIAGNOSTIC_FISSURES' as const, status: 'REALISE' as const },
  ],
};

const vide = { devis: [], factures: [], rapports: [], appointments: [] };

const phaseOf = (
  contact: Parameters<typeof dossierInputFromLead>[0],
  lead: { id: string; stage?: string | null; manualPhase?: string | null },
  isLatest: boolean
) => computeDossier(dossierInputFromLead(contact, lead, isLatest)).phase;

describe('client fidèle — la 2ᵉ demande est un dossier neuf', () => {
  const contact = {
    devis: [...artefactsAnciens.devis],
    factures: [...artefactsAnciens.factures],
    rapports: [...artefactsAnciens.rapports],
    appointments: [...artefactsAnciens.appointments],
  };

  it('la nouvelle demande part de zéro (le bug : elle sortait en TERMINE)', () => {
    expect(phaseOf(contact, { id: NOUVEAU, stage: 'NOUVEAU' }, true)).toBe('NOUVEAU');
  });

  it('la nouvelle demande a bien une étape courante à traiter', () => {
    const d = computeDossier(
      dossierInputFromLead(contact, { id: NOUVEAU, stage: 'NOUVEAU' }, true)
    );
    expect(d.steps.find((s) => s.current)?.key).toBe('devis');
  });

  it('elle est un PROSPECT, pas un client (le badge suivait la phase héritée)', () => {
    const d = computeDossier(
      dossierInputFromLead(contact, { id: NOUVEAU, stage: 'NOUVEAU' }, true)
    );
    expect(d.isClient).toBe(false);
  });

  it('l’ancien dossier, lui, reste terminé', () => {
    expect(phaseOf(contact, { id: ANCIEN, stage: 'GAGNE' }, false)).toBe('TERMINE');
  });

  it('le montant de la nouvelle demande ne reprend pas l’ancien devis', () => {
    const d = computeDossier(
      dossierInputFromLead(contact, { id: NOUVEAU, stage: 'NOUVEAU' }, true)
    );
    expect(d.montantDevis).toBeNull();
  });
});

describe('deux dossiers ouverts en parallèle', () => {
  // Fissures : devis envoyé. Humidité : visite déjà réalisée.
  const contact = {
    devis: [
      {
        leadId: 'fissures',
        status: 'ENVOYE' as const,
        totalHT: 690,
        acceptedAt: null,
        serviceType: 'FISSURES' as const,
      },
      {
        leadId: 'humidite',
        status: 'ACCEPTE' as const,
        totalHT: 890,
        acceptedAt: new Date('2026-08-01'),
        serviceType: 'HUMIDITE' as const,
      },
    ],
    factures: [],
    rapports: [],
    appointments: [
      { leadId: 'humidite', type: 'DIAGNOSTIC_HUMIDITE' as const, status: 'REALISE' as const },
    ],
  };

  it('chaque dossier a sa propre phase', () => {
    expect(phaseOf(contact, { id: 'fissures', stage: 'DEVIS_ENVOYE' }, false)).toBe('DEVIS_ENVOYE');
    expect(phaseOf(contact, { id: 'humidite', stage: 'VISITE_FAITE' }, true)).toBe('VISITE_FAITE');
  });

  it('chaque dossier porte son propre montant', () => {
    const f = computeDossier(dossierInputFromLead(contact, { id: 'fissures' }, false));
    const h = computeDossier(dossierInputFromLead(contact, { id: 'humidite' }, true));
    expect(f.montantDevis).toBe(690);
    expect(h.montantDevis).toBe(890);
  });
});

describe('artefacts non rattachés — compatibilité de l’existant', () => {
  const orphelins = {
    devis: [
      {
        leadId: null,
        status: 'ENVOYE' as const,
        totalHT: 690,
        acceptedAt: null,
        serviceType: 'FISSURES' as const,
      },
    ],
    factures: [],
    rapports: [],
    appointments: [],
  };

  it('un artefact sans dossier tombe dans le dossier COURANT', () => {
    expect(phaseOf(orphelins, { id: 'courant', stage: 'NOUVEAU' }, true)).toBe('DEVIS_ENVOYE');
  });

  it('… et pas dans un dossier ancien', () => {
    expect(phaseOf(orphelins, { id: 'ancien', stage: 'NOUVEAU' }, false)).toBe('NOUVEAU');
  });

  it('le filtre de rattachement se lit directement', () => {
    const items = [{ leadId: 'a' }, { leadId: null }, { leadId: 'b' }];
    expect(artifactsOfLead(items, 'a', false)).toEqual([{ leadId: 'a' }]);
    expect(artifactsOfLead(items, 'a', true)).toEqual([{ leadId: 'a' }, { leadId: null }]);
  });
});

describe('contact sans aucun dossier', () => {
  it('ne casse pas le calcul (fiche d’un contact créé à la main)', () => {
    expect(phaseOf(vide, { id: '', stage: null }, true)).toBe('NOUVEAU');
  });
});
