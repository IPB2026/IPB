"use client";

import { useEffect } from 'react';

export function CrispChat() {
  useEffect(() => {
    // Only load Crisp in production or if specifically enabled
    if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PUBLIC_CRISP_ENABLED) {
      return;
    }

    const crispWebsiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
    
    if (!crispWebsiteId) {
      console.warn('⚠️ Crisp Website ID not configured');
      return;
    }

    // Crisp configuration
    (window as any).$crisp = [];
    (window as any).CRISP_WEBSITE_ID = crispWebsiteId;

    // Load Crisp script
    const script = document.createElement('script');
    script.src = 'https://client.crisp.chat/l.js';
    script.async = true;
    document.getElementsByTagName('head')[0].appendChild(script);

    // Configure Crisp when loaded
    script.onload = () => {
      if ((window as any).$crisp) {
        // Set custom data
        (window as any).$crisp.push(['set', 'session:data', [[
          ['site_name', 'IPB Expertise'],
          ['page_url', window.location.href],
        ]]]);

        // Custom greeting message
        (window as any).$crisp.push(['do', 'message:show', ['text', '👋 Bonjour ! Une question sur vos fissures ou problèmes d\'humidité ? Je suis là pour vous aider !']]);
      }
    };

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null; // No visual component, just script injection
}
