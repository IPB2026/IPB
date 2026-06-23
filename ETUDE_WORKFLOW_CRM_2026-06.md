# Étude du workflow CRM IPB — collecte, traitement & usage de la data

> Audit du cycle commercial complet (du lead au rapport livré) et de la couche
> données. Objectif : identifier les frictions d'usage et les failles de collecte/
> traitement, puis prioriser des améliorations concrètes.
> Date : 23 juin 2026. Périmètre : `app/admin`, `app/actions`, `lib/crm`, `prisma`.

---

## 1. Le workflow réel, tel qu'il tourne

Le cycle métier officiel (cf. `WORKFLOW_IPB.md`) est bien implémenté et cohérent :
prospect → devis diagnostic → validation → RDV → visite → facture (J+1) → paiement
→ rapport (J+3-5) → clôture ou suivi travaux. La phase du dossier est calculée par
une **source unique de vérité** (`computeDossier`, `lib/crm/dossier.ts`), partagée par
la liste clients, la fiche, le pipeline et le pilotage — c'est une vraie force
architecturale, désormais doublée d'un override manuel (« liberté totale »).

Les surfaces back-office sont complètes : dashboard « à traiter », pipeline kanban,
fiches clients, devis/factures/rapports, agenda (avec Google Calendar), pilotage KPI,
recherche, exports. Le socle est sain. Les marges de progrès sont sur **l'automatisation
des enchaînements**, la **qualité de la donnée entrante**, et la **finesse du reporting**.

---

## 2. Collecte de la donnée — ce qui entre dans le CRM

Quatre points d'entrée web (`app/actions/diagnostic.ts`, `contact.ts`, `calculator.ts`,
`quickCallback.ts`) plus la saisie manuelle et le MCP Cowork passent tous par
`captureLead` (`lib/crm/captureLead.ts`). Bonne nouvelle : **tous persistent** le lead,
avec un fallback non bloquant (si la base tombe, l'e-mail part quand même). La capture
est donc fiable. Les faiblesses sont sur la **normalisation** et **l'attribution**.

### 2.1 Téléphone non normalisé → doublons de contacts (fort impact)

`captureLead` se contente d'un `trim()` sur le téléphone. Résultat : `06 12 34 56 78`,
`0612345678` et `+33612345678` sont stockés tels quels. La déduplication (`captureLead`
ligne 92-99) cherche un contact existant par **correspondance exacte** d'e-mail OU de
téléphone — donc un même client qui laisse son numéro sous deux formats crée **deux
fiches**. Une fonction `normalizePhoneFR` (format E.164) existe déjà dans
`lib/analytics.ts` : il suffit de la réutiliser à l'entrée du CRM.

### 2.2 Aucune attribution d'acquisition (fort impact analytique)

Les paramètres `utm_source / utm_medium / utm_campaign`, le `gclid` (Google Ads) et la
page d'arrivée sont détectés côté navigateur et envoyés à GA4/Google Ads, mais **ne
sont jamais enregistrés sur le Lead**. Conséquence : impossible, dans le CRM, de
répondre à « quel canal amène mes leads les plus chauds / les plus rentables ? ». Le
champ `Lead.source` ne distingue que la mécanique (DIAGNOSTIC, CALCULATEUR, CONTACT,
MANUEL), pas le canal marketing.

### 2.3 Donnée semi-structurée enfouie dans `payload` (JSON)

Les réponses du diagnostic, la qualification téléphonique (délai/décision/bien) et les
`reasons` de scoring vivent dans un blob `Lead.payload: Json` ou un tableau de chaînes
non indexé. C'est souple, mais non requêtable : on ne peut pas agréger « combien de
leads qualifiés cette semaine », ni « quels motifs de scoring convertissent le mieux ».
La qualification n'a ni horodatage ni auteur.

### 2.4 Adresse parsée par regex

`parseAddress` extrait le code postal par expression régulière (premier groupe de 5
chiffres) et déduit la ville. Pas de validation code postal ↔ ville, pas d'enrichissement
géo. Suffisant la plupart du temps, fragile sur les saisies atypiques.

---

## 3. Traitement de la donnée — relances, KPI, reporting

### 3.1 Suivi des relances par recherche de texte (fragile)

Le cron (`app/api/cron/relances/route.ts`) et les KPI s'appuient par endroits sur un
**matching de chaîne** dans `activity.content` (`content.contains('Relance devis …')`)
pour compter les relances déjà envoyées. Si le libellé change, le comptage casse **en
silence** — double envoi ou relance manquée. Les compteurs structurés `Devis.relanceCount`
/ `Facture.relanceCount` existent déjà : il faut s'appuyer uniquement dessus et bannir
le matching de texte.

### 3.2 Devis expiré toujours relancé

`Devis.validUntil` existe mais n'est pas vérifié dans la boucle de relance : un devis
dont la validité est dépassée continue de recevoir des relances commerciales.

### 3.3 Reporting de pilotage : angles manquants

Le pilotage couvre bien le CA (pipe, signé, facturé, encaissé), les taux d'acceptation/
conversion et le panier moyen. Manquent les axes les plus actionnables pour piloter
l'acquisition et la réactivité :

- **Performance par canal / source** (impossible sans 2.2).
- **Délai de premier contact** (lead → 1ère tentative d'appel) : aucune mesure de
  réactivité commerciale, alors que les leads HOT sont censés être rappelés sous 4 h.
- **Temps passé par étape** : les transitions sont journalisées en texte
  (`CHANGEMENT_ETAPE`) mais pas exploitables pour mesurer « combien de jours en
  Devis envoyé avant réponse ».

---

## 4. Usage quotidien — frictions

Le dashboard « à traiter » est un vrai cockpit. Les frictions principales :

- **Enchaînement RDV → Facture encore manuel** par endroits (le J+1 brouillon existe,
  mais le passage visite réalisée → facture relue/envoyée demande des allers-retours).
- **Création de devis en 5+ clics** depuis la fiche, là où un « devis express »
  (service + montant → enregistré/envoyé) suffirait.
- **Enregistrement d'un paiement peu découvrable** (il faut ouvrir la facture ; pas de
  bouton « paiement reçu » sur la liste).
- **Pas de fusion de doublons** : une fois deux fiches créées (cf. 2.1), aucun moyen de
  les fusionner.
- **Scoring jamais recalculé** : si la qualification évolue, le tier reste figé.

---

## 5. Recommandations priorisées

| # | Chantier | Catégorie | Impact | Effort | Risque |
|---|----------|-----------|--------|--------|--------|
| 1 | Normalisation téléphone E.164 + dédup robuste | Collecte | Élevé | Faible | Faible |
| 2 | Attribution acquisition (utm, gclid, page) sur le Lead | Collecte | Élevé | Moyen | Faible |
| 3 | Relances 100 % sur compteurs structurés (fin du matching texte) + respect `validUntil` | Traitement | Élevé | Moyen | Moyen |
| 4 | Pilotage : perf par canal + délai de 1er contact | Reporting | Élevé | Moyen | Faible |
| 5 | Devis express (2 clics) depuis la fiche | Usage | Moyen | Moyen | Faible |
| 6 | Bouton « paiement reçu » sur la liste factures | Usage | Moyen | Faible | Faible |
| 7 | Fusion de fiches doublons | Usage/Qualité | Moyen | Moyen | Moyen |
| 8 | Re-scoring du lead à la demande + qualification structurée | Collecte/Qualité | Moyen | Moyen | Faible |

Les chantiers 1, 2, 3 et 4 forment un bloc cohérent « qualité et exploitabilité de la
donnée » : ce sont eux qui débloquent le pilotage par canal et fiabilisent les relances.

---

---

## 6. Améliorations implémentées (23 juin 2026)

- **Qualité data — téléphone E.164 + déduplication** : nouveau module `lib/crm/phone.ts`
  (normalisation + variantes), branché dans `captureLead`. Les numéros sont stockés
  au format canonique `+33…` et la dédup matche désormais toutes les variantes de
  format → fin des fiches en double dues au formatage. *(12 tests unitaires.)*

- **Attribution d'acquisition (first-touch)** : cookie `ipb_attrib` posé à la 1ʳᵉ
  visite (`components/analytics/AttributionTracker.tsx`), lu côté serveur
  (`lib/crm/attribution*.ts`) et figé sur le Lead (utm, gclid, page d'arrivée,
  referrer + **canal normalisé** ADS/SEO/SOCIAL/REFERRAL/DIRECT). Câblé dans les 4
  points d'entrée (diagnostic, contact, calculateur, rappel). Affiché sur la fiche
  client (« Origine »). Nécessite la migration `20260623100000_lead_attribution`.
  *(9 tests unitaires.)*

- **Fiche client — liberté totale sur les étapes** : le sélecteur d'étape couvre
  TOUTES les phases (y compris facture/paiement/rapport/suivi), et chaque palier du
  « Suivi du dossier » est désormais **cliquable** pour y placer le dossier d'un clic.
  Plus aucun blocage à partir de « visite réalisée ».

- **Raccourcis d'usage quotidien** : bouton **« paiement reçu »** en 1 clic sur la
  liste des factures (mobile + desktop), et **« devis express »** (service + montant)
  directement depuis la fiche client → création de devis de 5 clics à 2.

> Note de déploiement : deux migrations BDD à appliquer (`npx prisma migrate deploy`)
> — `lead_manual_phase` et `lead_attribution` — avant déploiement.

---

*Étude réalisée le 23 juin 2026 à partir d'une cartographie du code et des documents
de référence (`WORKFLOW_IPB.md`, `CONTEXTE_BUSINESS_IPB.md`, `PLAN_CRM_*`).*
