# PLAN — CRM IPB Phase 2 (automatisation & pilotage)

> Suite du chantier qualité (devis premium · clients · suivi · dashboard « à traiter » — **livrés en prod le 14/06/2026**).
> Objectif : automatiser la communication, fiabiliser le suivi de bout en bout, et piloter le business par les chiffres.

---

## État des lieux (déjà en place, à réutiliser)
- **E-mail sortant** : Resend configuré (`RESEND_API_KEY`, `EMAIL_FROM`), `lib/email.ts`, `lib/crm/send.ts` (envoi devis/factures/rapports avec PDF).
- **Séquences de relance** : `lib/emailTemplates.ts` (J+1/3/7/14) écrites mais **non branchées** ; route cron `app/api/cron/relances` existe.
- **Agenda** : modèle `Appointment` + `lib/google/calendar.ts` (`isCalendarConfigured()` = no-op tant que pas d'OAuth).
- **Workflow facture-après-diagnostic** : partiel (action depuis l'agenda).
- **Suivi de dossier** : `lib/crm/dossier.ts` (étapes dérivées) + dashboard « À traiter ».

---

## Phase 1 — Notifications & automatisations e-mail *(priorité haute, peu de prérequis)*
**Objectif** : que personne n'attende, que rien ne se perde.
1. **Diagnostiqueur notifié à l'assignation** d'un prospect (e-mail + badge dans son espace).
2. **Admin notifié** quand un diagnostiqueur **soumet** sa saisie terrain (rapport `SOUMIS`).
3. **Client — accusés automatiques** : confirmation de prise en charge à la création du lead (48 h), confirmation de RDV, envoi du rapport (déjà manuel → garder la validation humaine).
4. **Relances commerciales auto** : devis `ENVOYE` sans réponse → relance J+3 / J+7 (réutilise `emailTemplates`), via le cron existant. Stop si accepté/refusé.
- *Prérequis* : aucun (Resend déjà OK). *Effort* : moyen. *Garde-fou* : tout envoi client reste traçable ; relances arrêtables.

## Phase 2 — Suivi client post-rapport (cycle travaux) *(priorité haute)*
**Objectif** : exploiter le cycle complet que tu as décrit, jusqu'au suivi travaux.
1. **2ᵉ devis « accompagnement travaux »** (réparation des désordres) émis après le rapport, distinct du devis diagnostic.
2. **Statut « suivi client »** : après rapport envoyé, le dossier passe en suivi → tâche « savoir ce que veut faire le client » (relance dédiée).
3. **Déclencheur lancement travaux** rattaché à CE 2ᵉ devis (le « lancement travaux » actuel s'aligne dessus).
- *Prérequis* : aucun. *Effort* : moyen. S'appuie sur `dossier.ts` (ajout d'étapes « suivi » / « travaux »).

## Phase 3 — KPIs & pilotage *(priorité moyenne)*
**Objectif** : piloter par les chiffres.
1. **Dashboard KPIs** : CA devis/factures (signé vs encaissé), **taux de conversion** prospect→client, délai moyen (demande→rapport), leads/mois, répartition par **service** et par **diagnostiqueur**.
2. **Graphiques** (tendance mensuelle, entonnoir de conversion).
3. **Vue « activité du diagnostiqueur »** (interventions réalisées, en cours).
- *Prérequis* : aucun. *Effort* : moyen. (Lib graphiques légère ou SVG maison.)

## Phase 4 — Agenda & Google Calendar (complet) *(priorité moyenne — prérequis externe)*
**Objectif** : un vrai agenda synchronisé.
1. **OAuth Google** (compte `contact@ipb-expertise.fr`) → sync création/màj/annulation des RDV + **invitation auto** au client (`sendUpdates: all`).
2. **Vue agenda semaine** + RDV dans la fiche prospect/client.
3. **Proposition de créneaux** au client (lien de prise de RDV) — option.
- *Prérequis* : **Client ID / Secret Google Cloud + un consentement** (je te guide). *Effort* : moyen-élevé.

## Phase 5 — Finitions & confort *(priorité basse)*
1. **Qualification structurée** des prospects (budget, délai, décisionnaire, type de bien → score auto) — chantier mis de côté plus tôt.
2. **Recherche globale** (prospects/clients/devis/factures/rapports).
3. **Exports** (CSV devis/factures/clients ; comptabilité).
4. **Rôles affinés** + écran de gestion des comptes diagnostiqueurs dans `/admin`.

---

## Ordre recommandé
**1 → 2 → 3 → 4 → 5.** Les phases 1-2-3 n'ont **aucun prérequis externe** (je peux enchaîner). La phase 4 attend tes identifiants Google.

## Prérequis à me fournir (au fil de l'eau)
- **Phase 4** : Google Cloud OAuth (Client ID + Secret) + un consentement du compte `contact@ipb-expertise.fr`.
- Confirmer l'**adresse d'envoi** Resend (`EMAIL_FROM`) et le ton des e-mails clients.

## Méthode (inchangée)
Incréments vérifiés (tsc + lint + rendu testé, données de test nettoyées) → commit → déploiement prod. Validation humaine avant tout envoi client. Lexique IPB respecté (coordination + diagnostiqueur mandaté).
