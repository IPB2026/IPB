'use client';

import { useEffect } from 'react';

/**
 * Capture l'attribution d'acquisition FIRST-TOUCH dans un cookie première-partie
 * (`ipb_attrib`), lu ensuite côté serveur à la création d'un lead.
 *
 * - First-touch : on n'écrit le cookie QUE s'il n'existe pas déjà → on garde la
 *   toute première origine du visiteur (90 jours), pas la dernière.
 * - Cookie première-partie à finalité opérationnelle CRM (rattacher un lead à son
 *   canal) — distinct du tracking publicitaire (soumis au consentement).
 */
const COOKIE = 'ipb_attrib';
const MAX_AGE = 60 * 60 * 24 * 90; // 90 jours

function hasCookie(name: string): boolean {
  return document.cookie.split('; ').some((c) => c.startsWith(name + '='));
}

export function AttributionTracker() {
  useEffect(() => {
    try {
      if (hasCookie(COOKIE)) return; // first-touch déjà figé

      const params = new URLSearchParams(window.location.search);
      const get = (k: string) => {
        const v = params.get(k);
        return v ? v.slice(0, 300) : undefined;
      };

      const data: Record<string, string> = {};
      const utmSource = get('utm_source');
      const utmMedium = get('utm_medium');
      const utmCampaign = get('utm_campaign');
      const utmTerm = get('utm_term');
      const utmContent = get('utm_content');
      const gclid = get('gclid');
      if (utmSource) data.utmSource = utmSource;
      if (utmMedium) data.utmMedium = utmMedium;
      if (utmCampaign) data.utmCampaign = utmCampaign;
      if (utmTerm) data.utmTerm = utmTerm;
      if (utmContent) data.utmContent = utmContent;
      if (gclid) data.gclid = gclid;
      data.landingPage = (window.location.pathname + window.location.search).slice(0, 300);
      if (document.referrer) data.referrer = document.referrer.slice(0, 500);

      const value = encodeURIComponent(JSON.stringify(data));
      const secure = window.location.protocol === 'https:' ? '; Secure' : '';
      document.cookie = `${COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
    } catch {
      // silencieux : l'attribution est un bonus, jamais bloquante
    }
  }, []);

  return null;
}
