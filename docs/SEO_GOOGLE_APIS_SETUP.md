# Setup des APIs Google pour le suivi SEO

Ce document liste les APIs Google à connecter pour récupérer les données réelles de
performance et d'indexation (Core Web Vitals, impressions, clics, indexation).

Sans ces credentials, l'audit SEO automatique ne peut **pas** mesurer les Core Web Vitals
en données terrain (CrUX), les requêtes qui apportent du trafic (GSC), ni le trafic
organique (GA4). Cette doc est la procédure pour les configurer.

---

## 1. PageSpeed Insights API (Core Web Vitals — données labo + CrUX)

**Ce qu'on récupère** : LCP, INP, CLS, FCP, TTFB pour la home et les pages clés
(données labo Lighthouse + données terrain CrUX si le domaine a assez de trafic).

**Procédure** :
1. Aller sur https://console.cloud.google.com/apis/library/pagespeedonline.googleapis.com
2. Créer un projet (ou réutiliser un projet existant) — ex. `ipb-seo-monitoring`.
3. Activer l'API **PageSpeed Insights API**.
4. Aller dans `APIs & Services > Credentials`, créer une **API Key**.
5. Restreindre la clé à l'API PageSpeed uniquement, et à l'IP de Vercel/local pour la sécurité.
6. Stocker la clé dans `.env.local` :

   ```
   GOOGLE_PSI_API_KEY=AIza...
   ```

7. Tester :

   ```bash
   curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://www.ipb-expertise.fr&strategy=mobile&key=$GOOGLE_PSI_API_KEY"
   ```

**Quota gratuit** : 25 000 requêtes/jour — largement suffisant.

---

## 2. CrUX API directe (données terrain seules)

**Ce qu'on récupère** : Core Web Vitals depuis Chrome User Experience Report sur 28 jours
glissants, avec historique 25 semaines (CrUX History API).

**Procédure** :
1. Activer **Chrome UX Report API** dans la même console GCP.
2. Réutiliser la même clé API ou en créer une dédiée.
3. Tester :

   ```bash
   curl -X POST "https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=$GOOGLE_PSI_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"origin":"https://www.ipb-expertise.fr","formFactor":"PHONE"}'
   ```

**Note** : si le domaine n'a pas assez de trafic Chrome (< ~1000 sessions/mois),
l'API renvoie `404` — c'est normal pour un site jeune. Dans ce cas, s'appuyer
uniquement sur Lighthouse (données labo via PSI).

---

## 3. Google Search Console API (impressions, clics, requêtes, indexation)

**Ce qu'on récupère** : top requêtes, top pages, CTR, position moyenne, états
d'indexation, sitemaps soumis.

**Procédure** :
1. Vérifier que le site est ajouté à Search Console (https://search.google.com/search-console).
2. Activer **Google Search Console API** dans la console GCP.
3. Créer un **service account** (`APIs & Services > Credentials > Service Account`).
4. Télécharger la clé JSON et la stocker hors du repo (ex. `~/.config/ipb-gsc-key.json`).
5. Dans Search Console, ajouter l'email du service account (`xxx@xxx.iam.gserviceaccount.com`)
   comme utilisateur **Restricted** sur la propriété `https://www.ipb-expertise.fr`.
6. Stocker le chemin du fichier dans `.env.local` :

   ```
   GOOGLE_GSC_KEY_FILE=~/.config/ipb-gsc-key.json
   GOOGLE_GSC_SITE_URL=https://www.ipb-expertise.fr/
   ```

**Quota** : 1 200 req/min — largement suffisant.

---

## 4. Google Analytics 4 API (trafic organique, conversions, comportement)

**Ce qu'on récupère** : sessions organiques, pages vues, taux de rebond, conversions,
parcours utilisateur depuis Google.

**Procédure** :
1. Avoir GA4 installé sur le site (vérifier dans `components/layout/Analytics.tsx`).
2. Activer **Google Analytics Data API v1** dans la console GCP.
3. Réutiliser le **service account** créé pour GSC.
4. Dans GA4 → `Admin > Property Access Management`, ajouter l'email du service
   account avec le rôle **Viewer**.
5. Récupérer le **Property ID** (format `123456789`) dans `Admin > Property Settings`.
6. Stocker dans `.env.local` :

   ```
   GOOGLE_GA4_PROPERTY_ID=123456789
   # GOOGLE_GSC_KEY_FILE est réutilisé pour GA4
   ```

---

## 5. Indexing API (notification temps réel — uniquement Job Posting / Live Stream)

**À noter** : l'Indexing API officielle de Google est **réservée aux pages JobPosting et
LiveStream**. Pour notifier Google des nouvelles pages d'un site vitrine, il faut s'appuyer
sur le sitemap (déjà en place dans `app/sitemap.ts`) et la fonctionnalité « Demander
l'indexation » de Search Console (manuel).

Alternative : protocole **IndexNow** (Bing/Yandex). Voir `docs/SEO_INDEXNOW_SETUP.md`
si besoin (pas encore créé).

---

## 6. Variables d'environnement à ajouter

Récap à coller dans `.env.local` (et dans Vercel `Settings > Environment Variables` côté prod) :

```
# PageSpeed + CrUX
GOOGLE_PSI_API_KEY=AIza...

# Search Console + GA4 (service account)
GOOGLE_GSC_KEY_FILE=/chemin/absolu/vers/service-account.json
GOOGLE_GSC_SITE_URL=https://www.ipb-expertise.fr/
GOOGLE_GA4_PROPERTY_ID=123456789
```

⚠️ Ne jamais committer la clé JSON du service account dans le repo.
Elle doit rester dans `.gitignore` (le `.gitignore` couvre déjà `.env*` mais
pas un fichier JSON déposé n'importe où).

---

## 7. Checklist de validation après config

- [ ] `curl` PSI répond avec un score Lighthouse pour la home
- [ ] CrUX API renvoie des données pour `https://www.ipb-expertise.fr` (ou un 404 si
      trafic insuffisant — à monitorer dans 3 mois)
- [ ] GSC : le service account voit les sitemaps soumis dans la propriété
- [ ] GA4 : le service account peut lire `sessions` filtré sur `sessionMedium = organic`

Une fois ces 4 cases cochées, relancer un audit SEO (`/seo-audit` ou `/seo-google`)
permettra de remonter les vraies données field/CrUX, le trafic organique et les
requêtes top.
