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
            Diagnostic en ligne gratuit en 3 minutes. Puis on s'occupe de tout : expertise sur site, plan de remédiation, travaux et suivi.
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
      <footer className="bg-slate-950 py-16 text-slate-400 text-sm" role="contentinfo" aria-label="Pied de page IPB">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Marque */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-6 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">
                <span className="font-display text-2xl font-bold text-white">IPB<span className="text-orange-500">.</span></span>
              </Link>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Institut de Pathologie du Bâtiment. Expert fissures et mur porteur en Occitanie depuis 2019.
              </p>
              <address className="not-italic space-y-2">
                <a href="tel:0582953375" className="flex items-center gap-2 hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">
                  <Phone size={14} aria-hidden="true" /> 
                  <span>05 82 95 33 75</span>
                </a>
                <a href="mailto:contact@ipb-expertise.fr" className="flex items-center gap-2 hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">
                  <Mail size={14} aria-hidden="true" /> 
                  <span>contact@ipb-expertise.fr</span>
                </a>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5" aria-hidden="true" />
                  <span>13 rue du Recteur Dottin<br />31100 Toulouse</span>
                </div>
              </address>
            </div>
            
            {/* Expertises Fissures */}
            <nav aria-label="Expertise Fissures">
              <h4 className="text-white font-bold mb-6">Expert Fissures</h4>
              <ul className="space-y-3" role="list">
                <li><Link href="/expertise/fissures" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Expertise Fissures</Link></li>
                <li><Link href="/fissure-en-escalier-causes" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Fissure en escalier</Link></li>
                <li><Link href="/fissure-horizontale-danger" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Fissure horizontale</Link></li>
                <li><Link href="/microfissure-quand-sinquieter" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Microfissures</Link></li>
                <li><Link href="/fissure-secheresse-indemnisation" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Sécheresse CAT-NAT</Link></li>
                <li><Link href="/fissure-fondation-maison" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Fissure fondation</Link></li>
              </ul>
            </nav>
            
            {/* Mur Porteur & Baie Vitrée */}
            <nav aria-label="Mur Porteur et Baie Vitrée">
              <h4 className="text-white font-bold mb-6">Mur Porteur</h4>
              <ul className="space-y-3" role="list">
                <li><Link href="/expertise/mur-porteur" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Ouverture Mur Porteur</Link></li>
                <li><Link href="/expertise/mur-porteur#baie-vitree" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Création Baie Vitrée</Link></li>
                <li><Link href="/expertise/mur-porteur#prix" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Prix & Devis</Link></li>
                <li><Link href="/expertise/mur-porteur#processus" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Notre Processus</Link></li>
                <li><Link href="/expertise/mur-porteur#comment-savoir" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Identifier un mur porteur</Link></li>
                <li><Link href="/diagnostic" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Devis gratuit</Link></li>
              </ul>
            </nav>
            
            {/* Zones d'intervention */}
            <nav aria-label="Zones d'intervention">
              <h4 className="text-white font-bold mb-6">Zones d&apos;intervention</h4>
              <ul className="space-y-3" role="list">
                <li><Link href="/expert-fissures/toulouse" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Toulouse (31)</Link></li>
                <li><Link href="/expert-fissures/montauban" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Montauban (82)</Link></li>
                <li><Link href="/expert-fissures/albi" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Albi (81)</Link></li>
                <li><Link href="/expert-fissures/auch" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Auch (32)</Link></li>
                <li><Link href="/departements/haute-garonne" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Haute-Garonne</Link></li>
                <li><Link href="/departements/tarn-et-garonne" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Tarn-et-Garonne</Link></li>
                <li><Link href="/zones-intervention" className="hover:text-orange-400 transition font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">56 villes couvertes →</Link></li>
                <li><Link href="/departements" className="hover:text-orange-400 transition text-orange-400/70 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Tous les départements →</Link></li>
              </ul>
            </nav>
            
            {/* Ressources & Légal */}
            <nav aria-label="Ressources et informations légales">
              <h4 className="text-white font-bold mb-6">Ressources</h4>
              <ul className="space-y-3" role="list">
                <li><Link href="/blog" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Blog & Conseils</Link></li>
                <li><Link href="/avis-clients" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Avis Clients</Link></li>
                <li><Link href="/notre-expert" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Notre Expert</Link></li>
                <li><Link href="/diagnostic" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Diagnostic gratuit</Link></li>
                <li><Link href="/contact" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Contact</Link></li>
                <li><Link href="/plan-site" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Plan du site</Link></li>
                <li className="pt-3 border-t border-slate-800">
                  <Link href="/legal/mentions-legales" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Mentions légales</Link></li>
                <li><Link href="/legal/cgv" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">CGV</Link></li>
                <li><Link href="/legal/confidentialite" className="hover:text-orange-400 transition focus:outline-none focus:ring-2 focus:ring-orange-400 rounded">Confidentialité</Link></li>
              </ul>
            </nav>
          </div>
          
          {/* Bas de page */}
          <div className="border-t border-slate-800 pt-8">
            {/* Mots-clés SEO en liens */}
            <div className="mb-8 text-xs text-slate-600">
              <p className="mb-2 text-slate-500">Services & Expertise : </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/expert-fissures-toulouse-31" className="hover:text-slate-400 transition">expert fissures Toulouse</Link>
                <span>•</span>
                <Link href="/expert-fissures-montauban-82" className="hover:text-slate-400 transition">expert fissures Montauban</Link>
                <span>•</span>
                <Link href="/expertise-avant-achat-immobilier-toulouse" className="hover:text-slate-400 transition">expertise avant achat</Link>
                <span>•</span>
                <Link href="/fissure-secheresse-indemnisation" className="hover:text-slate-400 transition">indemnisation sécheresse</Link>
                <span>•</span>
                <Link href="/fissure-en-escalier-causes" className="hover:text-slate-400 transition">fissure en escalier</Link>
                <span>•</span>
                <Link href="/expertise/mur-porteur" className="hover:text-slate-400 transition">ouverture mur porteur</Link>
                <span>•</span>
                <Link href="/departements/haute-garonne" className="hover:text-slate-400 transition">Haute-Garonne</Link>
                <span>•</span>
                <Link href="/departements/gers" className="hover:text-slate-400 transition">Gers</Link>
                <span>•</span>
                <Link href="/departements/ariege" className="hover:text-slate-400 transition">Ariège</Link>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500">
              <p>
                <span>&copy; {new Date().getFullYear()} </span>
                <strong className="text-slate-400">Bâti Halli</strong>
                <span> - IPB Institut de Pathologie du Bâtiment</span>
                <span className="hidden md:inline"> • SIRET 398 185 421 00037</span>
              </p>
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2 text-emerald-500 text-xs">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" aria-hidden="true"></span>
                  <span>Site sécurisé SSL</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
