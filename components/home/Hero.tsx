import Image from 'next/image';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { CrackSVG } from '@/components/ui/CrackSVG';
import { HeroAtmosphere } from '@/components/ui/HeroAtmosphere';
import { StatCounter } from '@/components/ui/StatCounter';

/**
 * Hero — split 58/42, panel navy avec crack SVG signature.
 *
 * Positionnement éditorial cabinet de prestige.
 * Pas de promesse commerciale, juste l'identité de l’institut.
 *
 * Cf. IPB_Design_Handoff.md §8 — Homepage
 */
export function Hero() {
  return (
    <section className="bg-ipb-cream relative">
      <div className="max-w-ipb mx-auto grid lg:grid-cols-[58fr_42fr] gap-0 lg:gap-12 px-6 lg:px-12 pt-16 lg:pt-20 pb-20 lg:pb-24">

        {/* COLONNE GAUCHE — Texte éditorial 58% */}
        <div className="flex flex-col justify-center pr-0 lg:pr-8">
          {/* Above-the-fold critique : eyebrow + H1 + description + CTA rendus
              directement (sans RevealOnScroll) pour optimiser le LCP mobile.
              L'animation reveal sur ces éléments retardait le LCP de 400-800ms
              car le H1 candidat LCP démarrait à opacity:0 jusqu'à hydratation. */}
          <Eyebrow>Institut de pathologie du bâtiment · depuis 2019</Eyebrow>

          <h1
            className="font-serif text-ipb-text mb-8"
            style={{
              fontSize: 'clamp(48px, 5.6vw, 80px)',
              lineHeight: 1.04,
              letterSpacing: '-0.028em',
              fontWeight: 700,
            }}
          >
            Diagnostic de fissures<br />
            <em>et ouverture de mur porteur.</em>
          </h1>

          <p className="text-[15px] leading-[1.9] font-light text-ipb-muted max-w-[540px] mb-10">
            Institut indépendant en structure du bâtiment. Nous diagnostiquons les fissures qui inquiètent, étudions et réalisons les ouvertures de murs porteurs et baies vitrées. Nos rapports sont reconnus par les assurances. Nos travaux sont garantis dix ans.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <MagneticButton href="/diagnostic" variant="primary">
              Diagnostic gratuit
            </MagneticButton>
            <MagneticButton href="/notre-expert" variant="ghost">
              Découvrir l’institut
            </MagneticButton>
          </div>

          {/* Panel mobile — photo chantier réelle avec overlay navy + crack signature */}
          <RevealOnScroll delay={0.2} className="lg:hidden -mx-6 mb-12">
            <div className="relative bg-ipb-navy overflow-hidden aspect-[4/3] flex flex-col">
              {/* Photo de chantier réelle (couvre tout le panel) */}
              <Image
                src="/images/fissure-facade-verticale.webp"
                alt="Fissure verticale traitée par agrafage structurel sur façade — chantier IPB en Haute-Garonne"
                fill
                sizes="100vw"
                className="object-cover opacity-50"
                priority
              />

              {/* Overlay navy gradient pour préserver l'ambiance signature IPB */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-ipb-navy/85 via-ipb-navy/70 to-ipb-navy/95"
                aria-hidden="true"
              />

              {/* Couches atmosphériques (lueur orange + grain) */}
              <HeroAtmosphere />

              {/* Crack SVG signature par-dessus */}
              <CrackSVG variant="hero" />

              {/* Liens services compactés en bas du panel mobile */}
              <div className="relative z-10 mt-auto p-6 border-t border-white/10 bg-gradient-to-t from-ipb-navy via-ipb-navy/95 to-transparent">
                <p className="text-[10px] text-white/75 uppercase tracking-[0.18em] mb-3 font-medium">Nos expertises</p>
                <div className="flex flex-col gap-2.5">
                  <Link
                    href="/expertise/fissures"
                    className="group flex items-center justify-between text-white border-b border-white/15 pb-2.5 hover:border-ipb-orange-l transition-colors"
                  >
                    <span className="font-serif text-base">Diagnostic de fissures</span>
                    <span className="text-ipb-orange-l text-sm transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                  <Link
                    href="/expertise/mur-porteur"
                    className="group flex items-center justify-between text-white border-b border-white/15 pb-2.5 hover:border-ipb-orange-l transition-colors"
                  >
                    <span className="font-serif text-base">Ouverture de mur porteur</span>
                    <span className="text-ipb-orange-l text-sm transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Stats compactes — sur mobile : 3 colonnes égales centrées avec
              séparateurs verticaux fins. Sur desktop : layout horizontal
              à gauche avec gaps généreux. */}
          <RevealOnScroll delay={0.24}>
            <div className="flex items-stretch justify-between sm:justify-start sm:gap-x-10 lg:gap-x-12 pt-8 border-t border-ipb-rule">
              <div className="flex-1 sm:flex-initial text-center sm:text-left">
                <p className="font-serif text-[26px] sm:text-3xl text-ipb-text font-bold leading-none whitespace-nowrap">
                  <StatCounter value={850} />
                  <span className="text-ipb-orange">+</span>
                </p>
                <p className="text-[9px] sm:text-[10px] text-ipb-light uppercase tracking-[0.14em] sm:tracking-[0.16em] mt-2 whitespace-nowrap">
                  Chantiers livrés
                </p>
              </div>

              <div className="w-px bg-ipb-rule self-center h-10 mx-1 sm:mx-0" aria-hidden="true" />

              <div className="flex-1 sm:flex-initial text-center sm:text-left">
                <p className="font-serif text-[26px] sm:text-3xl text-ipb-text font-bold leading-none whitespace-nowrap">
                  <StatCounter value={4.9} decimals={1} /><span className="text-ipb-light text-lg sm:text-2xl">/5</span>
                </p>
                <p className="text-[9px] sm:text-[10px] text-ipb-light uppercase tracking-[0.14em] sm:tracking-[0.16em] mt-2 whitespace-nowrap">
                  Note Google
                </p>
              </div>

              <div className="w-px bg-ipb-rule self-center h-10 mx-1 sm:mx-0" aria-hidden="true" />

              <div className="flex-1 sm:flex-initial text-center sm:text-left">
                <p className="font-serif text-[26px] sm:text-3xl text-ipb-text font-bold leading-none whitespace-nowrap">
                  10<span className="text-ipb-light text-lg sm:text-2xl"> ans</span>
                </p>
                <p className="text-[9px] sm:text-[10px] text-ipb-light uppercase tracking-[0.14em] sm:tracking-[0.16em] mt-2 whitespace-nowrap">
                  Décennale AXA
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* COLONNE DROITE — Panel navy avec crack SVG signature 42% */}
        <RevealOnScroll direction="right" delay={0.1} className="hidden lg:block">
          <div className="relative bg-ipb-navy rounded-[6px] overflow-hidden h-full min-h-[560px] flex flex-col">
            {/* Couches atmosphériques (lueur + grain) */}
            <HeroAtmosphere />

            {/* Crack SVG animé */}
            <CrackSVG variant="hero" />

            {/* Liens services discrets en bas du panel */}
            <div className="relative z-10 mt-auto p-10 border-t border-white/5">
              <p className="text-[10px] text-white/70 uppercase tracking-[0.18em] mb-5">Nos expertises</p>
              <div className="flex flex-col gap-4">
                <Link
                  href="/expertise/fissures"
                  className="group flex items-center justify-between text-white border-b border-white/10 pb-3 hover:border-ipb-orange-l transition-colors"
                >
                  <span className="font-serif text-xl">Diagnostic de fissures</span>
                  <span className="text-ipb-orange-l text-sm transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/expertise/mur-porteur"
                  className="group flex items-center justify-between text-white border-b border-white/10 pb-3 hover:border-ipb-orange-l transition-colors"
                >
                  <span className="font-serif text-xl">Ouverture de mur porteur</span>
                  <span className="text-ipb-orange-l text-sm transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
