# Étude performance & optimisation du CRM IPB

> Audit du code sous l'angle rapidité serveur et réactivité de l'interface.
> Optimisations classées par rapport gain / risque. Toutes préservent le
> comportement fonctionnel. Date : 23 juin 2026.

---

## 1. Constat général

Le CRM est fonctionnellement riche mais **non optimisé pour la charge** : toutes
les pages sont en `force-dynamic` (36 fichiers) — donc recalculées et re-requêtées
à chaque affichage, sans aucun cache — et plusieurs requêtes **sur-chargent** la
base (`include: { contact: true }` à 37 endroits charge des lignes entières là où
2-3 champs suffisent). Le pilotage relance **~15 requêtes + un calcul par dossier**
à chaque ouverture, et il est **revalidé à chaque mutation** du CRM.

À faible trafic ça reste utilisable, mais la latence est inutilement élevée
(souvent 0,5 à 2 s) et grandira avec le volume de dossiers. Les corrections
ci-dessous sont simples, sûres, et à fort effet.

---

## 2. Optimisations prioritaires

### P0 — Index base de données (gain maximal, risque minimal)

La base n'a que des index mono-colonne. Les filtres combinés fréquents font des
scans inutiles. Manquent notamment :

- `Lead(channel)` — la perf par canal fait un `groupBy` sans index.
- `Activity(type, done, dueAt)` — la file des relances dues (tableau de bord).
- `Devis(status, contactId)` et `Devis(status, sentAt)` — relances/comptages devis.
- `Facture(status, dueDate)` — factures impayées / échéances.
- `Rapport(status, contactId)` — états de rapport.
- `Appointment(status, start)` — visites à clôturer / RDV à venir.

→ Une seule migration ajoute ces index. **Gain : 20-100 ms par requête concernée**,
et surtout une montée en charge saine.

### P0 — Revalidation ciblée

`revalidateCrm()` revalide 6 chemins dont **`/admin/pilotage`** (le plus lourd) à
**chaque** action (devis, facture, note, étape…). Or le pilotage n'a pas besoin
d'être frais à la milliseconde.

→ Ne revalider le pilotage que sur les mutations qui changent vraiment un KPI
(devis accepté, facture payée, nouveau lead), pas sur chaque édition de champ.
**Gain : 100-500 ms économisés par action.**

### P1 — Mettre le pilotage en cache court

`computeKpis()` (≈15 requêtes + calcul par dossier) tourne à **chaque** ouverture.

→ Cache de 60 s (segment `export const revalidate = 60`, ou `unstable_cache` avec
invalidation par tag). **Gain : 0,4-0,8 s par ouverture du pilotage.**

### P1 — Projeter les colonnes utiles (`select` au lieu de `include`)

Les listes (devis, factures, clients, tableau de bord) chargent la ligne `contact`
entière (15+ colonnes) pour n'afficher souvent que le nom.

→ Remplacer `include: { contact: true }` par `select: { id, name }`. **Gain :
20-50 ms par liste + bande passante réduite.**

### P1 — Alléger le calcul de l'entonnoir (pilotage)

`funnelLeads` charge jusqu'à 1000 leads avec leurs devis/factures/rapports/RDV puis
calcule la phase de chacun en mémoire.

→ Ne sélectionner que les champs nécessaires au calcul de phase (déjà partiel),
et plafonner. **Gain : 0,2-0,5 s sur le pilotage.**

### P2 — Factoriser le mapping `computeDossier`

Le même bloc de conversion (Decimal→number, extraction des champs) est **dupliqué
dans 5 fichiers** (fiche, liste, pipeline, tableau de bord, KPI). Risque de bug et
surcoût.

→ Un helper unique `dossierInputFromContact(contact, lead)` dans `lib/crm/dossier.ts`.
Bénéfice surtout **maintenabilité** (un seul endroit à corriger), + léger gain.

### P2 — Skeleton de chargement du pilotage

Les listes/pipeline ont un `loading.tsx` (affichage instantané d'un squelette), pas
le pilotage → écran blanc pendant le calcul.

→ Ajouter `app/admin/(app)/pilotage/loading.tsx`. **Gain : réactivité perçue.**

### P2 — Filtrer les relances closes à la requête

La file des relances peut charger des activités déjà faites avant de filtrer.

→ Ajouter `where: { done: false }` directement. **Gain : 20-50 ms.**

### P3 — Pagination des grandes listes

`take: 300-400` sans pagination. Sans objet à faible volume, mais à prévoir au-delà
de ~500 dossiers (pagination par curseur ou « charger plus »).

---

## 3. Récapitulatif

| # | Optimisation | Gain | Effort | Migration ? |
|---|--------------|------|--------|-------------|
| 1 | Index base (P0) | Élevé | Faible | Oui |
| 2 | Revalidation ciblée (P0) | Élevé | Faible | Non |
| 3 | Cache pilotage 60 s (P1) | Élevé | Faible | Non |
| 4 | `select` au lieu de `include` (P1) | Moyen | Moyen | Non |
| 5 | Alléger l'entonnoir KPI (P1) | Moyen | Faible | Non |
| 6 | Factoriser `computeDossier` (P2) | Faible + maintenabilité | Moyen | Non |
| 7 | Skeleton pilotage (P2) | Réactivité perçue | Faible | Non |
| 8 | Relances `done:false` (P2) | Faible | Faible | Non |
| 9 | Pagination (P3) | Futur | Moyen | Non |

Les n° 1, 2 et 3 donnent l'essentiel du gain pour un effort minime et sans risque.

---

*Étude réalisée le 23 juin 2026 par lecture du code (requêtes Prisma, stratégie de
rendu/cache, composants client).*
