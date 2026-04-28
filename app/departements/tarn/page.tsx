import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { MapPin, ArrowRight, Phone, CheckCircle, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Expert Fissures et Humidité Tarn (81) | IPB Expertise',
  description: 'Expert en fissures et humidité dans le Tarn (81). Intervention Albi, Castres, Gaillac. Diagnostic sous 48h.',
  keywords: ['expert fissures tarn', 'expert humidité 81', 'fissures albi', 'humidité castres'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/departements/tarn',
  },
};

const villesTarn = [
  { nom: 'Albi', cp: '81000', population: '50000', distance: '75 km' },
  { nom: 'Castres', cp: '81100', population: '42000', distance: '80 km' },
  { nom: 'Gaillac', cp: '81600', population: '16000', distance: '60 km' },
  { nom: 'Mazamet', cp: '81200', population: '10000', distance: '95 km' },
  { nom: 'Graulhet', cp: '81300', population: '12000', distance: '65 km' },
  { nom: 'Lavaur', cp: '81500', population: '11000', distance: '45 km' },
  { nom: 'Carmaux', cp: '81400', population: '10000', distance: '85 km' },
  { nom: 'Saint-Sulpice-la-Pointe', cp: '81370', population: '9000', distance: '35 km' },
];

const problemesRegion = [
  {
    titre: "Sols argileux du Lauragais",
    description: "L'ouest du département, proche de Toulouse, présente des sols argileux très sensibles au retrait-gonflement.",
    icon: "🏜️"
  },
  {
    titre: "Maisons en brique",
    description: "Le bâti traditionnel en brique foraine est sensible aux mouvements de terrain et aux infiltrations.",
    icon: "🧱"
  },
  {
    titre: "Climat contrasté",
    description: "Entre influences atlantiques et méditerranéennes, le Tarn connaît des alternances de sécheresse et de pluies intenses.",
    icon: "🌤️"
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "IPB Expertise - Tarn",
  "description": "Expert en diagnostic fissures et humidité dans le Tarn",
  "url": "https://www.ipb-expertise.fr/departements/tarn",
  "telephone": "+33582953375",
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Tarn"
  }
};

export default function TarnPage() {
  return (
    <div className="font-sans text-ipb-text bg-ipb-cream antialiased">
      <Script id="jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 to-rose-950 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-rose-400 text-sm font-bold mb-4">
              <MapPin size={18} />
              <span>Département du Tarn (81)</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Expert Fissures & Humidité <br/>
              <span className="text-rose-400">dans le Tarn</span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl">
              D'Albi à Castres, en passant par Gaillac et Lavaur, nous intervenons 
              dans tout le département du Tarn pour diagnostiquer vos problèmes de bâti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="bg-rose-500 hover:bg-rose-400 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
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
              <div className="text-4xl font-extrabold text-rose-600">319</div>
              <div className="text-ipb-muted mt-1">Communes</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-rose-600">390K</div>
              <div className="text-ipb-muted mt-1">Habitants</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-rose-600">120+</div>
              <div className="text-ipb-muted mt-1">Arrêtés CAT-NAT</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-rose-600">48h</div>
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
              Problématiques spécifiques au Tarn
            </h2>
            <p className="text-lg text-ipb-muted">
              Un département aux paysages variés, avec des défis différents selon les zones
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
              Villes d'intervention dans le Tarn
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {villesTarn.map((ville) => (
              <Link
                key={ville.nom}
                href={`/expert-fissures/${ville.nom.toLowerCase().replace(/['\s-]/g, '-')}`}
                className="bg-white rounded-xl p-5 shadow-sm border border-ipb-rule hover:border-rose-300 hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-ipb-text group-hover:text-rose-600">{ville.nom}</h3>
                  <span className="text-xs bg-ipb-stone text-ipb-muted px-2 py-1 rounded">{ville.cp}</span>
                </div>
                <div className="text-sm text-ipb-muted">
                  <span>{ville.population} hab.</span>
                  <span className="mx-2">•</span>
                  <span>à {ville.distance}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-ipb-muted">
              + toutes les communes du Tarn • Intervention rapide garantie
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-ipb-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Nos services dans le Tarn</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-ipb-navy-2 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-rose-400 mb-4">🔍 Expertise Fissures</h3>
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
      <section className="py-12 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-amber-500 flex-shrink-0" size={28} />
            <div>
              <h3 className="font-bold text-amber-900 text-xl mb-2">Proximité toulousaine</h3>
              <p className="text-amber-800">
                Les communes tarnaises proches de Toulouse (Lavaur, Saint-Sulpice, Gaillac) bénéficient 
                d'une <strong>intervention rapide</strong>. Nous connaissons bien les spécificités 
                du bâti de cette région frontalière entre Haute-Garonne et Tarn.
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
            <Link href="/departements/haute-garonne" className="bg-ipb-stone hover:bg-rose-100 px-6 py-3 rounded-xl font-medium text-ipb-text hover:text-rose-700 transition-all">
              Haute-Garonne (31)
            </Link>
            <Link href="/departements/tarn-et-garonne" className="bg-ipb-stone hover:bg-rose-100 px-6 py-3 rounded-xl font-medium text-ipb-text hover:text-rose-700 transition-all">
              Tarn-et-Garonne (82)
            </Link>
            <Link href="/departements/aude" className="bg-ipb-stone hover:bg-rose-100 px-6 py-3 rounded-xl font-medium text-ipb-text hover:text-rose-700 transition-all">
              Aude (11)
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-rose-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Besoin d'un expert dans le Tarn ?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Diagnostic sous 48h dans tout le département. Devis gratuit et sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-ipb-navy text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-ipb-navy-2 flex items-center justify-center gap-2">
              Demander un diagnostic <ArrowRight size={20} />
            </Link>
            <a href="tel:0582953375" className="bg-white text-rose-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-rose-100 flex items-center justify-center gap-2">
              <Phone size={20} /> 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
