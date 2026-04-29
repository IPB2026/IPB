import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CrackSVG } from '@/components/ui/CrackSVG';

export default function NotFound() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased min-h-screen flex flex-col">
      <TopBar />
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-20 lg:py-32">
        <div className="max-w-2xl w-full">
          <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">
            {/* Crack signature à gauche */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-24 h-32 lg:w-32 lg:h-40 text-ipb-orange opacity-90">
                <CrackSVG variant="hero" />
              </div>
            </div>

            {/* Texte éditorial à droite */}
            <div className="text-center lg:text-left lg:border-l lg:border-ipb-rule lg:pl-12">
              <Eyebrow>Erreur 404 · page introuvable</Eyebrow>

              <h1
                className="font-serif text-ipb-text mb-6"
                style={{
                  fontSize: 'clamp(40px, 4.6vw, 64px)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.026em',
                  fontWeight: 700,
                }}
              >
                Cette page <em>s&apos;est volatilisée.</em>
              </h1>

              <p className="text-[15px] leading-[1.85] font-light text-ipb-muted mb-10 max-w-[480px] mx-auto lg:mx-0">
                Le lien que vous avez suivi n&apos;existe plus, ou a été déplacé. Pas de panique — voici quelques pages qui vont sûrement répondre à votre besoin.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
                <Link
                  href="/diagnostic"
                  className="group inline-flex items-center justify-center gap-2 bg-ipb-orange hover:bg-[#b35519] text-white font-medium px-6 py-3.5 rounded-[3px] text-[14px] tracking-wide transition-colors duration-300"
                >
                  Diagnostic gratuit
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 border border-ipb-rule hover:border-ipb-orange text-ipb-text hover:text-ipb-orange font-medium px-6 py-3.5 rounded-[3px] text-[14px] tracking-wide transition-colors duration-300"
                >
                  Retour à l&apos;accueil
                </Link>
              </div>

              {/* Liens utiles éditoriaux */}
              <div className="pt-6 border-t border-ipb-rule">
                <p className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mb-3">Vous cherchiez peut-être</p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] justify-center lg:justify-start">
                  <li><Link href="/expertise/fissures" className="text-ipb-muted hover:text-ipb-orange transition-colors">Diagnostic de fissures</Link></li>
                  <li><Link href="/expertise/mur-porteur" className="text-ipb-muted hover:text-ipb-orange transition-colors">Ouverture de mur porteur</Link></li>
                  <li><Link href="/blog" className="text-ipb-muted hover:text-ipb-orange transition-colors">Blog</Link></li>
                  <li><Link href="/contact" className="text-ipb-muted hover:text-ipb-orange transition-colors">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
