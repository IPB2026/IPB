# Référence — Documents types IPB (Devis · Facture · Rapport)

> Spec extraite des 3 documents réels fournis par le client (13 juin 2026) :
> - Devis `DEV-20260604-007` PEREIRA (PDF, 3 pages)
> - Facture `FAC-2026-005-BARACAT` (docx)
> - Rapport `IPB-2026-002-GARCIA` (docx)
>
> Sert de cahier des charges pour les générateurs PDF du CRM (Phases 2 & 3).
> Reproduire fidèlement structure, libellés et mentions légales.

---

## 0. Constantes IPB (à centraliser dans une config)

| Donnée | Valeur |
|---|---|
| Raison sociale | IPB — Institut de Pathologie du Bâtiment |
| Adresse | 54 avenue Jean Jaurès, 31170 Tournefeuille |
| Téléphone | 05 82 95 33 75 |
| Email | contact@ipb-expertise.fr |
| Site | www.ipb-expertise.fr |
| SIRET | 908 995 103 00029 |
| APE | 7022Z |
| N° TVA intracom | FR71908995103 *(existe, mais franchise appliquée)* |
| Régime TVA | **TVA non applicable, art. 293 B du CGI** (franchise en base) |
| Garantie | Décennale en cours de souscription |

**Coordonnées bancaires (apparaissent sur les factures) :**
| | |
|---|---|
| Bénéficiaire | IPB |
| IBAN | FR76 1695 8000 0151 0958 0207 019 |
| BIC | QNTOFRP1XXX |
| Banque | QONTO |

> ⚠️ Ces valeurs doivent vivre dans `lib/crm/company.ts` (ou env pour l'IBAN),
> jamais en dur dispersées dans les templates.

### Schémas de numérotation (à respecter)
| Doc | Format | Exemple |
|---|---|---|
| Devis | `DEV-YYYYMMDD-NNN` | `DEV-20260604-007` |
| Facture | `FAC-YYYY-NNN-NOM` | `FAC-2026-005-BARACAT` |
| Rapport | `IPB-YYYY-NNN-NOM` | `IPB-2026-002-GARCIA` |

### Règles TVA
- **Prestations IPB (diagnostic, expertise)** → franchise **293 B** (« TVA non applicable »).
- **Estimations de travaux de reprise** dans un rapport → **TVA 10 %** (art. 279-0 bis CGI, rénovation logement > 2 ans). Toujours marquées « indicative — non contractuelle ».

---

## 1. DEVIS (3 pages)

**En-tête (chaque page)** : `IPB — Institut de Pathologie du Bâtiment | DEVIS  <N°>`
**Pied (chaque page)** : adresse | tél | email — `Page X / 3`

### Page 1 — Présentation
- Titre `DEVIS` + sous-titre : `<Objet> — M. <NOM>`
- Bloc méta : N° Devis · Établi le · **Valable jusqu'au (+30 j)** · Client · Téléphone · Email · Bien concerné · Objet
- Bloc **ÉMETTEUR** (constantes §0 + SIRET + APE)
- Bloc **CLIENT** (nom, adresse, tél, email)
- **Lettre d'intro personnalisée** (« MONSIEUR, / Suite à notre échange… ») — paragraphe type, valeur ajoutée de l'avis indépendant.

### Page 2 — Détail
- **DÉTAIL DE LA MISSION** : table `Désignation | Unité | Qté | P.U. | Total`
  - ligne désignation = objet + adresse du bien ; Unité « Forfait »
  - `Total HT` · `TVA non applicable — art. 293 B du CGI` · **`À REGLER`**
- **DÉROULÉ DE LA MISSION** : 2 colonnes à puces ▸
  - *Visite et investigations* (visite site, mesure fissuromètre, causes probables, désordres associés, hiérarchie, relevé photo daté)
  - *Livrable remis* (rapport 3-5 j ouvrés, synthèse photos légendées, causes + hiérarchisation, préconisations / orientation)
- **NOTRE APPROCHE** + **Périmètre du rapport** : avis de pré-orientation, **4 exclusions ▸** (pas note de calcul structure, pas expertise judiciaire, pas étude de sol G, pas constat d'huissier).

### Page 3 — Conditions
- **MODALITÉS** : acompte (souvent « aucun »), règlement virement, rapport sous 3-5 j après paiement, validité, TVA 293 B.
- **BON POUR ACCORD** : retour daté/signé + mention « Bon pour accord » ; **visite fixée sous 72 h** ; renvoi CGV (`/legal/cgv`).
- Double signature (gérant / client avec Date, Lieu, mention).
- Ligne légale de pied : SIRET | APE | TVA 293 B.

---

## 2. FACTURE

- Titre `FACTURE` + sous-titre `<Objet> — M. <NOM>`
- **Méta** : N° Facture · Date d'émission · **Date d'échéance (+30 j)** · Client · **Mandataire (optionnel)** · Site expertisé · Objet · Mode de règlement
- Bloc **ÉMETTEUR** (constantes §0)
- Bloc **CLIENT / DESTINATAIRE** — avec **« Représenté par : »** (mandataire : nom, rôle, agence, tél, email) si applicable
- **Objet de la prestation** : paragraphe contextualisé (pour le compte de…, dans le cadre de…, à la demande du mandataire…)
- **DÉTAIL DES PRESTATIONS** : table `Désignation | Unité | Qté | P.U. | Total`
  - `Total HT` · `TVA non applicable — art. 293 B du CGI` · **`Net à payer`**
- **MODALITÉS DE RÈGLEMENT** : échéance + mode ; bloc bancaire (Bénéficiaire, IBAN, BIC, Banque — §0)
- **Mentions de retard (obligatoires)** :
  - ▸ Pénalités : **3 × taux d'intérêt légal**, exigibles dès le lendemain de l'échéance
  - ▸ Indemnité forfaitaire recouvrement : **40 €** (art. L.441-10 C. com.)
  - ▸ Aucun escompte pour paiement anticipé
- **Mentions légales** : TVA 293 B · décennale en cours · SIRET · APE
- Clôture : « Fait à Tournefeuille, le <date> / Pour IPB / Signature du gérant »

---

## 3. RAPPORT DE DIAGNOSTIC TECHNIQUE

**En-tête** : coordonnées IPB + SIRET + APE + N° TVA.

### Page de garde
- `RAPPORT DE DIAGNOSTIC TECHNIQUE` + sous-titre type (`Diagnostic de pathologies de fissures`) + ligne contexte (`Façades extérieures et intérieur — Maison individuelle`)
- **IDENTIFICATION DU DOSSIER** (table) : Référence dossier (`IPB-…`) · Référence facture · Client(e) · Adresse du bien · Contact · Objet · Date du rapport · Expert · **Statut** (`RAPPORT DÉFINITIF`)

### Conclusion générale (encadré d'alerte en tête)
- Bandeau ⚠ avec verdict synthétique, liste des zones de désordre, et **budget estimatif des travaux** (`6 000 € HT`).

### PARTIE 1 — corps technique
- **1. Contexte** : 1.1 Objet de la mission · 1.2 **Limites de la mission** (encadré « Réserves d'usage » : diagnostic visuel privé, ni expertise judiciaire ni étude de structure, recours BET si litige).
- **Une section par zone** (2, 3, 4…) :
  - `X.1 Constatations visuelles` (puces)
  - `X.2 Analyse technique` (+ encadrés **Réf. technique** : ITSIM, DTU 26.1, BRGM argiles)
  - **Photos numérotées avec légendes** (Photo 1, 2, …)
  - **Encadré de gravité coloré** par zone : `⚠ … — À TRAITER` (orange) / `🔴 … — DÉSORDRE ACTIF` (rouge)
- **5. Tableau de synthèse** : `N° | Zone/Désordre | Mesure | Gravité | Préconisation`
  - Niveaux de gravité : **À TRAITER · IMPORTANT · À SURVEILLER**
- **6. Préconisations ordonnées** : `PRIORITÉ 1 / 2 / 3` (sondage, agrafage structurel, surveillance + témoins plâtre).
- **7. Estimation budgétaire travaux** : table `N° | Désignation | Unité | Montant HT | TVA 10%` ; `TOTAL HT / TTC` ; note « indicative — non contractuelle, TVA 10 % art. 279-0 bis ».
- **8. Conclusion** + encadré **RECOMMANDATIONS FINALES** (liste numérotée) + budget + note étude géotechnique **G5** si évolution.
- Clôture : « Pour IPB / Tournefeuille, <date> / **Diagnostiqueur Technique Indépendant** ».

### Référentiel technique cité (à proposer comme bibliothèque de paragraphes)
- **Classification ITSIM** des ouvertures : `< 0,2 mm` esthétique · `0,2–0,5 mm` surveillance · `≥ 2 mm` structurelle significative.
- **DTU 26.1** : fissures > 1 mm → traitement par agrafage avant enduit.
- **BRGM / retrait-gonflement argiles** (contexte Haute-Garonne / toulousain).
- **Mission G5** (étude géotechnique) en escalade.
- Outils : **fissuromètre Saugnac**, **témoins plâtre datés**.

---

## 4. Impact sur le modèle de données CRM (Phases 2 & 3)

Champs à prévoir au-delà du plan initial :
- **Devis/Facture** : `mandataire` (nom, rôle, société, tél, email), `bienConcerne`/`siteExpertise`, `objet`, `introLetter` (texte), `validUntil`/`dueDate` (+30 j), `acompte`, modalités.
- **Facture** : référence du devis source, IBAN/BIC (config), mentions de retard (constantes).
- **Rapport** : `refDossier`, `refFacture`, `statut`, `conclusionGenerale`, `zones[]` (titre, constatations[], analyse, refsTechniques[], photos[], gravité), `synthese[]`, `preconisations[]` (priorité), `estimationTravaux[]` (postes TVA 10 %), `recommandations[]`, `budgetHT`/`budgetTTC`.
- **Bibliothèque de paragraphes-types** réutilisables (limites de mission, réfs ITSIM/DTU, intro devis, déroulé mission).
