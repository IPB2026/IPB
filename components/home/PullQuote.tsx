'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { StaggerText } from '@/components/ui/StaggerText';

/**
 * PullQuote — citation éditoriale de Ludovic, fond navy-2.
 *
 * Animations signature :
 *  - Ligne orange verticale qui se dessine de haut en bas (scaleY)
 *  - Guillemets Playfair qui entrent en scale-up avant le texte
 *  - Texte de la citation qui se compose mot-par-mot
 *  - Filet orange du footer qui se dessine de gauche à droite
 *
 * Cf. IPB_Design_Handoff.md §8 — Homepage section 2
 */
export function PullQuote() {
  const reducedMotion = useReducedMotion();

  const draw = (delay: number, duration = 1.4) => ({
    initial: { scaleY: 0 },
    whileInView: { scaleY: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
  });

  const drawX = (delay: number, duration = 1) => ({
    initial: { scaleX: 0 },
    whileInView: { scaleX: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
  });

  const quoteIn = (delay: number) => ({
    initial: { scale: 0.7, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section className="bg-ipb-navy-2 py-24 lg:py-32">
      <div className="max-w-ipb mx-auto px-6 lg:px-12">
        <RevealOnScroll variant="mass">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-3">
              <Eyebrow variant="dark">Notre approche</Eyebrow>
            </div>
            <div className="lg:col-span-9 relative pl-6 lg:pl-10">
              {reducedMotion ? (
                <div className="absolute left-0 top-2 bottom-2 w-px bg-ipb-orange" aria-hidden="true" />
              ) : (
                <motion.div
                  aria-hidden="true"
                  className="absolute left-0 top-2 bottom-2 w-px bg-ipb-orange origin-top"
                  {...draw(0.1)}
                />
              )}
              <blockquote
                className="font-serif text-white leading-[1.18] tracking-[-0.022em]"
                style={{ fontSize: 'clamp(28px, 3.2vw, 44px)' }}
              >
                {reducedMotion ? (
                  <span className="not-italic">«&nbsp;</span>
                ) : (
                  <motion.span className="not-italic inline-block" {...quoteIn(0.4)}>
                    «&nbsp;
                  </motion.span>
                )}
                <StaggerText
                  text="Une fissure, un mur porteur, ce n'est pas un travail de bricolage. C'est de la structure. Notre métier, c'est de regarder, de calculer, et de construire — sans jamais vendre une solution qu'on ne ferait pas chez nous."
                  delay={0.6}
                  stagger={0.025}
                />
                {reducedMotion ? (
                  <span className="not-italic">&nbsp;»</span>
                ) : (
                  <motion.span className="not-italic inline-block" {...quoteIn(0.5)}>
                    &nbsp;»
                  </motion.span>
                )}
              </blockquote>
              <footer className="mt-8 flex items-center gap-3">
                {reducedMotion ? (
                  <div className="h-px w-9 bg-ipb-orange" aria-hidden="true" />
                ) : (
                  <motion.div
                    aria-hidden="true"
                    className="h-px w-9 bg-ipb-orange origin-left"
                    {...drawX(1.2, 0.8)}
                  />
                )}
                <span className="text-white/75 text-[12px] uppercase tracking-[0.14em] font-medium">
                  Ludovic D. — Fondateur, ingénieur structure
                </span>
              </footer>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
