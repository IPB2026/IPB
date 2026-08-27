'use client';

import { useSyncExternalStore } from 'react';

function subscribe(onChange: () => void) {
  window.addEventListener('online', onChange);
  window.addEventListener('offline', onChange);
  return () => {
    window.removeEventListener('online', onChange);
    window.removeEventListener('offline', onChange);
  };
}

/**
 * État réseau du navigateur, pour les écrans de saisie terrain.
 *
 * `navigator.onLine` ne garantit pas qu'Internet répond (wifi capté sans accès),
 * mais il détecte de façon fiable le cas qui nous intéresse : plus de réseau du
 * tout, en cave ou en zone blanche. Les échecs réels d'envoi restent gérés par
 * les try/catch des appels serveur.
 */
export function useOnline(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true // rendu serveur : on suppose connecté (pas de faux avertissement)
  );
}
