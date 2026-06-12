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
    default: "IPB · Institut de pathologie & structure du bâtiment — Toulouse & Occitanie",
    template: "%s | IPB"
  },
  description: "Institut spécialisé dans la structure du bâtiment. Diagnostic de fissures, expertise humidité, expertise avant achat et ouverture de mur porteur. IPB qualifie votre demande et coordonne ; un expert du réseau partenaire réalise le diagnostic gratuit, les équipes du réseau IPB exécutent les travaux sous décennale. Toulouse, Montauban, Auch (31-82-32).",
  keywords: ["expert fissures Toulouse", "expertise humidité Toulouse", "expertise avant achat Toulouse", "ouverture mur porteur Toulouse", "agrafage fissures", "fissures maison", "expert structure Toulouse", "Montauban", "Auch", "Haute-Garonne", "Tarn-et-Garonne", "Gers", "Tarn", "institut pathologie du bâtiment", "diagnostic structure", "humidité murs"],
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
    title: "IPB · Institut de pathologie & structure du bâtiment — Toulouse & Occitanie",
    description: "Diagnostic de fissures, expertise humidité, expertise avant achat et ouverture de mur porteur. IPB qualifie votre demande et coordonne ; les experts du réseau IPB réalisent le diagnostic et les travaux sous décennale.",
    images: [
      {
        url: "/images/IPB_Logo_HD.png",
        width: 1200,
        height: 630,
        alt: "IPB — Institut de pathologie & structure du bâtiment · Toulouse, Montauban, Auch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPB · Institut de pathologie & structure du bâtiment (Occitanie)",
    description: "Diagnostic de fissures, humidité, expertise avant achat, mur porteur. IPB coordonne ; le réseau d'experts partenaires intervient sous décennale.",
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
  // Lien sémantique bidirectionnel avec l'Organization déclarée dans app/page.tsx.
  // Permet à Google de fusionner les deux entités dans son Knowledge Graph.
  "parentOrganization": { "@id": "https://www.ipb-expertise.fr#organization" },
  "name": "IPB - Institut de Pathologie du Bâtiment",
  "legalName": "IPB",
  "image": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png",
  // foundingDate = date d'immatriculation de l'EI IPB (SIRET 908 995 103, 2022).
  // Le « réseau IPB » est actif depuis 2019 mais Schema.org Organization
  // doit refléter l'entité juridique, pas le récit marketing.
  "foundingDate": "2022",
  "description": "Institut spécialisé en pathologie et structure du bâtiment en Occitanie (31, 82, 32, 81). Diagnostic de fissures, expertise humidité, expertise avant achat et ouverture de mur porteur. Diagnostic et coordination assurés par IPB ; travaux réalisés sous décennale par les équipes de réalisation du réseau IPB. Toulouse, Montauban, Auch et environs.",
  // Siège IPB confirmé par le client (mai 2026).
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
    "latitude": "43.5857",
    "longitude": "1.3464"
  },
  "url": "https://www.ipb-expertise.fr",
  "telephone": "+33582953375",
  "email": "contact@ipb-expertise.fr",
  "priceRange": "€€",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
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
          "name": "Diagnostic et traitement des fissures",
          "description": "Visite sur site, mesure au fissuromètre, identification de la cause. L'institut conçoit la solution (agrafage structurel, harpage, reprise) et les équipes de réalisation du réseau IPB l'exécutent sous décennale. Rapports reconnus par les assurances."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Diagnostic humidité et infiltrations",
          "description": "Remontées capillaires, infiltrations, salpêtre, condensation. L'institut identifie la cause exacte, conçoit la solution juste, et la met en œuvre avec ses équipes de réalisation."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Expertise structurelle avant achat immobilier",
          "description": "Analyse indépendante du bâti avant signature : fissures, désordres apparents et cachés, état de la structure. Rapport remis sous 3 à 5 jours, compatible avec votre délai de rétractation."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Ouverture de mur porteur et baie vitrée",
          "description": "L'institut conçoit le projet et l'étude de structure (dimensionnement de la poutre) ; les équipes de réalisation du réseau IPB exécutent les travaux sous décennale 10 ans. Démarches administratives accompagnées."
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "18"
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

        {/* RGPD — Google Consent Mode v2
            Ce script DOIT s'exécuter avant le chargement de gtag.js pour que
            tous les services Google démarrent en mode "consentement refusé".
            Le bandeau cookies (components/CookieBanner.tsx) appellera ensuite
            `gtag('consent', 'update', ...)` quand l'utilisateur fera son choix.
            wait_for_update: 500ms = on laisse le bandeau le temps de répondre
            avant que les hits par défaut ne soient mis en file d'attente. */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'functionality_storage': 'granted',
              'security_storage': 'granted',
              'wait_for_update': 500
            });
            // Active la modélisation des conversions Google Ads en cas de refus
            // (forme anonymisée et autorisée par la CNIL)
            gtag('set', 'ads_data_redaction', true);
            gtag('set', 'url_passthrough', true);
          `}
        </Script>

        {/* Google Ads global tag — l'ID est défini via NEXT_PUBLIC_GOOGLE_ADS_ID
            (fallback sur la valeur historique pour ne pas casser la prod actuelle).
            Voir TRACKING.md. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-17902440600'}`}
          strategy="lazyOnload"
        />
        <Script id="google-ads-gtag" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-17902440600'}');
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

