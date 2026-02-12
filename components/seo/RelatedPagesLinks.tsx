'use client';

import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';

interface RelatedPage {
  href: string;
  label: string;
  description?: string;
}

interface RelatedPagesLinksProps {
  title?: string;
  pages: RelatedPage[];
  className?: string;
  variant?: 'grid' | 'list' | 'compact';
}

/**
 * Composant de maillage interne SEO
 * 
 * Ce composant améliore le maillage interne en ajoutant des liens
 * contextuels vers des pages liées, améliorant ainsi :
 * - La découverte des pages par les robots
 * - La distribution du PageRank
 * - L'expérience utilisateur
 */
export function RelatedPagesLinks({ 
  title = "Voir aussi", 
  pages, 
  className = "",
  variant = "grid"
}: RelatedPagesLinksProps) {
  if (pages.length === 0) return null;

  if (variant === 'compact') {
    return (
      <nav className={`py-6 ${className}`} aria-label="Pages liées">
        <div className="flex flex-wrap gap-2">
          {pages.map((page, index) => (
            <Link
              key={index}
              href={page.href}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-slate-100 hover:bg-orange-100 text-slate-700 hover:text-orange-700 rounded-full transition"
            >
              <MapPin size={12} />
              {page.label}
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  if (variant === 'list') {
    return (
      <nav className={`py-8 ${className}`} aria-label="Pages liées">
        <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
        <ul className="space-y-2">
          {pages.map((page, index) => (
            <li key={index}>
              <Link
                href={page.href}
                className="flex items-center gap-2 text-slate-600 hover:text-orange-600 transition group"
              >
                <ArrowRight size={14} className="text-orange-500 group-hover:translate-x-1 transition-transform" />
                <span>{page.label}</span>
                {page.description && (
                  <span className="text-sm text-slate-400">— {page.description}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  // Variant 'grid' par défaut
  return (
    <nav className={`py-12 bg-slate-50 ${className}`} aria-label="Pages liées">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">{title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pages.map((page, index) => (
            <Link
              key={index}
              href={page.href}
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md border border-slate-200 hover:border-orange-300 transition group"
            >
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-orange-500" />
                <span className="font-medium text-slate-700 group-hover:text-orange-600 transition">
                  {page.label}
                </span>
              </div>
              {page.description && (
                <p className="text-sm text-slate-500 mt-1">{page.description}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

/**
 * Génère les pages liées pour une ville donnée (expert fissures)
 */
export function getRelatedFissuresPages(currentVille: string, allVilles: string[]): RelatedPage[] {
  const otherVilles = allVilles.filter(v => v !== currentVille).slice(0, 6);
  
  return [
    // Liens vers pages services
    { href: '/expertise/fissures', label: 'Nos solutions fissures', description: 'Toutes nos méthodes' },
    { href: '/diagnostic', label: 'Diagnostic gratuit', description: 'Évaluez votre situation' },
    // Liens vers autres villes
    ...otherVilles.map(ville => ({
      href: `/expert-fissures/${ville}`,
      label: `Expert fissures ${ville.charAt(0).toUpperCase() + ville.slice(1).replace(/-/g, ' ')}`,
    })),
  ];
}

/**
 * Génère les pages liées pour une ville donnée (expert humidité)
 */
export function getRelatedHumiditePages(currentVille: string, allVilles: string[]): RelatedPage[] {
  const otherVilles = allVilles.filter(v => v !== currentVille).slice(0, 6);
  
  return [
    // Liens vers pages services
    { href: '/expertise/humidite', label: 'Nos solutions humidité', description: 'Toutes nos méthodes' },
    { href: '/diagnostic', label: 'Diagnostic gratuit', description: 'Évaluez votre situation' },
    // Liens vers autres villes
    ...otherVilles.map(ville => ({
      href: `/expert-humidite/${ville}`,
      label: `Expert humidité ${ville.charAt(0).toUpperCase() + ville.slice(1).replace(/-/g, ' ')}`,
    })),
  ];
}
