import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { MapPin, ArrowRight, Phone, CheckCircle, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Expert Fissures et Humidité Aude (11) | IPB Expertise',
  description: 'Expert en fissures et humidité dans l\'Aude (11). Intervention Carcassonne, Narbonne, Castelnaudary, Limoux. Diagnostic sous 48h.',
  keywords: ['expert fissures aude', 'expert humidité 11', 'fissures carcassonne', 'humidité narbonne'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/departements/aude',
  },
};

const villesAude = [
  { nom: 'Carcassonne', cp: '11000', population: '46000', distance: '95 km' },
  { nom: 'Narbonne', cp: '11100', population: '55000', distance: '130 km' },
  { nom: 'Castelnaudary', cp: '11400', population: '12000', distance: '60 km' },
  { nom: 'Limoux', cp: '11300', population: '10000', distance: '100 km' },
  { nom: 'Lézignan-Corbières', cp: '11200', population: '11000', distance: '110 km' },
  { nom: 'Coursan', cp: '11110', population: '6000', distance: '125 km' },
  { nom: 'Trèbes', cp: '11800', population: '6000', distance: '100 km' },
  { nom: 'Sigean', cp: '11130', population: '5500', distance: '140 km' },
];

const problemesRegion = [
  {
    titre: "Fissures sécheresse",
    description: "L'Aude est un département fortement touché par le retrait-gonflement des argiles. Les épisodes de sécheresse créent de nombreuses fissures.",
    icon: "🏜️"
  },
  {
    titre: "Humidité Méditerranéenne",
    description: "Le climat méditerranéen alterne sécheresse et épisodes cévenols violents, causant infiltrations et remontées capillaires.",
    icon: "🌧️"
  },
  {
    titre: "Bâti ancien",
    description: "De nombreuses maisons en pierre calcaire, sensibles aux remontées capillaires et aux fissures structurelles.",
    icon: "🏠"
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "IPB Expertise - Aude",
  "description": "Expert en diagnostic fissures et humidité dans l'Aude",
  "url": "https://www.ipb-expertise.fr/departements/aude",
  "telephone": "+33582953375",
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Aude"
  },
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "Aude",
    "addressCountry": "FR"
  }
};

export default function AudePage() {
  return (
    <div className="font-sans text-ipb-text bg-ipb-cream antialiased">
      <Script id="jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <TopBar />
      <Navbar />
      <SmartBackBar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 to-amber-950 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold mb-4">
              <MapPin size={18} />
              <span>Département de l'Aude (11)</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Expert Fissures & Humidité <br/>
              <span className="text-amber-400">dans l'Aude</span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl">
              De Carcassonne à Narbonne, nous intervenons dans tout le département de l'Aude 
              pour diagnostiquer et traiter vos problèmes de fissures et d'humidité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="bg-amber-500 hover:bg-amber-400 text-ipb-text px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                Diagnostic gratuit <ArrowRight size={20} />
              </Link>
              <a href="tel:0582953375" className="bg-white/10 border border-white/20 hover:bg-white/20 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                <Phone size={20} /> 05 82 95 33 75
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats département */}
      <section className="py-12 bg-white border-b border-ipb-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-amber-600">438</div>
              <div className="text-ipb-muted mt-1">Communes</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-amber-600">375K</div>
              <div className="text-ipb-muted mt-1">Habitants</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-amber-600">150+</div>
              <div className="text-ipb-muted mt-1">Arrêtés CAT-NAT</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-amber-600">48h</div>
              <div className="text-ipb-muted mt-1">Délai intervention</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problématiques régionales */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-4">
              Problématiques spécifiques à l'Aude
            </h2>
            <p className="text-lg text-ipb-muted">
              Un département entre Méditerranée et Montagne Noire, avec des défis uniques
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {problemesRegion.map((probleme, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-ipb-rule">
                <div className="text-4xl mb-4">{probleme.icon}</div>
                <h3 className="text-xl font-bold text-ipb-text mb-3">{probleme.titre}</h3>
                <p className="text-ipb-muted">{probleme.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Villes d'intervention */}
      <section className="py-16 md:py-24 bg-ipb-stone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-4">
              Villes d'intervention dans l'Aude
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {villesAude.map((ville) => (
              <div
                key={ville.nom}
                className="bg-white rounded-xl p-5 shadow-sm border border-ipb-rule"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-ipb-text">{ville.nom}</h3>
                  <span className="text-xs bg-ipb-stone text-ipb-muted px-2 py-1 rounded">{ville.cp}</span>
                </div>
                <div className="text-sm text-ipb-muted mb-3">
                  <span>{ville.population} hab.</span>
                  <span className="mx-2">•</span>
                  <span>à {ville.distance}</span>
                </div>
                <Link href="/diagnostic" className="text-xs text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-1">
                  Diagnostic gratuit <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-ipb-muted">
              + toutes les communes de l'Aude • Intervention rapide garantie
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-ipb-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Nos services dans l'Aude</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-ipb-navy-2 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-amber-400 mb-4">🔍 Expertise Fissures</h3>
              <ul className="space-y-3">
                {['Diagnostic complet des fissures', 'Analyse des causes (RGA, fondations)', 'Rapport technique détaillé', 'Accompagnement CAT-NAT', 'Préconisations de réparation'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-green-400" size={18} />
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-ipb-navy-2 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-blue-400 mb-4">💧 Expertise Humidité</h3>
              <ul className="space-y-3">
                {['Mesure d\'humidité professionnelle', 'Identification des sources', 'Diagnostic thermique', 'Solutions de traitement', 'Suivi post-intervention'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-green-400" size={18} />
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Alerte RGA */}
      <section className="py-12 bg-red-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-red-500 flex-shrink-0" size={28} />
            <div>
              <h3 className="font-bold text-red-900 text-xl mb-2">Zone à risque RGA</h3>
              <p className="text-red-800">
                L'Aude est classé <strong>département à risque élevé</strong> pour le retrait-gonflement des argiles. 
                Depuis 2018, de nombreuses communes ont été reconnues en état de catastrophe naturelle sécheresse. 
                Si votre maison présente des fissures, faites-les expertiser rapidement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Liens internes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-ipb-text mb-8 text-center">
            Départements limitrophes
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/departements/haute-garonne" className="bg-ipb-stone hover:bg-amber-100 px-6 py-3 rounded-xl font-medium text-ipb-text hover:text-amber-700 transition-all">
              Haute-Garonne (31)
            </Link>
            <Link href="/departements/ariege" className="bg-ipb-stone hover:bg-amber-100 px-6 py-3 rounded-xl font-medium text-ipb-text hover:text-amber-700 transition-all">
              Ariège (09)
            </Link>
            <Link href="/departements/tarn-et-garonne" className="bg-ipb-stone hover:bg-amber-100 px-6 py-3 rounded-xl font-medium text-ipb-text hover:text-amber-700 transition-all">
              Tarn-et-Garonne (82)
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-amber-500 text-ipb-text">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Besoin d'un expert dans l'Aude ?
          </h2>
          <p className="text-xl text-amber-900 mb-8">
            Diagnostic sous 48h dans tout le département. Devis gratuit et sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-ipb-navy text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-ipb-navy-2 flex items-center justify-center gap-2">
              Demander un diagnostic <ArrowRight size={20} />
            </Link>
            <a href="tel:0582953375" className="bg-white text-ipb-text px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-100 flex items-center justify-center gap-2">
              <Phone size={20} /> 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
