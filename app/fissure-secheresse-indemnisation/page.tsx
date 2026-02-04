import { Metadata } from 'next';
import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Phone, ArrowRight, ChevronRight, Sun, FileText, Clock, CheckCircle, AlertTriangle, Calendar, Euro } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fissure Sécheresse : Indemnisation CAT-NAT et Démarches | Expert Occitanie',
  description: 'Fissures maison après sécheresse ? Guide complet indemnisation CAT-NAT : démarches, délais (10 jours), franchise, expertise assurance. Aide pour votre dossier (31, 82, 32).',
  keywords: ['fissure sécheresse', 'CAT-NAT', 'catastrophe naturelle', 'indemnisation fissures', 'RGA'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/fissure-secheresse-indemnisation' },
};

const etapesIndemnisation = [
  {
    num: '1',
    titre: 'Arrêté CAT-NAT publié',
    description: 'Votre commune doit être reconnue en état de catastrophe naturelle sécheresse.',
    delai: 'Vérifiez sur Légifrance',
    icon: '📋',
  },
  {
    num: '2',
    titre: 'Déclaration à l\'assurance',
    description: 'Vous avez 10 jours après publication de l\'arrêté pour déclarer le sinistre.',
    delai: '10 jours max',
    icon: '📨',
  },
  {
    num: '3',
    titre: 'Expertise assurance',
    description: 'L\'assureur mandate un expert qui évalue les dommages et propose un chiffrage.',
    delai: '2-3 mois',
    icon: '🔍',
  },
  {
    num: '4',
    titre: 'Indemnisation',
    description: 'Paiement de l\'indemnité après déduction de la franchise légale.',
    delai: '3 mois après accord',
    icon: '💰',
  },
];

const communes31 = ['Toulouse', 'Colomiers', 'Tournefeuille', 'Blagnac', 'Muret', 'Cugnaux', 'Plaisance-du-Touch', 'Balma', 'Ramonville', 'Castanet-Tolosan'];
const communes82 = ['Montauban', 'Castelsarrasin', 'Moissac', 'Caussade', 'Valence-d\'Agen', 'Montech', 'Verdun-sur-Garonne', 'Negrepelisse'];
const communes32 = ['Auch', 'Condom', 'Fleurance', 'Lectoure', 'L\'Isle-Jourdain', 'Mirande', 'Nogaro', 'Gimont'];

export default function FissureSecheressePage() {
  return (
    <div className="font-sans text-slate-800 bg-white antialiased">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-amber-900 via-orange-900 to-red-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(251, 191, 36, 0.4) 0%, transparent 50%)' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-amber-200 mb-8">
            <Link href="/" className="hover:text-white transition">Accueil</Link>
            <ChevronRight size={14} />
            <Link href="/expert-fissures-toulouse-31" className="hover:text-white transition">Expert Fissures</Link>
            <ChevronRight size={14} />
            <span className="text-white">Sécheresse & Indemnisation</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 text-amber-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Sun size={16} />
                Catastrophe naturelle sécheresse
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]">
                Fissures
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  Sécheresse
                </span>
              </h1>

              <p className="text-xl text-amber-100 mb-8 leading-relaxed max-w-xl">
                <strong className="text-white">La Haute-Garonne, le Tarn-et-Garonne et le Gers</strong> sont 
                particulièrement touchés par le retrait-gonflement des argiles. Si votre commune est reconnue 
                CAT-NAT, votre assurance peut couvrir une partie des réparations.
              </p>

              <div className="bg-red-500/20 border border-red-400/40 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white mb-2">⏰ Délai critique : 10 jours</h3>
                    <p className="text-red-100">
                      Après publication de l'arrêté CAT-NAT, vous n'avez que <strong className="text-white">10 jours</strong> pour 
                      déclarer le sinistre à votre assurance. Passé ce délai, c'est trop tard.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostic" className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-2xl">
                  Aide pour mon dossier
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all">
                  <Phone size={20} />
                  05 82 95 33 75
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 text-center">
                <div className="text-5xl font-black text-amber-400">400+</div>
                <div className="text-amber-200 text-sm mt-2">communes reconnues CAT-NAT en Occitanie (2022-2024)</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 text-center">
                <div className="text-5xl font-black text-orange-400">1 534€</div>
                <div className="text-amber-200 text-sm mt-2">franchise légale (maison individuelle)</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 text-center">
                <div className="text-5xl font-black text-red-400">10j</div>
                <div className="text-amber-200 text-sm mt-2">pour déclarer après l'arrêté</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 text-center">
                <div className="text-5xl font-black text-yellow-400">85%</div>
                <div className="text-amber-200 text-sm mt-2">des fissures = sol argileux</div>
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

      {/* Étapes indemnisation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Procédure
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Les 4 étapes de l'indemnisation
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {etapesIndemnisation.map((etape, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{etape.icon}</span>
                    <span className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {etape.num}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{etape.titre}</h3>
                  <p className="text-slate-600 text-sm mb-4">{etape.description}</p>
                  <div className="flex items-center gap-2 text-amber-600 text-sm font-bold">
                    <Clock size={14} />
                    {etape.delai}
                  </div>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="text-amber-400" size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communes touchées */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Zone d'intervention
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Communes fréquemment reconnues CAT-NAT
            </h2>
            <p className="text-slate-600">
              Cette liste n'est pas exhaustive. Vérifiez l'éligibilité de votre commune sur Légifrance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold">31</span>
                Haute-Garonne
              </h3>
              <div className="flex flex-wrap gap-2">
                {communes31.map((c, i) => (
                  <span key={i} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm font-bold">82</span>
                Tarn-et-Garonne
              </h3>
              <div className="flex flex-wrap gap-2">
                {communes82.map((c, i) => (
                  <span key={i} className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center text-sm font-bold">32</span>
                Gers
              </h3>
              <div className="flex flex-wrap gap-2">
                {communes32.map((c, i) => (
                  <span key={i} className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre aide */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
                Notre accompagnement
              </span>
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                On vous aide à constituer votre dossier
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                L'expertise de votre assureur peut sous-évaluer les dommages ou contester le lien avec la sécheresse. 
                Notre rapport technique indépendant renforce votre dossier.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Rapport technique détaillé</strong>
                    <p className="text-slate-400 text-sm">Photos, mesures, analyse des causes, préconisations</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Contre-expertise</strong>
                    <p className="text-slate-400 text-sm">Si l'expert de l'assurance minimise les dégâts</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Aide aux démarches</strong>
                    <p className="text-slate-400 text-sm">Vérification éligibilité, conseils sur la déclaration</p>
                  </div>
                </li>
              </ul>

              <div className="bg-amber-500/20 rounded-2xl p-6 border border-amber-500/30">
                <div className="flex items-center gap-4">
                  <Euro className="w-10 h-10 text-amber-400" />
                  <div>
                    <div className="text-sm text-amber-300 font-bold">DIAGNOSTIC</div>
                    <div className="text-3xl font-black text-white">149€</div>
                    <div className="text-slate-400 text-sm">Déductible si travaux avec nous</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Documents à préparer</h3>
              <ul className="space-y-4">
                {[
                  'Photos des fissures (datées)',
                  'Plan de la maison',
                  'Acte de propriété',
                  'Contrat d\'assurance habitation',
                  'Factures de travaux antérieurs (si existantes)',
                  'Éventuels rapports d\'expertise précédents',
                ].map((doc, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <FileText size={18} className="text-amber-400" />
                    {doc}
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
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { href: '/fissure-en-escalier-causes', icon: '🪜', title: 'Fissure en escalier', desc: 'Tassement différentiel' },
              { href: '/fissure-fondation-maison', icon: '🏠', title: 'Fissure fondation', desc: 'Solutions durables' },
              { href: '/microfissure-quand-sinquieter', icon: '🔍', title: 'Microfissure', desc: 'Quand s\'inquiéter ?' },
              { href: '/fissure-horizontale-danger', icon: '➖', title: 'Fissure horizontale', desc: 'Danger structurel' },
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
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Ne laissez pas filer l'indemnisation.
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Diagnostic expert sous 48h • Rapport technique pour votre assurance
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="group bg-white text-amber-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-amber-50 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 transition-all">
              Aide pour mon dossier CAT-NAT
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
