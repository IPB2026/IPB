# PLAN DE REFONTE V2 — IPB Expertise

> **Statut** : En attente de validation
> **Brief de référence** : `IPB_Design_Handoff.md` (transmis le 28/04/2026)
> **À approuver section par section avant exécution**

---

## 0. Reconnaissance des erreurs précédentes

Ce que j'ai mal fait dans la session jusqu'ici, en clair :

| Erreur | Cause racine | Conséquence |
|---|---|---|
| Site « statique sans âme », pas fluide | J'ai bricolé sur les composants existants (Tailwind générique, pas de scroll-reveal, pas de typo serif éditoriale) au lieu de partir d'une direction artistique | Rendu visuel banal, indistingable d'un site SaaS générique |
| Skill UI/UX Pro Max non utilisé | Le skill a été commit mais pas chargé en session courante (il faut redémarrer Claude Code). J'ai juste lu 3 CSV | Pas de système design cohérent appliqué |
| Trop de mur porteur, pas assez de fissures | J'ai surinvesti le pivot stratégique en oubliant que **les fissures sont le terrain SEO historique** (276 + 210 + 153 + 121 impressions sur les top requêtes fissures) | Désequilibre éditorial, on perd l'historique |
| Section TrustSignals « indépendants / tout en interne » bullshit | Du copywriting marketing creux que tous les concurrents disent. Aucune preuve factuelle | Décrédibilise au lieu de rassurer |
| Études de cas avec mauvaises photos | Les 3 photos `etude-cas-baie-vitree-1/2/3.webp` sont du **même chantier baie vitrée**, et j'ai utilisé l'une d'elles pour illustrer un cas « sécheresse + fissures » sans logique | Mensonge visuel, casse la confiance |
| FAQ générique | 6 questions banales, pas connectées aux requêtes Google réelles | FAQ inutile pour le SEO et pour le visiteur |
| Blog filtre « Fissures · Humidité » sans Mur Porteur | Le pivot n'a pas été propagé au blog | Incohérence avec le nouveau positionnement |
| Copywriting « pushy » | « Devis sous 24h », « On revient gratuitement », « Décrire mon projet en 3 minutes » → ton commercial | Le visiteur premium fuit, perçoit du télémarketing |

---

## 1. Direction artistique cible (résumée du Design Handoff)

> Source autoritaire : ton fichier `IPB_Design_Handoff.md`. Tout ce qui suit en découle.

### 1.1 Concept
**Cabinet de prestige.** Esthétique éditoriale (Kinfolk, cabinets d'architectes suisses).
Pas un site d'artisan. Pas un site SaaS. Pas un site agressif.
**La respiration EST le message.**

### 1.2 Palette (à appliquer en variables CSS dans `globals.css`)
```css
--ipb-navy:      #0B1826;   /* fond sombre, nav dark, footer */
--ipb-navy-2:    #0F2033;
--ipb-orange:    #C8601F;   /* CTA et accents — RARE */
--ipb-orange-l:  #F08040;
--ipb-cream:     #F3EFE8;   /* fond principal — JAMAIS blanc pur */
--ipb-stone:     #E8E2D9;
--ipb-white:     #FAF9F7;   /* nav, cards */
--ipb-rule:      #D8D2C9;   /* séparateurs */
--ipb-text:      #1A1917;
--ipb-muted:     #736D67;
--ipb-light:     #A09A93;
```
→ **Casse complète** avec la palette actuelle (slate-900, white, orange-500). Tout doit être migré.

### 1.3 Typographie (à remplacer Inter + Space Grotesk)
- **Playfair Display** (serif italique signature) pour H1–H3 et chiffres stats
- **DM Sans** pour body et UI
- Règle italique : la ligne colorée orange du H1 est **systématiquement en italique** (signature éditoriale)

### 1.4 Layout
- `max-width: 1240px`
- `--section-v: 96px` (padding vertical sections)
- Hero grille `58fr 42fr`
- Sections alternées `cream → white → cream → navy → white` — **jamais 2× la même couleur consécutivement**

### 1.5 Composants signature
- **Service list architectural** : liste numérotée `01–04` avec séparateurs (PAS des cards)
- **Eyebrow** : ligne 36px + label uppercase 10px letter-spacing 0.18em
- **Crack SVG** animé (stroke-dashoffset) : signature visuelle dans le hero, version mini en footer
- **Boutons CTA** avec **effet magnétique** (translate suit le curseur)
- **Compteurs stats** animés à l'entrée viewport (0 → valeur, easing ease-out, 1800ms)
- **Carousel testimonials** auto-rotate 7s, navigation latérale nommée
- **Widget lead 3 étapes** flottant bottom-right, apparaît après 5s

### 1.6 Animations
- **Scroll reveal** sur tous les blocs (IntersectionObserver, threshold 0.08, opacity + translateY 28px → 0, duration 0.9s, cubic-bezier(.16,1,.3,1), délais échelonnés 0/0.06/0.12s)
- **Page transition** `pageIn 0.44s` à chaque navigation
- **Logo hover** : rotate(-4deg) sur le carré orange
- **Respect `prefers-reduced-motion`** (obligatoire — accessibilité)

---

## 2. Réorientation stratégique : fissures > mur porteur

### Données SEO (rappel GSC 3 mois)

| Requête | Impressions | Position |
|---|---|---|
| expert fissure toulouse | 318 | 38.2 |
| expert fissure tarn et garonne | 276 | 21.7 |
| expertise fissure toulouse | 210 | 21.8 |
| expertise fissure haute garonne | 153 | 19.1 |
| expertise fissure montauban | 129 | 24.1 |
| expert fissures toulouse | 121 | 20.4 |
| expert fissure haute garonne | 114 | 21.7 |
| **Total fissures top 7** | **1 321** | — |
| ouverture mur porteur toulouse | **0 impression** | — |

**Conclusion** : les fissures sont **le terrain de jeu historique**. Le mur porteur est un pari nouveau qui mettra 6 à 12 mois à ranker. Le site doit donc **honorer fissures en priorité** — c'est ce qui amène le trafic aujourd'hui.

### Application concrète

| Élément | Fissures | Mur porteur |
|---|---|---|
| Hero — ordre dans le H1 | **1er** | 2e |
| Photos hero | **2 photos fissures** | 1 photo mur porteur |
| Études de cas (3 cards) | **2 cas fissures** | 1 cas mur porteur |
| Service list home | **01 Fissures (en haut)** | 02 Mur porteur |
| Blog catégories visibles | **Fissures · Mur Porteur · Conseils** (Humidité masqué du filtre principal mais articles toujours indexés) | |

---

## 3. Audit chaîne email diagnostic (état actuel)

### Inspection effectuée
- `lib/email.ts` : Nodemailer + Gmail SMTP (variables `SMTP_USER` / `SMTP_PASS`)
- `app/actions/diagnostic.ts` : 3 envois email
  - Lead émis vers `process.env.EMAIL_TO` (toi)
  - Confirmation client vers email saisi par l'utilisateur
  - Rapport final (PDF en pièce jointe)
- Variables d'env requises (à vérifier sur Vercel) :
  - `SMTP_USER` (Gmail)
  - `SMTP_PASS` (mot de passe d'application Gmail)
  - `EMAIL_TO` (ton adresse de réception)
  - `EMAIL_FROM_NAME` (nom expéditeur)
  - `NEXT_PUBLIC_SITE_URL`
  - `EMAIL_LOGO_URL` (optionnel)

### Verdict
- ✅ **La chaîne est intacte** — je n'ai jamais touché à ces 2 fichiers
- ✅ **Le diagnostic couvre déjà mur porteur ET fissures** (parcours `'fissure' | 'mur-porteur'` ligne 22 + 2 jeux complets de questions)
- ⚠️ **À vérifier côté Vercel** : que les 4 variables d'env essentielles sont bien définies en production. Si tu reçois plus rien depuis quelques jours, c'est probablement ça (un mot de passe d'app Gmail expire si l'authentification 2FA change).

### Action proposée
1. **Test de bout en bout** : tu remplis un faux diagnostic en local, je vérifie les logs server pour confirmer que l'email part
2. **Page admin de monitoring** (optionnel) : un petit dashboard `/api/health/email` qui ping le SMTP au démarrage

### Améliorations diagnostic (UX, sans toucher la chaîne email)
- **Choix initial** : la page commence par « Que voulez-vous faire ? » avec **3 cartes égales** : Diagnostiquer une fissure / Ouvrir un mur porteur / Je ne sais pas (chat) — actuellement c'est probablement déjà 2 cartes, on rééquilibre visuellement
- **Copy** : virer les emojis dans les labels (📐 📏 etc.) — incompatible avec le ton premium
- **Récapitulatif final** : pas de score « danger 1/10 », mais une analyse posée signée par Ludovic
- **Email de confirmation** : retravailler le HTML pour matcher la nouvelle charte (Playfair Display, navy, cream)

---

## 4. Plan d'exécution par vagues

### Vague A — Fondations design (priorité absolue, sans elle rien ne tient)
**Estimé** : 2-3h de travail

1. **Migration palette CSS** dans `app/globals.css`
   - Remplacer toutes les références slate/white/orange-500 par les variables `--ipb-*`
   - Définir `bg-cream`, `text-ipb-text`, `border-ipb-rule` comme classes utilitaires Tailwind via `tailwind.config.ts`
2. **Migration typographie** dans `app/layout.tsx`
   - Remplacer Inter + Space_Grotesk par **Playfair_Display** + **DM_Sans** depuis `next/font/google`
   - Variables CSS `--font-serif` et `--font-sans`
3. **Composant `<Eyebrow>`** réutilisable (`components/ui/Eyebrow.tsx`)
4. **Composant `<MagneticButton>`** réutilisable (`components/ui/MagneticButton.tsx`)
5. **Composant `<RevealOnScroll>`** réutilisable (IntersectionObserver, respect `prefers-reduced-motion`)
6. **Composant `<CrackSVG>`** : la fissure animée (signature visuelle)
7. **Composant `<StatCounter>`** : compteurs animés

### Vague B — Hero & Nav refonte radicale
**Estimé** : 1.5h

1. **Nouvelle Navbar** — sticky 68px, fond `--ipb-white`, logo carré orange 36×36px (init "IPB" en blanc), liens uppercase 11px, CTA orange compact
2. **Top bar** — bandeau navy 36px avec téléphone + indicateur live vert pulsant
3. **Hero** — split 58/42
   - Gauche : eyebrow « Cabinet de pathologie du bâtiment · depuis 2019 » + H1 Playfair italic ("Diagnostic de fissures & ouverture de mur porteur") + paragraphe DM Sans 15px / 1.9 + 2 boutons (primary orange + ghost) + ligne stats `850 chantiers · 4.9/5 · décennale AXA`
   - Droite : panel `--ipb-navy` plein, **Crack SVG animé** signature, 2 liens services discrets

### Vague C — Refonte composants home (rééquilibrage fissures > mur porteur)
**Estimé** : 3h

4. **Pull quote** — fond `--ipb-navy-2`, citation Ludovic pleine largeur, ligne orange verticale gauche
5. **Service list architectural** (PAS des cards)
   - 01 — Diagnostic & traitement de fissures
   - 02 — Ouverture de mur porteur & baie vitrée
   - 03 — Expertise avant achat
   - 04 — Bureau d'études structure (B2B)
   - Format : grille `56px 1fr 48px`, séparateurs `--ipb-rule`, numéro Playfair 12px, titre Playfair 22px, flèche cercle 40×40 hover translate(4px)
6. **Section "Notre méthode" (5 étapes — accompagnement complet)** *(à conserver)*
   - 1. On vient sur place, on regarde
   - 2. On vous explique ce qu'on voit
   - 3. On chiffre, on vous remet l'étude
   - 4. On exécute les travaux
   - 5. On vous remet tous les documents et la garantie
7. **Section "Cabinet" (REMPLACE TrustSignals « indépendants / tout en interne »)**
   - Photo Ludovic + portrait factuel signé
   - 4 chiffres factuels vérifiables : année de création (2019), nombre de chantiers livrés (850+), note Google (4.9/5 sur X avis), montant assurance décennale active (AXA France IARD, police n°...)
   - Pas de promesse, pas de superlatif, pas de slogan
8. **Études de cas — 3 cards corrigées** (mauvaises photos virées)
   - Cas 1 : **Fissure structurelle Tournefeuille** — photo `fissures-avant-apres.webp` (vraie photo avant/après fissure)
   - Cas 2 : **Mur porteur ouvert Saint-Cyprien** — photo `baie-coulissante-apres.webp` (vraie après)
   - Cas 3 : **Fissures et tassement Castanet** — photo `fissure-facade-verticale.webp` ou `fissure-coin-maison.webp`
   - **Équilibre visuel : 2 fissures / 1 mur porteur** — fidèle à la priorité SEO
9. **Section stats monumentales** — fond navy, chiffres Playfair `clamp(60px, 6.5vw, 100px)`, compteurs animés
10. **Carousel testimonials** — éditorial, navigation latérale nommée, auto-rotate 7s
11. **CTA final** — split texte / grand numéro de téléphone Playfair

### Vague D — Pages services (Fissures, Mur Porteur)
**Estimé** : 2h

12. **`/expertise/fissures`** — refonte complète selon pattern Service Page du Handoff
    - Hero split avec photo `fissures-avant-apres.webp`
    - Grille 2×2 types de fissures (faïençage / structurelle / lézarde / horizontale) avec barre colorée d'urgence latérale
    - Section méthode fond navy + image `fissure-coin-maison.webp` gauche / liste droite
13. **`/expertise/mur-porteur`** — refonte selon même pattern
    - Hero split avec `baie-coulissante-apres.webp`
    - Grille 2×2 types de projets
    - Section méthode + schéma technique `schema-ouverture-mur-porteur.webp`

### Vague E — FAQ alignée sur les requêtes Google réelles
**Estimé** : 1h

14. **Nouvelle FAQ home** — 8-10 questions construites depuis le ZIP GSC :
    - « Comment savoir si une fissure sur ma maison est dangereuse ? » *(répond à `expertise fissure toulouse`, `expert fissure maison toulouse`)*
    - « Combien coûte une expertise fissure à Toulouse ? » *(répond à `prix maison fissurée`)*
    - « Mon assurance prend-elle en charge les fissures de sécheresse ? » *(répond aux requêtes CAT-NAT)*
    - « Quelle est la différence entre agrafage et micropieux ? »
    - « Faut-il déclarer une ouverture de mur porteur en mairie ? »
    - « Peut-on ouvrir un mur porteur dans un appartement en copropriété ? »
    - « Quelle poutre pour ouvrir un mur porteur (IPN, HEB, IPE) ? »
    - « Combien de temps faut-il pour une expertise complète ? »
    - « Pourquoi choisir un cabinet indépendant plutôt qu'un artisan ? »
    - « Vos rapports sont-ils acceptés par mon assurance ? »
    - Style : `<details>` natif, animation hauteur fluide, séparateurs `--ipb-rule`

### Vague F — Blog refonte filtres + sortie « humidité » du discours principal
**Estimé** : 1h

15. **`app/blog/page.tsx`** — nouveau jeu de filtres affichés
    - Tous · Fissures · Mur porteur · Conseils · Expertise
    - Catégorie « humidité » conservée dans les données mais **non affichée dans le filtre principal** (les articles restent indexés et accessibles via "Tous" et via URL directe — préserve le SEO historique)
16. **`app/data/blog.ts`** — type étendu pour ajouter `'mur-porteur'`
    - Articles existants `prix-ouverture-mur-porteur-toulouse-2026` et `etude-de-cas-mur-porteur-4m-t3-toulouse` rebadgés depuis 'expertise' vers 'mur-porteur'
17. **Section blog "Le blog IPB est rédigé par nos experts en pathologie du bâtiment intervenant à Toulouse..."** (`app/blog/page.tsx:326`) — réécriture pour parler structure/fissures/mur porteur sans mentionner humidité

### Vague G — Diagnostic : équilibrage fissure/mur porteur + ton premium
**Estimé** : 2h (sans toucher à la chaîne email)

18. **Page d'entrée diagnostic** — 3 cartes égales en taille
    - Carte 1 : « J'ai des fissures qui m'inquiètent » (priorité visuelle)
    - Carte 2 : « Je veux ouvrir un mur ou poser une baie vitrée »
    - Carte 3 : « Je ne sais pas / Je veux parler à quelqu'un » (ouvre le téléphone ou un mini-chat)
19. **Questions** — virer tous les emojis (📐 📏 🚨 🌡️) des labels, remplacer par icônes Lucide cohérentes ou rien
20. **Récapitulatif final** — pas de score « danger 1/10 », pas de vocabulaire urgentiste. À la place : « D'après vos réponses, voici ce qu'on en pense. Ludovic vous appellera sous 24h pour un échange technique. »
21. **Email de confirmation** — retravailler le HTML (`app/actions/diagnostic.ts` lignes 411 et 667) pour matcher la charte Playfair / navy / cream
22. **Test de bout en bout** : tu remplis un faux diagnostic en local, on vérifie ensemble que l'email arrive

### Vague H — Footer + Widget Lead
**Estimé** : 1h

23. **Footer** — fond navy, grid `1.6fr 1fr 1fr 1fr`, téléphone Playfair 20px, mini-fissure SVG décorative
24. **Widget lead 3 étapes** — flottant bottom-right, apparition après 5s, fond `--ipb-white`, animation `slideUpFade`

### Vague I — Copywriting global : ton « assurance » au lieu de « promesse »
**Estimé** : 1.5h (balayage tous fichiers)

Règles de réécriture systématiques :

| Avant (pushy / promesse) | Après (assurance / fait) |
|---|---|
| « Devis gratuit sous 24h » | « Notre devis est gratuit. » |
| « On revient gratuitement si ça bouge » | « Garantie décennale active depuis 2019 (AXA France). » |
| « Décrire mon projet en 3 minutes » | « Demander une expertise » |
| « Si ça bouge, on revient. Gratuitement. » | « Décennale AXA : nos travaux sont assurés 10 ans. » |
| « Réponse d'un expert sous 24h » | « Notre cabinet répond sous 24h. » |
| Emojis dans le copy | Aucun |
| Phrases avec « ! » | Toujours en `.` |

Fichiers concernés : `Hero.tsx`, `TrustSignals.tsx` *(remplacée par Cabinet section)*, `CaseStudies.tsx` *(remplacée par nouveau composant)*, toutes les pages `/partenaires/*`, `/expertise/*`, `/expert-mur-porteur/[ville]`, `/expert-fissures/[ville]`, `/bureau-etude-structure-toulouse`.

### Vague J — QA final
**Estimé** : 1h

25. `npm run build` : aucune erreur, 375 pages générées
26. `npm run lint` : 0 warning bloquant
27. **Test diagnostic email** — tu fais un faux diagnostic en local, on vérifie l'arrivée mail
28. **Test responsive** : 1440 / 1024 / 768 / 480 (cf. section 10 du Handoff)
29. **Test `prefers-reduced-motion`** : DevTools → Rendering → Emulate `reduce` — toutes les animations doivent se désactiver
30. **Test Lighthouse** sur la home : Performance, Accessibility, SEO, Best Practices

---

## 5. Estimation totale et ordre d'exécution

| Vague | Durée | Bloquante pour la suivante ? |
|---|---|---|
| A — Fondations design | 2-3h | **Oui** (tout le reste en dépend) |
| B — Hero & Nav | 1.5h | Non (mais à faire tôt pour cohérence) |
| C — Composants home | 3h | Non |
| D — Pages services | 2h | Non |
| E — FAQ | 1h | Non |
| F — Blog | 1h | Non |
| G — Diagnostic | 2h | Non |
| H — Footer + Widget | 1h | Non |
| I — Copywriting global | 1.5h | Oui (balayage final) |
| J — QA | 1h | Oui (validation) |
| **Total** | **~16h** | — |

→ Pour limiter le risque, je propose **une PR par vague** plutôt qu'une PR monolithique. Tu vois le résultat à chaque étape, tu peux corriger le tir.

---

## 6. Photos disponibles — usage planifié

| Fichier | Usage prévu |
|---|---|
| `fissures-avant-apres.webp` | **Étude de cas Fissures #1** + Hero gauche split |
| `fissure-facade-verticale.webp` | Étude de cas Fissures #2 + page expertise/fissures hero |
| `fissure-coin-maison.webp` | Section méthode page expertise/fissures |
| `fissure-facade-diagonale.webp` | Page `/expert-fissures-toulouse-31` |
| `baie-coulissante-apres.webp` | **Étude de cas Mur Porteur #1** + page expertise/mur-porteur hero |
| `creation-baie-vitree-1.webp` | Mini-galerie page mur porteur |
| `creation-baie-vitree-2.webp` | Page partenaires/architectes |
| `etude-cas-baie-vitree-1/2/3.webp` | **NE PAS UTILISER comme cards séparées** (même chantier) — éventuellement utiliser une seule comme bandeau pleine largeur |
| `ouverture-mur-porteur.webp` | Section méthode page expertise/mur-porteur |
| `schema-ouverture-mur-porteur.webp` | Pédagogie page expertise/mur-porteur |
| `ludovic-expert-ipb.webp` | **Section "Cabinet" home** (remplace TrustSignals) + page partenaires/architectes |
| `ingenieur-ipb.webp` | Page `/notre-expert` (à créer ou enrichir) |
| `humidite-avant-apres.webp` | Page `/expertise/humidite` (conservée pour SEO mais pas mise en avant) |
| `salpetre-avant-apres.webp` + `merule-sol.webp` | Articles blog humidité historiques |

**Optimisation poids** : `ludovic-expert-ipb.webp` (3.1 MB) et `schema-ouverture-mur-porteur.webp` (4 MB) doivent être réduites à <500 KB chacune. À faire en début de Vague A.

---

## 7. Ce que je NE toucherai PAS

Pour préserver le SEO et la stabilité :

- ❌ **Aucune URL existante modifiée ni supprimée** (priorité absolue : préserver les 5 mois d'historique GSC)
- ❌ **`lib/email.ts`** — chaîne SMTP intacte
- ❌ **`app/actions/contact.ts`, `quickCallback.ts`** — server actions intactes
- ❌ **`middleware.ts`** — redirections 308 conservées
- ❌ **`next.config.js`** — pas de modification sans ton accord (cf. CLAUDE.md règle existante)
- ❌ **Sitemap structure** — on garde toutes les pages indexées
- ❌ **Schemas JSON-LD** — préservés tels quels (LocalBusiness, FAQPage, Article, Service)
- ❌ **Articles blog historiques** sur l'humidité — conservés tels quels (rankent encore)
- ❌ **Pages `/expert-humidite/[ville]`, `/traitement-humidite/[ville]`, `/vmi-ventilation-insufflation`** — conservées (génèrent encore des impressions)

---

## 8. Validation requise avant exécution

Tu valides en répondant à ces questions :

1. **Direction artistique** (section 1) — On part bien sur Playfair Display + DM Sans + palette navy/cream/orange ? **OUI / NON / Modif**
2. **Réorientation fissures > mur porteur** (section 2) — D'accord avec l'ordre `2 cas fissures / 1 cas mur porteur` ? **OUI / NON / Modif**
3. **Diagnostic email** (section 3) — Tu confirmes que la chaîne marche actuellement (tu reçois bien les leads) ? **OUI / NON**
4. **TrustSignals « indépendants / tout en interne » → remplacé par section Cabinet factuelle** (vague C, point 7) — **OUI / NON**
5. **Études de cas refaites** (vague C, point 8) — Photos réaffectées : 2 fissures + 1 mur porteur. **OUI / NON**
6. **FAQ refaite avec questions issues du GSC** (vague E) — Liste des 10 questions OK ou tu veux en ajouter/retirer ?
7. **Filtres blog** (vague F) — On masque "Humidité" du filtre principal (mais on garde les articles indexés) — **OUI / NON**
8. **Diagnostic UX** (vague G) — Page d'entrée 3 cartes, virer emojis, récapitulatif posé — **OUI / NON**
9. **Découpage en 1 PR par vague** vs 1 PR monolithique — **par vague / monolithique**
10. **Estimation 16h** — On y va à fond, tu valides ?

---

## 9. Première chose que je fais après validation

**Vague A.1 — Migration palette CSS**, qui me permet de te montrer **immédiatement** un nouveau rendu visuel sur la home. Si la direction artistique te convient, on enchaîne. Si elle ne te convient pas, on s'arrête et on ajuste — tu n'as perdu que 30 minutes.

---

*Plan rédigé par Claude après audit complet du codebase, du Design Handoff, de la chaîne email, du blog, du diagnostic et des données GSC. En attente de validation point par point.*
