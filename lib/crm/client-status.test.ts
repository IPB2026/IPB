import { describe, it, expect } from 'vitest';
import {
  LEAD_PERDU_WHERE,
  LOST_CONTACT_WHERE,
  NOT_LOST_CONTACT_WHERE,
} from '@/lib/crm/client-status';

/**
 * Les critères d'archivage sont des objets Prisma déclaratifs : on ne peut pas
 * les exécuter sans base. On les INTERPRÈTE donc ici sur des dossiers fictifs,
 * avec un mini-évaluateur limité aux opérateurs réellement utilisés. Ce qui est
 * verrouillé : la définition de « perdu » (la phase manuelle prime sur l'étape
 * déduite) et le fait que LOST / NOT_LOST restent des contraires exacts — le
 * jour où l'un des deux change sans l'autre, un contact disparaîtrait des DEUX
 * listes (actifs et archives) sans que rien ne le signale.
 */

type Lead = { stage: string; manualPhase: string | null };
type W = Record<string, unknown>;

function matchLead(w: W, lead: Lead): boolean {
  return Object.entries(w).every(([key, val]) => {
    if (key === 'OR') return (val as W[]).some((c) => matchLead(c, lead));
    if (key === 'AND') return (val as W[]).every((c) => matchLead(c, lead));
    if (key === 'NOT') return !matchLead(val as W, lead);
    return (lead as unknown as Record<string, unknown>)[key] === val;
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

describe('dossier perdu', () => {
  it('marqué perdu à la main', () => {
    expect(perdu({ stage: 'DEVIS_ENVOYE', manualPhase: 'PERDU' })).toBe(true);
  });

  it('classé perdu par le cron (aucune phase manuelle)', () => {
    expect(perdu({ stage: 'PERDU', manualPhase: null })).toBe(true);
  });

  it('la phase manuelle prime sur l’étape déduite', () => {
    expect(perdu({ stage: 'PERDU', manualPhase: 'RAPPORT' })).toBe(false);
  });

  it('dossier ouvert', () => {
    expect(perdu({ stage: 'A_RAPPELER', manualPhase: null })).toBe(false);
  });
});

describe('contact archivé (onglet Archives)', () => {
  const cas: { nom: string; leads: Lead[]; archive: boolean }[] = [
    { nom: 'aucun dossier', leads: [], archive: false },
    {
      nom: 'un seul dossier, perdu',
      leads: [{ stage: 'PERDU', manualPhase: null }],
      archive: true,
    },
    {
      nom: 'un dossier perdu + un dossier ouvert',
      leads: [
        { stage: 'PERDU', manualPhase: null },
        { stage: 'DEVIS_ENVOYE', manualPhase: null },
      ],
      archive: false,
    },
    {
      nom: 'deux dossiers, tous perdus',
      leads: [
        { stage: 'PERDU', manualPhase: null },
        { stage: 'VISITE_FAITE', manualPhase: 'PERDU' },
      ],
      archive: true,
    },
    {
      nom: 'dossier gagné',
      leads: [{ stage: 'GAGNE', manualPhase: null }],
      archive: false,
    },
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
