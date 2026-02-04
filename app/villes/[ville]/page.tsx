import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { TrustSignals } from '@/components/home/TrustSignals';
import { ServicesStructure } from '@/components/home/ServicesStructure';
import { ServicesHumidity } from '@/components/home/ServicesHumidity';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';
import { ContactSection } from '@/components/home/ContactSection';
import { Footer } from '@/components/home/Footer';
import Link from 'next/link';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { villesData as villesDataSource, villeSlugs } from '@/app/data/villes';

// Données villes centralisées dans app/data/villes.ts



const villesData = villesDataSource;

interface PageProps {
  params: Promise<{ ville: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ville } = await params;
  const villeData = villesData[ville.toLowerCase()];

  if (!villeData) {
    return {
      title: 'Expert Fissures & Humidité | IPB',
    };
  }

  const title = `Expert Fissures & Humidité à ${villeData.nom} (${villeData.codePostal}) | IPB`;
  const description = `Expert en traitement des fissures et de l'humidité à ${villeData.nom} (${villeData.departement}). Intervention rapide dans un rayon de 50 km autour de Toulouse. Solutions techniques avec garantie décennale.`;

  return {
    title,
    description,
    keywords: [
      `expert fissures ${villeData.nom}`,
      `traitement humidité ${villeData.nom}`,
      `agrafage ${villeData.nom}`,
      `injection résine ${villeData.nom}`,
      `expert bâtiment ${villeData.codePostal}`,
      `fissures maison ${villeData.nom}`,
      `humidité murs ${villeData.nom}`,
      villeData.departement,
      'Haute-Garonne',
      'Toulouse'
    ],
    openGraph: {
      title,
      description,
      url: `https://www.ipb-expertise.fr/villes/${ville}`,
      siteName: 'IPB',
      locale: 'fr_FR',
      type: 'website',
    },
    alternates: {
      canonical: `https://www.ipb-expertise.fr/villes/${ville}`,
    },
  };
}

export default async function VillePage({ params }: PageProps) {
  const { ville } = await params;
  const villeData = villesData[ville.toLowerCase()];

  // Si la ville n'existe pas, afficher la page 404
  if (!villeData) {
    notFound();
  }

  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased scroll-smooth">
      {/* JSON-LD pour SEO local */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: `IPB - Expert Fissures & Humidité à ${villeData.nom}`,
            description: `Expert en traitement des fissures et de l'humidité à ${villeData.nom} (${villeData.departement}). Intervention rapide dans un rayon de 50 km autour de Toulouse.`,
            address: {
              '@type': 'PostalAddress',
              addressLocality: villeData.nom,
              postalCode: villeData.codePostal,
              addressRegion: 'Haute-Garonne',
              addressCountry: 'FR',
            },
            areaServed: {
              '@type': 'City',
              name: villeData.nom,
            },
            url: `https://www.ipb-expertise.fr/villes/${ville}`,
            telephone: '+33582953375',
            priceRange: '€€',
            serviceArea: {
              '@type': 'GeoCircle',
              geoMidpoint: {
                '@type': 'GeoCoordinates',
                latitude: '43.6047',
                longitude: '1.4442',
              },
              geoRadius: {
                '@type': 'Distance',
                name: '50 km autour de Toulouse',
              },
            },
          }),
        }}
      />

      <TopBar />
      <Navbar />

      {/* Hero Section adaptée pour la ville */}
      <section className="relative bg-slate-900 text-white overflow-hidden pb-24 pt-20 md:py-32 lg:pb-40">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 opacity-90"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:w-3/4 lg:w-3/5">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-100 px-4 py-1.5 rounded-full text-xs font-bold mb-8 uppercase tracking-wider backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
              Intervention à {villeData.nom} ({villeData.distance} de Toulouse)
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 drop-shadow-sm">
              Expert Fissures & Humidité à <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">{villeData.nom}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              <strong className="text-white">IPB intervient à {villeData.nom} ({villeData.codePostal})</strong> pour le traitement des fissures structurelles et de l'humidité.
              <br />
              <strong className="text-white border-b border-orange-500/50 pb-0.5">Intervention rapide dans un rayon de 50 km autour de Toulouse.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/diagnostic" className="w-full sm:w-auto bg-orange-600 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-xl shadow-orange-900/40 hover:bg-orange-500 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1">
                Diagnostic gratuit en 3 minutes
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
              <a href="tel:0582953375" className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Consultation gratuite par téléphone
              </a>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 text-sm text-slate-400 font-medium">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                  <path d="m9 11 3 3L22 4"></path>
                </svg>
                Intervention rapide à {villeData.nom}
              </span>
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                  <path d="m9 11 3 3L22 4"></path>
                </svg>
                Diagnostic expert sous 24h
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section spécifique à la ville */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Expert en Pathologie du Bâtiment à {villeData.nom}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {villeData.description}. IPB intervient régulièrement à {villeData.nom} ({villeData.codePostal}) pour le traitement des fissures structurelles causées par la sécheresse et les mouvements de terrain argileux, ainsi que pour l'assèchement des murs touchés par les remontées capillaires.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-orange-600">🔧</span>
                Fissures à {villeData.nom}
              </h3>
              <p className="text-slate-600 mb-4">
                Le sol argileux de {villeData.nom} est particulièrement sensible aux variations climatiques. Les maisons individuelles subissent des mouvements de terrain qui créent des fissures structurelles.
              </p>
              <p className="text-slate-600">
                Notre technique d'agrafage permet de stabiliser les fondations sans avoir recours aux micropieux coûteux, pour un coût jusqu'à 3 fois inférieur.
              </p>
            </div>

            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">💧</span>
                Humidité à {villeData.nom}
              </h3>
              <p className="text-slate-600 mb-4">
                Les remontées capillaires sont fréquentes à {villeData.nom}, notamment dans les maisons anciennes et les sous-sols.
              </p>
              <p className="text-slate-600">
                Notre traitement par injection résine hydrophobe crée une barrière étanche définitive, garantie 30 ans, pour stopper définitivement l'humidité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Liens internes contextuels */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
            Services recommandés à {villeData.nom}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/expertise/fissures" className="bg-white border border-slate-200 rounded-xl p-4 hover:border-orange-300 hover:shadow-sm transition">
              <h3 className="font-bold text-slate-900 mb-1">Fissures & structure</h3>
              <p className="text-sm text-slate-600">Agrafage, stabilisation, diagnostic expert.</p>
            </Link>
            <Link href="/expertise/humidite" className="bg-white border border-slate-200 rounded-xl p-4 hover:border-orange-300 hover:shadow-sm transition">
              <h3 className="font-bold text-slate-900 mb-1">Humidité & infiltrations</h3>
              <p className="text-sm text-slate-600">Injection résine durable, cuvelage.</p>
            </Link>
            <Link href="/diagnostic" className="bg-white border border-slate-200 rounded-xl p-4 hover:border-orange-300 hover:shadow-sm transition">
              <h3 className="font-bold text-slate-900 mb-1">Diagnostic gratuit</h3>
              <p className="text-sm text-slate-600">Analyse rapide en 2 minutes.</p>
            </Link>
            <Link href="/contact" className="bg-white border border-slate-200 rounded-xl p-4 hover:border-orange-300 hover:shadow-sm transition">
              <h3 className="font-bold text-slate-900 mb-1">Contact IPB</h3>
              <p className="text-sm text-slate-600">Intervention locale rapide.</p>
            </Link>
          </div>
        </div>
      </section>

      <TrustSignals />
      <ServicesStructure />
      <ServicesHumidity />
      <Testimonials />
      <FAQ />
      <ContactSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <InternalLinks variant="ville" />
      </div>
      <Footer />
    </div>
  );
}

// Génération statique des pages pour toutes les villes
export async function generateStaticParams() {
  return villeSlugs.map((ville) => ({
    ville: ville,
  }));
}

