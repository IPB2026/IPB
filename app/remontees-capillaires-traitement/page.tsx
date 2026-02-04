import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CheckCircle, Phone, ArrowRight, Droplets, AlertTriangle, Home, Clock, Shield, ChevronRight, Zap, ThermometerSun } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Remontées Capillaires : Traitement Définitif par Injection | Expert Occitanie',
  description: 'Remontées capillaires dans les murs ? Salpêtre, moisissures, peinture qui cloque. Traitement par injection résine hydrophobe. Garantie 30 ans. Expert Toulouse, Montauban, Auch (31-82-32) ☎ 05 82 95 33 75',
  keywords: ['remontées capillaires', 'injection résine', 'humidité murs', 'salpêtre', 'traitement humidité'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/remontees-capillaires-traitement' },
  openGraph: {
    title: 'Remontées Capillaires : Traitement Définitif | IPB',
    description: 'Traitement définitif des remontées capillaires par injection. Résultat visible en 3 mois. Expert Occitanie.',
    url: 'https://www.ipb-expertise.fr/remontees-capillaires-traitement',
    type: 'article',
  },
};

const symptomes = [
  { icon: '🧂', titre: 'Salpêtre', description: 'Poudre blanche cristalline au pied des murs', severity: 'high' },
  { icon: '🎨', titre: 'Peinture qui cloque', description: 'Cloques et écaillage en partie basse', severity: 'high' },
  { icon: '🦠', titre: 'Moisissures', description: 'Taches noires persistantes près du sol', severity: 'medium' },
  { icon: '👃', titre: 'Odeur de moisi', description: 'Odeur persistante même après aération', severity: 'medium' },
  { icon: '📏', titre: 'Auréoles', description: 'Marques d\'humidité montant du sol (< 1m50)', severity: 'high' },
  { icon: '🧱', titre: 'Enduit dégradé', description: 'Enduit qui se décolle ou s\'effrite', severity: 'medium' },
];

const etapesTraitement = [
  {
    num: '01',
    titre: 'Diagnostic précis',
    description: 'Mesure du taux d\'humidité à différentes hauteurs. Identification des zones touchées.',
    duree: '1h30',
    icon: '🔍',
  },
  {
    num: '02',
    titre: 'Perçage calibré',
    description: 'Perçage tous les 12cm à la base du mur, en quinconce. Profondeur = 2/3 de l\'épaisseur.',
    duree: '1 jour',
    icon: '🔧',
  },
  {
    num: '03',
    titre: 'Injection résine',
    description: 'Injection basse pression de résine hydrophobe. Création d\'une barrière étanche continue.',
    duree: '1-2 jours',
    icon: '💧',
  },
  {
    num: '04',
    titre: 'Séchage naturel',
    description: 'Le mur évacue l\'humidité accumulée. Comptez 1 mois par cm d\'épaisseur.',
    duree: '6-12 mois',
    icon: '☀️',
  },
];

export default function RemonteesCapillairesPage() {
  return (
    <div className="font-sans text-slate-800 bg-white antialiased">
      <TopBar />
      <Navbar />

      {/* Hero - Style Humidité */}
      <section className="relative bg-gradient-to-br from-blue-900 via-cyan-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)' }}></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-blue-200 mb-8">
            <Link href="/" className="hover:text-white transition">Accueil</Link>
            <ChevronRight size={14} />
            <Link href="/expert-humidite-toulouse-31" className="hover:text-white transition">Expert Humidité</Link>
            <ChevronRight size={14} />
            <span className="text-white">Remontées capillaires</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Droplets size={16} />
                Traitement garanti 30 ans
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]">
                Remontées
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Capillaires
                </span>
              </h1>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-xl">
                L'eau du sol remonte dans vos murs par capillarité, comme une éponge. 
                <strong className="text-white"> Notre injection de résine hydrophobe</strong> crée 
                une barrière étanche définitive.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-cyan-400">30</div>
                  <div className="text-xs text-blue-200">ans de garantie</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-cyan-400">95%</div>
                  <div className="text-xs text-blue-200">d'efficacité</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-cyan-400">48h</div>
                  <div className="text-xs text-blue-200">barrière active</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostic" className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-2xl shadow-cyan-500/25">
                  Diagnostic gratuit
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all">
                  <Phone size={20} />
                  05 82 95 33 75
                </a>
              </div>
            </div>

            {/* Schéma visuel */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-6 text-center">Le phénomène expliqué</h3>
                
                <div className="relative bg-gradient-to-t from-blue-600/30 to-transparent rounded-2xl p-6 h-64">
                  {/* Sol */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-amber-800/50 rounded-b-2xl flex items-center justify-center">
                    <span className="text-amber-200 text-sm font-bold">SOL HUMIDE</span>
                  </div>
                  
                  {/* Mur */}
                  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-24 h-40 bg-slate-600/50 rounded-t-lg border-2 border-slate-500/50">
                    {/* Eau qui monte */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-500/60 to-transparent rounded-t-lg animate-pulse"></div>
                    <span className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold">MUR</span>
                  </div>
                  
                  {/* Flèches */}
                  <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                    <div className="flex flex-col items-center">
                      <ArrowRight size={24} className="text-cyan-400 rotate-[-90deg] animate-bounce" />
                      <span className="text-cyan-300 text-xs mt-1">Capillarité</span>
                    </div>
                  </div>
                </div>

                <p className="text-center text-blue-200 text-sm mt-4">
                  L'eau remonte dans les micro-pores du mur, comme du café dans un sucre.
                </p>
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

      {/* Symptômes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Reconnaître le problème
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              6 signes qui ne trompent pas
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Si vous observez 2 ou plus de ces symptômes, vous avez probablement des remontées capillaires.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {symptomes.map((item, index) => (
              <div 
                key={index}
                className={`relative rounded-3xl p-6 ${
                  item.severity === 'high' 
                    ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200' 
                    : 'bg-slate-50 border border-slate-200'
                } hover:shadow-lg transition-all`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{item.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{item.titre}</h3>
                    <p className="text-slate-600 text-sm">{item.description}</p>
                  </div>
                </div>
                {item.severity === 'high' && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Typique
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus de traitement */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Notre méthode
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Traitement en 4 étapes
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              L'injection de résine hydrophobe : la solution définitive, garantie 30 ans.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {etapesTraitement.map((etape, index) => (
              <div key={index} className="relative">
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-6 h-full hover:bg-white/10 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl">{etape.icon}</span>
                    <span className="text-6xl font-black text-white/10">{etape.num}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{etape.titre}</h3>
                  <p className="text-slate-400 text-sm mb-4">{etape.description}</p>
                  <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold">
                    <Clock size={14} />
                    {etape.duree}
                  </div>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="text-cyan-500" size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Encart résultat */}
          <div className="mt-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl p-8 md:p-12 border border-cyan-500/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Résultat garanti</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle size={20} className="text-cyan-400" />
                    Barrière étanche active en 48h
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle size={20} className="text-cyan-400" />
                    Séchage progressif visible en 3 mois
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle size={20} className="text-cyan-400" />
                    Murs secs et sains en 6-12 mois
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle size={20} className="text-cyan-400" />
                    Garantie 30 ans sur l'injection
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  80-120€
                </div>
                <div className="text-slate-400 mt-2">par mètre linéaire</div>
                <div className="text-sm text-cyan-300 mt-4">Soit 8 000 à 15 000€ pour une maison standard</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparatif solutions */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Pourquoi l'injection plutôt qu'autre chose ?
            </h2>
          </div>

          <div className="bg-slate-50 rounded-3xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 text-left">Solution</th>
                  <th className="p-4 text-center">Efficacité</th>
                  <th className="p-4 text-center">Prix</th>
                  <th className="p-4 text-center">Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-cyan-50 border-l-4 border-cyan-500">
                  <td className="p-4 font-bold text-slate-900">✅ Injection résine</td>
                  <td className="p-4 text-center"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">95%</span></td>
                  <td className="p-4 text-center text-slate-600">8-15K€</td>
                  <td className="p-4 text-center text-slate-600">30 ans</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-bold text-slate-900">Drainage périphérique</td>
                  <td className="p-4 text-center"><span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">70%</span></td>
                  <td className="p-4 text-center text-slate-600">15-30K€</td>
                  <td className="p-4 text-center text-slate-600">20 ans</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-bold text-slate-900">Électro-osmose</td>
                  <td className="p-4 text-center"><span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">50%</span></td>
                  <td className="p-4 text-center text-slate-600">5-10K€</td>
                  <td className="p-4 text-center text-slate-600">Variable</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">Peinture "anti-humidité"</td>
                  <td className="p-4 text-center"><span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">0%</span></td>
                  <td className="p-4 text-center text-slate-600">200-500€</td>
                  <td className="p-4 text-center text-slate-600">6 mois max</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-amber-900 mb-1">Attention aux "solutions miracles"</h4>
                <p className="text-amber-800 text-sm">
                  Les peintures anti-humidité et enduits "respirants" ne traitent pas la cause. 
                  Ils masquent temporairement le problème qui réapparaît ensuite de plus belle.
                </p>
              </div>
            </div>
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
              { href: '/salpetre-mur-traitement', icon: '🧂', title: 'Salpêtre', desc: 'Causes et traitement' },
              { href: '/moisissures-maison-sante', icon: '🦠', title: 'Moisissures', desc: 'Risques santé' },
              { href: '/cave-humide-solutions', icon: '🏠', title: 'Cave humide', desc: 'Solutions cuvelage' },
              { href: '/condensation-ou-infiltration', icon: '❓', title: 'Condensation ?', desc: 'Comment distinguer' },
            ].map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Shield size={16} />
            Garantie 30 ans sur l'injection
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Murs humides depuis trop longtemps ?
          </h2>
          
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Chaque mois qui passe dégrade vos murs, vos boiseries et votre santé.
            Un diagnostic aujourd'hui peut vous éviter une facture x3 demain.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="group bg-white text-cyan-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-cyan-50 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 transition-all">
              Je veux des murs secs
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
