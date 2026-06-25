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

## Phases — LIVRÉES le 25 juin 2026 (branche `seo/enrichissement-money-pages-2026-06`)

- [x] **Phase 1 — `/expertise/fissures`** (`350d7a1`) : FAQ 5→11, section Causes (RGA), bloc Chiffres (StatCounter), Transparence des coûts, maillage 1→~16 liens. Schema FAQPage à jour.
- [x] **Phase 2 — `/bureau-etude-structure-toulouse`** (`3e751bf`) : Breadcrumb, process 01-04, Coût + calculateur, cas concret, Chiffres, Testimonials, maillage 4→~18 liens.
- [x] **Phase 3 — `/expert-humidite-toulouse-31`** (`6e7f940`) : AggregateRating (4.9/18) + Breadcrumb, process 4 étapes, cas concret.
- [x] **Phase 4 — `/expert-fissures-toulouse-31`** (`8eb34fd`) : Breadcrumb, barème par type de fissure, cas concret.
- [x] **Phase 5 — Maillage lexique** (`0d65d21`) : `injectLexiconLinks` (8 termes → /lexique#ancre dans le blog) + lien footer sitewide. Vérifié : liens injectés dans ~54 pages blog → **≥30 atteint**.
- [x] **Phase 6 — Contenu blog** (`e344b18`) : article pilier `/blog/prix-maison-fissuree` (cible « prix maison fissurée », pos 6 GSC), FAQPage auto, maillé money.
- [x] **Phase 7 — Nettoyage indexation** (`4227965`) : audit build (499 routes) → 1 lien mort corrigé (`/expert-mur-porteur` → `/expertise/mur-porteur`) + 301. 0 autre lien mort ; 72 canoniques = consolidation voulue (pas de bug).

## Résultats & limites
- Toutes phases : `tsc --noEmit` + `next build` verts, 1 commit isolé chacune. **Non poussé** (revue propriétaire requise).
- ⚠️ Découvert au passage : le client Prisma local était périmé vs schéma du 23/06 → `npx prisma generate` (les migrations prod sont déjà appliquées, cf. `migrate status`).
- **Hors de portée du code** : les 404 externes & conflits de canonique précis remontés par **GSC** nécessitent l'export GSC (non accessible ici). L'audit build couvre l'intégrité interne (liens + canoniques), qui est saine.
- **Actions propriétaire** (leviers décisifs page 2→1) : backlinks (`BACKLINKS_ANNUAIRES_2026.xlsx`), fiche Google Business + avis, arbitrage Google Ads.

## Hors code (actions propriétaire — leviers décisifs page 2→1, 2-4 mois)
- Exécuter `BACKLINKS_ANNUAIRES_2026.xlsx` (annuaires, presse régionale, fédérations).
- Optimiser la fiche Google Business + collecter des avis réels.
- Arbitrer les campagnes Google Ads (en veille).
