// ═══════════════════════════════════════════════════════════════
// RECAPTCHA V3 - Protection anti-spam des formulaires
// ═══════════════════════════════════════════════════════════════
//
// Ce module gère l'intégration de Google reCAPTCHA v3 pour protéger
// les formulaires contre les soumissions automatisées (bots, spam).
//
// Configuration requise :
// - Ajouter NEXT_PUBLIC_RECAPTCHA_SITE_KEY dans .env.local
// - Ajouter RECAPTCHA_SECRET_KEY dans .env.local (côté serveur)
//
// ═══════════════════════════════════════════════════════════════

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
export const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || '';

/**
 * Charge le script reCAPTCHA v3 de manière asynchrone
 */
export function loadRecaptchaScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Ne pas charger si déjà présent
    if (typeof window !== 'undefined' && window.grecaptcha) {
      resolve();
      return;
    }

    // Ne pas charger si pas de clé configurée
    if (!RECAPTCHA_SITE_KEY) {
      console.warn('reCAPTCHA: Clé site non configurée (NEXT_PUBLIC_RECAPTCHA_SITE_KEY)');
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.grecaptcha.ready(() => {
        resolve();
      });
    };

    script.onerror = () => {
      reject(new Error('Échec du chargement de reCAPTCHA'));
    };

    document.head.appendChild(script);
  });
}

/**
 * Exécute reCAPTCHA et retourne le token
 * @param action - Nom de l'action (ex: 'diagnostic_form', 'contact_form')
 */
export async function executeRecaptcha(action: string): Promise<string | null> {
  if (!RECAPTCHA_SITE_KEY) {
    console.warn('reCAPTCHA: Clé non configurée, validation ignorée');
    return null;
  }

  if (typeof window === 'undefined' || !window.grecaptcha) {
    console.warn('reCAPTCHA: Script non chargé');
    return null;
  }

  try {
    const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
    return token;
  } catch (error) {
    console.error('reCAPTCHA: Erreur lors de l\'exécution', error);
    return null;
  }
}

/**
 * Vérifie un token reCAPTCHA côté serveur
 * @param token - Token retourné par executeRecaptcha
 * @param expectedAction - Action attendue
 * @returns Score (0.0 à 1.0) ou null en cas d'erreur
 */
export async function verifyRecaptchaToken(
  token: string,
  expectedAction: string
): Promise<{ success: boolean; score: number; action: string } | null> {
  if (!RECAPTCHA_SECRET_KEY) {
    console.warn('reCAPTCHA: Clé secrète non configurée (RECAPTCHA_SECRET_KEY)');
    return null;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();

    if (!data.success) {
      console.error('reCAPTCHA: Vérification échouée', data['error-codes']);
      return null;
    }

    // Vérifier que l'action correspond
    if (data.action !== expectedAction) {
      console.error('reCAPTCHA: Action non concordante', { expected: expectedAction, received: data.action });
      return null;
    }

    return {
      success: data.success,
      score: data.score,
      action: data.action,
    };
  } catch (error) {
    console.error('reCAPTCHA: Erreur de vérification', error);
    return null;
  }
}

/**
 * Vérifie si le score reCAPTCHA est acceptable
 * Score recommandé : >= 0.5 pour éviter les faux positifs
 */
export function isRecaptchaScoreAcceptable(score: number, threshold: number = 0.5): boolean {
  return score >= threshold;
}
