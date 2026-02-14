import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import { Analytics } from "@/components/layout/Analytics"
import { CookieBanner } from "@/components/CookieBanner"
import { StickyDiagnosticCta } from "@/components/StickyDiagnosticCta"
import { ExitIntentPopup } from "@/components/blog/ExitIntentPopup"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

// Police display distinctive pour les titres
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-display',
  weight: ['500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ipb-expertise.fr'),
  title: {
    default: "IPB - Expert Fissures & Humidité | Toulouse, Montauban, Auch (31-82-32)",
    template: "%s | IPB"
  },
  description: "Expert fissures et humidité en Occitanie (31, 82, 32). Agrafage, injection résine, garantie décennale. Toulouse, Montauban, Auch. Diagnostic gratuit.",
  keywords: ["fissures maison", "humidité murs", "Toulouse", "Montauban", "Auch", "Haute-Garonne", "Tarn-et-Garonne", "Gers", "agrafage", "injection résine", "expert bâtiment", "garantie décennale"],
  authors: [{ name: "IPB - Institut de Pathologie du Bâtiment" }],
  creator: "IPB",
  publisher: "IPB",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon.svg' },
    ],
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.ipb-expertise.fr",
    siteName: "IPB - Institut de Pathologie du Bâtiment",
    title: "IPB - Expert Fissures & Humidité | Toulouse, Montauban, Auch",
    description: "Expert fissures et humidité en Occitanie (31, 82, 32). Agrafage, injection résine, cuvelage, VMI. Garantie décennale.",
    images: [
      {
        url: "/images/IPB_Logo_HD.png",
        width: 1200,
        height: 630,
        alt: "IPB Expert Fissures Humidité Toulouse Montauban Auch - Agrafage Injection Résine Garantie Décennale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPB - Expert Fissures & Humidité (31-82-32)",
    description: "Expert fissures et humidité en Occitanie. Toulouse, Montauban, Auch et environs.",
    images: ["/images/IPB_Logo_HD.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://www.ipb-expertise.fr",
  },
  verification: {
    // google: 'your-google-verification-code',
    other: {
      'msvalidate.01': 'B375176CFD87F6AF51C546321349C7B2',
    },
  },
}

// Schéma JSON-LD pour le SEO local - Zone d'intervention 31, 82, 32
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "IPB - Institut de Pathologie du Bâtiment",
  "image": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png",
  "description": "Expert en traitement des fissures et de l'humidité en Occitanie (31, 82, 32). Solutions techniques (agrafage, injection résine, cuvelage, VMI) avec garantie décennale. Toulouse, Montauban, Auch et environs.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "54 avenue Jean Jaurès",
    "addressLocality": "Tournefeuille",
    "postalCode": "31170",
    "addressRegion": "Occitanie",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "43.6047",
    "longitude": "1.4442"
  },
  "url": "https://www.ipb-expertise.fr",
  "telephone": "+33582953375",
  "priceRange": "€€",
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Haute-Garonne (31)" },
    { "@type": "AdministrativeArea", "name": "Tarn-et-Garonne (82)" },
    { "@type": "AdministrativeArea", "name": "Gers (32)" }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "43.7",
      "longitude": "1.3"
    },
    "geoRadius": "80km"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services IPB",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Traitement des fissures structurelles",
          "description": "Agrafage et harpage pour stabiliser les fondations"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Traitement de l'humidité",
          "description": "Injection résine hydrophobe et cuvelage"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "14"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* DNS-prefetch pour les scripts tiers */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#EA580C" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Skip link for accessibility - allows keyboard users to skip navigation */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-orange-600 focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:font-bold focus:shadow-lg focus:outline-none"
          tabIndex={0}
        >
          Aller au contenu principal
        </a>
        <main id="main-content">
          {children}
        </main>
        <StickyDiagnosticCta />
        <ExitIntentPopup />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}

