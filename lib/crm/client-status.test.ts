import { describe, it, expect } from 'vitest';
import {
  LEAD_PERDU_WHERE,
  LOST_CONTACT_WHERE,
  NOT_LOST_CONTACT_WHERE,
} from '@/lib/crm/client-status';

/**
 * Les critères d'archivage sont des objets Prisma déclaratifs : on ne peut pas
 * les exécuter sans base. On les INTERPRÈTE donc ici sur des dossiers fictifs,
 * avec un mini-évaluateur limité aux opérateurs réellement utilisés.
 *
 * Ce qui est verrouillé :
 *  - la phase MATÉRIALISÉE (`Lead.phase`) fait foi quand elle est renseignée ;
 *  - tant qu'elle est nulle (juste après la migration), on retombe sur
 *    l'ancienne approximation par étape, phase manuelle prioritaire ;
 *  - LOST et NOT_LOST restent des contraires exacts — le jour où l'un change
 *    sans l'autre, un contact disparaîtrait des DEUX listes sans un mot.
 */

type Lead = { stage: string; manualPhase: string | null; phase: string | null };
type W = Record<string, unknown>;

function matchLead(w: W, lead: Lead): boolean {
  return Object.entries(w).every(([key, val]) => {
    if (key === 'OR') return (val as W[]).some((c) => matchLead(c, lead));
    if (key === 'AND') return (val as W[]).every((c) => matchLead(c, lead));
    if (key === 'NOT') return !matchLead(val as W, lead);
    const actual = (lead as unknown as Record<string, unknown>)[key];
    // Opérateur de champ : { not: valeur }
    if (val !== null && typeof val === 'object' && 'not' in (val as object)) {
      return actual !== (val as { not: unknown }).not;
    }
    return actual === val;
  });
}

function matchContact(w: W, leads: Lead[]): boolean {
  return Object.entries(w).every(([key, val]) => {
    if (key === 'OR') return (val as W[]).some((c) => matchContact(c, leads));
    if (key === 'AND') return (val as W[]).every((c) => matchContact(c, leads));
    if (key === 'NOT') return !matchContact(val as W, leads);
    if (key === 'leads') {
      const rel = val as { some?: W; none?: W };
      if (rel.some) return leads.some((l) => matchLead(rel.some as W, l));
      if (rel.none) return !leads.some((l) => matchLead(rel.none as W, l));
    }
    throw new Error(`opérateur non couvert par le test : ${key}`);
  });
}

const perdu = (l: Lead) => matchLead(LEAD_PERDU_WHERE as W, l);
const archive = (leads: Lead[]) => matchContact(LOST_CONTACT_WHERE as W, leads);
const actif = (leads: Lead[]) => matchContact(NOT_LOST_CONTACT_WHERE as W, leads);

/** Dossier synchronisé : la phase stockée fait foi. */
const sync = (phase: string, stage = 'NOUVEAU'): Lead => ({ stage, manualPhase: null, phase });
/** Dossier pas encore synchronisé : repli sur l'étape. */
const legacy = (stage: string, manualPhase: string | null = null): Lead => ({
  stage,
  manualPhase,
  phase: null,
});

describe('dossier perdu', () => {
  it('phase stockée PERDU', () => {
    expect(perdu(sync('PERDU'))).toBe(true);
  });

  it('phase stockée non perdue, quelle que soit l’étape brute', () => {
    // Cas réel : le cron a posé stage=PERDU, puis le dossier a été rouvert et
    // resynchronisé. La phase stockée est la vérité.
    expect(perdu({ stage: 'PERDU', manualPhase: null, phase: 'DEVIS_ENVOYE' })).toBe(false);
  });

  it('repli avant synchronisation : marqué perdu à la main', () => {
    expect(perdu(legacy('DEVIS_ENVOYE', 'PERDU'))).toBe(true);
  });

  it('repli avant synchronisation : classé perdu par le cron', () => {
    expect(perdu(legacy('PERDU'))).toBe(true);
  });

  it('repli : la phase manuelle prime sur l’étape déduite', () => {
    expect(perdu(legacy('PERDU', 'RAPPORT'))).toBe(false);
  });

  it('repli : dossier ouvert', () => {
    expect(perdu(legacy('A_RAPPELER'))).toBe(false);
  });
});

describe('contact archivé (onglet Archives)', () => {
  const cas: { nom: string; leads: Lead[]; archive: boolean }[] = [
    { nom: 'aucun dossier', leads: [], archive: false },
    { nom: 'un seul dossier, perdu (synchronisé)', leads: [sync('PERDU')], archive: true },
    { nom: 'un seul dossier, perdu (repli)', leads: [legacy('PERDU')], archive: true },
    {
      nom: 'un dossier perdu + un dossier ouvert',
      leads: [sync('PERDU'), sync('DEVIS_ENVOYE')],
      archive: false,
    },
    {
      nom: 'client fidèle : ancien dossier perdu, nouveau dossier en cours',
      leads: [sync('PERDU'), legacy('NOUVEAU')],
      archive: false,
    },
    {
      nom: 'deux dossiers, tous perdus (un synchronisé, un non)',
      leads: [sync('PERDU'), legacy('VISITE_FAITE', 'PERDU')],
      archive: true,
    },
    { nom: 'dossier terminé', leads: [sync('TERMINE')], archive: false },
    { nom: 'dossier gagné (repli)', leads: [legacy('GAGNE')], archive: false },
  ];

  for (const c of cas) {
    it(`${c.nom} → ${c.archive ? 'archives' : 'liste active'}`, () => {
      expect(archive(c.leads)).toBe(c.archive);
    });
  }

  it('archivé et actif sont des contraires exacts (aucun contact perdu des deux listes)', () => {
    for (const c of cas) {
      expect(actif(c.leads)).toBe(!archive(c.leads));
    }
  });
});
