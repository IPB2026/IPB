import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <>
      {/* CTA final */}
      <section className="py-24 md:py-32 bg-slate-900 text-white text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Vos murs vous inquiètent ?
          </h2>
          <p className="text-lg text-slate-400 mb-10 font-light">
            Diagnostic en ligne gratuit — première évaluation en 3 minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/diagnostic"
              className="group bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-base hover:bg-slate-100 transition-colors flex items-center justify-center gap-3"
            >
              Lancer le diagnostic
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:0582953375"
              className="text-slate-400 hover:text-white font-medium text-base transition-colors px-4 py-4 text-center"
            >
              ou appelez le 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] py-16 text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
              <span className="text-xl font-bold text-white tracking-tight">IPB</span>
              <p className="text-slate-600 mt-3 text-[13px] leading-relaxed max-w-xs">
                Institut de Pathologie du Bâtiment.
                Expert fissures et humidité depuis 2019.
              </p>
              <div className="mt-4 space-y-1.5 text-[13px]">
                <p><a href="tel:0582953375" className="hover:text-slate-300 transition-colors">05 82 95 33 75</a></p>
                <p><a href="mailto:contact@ipb-expertise.fr" className="hover:text-slate-300 transition-colors">contact@ipb-expertise.fr</a></p>
                <p className="text-slate-600">54 av. Jean Jaurès, 31170 Tournefeuille</p>
              </div>
            </div>

            <nav>
              <h4 className="text-slate-300 font-semibold text-xs uppercase tracking-wider mb-4">Fissures</h4>
              <ul className="space-y-2.5 text-[13px]">
                <li><Link href="/expertise/fissures" className="hover:text-slate-300 transition-colors">Expertise</Link></li>
                <li><Link href="/fissure-en-escalier-causes" className="hover:text-slate-300 transition-colors">Fissure en escalier</Link></li>
                <li><Link href="/fissure-horizontale-danger" className="hover:text-slate-300 transition-colors">Fissure horizontale</Link></li>
                <li><Link href="/microfissure-quand-sinquieter" className="hover:text-slate-300 transition-colors">Microfissures</Link></li>
                <li><Link href="/fissure-fondation-maison" className="hover:text-slate-300 transition-colors">Fissure fondation</Link></li>
              </ul>
            </nav>

            <nav>
              <h4 className="text-slate-300 font-semibold text-xs uppercase tracking-wider mb-4">Humidité</h4>
              <ul className="space-y-2.5 text-[13px]">
                <li><Link href="/expertise/humidite" className="hover:text-slate-300 transition-colors">Expertise</Link></li>
                <li><Link href="/remontees-capillaires-traitement" className="hover:text-slate-300 transition-colors">Remontées capillaires</Link></li>
                <li><Link href="/salpetre-mur-traitement" className="hover:text-slate-300 transition-colors">Salpêtre</Link></li>
                <li><Link href="/cave-humide-solutions" className="hover:text-slate-300 transition-colors">Cave humide</Link></li>
                <li><Link href="/merule-champignon-traitement" className="hover:text-slate-300 transition-colors">Mérule</Link></li>
              </ul>
            </nav>

            <nav>
              <h4 className="text-slate-300 font-semibold text-xs uppercase tracking-wider mb-4">Intervention</h4>
              <ul className="space-y-2.5 text-[13px]">
                <li><Link href="/expert-fissures/toulouse" className="hover:text-slate-300 transition-colors">Toulouse (31)</Link></li>
                <li><Link href="/expert-fissures/montauban" className="hover:text-slate-300 transition-colors">Montauban (82)</Link></li>
                <li><Link href="/expert-fissures/albi" className="hover:text-slate-300 transition-colors">Albi (81)</Link></li>
                <li><Link href="/expert-fissures/auch" className="hover:text-slate-300 transition-colors">Auch (32)</Link></li>
                <li><Link href="/zones-intervention" className="hover:text-slate-300 transition-colors">56 communes →</Link></li>
              </ul>
            </nav>

            <nav>
              <h4 className="text-slate-300 font-semibold text-xs uppercase tracking-wider mb-4">Ressources</h4>
              <ul className="space-y-2.5 text-[13px]">
                <li><Link href="/blog" className="hover:text-slate-300 transition-colors">Blog</Link></li>
                <li><Link href="/avis-clients" className="hover:text-slate-300 transition-colors">Avis clients</Link></li>
                <li><Link href="/notre-expert" className="hover:text-slate-300 transition-colors">Notre expert</Link></li>
                <li><Link href="/diagnostic" className="hover:text-slate-300 transition-colors">Diagnostic gratuit</Link></li>
                <li><Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link></li>
              </ul>
            </nav>
          </div>

          <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-slate-600">
            <p>
              &copy; {new Date().getFullYear()} MGRCP31 — IPB Institut de Pathologie du Bâtiment
              <span className="hidden md:inline"> · SIRET 951 105 881 00019</span>
            </p>
            <div className="flex items-center gap-4">
              <Link href="/legal/mentions-legales" className="hover:text-slate-400 transition-colors">Mentions légales</Link>
              <Link href="/legal/cgv" className="hover:text-slate-400 transition-colors">CGV</Link>
              <Link href="/legal/confidentialite" className="hover:text-slate-400 transition-colors">Confidentialité</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
