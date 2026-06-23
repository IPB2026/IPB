/**
 * Attribution d'acquisition (first-touch).
 *
 * Le navigateur écrit un cookie `ipb_attrib` à la PREMIÈRE visite
 * (cf. components/analytics/AttributionTracker.tsx). À la capture d'un lead, les
 * server actions lisent ce cookie (`readAttribution`) et figent l'origine sur le
 * Lead → pilotage du canal (Ads/SEO/Direct) et du ROI directement dans le CRM.
 *
 * Le cœur (parse + dérivation de canal) est PUR → testable hors serveur.
 */

export const ATTRIBUTION_COOKIE = 'ipb_attrib';

export interface Attribution {
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmTerm?: string | null;
  utmContent?: string | null;
  gclid?: string | null;
  landingPage?: string | null;
  referrer?: string | null;
  /** Canal normalisé, dérivé : ADS / SEO / SOCIAL / REFERRAL / DIRECT. */
  channel?: string | null;
}

const trunc = (v: unknown, n = 300): string | null => {
  if (v == null) return null;
  const s = String(v).trim();
  return s ? s.slice(0, n) : null;
};

/**
 * Déduit un canal normalisé à partir des signaux d'attribution. Priorité : gclid
 * / utm payant → ADS ; utm social ou referrer réseau social → SOCIAL ; moteur de
 * recherche en referrer → SEO ; autre referrer → REFERRAL ; sinon DIRECT.
 */
export function deriveChannel(a: Attribution): string {
  const medium = (a.utmMedium ?? '').toLowerCase();
  const source = (a.utmSource ?? '').toLowerCase();
  const ref = (a.referrer ?? '').toLowerCase();

  if (a.gclid || medium === 'cpc' || medium === 'ppc' || medium === 'paid') return 'ADS';
  if (medium === 'social' || /facebook|instagram|linkedin|twitter|x\.com|tiktok|youtube/.test(source + ' ' + ref))
    return 'SOCIAL';
  if (medium === 'organic' || /google\.|bing\.|yahoo\.|duckduckgo\.|qwant\./.test(ref)) return 'SEO';
  if (medium === 'referral' || ref) return 'REFERRAL';
  if (a.utmSource) return 'REFERRAL';
  return 'DIRECT';
}

/** Parse en toute sécurité la valeur du cookie d'attribution (JSON). */
export function parseAttribution(raw?: string | null): Attribution | null {
  if (!raw) return null;
  let obj: Record<string, unknown>;
  try {
    obj = JSON.parse(decodeURIComponent(raw));
  } catch {
    try {
      obj = JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (!obj || typeof obj !== 'object') return null;

  const a: Attribution = {
    utmSource: trunc(obj.utmSource ?? obj.utm_source),
    utmMedium: trunc(obj.utmMedium ?? obj.utm_medium),
    utmCampaign: trunc(obj.utmCampaign ?? obj.utm_campaign),
    utmTerm: trunc(obj.utmTerm ?? obj.utm_term),
    utmContent: trunc(obj.utmContent ?? obj.utm_content),
    gclid: trunc(obj.gclid),
    landingPage: trunc(obj.landingPage ?? obj.landing),
    referrer: trunc(obj.referrer ?? obj.ref, 500),
  };
  // Rien d'exploitable ? On renvoie quand même DIRECT pour tracer l'origine.
  a.channel = deriveChannel(a);
  return a;
}
