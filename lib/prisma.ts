import { PrismaClient } from '@prisma/client';

/**
 * Singleton Prisma — évite d'ouvrir une nouvelle connexion à chaque
 * hot-reload en développement (Next.js recharge les modules).
 *
 * Résilience Neon (2026-07) : la base serverless s'endort après inactivité
 * et met quelques secondes à se réveiller. Deux protections :
 *  1. connect_timeout=15 ajouté à l'URL (défaut Prisma : 5 s, trop court
 *     pour un cold start Neon) — appliqué en code, aucun changement d'env requis.
 *  2. Retry automatique (2 tentatives, backoff) sur les erreurs de
 *     connexion initiale (P1001 / PrismaClientInitializationError) :
 *     la requête n'ayant jamais atteint la base, la relance est sûre,
 *     y compris pour les écritures.
 */

function withConnectionTimeout(url: string | undefined): string | undefined {
  if (!url) return url;
  if (url.includes('connect_timeout=')) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}connect_timeout=15&pool_timeout=15`;
}

const isColdStartError = (e: unknown): boolean => {
  const msg = e instanceof Error ? e.message : String(e);
  const name = e instanceof Error ? e.constructor.name : '';
  return (
    name === 'PrismaClientInitializationError' ||
    msg.includes("Can't reach database server") ||
    msg.includes('P1001')
  );
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function createClient() {
  const base = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasources: { db: { url: withConnectionTimeout(process.env.DATABASE_URL) } },
  });

  return base.$extends({
    query: {
      $allOperations: async ({ query, args }) => {
        try {
          return await query(args);
        } catch (e) {
          if (!isColdStartError(e)) throw e;
          // 1er réveil raté — la base Neon démarre, on lui laisse le temps.
          await sleep(1500);
          try {
            return await query(args);
          } catch (e2) {
            if (!isColdStartError(e2)) throw e2;
            await sleep(3000);
            return query(args);
          }
        }
      },
    },
  });
}

type ExtendedPrismaClient = ReturnType<typeof createClient>;

const globalForPrisma = globalThis as unknown as {
  prisma: ExtendedPrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
