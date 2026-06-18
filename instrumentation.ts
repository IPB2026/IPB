import * as Sentry from '@sentry/nextjs';

/**
 * Point d'entrée d'instrumentation Next.js (activé via experimental.instrumentationHook).
 * Charge la config Sentry adaptée au runtime. No-op si aucun DSN n'est configuré.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

// Capture des erreurs des Server Components / route handlers non rattrapées.
export const onRequestError = Sentry.captureRequestError;
