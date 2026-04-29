import type { Metadata } from "next"
import { Playfair_Display, DM_Sans } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import dynamic from "next/dynamic"
import { Analytics } from "@/components/layout/Analytics"

const CookieBanner = dynamic(() => import("@/components/CookieBanner").then(m => m.CookieBanner), { ssr: false })
const StickyDiagnosticCta = dynamic(() => import("@/components/StickyDiagnosticCta").then(m => m.StickyDiagnosticCta), { ssr: false })
const ExitIntentPopup = dynamic(() => import("@/components/blog/ExitIntentPopup").then(m => m.ExitIntentPopup), { ssr: false })
const LeadWidget = dynamic(() => import("@/components/ui/LeadWidget").then(m => m.LeadWidget), { ssr: false })

// DM Sans — corps de texte et UI (charte IPB Design Handoff)
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
})

// Playfair Display — titres serif italique signature éditoriale
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-serif',
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ipb-expertise.fr'),
  title: {
    default: "IPB - Spécialistes de la structure de votre habitat | Diagnostic Fissures & Ouverture Mur Porteur Toulouse",
    template: "%s | IPB"
  },
  description: "Diagnostiquez vos fissures, ouvrez un mur porteur, créez une baie vitrée à Toulouse. Institut IPB — bureau d'études et travaux, décennale AXA. Réponse sous 24 h. (31-82-32).",
  keywords: ["expert fissures Toulouse", "ouverture mur porteur Toulouse", "création baie vitrée Toulouse", "étude structure bâtiment", "agrafage fissures", "poutre IPN HEB", "fissures maison", "expert structure Toulouse", "Montauban", "Auch", "Haute-Garonne", "Tarn-et-Garonne", "Gers", "Tarn", "pathologie du bâtiment", "garantie décennale", "humidité murs", "injection résine"],
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
    title: "IPB - Spécialistes de la structure de votre habitat | Toulouse, Montauban, Auch",
    description: "Diagnostiquez vos fissures, ouvrez un mur porteur (étude IPN/HEB), créez une baie vitrée. Institut IPB — bureau d'études et travaux, décennale AXA. Toulouse, Montauban, Auch.",
    images: [
      {
        url: "/images/IPB_Logo_HD.png",
        width: 1200,
        height: 630,
        alt: "IPB Expert Fissures, Mur Porteur & Baie Vitrée — Toulouse, Montauban, Auch — Étude structure et garantie décennale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPB - Spécialistes de la structure de votre habitat (31-82-32)",
    description: "Diagnostiquez vos fissures, ouvrez un mur porteur, créez une baie vitrée. Institut IPB — bureau d'études et travaux. Décennale AXA.",
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
  "@id": "https://www.ipb-expertise.fr#localbusiness",
  "name": "IPB - Institut de Pathologie du Bâtiment",
  "image": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png",
  "description": "Institut indépendant en pathologie et structure du bâtiment en Occitanie (31, 82, 32, 81). Expertise fissures (agrafage, micropieux), ouverture de mur porteur et création de baie vitrée (étude structure, pose poutre IPN/HEB), traitement de l'humidité (injection résine, cuvelage). Étude et travaux sous garantie décennale. Toulouse, Montauban, Auch et environs.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "13 rue du Recteur Dottin",
    "addressLocality": "Toulouse",
    "postalCode": "31100",
    "addressRegion": "Occitanie",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "43.5857",
    "longitude": "1.3464"
  },
  "url": "https://www.ipb-expertise.fr",
  "telephone": "+33582953375",
  "priceRange": "€€",
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Haute-Garonne (31)" },
    { "@type": "AdministrativeArea", "name": "Tarn-et-Garonne (82)" },
    { "@type": "AdministrativeArea", "name": "Gers (32)" },
    { "@type": "AdministrativeArea", "name": "Tarn (81)" }
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
          "name": "Expertise et traitement des fissures structurelles",
          "description": "Diagnostic structure, agrafage et harpage, reprise en sous-œuvre par micropieux. Garantie décennale."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Ouverture de mur porteur",
          "description": "Étude structure, dimensionnement et pose de poutre IPN/HEB, étaiement, ouverture, finitions. Cuisine ouverte, suite parentale, plateau loft. Garantie décennale sur l'étude et les travaux."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Création de baie vitrée",
          "description": "Création d'une baie vitrée sur projet de façade. Étude technique, ouverture du mur porteur, pose du dormant et finitions. Démarches administratives accompagnées (déclaration préalable ou permis de construire). Garantie décennale."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Traitement de l'humidité",
          "description": "Injection de résine hydrophobe, cuvelage et VMI pour murs humides et infiltrations."
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "15"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17902440600"
          strategy="lazyOnload"
        />
        <Script id="google-ads-gtag" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17902440600');
          `}
        </Script>

        {/* Structured Data — LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* Structured Data — WebSite + SearchAction (sitelinks Google) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://www.ipb-expertise.fr#website",
            "name": "IPB - Expert Fissures, Mur Porteur & Baie Vitrée",
            "alternateName": "IPB - Institut de Pathologie du Bâtiment",
            "url": "https://www.ipb-expertise.fr",
            "publisher": { "@id": "https://www.ipb-expertise.fr#organization" },
            "inLanguage": "fr-FR",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.ipb-expertise.fr/blog?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          }) }}
        />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#EA580C" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${dmSans.className} antialiased bg-ipb-cream text-ipb-text`}>
        {/* Skip link for accessibility - allows keyboard users to skip navigation */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-ipb-orange focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:font-bold focus:shadow-lg focus:outline-none"
          tabIndex={0}
        >
          Aller au contenu principal
        </a>
        <main id="main-content">
          {children}
        </main>
        <LeadWidget />
        <StickyDiagnosticCta />
        <ExitIntentPopup />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}

