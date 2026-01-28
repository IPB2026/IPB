import Link from 'next/link';
import { ArrowRight, Lock } from 'lucide-react';

export function Footer() {
  return (
    <>
      {/* SECTION DIAGNOSTIC FINAL (LEAD GEN) */}
      <div id="diagnostic" className="bg-slate-900 py-24 text-white text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500 via-slate-900 to-slate-900"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Vos murs vous inquiètent ?</h2>
          <p className="text-xl text-slate-300 mb-12 font-light">
            Ne laissez pas le doute s'installer. Notre diagnostic gratuit en 3 minutes vous donne une première évaluation de la gravité de votre situation et les solutions adaptées.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/diagnostic" className="bg-orange-600 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:bg-orange-500 transition hover:scale-105 transform duration-200 flex items-center justify-center gap-3">
              Lancer le diagnostic
              <ArrowRight size={24} />
            </Link>
          </div>
          <div className="mt-10 flex justify-center gap-8 text-sm text-slate-500 font-medium uppercase tracking-widest">
            <span className="flex items-center gap-2"><Lock size={14}/> Gratuit</span>
            <span className="flex items-center gap-2"><Lock size={14}/> Sans engagement</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-16 border-t border-slate-900 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-8 lg:gap-10 xl:gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <span className="text-3xl font-black text-white tracking-tighter block mb-6">IPB<span className="text-orange-600">.</span></span>
            <p className="max-w-sm text-slate-500 leading-relaxed mb-6">
              Institut de Pathologie du Bâtiment.<br/>
              L'expertise technique au service de votre patrimoine immobilier en Occitanie.
            </p>
            <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-slate-500 hover:bg-orange-600 hover:text-white transition cursor-pointer">In</div>
                <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-slate-500 hover:bg-orange-600 hover:text-white transition cursor-pointer">Fb</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-base">Problèmes fréquents</h4>
            <ul className="space-y-4">
              <li><Link href="/problemes/fissure-verticale-mur-porteur" className="hover:text-orange-500 transition">Fissure mur porteur</Link></li>
              <li><Link href="/problemes/fissure-escalier-que-faire" className="hover:text-orange-500 transition">Fissure en escalier</Link></li>
              <li><Link href="/problemes/portes-qui-coincent-fissures" className="hover:text-orange-500 transition">Portes qui coincent</Link></li>
              <li><Link href="/problemes/humidite-murs-peinture-qui-cloque" className="hover:text-orange-500 transition">Peinture qui cloque</Link></li>
              <li><Link href="/problemes/moisissures-sante" className="hover:text-orange-500 transition">Moisissures & santé</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-base">Expertises</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/expertise/fissures" className="hover:text-orange-500 transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-orange-500 rounded-full"></span> Fissures & Structure
                </Link>
              </li>
              <li>
                <Link href="/expertise/humidite" className="hover:text-orange-500 transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-orange-500 rounded-full"></span> Humidité & Infiltrations
                </Link>
              </li>
              <li>
                <Link href="/diagnostic" className="hover:text-orange-500 transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-orange-500 rounded-full"></span> Diagnostic gratuit
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-500 transition flex items-center gap-2">
                  <span className="w-1 h-1 bg-orange-500 rounded-full"></span> Parler à un expert
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-base">Quartiers Toulouse</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/quartiers/capitole" className="hover:text-orange-500 transition">Capitole</Link></li>
              <li><Link href="/quartiers/saint-cyprien" className="hover:text-orange-500 transition">Saint-Cyprien</Link></li>
              <li><Link href="/quartiers/compans-caffarelli" className="hover:text-orange-500 transition">Compans-Caffarelli</Link></li>
              <li><Link href="/quartiers/minimes" className="hover:text-orange-500 transition">Minimes</Link></li>
              <li><Link href="/quartiers/rangueil" className="hover:text-orange-500 transition">Rangueil</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-base">Haute-Garonne</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/villes/colomiers" className="hover:text-orange-500 transition">Colomiers</Link></li>
              <li><Link href="/villes/blagnac" className="hover:text-orange-500 transition">Blagnac</Link></li>
              <li><Link href="/villes/balma" className="hover:text-orange-500 transition">Balma</Link></li>
              <li><Link href="/villes/tournefeuille" className="hover:text-orange-500 transition">Tournefeuille</Link></li>
              <li><Link href="/villes/muret" className="hover:text-orange-500 transition">Muret</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-base">Départements</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/departements/tarn-et-garonne" className="hover:text-orange-500 transition flex items-center gap-1">
                <span className="text-orange-500 font-bold">82</span> Tarn-et-Garonne
              </Link></li>
              <li><Link href="/villes/montauban" className="hover:text-orange-500 transition pl-5">Montauban</Link></li>
              <li><Link href="/villes/castelsarrasin" className="hover:text-orange-500 transition pl-5">Castelsarrasin</Link></li>
              <li><Link href="/departements/gers" className="hover:text-orange-500 transition flex items-center gap-1 mt-4">
                <span className="text-blue-500 font-bold">32</span> Gers
              </Link></li>
              <li><Link href="/villes/auch" className="hover:text-orange-500 transition pl-5">Auch</Link></li>
              <li><Link href="/villes/condom" className="hover:text-orange-500 transition pl-5">Condom</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-base">Informations</h4>
            <ul className="space-y-4">
              <li><Link href="/blog" className="hover:text-orange-500 transition">Blog & Conseils</Link></li>
              <li><Link href="/legal/mentions-legales" className="hover:text-orange-500 transition">Mentions Légales</Link></li>
              <li><Link href="/legal/cgv" className="hover:text-orange-500 transition">CGV</Link></li>
              <li><Link href="/legal/confidentialite" className="hover:text-orange-500 transition">Politique de confidentialité</Link></li>
              <li><Link href="/contact" className="hover:text-orange-500 transition">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>&copy; 2026 IPB Toulouse. Tous droits réservés.</span>
          <span className="flex items-center gap-2 text-xs bg-slate-900 px-3 py-1 rounded-full"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Site Sécurisé SSL</span>
        </div>
      </footer>
    </>
  );
}

