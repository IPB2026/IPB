import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { quartiersData as quartiersDataSource, quartierSlugs } from '@/app/data/quartiers';
import { generateLocalFAQ, buildFAQPageJsonLd, IPB_AGGREGATE_RATING } from '@/lib/seo/localFAQ';
import { ArrowRight, MapPin, AlertTriangle, CheckCircle, Shield } from 'lucide-react';

const quartiersData = quartiersDataSource;

type PageProps = {
  params: Promise<{ quartier: string }>;
};

export async function generateStaticParams() {
  return quartierSlugs.map((quartier) => ({
    quartier: quartier,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { quartier } = await params;
  const quartierInfo = quartiersData[quartier];

  if (!quartierInfo) {
    return {
      title: 'Quartier non trouvé | IPB',
    };
  }

  const title = `Expert Fissures & Humidité ${quartierInfo.nom} Toulouse | IPB`;
  const description = `Expert en traitement des fissures et humidité au ${quartierInfo.nom} à Toulouse. Diagnostic gratuit, solutions durables (agrafage, injection). Intervention rapide. ☎ 05 82 95 33 75`;

  return {
    title,
    description,
    keywords: [
      `expert fissures ${quartierInfo.nom.toLowerCase()}`,
      `traitement humidité ${quartierInfo.nom.toLowerCase()}`,
      `agrafage ${quartierInfo.nom.toLowerCase()}`,
      'toulouse',
      'diagnostic gratuit',
      'remontées capillaires',
      'tassement différentiel',
    ],
    alternates: {
      canonical: `https://www.ipb-expertise.fr/quartiers/${quartier}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.ipb-expertise.fr/quartiers/${quartier}`,
      siteName: 'IPB - Institut de Pathologie du Bâtiment',
      locale: 'fr_FR',
      type: 'website',
      images: [
        {
          url: '/images/IPB_Logo_HD.png',
          width: 1200,
          height: 630,
          alt: `Expert fissures ${quartierInfo.nom}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/IPB_Logo_HD.png'],
    },
    robots: { index: true, follow: true },
  };
}

export default async function QuartierPage({ params }: PageProps) {
  const { quartier } = await params;
  const quartierInfo = quartiersData[quartier];

  if (!quartierInfo) {
    notFound();
  }

  // JSON-LD pour le SEO local
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://www.ipb-expertise.fr/quartiers/${quartier}`,
    name: `IPB - Expert Fissures & Humidité ${quartierInfo.nom}`,
    description: `Expert en pathologie du bâtiment au ${quartierInfo.nom} à Toulouse. Traitement des fissures et de l'humidité.`,
    telephone: '+33582953375',
    email: 'contact@ipb-expertise.fr',
    url: `https://www.ipb-expertise.fr/quartiers/${quartier}`,
    image: 'https://www.ipb-expertise.fr/images/IPB_Logo_HD.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Toulouse',
      addressRegion: 'Occitanie',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.6047,
      longitude: 1.4442,
    },
    areaServed: {
      '@type': 'City',
      name: quartierInfo.nom,
      containedIn: 'Toulouse',
    },
    priceRange: '€€',
    aggregateRating: IPB_AGGREGATE_RATING,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
  };

  // FAQPage géolocalisé — rich snippets locales
  const localFAQ = generateLocalFAQ({
    villeNom: `${quartierInfo.nom} (Toulouse)`,
    codePostal: '31000',
    departement: 'Haute-Garonne',
  });
  const faqPageJsonLd = buildFAQPageJsonLd(localFAQ);

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://www.ipb-expertise.fr',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Quartiers Toulouse',
        item: 'https://www.ipb-expertise.fr/quartiers',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: quartierInfo.nom,
        item: `https://www.ipb-expertise.fr/quartiers/${quartier}`,
      },
    ],
  };

  return (
    <div className="font-sans text-ipb-text bg-ipb-cream antialiased">
      <Script
        id="jsonld-quartier"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="jsonld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      {/* Breadcrumbs visuels */}
      <div className="bg-white border-b border-ipb-rule">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-ipb-muted" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-ipb-orange transition">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link href="/quartiers" className="hover:text-ipb-orange transition">Quartiers</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ipb-text font-medium" aria-current="page">{quartierInfo.nom}</span>
          </nav>
        </div>
      </div>

      <main id="main-content">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="text-ipb-orange" size={24} aria-hidden="true" />
            <span className="text-ipb-orange-l font-semibold text-sm uppercase tracking-widest">
              Quartier {quartierInfo.nom}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Expert Fissures & Humidité<br />
            <span className="text-ipb-orange-l">{quartierInfo.nom}</span> - Toulouse
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl leading-relaxed">
            {quartierInfo.description}. Intervention rapide, diagnostic gratuit, solutions durables avec garantie décennale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center gap-2 bg-ipb-orange text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:bg-ipb-orange transition-all transform hover:-translate-y-1"
            >
              Diagnostic gratuit
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
            <a
              href="tel:0582953375"
              className="inline-flex items-center justify-center gap-2 bg-white text-ipb-text px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-ipb-stone transition-all"
            >
              📞 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

        {/* Caractéristiques du quartier */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-ipb-text mb-8">
              Caractéristiques du quartier {quartierInfo.nom}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {quartierInfo.caracteristiques.map((carac, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-ipb-cream rounded-lg border border-ipb-rule">
                  <CheckCircle className="text-ipb-orange flex-shrink-0 mt-1" size={20} aria-hidden="true" />
                  <p className="text-ipb-text">{carac}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problématiques fréquentes */}
        <section className="py-16 bg-ipb-cream">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle className="text-ipb-orange" size={32} aria-hidden="true" />
              <h2 className="text-3xl md:text-4xl font-black text-ipb-text">
                Problématiques fréquentes au {quartierInfo.nom}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quartierInfo.problematiques.map((prob, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-ipb-rule shadow-sm">
                  <div className="w-12 h-12 bg-ipb-stone rounded-lg flex items-center justify-center mb-4">
                    <AlertTriangle className="text-ipb-orange" size={24} aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-ipb-text mb-2">{prob}</h3>
                  <p className="text-sm text-ipb-muted">
                    Notre expertise technique permet de diagnostiquer et traiter cette pathologie rapidement.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nos services pour ce quartier */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-ipb-text mb-12 text-center">
              Nos expertises au {quartierInfo.nom}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border border-ipb-rule">
                <h3 className="text-2xl font-bold text-ipb-text mb-4">🏗️ Traitement des fissures</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-ipb-orange flex-shrink-0 mt-1" size={18} aria-hidden="true" />
                    <span className="text-ipb-text">Diagnostic instrumenté (fissuromètre, laser)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-ipb-orange flex-shrink-0 mt-1" size={18} aria-hidden="true" />
                    <span className="text-ipb-text">Agrafage et harpage structurel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-ipb-orange flex-shrink-0 mt-1" size={18} aria-hidden="true" />
                    <span className="text-ipb-text">Alternative économique aux micropieux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-ipb-orange flex-shrink-0 mt-1" size={18} aria-hidden="true" />
                    <span className="text-ipb-text">Garantie décennale incluse</span>
                  </li>
                </ul>
                <Link
                  href="/expertise/fissures"
                  className="inline-flex items-center gap-2 text-ipb-orange font-bold hover:text-ipb-orange transition"
                >
                  En savoir plus <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-200">
                <h3 className="text-2xl font-bold text-ipb-text mb-4">💧 Traitement de l'humidité</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={18} aria-hidden="true" />
                    <span className="text-ipb-text">Diagnostic hygrométrique complet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={18} aria-hidden="true" />
                    <span className="text-ipb-text">Injection résine hydrophobe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={18} aria-hidden="true" />
                    <span className="text-ipb-text">Cuvelage et drainage périphérique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={18} aria-hidden="true" />
                    <span className="text-ipb-text">Garantie 30 ans sur barrière étanche</span>
                  </li>
                </ul>
                <Link
                  href="/expertise/humidite"
                  className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition"
                >
                  En savoir plus <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-ipb-navy text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Shield className="text-ipb-orange" size={32} aria-hidden="true" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Habitant du {quartierInfo.nom} ?<br />Intervention rapide garantie
            </h2>
            <p className="text-xl text-white/70 mb-10 leading-relaxed">
              En tant qu'expert local, nous intervenons rapidement dans votre quartier. 
              Diagnostic gratuit sous 48h, devis clair, travaux garantis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center gap-2 bg-ipb-orange text-white px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:bg-ipb-orange transition-all transform hover:-translate-y-1"
              >
                Lancer le diagnostic
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <a
                href="tel:0582953375"
                className="inline-flex items-center justify-center gap-2 bg-white text-ipb-text px-10 py-5 rounded-xl font-bold text-lg shadow-xl hover:bg-ipb-stone transition-all"
              >
                📞 Appeler maintenant
              </a>
            </div>
          </div>
        </section>
      </main>

      <InternalLinks variant="ville" title="Ressources utiles" />
      <Footer />
    </div>
  );
}
