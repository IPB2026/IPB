# Audit des règles métier du CRM IPB + propositions

> Vérification que les règles du workflow officiel sont bien appliquées dans le
> code, puis propositions de nouvelles règles pour fiabiliser et faciliter la
> gestion de la donnée. Date : 23 juin 2026.

---

## 1. Règles actuelles — vérifiées et appliquées

| # | Règle | Où c'est appliqué | État |
|---|-------|-------------------|------|
| R1 | **Le prix porte sur la COORDINATION, le diagnostic reste à 0** | `createDevis`, `createInvoiceForAppointment`, `importExternalDocument` | ✅ Appliquée partout |
| R2 | **Pas de rapport tant que la facture n'est pas PAYÉE** | `sendRapport` (verrou serveur : cherche une facture PAYEE) | ✅ Verrouillée |
| R3 | **Suivi travaux uniquement si le rapport porte une estimation budgétaire** | `computeDossier` (`rapportAvecEstimation`), `sendRapport` | ✅ Appliquée |
| R4 | **Diagnostiqueur assigné seulement APRÈS validation du devis** | `assignLead` (garde serveur), UI fiche | ✅ Appliquée |
| R5 | **Facture émise le lendemain de la visite (brouillon)** | cron `/api/cron/relances` (J+1, BROUILLON) | ✅ Appliquée |
| R6 | **Le paiement déclenche la rédaction du rapport (3-5 j ouvrés)** | `recordFacturePayment` (crée la tâche « rapport à rédiger ») | ✅ Appliquée |
| R7 | **Perdu = décision MANUELLE** (plus d'auto-perdu) | `changeStage` / cron (tâche de décision) | ✅ Appliquée (liberté totale) |
| R8 | **Client dès l'étape « Devis validé »** | `CLIENT_PHASES` / `computeDossier` + `CLIENT_CONTACT_WHERE` | ✅ Cohérent partout |
| R9 | **Suivi 2 semaines puis Terminé** | `computeDossier` (`SUIVI_DAYS`) | ✅ Appliquée |
| R10 | **Déduplication des contacts (téléphone normalisé E.164)** | `captureLead` (`phoneVariants`) | ✅ Appliquée |
| R11 | **Le tableau de bord respecte la phase réglée à la main** | tuiles rapports + nettoyage relances | ✅ Corrigé récemment |

**Conclusion : les 11 règles du workflow officiel sont correctement implémentées et
cohérentes entre les écrans (source unique `computeDossier`).**

---

## 2. Nouvelles règles proposées (par valeur)

Classées par rapport bénéfice / effort. Chacune fiabilise la donnée ou te fait
gagner du temps.

| # | Règle proposée | Bénéfice | Effort |
|---|----------------|----------|--------|
| N1 | **Validité du devis appliquée** : un devis dont la date `validUntil` est dépassée arrête les relances et passe « expiré » visiblement (aujourd'hui `validUntil` existe mais n'est pas vérifié dans les relances). | Plus de relance d'un devis caduc ; pipe propre. | Faible |
| N2 | **SLA de rappel** : un lead chaud (P1/HOT) non rappelé sous 4 h → alerte « SLA dépassé » en haut du tableau de bord. | Réactivité commerciale, on ne perd plus un lead chaud. | Moyen |
| N3 | **Garde-fou montant** : un devis ne peut pas être envoyé avec un montant à 0 €. | Évite d'envoyer un devis vide par erreur. | Faible |
| N4 | **Prospect dormant** : aucun échange depuis 30 j et non client → tag « à requalifier » ; archivage proposé après 90 j. | Base propre, focus sur les dossiers vivants. | Moyen |
| N5 | **Fusion de doublons** : détecter les fiches au même téléphone/e-mail et proposer la fusion en 1 clic. | Une seule vérité par client. | Moyen |
| N6 | **Rapport complet obligatoire** : un rapport ne passe « ENVOYÉ » que s'il a un contenu (IA ou PDF externe joint). | Pas de rapport vide envoyé. | Faible |
| N7 | **Cohérence facture ↔ devis** : alerte si une facture diffère du devis accepté (montant), à confirmer. | Facturation alignée sur l'accord client. | Faible |
| N8 | **Clôture automatique** : un dossier « Terminé » depuis > 6 mois part en corbeille douce (récupérable). | Liste clients allégée, focus sur l'actif. | Moyen |
| N9 | **Hygiène à la capture** : refuser un lead sans e-mail NI téléphone ; valider code postal ↔ ville (API BAN). | Données contactables et géolocalisées fiables. | Moyen |
| N10 | **Cap & pause des relances** : ne pas dépasser X relances, et pause si le client a répondu/est en congés (tag). | Pas de sur-sollicitation (anti-spam, image premium). | Moyen |

**Recommandation** : commencer par **N1, N2, N3** (faible effort, fort impact :
hygiène du pipe + réactivité + garde-fou). N4/N5/N8 forment ensuite un bloc
« propreté de la base » cohérent.

---

*Audit réalisé le 23 juin 2026 — lecture du code (`lib/crm`, `app/admin`,
`app/api/cron`) et du workflow officiel (`WORKFLOW_IPB.md`).*
