import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CheckCircle, Phone, ArrowRight, AlertTriangle, Home, Layers, TreeDeciduous, Construction, Clock, Shield, TrendingUp, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fissure en Escalier : Causes, Dangers et Réparation | Expert Occitanie',
  description: 'Fissure en escalier sur votre mur ? ⚠️ Signe de tassement différentiel. Causes (sol argileux, sécheresse), dangers structurels et solutions (agrafage). Expert Toulouse, Montauban, Auch (31-82-32).',
  keywords: ['fissure en escalier', 'fissure diagonale', 'tassement différentiel', 'sol argileux', 'agrafage fissures', 'expert fissures toulouse'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/fissure-en-escalier-causes' },
  openGraph: {
    title: 'Fissure en Escalier : Causes et Solutions | IPB',
    description: 'Une fissure en escalier révèle un tassement différentiel. Diagnostic et traitement par agrafage. Expert Occitanie.',
    url: 'https://www.ipb-expertise.fr/fissure-en-escalier-causes',
    type: 'article',
    images: [{ url: '/images/fissure-facade-diagonale.webp', width: 1200, height: 630, alt: 'Fissure en escalier sur mur' }],
  },
};

const causes = [
  {
    icon: <Layers className="w-8 h-8" />,
    title: 'Tassement différentiel',
    description: 'Quand une partie de la fondation s\'enfonce plus qu\'une autre, le mur subit des contraintes de cisaillement.',
    color: 'orange',
  },
  {
    icon: <TreeDeciduous className="w-8 h-8" />,
    title: 'Retrait-gonflement des argiles',
    description: 'Les sols argileux gonflent avec l\'eau et se rétractent en sécheresse. Cause n°1 en Occitanie.',
    color: 'red',
  },
  {
    icon: <Home className="w-8 h-8" />,
    title: 'Défaut de fondations',
    description: 'Fondations sous-dimensionnées ou mal ancrées. Fréquent dans les maisons des années 60-80.',
    color: 'amber',
  },
  {
    icon: <Construction className="w-8 h-8" />,
    title: 'Travaux environnants',
    description: 'Construction voisine, piscine, arbres trop proches... Ces modifications déstabilisent le sol.',
    color: 'yellow',
  },
];

const signesGravite = [
  { signe: 'Ouverture < 2mm', niveau: 'Surveillance', color: 'green', width: '25%' },
  { signe: 'Ouverture 2-5mm', niveau: 'Intervention recommandée', color: 'yellow', width: '50%' },
  { signe: 'Ouverture 5-10mm', niveau: 'Urgence modérée', color: 'orange', width: '75%' },
  { signe: 'Ouverture > 10mm', niveau: 'Urgence structurelle', color: 'red', width: '100%' },
];

const faqItems = [
  { q: 'Une fissure en escalier est-elle dangereuse ?', a: 'Oui, c\'est le signe d\'un mouvement structurel actif. Sans traitement, elle va s\'aggraver et peut compromettre la stabilité du bâtiment.' },
  { q: 'Peut-on simplement reboucher une fissure en escalier ?', a: 'Non, reboucher sans traiter la cause est inutile. La fissure réapparaîtra. Il faut d\'abord stabiliser la structure (agrafage) puis réparer.' },
  { q: 'Combien coûte la réparation ?', a: 'L\'agrafage coûte entre 8 000€ et 18 000€ selon l\'étendue. C\'est 3x moins cher que les micropieux et convient à 85% des cas.' },
  { q: 'La fissure est-elle couverte par l\'assurance ?', a: 'Si votre commune est reconnue en catastrophe naturelle sécheresse, oui. Nous vous aidons à constituer votre dossier.' },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Fissure en Escalier : Causes, Dangers et Solutions de Réparation",
  "description": "Guide complet sur les fissures en escalier : comprendre les causes, évaluer la gravité et choisir la bonne solution de réparation.",
  "author": { "@type": "Organization", "name": "IPB - Institut de Pathologie du Bâtiment" },
  "publisher": { "@type": "Organization", "name": "IPB", "logo": { "@type": "ImageObject", "url": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png" } },
  "datePublished": "2024-01-15",
  "dateModified": "2025-02-04",
};

export default function FissureEscalierPage() {
  return (
    <div className="font-sans text-slate-800 bg-white antialiased">
      <Script id="article-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <TopBar />
      <Navbar />

      {/* Hero Premium */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 text-white overflow-hidden">
        {/* Pattern de fond */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.03) 35px, rgba(255,255,255,0.03) 70px)' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Breadcrumb stylé */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-white transition">Accueil</Link>
            <ChevronRight size={14} />
            <Link href="/expert-fissures-toulouse-31" className="hover:text-white transition">Expert Fissures</Link>
            <ChevronRight size={14} />
            <span className="text-orange-400">Fissure en escalier</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
                <AlertTriangle size={16} />
                Mouvement structurel actif
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]">
                Fissure en
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  Escalier
                </span>
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
                Une fissure diagonale qui suit les joints de mortier ? C'est le signe d'un 
                <strong className="text-white"> tassement différentiel</strong>. 
                Votre fondation bouge. Il faut agir.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostic" className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-2xl shadow-orange-500/25">
                  Diagnostic gratuit
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all">
                  <Phone size={20} />
                  05 82 95 33 75
                </a>
              </div>
            </div>

            {/* Visual Card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="bg-white/10 rounded-2xl p-6 mb-6">
                  <div className="text-6xl mb-4">🪜</div>
                  <h2 className="text-xl font-bold text-white mb-2">Schéma typique</h2>
                  <p className="text-slate-300 text-sm">La fissure suit les joints en "marches d'escalier" car c'est le chemin de moindre résistance du mur.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-3xl font-black text-orange-400">85%</div>
                    <div className="text-xs text-slate-400 mt-1">Liées au sol argileux</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-3xl font-black text-red-400">+15%</div>
                    <div className="text-xs text-slate-400 mt-1">Par mois sans traitement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vague décorative */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Section Causes - Cards Premium */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Comprendre les causes
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Pourquoi cette fissure apparaît ?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Une fissure en escalier n'est jamais anodine. Elle révèle un problème sous vos fondations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {causes.map((cause, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-orange-500/10 hover:border-orange-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-${cause.color}-100 text-${cause.color}-600 group-hover:scale-110 transition-transform`}>
                  {cause.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{cause.title}</h3>
                <p className="text-slate-600 leading-relaxed">{cause.description}</p>
                
                {index === 1 && (
                  <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    N°1 en Occitanie
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Gravité - Visual Gauge */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Évaluer la gravité
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Votre fissure est-elle grave ?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              L'ouverture de la fissure détermine l'urgence d'intervention.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="space-y-6">
              {signesGravite.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900">{item.signe}</span>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                      item.color === 'green' ? 'bg-green-100 text-green-700' :
                      item.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                      item.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {item.niveau}
                    </span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        item.color === 'green' ? 'bg-gradient-to-r from-green-400 to-green-500' :
                        item.color === 'yellow' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                        item.color === 'orange' ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                        'bg-gradient-to-r from-red-400 to-red-500'
                      }`}
                      style={{ width: item.width }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-red-50 border border-red-200 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-red-900 mb-1">⚠️ Signe d'alerte supplémentaire</h3>
                  <p className="text-red-800">
                    Si la fissure <strong>s'agrandit</strong>, si vos <strong>portes coincent</strong>, ou si vous voyez des fissures 
                    <strong> à l'intérieur</strong> également : intervention urgente recommandée.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Solution - Timeline */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Notre méthode
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Comment nous réparons votre fissure
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              L'agrafage structurel : la solution éprouvée pour 85% des cas, 3x moins chère que les micropieux.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Diagnostic expert', desc: 'Analyse complète de la fissure, des fondations et du sol. Rapport détaillé avec préconisations.', icon: '🔍', duration: '1h30' },
              { step: '02', title: 'Agrafage structurel', desc: 'Pose d\'agrafes inox tous les 40cm, scellement au mortier fibré. Stabilise définitivement la structure.', icon: '🔧', duration: '2-3 jours' },
              { step: '03', title: 'Finition & garantie', desc: 'Enduit de finition, peinture. Garantie décennale sur les travaux. Suivi post-intervention.', icon: '✅', duration: 'Garanti 10 ans' },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 h-full hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">{item.icon}</span>
                    <span className="text-6xl font-black text-white/10">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-400 mb-4">{item.desc}</p>
                  <div className="flex items-center gap-2 text-orange-400 text-sm font-bold">
                    <Clock size={16} />
                    {item.duration}
                  </div>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="text-orange-500" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Prix */}
          <div className="mt-16 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl p-8 md:p-12 border border-orange-500/30">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="text-sm text-orange-300 font-bold mb-2">DIAGNOSTIC</div>
                <div className="text-4xl font-black text-white">149€</div>
                <div className="text-slate-400">Déductible des travaux</div>
              </div>
              <div className="text-center border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0">
                <div className="text-sm text-orange-300 font-bold mb-2">AGRAFAGE</div>
                <div className="text-4xl font-black text-white">8-18K€</div>
                <div className="text-slate-400">Selon étendue • Garantie 10 ans</div>
              </div>
              <div className="text-center md:text-right">
                <div className="text-sm text-green-300 font-bold mb-2">ÉCONOMIE VS MICROPIEUX</div>
                <div className="text-4xl font-black text-green-400">-65%</div>
                <div className="text-slate-400">Soit 15 000€ à 30 000€ économisés</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Premium */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Questions fréquentes
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              Vos questions, nos réponses
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="group bg-slate-50 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-100 transition-colors">
                  <span className="font-bold text-slate-900 pr-8">{item.q}</span>
                  <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 group-open:rotate-180 transition-transform flex-shrink-0">
                    <ChevronRight size={18} className="rotate-90" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Articles connexes */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">
            Articles connexes
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { href: '/fissure-horizontale-danger', icon: '➖', title: 'Fissure horizontale', desc: 'Danger structurel' },
              { href: '/microfissure-quand-sinquieter', icon: '🔍', title: 'Microfissure', desc: 'Quand s\'inquiéter ?' },
              { href: '/fissure-secheresse-indemnisation', icon: '☀️', title: 'Fissure sécheresse', desc: 'Indemnisation CAT-NAT' },
              { href: '/fissure-fondation-maison', icon: '🏠', title: 'Fissure fondation', desc: 'Solutions durables' },
            ].map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100"
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

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-6">
            <TrendingUp size={16} />
            +300 maisons sauvées depuis 2019
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Votre fissure n'attendra pas.
            <span className="block text-orange-200">Nous non plus.</span>
          </h2>
          
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Diagnostic sous 48h • Devis gratuit • Garantie décennale
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="group bg-white text-orange-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-orange-50 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 transition-all">
              Je demande mon diagnostic gratuit
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all">
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
