import Link from 'next/link';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <>
      {/* CTA Final */}
      <section className="bg-slate-900 py-20 md:py-28 text-white text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500 via-slate-900 to-slate-900"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Vos murs vous inquiètent ?
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Notre diagnostic gratuit en 3 minutes vous donne une première évaluation et les solutions adaptées.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/diagnostic" 
              className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-orange-500 transition flex items-center justify-center gap-3"
            >
              Lancer le diagnostic
              <ArrowRight size={22} />
            </Link>
            <a 
              href="tel:0582953375" 
              className="bg-white/10 border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition flex items-center justify-center gap-3"
            >
              <Phone size={20} />
              05 82 95 33 75
            </a>
          </div>
          
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span>✓ Gratuit & sans engagement</span>
            <span>✓ Réponse sous 24h</span>
            <span>✓ Devis détaillé offert</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-16 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Marque */}
            <div>
              <Link href="/" className="inline-block mb-6">
                <span className="font-display text-2xl font-bold text-white">IPB<span className="text-orange-500">.</span></span>
              </Link>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Institut de Pathologie du Bâtiment. L'expertise technique au service de votre patrimoine.
              </p>
              <div className="space-y-2">
                <a href="tel:0582953375" className="flex items-center gap-2 hover:text-orange-400 transition">
                  <Phone size={14} /> 05 82 95 33 75
                </a>
                <a href="mailto:contact@ipb-expertise.fr" className="flex items-center gap-2 hover:text-orange-400 transition">
                  <Mail size={14} /> contact@ipb-expertise.fr
                </a>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5" />
                  <span>54 avenue Jean Jaurès, 31170 Tournefeuille</span>
                </div>
              </div>
            </div>
            
            {/* Expertises */}
            <div>
              <h4 className="text-white font-bold mb-6">Expertises</h4>
              <ul className="space-y-3">
                <li><Link href="/expertise/fissures" className="hover:text-orange-400 transition">Fissures & Structure</Link></li>
                <li><Link href="/expertise/humidite" className="hover:text-orange-400 transition">Humidité & Infiltrations</Link></li>
                <li><Link href="/diagnostic" className="hover:text-orange-400 transition">Diagnostic gratuit</Link></li>
                <li><Link href="/contact" className="hover:text-orange-400 transition">Parler à un expert</Link></li>
              </ul>
            </div>
            
            {/* Zones */}
            <div>
              <h4 className="text-white font-bold mb-6">Zones d'intervention</h4>
              <ul className="space-y-3">
                <li><Link href="/villes/toulouse" className="hover:text-orange-400 transition">Toulouse & Métropole (31)</Link></li>
                <li><Link href="/departements/tarn-et-garonne" className="hover:text-orange-400 transition">Tarn-et-Garonne (82)</Link></li>
                <li><Link href="/departements/gers" className="hover:text-orange-400 transition">Gers (32)</Link></li>
                <li><Link href="/plan-site" className="hover:text-orange-400 transition">Toutes les villes</Link></li>
              </ul>
            </div>
            
            {/* Ressources */}
            <div>
              <h4 className="text-white font-bold mb-6">Ressources</h4>
              <ul className="space-y-3">
                <li><Link href="/blog" className="hover:text-orange-400 transition">Blog & Conseils</Link></li>
                <li><Link href="/problemes/fissure-verticale-mur-porteur" className="hover:text-orange-400 transition">Fissure mur porteur</Link></li>
                <li><Link href="/problemes/humidite-murs-peinture-qui-cloque" className="hover:text-orange-400 transition">Peinture qui cloque</Link></li>
                <li><Link href="/legal/mentions-legales" className="hover:text-orange-400 transition">Mentions légales</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Bas de page */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500">
            <span>&copy; {new Date().getFullYear()} IPB - Institut de Pathologie du Bâtiment</span>
            <div className="flex items-center gap-6">
              <Link href="/legal/cgv" className="hover:text-white transition">CGV</Link>
              <Link href="/legal/confidentialite" className="hover:text-white transition">Confidentialité</Link>
              <span className="flex items-center gap-2 text-emerald-500 text-xs">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Site sécurisé SSL
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
