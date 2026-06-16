"use client";

import { useEffect } from "react";
import { trackPhoneClick } from "@/lib/analytics";

/**
 * PhoneClickTracker — écouteur global des clics sur les liens téléphone.
 *
 * Capte TOUS les <a href="tel:..."> du site (header, footer, CTA, popups,
 * pages…), y compris les composants serveur qui ne peuvent pas porter de
 * onClick. Déclenche la conversion Google Ads "Annonce Appel Direct" une seule
 * fois par clic (le dédoublonnage est géré dans trackPhoneClick).
 *
 * À monter une seule fois dans app/layout.tsx (dans le bloc .public-chrome).
 *
 * Pour étiqueter l'origine d'un appel dans vos rapports, ajoutez un attribut
 * sur le lien : <a href="tel:0582953375" data-call-location="footer">.
 * Sans attribut, on retombe sur le chemin de la page.
 */
export function PhoneClickTracker() {
  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") return;
      const link = target.closest('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (!link) return;
      const location =
        link.getAttribute("data-call-location") ||
        (typeof window !== "undefined" ? window.location.pathname : "global");
      trackPhoneClick(location);
    };

    // capture: true → on capte le clic même si un handler enfant arrête la propagation
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  return null;
}
