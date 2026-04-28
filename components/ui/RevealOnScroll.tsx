'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * RevealOnScroll — anime un bloc à son entrée dans le viewport.
 *
 * Pattern signature IPB :
 * État initial : opacity 0, translateY(28px)
 * État final : opacity 1, transform none
 * Transition : 0.9s cubic-bezier(.16,1,.3,1) avec délai paramétrable
 * IntersectionObserver threshold 0.08
 *
 * Respecte prefers-reduced-motion.
 *
 * Cf. IPB_Design_Handoff.md §7
 */
interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number; // en secondes (échelonner 0, 0.06, 0.12, etc.)
  direction?: 'up' | 'left' | 'right' | 'none';
  className?: string;
}

export function RevealOnScroll({
  children,
  delay = 0,
  direction = 'up',
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
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const initialTransform =
    direction === 'up' ? 'translateY(28px)' :
    direction === 'left' ? 'translateX(-28px)' :
    direction === 'right' ? 'translateX(28px)' :
    'none';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: initialTransform,
        transition: `opacity 0.9s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.9s cubic-bezier(.16,1,.3,1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
