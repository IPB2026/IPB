import { describe, it, expect } from 'vitest';
import { RULES, daysAgo, DAY_MS } from './rules';

describe('RULES — config unique des règles métier', () => {
  it('cadence des relances devis = J+3 / J+7 / J+14', () => {
    expect([...RULES.relanceDevisDays]).toEqual([3, 7, 14]);
  });
  it('cadence des relances factures = J+3 / J+7 / J+14', () => {
    expect([...RULES.relanceFactureDays]).toEqual([3, 7, 14]);
  });
  it('suivi = 14 jours, corbeille = 30 jours', () => {
    expect(RULES.suiviDays).toBe(14);
    expect(RULES.trashRetentionDays).toBe(30);
  });
  it('dormant 30 j, archive 182 j, pause 3 j', () => {
    expect(RULES.dormantDays).toBe(30);
    expect(RULES.archiveSuggestDays).toBe(182);
    expect(RULES.relancePauseDays).toBe(3);
  });
  it('daysAgo soustrait N jours', () => {
    const base = 1_000_000_000_000;
    expect(daysAgo(2, base).getTime()).toBe(base - 2 * DAY_MS);
  });
});
