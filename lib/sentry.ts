/**
 * Configuration Sentry pour le monitoring d'erreurs en production
 * Docs: https://docs.sentry.io/platforms/javascript/guides/nextjs/
 */

// Note: Les packages Sentry doivent être installés séparément
// npm install @sentry/nextjs

interface SentryConfig {
  dsn?: string;
  environment?: string;
  enabled: boolean;
}

const sentryConfig: SentryConfig = {
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  enabled: process.env.NODE_ENV === 'production' && !!process.env.NEXT_PUBLIC_SENTRY_DSN,
};

/**
 * Initialise Sentry (à appeler dans layout.tsx ou _app.tsx)
 */
export const initSentry = () => {
  if (!sentryConfig.enabled) {
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Sentry désactivé en développement');
    }
    return;
  }

  // L'initialisation réelle se fait via sentry.client.config.ts et sentry.server.config.ts
  // quand @sentry/nextjs est installé
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Sentry initialized');
  }
};

/**
 * Capture une erreur manuellement
 */
export const captureError = (error: Error, context?: Record<string, any>) => {
  if (sentryConfig.enabled) {
    // Quand @sentry/nextjs est installé:
    // Sentry.captureException(error, { extra: context });
    if (process.env.NODE_ENV === 'development') {
      console.error('🚨 Error captured for Sentry:', error, context);
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.error('🚨 Development error:', error, context);
  }
};

/**
 * Ajoute du contexte utilisateur pour Sentry
 */
export const setSentryUser = (user: { id?: string; email?: string; name?: string }) => {
  if (sentryConfig.enabled) {
    // Quand @sentry/nextjs est installé:
    // Sentry.setUser(user);
    if (process.env.NODE_ENV === 'development') {
      console.log('👤 Sentry user context set:', user);
    }
  }
};

/**
 * Capture un message custom
 */
export const captureMessage = (message: string, level: 'info' | 'warning' | 'error' = 'info') => {
  if (sentryConfig.enabled) {
    // Quand @sentry/nextjs est installé:
    // Sentry.captureMessage(message, level);
    if (process.env.NODE_ENV === 'development') {
      console.log(`📝 Sentry message (${level}):`, message);
    }
  }
};

export default sentryConfig;
