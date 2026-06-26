/** @type {import('next').NextConfig} */
const nextConfig = {
  // Trailing slash désactivé pour éviter les doublons d'URL
  trailingSlash: false,
  
  
  // Optimisations de performance
  images: {
    formats: ['image/avif', 'image/webp'],
    // 480 ajouté pour viewports mobiles 412-480px (économie LCP sur 100vw images)
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2592000,
  },
  
  // Compression
  compress: true,

  // Augmenter la limite pour les server actions (photos uploadées)
  experimental: {
    serverActions: {
      bodySizeLimit: '8mb',
    },
    // Active instrumentation.ts (Next 14) → init Sentry côté serveur/edge.
    instrumentationHook: true,
    // Embarque les polices TTF du devis PDF dans les lambdas qui les rendent
    // (route PDF + page devis qui envoie l'e-mail + connecteur MCP). Sans ça,
    // react-pdf échoue en ENOENT au rendu sur Vercel.
    outputFileTracingIncludes: {
      '/admin/devis/[id]/pdf': ['./lib/pdf/fonts/**'],
      '/admin/devis/[id]': ['./lib/pdf/fonts/**'],
      '/api/mcp/[secret]/[transport]': ['./lib/pdf/fonts/**'],
    },
  },
  
  async redirects() {
    return [
      // ── Service « mur porteur » arrêté (2026-06-26) — sunset SEO-safe :
      //    301 vers l'accueil (aucun service équivalent côté diagnostic),
      //    dé-promotion des liens internes + retrait du sitemap en parallèle.
      { source: '/expertise/mur-porteur', destination: '/', permanent: true },
      { source: '/calcul-prix-mur-porteur', destination: '/', permanent: true },
      { source: '/lp/ouverture-mur-porteur-toulouse', destination: '/', permanent: true },
      { source: '/bureau-etude-structure-toulouse', destination: '/', permanent: true },
      { source: '/expert-mur-porteur/:ville', destination: '/', permanent: true },
      // Pages partenaires bâties sur la structure/co-traitance (mur porteur arrêté) → hub.
      { source: '/partenaires/marchands-de-biens', destination: '/partenaires', permanent: true },
      { source: '/partenaires/architectes-interieur', destination: '/partenaires', permanent: true },
      // Articles blog « mur porteur » (service arrêté) → contenu diagnostic conservé.
      { source: '/blog/prix-ouverture-mur-porteur-toulouse-2026', destination: '/expertise/fissures', permanent: true },
      { source: '/blog/comment-savoir-si-mur-porteur', destination: '/expertise/fissures', permanent: true },
      { source: '/blog/etude-de-cas-mur-porteur-4m-t3-toulouse', destination: '/expertise/fissures', permanent: true },
      {
        source: '/expert-fissures/toulouse',
        destination: '/expert-fissures-toulouse-31',
        permanent: true,
      },
      {
        source: '/expert-humidite/toulouse',
        destination: '/expert-humidite-toulouse-31',
        permanent: true,
      },
      // Anciennes URLs sans page dédiée (404 GSC) → pages utiles
      {
        source: '/traitement-humidite/varilhes',
        destination: '/departements/ariege',
        permanent: true,
      },
      {
        source: '/traitement-humidite/villate',
        destination: '/zones-intervention',
        permanent: true,
      },
      // Aiguefonde (Tarn 81) — limitrophe de Mazamet, redirige vers la page ville la plus proche.
      // Remonté en 404 dans GSC (rapport 2026-06-12).
      {
        source: '/expert-fissures/aiguefonde',
        destination: '/expert-fissures/mazamet',
        permanent: true,
      },
      // Ancien article blog daté 2025 → version actualisée 2026 (même intention de recherche).
      // Remonté en 404 dans GSC (rapport 2026-06-12).
      {
        source: '/blog/cout-reparation-fissures-2025',
        destination: '/blog/prix-agrafage-fissures-2026',
        permanent: true,
      },
      // Anciennes URL racine (liens internes / backlinks) → pages réelles
      { source: '/agrafage-fissures', destination: '/expertise/fissures', permanent: true },
      { source: '/micropieux-fondations', destination: '/blog/agrafage-vs-micropieux-choix', permanent: true },
      {
        source: '/traitement-humidite-injection-resine',
        destination: '/blog/traitement-humidite-injection-resine',
        permanent: true,
      },
      {
        source: '/catastrophe-naturelle-secheresse-demarches-indemnisation',
        destination: '/blog/catastrophe-naturelle-secheresse-demarches-indemnisation',
        permanent: true,
      },
      {
        source: '/agrafage-vs-micropieux-choix',
        destination: '/blog/agrafage-vs-micropieux-choix',
        permanent: true,
      },
      { source: '/revente-maison-fissuree', destination: '/blog/revente-maison-fissuree', permanent: true },
      // Service mur porteur arrêté — lien historique sans ville → accueil (1 saut, pas de chaîne).
      { source: '/expert-mur-porteur', destination: '/', permanent: true },
    ];
  },

  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Ressources statiques Next.js : on les laisse crawlables pour le rendu Googlebot
      // (CSS/JS critique) mais on indique noindex pour ne pas polluer GSC avec les .woff2,
      // chunks JS, etc. (cf. rapport "Explorée actuellement non indexée").
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              // Google Ads (conversions) + Maps : iframes nécessaires pour bid.g, googleads.g et bedrock
              "frame-src https://www.google.com https://maps.google.com https://googleads.g.doubleclick.net https://bid.g.doubleclick.net https://td.doubleclick.net",
              "object-src 'none'",
              "img-src 'self' data: https:",
              // Ads tag : pagead2.googlesyndication.com et adtrafficquality.google
              // Conversions Ads : googleadservices.com (conversion_async.js) + googleads.g.doubleclick.net (viewthroughconversion)
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.google.com https://www.gstatic.com https://pagead2.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://www.googleadservices.com https://googleads.g.doubleclick.net",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              // Conversions Ads : googleads.g.doubleclick.net + *.doubleclick.net pour le ping de conversion
              // + googleadservices.com pour le fetch /pagead/conversion (sinon "Refused to connect" CSP)
              "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://stats.g.doubleclick.net https://www.google.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://pagead2.googlesyndication.com https://*.adtrafficquality.google https://www.googleadservices.com",
            ].join('; ') + ';',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig

