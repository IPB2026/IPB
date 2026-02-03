import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Award, GraduationCap, Shield, MapPin, Clock, CheckCircle, Star, FileText, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Notre Expert | IPB - Institut de Pathologie du Bâtiment',
  description: 'Découvrez l\'équipe IPB : experts certifiés en pathologie du bâtiment, fissures et humidité. 15+ ans d\'expérience, 800+ diagnostics réalisés. Toulouse et Occitanie.',
  keywords: ['expert bâtiment toulouse', 'expert fissures', 'expert humidité', 'IPB', 'pathologie bâtiment'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/notre-expert',
  },
};

const certifications = [
  { name: 'Expert en Pathologie du Bâtiment', organisme: 'Formation certifiante' },
  { name: 'Diagnostic Humidité', organisme: 'AFNOR' },
  { name: 'Traitement des Fissures Structurelles', organisme: 'Formation continue' },
  { name: 'Garantie Décennale', organisme: 'Assurance professionnelle' },
];

const chiffres = [
  { value: '15+', label: 'Années d\'expérience' },
  { value: '847', label: 'Diagnostics réalisés' },
  { value: '98%', label: 'Clients satisfaits' },
  { value: '4.9/5', label: 'Avis Google' },
];

const specialites = [
  { icon: '🏠', title: 'Fissures structurelles', description: 'Diagnostic, agrafage, harpage, reprise en sous-œuvre' },
  { icon: '💧', title: 'Problèmes d\'humidité', description: 'Remontées capillaires, infiltrations, condensation' },
  { icon: '📋', title: 'Expertise assurance', description: 'Dossiers CAT-NAT sécheresse, contre-expertises' },
  { icon: '🔍', title: 'Expertise avant achat', description: 'Détection de vices cachés immobiliers' },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Expert IPB",
  "jobTitle": "Expert en Pathologie du Bâtiment",
  "worksFor": {
    "@type": "Organization",
    "name": "IPB - Institut de Pathologie du Bâtiment",
    "url": "https://www.ipb-expertise.fr"
  },
  "knowsAbout": [
    "Fissures structurelles",
    "Agrafage",
    "Humidité",
    "Remontées capillaires",
    "Expertise bâtiment"
  ],
  "areaServed": {
    "@type": "State",
    "name": "Occitanie"
  }
};

export default function NotreExpertPage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="person-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative bg-slate-900 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-orange-400 text-sm font-bold mb-4">
                <Award size={18} />
                <span>E-E-A-T : Expérience, Expertise, Autorité, Confiance</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                L'Expertise au Service de Votre Patrimoine
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Depuis plus de 15 ans, IPB accompagne les propriétaires de Toulouse et d'Occitanie 
                dans le diagnostic et le traitement des pathologies du bâtiment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostic" className="bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                  Prendre RDV <Clock size={18} />
                </Link>
                <Link href="/contact" className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                  Nous contacter
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    IPB
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Institut de Pathologie du Bâtiment</h2>
                    <p className="text-slate-400">Expert certifié • Toulouse</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {chiffres.map((chiffre, index) => (
                    <div key={index} className="bg-slate-900 rounded-xl p-4 text-center">
                      <div className="text-2xl font-extrabold text-orange-400">{chiffre.value}</div>
                      <div className="text-sm text-slate-400">{chiffre.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres mobile */}
      <section className="lg:hidden py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {chiffres.map((chiffre, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-extrabold text-orange-600">{chiffre.value}</div>
                <div className="text-sm text-slate-600">{chiffre.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre histoire / Experience */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                Notre Expérience sur le Terrain
              </h2>
              <div className="prose prose-lg text-slate-600">
                <p>
                  L'<strong>Institut de Pathologie du Bâtiment</strong> est né d'un constat simple : 
                  les propriétaires confrontés à des fissures ou de l'humidité manquent d'interlocuteurs 
                  indépendants et compétents.
                </p>
                <p>
                  Trop souvent, le diagnostic est réalisé par l'entreprise qui va vendre les travaux, 
                  créant un conflit d'intérêt évident. Chez IPB, <strong>nous ne vendons pas de travaux</strong> : 
                  nous vous fournissons un diagnostic objectif et vous accompagnons dans vos choix.
                </p>
                <p>
                  Nos experts ont traité des centaines de cas en Haute-Garonne, Tarn-et-Garonne et Gers. 
                  Cette expérience de terrain nous permet de <strong>diagnostiquer rapidement et précisément</strong> 
                  l'origine de vos problèmes.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin className="text-orange-600" size={20} />
                  Zone d'intervention
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Haute-Garonne (31) - Zone principale</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Tarn-et-Garonne (82)</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Gers (32)</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Ariège (09)</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="text-orange-600" size={20} />
                  Notre engagement
                </h3>
                <ul className="space-y-2 text-slate-700">
                  <li>✅ Diagnostic indépendant et objectif</li>
                  <li>✅ Rapport détaillé sous 72h</li>
                  <li>✅ Accompagnement personnalisé</li>
                  <li>✅ Transparence sur les prix</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications / Expertise */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-4">Nos Certifications & Garanties</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              IPB investit dans la formation continue pour vous offrir une expertise de pointe.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-slate-800 rounded-xl p-6 text-center">
                <GraduationCap className="mx-auto text-orange-400 mb-4" size={40} />
                <h3 className="font-bold text-lg mb-2">{cert.name}</h3>
                <p className="text-slate-400 text-sm">{cert.organisme}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 flex items-center gap-4">
              <Shield className="text-green-400 flex-shrink-0" size={32} />
              <div>
                <h4 className="font-bold">Garantie Décennale</h4>
                <p className="text-slate-400 text-sm">Tous nos travaux sont assurés</p>
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 flex items-center gap-4">
              <Star className="text-yellow-400 flex-shrink-0" size={32} />
              <div>
                <h4 className="font-bold">4.9/5 sur Google</h4>
                <p className="text-slate-400 text-sm">Avis clients vérifiés</p>
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 flex items-center gap-4">
              <Users className="text-blue-400 flex-shrink-0" size={32} />
              <div>
                <h4 className="font-bold">800+ clients</h4>
                <p className="text-slate-400 text-sm">Nous ont fait confiance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spécialités / Authoritativeness */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Nos Domaines d'Expertise</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              IPB est spécialisé dans les pathologies structurelles et les problèmes d'humidité.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialites.map((spec, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:border-orange-200 transition-all">
                <div className="text-4xl mb-4">{spec.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{spec.title}</h3>
                <p className="text-slate-600 text-sm">{spec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Confiance / Trustworthiness */}
      <section className="py-16 md:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Transparence & Confiance</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-bold text-slate-900 mb-4">📋 Mentions Légales</h3>
              <p className="text-slate-600 mb-4">
                Toutes nos informations légales sont accessibles et conformes à la réglementation.
              </p>
              <Link href="/legal/mentions-legales" className="text-orange-600 font-bold hover:underline">
                Consulter →
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-bold text-slate-900 mb-4">💰 Prix Affichés</h3>
              <p className="text-slate-600 mb-4">
                Nos tarifs sont transparents : diagnostic 149€, agrafage 8-15K€, injection 2-5K€.
              </p>
              <Link href="/diagnostic" className="text-orange-600 font-bold hover:underline">
                Voir les tarifs →
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-bold text-slate-900 mb-4">⭐ Avis Clients</h3>
              <p className="text-slate-600 mb-4">
                4.9/5 sur Google avec des avis authentiques de nos clients.
              </p>
              <a href="https://maps.app.goo.gl/6yDtzs7D1UcKSdJf6" target="_blank" rel="noopener noreferrer" className="text-orange-600 font-bold hover:underline">
                Voir les avis →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Besoin d'un Expert ?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Diagnostic indépendant sous 48h. 15 ans d'expérience à votre service.
          </p>
          <Link href="/diagnostic" className="inline-block bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50">
            Demander un diagnostic →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
