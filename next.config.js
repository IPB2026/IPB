/** @type {import('next').NextConfig} */
const nextConfig = {
  // Trailing slash désactivé pour éviter les doublons d'URL
  trailingSlash: false,
  
  
  // Optimisations de performance
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 2592000,
  },
  
  // Compression
  compress: true,

  // Augmenter la limite pour les server actions (photos uploadées)
  experimental: {
    serverActions: {
      bodySizeLimit: '8mb',
    },
  },
  
  async redirects() {
    return [
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
              "frame-src https://www.google.com https://maps.google.com",
              "object-src 'none'",
              "img-src 'self' data: https:",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.google.com https://www.gstatic.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://stats.g.doubleclick.net https://www.google.com",
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

