import { describe, it, expect } from 'vitest';
import { diagnoseDbError } from './db-error';

/**
 * Ces tests figent la leçon de l'incident des 26-27 août 2026 : une colonne
 * manquante n'est PAS une panne de base. Le CRM annonçait « base de données non
 * accessible » alors que la base répondait très bien, ce qui a fait chercher une
 * panne d'hébergeur pendant 24 h pour une migration oubliée.
 */

/** Reproduit la forme d'une erreur Prisma (code + meta). */
function prismaError(code: string, message: string, meta?: Record<string, unknown>) {
  return Object.assign(new Error(message), { code, meta });
}

describe('colonne ou table manquante ⇒ migration, pas panne', () => {
  it('P2022 est diagnostiqué comme un problème de schéma', () => {
    const d = diagnoseDbError(
      prismaError('P2022', 'The column `Lead.phase` does not exist in the current database.', {
        column: 'Lead.phase',
      })
    );
    expect(d.kind).toBe('schema');
    expect(d.message).toContain('Lead.phase');
    expect(d.action).toMatch(/migration/i);
  });

  it('le nom de colonne est retrouvé même sans meta', () => {
    const d = diagnoseDbError(
      prismaError('P2022', 'The column `t4.phase` does not exist in the current database.')
    );
    expect(d.message).toContain('t4.phase');
  });

  it('P2021 (table absente) suit la même voie', () => {
    expect(diagnoseDbError(prismaError('P2021', 'table missing')).kind).toBe('schema');
  });

  it('le message ne parle JAMAIS de base indisponible', () => {
    const d = diagnoseDbError(prismaError('P2022', 'column missing'));
    expect(d.message.toLowerCase()).not.toContain('injoignable');
    expect(d.message.toLowerCase()).not.toContain('indisponible');
  });
});

describe('vraie rupture de connexion', () => {
  it('P1001 est bien une base injoignable', () => {
    const d = diagnoseDbError(prismaError('P1001', "Can't reach database server"));
    expect(d.kind).toBe('connexion');
    expect(d.message).toMatch(/injoignable/i);
  });

  it('P1017 (connexion fermée) aussi', () => {
    expect(diagnoseDbError(prismaError('P1017', 'Server has closed the connection')).kind).toBe(
      'connexion'
    );
  });
});

describe('autres cas', () => {
  it('un dépassement de délai est distingué', () => {
    expect(diagnoseDbError(prismaError('P2024', 'Timed out fetching a connection')).kind).toBe(
      'timeout'
    );
    expect(diagnoseDbError(new Error('query timed out')).kind).toBe('timeout');
  });

  it('une erreur inconnue ne prétend pas savoir', () => {
    const d = diagnoseDbError(new Error('quelque chose d’inattendu'));
    expect(d.kind).toBe('autre');
    expect(d.action).toMatch(/journ/i);
  });

  it('ne casse pas sur une valeur qui n’est pas une erreur', () => {
    expect(diagnoseDbError(null).kind).toBe('autre');
    expect(diagnoseDbError('boom').kind).toBe('autre');
  });
});
