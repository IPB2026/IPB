import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { TrustSignals } from '@/components/home/TrustSignals';
import { ServicesStructure } from '@/components/home/ServicesStructure';
import { ServicesHumidity } from '@/components/home/ServicesHumidity';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';
import { ContactSection } from '@/components/home/ContactSection';
import { Footer } from '@/components/home/Footer';
import Link from 'next/link';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { villesData as villesDataSource, villeSlugs, getVillesMemesDepartement } from '@/app/data/villes';
import { generateLocalFAQ, buildFAQPageJsonLd, IPB_AGGREGATE_RATING } from '@/lib/seo/localFAQ';

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

  const deptCode = villeData.codePostal.slice(0, 2);
  const title = `Expert Fissures & Humidité ${villeData.nom} ${deptCode} · AXA`;
  const description = `Expert fissures et humidité à ${villeData.nom} (${villeData.departement}). Diagnostic sous 48h. Décennale AXA. ☎ 05 82 95 33 75`;

  // Canonical override : sur Toulouse, /villes/toulouse pointe vers /expert-fissures-toulouse-31
  // pour résoudre la cannibalisation entre les 3 URLs ciblant la même intention.
  const canonicalUrl = ville.toLowerCase() === 'toulouse'
    ? 'https://www.ipb-expertise.fr/expert-fissures-toulouse-31'
    : `https://www.ipb-expertise.fr/villes/${ville}`;

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
      url: canonicalUrl,
      siteName: 'IPB',
      locale: 'fr_FR',
      type: 'website',
    },
    alternates: {
      canonical: canonicalUrl,
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

  // FAQ géolocalisée pour rich snippets
  const localFAQ = generateLocalFAQ({
    villeNom: villeData.nom,
    codePostal: villeData.codePostal,
    departement: villeData.departement,
    risqueRGA: villeData.risqueRGA,
    quartiersRisque: villeData.quartiersRisque,
    typesConstruction: villeData.typesConstruction,
  });
  const faqPageJsonLd = buildFAQPageJsonLd(localFAQ);

  return (
    <div className="font-sans text-ipb-text bg-ipb-cream antialiased scroll-smooth">
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
            aggregateRating: IPB_AGGREGATE_RATING,
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

      {/* JSON-LD FAQPage — rich snippets locales */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
      {/* Hero Section adaptée pour la ville */}
      <section className="relative bg-ipb-navy text-white overflow-hidden pb-24 pt-20 md:py-32 lg:pb-40">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 opacity-90"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:w-3/4 lg:w-3/5">
            <div className="inline-flex items-center gap-2 bg-ipb-orange/10 border border-ipb-orange/30 text-ipb-orange-l px-4 py-1.5 rounded-full text-xs font-bold mb-8 uppercase tracking-wider backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
              Intervention à {villeData.nom} ({villeData.distance} de Toulouse)
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 drop-shadow-sm">
              Expert Fissures & Humidité à <span className="text-transparent bg-clip-text bg-ipb-orange">{villeData.nom}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
              <strong className="text-white">IPB intervient à {villeData.nom} ({villeData.codePostal})</strong> pour le traitement des fissures structurelles et de l'humidité.
              <br />
              <strong className="text-white border-b border-ipb-orange/50 pb-0.5">Intervention rapide dans un rayon de 50 km autour de Toulouse.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/diagnostic" className="w-full sm:w-auto bg-ipb-orange text-white px-8 py-5 rounded-xl font-bold text-lg shadow-xl shadow-orange-900/40 hover:bg-ipb-orange transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1">
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
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 text-sm text-ipb-light font-medium">
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

      {/* Section spécifique à la ville — contenu local enrichi */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-6">
              Expert en pathologie du bâtiment à {villeData.nom}
            </h2>
            <p className="text-lg text-ipb-muted leading-relaxed">
              {villeData.description}
            </p>
          </div>

          {/* Géologie locale & risque RGA */}
          {villeData.geologie && (
            <div className="max-w-4xl mx-auto mb-12 grid md:grid-cols-3 gap-6 bg-ipb-cream rounded-2xl border border-ipb-rule p-8">
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-ipb-text mb-3">Géologie locale</h3>
                <p className="text-ipb-muted leading-relaxed">{villeData.geologie}</p>
              </div>
              {villeData.risqueRGA && (
                <div className="border-t md:border-t-0 md:border-l border-ipb-rule pt-6 md:pt-0 md:pl-8">
                  <p className="text-xs uppercase tracking-wider text-ipb-muted font-bold mb-2">Risque RGA</p>
                  <p className="text-2xl font-extrabold text-ipb-orange capitalize">
                    {villeData.risqueRGA.replace('-', ' ')}
                  </p>
                  {villeData.tauxSinistralite && (
                    <p className="text-sm text-ipb-muted mt-3">
                      <span className="font-bold text-ipb-text">{villeData.tauxSinistralite}</span> de taux de sinistralité observé localement
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Arrêtés CAT-NAT — donnée vérifiable, fort signal d'autorité */}
          {villeData.arretesCATNAT && villeData.arretesCATNAT.length > 0 && (
            <div className="max-w-4xl mx-auto mb-12">
              <h3 className="text-xl font-bold text-ipb-text mb-4">
                Arrêtés de catastrophe naturelle reconnus à {villeData.nom}
              </h3>
              <p className="text-ipb-muted mb-4">
                Si votre habitation a subi des désordres pendant l'une de ces périodes, votre assurance peut prendre en charge les réparations sous condition de déclaration sous 30 jours.
              </p>
              <ul className="grid sm:grid-cols-2 gap-2">
                {villeData.arretesCATNAT.map((arrete) => (
                  <li key={arrete} className="flex items-start gap-2 text-sm text-ipb-text">
                    <span className="text-ipb-orange mt-0.5" aria-hidden="true">▸</span>
                    <span>{arrete}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quartiers les plus exposés */}
          {villeData.quartiersRisque && villeData.quartiersRisque.length > 0 && (
            <div className="max-w-4xl mx-auto mb-12">
              <h3 className="text-xl font-bold text-ipb-text mb-4">
                Quartiers les plus exposés à {villeData.nom}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {villeData.quartiersRisque.map((q) => (
                  <div key={q} className="bg-white border border-ipb-rule rounded-lg p-4 text-sm text-ipb-text">
                    {q}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Types de construction */}
          {villeData.typesConstruction && (
            <div className="max-w-4xl mx-auto mb-12">
              <h3 className="text-xl font-bold text-ipb-text mb-3">
                Le bâti à {villeData.nom}
              </h3>
              <p className="text-ipb-muted leading-relaxed">{villeData.typesConstruction}</p>
            </div>
          )}

          {/* Spécificités fissures + humidité */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-ipb-cream p-8 rounded-2xl border border-ipb-rule">
              <h3 className="text-xl font-bold text-ipb-text mb-4 flex items-center gap-2">
                <span className="text-ipb-orange" aria-hidden="true">🔧</span>
                Fissures à {villeData.nom}
              </h3>
              <p className="text-ipb-muted leading-relaxed">
                {villeData.specificitesFissures
                  || `Le sol argileux de ${villeData.nom} réagit fortement aux variations climatiques. Notre technique d'agrafage stabilise les fondations sans recours aux micropieux, pour un coût jusqu'à 3 fois inférieur.`}
              </p>
            </div>

            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200">
              <h3 className="text-xl font-bold text-ipb-text mb-4 flex items-center gap-2">
                <span className="text-blue-600" aria-hidden="true">💧</span>
                Humidité à {villeData.nom}
              </h3>
              <p className="text-ipb-muted leading-relaxed">
                {villeData.specificitesHumidite
                  || `Les remontées capillaires sont fréquentes dans les maisons anciennes de ${villeData.nom}. Notre injection résine hydrophobe crée une barrière étanche définitive, garantie 30 ans.`}
              </p>
            </div>
          </div>

          {/* Conseil expert + historique local — passages citables AI */}
          {(villeData.conseillExpert || villeData.historiqueLocal) && (
            <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-2 gap-8">
              {villeData.historiqueLocal && (
                <div>
                  <h3 className="text-xl font-bold text-ipb-text mb-3">
                    Contexte récent à {villeData.nom}
                  </h3>
                  <p className="text-ipb-muted leading-relaxed">{villeData.historiqueLocal}</p>
                </div>
              )}
              {villeData.conseillExpert && (
                <div className="bg-white border-l-4 border-ipb-orange pl-6 py-2">
                  <p className="text-xs uppercase tracking-wider text-ipb-orange font-bold mb-2">Le conseil de l'institut</p>
                  <p className="text-ipb-text leading-relaxed">{villeData.conseillExpert}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Liens internes contextuels */}
      <section className="py-12 bg-ipb-cream border-t border-ipb-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-ipb-text mb-6">
            Services recommandés à {villeData.nom}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/expertise/fissures" className="bg-white border border-ipb-rule rounded-xl p-4 hover:border-orange-300 hover:shadow-sm transition">
              <h3 className="font-bold text-ipb-text mb-1">Fissures & structure</h3>
              <p className="text-sm text-ipb-muted">Agrafage, stabilisation, diagnostic expert.</p>
            </Link>
            <Link href="/expertise/humidite" className="bg-white border border-ipb-rule rounded-xl p-4 hover:border-orange-300 hover:shadow-sm transition">
              <h3 className="font-bold text-ipb-text mb-1">Humidité & infiltrations</h3>
              <p className="text-sm text-ipb-muted">Injection résine durable, cuvelage.</p>
            </Link>
            <Link href="/diagnostic" className="bg-white border border-ipb-rule rounded-xl p-4 hover:border-orange-300 hover:shadow-sm transition">
              <h3 className="font-bold text-ipb-text mb-1">Diagnostic gratuit</h3>
              <p className="text-sm text-ipb-muted">Analyse rapide en 2 minutes.</p>
            </Link>
            <Link href="/contact" className="bg-white border border-ipb-rule rounded-xl p-4 hover:border-orange-300 hover:shadow-sm transition">
              <h3 className="font-bold text-ipb-text mb-1">Contact IPB</h3>
              <p className="text-sm text-ipb-muted">Intervention locale rapide.</p>
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
      {/* Maillage inter-villes par département */}
      <section className="py-12 bg-white border-t border-ipb-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-ipb-text mb-6">
            Nos experts dans votre département
          </h2>
          <div className="flex flex-wrap gap-3">
            {getVillesMemesDepartement(ville.toLowerCase()).slice(0, 12).map((v) => {
              const vData = villesData[v];
              if (!vData) return null;
              return (
                <Link
                  key={v}
                  href={`/expert-fissures/${v}`}
                  className="bg-ipb-cream hover:bg-ipb-stone border border-ipb-rule hover:border-orange-300 text-ipb-text hover:text-ipb-orange px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Expert fissures {vData.nom}
                </Link>
              );
            })}
            <Link
              href="/zones-intervention"
              className="bg-ipb-stone border border-ipb-rule text-ipb-orange hover:bg-ipb-stone px-4 py-2 rounded-lg text-sm font-bold transition"
            >
              Voir les 56 villes →
            </Link>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <InternalLinks variant="ville" />
      </div>
      </main>
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

