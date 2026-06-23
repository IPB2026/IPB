# Étude stratégique du CRM IPB — nouvelles règles & idées

> Lecture croisée : **directeur commercial spécialisé en pathologies du bâtiment**
> + **ingénieur logiciel senior**. Objectif : transformer un CRM déjà solide en
> moteur de croissance et de fiabilité. Date : 23 juin 2026.

---

## 1. Lecture stratégique

IPB vend des **missions de diagnostic** (fissures, humidité, expertise avant achat,
mur porteur), ~80 % des leads par téléphone, positionnement **premium**, modèle de
**coordination** (le réseau exécute). Trois vérités commerciales structurent les
priorités :

- **Le bouche-à-oreille et l'avis Google sont la 1ʳᵉ source.** Chaque rapport livré
  est une occasion d'avis → c'est un actif à industrialiser.
- **La sécheresse pilote la demande fissures.** La donnée CatNat (commune reconnue)
  est un signal de priorité ET un argument assurance décisif.
- **La branche « suivi travaux » (~10 %) est la plus rentable** mais la moins
  outillée — c'est le gisement de marge.

---

## 2. Idées commerciales (pathologies du bâtiment)

| # | Idée | Pourquoi ça rapporte | Effort |
|---|------|----------------------|--------|
| C1 | **Moteur CatNat / sécheresse** : croiser le code postal du lead avec les communes en arrêté CatNat → tag « éligible assurance » + priorité + script dédié. | Les dossiers fissures CatNat convertissent mieux (prise en charge assurance) et justifient le premium. | Moyen |
| C2 | **Séquence « suivi travaux »** : dès qu'un rapport porte une estimation budgétaire, déclencher une séquence dédiée (devis travaux + relances + RDV de cadrage). | Capture les 10 % à forte marge aujourd'hui sous-exploités. | Moyen |
| C3 | **Moteur d'avis Google piloté** : suivre qui a reçu/ouvert/laissé un avis, relancer 1 fois, segmenter par satisfaction (NPS 1 question). | Plus d'avis = plus de leads entrants, à coût zéro. | Faible |
| C4 | **Parrainage agents immobiliers** (expertise achat) : tracer le `mandataire`/apporteur, mesurer le CA par apporteur, animer le top 5. | L'expertise avant achat est un canal B2B récurrent et fidélisable. | Moyen |
| C5 | **Analyse perte (win/loss)** : motifs de refus structurés (prix, délai, concurrent, abandon) → tableau de bord des causes. | Sait pourquoi on perd → ajuste prix/discours, +points de conversion. | Faible |
| C6 | **Vélocité du pipeline** : mesurer le temps passé par étape (devis→validation, visite→facture, paiement→rapport) et alerter sur les goulets. | Réduit les délais = trésorerie plus rapide + meilleure expérience. | Moyen |
| C7 | **Réactivation saisonnière** : avant la saison sèche, recontacter les prospects dormants fissures (cf. N4) avec un message ciblé. | Réveille un stock de leads déjà payés (acquisition). | Faible |
| C8 | **Bandes de prix intelligentes** : panier moyen par service × zone → fourchette suggérée à la création du devis. | Évite de sous/sur-coter, homogénéise le premium. | Faible |

---

## 3. Idées techniques (architecture & fiabilité)

| # | Idée | Bénéfice | Effort |
|---|------|----------|--------|
| T1 | **Horodatage des transitions de phase** (table `PhaseEvent` ou champs) → calcul exact de la vélocité (C6) et des cohortes. | Données de pilotage fiables, sans recalcul fragile. | Moyen |
| T2 | **Qualification & motifs en colonnes** (sortir de `payload` JSON) : `LeadQualification`, `lostReason` structuré. | Requêtable, analysable (C5), plus de blob. | Moyen |
| T3 | **Encaissement automatisé** (lien de paiement Stripe/GoCardless) : le paiement déclenche tout seul la suite (aujourd'hui saisie manuelle). | Moins de saisie, trésorerie accélérée, 0 oubli. | Élevé |
| T4 | **Réponses e-mail entrantes → activité** : parser les réponses clients et les rattacher au dossier (et couper les relances auto). | Le dossier reflète la vraie conversation, anti-relance inutile. | Élevé |
| T5 | **Observabilité** : alerting sur échecs cron / e-mail / IA (Sentry déjà présent via `instrumentation.ts`) + tableau de santé. | On sait quand un automatisme casse, avant le client. | Faible |
| T6 | **Moteur de règles déclaratif** : centraliser les règles métier (seuils, délais, SLA) dans une config unique versionnée. | Modifier une règle sans toucher 5 fichiers ; testable. | Moyen |
| T7 | **Tests du moteur métier** : étendre les tests unitaires (computeDossier déjà couvert) aux relances et aux nouvelles règles N3-N10. | Évite les régressions de cohérence (déjà vécues). | Faible |
| T8 | **Journal d'audit** (qui a changé quoi, quand) sur les actions sensibles (montant, étape, suppression). | Traçabilité, sécurité, confiance. | Moyen |

---

## 4. Roadmap recommandée

1. **Quick wins commerciaux (faible effort, fort ROI)** : C3 (avis), C5 (win/loss), C7 (réactivation), C8 (bandes de prix), T5 (observabilité), T7 (tests).
2. **Gisement de marge** : C2 (suivi travaux) + C4 (parrainage agents) + C6/T1 (vélocité + horodatage).
3. **Différenciateur métier** : C1 (moteur CatNat/sécheresse) — l'angle assurance est un avantage concurrentiel net sur les fissures.
4. **Industrialisation** : T3 (paiement en ligne), T4 (réponses e-mail), T2 (structuration data), T6 (moteur de règles).

Si je devais n'en garder que **trois** pour le prochain sprint : **C1 (CatNat),
C2 (suivi travaux), C3 (moteur d'avis)** — acquisition, marge et notoriété.

---

*Étude réalisée le 23 juin 2026 — analyse du code, du modèle économique
(`CONTEXTE_BUSINESS_IPB.md`) et du workflow (`WORKFLOW_IPB.md`).*
