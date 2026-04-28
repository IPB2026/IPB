'use client';

import { useEffect, useRef } from 'react';

/**
 * CrackSVG — fissure SVG signature de la marque IPB.
 *
 * Variante "hero" : pleine hauteur, fond navy, fissure blanche animée
 *   au chargement (stroke-dashoffset).
 * Variante "mini" : 18×28px, couleur orange, opacité .45 — décoratif footer.
 *
 * Cf. IPB_Design_Handoff.md §6
 */
interface CrackSVGProps {
  variant?: 'hero' | 'mini';
  className?: string;
}

export function CrackSVG({ variant = 'hero', className = '' }: CrackSVGProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const branchesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (variant !== 'hero') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    // Force reflow
    void path.getBoundingClientRect();

    path.style.transition = 'stroke-dashoffset 2.4s cubic-bezier(.4,0,.15,1) 0.4s';
    path.style.strokeDashoffset = '0';

    // Branches : animation décalée
    const branches = branchesRef.current;
    if (branches) {
      branches.querySelectorAll('path').forEach((branch, i) => {
        const branchLength = (branch as SVGPathElement).getTotalLength();
        branch.style.strokeDasharray = `${branchLength}`;
        branch.style.strokeDashoffset = `${branchLength}`;
        void branch.getBoundingClientRect();
        branch.style.transition = `stroke-dashoffset 1.6s cubic-bezier(.4,0,.15,1) ${1 + i * 0.2}s`;
        branch.style.strokeDashoffset = '0';
      });
    }
  }, [variant]);

  if (variant === 'mini') {
    return (
      <svg
        viewBox="0 0 18 28"
        width="18"
        height="28"
        className={className}
        aria-hidden="true"
        style={{ color: 'var(--ipb-orange)', opacity: 0.45 }}
      >
        <path
          d="M9 0 L7 6 L10 11 L6 17 L9 22 L7 28"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Variante hero : pleine hauteur, fissure blanche semi-transparente
  return (
    <svg
      viewBox="0 0 400 600"
      preserveAspectRatio="xMidYMid meet"
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    >
      {/* Trait principal */}
      <path
        ref={pathRef}
        d="M210 0 L195 60 L218 130 L182 215 L225 295 L180 380 L220 470 L190 600"
        stroke="rgba(255,255,255,0.42)"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Ramifications */}
      <g ref={branchesRef}>
        <path
          d="M218 130 L260 165 L255 205"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.1"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M182 215 L130 245 L122 285"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M225 295 L280 320 L275 360"
          stroke="rgba(255,255,255,0.20)"
          strokeWidth="1.1"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M180 380 L135 410 L125 445"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M220 470 L265 495 L255 535"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
