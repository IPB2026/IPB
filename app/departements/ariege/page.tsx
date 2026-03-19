import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MapPin, CheckCircle, ArrowRight, Mountain, Shield } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';

export const metadata: Metadata = {
  title: 'Expert Fissures & Humidité Ariège (09) | Foix, Pamiers, Saint-Girons | IPB',
  description: 'Expert en traitement des fissures et humidité en Ariège (09). Intervention à Foix, Pamiers, Saint-Girons, Lavelanet. Maisons de montagne, bâti ancien pyrénéen. Diagnostic gratuit, garantie décennale.',
  keywords: [
    'expert fissures ariège',
    'expert fissures foix',
    'traitement humidité 09',
    'fissures maison pamiers',
    'humidité murs ariège',
    'agrafage fissures ariège',
    'maison pyrénées fissures',
    'diagnostic fissures gratuit ariège',
    'expertise fissure ariège',
  ],
  openGraph: {
    title: 'Expert Fissures & Humidité Ariège (09) | IPB',
    description: 'Intervention à Foix, Pamiers, Saint-Girons. Spécialiste bâti pyrénéen. Diagnostic gratuit.',
    url: 'https://www.ipb-expertise.fr/departements/ariege',
    siteName: 'IPB - Expert Fissures & Humidité',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/IPB_Logo_HD.png',
        width: 1200,
        height: 630,
        alt: 'Expert Fissures Ariège Foix Pamiers IPB',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/departements/ariege',
  },
};

export default function AriegePage() {
  const villes = [
    { nom: 'Foix', habitants: '10 000', description: 'Préfecture de l\'Ariège' },
    { nom: 'Pamiers', habitants: '16 000', description: 'Plus grande ville du département' },
    { nom: 'Saint-Girons', habitants: '6 500', description: 'Couserans' },
    { nom: 'Lavelanet', habitants: '6 000', description: 'Pays d\'Olmes' },
    { nom: 'Saverdun', habitants: '4 500', description: 'Basse Ariège' },
    { nom: 'Mazères', habitants: '3 500', description: 'Proche Haute-Garonne' },
  ];

  // Schema JSON-LD
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Expert Fissures et Humidité',
    provider: {
      '@type': 'LocalBusiness',
      name: 'IPB - Expert Fissures & Humidité Ariège',
      telephone: '+33582953375',
      email: 'contact@ipb-expertise.fr',
      areaServed: {
        '@type': 'State',
        name: 'Ariège',
        containsPlace: villes.map(v => ({
          '@type': 'City',
          name: v.nom,
        })),
      },
    },
    description: 'Expert en traitement des fissures et de l\'humidité en Ariège (09). Spécialiste du bâti pyrénéen.',
  };

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Intervenez-vous dans tout l\'Ariège ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, IPB intervient dans tout le département de l\'Ariège (09). Nous nous déplaçons à Foix, Pamiers, Saint-Girons, Lavelanet, et dans toutes les vallées pyrénéennes. Le diagnostic est gratuit et sans engagement.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quels problèmes de fissures sont spécifiques à l\'Ariège ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'L\'Ariège présente des défis uniques : terrain montagneux avec pentes, bâti ancien en pierre, variations thermiques importantes entre été et hiver. Les maisons pyrénéennes souffrent souvent de fissures liées aux mouvements de terrain et au gel/dégel.',
        },
      },
      {
        '@type': 'Question',
        name: 'L\'humidité est-elle un problème courant en Ariège ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, particulièrement dans les maisons anciennes et en fond de vallée. Le climat humide des Pyrénées, combiné aux murs en pierre épais, favorise les remontées capillaires et la condensation. Nos traitements par injection sont adaptés au bâti local.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quel est le délai d\'intervention en Ariège ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nous intervenons généralement sous 3 à 5 jours ouvrés en Ariège. Pour les urgences (fissures évolutives, infiltrations importantes), nous pouvons accélérer le déplacement. Le diagnostic reste gratuit même pour les communes éloignées.',
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

        {/* Hero Section - Vert montagne pour l'Ariège */}
        <div className="relative bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 text-white py-20 lg:py-28">
          <div className="absolute inset-0 bg-black/10"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: 'Accueil', href: '/' },
                { label: 'Départements', href: '/departements' },
                { label: 'Ariège (09)', href: '/departements/ariege' },
              ]}
            />

            <div className="mt-8">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Mountain size={16} />
                Pyrénées ariégeoises
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Expert Fissures & Humidité<br />
                <span className="text-emerald-200">Ariège (09)</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-emerald-50 mb-8 max-w-3xl">
                Spécialiste du bâti pyrénéen. Intervention à <strong>Foix</strong>, <strong>Pamiers</strong>, <strong>Saint-Girons</strong> et dans toutes les vallées de l'Ariège.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/diagnostic"
                  className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl"
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
          </div>
        </div>

        {/* Spécificités Ariège */}
        <div className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Les défis du bâti ariégeois
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                L'Ariège présente des caractéristiques uniques qui nécessitent une expertise spécifique.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl border border-emerald-200">
                <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <Mountain size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Terrain montagneux</h3>
                <p className="text-slate-600">
                  Pentes, terrains instables, ruissellements. Les fondations des maisons ariégeoises subissent des contraintes spécifiques liées au relief pyrénéen.
                </p>
              </div>

              <div className="bg-gradient-to-br from-stone-50 to-stone-100 p-8 rounded-2xl border border-stone-200">
                <div className="w-14 h-14 bg-stone-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Bâti ancien en pierre</h3>
                <p className="text-slate-600">
                  Maisons traditionnelles pyrénéennes, fermes anciennes, granges reconverties. Ce patrimoine demande des techniques adaptées pour traiter fissures et humidité.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Climat humide</h3>
                <p className="text-slate-600">
                  Précipitations importantes, fonte des neiges, nappes phréatiques élevées. L'humidité est un problème récurrent dans les maisons ariégeoises.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Villes Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Nos interventions en Ariège
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-3xl">
            IPB intervient dans toutes les communes du département, de la plaine aux vallées pyrénéennes.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {villes.map((ville, index) => (
              <div
                key={index}
                className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-slate-100 hover:border-emerald-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {ville.nom}
                    </h3>
                    <p className="text-sm text-slate-500">{ville.habitants} hab. • {ville.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    Diagnostic gratuit
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    Expertise bâti ancien
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
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="text-emerald-800">
              <strong>📍 Zones d'intervention :</strong> Nous couvrons l'ensemble de l'Ariège : vallée de l'Ariège, Couserans, Pays d'Olmes, basse Ariège. Même les communes les plus reculées bénéficient d'un diagnostic gratuit.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">
              Questions fréquentes - Ariège
            </h2>

            <div className="space-y-6">
              {faqSchema.mainEntity.map((faq, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-xl border border-slate-100">
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
        <div className="bg-gradient-to-br from-emerald-700 to-teal-800 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Besoin d'un expert en Ariège ?
            </h2>
            <p className="text-xl text-emerald-50 mb-8">
              Diagnostic gratuit • Spécialiste bâti pyrénéen • Garantie décennale
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl"
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
