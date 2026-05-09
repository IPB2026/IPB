"use client";

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Analytics — configuration GA4 par-dessus le gtag.js déjà chargé dans layout.tsx.
 *
 * On ne re-télécharge PAS la lib gtag.js (~175 KiB) une 2e fois : elle est mutualisée
 * avec Google Ads via un seul `<Script src=".../gtag/js?id=AW-..." strategy="lazyOnload" />`
 * dans app/layout.tsx. Ici on pousse uniquement la config GA et le pageview au
 * changement de route.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
  const pathname = usePathname();

  useEffect(() => {
    if (!gaId) return;
    if (typeof window === 'undefined') return;
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    const gtag = (...args: any[]) => w.dataLayer.push(args);
    if (!w.__ipbGaConfigured) {
      gtag('config', gaId, { send_page_view: true });
      w.__ipbGaConfigured = true;
    } else {
      gtag('event', 'page_view', { page_path: pathname });
    }
  }, [pathname, gaId]);

  if (!gaId) return null;

  // Inline config seulement — la lib gtag.js est chargée une seule fois dans layout.tsx
  return (
    <Script id="google-analytics-init" strategy="lazyOnload">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('config', '${gaId}', { send_page_view: true });
      `}
    </Script>
  );
}
