import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import { Analytics } from "@/components/layout/Analytics"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
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
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.ipb-expertise.fr",
    siteName: "IPB - Institut de Pathologie du Bâtiment",
    title: "IPB - Expert Fissures & Humidité Toulouse | Haute-Garonne",
    description: "Expert en traitement des fissures et de l'humidité en Haute-Garonne. Solutions techniques avec garantie décennale.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IPB - Expert en pathologie du bâtiment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPB - Expert Fissures & Humidité Toulouse",
    description: "Expert en traitement des fissures et de l'humidité en Haute-Garonne.",
    images: ["/og-image.jpg"],
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
    // yandex: 'your-yandex-verification-code',
  },
}

// Schéma JSON-LD pour le SEO local
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "IPB - Institut de Pathologie du Bâtiment",
  "image": "https://www.ipb-expertise.fr/og-image.jpg",
  "description": "Expert en traitement des fissures et de l'humidité en Haute-Garonne. Solutions techniques (agrafage, injection résine) avec garantie décennale.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "31C Chemin de Roquettes",
    "addressLocality": "Saubens",
    "postalCode": "31600",
    "addressRegion": "Haute-Garonne",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "43.5",
    "longitude": "1.3"
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
    "reviewCount": "127"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

