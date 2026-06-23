/**
 * Lib analytics — Google Tag Manager / Google Ads + GA4
 *
 * Track les étapes du funnel pour mesurer où les visiteurs décrochent.
 *
 * Cf. PLAN_LEADGEN.md §3 (tracking événementiel détaillé)
 * Cf. TRACKING.md (configuration des conversions Google Ads)
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

// ─────────────────────────────────────────────────────────────────
// Configuration Google Ads — variables d'environnement
// ─────────────────────────────────────────────────────────────────
// Voir TRACKING.md pour la procédure complète.
// Les fallbacks préservent le comportement actuel si les env vars
// ne sont pas encore renseignées sur Vercel.

/** ID du compte Google Ads, format "AW-XXXXXXXXXX" */
const ADS_CONVERSION_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-17902440600';

/** Action de conversion "Lead diagnostic" — format "AW-XXXX/labelXxx" */
const CONV_DIAGNOSTIC_LEAD =
  process.env.NEXT_PUBLIC_GADS_CONV_DIAGNOSTIC ||
  'AW-17902440600/gMjiCMKz-KocEJihxthC';

/** Action de conversion "Lead calculateur mur porteur" */
const CONV_CALCULATOR_LEAD =
  process.env.NEXT_PUBLIC_GADS_CONV_CALCULATEUR ||
  'AW-17902440600/gMjiCMKz-KocEJihxthC';

/** Action de conversion "Lead formulaire de contact" — pointe vers la même
 *  action "Envoi de formulaire de lead" que diagnostic et calculateur. */
const CONV_CONTACT_LEAD =
  process.env.NEXT_PUBLIC_GADS_CONV_CONTACT ||
  'AW-17902440600/gMjiCMKz-KocEJihxthC';

/** Action de conversion "Clic téléphone" (micro-conversion) */
const CONV_PHONE_CLICK =
  process.env.NEXT_PUBLIC_GADS_CONV_PHONE ||
  'AW-17902440600/0aY8COSl6JccEJihxthC';

/** Action de conversion "Demande de rappel" (micro-conversion)
 *  Pointe vers la même action que CONV_PHONE_CLICK : un callback est aussi
 *  un lead téléphone, donc regroupé dans "Annonce Appel Direct". */
const CONV_CALLBACK_REQUEST =
  process.env.NEXT_PUBLIC_GADS_CONV_CALLBACK ||
  'AW-17902440600/0aY8COSl6JccEJihxthC';

/** ID de mesure GA4 (G-…). Sert à cibler l'event `generate_lead` sur GA4
 *  (et non sur Google Ads), pour alimenter le rapport "Génération de leads". */
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

// ─────────────────────────────────────────────────────────────────
// Cœur — wrapper bas niveau
// ─────────────────────────────────────────────────────────────────

export const trackEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window === 'undefined') return;
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
  // Push aussi dans dataLayer pour GTM si présent
  if (window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...params });
  }
};

/**
 * Événement GA4 standard `generate_lead` — alimente le rapport "Génération de
 * leads" (métriques Nouveaux leads / Leads qualifiés / convertis) qui affichait
 * 0 car seules les conversions Google Ads (send_to: AW-…) étaient envoyées.
 * On cible explicitement le tag GA4 (G-…) pour ne pas polluer Google Ads.
 * À déclencher EN PLUS de la conversion Ads, pas à la place.
 */
export const trackGA4Lead = (
  leadType: 'diagnostic' | 'contact' | 'calculateur' | 'rappel',
  value?: number
) => {
  trackEvent('generate_lead', {
    ...(GA4_MEASUREMENT_ID ? { send_to: GA4_MEASUREMENT_ID } : {}),
    lead_type: leadType,
    ...(value != null ? { value, currency: 'EUR' } : {}),
  });
};

// ─────────────────────────────────────────────────────────────────
// Enhanced Conversions — données client (email / téléphone)
// ─────────────────────────────────────────────────────────────────
// Google hache ces données en SHA-256 côté client AVANT de les envoyer.
// Nécessite l'activation des "Conversions avancées pour les prospects" dans
// Google Ads (méthode "Balise Google"/Code) + acceptation des CGU. Voir TRACKING.md §9.
// Ne fait rien tant que l'utilisateur n'a pas consenti (Consent Mode v2 gère le reste).

export interface LeadUserData {
  email?: string;
  phone?: string;
}

/** Normalise un numéro FR au format E.164 attendu par les Enhanced Conversions. */
function normalizePhoneFR(phone?: string): string | undefined {
  if (!phone) return undefined;
  const cleaned = phone.replace(/[^\d+]/g, '');
  if (!cleaned) return undefined;
  if (cleaned.startsWith('+')) return cleaned;
  if (cleaned.startsWith('0')) return '+33' + cleaned.slice(1);
  if (cleaned.length === 9) return '+33' + cleaned;
  return cleaned;
}

/** Pousse les données client pour l'Enhanced Conversions (avant l'event conversion). */
export const setEnhancedConversionData = (userData?: LeadUserData) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  const email = userData?.email?.trim().toLowerCase() || undefined;
  const phone_number = normalizePhoneFR(userData?.phone);
  if (!email && !phone_number) return;
  window.gtag('set', 'user_data', {
    ...(email ? { email } : {}),
    ...(phone_number ? { phone_number } : {}),
  });
};

/**
 * Détecte la source de trafic (organic, paid, direct, referral, social).
 * Utilisable côté client pour enrichir les events.
 */
export const detectTrafficSource = (): {
  source: string;
  medium: string;
  campaign?: string;
} => {
  if (typeof window === 'undefined') return { source: 'direct', medium: 'none' };

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source');
  const utmMedium = params.get('utm_medium');
  const utmCampaign = params.get('utm_campaign');

  if (utmSource) {
    return {
      source: utmSource,
      medium: utmMedium || 'cpc',
      campaign: utmCampaign || undefined,
    };
  }

  // GCLID = Google Ads click
  if (params.get('gclid')) {
    return { source: 'google', medium: 'cpc', campaign: 'paid_unknown' };
  }

  const ref = document.referrer;
  if (!ref) return { source: 'direct', medium: 'none' };

  if (ref.includes('google.')) return { source: 'google', medium: 'organic' };
  if (ref.includes('bing.')) return { source: 'bing', medium: 'organic' };
  if (ref.includes('facebook.') || ref.includes('instagram.') || ref.includes('linkedin.') || ref.includes('twitter.') || ref.includes('x.com')) {
    return { source: ref.split('/')[2].replace('www.', '').split('.')[0], medium: 'social' };
  }
  return { source: ref.split('/')[2] || 'unknown', medium: 'referral' };
};

// ─────────────────────────────────────────────────────────────────
// Funnel diagnostic
// ─────────────────────────────────────────────────────────────────

/** L'utilisateur arrive sur /diagnostic */
export const trackDiagnosticView = () => {
  const src = detectTrafficSource();
  trackEvent('diagnostic_view', {
    category: 'lead_funnel',
    funnel_step: 0,
    traffic_source: src.source,
    traffic_medium: src.medium,
    traffic_campaign: src.campaign,
  });
};

/** L'utilisateur clique sur une carte de path (fissure / mur-porteur / appel) */
export const trackDiagnosticPathSelect = (path: 'fissure' | 'mur-porteur' | 'phone') => {
  trackEvent('diagnostic_path_select', {
    category: 'lead_funnel',
    funnel_step: 1,
    selected_path: path,
  });
};

/** L'utilisateur valide une question (step 1, 2, 3...) */
export const trackDiagnosticStep = (path: 'fissure' | 'mur-porteur', step: number, questionId: string, answer: string) => {
  trackEvent('diagnostic_step', {
    category: 'lead_funnel',
    funnel_step: step + 1,
    selected_path: path,
    question_id: questionId,
    answer,
  });
};

/** L'utilisateur arrive à l'écran final de capture lead (formulaire nom/tel/email) */
export const trackDiagnosticReachedForm = (path: 'fissure' | 'mur-porteur', riskScore: number) => {
  trackEvent('diagnostic_reached_form', {
    category: 'lead_funnel',
    funnel_step: 90,
    selected_path: path,
    risk_score: riskScore,
  });
};

/** L'utilisateur soumet le formulaire lead (nom + contact).
 *  userData (email/téléphone) alimente les Enhanced Conversions. */
export const trackDiagnosticLeadSubmit = (
  path: 'fissure' | 'mur-porteur',
  riskScore: number,
  userData?: LeadUserData
) => {
  setEnhancedConversionData(userData);
  trackEvent('diagnostic_lead_submit', {
    category: 'conversion',
    funnel_step: 100,
    selected_path: path,
    risk_score: riskScore,
  });
  // Conversion Google Ads — déclenchée une fois au succès de l'envoi du lead
  trackEvent('conversion', {
    send_to: CONV_DIAGNOSTIC_LEAD,
    value: 50.0,
    currency: 'EUR',
    selected_path: path,
  });
  // Event GA4 standard (rapport Génération de leads)
  trackGA4Lead('diagnostic', 50.0);
};

/** Diagnostic complet (legacy — appelé après lead) */
export const trackDiagnosticComplete = (problemType: string) => {
  trackEvent('diagnostic_complete', {
    problem_type: problemType,
    category: 'lead_funnel',
    funnel_step: 100,
  });
};

// ─────────────────────────────────────────────────────────────────
// Formulaire de contact (/contact)
// ─────────────────────────────────────────────────────────────────

/** L'utilisateur soumet le formulaire de contact avec succès. */
export const trackContactLeadSubmit = (userData?: LeadUserData) => {
  setEnhancedConversionData(userData);
  trackEvent('contact_lead_submit', {
    category: 'conversion',
    form_type: 'contact',
  });
  // Conversion Google Ads — "Envoi de formulaire de lead"
  trackEvent('conversion', {
    send_to: CONV_CONTACT_LEAD,
    value: 40.0,
    currency: 'EUR',
  });
  // Event GA4 standard (rapport Génération de leads)
  trackGA4Lead('contact', 40.0);
};

// ─────────────────────────────────────────────────────────────────
// Engagement : clics téléphone, WhatsApp, Calendly, partage…
// ─────────────────────────────────────────────────────────────────

// Anti double-comptage : un même clic téléphone peut être capté à la fois par
// un handler inline (ex. page diagnostic) ET par l'écouteur global
// (PhoneClickTracker). On ne déclenche la conversion qu'une fois par fenêtre.
let lastPhoneConversionAt = 0;

export const trackPhoneClick = (location: string) => {
  trackEvent('phone_click', {
    location,
    category: 'engagement_high_intent',
  });
  const now = Date.now();
  if (now - lastPhoneConversionAt < 1500) return; // dédoublonnage inline + global
  lastPhoneConversionAt = now;
  // Compté comme conversion micro — "Annonce Appel Direct"
  trackEvent('conversion', {
    send_to: CONV_PHONE_CLICK,
    transaction_id: `phone_${now}`,
  });
};

export const trackCallbackRequest = (userData?: LeadUserData) => {
  setEnhancedConversionData(userData);
  trackEvent('callback_request', {
    category: 'conversion',
  });
  // Conversion Google Ads — demande de rappel après rapport diagnostic
  trackEvent('conversion', {
    send_to: CONV_CALLBACK_REQUEST,
  });
  // Event GA4 standard (rapport Génération de leads)
  trackGA4Lead('rappel');
};

export const trackCalendlyOpen = () => {
  trackEvent('calendly_open', {
    category: 'conversion',
  });
};

export const trackContactSubmit = (formType: 'contact' | 'diagnostic' | 'callback' | 'lead_widget') => {
  trackEvent('contact_form_submit', {
    form_type: formType,
    category: 'lead_generation',
  });
};

// ─────────────────────────────────────────────────────────────────
// Engagement passif : scroll, lecture article, vue page locale
// ─────────────────────────────────────────────────────────────────

export const trackBlogRead = (articleTitle: string, readPercentage: number) => {
  trackEvent('blog_article_read', {
    article_title: articleTitle,
    read_percentage: readPercentage,
    category: 'engagement',
  });
};

export const trackLocalPageView = (cityName: string, pageType: string) => {
  trackEvent('local_page_view', {
    city: cityName,
    page_type: pageType,
    category: 'seo_local',
  });
};

// ─────────────────────────────────────────────────────────────────
// Lead widget 3 étapes (composant LeadWidget.tsx)
// ─────────────────────────────────────────────────────────────────

export const trackLeadWidgetOpen = () => trackEvent('lead_widget_open', { category: 'lead_funnel' });
export const trackLeadWidgetStep = (step: 1 | 2 | 3, topic?: string, timing?: string) => {
  trackEvent('lead_widget_step', { category: 'lead_funnel', step, topic, timing });
};
export const trackLeadWidgetCta = (cta: 'diagnostic' | 'phone') => {
  trackEvent('lead_widget_cta', { category: 'conversion', cta });
};

// ─────────────────────────────────────────────────────────────────
// Calculateur prix mur porteur (page /calcul-prix-mur-porteur)
// ─────────────────────────────────────────────────────────────────

export const trackCalculatorStart = () => trackEvent('calculator_start', { category: 'lead_funnel', funnel_step: 0 });
export const trackCalculatorComplete = (estimateMin: number, estimateMax: number) => {
  trackEvent('calculator_complete', {
    category: 'lead_funnel',
    funnel_step: 90,
    estimate_min: estimateMin,
    estimate_max: estimateMax,
  });
};
export const trackCalculatorLeadCapture = (email?: string, phone?: string) => {
  setEnhancedConversionData({ email, phone });
  trackEvent('calculator_lead_capture', {
    category: 'conversion',
    funnel_step: 100,
    has_email: !!email,
  });
  // Conversion Google Ads — déclenchée une fois au succès de l'envoi du lead
  trackEvent('conversion', {
    send_to: CONV_CALCULATOR_LEAD,
    value: 30.0,
    currency: 'EUR',
  });
  // Event GA4 standard (rapport Génération de leads)
  trackGA4Lead('calculateur', 30.0);
};
