"use client";

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
  const pathname = usePathname();

  useEffect(() => {
    if (!gaId) return;

    // Track page views on route change
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', gaId, {
        page_path: pathname,
      });
    }
  }, [pathname, gaId]);

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}

