# Plan de remédiation — Chute de CTR & désindexation

**Date :** 23 juin 2026
**Site :** www.ipb-expertise.fr
**Source des données :** Google Search Console (90 jours) + inspection code + SERP live

---

## 1. Diagnostic (factuel)

### Ce qui se passe vraiment
Le CTR n'a pas chuté à cause des titres, des balises meta ou d'un bug technique.
**Il chute parce que le site rank en page 2-3 sur ses requêtes commerciales.**

Données GSC (90 j) :
- Clics totaux : **474** — dont ~16 % proviennent d'une seule requête de marque (« ipb expertise »).
- Impressions : **17 700**
- CTR moyen : **2,7 %**
- **Position moyenne : 16,1** (= page 2)

| Requête | Impressions | Clics | CTR | Position |
|---|---|---|---|---|
| ipb expertise *(marque)* | 182 | 76 | 41,8 % | 1,2 |
| expert fissure toulouse | 859 | 1 | 0,1 % | **31,7** |
| expert humidité toulouse | 325 | 1 | 0,3 % | **18,1** |
| expert fissures toulouse | 162 | 2 | 1,2 % | **18,0** |
| expert fissure maison toulouse | 125 | 3 | 2,4 % | **19,0** |
| prix maison fissurée | 82 | 5 | 6,1 % | 6,1 |

**Mécanique du CTR 4 % → 1,7 %** : le total d'impressions est stable, mais leur composition
s'est déplacée vers des requêtes commerciales où le site est en page 2-3 (CTR ≈ 0 %).
Les clics restent concentrés sur la marque. Résultat : CTR moyen divisé par ~2.

### La « désindexation » (rapport Indexation des pages)
- **Dans l'index : 268 pages** → l'indexation n'est PAS effondrée.
- **Non indexées : 205**, dont :
  - **115 = redirections** → normal et voulu (apex→www + 301 anti-cannibalisation). À ignorer.
  - **40 = « Explorée, actuellement non indexée »** → signal **qualité** : Google a crawlé et a jugé inutile d'indexer. Ce sont tes pages villes minces.
  - **32 = « Détectée, actuellement non indexée »** → budget de crawl / faible priorité.
  - **8 = « Google n'a pas choisi la même canonique que toi »** → à corriger.
  - **4 = doublon sans canonique** + **5 = 404** + **1 = erreur redirection** → à nettoyer.

**Cause racine unique :** trop de pages programmatiques (≈68 villes × plusieurs services)
pour le niveau d'autorité actuel du domaine. Google concentre la confiance sur l'accueil et
la marque, et déclasse / n'indexe pas le reste.

### Ce qui n'est PAS le problème (vérifié)
- `robots.txt`, `robots.ts`, `sitemap.ts` : **propres**, aucun blocage.
- Aucune balise `noindex` accidentelle sur des pages publiques.
- Canonique cohérente (www), redirections 301/308 correctes.
- **Titres affichés correctement** par Google (pas de réécriture). Le ☎ et les `·` passent bien.

---

## 2. Plan de remédiation priorisé

### 🔴 P0 — Faire remonter les 3-4 pages « money » de la page 2 à la page 1
*C'est 80 % de l'enjeu. Sans ça, rien ne change sur le CTR.*

Pages cibles : `/expert-fissures-toulouse-31`, `/expert-humidite-toulouse-31`,
`/expertise/fissures`, `/bureau-etude-structure-toulouse`.

Leviers (par ordre d'impact) :
1. **Autorité / backlinks locaux** — le levier décisif pour passer de pos. 18 à pos. 5.
   Tu as déjà `BACKLINKS_ANNUAIRES_2026.xlsx` : exécuter cette liste (annuaires locaux,
   presse régionale, partenaires, fédérations bâtiment). Viser 10-15 liens de qualité.
2. **Avis Google (fiche d'établissement)** — les concurrents en tête ont des fiches notées
   5,0 (79 avis, 16 avis…). Une fiche Google Business optimisée + avis réels est ce qui
   déclenche le pack local sur « expert fissures toulouse ».
3. **Profondeur de contenu** sur les pages money : passer de pages « template » à de vraies
   pages de référence (cas concrets, photos avant/après géolocalisées, process détaillé,
   tarifs indicatifs, FAQ longue). Google récompense la page la plus complète.
4. **Maillage interne** : concentrer les liens internes (blog, accueil, pages connexes) vers
   ces 3-4 pages money plutôt que de les diluer sur 68 villes.

### 🟠 P1 — Élaguer / consolider le long-tail villes (les 72 pages non indexées)
**Décision stratégique requise** (voir question ci-dessous) :
- **Option A (recommandée SEO) — Élaguer** : `noindex` + retrait du sitemap des villages
  sans volume de recherche ; garder ~15 villes à potentiel (Toulouse, Montauban, Auch,
  Colomiers, Blagnac, Muret, Tournefeuille, Balma, L'Union, Castelsarrasin…) et les enrichir.
  → Concentre l'autorité et le budget de crawl. Effet direct sur « Explorée non indexée ».
- **Option B — Enrichir** : garder toutes les villes mais réécrire le template pour générer
  du contenu réellement unique par commune. Plus lourd, plus lent, risqué si le contenu reste
  perçu comme généré.

> Les pages villes peuvent rester comme **landing pages Google Ads** (en `noindex`) même
> retirées du SEO — pas de perte côté acquisition payante.

### 🟡 P1 — Nettoyer les erreurs d'indexation
- Corriger les **5 × 404** (ajouter redirection 301 ou restaurer la page).
- Investiguer les **8 pages « Google a choisi une autre canonique »** + **4 doublons** :
  souvent un `canonical` qui pointe ailleurs que l'URL réelle, ou deux URLs trop proches.
- Ces correctifs sont rapides une fois la liste d'URLs extraite de GSC.

### 🟢 P2 — Entretien continu
- Publier régulièrement du contenu de fond (blog) ciblant les requêtes informationnelles
  où tu performes déjà (« prix maison fissurée » : pos 6,1, CTR 6,1 % — à pousser en top 3).
- `aggregateRating` : n'utiliser que des avis **réels** vérifiables (Google ignore — voire
  pénalise — les notes auto-déclarées non sourcées).
- Suivre la position moyenne mensuellement : l'objectif est de passer de 16,1 à < 10.

---

## 3. Application

**Applicable dans le code :**
- [x] **(Option A — FAIT) Élagage villes** : 17 villes prioritaires conservées (cœur 31/82/32),
      **50 villes désindexées** (`noindex` + hors sitemap). Sitemap villes : **132 → 32 URLs**.
      Liste centralisée et éditable dans `app/data/villes-prioritaires.ts`.
- [ ] Corriger les 5 × 404 (redirections dans `next.config.js`) — *nécessite l'extraction des URLs depuis GSC*.
- [ ] Corriger les canoniques en conflit (8 + 4 pages) — *idem*.
- [ ] Renforcer le maillage interne vers les pages money.
- [ ] Enrichir le contenu des 3-4 pages money.

**⚠️ À déployer :** ces changements sont dans le repo mais pas encore en ligne.
Commit + push sur `main` → Vercel déploie. Puis dans GSC : soumettre le sitemap à nouveau
et lancer la « Validation » sur le rapport d'indexation.

**Hors code (toi / action métier) :**
- [ ] Exécuter la campagne backlinks (`BACKLINKS_ANNUAIRES_2026.xlsx`).
- [ ] Optimiser la fiche Google Business + collecter des avis réels.
- [ ] Réactiver / arbitrer les campagnes Google Ads (actuellement « en veille »).

---

## 4. Attente réaliste
Les correctifs code (indexation, canoniques, maillage) se voient en **2-4 semaines**.
Le gain de position page 2 → page 1 dépend surtout de l'**autorité** (backlinks + avis) et
prend **2-4 mois**. Le CTR remontera mécaniquement dès que les pages money repasseront en
top 5-8 sur leurs requêtes cibles.
