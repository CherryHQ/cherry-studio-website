import Script from 'next/script'

import { GoogleAnalyticsPageView } from '@/components/google-analytics-page-view'

export function GoogleAnalytics() {
  return (
    <>
      <Script id="docs-google-analytics" strategy="beforeInteractive">
        {`
        (() => {
          const overseasHosts = new Set(['cherryai.com', 'www.cherryai.com']);
          const measurementId = overseasHosts.has(window.location.hostname.toLowerCase())
            ? 'G-FQ9WGZFVB9'
            : 'G-JTJVLD1BNN';
          if (window.__docsGoogleAnalyticsId === measurementId) return;

          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
          window.gtag('js', new Date());
          window.gtag('config', measurementId, { send_page_view: false });
          window.__docsGoogleAnalyticsId = measurementId;

          const googleTagScript = document.createElement('script');
          googleTagScript.async = true;
          googleTagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
          document.head.appendChild(googleTagScript);
        })();
      `}
      </Script>
      <GoogleAnalyticsPageView />
    </>
  )
}
