# Plan SEO — Enrichissement pages money & maillage (juin 2026)

**Date :** 25 juin 2026
**Branche :** `seo/enrichissement-money-pages-2026-06`
**Origine :** suite du `PLAN_REMEDIATION_CTR_INDEXATION_2026-06.md` (P0 = faire remonter les pages money de la page 2 à la page 1).
**Méthode :** 1 phase = 1 commit isolé · build + typecheck vérifiés à chaque phase · ton éditorial IPB · réutilisation des composants existants · pas de push automatique (revue propriétaire en fin de run).

---

## Constat (audit du 25/06, 3 explorations)

| Page money | FAQ | Liens sortants | Tarifs | Stats | Cas concret | Schema |
|------------|----:|---------------:|:------:|:-----:|:-----------:|--------|
| `expert-fissures-toulouse-31` | 12 | 21 | ✅ | ✅ | ❌ | ProfessionalService + FAQ (pas Breadcrumb) |
| `expert-humidite-toulouse-31` | 9 | 24 | ✅ | ✅ | ❌ | Service + FAQ (pas AggregateRating ni Breadcrumb) |
| `expertise/fissures` ⚠️ | 5 | 1 | ❌ | ❌ | ❌ | Service + FAQ + Breadcrumb |
| `bureau-etude-structure` ⚠️ | 9 | 4 | ❌ | ❌ | ❌ | Service + FAQ |

- **Blog** centralisé (`app/data/blog.ts`, 36 articles) — ajout d'article = 1 objet, OG/schema/sommaire/maillage auto-générés.
- **Lexique** : 6 liens entrants seulement (objectif ≥30). Composants `InternalLinks` / `RelatedLinks` / `RelatedPagesLinks` déjà dispo.
- **Technique** : sitemap/robots propres, 12 redirects 301, bons helpers schema. 404/canoniques en conflit → crawl live.

---

## Phases

- [ ] **Phase 1 — `/expertise/fissures`** : FAQ 5→12, stats, contexte RGA, tarifs indicatifs, maillage (RelatedLinks + pages problème + blog). MAJ schema FAQPage.
- [ ] **Phase 2 — `/bureau-etude-structure-toulouse`** : tarifs/fourchettes, trust/stats, Testimonials, cas concret, process 01-04, contexte local, maillage, Breadcrumb.
- [ ] **Phase 3 — `/expert-humidite-toulouse-31`** : AggregateRating + Breadcrumb, process 01-04, cas concret/avant-après.
- [ ] **Phase 4 — `/expert-fissures-toulouse-31`** : Breadcrumb, cas concret/avant-après, barème tarifaire par type.
- [ ] **Phase 5 — Maillage lexique (6→30+)** : lien footer + liens contextuels `/lexique#ancre` depuis expertise/money/blog.
- [ ] **Phase 6 — Contenu blog** : 1-3 articles piliers sur requêtes info à potentiel, maillés vers les money.
- [ ] **Phase 7 — Nettoyage indexation** : crawl live → 404 (redirects 301) + canoniques en conflit.

## Hors code (actions propriétaire — leviers décisifs page 2→1, 2-4 mois)
- Exécuter `BACKLINKS_ANNUAIRES_2026.xlsx` (annuaires, presse régionale, fédérations).
- Optimiser la fiche Google Business + collecter des avis réels.
- Arbitrer les campagnes Google Ads (en veille).
