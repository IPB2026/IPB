import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import "./blog-article.css"
import Script from "next/script"
import { Analytics } from "@/components/layout/Analytics"

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
    default: "IPB - Expert Fissures & Humidité Toulouse | Haute-Garonne",
    template: "%s | IPB"
  },
  description: "Expert en traitement des fissures et de l'humidité en Haute-Garonne. Solutions techniques (agrafage, injection résine) avec garantie décennale. Alternative économique aux micropieux.",
  keywords: ["fissures maison", "humidité murs", "Toulouse", "Haute-Garonne", "agrafage", "injection résine", "expert bâtiment", "garantie décennale"],
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
      { url: '/images/IPB_Logo_HD.png', sizes: 'any' },
      { url: '/images/IPB_Logo_HD.png', type: 'image/png' },
    ],
    apple: [
      { url: '/images/IPB_Logo_HD.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/images/IPB_Logo_HD.png',
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.ipb-expertise.fr",
    siteName: "IPB - Institut de Pathologie du Bâtiment",
    title: "IPB - Expert Fissures & Humidité Toulouse | Haute-Garonne",
    description: "Expert en traitement des fissures et de l'humidité en Haute-Garonne. Solutions techniques avec garantie décennale.",
    images: [
      {
        url: "/images/IPB_Logo_HD.png",
        width: 1200,
        height: 630,
        alt: "IPB Expert Fissures Humidité Toulouse Haute-Garonne - Agrafage Injection Résine Garantie Décennale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPB - Expert Fissures & Humidité Toulouse",
    description: "Expert en traitement des fissures et de l'humidité en Haute-Garonne.",
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

// Schéma JSON-LD pour le SEO local
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "IPB - Institut de Pathologie du Bâtiment",
  "image": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png",
  "description": "Expert en traitement des fissures et de l'humidité en Haute-Garonne. Solutions techniques (agrafage, injection résine) avec garantie décennale.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "54 avenue Jean Jaurès",
    "addressLocality": "Tournefeuille",
    "postalCode": "31170",
    "addressRegion": "Haute-Garonne",
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
  "areaServed": {
    "@type": "City",
    "name": "Toulouse"
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "43.6047",
      "longitude": "1.4442"
    },
    "geoRadius": {
      "@type": "Distance",
      "name": "Haute-Garonne (31)"
    }
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
        {/* 💣 Preconnect for performance (CORE WEB VITALS) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        
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
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

