/**
 * Lib analytics — Google Tag Manager / Google Ads + GA4
 *
 * Track les étapes du funnel pour mesurer où les visiteurs décrochent.
 *
 * Cf. PLAN_LEADGEN.md §3 (tracking événementiel détaillé)
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

/** Conversion ID Google Ads — défini dans app/layout.tsx */
const ADS_CONVERSION_ID = 'AW-17902440600';

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

/** L'utilisateur soumet le formulaire lead (nom + contact) */
export const trackDiagnosticLeadSubmit = (path: 'fissure' | 'mur-porteur', riskScore: number) => {
  trackEvent('diagnostic_lead_submit', {
    category: 'conversion',
    funnel_step: 100,
    selected_path: path,
    risk_score: riskScore,
  });
  // Conversion Google Ads
  trackEvent('conversion', {
    send_to: `${ADS_CONVERSION_ID}/0aY8COSl6JccEJlhxthC`,
    selected_path: path,
  });
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
// Engagement : clics téléphone, WhatsApp, Calendly, partage…
// ─────────────────────────────────────────────────────────────────

export const trackPhoneClick = (location: string) => {
  trackEvent('phone_click', {
    location,
    category: 'engagement_high_intent',
  });
  // Compté comme conversion micro
  trackEvent('conversion', {
    send_to: `${ADS_CONVERSION_ID}/0aY8COSl6JccEJlhxthC`,
    transaction_id: `phone_${Date.now()}`,
  });
};

export const trackCallbackRequest = () => {
  trackEvent('callback_request', {
    category: 'conversion',
    send_to: ADS_CONVERSION_ID,
  });
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
export const trackCalculatorLeadCapture = (email?: string) => {
  trackEvent('calculator_lead_capture', {
    category: 'conversion',
    funnel_step: 100,
    has_email: !!email,
  });
};
