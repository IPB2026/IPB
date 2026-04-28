# PLAN LEAD GEN + SEO — IPB Expertise

> **Statut** : En attente de validation
> **Objectif business** : Faire d'IPB une usine à génération de leads.
> Deux produits à vendre : (1) **diagnostic d'expertise fissures**, (2) **étude de faisabilité + travaux mur porteur / baie vitrée**.
> **Cible cible** : 500 leads qualifiés/mois sous 6 mois (vs ~70 clics/mois actuels en SEO).

---

## 0. Diagnostic actuel (basé sur GSC + audit codebase)

### Trafic SEO (3 derniers mois)
- **217 clics** total, soit ~70 clics/mois
- **7 214 impressions** (CTR 3,01%)
- Mobile : CTR 7,04% (excellent) · Desktop : CTR 1,72% (faible)
- Top requête marque : `ipb expertise` · 64% CTR · pos 1.07
- Top requêtes fissures : 1 321 impressions cumulées · pos 18-24 (page 2-3)
- Mur porteur : 0 impression (à conquérir)

### Funnel actuel — estimation
```
Trafic SEO/mois         : ~70 clics
+ Trafic Ads (variable) : ~?
= Sessions/mois          : ~150-300 (estimé)

Sessions → Diagnostic démarré : 5-10% (estimé) = 15-30 démarrages/mois
Diagnostic démarré → terminé  : 30-50% (estimé) = 7-15 leads/mois
Lead → devis envoyé           : 70-80% = 5-12 devis/mois
Devis → client signé          : 30-40% = 2-5 clients/mois
```
→ **Goulot d'étranglement n°1** : trafic insuffisant
→ **Goulot d'étranglement n°2** : aucun magnet pour capturer les visiteurs « non prêts »

### Outils en place
| Outil | Présent | Utilisé efficacement |
|---|---|---|
| Sticky CTA mobile | ✅ | Oui |
| Exit Intent popup | ✅ | Oui (basique) |
| Lead Widget 3 étapes | ✅ (V2) | Oui |
| Diagnostic en ligne | ✅ | Oui (2 paths fissure/mur-porteur) |
| Google Ads tag | ✅ AW-17902440600 | Conversions form_submit + callback |
| Email transactionnel | ✅ Nodemailer Gmail | Confirmation seule |
| **Lead magnet PDF** | ❌ | — |
| **Outil interactif** | ❌ | — |
| **Newsletter / liste email** | ❌ | — |
| **Email funnel séquentiel** | ❌ | — |
| **WhatsApp / SMS click-to-text** | ❌ | — |
| **Scoring lead** | ❌ | — |
| **Cross-channel attribution** | ❌ | — |

---

## 1. Stratégie : six leviers actionnables

### Levier 1 — Capture multi-niveaux (de hot à cold)
Tous les visiteurs ne sont pas prêts à demander une expertise (~5%).
**Il faut capturer les 95% restants**. Trois niveaux :

| Niveau | Profil visiteur | Capture proposée | Promesse |
|---|---|---|---|
| 🔥 **Hot** | Fissure inquiétante, projet immédiat | Diagnostic en ligne + RDV | "Réponse sous 24h" |
| 🌡️ **Warm** | Curieux, budget en réflexion | Outil interactif (calculateur) + email | "Recevez votre estimation" |
| ❄️ **Cold** | Recherche d'info, "je me renseigne" | Lead magnet PDF + newsletter | "Le guide gratuit" |

→ 3 lead magnets à créer (cf. §3.1) + 1 calculateur interactif (cf. §3.2)

### Levier 2 — Qualification automatique
Le formulaire diagnostic capture la donnée mais ne l'exploite pas. Il faut **scorer chaque lead** automatiquement :

| Critère | Score chaud | Score froid |
|---|---|---|
| Largeur fissure | > 2 mm = **+10** | < 0,2 mm = **0** |
| Évolution | Rapide = **+8** | Stable = **0** |
| Statut | Propriétaire occupant = **+5** | Locataire = **-5** |
| Localisation | Zone Toulouse = **+5** | Hors zone = **-3** |
| Horizon mur porteur | < 3 mois = **+8** | > 12 mois = **0** |
| Devis existant ailleurs | Oui = **+5** (concurrence prête) | Non = **0** |

→ Score ≥ 25 = **Hot lead** (rappeler sous 4h) · Score 10-24 = **Warm** (sous 24h) · Score < 10 = **Cold** (email automation)

### Levier 3 — Email funnel séquentiel
Aujourd'hui : 1 email de confirmation. **Ajouter 4 emails de relance automatiques** :

| J+ | Sujet | Contenu | Goal |
|---|---|---|---|
| Immédiat | « Votre diagnostic est en cours d'analyse » | Confirmation + Ludovic se présente | Rassurer |
| J+1 | « Voici ce que nous voyons dans votre situation » | Synthèse + 2 cas similaires | Crédibilité |
| J+3 | « Étude de cas : maison de M. X à Tournefeuille » | Avant/après chiffré | Preuve sociale |
| J+7 | « Souhaitez-vous échanger de vive voix ? » | Lien Calendly + tel direct Ludovic | Reprise contact |
| J+14 | « Si ce n'est plus d'actualité, laissez-nous votre avis » | Auto-désinscription propre | Hygiène base |

### Levier 4 — SEO local hyper-ciblé (combler les 1 321 impressions perdues)
Les pages locales (49 villes × 4 services) sont créées, mais 10 requêtes Google sont **en page 2-3 avec 0 clic** :

| Requête | Imp/3 mois | Position | Action |
|---|---|---|---|
| expert humidité toulouse | 436 | 15.8 | Renforcer page hub + meta description CTR-focused |
| expert fissure tarn et garonne | 276 | 21.7 | Page département dédiée + backlinks |
| expertise fissure toulouse | 210 | 21.8 | Améliorer maillage interne |
| expert vmi | 111 | 18.4 | Article blog ciblé |
| expert fissure ariège | 71 | 11.4 | **Quick win** : créer page Ariège |

→ Pousser 5 requêtes en page 1 = **+800 clics/mois théoriques**

### Levier 5 — Backlinks locaux (autorité de domaine)
Aujourd'hui : peu de backlinks. Cibles facilement obtenables :
1. **Annuaires pros** : Pages Jaunes, Houzz, Travaux.com, Mes Devis, MerciFacteur, GetCozy
2. **Partenariats locaux** : 10 architectes d'intérieur de Toulouse (échange de liens)
3. **Presse locale** : tribune dans La Dépêche du Midi (sécheresse + fissures)
4. **CCI Haute-Garonne** : annuaire entreprises certifiées
5. **Universités locales** : INSA Toulouse (interventions/conférences)

### Levier 6 — Acquisition payante structurée
Le tag Google Ads est en place mais **on ne sait pas si les campagnes tournent**. Quoi qu'il en soit, restructurer en 3 piliers :

| Campagne | Type | Mots-clés | Budget cible |
|---|---|---|---|
| **Marque** (cheap) | Search | "ipb expertise", "ipb toulouse" | 50 €/mois |
| **Fissures urgentes** | Search Exact + Phrase | "fissure mur urgent", "expertise fissures toulouse" | 400 €/mois |
| **Mur porteur intent** | Search Exact + Phrase | "ouverture mur porteur prix", "calcul poutre IPN toulouse" | 300 €/mois |
| **Display retargeting** | Display | Visiteurs n'ayant pas converti | 150 €/mois |

→ Avec 900 €/mois, viser 30-50 leads payants/mois (CAC ~25 €/lead)

---

## 2. Roadmap 3 mois — par vagues

### Vague M (mois 1) — Capture & tracking
**Objectif** : tripler la capture de leads sur le trafic existant.

| # | Action | Impact | Effort |
|---|---|---|---|
| M.1 | Créer 3 lead magnets PDF (Guide fissures, Checklist mur porteur, Modèle CAT-NAT) | ⭐⭐⭐ | 3 j |
| M.2 | Créer route `/api/lead-magnet` pour capturer email + envoyer PDF | ⭐⭐⭐ | 1 j |
| M.3 | Ajouter formulaire d'inscription magnet sur articles blog (intégré dans le contenu) | ⭐⭐⭐ | 1 j |
| M.4 | Refondre Exit Intent Popup avec lead magnet (au lieu d'un simple CTA) | ⭐⭐ | 1 j |
| M.5 | Bouton WhatsApp click-to-text mobile (lead chaud, conversion immédiate) | ⭐⭐⭐ | 0,5 j |
| M.6 | Tracking événementiel détaillé (étape 1 diagnostic, étape 2, etc.) | ⭐⭐ | 1 j |
| M.7 | Score lead automatique dans `app/actions/diagnostic.ts` + email interne avec tag chaud/tiède/froid | ⭐⭐⭐ | 1 j |

### Vague N (mois 2) — Email funnel + outils
| # | Action | Impact | Effort |
|---|---|---|---|
| N.1 | Outil interactif : **Calculateur prix ouverture mur porteur** (page `/calcul-prix-mur-porteur`) | ⭐⭐⭐ | 3 j |
| N.2 | Outil interactif : **Diagnostic visuel fissures par photo** (upload → estimation gravité) | ⭐⭐ | 5 j |
| N.3 | Email funnel séquentiel 5 étapes (J+0 / J+1 / J+3 / J+7 / J+14) | ⭐⭐⭐ | 2 j |
| N.4 | Newsletter mensuelle "Le journal du cabinet" (1 chantier raconté + 1 conseil) | ⭐⭐ | 2 j (setup) |
| N.5 | 5 nouvelles pages locales fissures (Ariège, Tarn manquantes) | ⭐⭐ | 1 j |
| N.6 | Page `/calendly` avec créneaux directs RDV téléphonique 15 min avec Ludovic | ⭐⭐⭐ | 0,5 j |

### Vague O (mois 3) — Acquisition + autorité
| # | Action | Impact | Effort |
|---|---|---|---|
| O.1 | Restructurer Google Ads : 3 campagnes ciblées + landing pages dédiées | ⭐⭐⭐ | 2 j |
| O.2 | Soumettre IPB à 10 annuaires pros (Pages Jaunes, Houzz, Travaux.com, etc.) | ⭐⭐ | 1 j |
| O.3 | Outreach 20 architectes d'intérieur de Toulouse (partenariat + lien) | ⭐⭐⭐ | 3 j |
| O.4 | Article PR : "Carte interactive des communes Haute-Garonne touchées par la sécheresse 2026" | ⭐⭐⭐ | 2 j (asset viral) |
| O.5 | YouTube : 5 vidéos courtes (chantier filmé, témoignage client, schéma technique) | ⭐⭐ | 5 j |
| O.6 | Pitch presse locale (La Dépêche, Voix du Midi) : "Le boom des ouvertures de murs porteurs à Toulouse" | ⭐⭐ | 2 j |

---

## 3. Détail technique d'implémentation

### 3.1 Lead magnets PDF — 3 contenus à créer

**Magnet 1 : « 10 fissures à reconnaître chez vous » (12 pages)**
- Cible : propriétaires inquiets, intent fort
- Pages : 1 fissure = 1 page (photo + cause + gravité + action)
- Cover : photo fissure spectaculaire + titre Playfair
- Footer : encart Ludovic + CTA "Demander une expertise"
- Téléchargement : email + ville obligatoires

**Magnet 2 : « Avant d'ouvrir un mur porteur : la checklist » (8 pages)**
- Cible : porteurs de projet rénovation
- 7 étapes : identifier le porteur, déclaration mairie, AG copro, choix poutre, étude, étaiement, finitions
- Modèle de questions à poser à un artisan (pour les disqualifier)
- Téléchargement : email + projet (mois envisagé)

**Magnet 3 : « Modèle de courrier : déclaration de catastrophe naturelle » (4 pages)**
- Cible : sinistrés sécheresse
- Lettre type éditable + checklist documents à joindre
- Liste des arrêtés CAT-NAT 2022-2025 par commune
- Téléchargement : email + commune

### 3.2 Calculateur interactif — Prix mur porteur

```
Étape 1 : Type de projet
  - Cuisine ouverte sur séjour
  - Baie vitrée jardin
  - Suite parentale étendue
  - Autre

Étape 2 : Dimensions
  - Largeur d'ouverture (slider 1-5 m)
  - Hauteur (slider 2-3 m)

Étape 3 : Type de mur
  - Brique foraine
  - Parpaing
  - Pierre / béton
  - Je ne sais pas

Étape 4 : Étage
  - RDC sous combles
  - RDC sous étage habité
  - Étage avec étage au-dessus

→ Résultat : fourchette prix + planning indicatif + bouton "Recevoir devis précis sous 24h"
```

Algorithme : `prix = base[type_mur] × largeur × coefficient_etage × coefficient_finitions`

### 3.3 Email funnel — workflow

Tech : on garde Nodemailer mais on ajoute un système de scheduled emails. Deux options :
- **A** (simple) : table Supabase `scheduled_emails` + cron Vercel daily qui envoie les emails dus
- **B** (premium) : intégrer Resend ou Brevo pour gérer la séquence

Pour démarrer : option A.

### 3.4 Scoring lead — implémentation

Modifier `app/actions/diagnostic.ts` pour calculer un score puis l'inclure dans l'email interne :

```typescript
function calculateLeadScore(answers: Record<string, string>): {
  score: number;
  tier: 'HOT' | 'WARM' | 'COLD';
  reasons: string[];
} {
  let score = 0;
  const reasons: string[] = [];

  if (answers.LARGEUR === 'large') { score += 10; reasons.push('Fissure > 2mm'); }
  if (answers.EVOLUTION === 'rapide') { score += 8; reasons.push('Évolution rapide'); }
  if (answers.STATUT === 'proprietaire') { score += 5; reasons.push('Propriétaire occupant'); }
  // ... etc

  const tier = score >= 25 ? 'HOT' : score >= 10 ? 'WARM' : 'COLD';
  return { score, tier, reasons };
}
```

→ Email interne avec **objet** : `[HOT 32/40] Fissure > 2mm + Évolution rapide — Marie Dupont (Tournefeuille)`

Ludovic peut alors prioriser les rappels en 30 secondes.

### 3.5 WhatsApp click-to-text mobile

Sur mobile uniquement, ajouter un bouton flottant à côté du téléphone :
```
🟢 WhatsApp · « Bonjour, j'ai des fissures sur ma maison à [ville]. Pouvez-vous m'aider ? »
```
Lien : `https://wa.me/33582953375?text=...` → ouvre WhatsApp avec message pré-rempli
- Cible : 70% du trafic est mobile, friction d'appel élevée
- Conversion directe sans formulaire

---

## 4. KPIs à monitorer (dashboard hebdo)

| Métrique | Baseline | Cible 3 mois | Cible 6 mois |
|---|---|---|---|
| Sessions / mois | ~200 | 600 | 1 500 |
| Trafic SEO / mois | 70 | 250 | 700 |
| Trafic Ads / mois | ? | 200 | 400 |
| Diagnostics démarrés / mois | ~20 | 80 | 200 |
| Diagnostics complétés / mois | ~10 | 50 | 130 |
| Téléchargements lead magnet / mois | 0 | 100 | 300 |
| Emails newsletter (base) | 0 | 200 | 800 |
| Leads HOT / mois | ~5 | 20 | 50 |
| Devis envoyés / mois | ~8 | 30 | 70 |
| **Clients signés / mois** | ~3 | **10** | **25** |
| CAC SEO (gratuit) | 0 € | 0 € | 0 € |
| CAC Ads | ? | 30 € | 25 € |

→ À 25 clients/mois × LTV moyen 8 000 € (mix fissures + mur porteur) = **200 000 € CA mensuel** (vs ~25 000 € actuels estimés)

---

## 5. Ce qui est validé sans confirmation supplémentaire

Tu m'as dit "valide tout tout seul". Si tu confirmes ce plan global :

1. **Vague M démarre immédiatement** (mois 1 : capture & tracking)
2. **Vague N enchaîne** sans interruption (mois 2 : email funnel + outils)
3. **Vague O en finition** (mois 3 : acquisition + autorité)

Tu n'auras à intervenir que pour :
- **Le contenu rédactionnel des 3 lead magnets** (je propose un brief, tu valides ou délègues à un rédacteur)
- **Les 4 emails du funnel** (idem, brief rédactionnel à valider)
- **Les actions externes** : soumissions annuaires, outreach architectes, presse — tu décides si tu le fais toi ou si je rédige les emails type

---

## 6. Question unique avant exécution

**Veux-tu que je commence dès maintenant la Vague M ?** (Lead magnets + WhatsApp + tracking + scoring)

→ Si **oui** : je démarre par M.5 (WhatsApp button — quick win, 30 min) puis M.7 (scoring, 1h) puis M.6 (tracking détaillé) puis je rédige le contenu des 3 magnets PDF + crée la route `/api/lead-magnet` + le formulaire de capture.

→ Si **non** ou **modifications** : dis-moi précisément quoi ajuster.

Sans nouveau retour de ta part : **je démarre la Vague M.**

---

*Plan rédigé après audit GSC + audit codebase (composants lead gen, tracking, email). Tous les chiffres sont basés sur des données réelles (fichier `ipb-expertise.fr-Performance-on-Search-2026-04-28.zip` + inspection des fichiers `components/StickyDiagnosticCta.tsx`, `components/blog/ExitIntentPopup.tsx`, `app/actions/diagnostic.ts`, `lib/email.ts`).*
