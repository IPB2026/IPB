'use client';

import Script from 'next/script';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
  showVisual?: boolean;
}

/**
 * Composant Breadcrumb avec Schema.org BreadcrumbList
 * 
 * Ce schema améliore l'affichage dans les SERPs avec un fil d'Ariane
 * visible directement dans les résultats Google.
 * 
 * Impact SEO :
 * - Meilleur CTR (fil d'Ariane visible)
 * - Compréhension de la structure du site
 * - Navigation améliorée pour l'utilisateur
 */
export function BreadcrumbSchema({ items, showVisual = true }: BreadcrumbSchemaProps) {
  const fullItems = [
    { name: 'Accueil', href: '/' },
    ...items,
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": fullItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.ipb-expertise.fr${item.href}`,
    })),
  };

  return (
    <>
      <Script
        id={`breadcrumb-${items[items.length - 1]?.name?.toLowerCase().replace(/\s+/g, '-') || 'home'}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      {showVisual && (
        <nav 
          aria-label="Fil d'Ariane" 
          className="bg-slate-100 py-3 px-4 text-sm"
        >
          <ol className="flex flex-wrap items-center gap-1 max-w-7xl mx-auto">
            {fullItems.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight size={14} className="mx-2 text-slate-400" aria-hidden="true" />
                )}
                {index === fullItems.length - 1 ? (
                  <span className="text-slate-600 font-medium" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link 
                    href={item.href}
                    className="text-slate-500 hover:text-orange-600 transition flex items-center gap-1"
                  >
                    {index === 0 && <Home size={14} />}
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
    </>
  );
}

// Breadcrumbs pré-configurés pour les pages principales

export function ExpertiseFissuresBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: 'Expertise Fissures', href: '/expertise/fissures' },
      ]}
    />
  );
}

export function ExpertiseHumiditeBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: 'Expertise Humidité', href: '/expertise/humidite' },
      ]}
    />
  );
}

export function DiagnosticBreadcrumb() {
  return (
    <BreadcrumbSchema
      items={[
        { name: 'Diagnostic Gratuit', href: '/diagnostic' },
      ]}
    />
  );
}

export function BlogBreadcrumb({ title, slug }: { title: string; slug: string }) {
  return (
    <BreadcrumbSchema
      items={[
        { name: 'Blog', href: '/blog' },
        { name: title, href: `/blog/${slug}` },
      ]}
    />
  );
}

export function VilleBreadcrumb({ 
  villeName, 
  villeSlug, 
  service 
}: { 
  villeName: string; 
  villeSlug: string; 
  service: 'fissures' | 'humidite';
}) {
  return (
    <BreadcrumbSchema
      items={[
        { 
          name: service === 'fissures' ? 'Expert Fissures' : 'Expert Humidité', 
          href: `/expertise/${service === 'fissures' ? 'fissures' : 'humidite'}` 
        },
        { 
          name: `${villeName}`, 
          href: `/expert-${service}/${villeSlug}` 
        },
      ]}
    />
  );
}
