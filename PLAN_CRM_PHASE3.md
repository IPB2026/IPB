# PLAN CRM IPB — Phase 3 : Autocritique & plan de remédiation/évolution

> Audit complet réalisé le 14/06/2026 (3 auditeurs : mobile/UX, workflows métier, robustesse technique).
> Objectif : un CRM **complet, précis, fiable**, et d'une **facilité déconcertante sur mobile** comme sur PC.

---

## 0. Verdict d'ensemble

**Le socle est solide** : capture de leads non bloquante, état de dossier dérivé des artefacts (pas d'enum manuel désynchronisable), cloisonnement EXPERT, numérotation atomique, repli police PDF, garde anti-double-envoi rapport. **Rien n'est à jeter.**

**Mais** l'audit révèle 4 familles de problèmes, dont plusieurs sont des raccourcis assumés lors de la construction rapide :

| Famille | Gravité | Résumé |
|---|---|---|
| **Sécurité des rôles** | 🔴 P0 | Un EXPERT peut créer/accepter/supprimer des devis et générer/encaisser des factures (gardes `requireUser` locales sans contrôle de rôle). |
| **Mobile** | 🔴 P0 | 6 tableaux débordent sur téléphone ; l'info utile (statut, montant) sort de l'écran. Pas de navigation rapide. |
| **Complétude workflow** | 🟠 P1 | Pas de re-planification de RDV, pas d'édition facture/paiement, l'EXPERT ne voit pas ses RDV, pas de relance facture impayée, pas d'édition contact/fusion doublons. |
| **Fiabilité technique** | 🟠 P1 | Échecs d'envoi e-mail invisibles, cron public si secret absent, relances devis par matching de chaîne, double-notif RDV, compteurs dashboard plafonnés à 8, zéro test. |

---

## 1. Autocritique honnête (ce que j'ai bien / mal fait)

### Bien
- Découpage par phases, chaque incrément vérifié (tsc + lint + build) et commité proprement.
- Choix « zéro migration » au départ : a réduit le risque sur une base Neon de prod.
- Synchro Google Calendar testée **en réel** (pas seulement compilée).
- Correctif PDF devis vérifié visuellement (rendu avant/après).

### Moins bien (mes raccourcis)
1. **Sécurité reléguée** : j'ai copié des `requireUser` locaux (sans rôle) au lieu de centraliser sur `requireAdmin`. Résultat : escalade de privilège métier sur devis/factures/agenda. **Faute la plus grave.**
2. **Sentinelle `serviceType=AUTRE`** pour le 2ᵉ devis : élégant mais fragile (collision possible avec un devis créé en AUTRE). J'ai privilégié « pas de migration » à la justesse du modèle.
3. **Relances devis par matching de chaîne** sur le contenu d'`Activity` : même logique « pas de migration », mais fragile (renommage, faux positifs, N+1).
4. **Échecs d'envoi e-mail invisibles** : `send-actions` ignore le `SendResult` — l'utilisateur croit qu'un devis est parti alors qu'il a échoué.
5. **Mobile survolé** : j'ai fait du responsive « correct » (grilles `sm:`/`lg:`) mais laissé 6 tableaux inutilisables au doigt sur le terrain.
6. **Double notification RDV** : en branchant Google Calendar (invitation) sans retirer mon e-mail de confirmation maison, le client reçoit 2 messages.
7. **`qualifyLead` écrase `tier`** sans réaligner `score/maxScore/reasons` → affichage incohérent.
8. **Vérification limitée des écrans admin** (derrière auth) : je me suis appuyé sur le build faute de session de test.

---

## 2. Plan de remédiation & d'évolution — par vagues

### 🌊 Vague 1 — Sécurité & fiabilité (contenu, sans migration, risque faible)
1. **Centraliser l'auth** : supprimer les `requireUser` locaux ; passer **toutes** les écritures devis/factures/agenda/leads en `requireAdmin` (les EXPERT sont déjà redirigés hors back-office). *(P0 sécurité)*
2. **`CRON_SECRET` obligatoire** : refuser l'endpoint relances si le secret est absent (sinon endpoint public d'envoi de masse). *(P1 sécurité)*
3. **Supprimer la double-notif RDV** : n'envoyer l'e-mail de confirmation maison que si Google Calendar n'est pas configuré. *(P1)*
4. **Durcir la sentinelle travaux** : interdire `AUTRE` dans `createDevis`/`updateDevis` (devis diagnostic) — seul `createDevisTravaux` la pose. *(P1)*
5. **`qualifyLead` cohérent** : réaligner `score/maxScore/reasons` sur le résultat de qualification. *(P1)*
6. **`renderToBuffer` protégé** (try/catch → `null`) pour ne pas faire planter un envoi sur un PDF récalcitrant. *(P2)*
7. **Compteurs dashboard réels** : `count()` au lieu de `take:8 .length` (les tuiles mentent au-delà de 8). *(P1)*

### 🌊 Vague 2 — Mobile « facilité déconcertante » (le gros morceau UX)
8. **Composant `MobileCardList`** : remplacer les 6 tableaux (prospects, devis, factures, rapports, dashboard, agenda) par des cartes empilées en dessous de `md:` (table conservée en `md:block`). L'info clé (statut/montant/ville) toujours visible, carte cliquable.
9. **Bottom-nav fixe mobile** (Tableau de bord / Prospects / Agenda / Rapports / Recherche) → actions clés en 1 tap. + loupe recherche dans la topbar.
10. **Refonte ligne d'agenda** (`flex-col sm:flex-row`, actions à pleine largeur, selects `h-10`, auto-submit du statut).
11. **Planchers tactiles `h-10`/`text-base sm:text-sm`** (anti-zoom iOS) généralisés ; empiler les paires côte-à-côte (zones terrain, méta-photos) en mobile.
12. **Formulaires lourds repliés** (`<details>`) sur mobile (nouveau RDV, filtres) pour révéler la liste immédiatement.
13. **Tableaux détail** (lignes devis, estimation rapport) en blocs sur mobile.
14. **Barre d'actions fiche prospect** : « Appeler » + « Créer devis » à pleine largeur (sticky en option).

### 🌊 Vague 3 — Complétude des workflows (certaines avec migration légère)
15. **Re-planification de RDV** (`rescheduleAppointment` + `updateCalendarEvent` déjà codée) au lieu d'annuler→recréer. *(P0)*
16. **RDV visibles dans l'espace EXPERT** « Mes interventions » (date/lieu) — le diagnostiqueur doit savoir quand se déplacer. *(P0)*
17. **Édition facture + enregistrement de paiement** (montant, **acompte** aujourd'hui orphelin, statut « partiellement payé », date d'encaissement). *(P0, migration)*
18. **Confirmations avant action destructrice** (suppression devis/photo, annulation RDV, validation+envoi rapport). *(P0 UX)*
19. **Édition du contact** + **fusion de doublons** (clé avec 80 % d'appels). *(P1)*
20. **Relance des factures impayées** (cron + bouton dashboard). *(P1)*
21. **Arrêt des relances sur réponse / opt-out** + **état de relance visible** sur la fiche (étape n/4, prochaine date). *(P1)*
22. **Fiabiliser les relances devis** : colonnes `sentAt`/`relanceCount` sur `Devis` (fin du matching de chaîne) + **flag `isTravaux`** explicite (fin de la sentinelle). *(P1, migration)*
23. **Lier la facture issue d'un RDV au devis** existant (anti-double-facturation). *(P1)*

### 🌊 Vague 4 — Évolutions « génie » & finitions
24. **Vue agenda semaine** (grille) en plus de la liste par jour. *(proposition initiale)*
25. **Proposition de créneaux au client** (lien de prise de RDV self-service). *(proposition initiale)*
26. **Tests** (vitest installé + couverture du pur calcul : `computeDossier`, `scoreQualification`, numérotation, relances). *(P1)*
27. **Transactions & idempotence** (accept→convert→facture en `$transaction`, garde « déjà envoyé » sur les e-mails). *(P1)*
28. **Pagination/curseur** sur le cron + signal de saturation ; pagination des listes. *(P1)*
29. **Durcir le connecteur MCP** (header `Authorization` plutôt que secret en URL). *(P1)*
30. **KPI fiabilisés** (`sentAt` réel pour le délai moyen ; libellés CA disjoints).

---

## 3. Ordre d'exécution
**V1 → V2 → V3 → V4.** V1 (sécurité) en premier car risque réel et contenu. V2 (mobile) car priorité utilisateur n°1. V3 ajoute les migrations nécessaires (coordonnées avec le déploiement). V4 = robustesse long terme + évolutions.

Chaque vague : incréments vérifiés (tsc + lint + build, et test réel quand possible) → commit → push (sur ton accord).
