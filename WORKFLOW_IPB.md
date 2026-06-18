# Cycle commercial IPB — workflow métier officiel

> Du premier contact au rapport livré. Référence de pilotage du CRM `/admin`.
> Schéma visuel : `WORKFLOW_IPB.svg` (ouvrable dans un navigateur, exportable en PDF).

---

## Le cycle, étape par étape

| # | Étape | Ce qui se passe | Déclencheur de l'étape suivante |
|---|-------|-----------------|--------------------------------|
| 1 | **Prospect** | Entrée par téléphone (≈ 80 %), site (≈ 20 %) ou e-mail. Fiche créée dans le CRM. | Envoi d'un devis diagnostic |
| 2 | **Devis diagnostic** | Devis envoyé, avec proposition de créneaux de visite. | Réponse du client |
| 3 | **Validation** | Le client donne son accord **et** choisit un créneau. | Validé → RDV planifié · Refus/silence → **Perdu** |
| 4 | **RDV planifié** | Le créneau retenu crée le rendez-vous (agenda + Google). | Date de la visite |
| 5 | **Visite sur site** | Diagnostic réalisé sur place (observations, mesures, photos). | Visite réalisée |
| 6 | **Facture** | Émise **le lendemain de la visite**. | Règlement du client |
| 7 | **Paiement** | Encaissement. C'est le **déclencheur** du rapport. | Facture payée |
| 8 | **Rapport** | Rédigé et livré **3 à 5 jours ouvrés après le paiement**. | Contenu du rapport |
| 9 | **Clôture / suivi** | Selon le rapport : clôture directe ou suivi travaux. | Voir branche ci-dessous |

### Après le rapport (étape 9)

- **Préconisations seules** → dossier **Terminé** directement.
- **Préconisations + estimation budgétaire** → **Suivi travaux** → devis travaux → accompagnement / travaux.
  *(Cas exceptionnel, ≈ 10 % des dossiers.)*

---

## Règles dures (non négociables)

1. **Perdu = devis diagnostic non validé.** Un dossier ne bascule en « Perdu » que si le client ne valide pas le devis (refus ou silence).
2. **Pas de rapport tant que la facture n'est pas PAYÉE.** Le paiement est le déclencheur ; aucun rapport n'est envoyé avant.
3. **Suivi travaux uniquement si le rapport porte une estimation budgétaire.** Sinon, le dossier est terminé dès l'envoi du rapport.

---

## Traduction dans le CRM

- **Phase du dossier** = calculée par `computeDossier` (`lib/crm/dossier.ts`), source unique de vérité partagée par la liste clients, la fiche, le pipeline et le pilotage.
- **Séquence des phases** : `NOUVEAU → DEVIS_ENVOYE → RDV_PLANIFIE → VISITE_FAITE → FACTURE_ENVOYEE → PAIEMENT_RECU → RAPPORT → SUIVI` (puis `TERMINÉ`).
- **Facture le lendemain** : générée automatiquement (cron J+1) **en brouillon** — relue puis envoyée en 1 clic depuis le dashboard (« Factures à envoyer »).
- **Verrou rapport ⇒ paiement** : l'envoi du rapport est bloqué tant qu'aucune facture n'est payée pour le contact.
- **Suivi vs Terminé** : déterminé par la présence d'une estimation budgétaire (`Rapport.budgetHT`) dans le rapport.

---

*Document de référence — mis à jour le 16 juin 2026.*
