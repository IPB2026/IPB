'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * StaggerText — affiche un texte mot-par-mot avec entrée en cascade au scroll.
 *
 * Utilisé pour les pull-quotes, légendes éditoriales, ou tout passage où l'on
 * souhaite donner une cadence de lecture (la phrase se compose sous l'œil).
 *
 * Respecte prefers-reduced-motion (entrée instantanée).
 */
interface StaggerTextProps {
  text: string;
  /** Délai de début (avant le premier mot) en secondes */
  delay?: number;
  /** Décalage entre chaque mot (par défaut 30ms) */
  stagger?: number;
  /** Distance verticale d'entrée (par défaut 14px) */
  distance?: number;
  /** Élément JSX optionnel à insérer après le texte (ex: guillemet fermant) */
  trailing?: ReactNode;
  className?: string;
}

export function StaggerText({
  text,
  delay = 0,
  stagger = 0.03,
  distance = 14,
  trailing,
  className = '',
}: StaggerTextProps) {
  const reducedMotion = useReducedMotion();
  const words = text.split(' ');

  if (reducedMotion) {
    return (
      <span className={className}>
        {text}
        {trailing}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -80px 0px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: distance },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
      {trailing}
    </motion.span>
  );
}
