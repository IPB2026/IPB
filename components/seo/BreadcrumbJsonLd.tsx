import { BREADCRUMB_LABELS } from '@/lib/seo/breadcrumb-labels';

/**
 * BreadcrumbList en JSON-LD seul, sans rendu visuel.
 *
 * BreadcrumbSchema (composant client, avec fil d'Ariane visible) reste utilisé
 * là où le fil fait partie du design. Ici on ne veut que le balisage : les
 * rich results de fil d'Ariane restent pleinement supportés par Google, à la
 * différence du FAQPage déprécié en mai 2026, et 35 pages du site n'en avaient
 * aucun. Les ajouter ne doit rien changer à l'apparence des pages.
 *
 * Le fil est dérivé du chemin : /expertise/fissures → Accueil › Expertise ›
 * Diagnostic de fissures. Les libellés viennent d'une table unique
 * (lib/seo/breadcrumb-labels.ts) pour qu'ils ne divergent pas d'une page à
 * l'autre — la leçon des listes dupliquées.
 */
const BASE = 'https://www.ipb-expertise.fr';

function libelle(segment: string): string {
  if (BREADCRUMB_LABELS[segment]) return BREADCRUMB_LABELS[segment];
  return segment
    .split('-')
    .map((m, i) => (i === 0 ? m.charAt(0).toUpperCase() + m.slice(1) : m))
    .join(' ');
}

export function BreadcrumbJsonLd({ path, dernier }: { path: string; dernier?: string }) {
  const segments = path.split('/').filter(Boolean);
  const items = [{ name: 'Accueil', item: BASE }];

  segments.forEach((seg, i) => {
    const chemin = '/' + segments.slice(0, i + 1).join('/');
    const estDernier = i === segments.length - 1;
    items.push({
      name: estDernier && dernier ? dernier : libelle(seg),
      item: BASE + chemin,
    });
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
