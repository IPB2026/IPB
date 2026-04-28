'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { StatCounter } from '@/components/ui/StatCounter';

/**
 * StatItem — chiffre monumental fond navy avec animations d'inscription.
 *
 * - Filet vertical orange à gauche qui se dessine de haut en bas (scaleY 0→1)
 * - Chiffre en blur-in (filter blur 12px → 0) — effet "gravure éditoriale"
 *
 * Respecte prefers-reduced-motion.
 */
interface StatItemProps {
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
  sublabel: string;
  delay?: number;
}

export function StatItem({
  value,
  decimals = 0,
  suffix,
  label,
  sublabel,
  delay = 0,
}: StatItemProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative text-center lg:text-left lg:pl-8">
      {/* Filet vertical orange qui se dessine au reveal */}
      {!reducedMotion && (
        <motion.span
          aria-hidden="true"
          className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-ipb-orange-l origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      {reducedMotion && (
        <span aria-hidden="true" className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-white/10" />
      )}

      <motion.p
        className="font-serif text-white font-bold leading-[0.95] mb-4"
        style={{ fontSize: 'clamp(60px, 6.5vw, 100px)', letterSpacing: '-0.03em' }}
        initial={reducedMotion ? false : { opacity: 0, filter: 'blur(12px)', y: 20 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, filter: 'blur(0px)', y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <StatCounter value={value} decimals={decimals} />
        <span className="text-ipb-orange-l">{suffix}</span>
      </motion.p>
      <p className="text-[13px] text-white uppercase tracking-[0.14em] font-medium mb-1">
        {label}
      </p>
      <p className="text-[11px] text-white/40 tracking-wide">{sublabel}</p>
    </div>
  );
}
