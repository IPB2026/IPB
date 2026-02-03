'use client';

import { useEffect, useState, useCallback } from 'react';
import { loadRecaptchaScript, executeRecaptcha, RECAPTCHA_SITE_KEY } from '@/lib/recaptcha';

/**
 * Hook React pour utiliser reCAPTCHA v3 dans les formulaires
 * 
 * @example
 * const { getToken, isLoaded, isEnabled } = useRecaptcha();
 * 
 * const handleSubmit = async (e) => {
 *   e.preventDefault();
 *   const token = await getToken('contact_form');
 *   // Envoyer le token avec le formulaire
 * };
 */
export function useRecaptcha() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger le script au montage du composant
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) {
      // reCAPTCHA non configuré, on continue sans
      setIsLoaded(true);
      return;
    }

    loadRecaptchaScript()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoaded(true); // On continue même en cas d'erreur
      });
  }, []);

  // Fonction pour obtenir un token
  const getToken = useCallback(async (action: string): Promise<string | null> => {
    if (!RECAPTCHA_SITE_KEY) {
      return null; // Pas de reCAPTCHA configuré
    }

    if (!isLoaded) {
      console.warn('reCAPTCHA pas encore chargé');
      return null;
    }

    return executeRecaptcha(action);
  }, [isLoaded]);

  return {
    getToken,
    isLoaded,
    isEnabled: !!RECAPTCHA_SITE_KEY,
    error,
  };
}
