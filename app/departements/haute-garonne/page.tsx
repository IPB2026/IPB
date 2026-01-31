import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MapPin, CheckCircle, ArrowRight, Shield, Award, Clock } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';

export const metadata: Metadata = {
  title: 'Expert Fissures & Humidité Haute-Garonne (31) | Toulouse et environs | IPB',
  description: 'Expert n°1 en traitement des fissures et humidité en Haute-Garonne (31). Intervention rapide à Toulouse, Colomiers, Blagnac, Muret, Tournefeuille. Diagnostic gratuit, garantie décennale 10 ans. Sols argileux, sécheresse.',
  keywords: [
    'expert fissures haute-garonne',
    'expert fissures toulouse',
    'traitement humidité 31',
    'fissures maison toulouse',
    'humidité murs haute-garonne',
    'agrafage fissures 31',
    'injection résine toulouse',
    'diagnostic fissures gratuit toulouse',
    'sol argileux toulouse',
    'sécheresse fissures 31',
  ],
  openGraph: {
    title: 'Expert Fissures & Humidité Haute-Garonne (31) | IPB',
    description: 'Expert n°1 à Toulouse et en Haute-Garonne. Diagnostic gratuit, intervention rapide.',
    url: 'https://www.ipb-expertise.fr/departements/haute-garonne',
    siteName: 'IPB - Expert Fissures & Humidité',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/IPB_Logo_HD.png',
        width: 1200,
        height: 630,
        alt: 'Expert Fissures Haute-Garonne Toulouse IPB',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/departements/haute-garonne',
  },
};

export default function HauteGaronnePage() {
  const villesPrincipales = [
    { slug: 'toulouse', nom: 'Toulouse', habitants: '493 000', zone: 'Centre' },
    { slug: 'colomiers', nom: 'Colomiers', habitants: '40 000', zone: 'Ouest' },
    { slug: 'blagnac', nom: 'Blagnac', habitants: '25 000', zone: 'Nord-Ouest' },
    { slug: 'muret', nom: 'Muret', habitants: '27 000', zone: 'Sud' },
    { slug: 'tournefeuille', nom: 'Tournefeuille', habitants: '28 000', zone: 'Ouest' },
    { slug: 'balma', nom: 'Balma', habitants: '17 000', zone: 'Est' },
  ];

  const villesSecondaires = [
    { slug: 'cugnaux', nom: 'Cugnaux' },
    { slug: 'plaisance-du-touch', nom: 'Plaisance-du-Touch' },
    { slug: 'ramonville-saint-agne', nom: 'Ramonville-Saint-Agne' },
    { slug: 'saint-oren-de-gameville', nom: 'Saint-Orens-de-Gameville' },
    { slug: 'castanet-tolosan', nom: 'Castanet-Tolosan' },
    { slug: 'labege', nom: 'Labège' },
    { slug: 'portet-sur-garonne', nom: 'Portet-sur-Garonne' },
    { slug: 'lunion', nom: "L'Union" },
    { slug: 'fenouillet', nom: 'Fenouillet' },
    { slug: 'launaguet', nom: 'Launaguet' },
    { slug: 'castelginest', nom: 'Castelginest' },
    { slug: 'aucamville', nom: 'Aucamville' },
  ];

  // Schema JSON-LD Service
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Expert Fissures et Humidité',
    provider: {
      '@type': 'LocalBusiness',
      name: 'IPB - Expert Fissures & Humidité Haute-Garonne',
      telephone: '+33582953375',
      email: 'contact@ipb-expertise.fr',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Toulouse',
        addressRegion: 'Haute-Garonne',
        postalCode: '31000',
        addressCountry: 'FR',
      },
      areaServed: {
        '@type': 'State',
        name: 'Haute-Garonne',
        containsPlace: villesPrincipales.map(v => ({
          '@type': 'City',
          name: v.nom,
        })),
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '14',
      },
    },
    description: 'Expert n°1 en traitement des fissures et de l\'humidité en Haute-Garonne (31). Basé à Toulouse.',
  };

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Pourquoi les maisons de Haute-Garonne sont-elles sujettes aux fissures ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La Haute-Garonne possède un sol majoritairement argileux, particulièrement autour de Toulouse. Ce sol se rétracte en période de sécheresse et gonfle lors des pluies, provoquant des mouvements de terrain qui fissurent les fondations. Les étés 2022-2023 ont été particulièrement dévastateurs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quel est le coût moyen d\'un traitement de fissures à Toulouse ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'L\'agrafage de fissures coûte entre 8 000€ et 18 000€ pour une façade standard à Toulouse. C\'est 3 fois moins cher que les micropieux (25 000€ à 60 000€) et tout aussi efficace pour 90% des cas. Le diagnostic IPB est gratuit et sans engagement.',
        },
      },
      {
        '@type': 'Question',
        name: 'Intervenez-vous rapidement en Haute-Garonne ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, notre siège est à Toulouse. Nous intervenons sous 48-72h pour un diagnostic gratuit dans toute la Haute-Garonne : Toulouse et sa couronne (Colomiers, Blagnac, Muret, Tournefeuille), jusqu\'aux communes plus éloignées.',
        },
      },
      {
        '@type': 'Question',
        name: 'Les travaux sont-ils garantis ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tous nos travaux sont couverts par une garantie décennale de 10 ans. Nous sommes assurés par une compagnie française de premier plan. Vous recevez une attestation d\'assurance avec votre devis.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans antialiased">
        <TopBar />
        <Navbar />

        {/* Hero Section - Orange theme pour Haute-Garonne */}
        <div className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-red-700 text-white py-20 lg:py-28">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-[url('/images/pattern-dots.svg')] opacity-5"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: 'Accueil', href: '/' },
                { label: 'Départements', href: '#' },
                { label: 'Haute-Garonne (31)', href: '/departements/haute-garonne' },
              ]}
            />

            <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-bold mb-6">
                  <MapPin size={16} />
                  Notre zone principale
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                  Expert Fissures & Humidité<br />
                  <span className="text-orange-200">Haute-Garonne (31)</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-orange-50 mb-8 max-w-2xl">
                  Basés à <strong>Toulouse</strong>, nous intervenons dans toute la Haute-Garonne pour traiter vos fissures et problèmes d'humidité.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/diagnostic"
                    className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all shadow-xl"
                  >
                    Diagnostic gratuit
                    <ArrowRight size={20} />
                  </Link>
                  <a
                    href="tel:0582953375"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
                  >
                    <Phone size={20} />
                    05 82 95 33 75
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-extrabold text-white mb-2">500+</div>
                  <div className="text-orange-100">Maisons traitées en 31</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-extrabold text-white mb-2">4.9★</div>
                  <div className="text-orange-100">Note Google</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-extrabold text-white mb-2">48h</div>
                  <div className="text-orange-100">Délai intervention</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-extrabold text-white mb-2">10 ans</div>
                  <div className="text-orange-100">Garantie décennale</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spécificités Haute-Garonne */}
        <div className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Pourquoi la Haute-Garonne est touchée ?
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Le département 31 cumule plusieurs facteurs de risque pour les fissures et l'humidité.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border border-orange-200">
                <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Sol argileux omniprésent</h3>
                <p className="text-slate-600">
                  90% du territoire toulousain repose sur des argiles gonflantes. En été, le sol se rétracte de 10-15 cm, créant des vides sous les fondations.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl border border-red-200">
                <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Sécheresses répétées</h3>
                <p className="text-slate-600">
                  Depuis 2019, la Haute-Garonne a connu 4 années de sécheresse exceptionnelle. Des milliers de maisons ont développé des fissures structurelles.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Maisons années 70-90</h3>
                <p className="text-slate-600">
                  La grande majorité des pavillons toulousains date de cette période, construits avec des fondations peu profondes, avant les normes actuelles.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Villes principales */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Nos interventions en Haute-Garonne
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-3xl">
            Basés à Toulouse, nous intervenons dans un rayon de 50 km pour tous vos problèmes de fissures et d'humidité.
          </p>

          <h3 className="text-xl font-bold text-slate-800 mb-6">Villes principales</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {villesPrincipales.map((ville) => (
              <Link
                key={ville.slug}
                href={`/villes/${ville.slug}`}
                className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-slate-100 hover:border-orange-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {ville.nom}
                    </h4>
                    <p className="text-sm text-slate-500">{ville.habitants} hab. • {ville.zone}</p>
                  </div>
                  <ArrowRight size={20} className="text-slate-400 group-hover:text-orange-600 transition-colors" />
                </div>
                
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    Diagnostic gratuit
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    Intervention 48h
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                  <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded font-medium">
                    Fissures
                  </span>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-medium">
                    Humidité
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-6">Autres communes desservies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {villesSecondaires.map((ville) => (
              <Link
                key={ville.slug}
                href={`/villes/${ville.slug}`}
                className="text-sm text-slate-600 hover:text-orange-600 transition-colors p-3 bg-slate-50 rounded-lg hover:bg-orange-50"
              >
                {ville.nom}
              </Link>
            ))}
          </div>
        </div>

        {/* Avantages */}
        <div className="bg-slate-900 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Pourquoi choisir IPB en Haute-Garonne ?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MapPin size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Basés à Toulouse</h3>
                <p className="text-slate-400">
                  Notre siège est à Toulouse. Nous connaissons parfaitement les sols, le climat et les constructions locales.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Intervention rapide</h3>
                <p className="text-slate-400">
                  Diagnostic sous 48-72h dans toute la Haute-Garonne. Pas d'attente, pas de déplacement facturé.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Garantie décennale</h3>
                <p className="text-slate-400">
                  10 ans de garantie sur tous nos travaux. Attestation d'assurance fournie avec chaque devis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">
              Questions fréquentes - Haute-Garonne
            </h2>

            <div className="space-y-6">
              {faqSchema.mainEntity.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {faq.name}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-br from-orange-600 to-red-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Fissures ou humidité en Haute-Garonne ?
            </h2>
            <p className="text-xl text-orange-50 mb-8">
              Diagnostic gratuit sous 48h • Devis détaillé • Garantie décennale
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all shadow-xl"
              >
                Faire mon diagnostic gratuit
                <ArrowRight size={20} />
              </Link>
              <a
                href="tel:0582953375"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                <Phone size={20} />
                05 82 95 33 75
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
