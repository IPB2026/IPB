'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * ParallaxImage — image avec parallax doux scroll-tied.
 *
 * L'image translate verticalement à un rythme légèrement différent du scroll
 * (facteur 0.15 par défaut = ~15% du scroll). Effet de profondeur subtil,
 * jamais agressif.
 *
 * Wrapper en overflow-hidden + image scale 1.18 pour combler la translation.
 *
 * Respecte prefers-reduced-motion (translate annulée).
 */
interface ParallaxImageProps {
  src: string;
  alt: string;
  /** Intensité du parallax (0 = pas de parallax, 0.15 par défaut, max ~0.3) */
  intensity?: number;
  sizes?: string;
  className?: string;
  imageClassName?: string;
}

export function ParallaxImage({
  src,
  alt,
  intensity = 0.15,
  sizes,
  className = '',
  imageClassName = '',
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const range = 60 * intensity;
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y: reducedMotion ? 0 : y, scale: 1.18 }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={`object-cover ${imageClassName}`}
          loading="lazy"
        />
      </motion.div>
    </div>
  );
}
