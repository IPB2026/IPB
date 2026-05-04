import Link from 'next/link';
import { CrackSVG } from '@/components/ui/CrackSVG';

/**
 * Footer — éditorial cabinet, fond navy.
 *
 * Cf. IPB_Design_Handoff.md §5.8
 */
export function Footer() {
  return (
    <footer className="bg-ipb-navy text-white pt-20 pb-12">
      <div className="max-w-ipb mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 lg:gap-16 mb-16">
          {/* Identité cabinet */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 bg-ipb-orange text-white rounded-[4px] flex items-center justify-center font-extrabold text-[14px] tracking-tight transition-transform duration-200 group-hover:-rotate-[4deg]">
                IPB
              </div>
              <div>
                <p className="font-serif text-white text-[18px] font-medium leading-none">Institut</p>
                <p className="text-[11px] text-white/65 uppercase tracking-[0.12em] mt-1">Pathologie du bâtiment</p>
              </div>
            </Link>

            <p className="text-[14px] leading-[1.85] font-light text-white/75 max-w-[420px] mb-8">
              Institut indépendant en structure du bâtiment. Diagnostic de fissures, ouverture de mur porteur, création de baie vitrée. Décennale AXA active depuis 2019.
            </p>

            <div className="space-y-5 mb-6">
              <div className="flex items-start gap-3 text-[13px] text-white/70 leading-[1.7]">
                <CrackSVG variant="mini" />
                <div>
                  <p className="text-white/65 text-[11px] uppercase tracking-[0.14em] font-medium mb-1">Siège social</p>
                  <p>13 rue du Recteur Dottin</p>
                  <p>31100 Toulouse — Occitanie</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[13px] text-white/70 leading-[1.7] pl-[26px]">
                <div>
                  <p className="text-white/65 text-[11px] uppercase tracking-[0.14em] font-medium mb-1">Bureau IPB Expertise</p>
                  <p>54 avenue Jean Jaurès</p>
                  <p>31170 Tournefeuille — Occitanie</p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-white/70 leading-[1.6] max-w-[420px]">
              IPB Expertise est la marque commerciale de Bâti Halli SARL ·
              SIRET 398 185 421 00037 · RCS Toulouse B 398 185 421.
            </p>
          </div>

          {/* Expertises */}
          <div>
            <p className="text-[10px] text-white/70 uppercase tracking-[0.18em] font-medium mb-5">
              Expertises
            </p>
            <ul className="space-y-3 text-[14px] font-light">
              {[
                ['/expertise/fissures', 'Diagnostic de fissures'],
                ['/expertise/mur-porteur', 'Ouverture de mur porteur'],
                ['/calcul-prix-mur-porteur', 'Calculateur prix mur porteur'],
                ['/expertise-avant-achat-immobilier-toulouse', 'Avant achat immobilier'],
                ['/bureau-etude-structure-toulouse', "Bureau d'études"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-white/75 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institut */}
          <div>
            <p className="text-[10px] text-white/70 uppercase tracking-[0.18em] font-medium mb-5">
              Institut
            </p>
            <ul className="space-y-3 text-[14px] font-light">
              {[
                ['/notre-expert', 'L’institut'],
                ['/avis-clients', 'Avis clients'],
                ['/blog', 'Blog'],
                ['/zones-intervention', "Zones d'intervention"],
                ['/partenaires', 'Pros & partenaires'],
                ['/contact', 'Contact'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-white/75 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact direct */}
          <div>
            <p className="text-[10px] text-white/70 uppercase tracking-[0.18em] font-medium mb-5">
              Échanger
            </p>
            <a
              href="tel:0582953375"
              className="block font-serif text-white text-[20px] font-bold leading-tight hover:text-ipb-orange-l transition-colors mb-2"
            >
              05 82 95 33 75
            </a>
            <p className="text-[12px] text-white/70 leading-[1.7] mb-6">
              Lundi au vendredi<br />
              8h&nbsp;–&nbsp;19h
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 text-ipb-orange-l text-[13px] font-medium border-b border-ipb-orange-l pb-1 hover:gap-3 transition-all"
            >
              Diagnostic gratuit →
            </Link>
          </div>
        </div>

        {/* Bandeau légal */}
        <div className="pt-10 border-t border-white/6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <p className="text-[12px] text-white/70">
            © {new Date().getFullYear()} IPB Expertise — Institut de pathologie du bâtiment · Occitanie
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-white/70">
            <Link href="/legal/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link href="/legal/cgv" className="hover:text-white transition-colors">
              CGV
            </Link>
            <Link href="/legal/confidentialite" className="hover:text-white transition-colors">
              Confidentialité
            </Link>
            <Link href="/plan-site" className="hover:text-white transition-colors">
              Plan du site
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
