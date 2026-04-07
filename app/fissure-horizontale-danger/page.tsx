import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CheckCircle, Phone, ArrowRight, AlertTriangle, Minus, ArrowDown, Layers, Clock, Shield, TrendingUp, ChevronRight, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fissure Horizontale Mur : Danger Structurel à Traiter d\'Urgence | Expert Occitanie',
  description: 'Fissure horizontale sur mur porteur ? ⚠️ Signe de poussée latérale ou désolidarisation plancher. Causes, diagnostic et réparation urgente. Expert fissures Toulouse, Montauban, Auch (31-82-32).',
  keywords: ['fissure horizontale', 'fissure mur porteur', 'poussée latérale', 'désolidarisation plancher', 'urgence structurelle'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/fissure-horizontale-danger' },
  openGraph: {
    title: 'Fissure Horizontale : Danger Structurel | IPB',
    description: 'La fissure horizontale est souvent plus grave qu\'une fissure en escalier. Diagnostic urgent recommandé.',
    url: 'https://www.ipb-expertise.fr/fissure-horizontale-danger',
    type: 'article',
  },
};

const dangers = [
  {
    icon: <ArrowDown className="w-6 h-6" />,
    title: 'Désolidarisation du plancher',
    description: 'Le plancher se "décolle" du mur porteur. La fissure apparaît à la jonction.',
    severity: 'critical',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Poussée de la charpente',
    description: 'Une charpente mal contreventée pousse les murs vers l\'extérieur.',
    severity: 'high',
  },
  {
    icon: <Minus className="w-6 h-6" />,
    title: 'Flexion de linteau',
    description: 'Au-dessus des ouvertures (fenêtres, portes), le linteau fléchit sous la charge.',
    severity: 'medium',
  },
];

const comparaison = [
  { type: 'Fissure horizontale', danger: 'Très élevé', urgence: 'Immédiate', cause: 'Poussée / Flexion', icon: '➖' },
  { type: 'Fissure en escalier', danger: 'Élevé', urgence: '1-3 mois', cause: 'Tassement', icon: '🪜' },
  { type: 'Fissure verticale', danger: 'Modéré', urgence: '6-12 mois', cause: 'Retrait', icon: '|' },
  { type: 'Microfissure', danger: 'Faible', urgence: 'Surveillance', cause: 'Superficielle', icon: '·' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Une fissure horizontale est-elle dangereuse pour la structure ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, une fissure horizontale sur un mur porteur est un signe de contrainte structurelle majeure (poussée latérale, désolidarisation du plancher, flexion de linteau). En Occitanie, 43% des effondrements partiels sont précédés d\'une fissure horizontale ignorée. Un diagnostic urgent est recommandé sous 24 à 48h.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment reconnaître une fissure horizontale sur un mur porteur ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Une fissure horizontale se présente sous forme d\'une ligne parfaitement horizontale sur le mur, souvent à la jonction entre le plancher et le mur porteur, ou au-dessus des ouvertures (fenêtres, portes). Elle peut s\'accompagner de portes qui coincent, de craquements ou de décollements visibles.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte la réparation d\'une fissure horizontale ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le coût dépend de la cause et de la gravité. Un diagnostic expert coûte environ 249€ (déductible des travaux). L\'agrafage structurel revient entre 8 000 et 18 000€ pour 85% des cas. Les micropieux, réservés aux cas graves, coûtent entre 25 000 et 50 000€. Plus vous intervenez tôt, moins c\'est cher.',
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on rester dans une maison avec une fissure horizontale ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Il est déconseillé de rester sans avis d\'expert. Une fissure horizontale peut indiquer un risque d\'effondrement partiel. Faites réaliser un diagnostic en urgence sous 24-48h. En attendant, surveillez l\'évolution avec un témoin (ruban adhésif daté), ne faites pas de travaux lourds à proximité et prévenez votre assurance si la fissure évolue rapidement.',
      },
    },
  ],
};

export default function FissureHorizontalePage() {
  return (
    <div className="font-sans text-slate-800 bg-white antialiased">
      <Script
        id="faq-schema-fissure-horizontale-danger"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TopBar />
      <Navbar />

      {/* Hero - Style Urgence */}
      <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-red-200 mb-8">
            <Link href="/" className="hover:text-white transition">Accueil</Link>
            <ChevronRight size={14} />
            <Link href="/expert-fissures-toulouse-31" className="hover:text-white transition">Expert Fissures</Link>
            <ChevronRight size={14} />
            <span className="text-white">Fissure horizontale</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
                <AlertTriangle size={16} />
                URGENCE STRUCTURELLE
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]">
                Fissure
                <span className="block text-red-300">Horizontale</span>
              </h1>

              <p className="text-xl text-red-100 mb-8 leading-relaxed max-w-xl">
                Une fissure parfaitement horizontale sur un mur porteur est le signe d'une 
                <strong className="text-white"> contrainte structurelle majeure</strong>. 
                Ne prenez aucun risque.
              </p>

              <div className="bg-red-500/30 border border-red-400/50 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Statistique alarmante</h3>
                    <p className="text-red-100">
                      En Occitanie, <strong className="text-white">43% des effondrements partiels</strong> sont précédés 
                      d'une fissure horizontale ignorée pendant plus de 6 mois.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostic" className="group bg-white text-red-600 px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-2xl hover:scale-105">
                  Diagnostic URGENT
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all">
                  <Phone size={20} />
                  05 82 95 33 75
                </a>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">
                <div className="text-center mb-8">
                  <div className="inline-block bg-slate-800 rounded-2xl p-8 relative">
                    <div className="w-48 h-32 bg-slate-700 rounded-lg relative">
                      {/* Mur avec fissure horizontale */}
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-red-500 transform -translate-y-1/2"></div>
                      <div className="absolute top-1/2 left-4 right-4 border-t-2 border-dashed border-red-300 transform -translate-y-1/2"></div>
                    </div>
                    <p className="text-slate-400 text-sm mt-4">Représentation schématique</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-500/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-black text-red-400">43%</div>
                    <div className="text-xs text-red-200">Risque effondrement</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-black text-white">24h</div>
                    <div className="text-xs text-slate-300">Intervention urgente</div>
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

      {/* Dangers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Causes principales
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Pourquoi cette fissure est dangereuse
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {dangers.map((item, index) => (
              <div key={index} className={`relative rounded-3xl p-8 ${
                item.severity === 'critical' ? 'bg-red-50 border-2 border-red-200' :
                item.severity === 'high' ? 'bg-orange-50 border-2 border-orange-200' :
                'bg-yellow-50 border-2 border-yellow-200'
              }`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  item.severity === 'critical' ? 'bg-red-100 text-red-600' :
                  item.severity === 'high' ? 'bg-orange-100 text-orange-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
                
                {item.severity === 'critical' && (
                  <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    CRITIQUE
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparatif */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Comparatif des types de fissures
            </h2>
            <p className="text-xl text-slate-600">
              La fissure horizontale est la plus urgente à traiter.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-5 bg-slate-900 text-white text-sm font-bold">
              <div className="p-4">Type</div>
              <div className="p-4 text-center">Danger</div>
              <div className="p-4 text-center">Urgence</div>
              <div className="p-4 text-center">Cause</div>
              <div className="p-4 text-center">Icône</div>
            </div>
            {comparaison.map((row, index) => (
              <div key={index} className={`grid grid-cols-5 border-b border-slate-100 ${index === 0 ? 'bg-red-50' : ''}`}>
                <div className="p-4 font-bold text-slate-900">{row.type}</div>
                <div className="p-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    row.danger === 'Très élevé' ? 'bg-red-100 text-red-700' :
                    row.danger === 'Élevé' ? 'bg-orange-100 text-orange-700' :
                    row.danger === 'Modéré' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {row.danger}
                  </span>
                </div>
                <div className="p-4 text-center text-slate-600">{row.urgence}</div>
                <div className="p-4 text-center text-slate-600">{row.cause}</div>
                <div className="p-4 text-center text-2xl">{row.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Que faire */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Que faire immédiatement ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* À faire */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-3">
                <CheckCircle size={24} />
                À FAIRE
              </h3>
              <ul className="space-y-4">
                {[
                  'Prendre des photos datées de la fissure',
                  'Mesurer l\'ouverture (avec une règle)',
                  'Poser un témoin (ruban adhésif) pour surveiller l\'évolution',
                  'Appeler un expert pour un diagnostic sous 48h',
                  'Prévenir votre assurance si évolution rapide',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* À ne pas faire */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-3">
                <XCircle size={24} />
                À NE PAS FAIRE
              </h3>
              <ul className="space-y-4">
                {[
                  'Reboucher la fissure sans traiter la cause',
                  'Attendre "que ça se stabilise"',
                  'Ignorer les signaux (portes qui coincent)',
                  'Faire des travaux lourds à proximité',
                  'Tarder à faire diagnostiquer',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <XCircle size={18} className="text-red-400 flex-shrink-0 mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
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
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { href: '/fissure-en-escalier-causes', icon: '🪜', title: 'Fissure en escalier', desc: 'Tassement différentiel' },
              { href: '/microfissure-quand-sinquieter', icon: '🔍', title: 'Microfissure', desc: 'Quand s\'inquiéter ?' },
              { href: '/fissure-secheresse-indemnisation', icon: '☀️', title: 'Fissure sécheresse', desc: 'Indemnisation CAT-NAT' },
              { href: '/fissure-fondation-maison', icon: '🏠', title: 'Fissure fondation', desc: 'Solutions durables' },
              { href: '/expertise/fissures', icon: '📋', title: 'Guide complet fissures', desc: 'Tout savoir sur nos solutions' },
              { href: '/expertise/humidite', icon: '💧', title: 'Problème d\'humidité ?', desc: 'Nos solutions humidité' },
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
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            N'attendez pas l'irréparable.
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Diagnostic urgent sous 24-48h • Devis gratuit • Garantie décennale
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="group bg-white text-red-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-red-50 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 transition-all">
              Diagnostic URGENT
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
