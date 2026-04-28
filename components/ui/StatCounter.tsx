'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * StatCounter — compteur animé qui se déclenche à l'entrée dans le viewport.
 *
 * Easing : 1 - Math.pow(1 - p, 4) (ease-out quartique)
 * Durée : 1800ms par défaut.
 * Respecte prefers-reduced-motion (affiche directement la valeur finale).
 *
 * Cf. IPB_Design_Handoff.md §7
 */
interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function StatCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1800,
  decimals = 0,
  className = '',
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const animate = (t: number) => {
            const p = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            setDisplay(value * eased);
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  const formatted = decimals > 0
    ? display.toFixed(decimals)
    : Math.floor(display).toString();

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
