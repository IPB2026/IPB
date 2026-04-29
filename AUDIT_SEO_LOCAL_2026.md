# AUDIT SEO LOCAL — IPB EXPERTISE

**Date** : 29 avril 2026
**Objectif** : Plus de trafic organique sur Toulouse / Haute-Garonne (31)
**Période** : Mai → Juillet 2026 (3 mois)

---

## TL;DR

Le SEO on-page d'IPB est **techniquement excellent** (62 pages avec metadata, 47 avec Schema.org, sitemap structuré en hub & spoke, pages locales pour 44 villes + 10 quartiers Toulouse). Les vrais leviers restants ne sont pas dans la création de pages mais dans la **consolidation** de ce qui existe et l'**activation** de signaux locaux concrets (avis, FAQ schema dynamique, maillage contextuel).

**3 chantiers prioritaires sur 3 mois** :
1. **Consolider l'architecture URL locale** (résoudre la cannibalisation `/expert-fissures/[ville]` ↔ `/villes/[ville]`)
2. **Étendre FAQPage JSON-LD aux routes dynamiques** pour gagner des rich snippets sur 44 villes d'un coup
3. **Orchestrer Google Business Profile + avis** (pas dans le code mais dans le quotidien — impact local pack)

---

## 1. État des lieux

### Ce qui est solide

- **62 pages indexables**, **100 % avec metadata** (title + description + canonical + OG/Twitter)
- **47 pages avec structured data** Schema.org (`ProfessionalService`, `LocalBusiness`, `FAQPage`, `AggregateRating`, `GeoCoordinates`...)
- **Architecture locale dense** : pages dédiées Toulouse/Montauban (31, 82) + 44 villes générées dynamiquement + 10 quartiers Toulouse + 6 départements
- **Topic clusters Hub & Spoke** opérationnels sur fissures (5 spokes) et humidité (8 spokes)
- **Sitemap.ts** structuré par priorités hiérarchiques (1.0 accueil → 0.3 légales)
- **NAP cohérent** sur les pages principales (13 rue du Recteur Dottin, 31100 Toulouse / 05 82 95 33 75 / contact@ipb-expertise.fr)

### État des docs SEO archivées

| Doc | Date | Synthèse |
|---|---|---|
| `AUDIT_SEO_COMPLET_2025.md` | jan 2025 | Audit auto-déclaré 150/150. Optimisme à confirmer par le trafic réel. |
| `STRATEGIE_SEO_ORGANIQUE.md` | jan 2026 | Plan 17 articles, FAQ schema, maillage. 1500-3000 visites/mois prévus en 12 mois. |
| `PLAN_EDITORIAL_SEO_3_MOIS.md` | jan 2026 | 24 articles Mars-Mai 2026, +50 % trafic visé. **À confronter au réalisé.** |
| `PAGES_VILLES_SEO.md` | jan 2026 | 15 pages villes initiales (passées à 44 depuis). |
| `SEO_OPTIMISATIONS.md` | jan 2026 | Checklist technique + 10 articles + KPIs mensuels. |

---

## 2. Problèmes identifiés

### Problème 1 — Cannibalisation `/expert-fissures/[ville]` ↔ `/villes/[ville]`

Deux routes dynamiques génèrent du contenu très similaire pour les **mêmes** 44 villes (mêmes H1 reformulés, mêmes mots-clés `{ville}`). Cas critique pour Toulouse, où **trois URLs** se concurrencent :
- `/expert-fissures-toulouse-31` (statique)
- `/expert-fissures/toulouse` (dynamique)
- `/villes/toulouse` (dynamique)

Même avec des canonicals corrects, cela dilue les signaux Google et complique les rapports Search Console.

### Problème 2 — FAQPage schema manquant sur les routes dynamiques

Les pages `/expert-fissures-toulouse-31` et `/expert-humidite-toulouse-31` ont du `FAQPage` JSON-LD (5 questions). Mais **aucune** route dynamique `[ville]` ou `[quartier]` n'en a, alors que le contenu de FAQ existe dans le rendu HTML. Conséquence : Google ne génère pas de rich snippets « accordéon » dans les SERPs locales (Colomiers, Muret, Blagnac...). **+30 à 50 % CTR potentiel** sur ces requêtes longue traîne.

### Problème 3 — `AggregateRating` absent sur les routes dynamiques

Les pages Toulouse principales affichent `"aggregateRating": {"ratingValue": "4.9", "reviewCount": "15"}`. Les routes `[ville]` n'ont que `LocalBusiness` sans rating → pas d'étoiles dans les SERPs locales.

### Problème 4 — Pas de social proof hyper-local

Pas de testimonials/photos avant-après géolocalisés par commune sur les pages dynamiques. Les docs `STRATEGIE_SEO_ORGANIQUE` prévoyaient des études de cas locales — non implémentées sur le rendu actuel des pages villes/quartiers.

### Problème 5 — Maillage contextuel blog ↔ pages locales insuffisant

`/expert-fissures-toulouse-31` ne linke pas vers les articles blog associés (« Fissure en escalier », « Microfissure quand s'inquiéter », « Fissure sécheresse indemnisation »), pourtant tous présents dans `app/data/blog.ts`. Le composant `<InternalLinks>` est utilisé sur les pages villes mais pas systématiquement vers le blog.

### Bug latent (signalé en session précédente)

`app/departements/haute-garonne/page.tsx:160` référence `/images/pattern-dots.svg` qui n'existe pas dans `public/images/`. Erreur 404 silencieuse à corriger.

---

## 3. Plan d'action — 7 leviers priorisés

### Priorité 1 — High impact, à traiter sur le mois 1

#### Levier #1 — Consolider l'architecture URL locale

**Problème** : 3 URLs pour Toulouse fissures, 2 URLs pour chaque autre ville.
**Action** : décider d'une architecture dominante.

Recommandation : garder `/expert-fissures/[ville]` (URL la plus parlante côté SEO local français : « expert fissures toulouse ») et faire des redirects 301 depuis `/villes/[ville]`. Pour Toulouse spécifiquement, on garde la page statique `/expert-fissures-toulouse-31` comme **page d'autorité** et on 301 depuis `/expert-fissures/toulouse` vers elle.

**Fichiers concernés** : `next.config.js` (redirects), `app/sitemap.ts` (retirer doublons), maillage interne dans `lib/blog-helpers.ts` et composants `InternalLinks`.

**Effort** : Moyen (M) — 2-3h
**Impact** : Fort

#### Levier #2 — FAQPage JSON-LD sur toutes les routes `[ville]` et `[quartier]`

**Problème** : rich snippets manquants sur 44 villes + 10 quartiers.
**Action** : extraire la FAQ existante dans le contenu des pages dynamiques, la sérialiser en `FAQPage` JSON-LD (3-5 questions par ville, avec variantes locales du type « *Pourquoi les maisons fissurent à Colomiers* »).

**Fichiers concernés** : `app/expert-fissures/[ville]/page.tsx`, `app/villes/[ville]/page.tsx`, `app/quartiers/[quartier]/page.tsx`. Centraliser un helper `generateLocalFAQ(ville)` dans `lib/seo/`.

**Effort** : Petit (S) — 1-2h
**Impact** : Fort

#### Levier #3 — Orchestrer Google Business Profile + avis (hors code)

**Problème** : Google Business Profile existe mais sans process pour générer/répondre aux avis. Le local pack (3 fiches sous la carte) capte 30-40 % du trafic local.
**Actions** :
- Email automatique J+7 post-intervention avec lien d'avis Google
- QR code « Laisser un avis » sur factures et CR de chantier
- Réponse à 100 % des avis sous 48h
- 2 posts Google Business par semaine (chantier, conseil saison, alerte)
- Objectif : **30 avis distincts** sur 6 mois

**Effort** : Moyen (M) — process à mettre en place (template email, QR, calendrier post)
**Impact** : Fort

### Priorité 2 — Mois 2

#### Levier #4 — `AggregateRating` sur les routes `[ville]`

Ajouter `"aggregateRating"` aux JSON-LD `LocalBusiness` des pages dynamiques (cohérent avec ce qui existe déjà sur Toulouse statique). Source des données : à terme synchroniser avec les avis Google réels via l'API Google My Business.

**Effort** : S — 30 min
**Impact** : Moyen

#### Levier #5 — Études de cas hyper-locales sur top 10 villes

Sur Toulouse, Colomiers, Muret, Blagnac, Tournefeuille, Montauban, Albi, Castres, Auch, Pamiers : ajouter 2-3 testimonials clients géolocalisés (« *M. X. à Colomiers — fissure en escalier de 3 mm dans la chambre* ») + photos avant/après.

**Fichiers concernés** : créer `app/data/testimonials-locaux.ts`, intégrer dans `app/villes/[ville]/page.tsx` et `app/quartiers/[quartier]/page.tsx`.

**Effort** : M — dépend du nombre de cas réels disponibles
**Impact** : Moyen (conversion +15 %, secondairement SEO via UGC structuré)

### Priorité 3 — Mois 3

#### Levier #6 — Enrichir FAQs avec questions hyper-locales

Pour chaque grande ville, ajouter 3-5 questions géo-spécifiques :
- « Risque retrait-gonflement des argiles à Muret »
- « Pourquoi tant de fissures à Colomiers en 2024 »
- « Tassement différentiel à Toulouse Saint-Cyprien »

Source de données : carte BRGM RGA + arrêtés CAT-NAT par commune (déjà partiellement utilisés dans `STRATEGIE_LEADS_PREMIUM.md`).

**Effort** : S
**Impact** : Moyen

#### Levier #7 — Maillage contextuel blog ↔ pages locales

Sur les 6 pages Toulouse/31 majeures, ajouter une section « Aller plus loin » avec 2-3 liens vers articles blog pertinents (`/fissure-en-escalier-causes`, `/microfissure-quand-sinquieter`, `/fissure-secheresse-indemnisation`...).

**Effort** : S
**Impact** : Moyen

---

## 4. Stratégie backlinks (résumé — voir `BACKLINKS_ANNUAIRES_2026.xlsx`)

L'objectif backlinks priorité 1 est **les annuaires locaux et métier** (low-effort, gain rapide). Liste exhaustive avec colonnes de suivi dans le tableur dédié. Trois grandes catégories ciblées :

1. **Annuaires généralistes haute autorité** (Pages Jaunes, Yelp, Hoodspot, etc.)
2. **Annuaires locaux Toulouse / Occitanie** (CCI Toulouse, Mairie, Toulouse-City, Made in Toulouse)
3. **Annuaires métier bâtiment / structure** (AAAFA, OPQTECC, Houzz, Travaux.com, Habitatpresto, fédérations)

Cible : **20-30 backlinks de qualité** sur 3 mois, avec NAP strictement identique partout (cohérence locale Google).

---

## 5. Mesures et KPIs

### À tracker dans Google Search Console (mensuel)

- Position moyenne sur les requêtes type « expert fissure toulouse », « mur porteur toulouse », « expert humidité toulouse » + variantes villes
- CTR sur les pages locales (cible : >5 %)
- Impressions / clics sur les routes `[ville]` et `[quartier]`
- Couverture indexation (toutes les pages indexées ? aucune en exclusion ?)

### À tracker dans Google Analytics

- Trafic organique entrant sur `/expert-fissures-toulouse-31`, `/expert-humidite-toulouse-31`, `/villes/*`, `/quartiers/*`
- Taux de conversion par page locale (formulaire de contact, RDV, appel téléphonique tracké)
- Taux de rebond pages locales (cible : <60 %)

### Cibles 6 mois (réalistes)

- **300-600 visites/mois** depuis Toulouse / 31 organique
- **50-80 leads/mois** issus du SEO local (3-5 % conversion sur les pages locales)
- **30 avis Google** répartis sur Toulouse + top villes
- **20-30 backlinks** depuis annuaires + partenaires

---

## 6. Prochaines actions concrètes (cette semaine)

1. **Lire ce document et challenger les priorités** (15 min)
2. **Décider de l'architecture URL** consolidée (Levier #1) — discussion avant implémentation (30 min)
3. **Lancer les soumissions annuaires** Priorité 1 du tableur (`BACKLINKS_ANNUAIRES_2026.xlsx`) — 1-2h
4. **Mettre en place le process avis Google** (template email J+7, QR factures) — 1h

Ensuite, on attaque les leviers #1 et #2 en code.
