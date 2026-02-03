import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CheckCircle, Phone, ArrowRight, MapPin, AlertTriangle, Shield, FileText, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Expert Fissures Montauban (82) | Diagnostic Indépendant | IPB Expertise',
  description: 'Expert fissures maison à Montauban et Tarn-et-Garonne. Diagnostic 48h, agrafage garanti 10 ans. Devis gratuit →',
  keywords: ['expert fissures montauban', 'fissures maison 82', 'diagnostic fissures tarn-et-garonne', 'expert bâtiment montauban'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/expert-fissures-montauban-82',
  },
  openGraph: {
    title: 'Expert Fissures Montauban (82) | IPB Expertise',
    description: 'Expert indépendant en fissures à Montauban. Diagnostic complet sous 48h.',
    url: 'https://www.ipb-expertise.fr/expert-fissures-montauban-82',
  },
};

const communesTarnEtGaronne = [
  'Montauban', 'Castelsarrasin', 'Moissac', 'Caussade', 'Montech', 
  'Valence d\'Agen', 'Beaumont-de-Lomagne', 'Grisolles', 'Labastide-Saint-Pierre',
  'Nègrepelisse', 'Verdun-sur-Garonne', 'Lafrançaise'
];

const faqItems = [
  {
    question: "Intervenez-vous sur tout le Tarn-et-Garonne ?",
    answer: "Oui, nous couvrons l'intégralité du département 82 : Montauban, Castelsarrasin, Moissac, Caussade et toutes les communes environnantes. Déplacement inclus dans le diagnostic."
  },
  {
    question: "Le Tarn-et-Garonne est-il touché par les fissures ?",
    answer: "Oui, le département 82 présente des sols argileux similaires à la Haute-Garonne. De nombreuses communes ont été reconnues en catastrophe naturelle sécheresse ces dernières années."
  },
  {
    question: "Quel est le coût d'un diagnostic à Montauban ?",
    answer: "Le diagnostic coûte 149€, déductibles si vous réalisez les travaux avec nous. Il inclut le déplacement, l'analyse complète et le rapport détaillé."
  },
  {
    question: "Combien de temps pour recevoir le rapport ?",
    answer: "Vous recevez votre rapport détaillé sous 48 à 72h après la visite, avec photos, analyse et préconisations de traitement."
  },
  {
    question: "Proposez-vous des facilités de paiement ?",
    answer: "Oui, nous proposons des facilités de paiement en 3 ou 4 fois sans frais pour les travaux supérieurs à 3000€."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "IPB - Expert Fissures Montauban",
  "description": "Expert indépendant en diagnostic et traitement des fissures à Montauban et Tarn-et-Garonne",
  "url": "https://www.ipb-expertise.fr/expert-fissures-montauban-82",
  "telephone": "+33582953375",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Montauban",
    "addressRegion": "Tarn-et-Garonne",
    "postalCode": "82000",
    "addressCountry": "FR"
  },
  "areaServed": {
    "@type": "State",
    "name": "Tarn-et-Garonne"
  }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
};

export default function ExpertFissuresMontauban82Page() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="local-business-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      
      <TopBar />
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-orange-400 text-sm font-bold mb-4">
              <MapPin size={18} />
              <span>Montauban & Tarn-et-Garonne (82)</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Expert Fissures à <span className="text-orange-400">Montauban</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl">
              Votre maison présente des fissures ? Expert indépendant intervenant sur tout le Tarn-et-Garonne. 
              Diagnostic complet sous 48h, solutions durables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
                Diagnostic gratuit <ArrowRight size={20} />
              </Link>
              <a href="tel:0582953375" className="bg-white/10 border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
                <Phone size={20} /> 05 82 95 33 75
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-orange-600">234</div>
              <div className="text-slate-600 mt-1">Diagnostics en 82</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-orange-600">97%</div>
              <div className="text-slate-600 mt-1">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-orange-600">48h</div>
              <div className="text-slate-600 mt-1">Délai d'intervention</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-orange-600">10 ans</div>
              <div className="text-slate-600 mt-1">Garantie décennale</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contexte local */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                Fissures à Montauban : un problème croissant
              </h2>
              <div className="prose prose-lg text-slate-600">
                <p>
                  Le <strong>Tarn-et-Garonne</strong> connaît les mêmes problématiques que ses voisins : des sols argileux 
                  qui réagissent fortement aux variations climatiques. Les périodes de sécheresse suivies de pluies 
                  provoquent des mouvements de terrain qui fissurent les constructions.
                </p>
                <p>
                  <strong>Montauban</strong> et ses environs (Castelsarrasin, Moissac, Caussade) sont particulièrement 
                  concernés. Les maisons individuelles construites avant 2000 sont les plus vulnérables.
                </p>
              </div>
              <div className="mt-8 p-6 bg-orange-50 border-l-4 border-orange-500 rounded-r-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-slate-900">Faible concurrence = intervention rapide</h3>
                    <p className="text-slate-600 mt-1">
                      Peu d'experts interviennent sur le Tarn-et-Garonne. Nous garantissons une intervention sous 48h 
                      sur tout le département.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Communes couvertes en 82</h3>
              <div className="grid grid-cols-2 gap-3">
                {communesTarnEtGaronne.map((commune) => (
                  <div key={commune} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle size={16} className="text-orange-600" />
                    <span>{commune}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Notre intervention en 3 étapes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-2xl p-8 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-2xl font-bold">1</div>
              <Clock className="text-orange-400 mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3">Diagnostic expert</h3>
              <p className="text-slate-400">Visite sur site sous 48h. Analyse des fissures, identification des causes, rapport détaillé avec photos.</p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-8 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-2xl font-bold">2</div>
              <FileText className="text-orange-400 mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3">Devis détaillé</h3>
              <p className="text-slate-400">Solution adaptée à votre cas : agrafage, harpage ou micropieux. Devis transparent sous 72h.</p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-8 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-2xl font-bold">3</div>
              <Shield className="text-orange-400 mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3">Travaux garantis</h3>
              <p className="text-slate-400">Intervention professionnelle avec garantie décennale. Suivi post-travaux inclus.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Nos tarifs à Montauban</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Diagnostic</h3>
              <div className="text-4xl font-extrabold text-orange-600 mb-4">149€</div>
              <p className="text-slate-600">Déductible des travaux</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border-2 border-orange-500 p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Agrafage</h3>
              <div className="text-4xl font-extrabold text-orange-600 mb-4">8-15K€</div>
              <p className="text-slate-600">Garantie 10 ans</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Micropieux</h3>
              <div className="text-4xl font-extrabold text-orange-600 mb-4">25-50K€</div>
              <p className="text-slate-600">Cas complexes</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Questions fréquentes</h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 group">
                <summary className="p-6 cursor-pointer font-bold text-slate-900 flex items-center justify-between">
                  {item.question}
                  <span className="text-orange-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-slate-600">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Expert fissures à Montauban
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Diagnostic sous 48h sur tout le Tarn-et-Garonne. Devis gratuit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all flex items-center justify-center gap-2">
              Demander un diagnostic <ArrowRight size={20} />
            </Link>
            <a href="tel:0582953375" className="bg-orange-700 hover:bg-orange-800 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
              <Phone size={20} /> 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
