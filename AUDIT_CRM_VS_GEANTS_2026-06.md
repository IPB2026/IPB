# Audit IPB CRM vs géants américains — et ce qu'on peut mettre en place

> Benchmark du CRM IPB face aux références (Salesforce, HubSpot, Pipedrive, Zoho),
> avec un focus sur l'état de l'art 2026 (copilotes IA), puis une roadmap
> d'améliorations réalistes et utiles pour une structure d'expertise comme IPB.
> Date : 23 juin 2026.

---

## 1. Ce que font les géants en 2026

L'année est dominée par l'**IA agentique** intégrée au CRM :

- **HubSpot — Breeze** : copilote IA embarqué qui rédige des e-mails, résume une
  fiche/un deal, suggère la prochaine action ; agents autonomes de prospection et
  de contenu ; « Smart Deal Progression » qui fait avancer les deals.
- **Salesforce — Agentforce 2.0 + Einstein** : agents autonomes, **scoring
  prédictif des leads**, insights d'opportunité, **prévision de CA**, actions
  recommandées.
- **Pipedrive — AI Sales Assistant** : analyse les deals/e-mails, **probabilité de
  gain**, repère les **deals au point mort**, recommande la « next best action » ;
  **automatisations** par déclencheur (changement d'étape → e-mail + tâche auto) ;
  **suivi d'ouverture/clic** des e-mails ; **prévision de revenus**.

Le dénominateur commun, transposable à IPB : **un copilote qui résume + suggère +
rédige**, le **suivi d'engagement e-mail**, le **scoring de santé des dossiers**
(à risque / au point mort) et la **prévision pondérée**.

---

## 2. Ce qu'IPB a déjà (et qui tient la comparaison)

IPB est loin d'être « basique ». Le CRM couvre déjà, à l'échelle d'une PME :

- **Pipeline** complet et personnalisable (phases du devis envoyé au suivi, étape
  « Devis validé », liberté totale de réglage manuel).
- **Scoring de leads** : automatique (web) + qualification téléphonique structurée
  HOT/WARM/COLD avec priorité de rappel.
- **Séquences d'e-mails automatiques** : relances prospect (J+1/3/7/14), relances
  devis (J+3/7/14), relances factures, demande d'avis Google (J+7).
- **Automatisations métier** : facture générée le lendemain de la visite, rappel
  RDV J-1, tâches auto-créées et **désormais auto-fermées** quand le motif est résolu.
- **IA générative** : génération du rapport d'expertise par Claude.
- **Pilotage** : CA (pipe, signé, facturé, encaissé), taux de conversion, entonnoir.
- **Attribution d'acquisition** (canal/UTM, ajoutée récemment), **agenda Google**,
  recherche globale, exports.

Autrement dit : le socle « pipeline + séquences + automatisations + IA rapport »
existe. Les écarts avec les géants sont surtout sur **l'intelligence d'aide à la
décision** et le **suivi d'engagement**.

---

## 3. Écarts & opportunités (ce qui manque vs les géants)

| Capacité géant | IPB aujourd'hui | Opportunité |
|---|---|---|
| Copilote IA (résume + suggère + rédige) | « Prochaine étape » figée, rapport IA seulement | **Assistant IPB sur la fiche** : résumé du dossier + action conseillée + brouillon d'e-mail en 1 clic |
| Suivi d'ouverture/clic e-mail | E-mails envoyés, aucun retour | **Pixel d'ouverture + liens suivis** → « devis ouvert 2× » dans la timeline |
| Scoring santé / deal à risque | Tier au 1ᵉʳ contact uniquement | **Score de santé du dossier** : au point mort, devis non ouvert, SLA P1 dépassé |
| Probabilité de gain / prévision pondérée | Pipe en montant brut | **Prévision pondérée** : probabilité par phase × montant |
| Alertes SLA (P1 rappelé < 4 h) | Priorité affichée, pas d'alerte | **File « à risque »** sur le tableau de bord |
| Fusion de doublons | Normalisation tél. à la capture | **Outil de fusion** de fiches |
| Bibliothèque de modèles e-mail éditable | Modèles en dur (code) | Modèles éditables (plus tard) |

---

## 4. Roadmap proposée (réaliste pour IPB)

Classée par rapport valeur / effort. Toutes s'appuient sur l'infra existante
(API Anthropic déjà utilisée pour les rapports, infra e-mail, base Postgres).

| # | Fonctionnalité (inspiration géant) | Valeur | Effort | Base ? |
|---|---|---|---|---|
| 1 | **Assistant IPB** sur la fiche : résumé du dossier + prochaine action + brouillon d'e-mail (Breeze/Einstein) | Élevée | Moyen | Non |
| 2 | **Score de santé & file « à risque »** : au point mort, devis non répondu, SLA P1 (Pipedrive AI Assistant) | Élevée | Moyen | Non |
| 3 | **Suivi d'ouverture e-mail** (devis/relances) → timeline « devis ouvert » (Pipedrive/HubSpot) | Élevée | Moyen | Oui (1 table) |
| 4 | **Prévision de CA pondérée** (probabilité par phase × montant) au pilotage (Einstein forecast) | Moyenne | Faible | Non |
| 5 | **Fusion de fiches doublons** | Moyenne | Moyen | Non |
| 6 | **Perf par canal** au pilotage (exploite l'attribution déjà collectée) | Moyenne | Faible | Non |

Les n° 1, 2 et 3 sont les plus « giant-like » et les plus différenciants : ils
transforment un CRM qui *enregistre* en un CRM qui *conseille et alerte*.

---

*Audit réalisé le 23 juin 2026. Sources benchmark : comparatifs publics HubSpot/
Salesforce/Pipedrive 2026 (voir le message d'accompagnement).*
