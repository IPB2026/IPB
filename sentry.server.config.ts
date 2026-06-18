import * as Sentry from '@sentry/nextjs';

/**
 * Sentry — runtime Node (server components, route handlers, server actions).
 * Activé UNIQUEMENT si un DSN est fourni (SENTRY_DSN ou NEXT_PUBLIC_SENTRY_DSN) :
 * sans DSN, l'init est un no-op total → aucun effet en l'absence de configuration.
 */
const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  // Échantillonnage des traces de perf (bas pour rester gratuit/léger).
  tracesSampleRate: 0.1,
  // N'envoie pas les requêtes locales de dev.
  environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
});
