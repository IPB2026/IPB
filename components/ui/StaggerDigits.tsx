'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * StaggerDigits — entrée chiffre par chiffre avec blur-in.
 *
 * Pensé pour les numéros de téléphone monumentaux Playfair :
 * chaque caractère se compose en se nettant (blur 8px → 0).
 *
 * Respecte prefers-reduced-motion.
 */
interface StaggerDigitsProps {
  text: string;
  delay?: number;
  /** Décalage entre chaque caractère (par défaut 60ms) */
  stagger?: number;
  className?: string;
}

export function StaggerDigits({
  text,
  delay = 0,
  stagger = 0.06,
  className = '',
}: StaggerDigitsProps) {
  const reducedMotion = useReducedMotion();
  const chars = Array.from(text);

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, filter: 'blur(8px)', y: 8 },
            visible: {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
