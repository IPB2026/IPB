# Système de design — Back-office IPB (/admin)

> Objectif : niveau HubSpot / Attio / Pipedrive. Pattern **data-dense + drill-down**.
> Sobre, dense mais lisible, professionnel. Light theme.

## Tokens

| Rôle | Valeur Tailwind / Hex |
|---|---|
| CTA / primaire | `orange-600` #EA580C → hover `orange-700` |
| Sidebar (fond) | `slate-900` #0F172A (accent actif orange) |
| Canvas appli | `slate-50` #F8FAFC |
| Surfaces / cartes | `white`, bordure `slate-200`, `rounded-xl` |
| Texte titres | `slate-900` |
| Texte courant | `slate-600` |
| Texte discret | `slate-400` |
| Focus | ring `orange-200` + bordure `orange-500` |

**Statuts (pastille à point coloré, jamais d'emoji) :**
- Tier : Chaud `orange-500` · Tiède `amber-500` · Froid `slate-400`
- Étape : Nouveau `blue` · À rappeler `orange` · RDV `violet` · Visite `cyan` · Devis `amber` · Gagné `emerald` · Perdu `slate`

## Typographie
- **Inter** (next/font) pour toute l'UI. Chiffres KPI en `tabular-nums`.
- Échelle : page title `text-2xl font-semibold` · section `text-lg font-semibold` ·
  label `text-sm font-medium` · meta `text-xs` · KPI `text-3xl font-bold`.
- Playfair : réservé au wordmark/login, pas dans les écrans denses.

## Espacement & layout
- Grille 8px. Contenu `p-6 lg:p-8`. Cartes `p-5`. Cellules table `px-4 py-3`.
- Sidebar `w-64` (drawer sur mobile). Largeur de contenu fluide.

## Composants (primitives)
- **Sidebar** : wordmark, groupes de nav, item actif = barre d'accent orange + fond subtil.
- **PageHeader** : titre + sous-titre + actions à droite (+ breadcrumb optionnel).
- **StatCard** : label, valeur (tabular-nums), icône en chip teinté, delta optionnel.
- **DataTable** : header collant, hover de ligne `bg-slate-50`, lignes cliquables,
  nombres alignés à droite, pastilles de statut, avatar initiales. `overflow-x-auto`,
  bascule carte sur mobile.
- **StatusPill** : point coloré + libellé.
- **Avatar** : initiales sur fond teinté déterministe.
- **EmptyState** : icône cerclée + titre + description + CTA.
- **Forms** : inputs `h-10`, focus ring, groupes, bouton plein largeur sur mobile.

## Interaction / a11y
- `cursor-pointer` sur tout cliquable, hover `transition-colors` (~150-200ms UI).
- Animations d'entrée discrètes (≤ celles du site, cf. charte motion éditoriale).
- `prefers-reduced-motion` : neutralise les transitions.
- Focus visibles, labels reliés, contraste ≥ 4.5:1, cibles tactiles ≥ 44px sur mobile.
