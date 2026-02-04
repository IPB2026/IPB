import { Metadata } from 'next';
import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Phone, ArrowRight, ChevronRight, Droplets, ThermometerSun, Cloud, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Condensation ou Infiltration ? Guide Diagnostic Humidité | Expert Occitanie',
  description: 'Murs humides : condensation ou infiltration ? Comment différencier, identifier la cause exacte et choisir le bon traitement. Diagnostic expert Toulouse, Montauban, Auch (31-82-32) 48h.',
  keywords: ['condensation mur', 'infiltration eau', 'diagnostic humidité', 'différence condensation infiltration'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/condensation-ou-infiltration' },
};

const comparatif = [
  {
    critere: 'Localisation',
    condensation: 'Fenêtres, angles, murs froids (nord)',
    infiltration: 'Partout, souvent en bas de mur ou plafond',
  },
  {
    critere: 'Moment',
    condensation: 'Hiver surtout, quand il fait froid dehors',
    infiltration: 'Après la pluie ou en permanence',
  },
  {
    critere: 'Aspect',
    condensation: 'Buée, gouttelettes, moisissures noires',
    infiltration: 'Taches humides, auréoles, coulures',
  },
  {
    critere: 'Toucher',
    condensation: 'Surface mouillée mais mur sec derrière',
    infiltration: 'Mur humide en profondeur',
  },
  {
    critere: 'Odeur',
    condensation: 'Moisi localisé',
    infiltration: 'Humidité généralisée, cave',
  },
];

const tests = [
  {
    nom: 'Test de la feuille alu',
    methode: 'Collez une feuille d\'alu sur le mur humide pendant 48h',
    resultat: 'Si humidité côté mur = infiltration. Si côté pièce = condensation.',
    icon: '📄',
  },
  {
    nom: 'Test météo',
    methode: 'Observez si l\'humidité augmente après la pluie',
    resultat: 'Oui = infiltration. Non (augmente quand il fait froid) = condensation.',
    icon: '🌧️',
  },
  {
    nom: 'Test saison',
    methode: 'Le problème est-il pire en hiver ?',
    resultat: 'Oui = probablement condensation. Toute l\'année = infiltration.',
    icon: '❄️',
  },
];

export default function CondensationInfiltrationPage() {
  return (
    <div className="font-sans text-slate-800 bg-white antialiased">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-purple-200 mb-8">
            <Link href="/" className="hover:text-white transition">Accueil</Link>
            <ChevronRight size={14} />
            <Link href="/expert-humidite-toulouse-31" className="hover:text-white transition">Expert Humidité</Link>
            <ChevronRight size={14} />
            <span className="text-white">Condensation ou Infiltration</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/30 text-purple-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Droplets size={16} />
              Guide de diagnostic
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]">
              Condensation
              <span className="text-purple-400"> ou </span>
              Infiltration ?
            </h1>

            <p className="text-xl text-purple-100 mb-8 leading-relaxed max-w-2xl">
              La question est cruciale car <strong className="text-white">le traitement est totalement différent</strong>. 
              Se tromper de diagnostic = perdre du temps et de l'argent. Ce guide vous aide à identifier la cause.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-500/20 border border-blue-400/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <ThermometerSun size={24} className="text-blue-400" />
                  <h3 className="font-bold text-white">Condensation</h3>
                </div>
                <p className="text-blue-200 text-sm">Air chaud + surface froide = gouttelettes</p>
                <div className="mt-3 text-xs text-blue-300">→ Solution : VMI, isolation</div>
              </div>
              <div className="bg-cyan-500/20 border border-cyan-400/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Droplets size={24} className="text-cyan-400" />
                  <h3 className="font-bold text-white">Infiltration</h3>
                </div>
                <p className="text-cyan-200 text-sm">Eau qui entre par fissure, joint, étanchéité</p>
                <div className="mt-3 text-xs text-cyan-300">→ Solution : Réparation, étanchéité</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="group bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-2xl">
                Diagnostic expert
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all">
                <Phone size={20} />
                05 82 95 33 75
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H0V50Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Tableau comparatif */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Comparatif détaillé
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              5 critères pour différencier
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
            <div className="grid grid-cols-3 bg-slate-900 text-white font-bold">
              <div className="p-4">Critère</div>
              <div className="p-4 text-center bg-blue-600">
                <ThermometerSun size={20} className="inline mr-2" />
                Condensation
              </div>
              <div className="p-4 text-center bg-cyan-600">
                <Droplets size={20} className="inline mr-2" />
                Infiltration
              </div>
            </div>
            {comparatif.map((row, index) => (
              <div key={index} className="grid grid-cols-3 border-b border-slate-100">
                <div className="p-4 font-bold text-slate-900 bg-slate-50">{row.critere}</div>
                <div className="p-4 text-slate-600 bg-blue-50/50">{row.condensation}</div>
                <div className="p-4 text-slate-600 bg-cyan-50/50">{row.infiltration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tests DIY */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              À faire vous-même
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              3 tests simples
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tests.map((test, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
                <div className="text-5xl mb-4">{test.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{test.nom}</h3>
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <div className="text-sm text-slate-600 font-medium mb-2">Méthode :</div>
                  <p className="text-slate-700">{test.methode}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="text-sm text-purple-600 font-medium mb-2">Interprétation :</div>
                  <p className="text-purple-900 text-sm">{test.resultat}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              La solution selon la cause
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Condensation */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <ThermometerSun size={32} className="text-blue-400" />
                <h3 className="text-2xl font-bold">Si c'est de la condensation</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">VMI (Ventilation par Insufflation)</strong>
                    <p className="text-slate-400 text-sm">Renouvelle l'air et évacue l'humidité. 2 500-4 500€</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Isolation des ponts thermiques</strong>
                    <p className="text-slate-400 text-sm">Supprime les zones froides où se forme la condensation</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Aération quotidienne</strong>
                    <p className="text-slate-400 text-sm">10 min/jour minimum, même en hiver</p>
                  </div>
                </li>
              </ul>
              <Link href="/vmi-ventilation-insufflation" className="mt-6 inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300">
                En savoir plus sur la VMI <ArrowRight size={16} />
              </Link>
            </div>

            {/* Infiltration */}
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Droplets size={32} className="text-cyan-400" />
                <h3 className="text-2xl font-bold">Si c'est une infiltration</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Injection résine (remontées capillaires)</strong>
                    <p className="text-slate-400 text-sm">Barrière étanche à la base des murs. 80-120€/ml</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Cuvelage (caves/sous-sols)</strong>
                    <p className="text-slate-400 text-sm">Étanchéité des parois enterrées. 150-250€/m²</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Réparation toiture/façade</strong>
                    <p className="text-slate-400 text-sm">Si l'eau vient de l'extérieur (fissures, joints)</p>
                  </div>
                </li>
              </ul>
              <Link href="/remontees-capillaires-traitement" className="mt-6 inline-flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300">
                En savoir plus sur l'injection <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Encore un doute ?
            <span className="block text-purple-200">L'expert tranche en 1h30.</span>
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Diagnostic 149€ (déductible des travaux) • Réponse claire et écrite
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="group bg-white text-purple-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-purple-50 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 transition-all">
              Diagnostic expert
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3">
              <Phone size={20} />
              05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
