/**
 * Utilitaires Google Analytics 4
 * Track des événements personnalisés pour mesurer la conversion
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, any>
    ) => void;
  }
}

/**
 * Track un événement personnalisé
 */
export const trackEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

/**
 * Track une soumission de formulaire de contact
 */
export const trackContactSubmit = (formType: 'contact' | 'diagnostic' | 'callback') => {
  trackEvent('contact_form_submit', {
    form_type: formType,
    category: 'lead_generation',
  });
};

/**
 * Track un clic sur le bouton de téléphone
 */
export const trackPhoneClick = (location: string) => {
  trackEvent('phone_click', {
    location,
    category: 'engagement',
  });
};

/**
 * Track une ouverture de Calendly
 */
export const trackCalendlyOpen = () => {
  trackEvent('calendly_open', {
    category: 'conversion',
  });
};

/**
 * Track la lecture d'un article de blog
 */
export const trackBlogRead = (articleTitle: string, readPercentage: number) => {
  trackEvent('blog_article_read', {
    article_title: articleTitle,
    read_percentage: readPercentage,
    category: 'engagement',
  });
};

/**
 * Track la complétion d'un diagnostic
 */
export const trackDiagnosticComplete = (problemType: string) => {
  trackEvent('diagnostic_complete', {
    problem_type: problemType,
    category: 'lead_generation',
  });
};

/**
 * Track une visite de page ville (SEO local)
 */
export const trackLocalPageView = (cityName: string, pageType: string) => {
  trackEvent('local_page_view', {
    city: cityName,
    page_type: pageType,
    category: 'seo',
  });
};
