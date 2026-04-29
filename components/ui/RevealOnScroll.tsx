'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * RevealOnScroll — anime un bloc à son entrée dans le viewport.
 *
 * Variants d'amplitude pour créer une hiérarchie cinétique :
 *   - subtle    : 12px / 0.6s     — textes courants, listes, légendes
 *   - default   : 28px / 0.9s     — comportement historique (compat)
 *   - editorial : 40px + scale    — H2/H3 Playfair, titres de section
 *   - mass      : 60px / 1.2s     — pull-quotes, stats monumentaux
 *
 * Toutes respectent prefers-reduced-motion.
 */
type Variant = 'subtle' | 'default' | 'editorial' | 'mass';
type Direction = 'up' | 'left' | 'right' | 'none';

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  variant?: Variant;
  className?: string;
}

const VARIANTS: Record<Variant, { distance: number; duration: number; scale?: number }> = {
  subtle:    { distance: 12, duration: 0.6 },
  default:   { distance: 28, duration: 0.9 },
  editorial: { distance: 40, duration: 1.1, scale: 0.985 },
  mass:      { distance: 60, duration: 1.2, scale: 0.97 },
};

export function RevealOnScroll({
  children,
  delay = 0,
  direction = 'up',
  variant = 'default',
  className = '',
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'none';
          observer.unobserve(el);
          // Libère le layer GPU une fois la transition jouée — évite
          // d'accumuler des composites pour des éléments figés
          // (cause perçue de "vibration" sur les pages chargées).
          const cleanup = () => {
            el.style.willChange = 'auto';
            el.removeEventListener('transitionend', cleanup);
          };
          el.addEventListener('transitionend', cleanup);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { distance, duration, scale } = VARIANTS[variant];

  const translate =
    direction === 'up'    ? `translateY(${distance}px)` :
    direction === 'left'  ? `translateX(-${distance}px)` :
    direction === 'right' ? `translateX(${distance}px)` :
    '';

  const initialTransform = scale
    ? `${translate} scale(${scale})`.trim()
    : translate || 'none';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: initialTransform,
        transition: `opacity ${duration}s cubic-bezier(.16,1,.3,1) ${delay}s, transform ${duration}s cubic-bezier(.16,1,.3,1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
