import { Metadata } from 'next';
import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Phone, ArrowRight, AlertTriangle, Search, ChevronRight, Shield, CheckCircle, Eye, Ruler, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Microfissure Façade : Quand S\'inquiéter ? Guide Expert | Occitanie (31-82-32)',
  description: 'Microfissures sur votre façade ? Toutes ne sont pas dangereuses. Guide pour différencier fissure esthétique et structurelle. Critères d\'alerte et quand appeler un expert. Toulouse, Montauban, Auch.',
  keywords: ['microfissure', 'fissure façade', 'faïençage', 'fissure superficielle', 'quand s\'inquiéter fissure'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/microfissure-quand-sinquieter' },
};

const typesClassification = [
  {
    type: 'Faïençage',
    ouverture: '< 0.2mm',
    aspect: 'Réseau de fines lignes',
    danger: 'Aucun',
    action: 'Surveillance',
    couleur: 'green',
  },
  {
    type: 'Microfissure',
    ouverture: '0.2 - 1mm',
    aspect: 'Ligne unique visible',
    danger: 'Faible',
    action: 'Surveiller évolution',
    couleur: 'yellow',
  },
  {
    type: 'Fissure légère',
    ouverture: '1 - 2mm',
    aspect: 'Visible, peut être suivie',
    danger: 'Modéré',
    action: 'Diagnostic recommandé',
    couleur: 'orange',
  },
  {
    type: 'Fissure structurelle',
    ouverture: '> 2mm',
    aspect: 'Large, traversante',
    danger: 'Élevé',
    action: 'Intervention urgente',
    couleur: 'red',
  },
];

const signesAlerte = [
  { signe: 'La fissure s\'agrandit au fil des semaines', urgent: true },
  { signe: 'Forme en escalier (suit les joints)', urgent: true },
  { signe: 'Portes ou fenêtres qui coincent', urgent: true },
  { signe: 'Fissures visibles à l\'intérieur aussi', urgent: true },
  { signe: 'Craquements dans les murs', urgent: true },
  { signe: 'Fissure uniquement sur l\'enduit extérieur', urgent: false },
  { signe: 'Réseau de petites lignes (faïençage)', urgent: false },
  { signe: 'Fissure stable depuis des années', urgent: false },
];

export default function MicrofissurePage() {
  return (
    <div className="font-sans text-slate-800 bg-white antialiased">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-amber-900/30 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-slate-300 mb-8">
            <Link href="/" className="hover:text-white transition">Accueil</Link>
            <ChevronRight size={14} />
            <Link href="/expert-fissures-toulouse-31" className="hover:text-white transition">Expert Fissures</Link>
            <ChevronRight size={14} />
            <span className="text-white">Microfissure</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 text-amber-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Search size={16} />
                Guide de diagnostic
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]">
                Microfissure :
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                  Quand s'inquiéter ?
                </span>
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
                Toutes les fissures ne sont pas dangereuses. Certaines sont purement esthétiques, 
                d'autres révèlent un problème structurel. Ce guide vous aide à 
                <strong className="text-white"> faire la différence</strong>.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-green-500/20 border border-green-400/30 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-green-400">70%</div>
                  <div className="text-xs text-green-200">des microfissures sont bénignes</div>
                </div>
                <div className="bg-red-500/20 border border-red-400/30 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-red-400">30%</div>
                  <div className="text-xs text-red-200">nécessitent une intervention</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostic" className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-2xl">
                  Diagnostic gratuit
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all">
                  <Phone size={20} />
                  05 82 95 33 75
                </a>
              </div>
            </div>

            {/* Mini-guide visuel */}
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Ruler size={24} className="text-amber-400" />
                Le test de la règle
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400 font-bold">
                      &lt;1mm
                    </div>
                    <div>
                      <div className="text-white font-bold">Microfissure</div>
                      <div className="text-slate-400 text-sm">Surveillance simple</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center text-yellow-400 font-bold">
                      1-2mm
                    </div>
                    <div>
                      <div className="text-white font-bold">Fissure légère</div>
                      <div className="text-slate-400 text-sm">Diagnostic conseillé</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-400 font-bold">
                      &gt;2mm
                    </div>
                    <div>
                      <div className="text-white font-bold">Fissure structurelle</div>
                      <div className="text-slate-400 text-sm">Intervention nécessaire</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H0V50Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Classification détaillée */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Classification officielle
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Les 4 types de fissures
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              La classification se fait principalement sur l'ouverture de la fissure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {typesClassification.map((type, index) => (
              <div 
                key={index}
                className={`rounded-3xl p-6 border-2 ${
                  type.couleur === 'green' ? 'bg-green-50 border-green-200' :
                  type.couleur === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
                  type.couleur === 'orange' ? 'bg-orange-50 border-orange-200' :
                  'bg-red-50 border-red-200'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                  type.couleur === 'green' ? 'bg-green-100 text-green-600' :
                  type.couleur === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                  type.couleur === 'orange' ? 'bg-orange-100 text-orange-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  <Eye size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{type.type}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ouverture</span>
                    <span className="font-bold text-slate-900">{type.ouverture}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Danger</span>
                    <span className={`font-bold ${
                      type.couleur === 'green' ? 'text-green-600' :
                      type.couleur === 'yellow' ? 'text-yellow-600' :
                      type.couleur === 'orange' ? 'text-orange-600' :
                      'text-red-600'
                    }`}>{type.danger}</span>
                  </div>
                </div>
                <div className={`mt-4 px-3 py-2 rounded-full text-xs font-bold text-center ${
                  type.couleur === 'green' ? 'bg-green-100 text-green-700' :
                  type.couleur === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                  type.couleur === 'orange' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {type.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signes d'alerte */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Checklist
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Signes qui doivent vous alerter
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 rounded-3xl p-8 border-2 border-red-200">
              <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center gap-3">
                <AlertTriangle size={24} className="text-red-600" />
                🚨 Consultez un expert SI :
              </h3>
              <ul className="space-y-4">
                {signesAlerte.filter(s => s.urgent).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-red-800">
                    <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-1" />
                    {item.signe}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 rounded-3xl p-8 border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-3">
                <CheckCircle size={24} className="text-green-600" />
                ✅ Pas d'urgence SI :
              </h3>
              <ul className="space-y-4">
                {signesAlerte.filter(s => !s.urgent).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-green-800">
                    <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-1" />
                    {item.signe}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 mb-1">💡 Astuce : le test du témoin</h4>
                <p className="text-amber-800 text-sm">
                  Posez un ruban adhésif en travers de la fissure avec la date. Si le ruban se déchire 
                  dans les semaines suivantes, la fissure évolue → consultez un expert.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles connexes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">
            Articles connexes
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { href: '/fissure-en-escalier-causes', icon: '🪜', title: 'Fissure en escalier', desc: 'Tassement différentiel' },
              { href: '/fissure-horizontale-danger', icon: '➖', title: 'Fissure horizontale', desc: 'Danger structurel' },
              { href: '/fissure-secheresse-indemnisation', icon: '☀️', title: 'Fissure sécheresse', desc: 'Indemnisation CAT-NAT' },
              { href: '/fissure-fondation-maison', icon: '🏠', title: 'Fissure fondation', desc: 'Solutions durables' },
            ].map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="group bg-slate-50 rounded-2xl p-6 hover:bg-orange-50 transition-all hover:-translate-y-1 border border-slate-100 hover:border-orange-200"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Un doute sur vos fissures ?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Le diagnostic est gratuit et sans engagement. Mieux vaut vérifier que regretter.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-amber-400 hover:to-orange-400 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 transition-all">
              Vérifier mes fissures
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
