# Plan de génie SEO — IPB Expertise

État au 2026-04-29. 8 axes classés par ROI (impact CTR / SERP / AI Overviews).

---

## Axe 1 — Schema markup richness (HOWTO + SPEAKABLE + ARTICLE)

**Pourquoi** : Google et les AI Overviews citent en priorité les contenus avec un balisage Schema.org riche. Un balisage `HowTo` peut déclencher un rich snippet en SERP (avec étapes numérotées visibles), un `SpeakableSpecification` augmente les chances d'être lu par l'Assistant Google et cité par ChatGPT/Perplexity, un `Article` complet renforce l'E-E-A-T.

**État** :
- ✅ `Organization` (homepage) — avec `sameAs` Facebook + LinkedIn
- ✅ `LocalBusiness` (pages locales)
- ✅ `Service` (page mur porteur)
- ✅ `FAQPage` sur toutes les pages services et spokes
- ✅ `BreadcrumbList` (component `BreadcrumbSchema` existe + utilisé sur pages quartiers, blog, lp)
- ❌ `HowTo` sur les pages à process (à ajouter)
- ❌ `SpeakableSpecification` sur les FAQ (à ajouter)
- ⚠️ `Article` partiel sur les spokes (à compléter)

**Action** : ajouter `HowTo` sur 5 spokes process (remontees-capillaires-traitement, merule, fissure-secheresse-indemnisation, cave-humide-solutions, fissure-en-escalier-causes). Ajouter `speakable` aux FAQ JSON-LD existants.

---

## Axe 2 — llms.txt et AI Overviews readiness

**Pourquoi** : Le protocole `llms.txt` (proposé par Anthropic en 2024, adopté progressivement par OpenAI, Google, Perplexity) permet de fournir aux IA un fichier markdown structuré décrivant l'entreprise. C'est l'équivalent d'un `robots.txt` pour les LLM. Améliore directement la qualité des citations dans ChatGPT, Claude, Perplexity, Google AI Overviews.

**État** :
- ✅ `public/llms.txt` (112 lignes) — version courte
- ✅ `public/llms-full.txt` (289 lignes) — version étendue avec FAQ et études de cas

**Action** : aucune — déjà en place. À actualiser semestriellement.

---

## Axe 3 — Title tag CTR optimization (POWER WORDS + YEAR + GEO)

**Pourquoi** : Les title tags qui contiennent l'année (2026), un nombre, un power word (« guide complet », « expert », « décennale »), un repère géographique et un séparateur visuel (· ou |) ont un CTR moyen 27 % supérieur aux titles purement descriptifs (étude Ahrefs 2024).

**État** : titles actuels descriptifs mais sans modificateurs CTR. Exemples :
- ✅ « Expert fissures Toulouse (31) · Institut IPB · Diagnostic et agrafage structurel »
- ⚠️ « Ouverture de mur porteur · IPB Toulouse » → manque year + power word
- ⚠️ « Plan du site · Institut IPB · Fissures et humidité Toulouse » → OK
- ⚠️ Homepage : « IPB - Spécialistes de la structure de votre habitat | Diagnostic Fissures & Ouverture Mur Porteur Toulouse » → trop long, manque year

**Action** : optimiser les 10 titles prioritaires avec année 2026 + power words.

---

## Axe 4 — Meta descriptions en verbes d'intention (FAIT)

**Pourquoi** : Une meta description qui commence par un verbe d'action signale immédiatement le bénéfice utilisateur, augmentant le CTR de 8 à 15 % en moyenne.

**État** : ✅ **fait** dans le commit `d4e5455` (29 avril 2026) — top 10 pages.

**Action** : étendre le pattern aux spokes Tier 2 dans une prochaine itération.

---

## Axe 5 — Snippet bait (paragraphes de définition position 0)

**Pourquoi** : Google extrait le « featured snippet » (position 0) à partir d'un paragraphe court (40 à 60 mots) qui répond directement à une requête. Placer un tel paragraphe en tête de page, juste sous le H1, augmente massivement les chances de capturer la position 0 — qui draine 40 % des clics.

**État** : ❌ pas encore fait. La plupart des pages commencent par un texte éditorial, pas par une définition concise.

**Action** : ajouter un encart « En bref » de 50 à 60 mots juste après le H1 sur les pillars (`/expertise/fissures`, `/expertise/humidite`, `/expertise/mur-porteur`) et 2 spokes critiques.

---

## Axe 6 — Internal linking : descriptive anchors

**Pourquoi** : Google utilise le texte d'ancre comme signal sémantique fort. Un anchor « en savoir plus » ou « cliquez ici » est gaspillé. Un anchor descriptif comme « guide complet de l'agrafage de fissures » transmet du PageRank thématiquement ciblé.

**État** : ⚠️ à auditer. Les refontes récentes ont utilisé des anchors descriptifs, mais des `Link href="..."`>en savoir plus</Link>` génériques peuvent encore exister.

**Action** : audit des liens internes, remplacement des ancres génériques.

---

## Axe 7 — IndexNow protocol (Bing / Yandex)

**Pourquoi** : Le protocole IndexNow permet de notifier Bing et Yandex en temps réel qu'une URL a changé — au lieu d'attendre qu'ils crawlent. Indexation 10 à 100× plus rapide.

**État** : ✅ clé IndexNow déjà publiée (`public/3c7f0e731bd5699d57a1a6e9c52c915e.txt`). Mais le **ping** automatique au déploiement n'est probablement pas configuré.

**Action** : ajouter un script de ping IndexNow dans le pipeline de déploiement Vercel (post-build hook).

---

## Axe 8 — Core Web Vitals + Performance

**Pourquoi** : Google utilise les CWV (LCP, INP, CLS) comme facteur de classement direct depuis 2021. Un site rapide rank mieux et convertit mieux.

**État** : ⚠️ à mesurer (audit Google APIs bloqué, voir `docs/SEO_GOOGLE_APIS_SETUP.md`). Mais déjà optimisé : Next/Image, fonts preload, dynamic imports, CSS minimal.

**Action** :
1. Configurer la clé PageSpeed Insights API (procédure dans `docs/SEO_GOOGLE_APIS_SETUP.md`)
2. Lancer Lighthouse en CI sur chaque PR
3. Surveiller LCP < 2.5s, INP < 200ms, CLS < 0.1

---

## Roadmap d'exécution

### Sprint 1 — Quick wins (commit immédiat)
- [x] Verbes d'action dans descriptions (commit `d4e5455`, fait)
- [ ] Title tags top 10 avec year + power words
- [ ] HowTo schema sur 5 spokes process
- [ ] SpeakableSpecification sur FAQ
- [ ] Snippet bait sur 3 pillars

### Sprint 2 — Maintenance trimestrielle
- [ ] Actualisation `llms.txt` (Q3, Q4)
- [ ] Audit anchors internes
- [ ] Lighthouse CI dans GitHub Actions

### Sprint 3 — Mesure
- [ ] Configuration GSC + PSI + GA4 (voir `SEO_GOOGLE_APIS_SETUP.md`)
- [ ] Tracking CTR moyen avant/après par cluster
- [ ] Tracking position moyenne par page pillar

---

## Comment mesurer l'impact

Une fois les APIs Google configurées :
- **CTR** → Search Console, comparaison rolling 28 jours avant/après
- **Position moyenne** → Search Console, par page et par requête
- **Impressions Featured Snippets** → Search Console > Apparence > Résultats enrichis
- **Citations AI Overviews** → vérification manuelle régulière sur les requêtes top
- **Trafic organique** → GA4 (`sessionMedium = organic`)

Objectif réaliste à 90 jours : +25 % CTR moyen sur les 10 pages traitées, +15 % de trafic organique global.
