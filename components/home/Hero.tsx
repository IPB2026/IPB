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
 * Pas de promesse commerciale, juste l'identité du cabinet.
 *
 * Cf. IPB_Design_Handoff.md §8 — Homepage
 */
export function Hero() {
  return (
    <section className="bg-ipb-cream relative">
      <div className="max-w-ipb mx-auto grid lg:grid-cols-[58fr_42fr] gap-0 lg:gap-12 px-6 lg:px-12 pt-16 lg:pt-20 pb-20 lg:pb-24">

        {/* COLONNE GAUCHE — Texte éditorial 58% */}
        <div className="flex flex-col justify-center pr-0 lg:pr-8">
          <RevealOnScroll>
            <Eyebrow>Cabinet de pathologie du bâtiment · depuis 2019</Eyebrow>
          </RevealOnScroll>

          <RevealOnScroll delay={0.06} variant="editorial">
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
          </RevealOnScroll>

          <RevealOnScroll delay={0.12} variant="subtle">
            <p className="text-[15px] leading-[1.9] font-light text-ipb-muted max-w-[540px] mb-10">
              Cabinet indépendant en structure du bâtiment. Nous diagnostiquons les fissures qui inquiètent, étudions et réalisons les ouvertures de murs porteurs et baies vitrées. Nos rapports sont reconnus par les assurances. Nos travaux sont garantis dix ans.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.18}>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <MagneticButton href="/diagnostic" variant="primary">
                Demander une expertise
              </MagneticButton>
              <MagneticButton href="/notre-expert" variant="ghost">
                Découvrir le cabinet
              </MagneticButton>
            </div>
          </RevealOnScroll>

          {/* Stats compactes en ligne */}
          <RevealOnScroll delay={0.24}>
            <div className="flex items-center gap-8 lg:gap-12 pt-8 border-t border-ipb-rule">
              <div>
                <p className="font-serif text-3xl text-ipb-text font-bold leading-none">
                  <StatCounter value={850} />
                  <span className="text-ipb-orange">+</span>
                </p>
                <p className="text-[10px] text-ipb-light uppercase tracking-[0.16em] mt-2">Chantiers livrés</p>
              </div>
              <div className="h-10 w-px bg-ipb-rule" aria-hidden="true" />
              <div>
                <p className="font-serif text-3xl text-ipb-text font-bold leading-none">
                  <StatCounter value={4.9} decimals={1} /><span className="text-ipb-light text-2xl">/5</span>
                </p>
                <p className="text-[10px] text-ipb-light uppercase tracking-[0.16em] mt-2">Note Google</p>
              </div>
              <div className="h-10 w-px bg-ipb-rule hidden sm:block" aria-hidden="true" />
              <div className="hidden sm:block">
                <p className="font-serif text-3xl text-ipb-text font-bold leading-none">
                  10<span className="text-ipb-light text-2xl"> ans</span>
                </p>
                <p className="text-[10px] text-ipb-light uppercase tracking-[0.16em] mt-2">Décennale AXA</p>
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
              <p className="text-[10px] text-white/40 uppercase tracking-[0.18em] mb-5">Nos expertises</p>
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
