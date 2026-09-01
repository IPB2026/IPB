import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import sitemap from '@/app/sitemap';

/**
 * Garde-fou anti-dérive (LOT 3bis, 2026-08).
 *
 * Deux fichiers maintenaient leur propre copie des listes d'URL du site :
 * scripts/submit-indexnow.ts et app/plan-site/page.tsx. Les deux ont dérivé —
 * le script poussait vers IndexNow des URL redirigées depuis des mois, et le
 * plan du site omettait les deux pages les plus positionnées du domaine.
 *
 * submit-indexnow dérive désormais de app/sitemap.ts. Le plan du site, lui,
 * reste éditorial : ses libellés sont écrits à la main et n'ont pas d'équivalent
 * mécanique dans le sitemap. Ce test le tient honnête à sa place — il ne peut
 * plus mentir sans faire échouer la CI.
 */
const BASE = 'https://www.ipb-expertise.fr';

function sitemapPaths(): Set<string> {
  return new Set(sitemap().map((e) => String(e.url).replace(BASE, '') || '/'));
}

function planSitePaths(): string[] {
  const src = readFileSync('app/plan-site/page.tsx', 'utf-8');
  return Array.from(src.matchAll(/href: '(\/[^']*)'/g)).map((m) => m[1]);
}

describe('cohérence plan du site ↔ sitemap', () => {
  it('ne référence aucune URL absente du sitemap', () => {
    const sm = sitemapPaths();
    const orphelins = planSitePaths().filter((p) => !sm.has(p));
    expect(orphelins, `URL du plan du site absentes du sitemap : ${orphelins.join(', ')}`).toEqual([]);
  });

  it('couvre les pages piliers et tous les articles de blog', () => {
    const plan = new Set(planSitePaths());
    const manquants = [...sitemapPaths()].filter(
      (p) => p.startsWith('/blog/') && !plan.has(p)
    );
    expect(manquants, `articles absents du plan du site : ${manquants.join(', ')}`).toEqual([]);
  });
});
