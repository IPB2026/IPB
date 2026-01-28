import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Expert Fissures & Humidité Tarn-et-Garonne (82) | Montauban, Moissac | IPB',
  description: 'Expert reconnu en traitement des fissures et humidité dans le Tarn-et-Garonne (82). Intervention rapide à Montauban, Castelsarrasin, Moissac, Caussade. Diagnostic gratuit, garantie décennale.',
  keywords: [
    'expert fissures tarn-et-garonne',
    'traitement humidité 82',
    'expert fissures montauban',
    'humidité montauban',
    'expert bâtiment tarn-et-garonne',
    'agrafage fissures 82',
    'injection résine montauban',
    'diagnostic fissures gratuit 82',
  ],
  openGraph: {
    title: 'Expert Fissures & Humidité Tarn-et-Garonne (82) | IPB',
    description: 'Intervention rapide à Montauban, Castelsarrasin, Moissac, Caussade. Diagnostic gratuit.',
    url: 'https://www.ipb-expertise.fr/departements/tarn-et-garonne',
    siteName: 'IPB - Expert Fissures & Humidité',
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/departements/tarn-et-garonne',
  },
};

export default function TarnEtGaronnePage() {
  const villes = [
    { slug: 'montauban', nom: 'Montauban', habitants: '60 000' },
    { slug: 'castelsarrasin', nom: 'Castelsarrasin', habitants: '14 000' },
    { slug: 'moissac', nom: 'Moissac', habitants: '12 000' },
    { slug: 'caussade', nom: 'Caussade', habitants: '7 000' },
    { slug: 'valence', nom: 'Valence', habitants: '5 000' },
  ];

  // Schema JSON-LD
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Expert Fissures et Humidité',
    provider: {
      '@type': 'LocalBusiness',
      name: 'IPB - Expert Fissures & Humidité Tarn-et-Garonne',
      telephone: '+33582953375',
      email: 'contact@ipb-expertise.fr',
      areaServed: {
        '@type': 'State',
        name: 'Tarn-et-Garonne',
        containsPlace: villes.map(v => ({
          '@type': 'City',
          name: v.nom,
        })),
      },
    },
    description: 'Expert en traitement des fissures et de l\'humidité dans le Tarn-et-Garonne (82)',
  };

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Intervenez-vous dans tout le Tarn-et-Garonne ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, IPB intervient dans tout le département du Tarn-et-Garonne (82), notamment à Montauban, Castelsarrasin, Moissac, Caussade et Valence. Nous nous déplaçons rapidement pour diagnostiquer et traiter vos problèmes de fissures et d\'humidité.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quels sont les problèmes de fissures les plus fréquents dans le Tarn-et-Garonne ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dans le Tarn-et-Garonne, les fissures sont principalement causées par les sols argileux, particulièrement à Montauban et dans les communes proches de la Garonne. Les sécheresses répétées provoquent des tassements différentiels. L\'agrafage structurel est souvent la solution la plus adaptée.',
        },
      },
      {
        '@type': 'Question',
        name: 'Pourquoi l\'humidité est-elle un problème récurrent à Montauban ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Montauban et sa région sont proches de la Garonne et du Tarn, avec un taux d\'humidité naturellement élevé. Les maisons anciennes en brique rose, typiques de la région, sont particulièrement sensibles aux remontées capillaires et à l\'humidité ascensionnelle.',
        },
      },
      {
        '@type': 'Question',
        name: 'Combien coûte une intervention dans le Tarn-et-Garonne ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le diagnostic est gratuit. Pour l\'agrafage de fissures, comptez entre 3 000€ et 8 000€ selon l\'ampleur. Pour le traitement de l\'humidité par injection, entre 2 000€ et 5 000€. Nos tarifs sont transparents et nous proposons des devis détaillés avant toute intervention.',
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

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white py-20">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: 'Accueil', href: '/' },
                { label: 'Départements', href: '/departements' },
                { label: 'Tarn-et-Garonne (82)', href: '/departements/tarn-et-garonne' },
              ]}
              theme="dark"
            />

            <div className="mt-8">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <MapPin size={16} />
                Tarn-et-Garonne (82)
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Expert Fissures & Humidité<br />
                dans le <span className="text-orange-200">Tarn-et-Garonne</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-orange-50 mb-8 max-w-3xl">
                Intervention rapide à <strong>Montauban</strong>, <strong>Castelsarrasin</strong>, <strong>Moissac</strong>, <strong>Caussade</strong> et dans tout le département.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/diagnostic"
                  className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-all shadow-lg"
                >
                  Diagnostic gratuit
                  <ArrowRight size={20} />
                </Link>
                <a
                  href="tel:0582953375"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all"
                >
                  <Phone size={20} />
                  05 82 95 33 75
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Villes Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Nos interventions dans le Tarn-et-Garonne
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-3xl">
            IPB intervient dans toutes les communes du département pour le traitement des fissures structurelles et de l'humidité.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {villes.map((ville) => (
              <Link
                key={ville.slug}
                href={`/villes/${ville.slug}`}
                className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-slate-100 hover:border-orange-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {ville.nom}
                    </h3>
                    <p className="text-sm text-slate-500">{ville.habitants} habitants</p>
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
                    Intervention rapide
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
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">
              Questions fréquentes - Tarn-et-Garonne
            </h2>

            <div className="space-y-6">
              {faqSchema.mainEntity.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
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
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Besoin d'un expert dans le Tarn-et-Garonne ?
            </h2>
            <p className="text-xl text-orange-50 mb-8">
              Diagnostic gratuit • Intervention rapide • Garantie décennale
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-all shadow-lg"
              >
                Faire mon diagnostic
                <ArrowRight size={20} />
              </Link>
              <a
                href="tel:0582953375"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all"
              >
                <Phone size={20} />
                05 82 95 33 75
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
