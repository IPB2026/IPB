'use client';

import Link from 'next/link';
import { useRef, useEffect, type ReactNode } from 'react';

/**
 * MagneticButton — bouton avec effet magnétique premium au survol.
 * Le bouton suit légèrement le curseur (translate * 0.18).
 *
 * Respecte prefers-reduced-motion.
 *
 * Cf. IPB_Design_Handoff.md §5.2
 */
interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'dark';
  className?: string;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

const baseClass = 'inline-flex items-center justify-center gap-2 font-semibold text-[13px] tracking-[0.03em] rounded-[3px] transition-all duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ipb-orange';

// Variants WCAG AA — primary/ghost utilisent ipb-orange-d (#9C4717) pour passer
// 4.5:1 avec du texte blanc ou sur cream. L'orange brand #C8601F reste pour
// accents non-textuels (icônes, bordures décoratives, em titres).
const variants = {
  primary: 'bg-ipb-orange-d text-white px-8 py-[15px] hover:bg-[#7E390F] hover:shadow-[0_12px_36px_rgba(156,71,23,0.3)]',
  ghost: 'bg-transparent text-ipb-orange-d border-[1.5px] border-ipb-orange-d px-7 py-[14px] hover:bg-ipb-orange-d hover:text-white',
  dark: 'bg-ipb-navy text-white px-8 py-[15px] hover:bg-[#1a2d40]',
};

export function MagneticButton({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove: EventListener = (e) => {
      const me = e as MouseEvent;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = el.getBoundingClientRect();
      const x = me.clientX - rect.left - rect.width / 2;
      const y = me.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    };

    const handleLeave: EventListener = () => {
      el.style.transform = '';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const classes = `${baseClass} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
