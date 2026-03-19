import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Phone, ArrowRight, ChevronRight, AlertTriangle, CheckCircle, XCircle, Clock, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mérule : Identification, Dangers et Traitement Urgence | Expert Occitanie',
  description: 'Mérule (champignon destructeur du bois) ? ⚠️ URGENCE. Comment la reconnaître, dangers pour la maison, traitement professionnel. Intervention urgente Toulouse, Montauban, Auch (31-82-32) 24-48h.',
  keywords: ['mérule', 'champignon bois', 'traitement mérule', 'mérule pleureuse', 'pourriture bois'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/merule-champignon-traitement' },
};

const signesReconnaissance = [
  { signe: 'Filaments blancs cotonneux', detail: 'Mycélium visible sur le bois et les murs', danger: 'high' },
  { signe: 'Fructification brune/orangée', detail: 'Corps du champignon avec aspect de crêpe', danger: 'critical' },
  { signe: 'Odeur de champignon forte', detail: 'Odeur terreuse et persistante', danger: 'high' },
  { signe: 'Bois qui s\'effrite', detail: 'Le bois se désagrège au toucher', danger: 'critical' },
  { signe: 'Poudre brune (spores)', detail: 'Dépôt brun-rouille sur les surfaces', danger: 'high' },
  { signe: 'Cordons gris sur les murs', detail: 'Filaments permettant au champignon de se propager', danger: 'critical' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment reconnaître la mérule dans une maison ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La mérule se reconnaît par plusieurs signes : des filaments blancs cotonneux (mycélium) sur le bois et les murs, une fructification brune ou orangée en forme de crêpe, une odeur forte de champignon terreux et persistante, du bois qui s\'effrite au toucher, une poudre brune (spores) sur les surfaces, et des cordons gris sur les murs permettant au champignon de se propager.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte un traitement contre la mérule ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le coût d\'un traitement mérule varie de 5 000€ pour un cas localisé à plus de 50 000€ si la charpente entière est touchée. Le traitement comprend le diagnostic, le retrait des bois infectés (avec 1m de marge de sécurité), le traitement fongicide par injection et pulvérisation, puis la reconstruction. Plus le diagnostic est précoce, plus la facture est réduite (division par 10 possible).',
      },
    },
    {
      '@type': 'Question',
      name: 'La mérule est-elle dangereuse pour la santé ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La mérule libère des spores qui peuvent provoquer des irritations respiratoires et des réactions allergiques. Cependant, son principal danger est structural : elle détruit le bois de la maison (charpente, plancher, poutres) en quelques mois. Elle peut traverser les murs en maçonnerie, se développe sans lumière et croît de plusieurs centimètres par semaine.',
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on traiter la mérule soi-même ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Non, il est fortement déconseillé de traiter la mérule soi-même. Gratter ou arracher le champignon libère les spores et propage l\'infestation. La javel est inefficace et dangereuse. Seul un traitement professionnel complet (diagnostic, suppression de la source d\'humidité, retrait des bois infectés, traitement fongicide certifié) permet d\'éradiquer la mérule. Contactez un expert en urgence.',
      },
    },
  ],
};

export default function MerulePage() {
  return (
    <div className="font-sans text-slate-800 bg-white antialiased">
      <Script
        id="faq-schema-merule-champignon-traitement"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TopBar />
      <Navbar />

      {/* Hero - URGENCE */}
      <section className="relative bg-gradient-to-br from-red-900 via-rose-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(239, 68, 68, 0.4) 0%, transparent 50%)' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-red-200 mb-8">
            <Link href="/" className="hover:text-white transition">Accueil</Link>
            <ChevronRight size={14} />
            <Link href="/expert-humidite-toulouse-31" className="hover:text-white transition">Expert Humidité</Link>
            <ChevronRight size={14} />
            <span className="text-white">Mérule</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
                <AlertTriangle size={16} />
                🚨 URGENCE ABSOLUE
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]">
                Mérule
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                  "La lèpre des maisons"
                </span>
              </h1>

              <p className="text-xl text-red-100 mb-8 leading-relaxed max-w-xl">
                La mérule pleureuse (<em>Serpula lacrymans</em>) est le champignon le plus destructeur du bâtiment. 
                Elle peut détruire une charpente en <strong className="text-white">quelques mois</strong>. 
                Si vous suspectez sa présence, n'attendez pas.
              </p>

              <div className="bg-red-500/30 border border-red-400/50 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-300 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white mb-2">Pourquoi c'est une urgence ?</h3>
                    <ul className="text-red-100 text-sm space-y-1">
                      <li>• Peut traverser les murs en maçonnerie</li>
                      <li>• Se développe même sans lumière</li>
                      <li>• Croissance de plusieurs cm par semaine</li>
                      <li>• Dommages souvent irréversibles si trop tardif</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:0582953375" className="group bg-white text-red-600 px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-2xl hover:scale-105">
                  <Phone size={20} />
                  APPELER MAINTENANT
                </a>
                <Link href="/diagnostic" className="bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all">
                  Diagnostic urgent
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            {/* Image + Stats */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20">
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-800 mb-4">
                  <Image
                    src="/images/merule-sol.webp"
                    alt="Mérule champignon destructeur - IPB"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center text-red-200 text-sm">
                  Fructification typique de mérule sur un sol
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-500/20 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-red-400">24h</div>
                  <div className="text-xs text-red-200">Intervention urgente</div>
                </div>
                <div className="bg-orange-500/20 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-orange-400">100%</div>
                  <div className="text-xs text-orange-200">Bois détruits si non traité</div>
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

      {/* Reconnaissance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Identification
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Comment reconnaître la mérule ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {signesReconnaissance.map((item, index) => (
              <div 
                key={index}
                className={`rounded-3xl p-6 ${
                  item.danger === 'critical' 
                    ? 'bg-red-50 border-2 border-red-300' 
                    : 'bg-orange-50 border-2 border-orange-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    item.danger === 'critical' ? 'bg-red-100' : 'bg-orange-100'
                  }`}>
                    <AlertTriangle size={20} className={item.danger === 'critical' ? 'text-red-600' : 'text-orange-600'} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{item.signe}</h3>
                    <p className="text-slate-600 text-sm">{item.detail}</p>
                  </div>
                </div>
                {item.danger === 'critical' && (
                  <div className="mt-4 text-xs font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full inline-block">
                    SIGNE CRITIQUE
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Que faire / Ne pas faire */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Réaction immédiate
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-500/10 border border-green-500/30 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-3">
                <CheckCircle size={24} />
                ✅ À FAIRE IMMÉDIATEMENT
              </h3>
              <ul className="space-y-4">
                {[
                  'Aérer au maximum la zone touchée',
                  'Prendre des photos (avec date)',
                  'Ne pas toucher avec les mains nues',
                  'Appeler un expert AUJOURD\'HUI',
                  'Isoler la zone si possible (fermer porte)',
                  'Prévenir votre assurance',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-3">
                <XCircle size={24} />
                ❌ À NE SURTOUT PAS FAIRE
              </h3>
              <ul className="space-y-4">
                {[
                  'Gratter ou arracher le champignon (libère les spores)',
                  'Appliquer de la javel (inefficace, dangereux)',
                  'Humidifier la zone',
                  'Attendre "que ça sèche"',
                  'Reboucher ou peindre par-dessus',
                  'Faire des travaux sans diagnostic pro',
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

      {/* Traitement */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Traitement professionnel
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Comment on éradique la mérule
            </h2>
          </div>

          <div className="space-y-6">
            {[
              { num: '1', titre: 'Diagnostic complet', desc: 'Repérage de toutes les zones touchées, même cachées. Analyse de l\'étendue.', duree: '1-2 jours' },
              { num: '2', titre: 'Traitement de la cause', desc: 'Suppression de la source d\'humidité (fuite, remontées capillaires, etc.)', duree: 'Variable' },
              { num: '3', titre: 'Retrait des bois infectés', desc: 'Dépose et brûlage des bois atteints (+ 1m de marge de sécurité).', duree: '2-5 jours' },
              { num: '4', titre: 'Traitement fongicide', desc: 'Injection et pulvérisation de produits certifiés sur murs et bois sains.', duree: '1-2 jours' },
              { num: '5', titre: 'Reconstruction', desc: 'Remplacement des bois détruits par du bois traité. Finitions.', duree: 'Variable' },
            ].map((etape, index) => (
              <div key={index} className="flex items-start gap-6 bg-slate-50 rounded-2xl p-6">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {etape.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{etape.titre}</h3>
                  <p className="text-slate-600">{etape.desc}</p>
                </div>
                <div className="text-sm text-slate-500 flex items-center gap-2">
                  <Clock size={14} />
                  {etape.duree}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-amber-900 mb-1">💰 Coût moyen d'un traitement mérule</h4>
                <p className="text-amber-800 text-sm">
                  De <strong>5 000€</strong> (cas localisé) à <strong>50 000€+</strong> (charpente entière). 
                  Plus vous attendez, plus c'est cher. Un diagnostic précoce peut diviser la facture par 10.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Suspicion de mérule ?
            <span className="block text-red-200">Chaque heure compte.</span>
          </h2>
          <p className="text-xl text-red-100 mb-8">
            IPB intervient dans toute la région Occitanie (31, 82, 32) pour des diagnostics et traitements mérule en urgence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:0582953375" className="group bg-white text-red-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-red-50 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 transition-all">
              <Phone size={20} />
              APPELER MAINTENANT
            </a>
            <Link href="/diagnostic" className="bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3">
              Diagnostic urgent
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
