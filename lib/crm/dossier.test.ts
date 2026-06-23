import { describe, it, expect } from 'vitest';
import { computeDossier, type DossierInputs } from './dossier';

/**
 * Tests de la SOURCE UNIQUE de vérité du workflow (computeDossier). Couvre la
 * séquence des phases, les 3 règles dures du gérant, et les régressions des bugs
 * corrigés (détection EXPERTISE_ACHAT/MUR_PORTEUR, bug « Maxim », monotonie).
 */

const DAY = 86_400_000;

function dossier(over: Partial<DossierInputs> = {}) {
  return computeDossier({
    devis: [],
    factures: [],
    rapports: [],
    appointments: [],
    stage: null,
    rapportEnvoyeAt: null,
    ...over,
  });
}

describe('computeDossier — séquence de phases', () => {
  it('dossier vide → NOUVEAU, ni client ni montant', () => {
    const d = dossier();
    expect(d.phase).toBe('NOUVEAU');
    expect(d.isClient).toBe(false);
    expect(d.montant).toBeNull();
    expect(d.montantDevis).toBeNull();
  });

  it('devis ENVOYE → DEVIS_ENVOYE + montantDevis (pas encore client)', () => {
    const d = dossier({
      devis: [{ status: 'ENVOYE', totalHT: 450, acceptedAt: null, serviceType: 'FISSURES' }],
    });
    expect(d.phase).toBe('DEVIS_ENVOYE');
    expect(d.isClient).toBe(false);
    expect(d.montantDevis).toBe(450);
    expect(d.montant).toBeNull();
  });

  it('devis ACCEPTE (sans RDV) → client + montant signé + DEVIS_VALIDE', () => {
    const d = dossier({
      devis: [{ status: 'ACCEPTE', totalHT: 480, acceptedAt: new Date(), serviceType: 'FISSURES' }],
    });
    expect(d.isClient).toBe(true);
    expect(d.montant).toBe(480);
    // Étape intercalée « Devis validé » entre Devis envoyé et RDV planifié.
    expect(d.phase).toBe('DEVIS_VALIDE');
  });

  it('devis ACCEPTE + RDV diagnostic planifié → RDV_PLANIFIE (on a dépassé Devis validé)', () => {
    const d = dossier({
      devis: [{ status: 'ACCEPTE', totalHT: 480, acceptedAt: new Date(), serviceType: 'FISSURES' }],
      appointments: [{ type: 'DIAGNOSTIC_FISSURES', status: 'PLANIFIE' }],
    });
    expect(d.phase).toBe('RDV_PLANIFIE');
  });

  it('facture ENVOYEE → FACTURE_ENVOYEE', () => {
    const d = dossier({ factures: [{ status: 'ENVOYEE' }] });
    expect(d.phase).toBe('FACTURE_ENVOYEE');
  });

  it('facture PAYEE sans rapport → PAIEMENT_RECU', () => {
    const d = dossier({ factures: [{ status: 'PAYEE' }] });
    expect(d.phase).toBe('PAIEMENT_RECU');
  });
});

describe('computeDossier — détection des visites diagnostic (régression EXPERTISE_ACHAT / MUR_PORTEUR)', () => {
  for (const type of ['DIAGNOSTIC_FISSURES', 'DIAGNOSTIC_HUMIDITE', 'EXPERTISE_ACHAT', 'MUR_PORTEUR'] as const) {
    it(`RDV ${type} REALISE → VISITE_FAITE`, () => {
      const d = dossier({ appointments: [{ type, status: 'REALISE' }] });
      expect(d.phase).toBe('VISITE_FAITE');
    });
  }

  it('RDV LANCEMENT_TRAVAUX REALISE seul → ne compte PAS comme visite diagnostic', () => {
    const d = dossier({ appointments: [{ type: 'LANCEMENT_TRAVAUX', status: 'REALISE' }] });
    expect(d.phase).toBe('NOUVEAU');
  });

  it('RDV diagnostic PLANIFIE (pas encore réalisé) → RDV_PLANIFIE', () => {
    const d = dossier({ appointments: [{ type: 'MUR_PORTEUR', status: 'PLANIFIE' }] });
    expect(d.phase).toBe('RDV_PLANIFIE');
  });
});

describe('computeDossier — règles dures du gérant', () => {
  it('(ii) un rapport en brouillon NE passe PAS en phase Rapport tant que la facture n’est pas PAYÉE', () => {
    const d = dossier({
      factures: [{ status: 'ENVOYEE' }], // envoyée mais pas payée
      rapports: [{ status: 'BROUILLON', budgetHT: null }],
    });
    expect(d.phase).toBe('FACTURE_ENVOYEE'); // reste en attente de paiement
  });

  it('(ii) facture PAYÉE + rapport en cours → RAPPORT', () => {
    const d = dossier({
      factures: [{ status: 'PAYEE' }],
      rapports: [{ status: 'BROUILLON', budgetHT: null }],
    });
    expect(d.phase).toBe('RAPPORT');
  });

  it('(iii) rapport ENVOYÉ SANS estimation budgétaire → TERMINE direct', () => {
    const d = dossier({
      factures: [{ status: 'PAYEE' }],
      rapports: [{ status: 'ENVOYE', budgetHT: null }],
      rapportEnvoyeAt: new Date(),
    });
    expect(d.phase).toBe('TERMINE');
  });

  it('(iii) rapport ENVOYÉ AVEC estimation budgétaire (récent) → SUIVI', () => {
    const d = dossier({
      factures: [{ status: 'PAYEE' }],
      rapports: [{ status: 'ENVOYE', budgetHT: 12000 }],
      rapportEnvoyeAt: new Date(),
    });
    expect(d.phase).toBe('SUIVI');
  });

  it('(iii) suivi expiré (> 14 j après le rapport) → TERMINE', () => {
    const d = dossier({
      factures: [{ status: 'PAYEE' }],
      rapports: [{ status: 'ENVOYE', budgetHT: 12000 }],
      rapportEnvoyeAt: new Date(Date.now() - 20 * DAY),
    });
    expect(d.phase).toBe('TERMINE');
  });

  it('(i) étape PERDU → phase PERDU', () => {
    const d = dossier({
      devis: [{ status: 'REFUSE', totalHT: 450, acceptedAt: null, serviceType: 'FISSURES' }],
      stage: 'PERDU',
    });
    expect(d.phase).toBe('PERDU');
  });
});

describe('computeDossier — branche travaux & régressions', () => {
  it('régression « Maxim » : un devis AUTRE + facture envoyée non payée NE bascule PAS en travaux', () => {
    const d = dossier({
      devis: [{ status: 'ENVOYE', totalHT: 0, acceptedAt: null, serviceType: 'AUTRE' }],
      factures: [{ status: 'ENVOYEE' }],
    });
    expect(d.phase).toBe('FACTURE_ENVOYEE'); // surtout PAS TRAVAUX_LANCES / ACCOMPAGNEMENT_TRAVAUX
  });

  it('branche travaux : rapport livré (avec estimation) + devis diagnostic + devis AUTRE → ACCOMPAGNEMENT_TRAVAUX', () => {
    const d = dossier({
      devis: [
        { status: 'ACCEPTE', totalHT: 480, acceptedAt: new Date(), serviceType: 'FISSURES' },
        { status: 'ACCEPTE', totalHT: 9000, acceptedAt: new Date(), serviceType: 'AUTRE' },
      ],
      factures: [{ status: 'PAYEE' }],
      rapports: [{ status: 'ENVOYE', budgetHT: 9000 }],
      rapportEnvoyeAt: new Date(),
    });
    expect(d.hasDevisTravaux).toBe(true);
    expect(d.phase).toBe('ACCOMPAGNEMENT_TRAVAUX');
  });

  it('monotonie : facture PAYÉE sans RDV enregistré → PAIEMENT_RECU et étapes amont « faites »', () => {
    const d = dossier({ factures: [{ status: 'PAYEE' }], stage: 'NOUVEAU' });
    expect(d.phase).toBe('PAIEMENT_RECU');
    const visite = d.steps.find((s) => s.key === 'visite');
    expect(visite?.done).toBe(true); // pas de retour en arrière « planifier la visite »
  });
});

describe('computeDossier — override manuel (« liberté totale »)', () => {
  const step = (d: ReturnType<typeof dossier>, k: string) =>
    d.steps.find((s) => s.key === k);

  it('force une phase aval (RAPPORT) sans aucun artefact', () => {
    const d = dossier({ manualPhase: 'RAPPORT' });
    expect(d.phase).toBe('RAPPORT');
    expect(step(d, 'facture')?.done).toBe(true);
    expect(step(d, 'paiement')?.done).toBe(true);
    // « Rapport transmis » a pour seuil SUIVI → PAS encore coché à la phase RAPPORT.
    expect(step(d, 'rapport')?.done).toBe(false);
  });

  it('force SUIVI → palier « rapport transmis » coché (sans générer de rapport)', () => {
    const d = dossier({ manualPhase: 'SUIVI' });
    expect(d.phase).toBe('SUIVI');
    expect(step(d, 'rapport')?.done).toBe(true);
  });

  it("l'override prime même en arrière du flux dérivé (facture payée → DEVIS_ENVOYE)", () => {
    const d = dossier({
      devis: [{ status: 'ACCEPTE', totalHT: 1000, acceptedAt: new Date(), serviceType: 'FISSURES' }],
      factures: [{ status: 'PAYEE' }],
      manualPhase: 'DEVIS_ENVOYE',
    });
    expect(d.phase).toBe('DEVIS_ENVOYE');
  });

  it('manualPhase PERDU → phase PERDU ; manualPhase null → dérivation normale', () => {
    expect(dossier({ manualPhase: 'PERDU' }).phase).toBe('PERDU');
    expect(dossier({ factures: [{ status: 'PAYEE' }], manualPhase: null }).phase).toBe(
      'PAIEMENT_RECU'
    );
  });

  it('en mode manuel, pas de nudge automatique « suivi/travaux »', () => {
    const d = dossier({
      factures: [{ status: 'PAYEE' }],
      rapports: [{ status: 'ENVOYE', budgetHT: 12000 }],
      rapportEnvoyeAt: new Date(),
      manualPhase: 'RDV_PLANIFIE',
    });
    expect(d.enSuiviClient).toBe(false);
    expect(d.travauxAPlanifier).toBe(false);
  });
});

describe('computeDossier — montantDevis', () => {
  it('ignore les devis refusés / brouillons pour le montant du pipe', () => {
    const d = dossier({
      devis: [
        { status: 'REFUSE', totalHT: 999, acceptedAt: null, serviceType: 'FISSURES' },
        { status: 'ENVOYE', totalHT: 450, acceptedAt: null, serviceType: 'HUMIDITE' },
      ],
    });
    expect(d.montantDevis).toBe(450);
  });
});
