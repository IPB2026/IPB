# TRACKING.md — Conversions Google Ads

Ce document explique comment fonctionne le tracking des conversions Google Ads
sur le site IPB Expertise, et comment configurer / tester / faire évoluer le
système.

> ℹ️ Stack : Next.js 14 (App Router) — `gtag.js` direct (pas de GTM).
> Cookie banner RGPD déjà en place (`components/CookieBanner.tsx`).

---

## 1. Pourquoi pas de page `/merci` ?

Les deux formulaires principaux gating un résultat :

- `/diagnostic` — affiche un **rapport d'expert détaillé** après envoi du lead.
- `/calcul-prix-mur-porteur` — **révèle l'estimation chiffrée** après envoi du
  lead (étape 6).

Rediriger vers une page de remerciement casserait cette mécanique (l'utilisateur
ne verrait plus le résultat pour lequel il a donné son email).

À la place, on déclenche la conversion Google Ads directement à la soumission
réussie via `gtag('event', 'conversion', ...)`. C'est la pratique standard pour
les SPA / multi-step forms et **Google Ads la supporte nativement**.

L'événement de conversion se déclenche **une seule fois**, à l'instant où la
Server Action retourne `{ success: true }`. Pas de risque de double-comptage
puisque le formulaire passe ensuite à un état "résultat" qui ne re-déclenche
plus rien.

---

## 2. Variables d'environnement

Définies dans `.env.local` en local (voir `.env.local.example`) et dans
**Vercel → Project Settings → Environment Variables** en production.

| Variable | Description | Fallback (si non définie) |
|---|---|---|
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | ID du compte Ads, format `AW-XXXXXXXXXX` | `AW-17902440600` (valeur historique) |
| `NEXT_PUBLIC_GADS_CONV_DIAGNOSTIC` | Conversion lead diagnostic | label historique commun |
| `NEXT_PUBLIC_GADS_CONV_CALCULATEUR` | Conversion lead calculateur | label historique commun |
| `NEXT_PUBLIC_GADS_CONV_PHONE` | Conversion clic téléphone (micro) | label historique commun |
| `NEXT_PUBLIC_GADS_CONV_CALLBACK` | Conversion demande de rappel (micro) | label historique commun |

Format attendu pour les conversions : `AW-XXXXXXXXXX/abcDEF123XYZ` — c'est un
**couple** ID compte + libellé d'action séparés par `/`.

> 💡 **Préfixe `NEXT_PUBLIC_` obligatoire** : les valeurs sont inlinées au build
> et utilisées côté client. Ce ne sont pas des secrets — elles sont publiques
> par construction (visibles dans le HTML de toutes les pages).

---

## 3. Comment créer / récupérer une action de conversion dans Google Ads

### 3.1 Créer l'action

1. Se connecter à [ads.google.com](https://ads.google.com)
2. **Outils & paramètres** (clé à molette en haut à droite) → **Conversions**
3. **+ Nouvelle action de conversion** → **Site Web**
4. Saisir le domaine `www.ipb-expertise.fr` → **Analyser**
5. **+ Ajouter manuellement une action de conversion**
6. Renseigner :
   - **Catégorie d'objectif** : `Lead`
   - **Nom de la conversion** : ex. *"Lead diagnostic - Fissures"* ou *"Lead calculateur - Mur porteur"*
   - **Valeur** : `Utiliser la même valeur pour chaque conversion`
     - Diagnostic : `50 EUR` (recommandé)
     - Calculateur : `30 EUR` (recommandé)
   - **Décompte** : `Une` (un seul lead par utilisateur)
   - **Fenêtre de conversion** : 30 jours
   - **Modèle d'attribution** : `Basé sur les données` (par défaut)
7. **Enregistrer et continuer**

### 3.2 Récupérer l'ID + libellé

Choisir **"Utiliser Google Tag Manager"** ou **"Installer la balise vous-même"**
puis dans le snippet affiché, repérer ces deux valeurs :

```js
gtag('event', 'conversion', {
  'send_to': 'AW-17902440600/abcDEF123XYZ',  // ← copier ce couple
  'value': 50.0,
  'currency': 'EUR',
});
```

→ La valeur `'AW-17902440600/abcDEF123XYZ'` est ce qu'il faut coller dans
`NEXT_PUBLIC_GADS_CONV_DIAGNOSTIC` ou `NEXT_PUBLIC_GADS_CONV_CALCULATEUR`.

### 3.3 Déployer

- **Local** : ajouter la variable dans `.env.local` puis redémarrer `npm run dev`
- **Vercel** : Project Settings → Environment Variables → ajouter la variable
  pour les environnements **Production** et **Preview**, puis redéployer
  (un push suffit, ou bouton "Redeploy" depuis le dashboard Vercel)

> ⚠️ Les variables `NEXT_PUBLIC_*` sont **inlinées au build**. Modifier la
> valeur sur Vercel sans redéployer ne change rien — il faut un nouveau build.

---

## 4. Où le tracking est-il branché dans le code ?

| Action utilisateur | Fichier | Fonction |
|---|---|---|
| Tag global gtag.js | [`app/layout.tsx`](./app/layout.tsx) | `<Script>` `lazyOnload` |
| Lead diagnostic envoyé avec succès | [`app/diagnostic/page.tsx`](./app/diagnostic/page.tsx) `handleSubmitContact` | `trackDiagnosticLeadSubmit(path, score)` |
| Lead calculateur envoyé avec succès | [`app/calcul-prix-mur-porteur/CalculatorClient.tsx`](./app/calcul-prix-mur-porteur/CalculatorClient.tsx) `handleLeadSubmit` | `trackCalculatorLeadCapture(email)` |
| Clic sur un numéro de téléphone | partout via `trackPhoneClick(location)` | `trackPhoneClick` |
| Demande de rappel après rapport | [`app/diagnostic/page.tsx`](./app/diagnostic/page.tsx) `handleSubmitCallback` | `trackCallbackRequest()` |

Toutes les fonctions de tracking sont centralisées dans [`lib/analytics.ts`](./lib/analytics.ts).

---

## 5. Comment tester

### 5.1 Vérifier que le tag global se charge

1. Ouvrir le site en local (`npm run dev`) ou en prod
2. DevTools → onglet **Network** → filtre `gtag/js`
3. Recharger la page → la requête `https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX` doit apparaître après quelques secondes (chargement `lazyOnload`)
4. Si elle n'apparaît pas : vérifier le bandeau cookies — sur certains sites le tag est conditionné au consentement (ce n'est PAS le cas ici aujourd'hui, voir §7)

### 5.2 Vérifier qu'une conversion se déclenche

**Test du formulaire diagnostic :**

1. Aller sur `/diagnostic`
2. DevTools → **Network** → filtre `google` (capture toutes les requêtes Google)
3. Compléter le parcours (path → questions → coordonnées) et soumettre
4. Au moment du `success` (avant que le rapport apparaisse), une requête vers `googleads.g.doubleclick.net/pagead/...` ou `www.google.com/pagead/...` doit partir, contenant le paramètre `ec=conversion` et `tiba=...`
5. Pour confirmer, switcher sur **Console** et taper :
   ```js
   window.dataLayer
   ```
   → On doit y voir l'event `'conversion'` avec `send_to`, `value: 50`, `currency: 'EUR'`

**Test du calculateur** : idem sur `/calcul-prix-mur-porteur`, l'event doit avoir `value: 30`.

### 5.3 Tag Assistant (validation visuelle)

Installer l'extension Chrome [Google Tag Assistant Companion](https://chrome.google.com/webstore/detail/tag-assistant-companion/jmekfmbnaedfebfnmakmokmlfpblbfdm).

1. Activer l'extension sur la page `/diagnostic`
2. Recharger
3. Compléter et soumettre le formulaire
4. Cliquer sur l'extension → l'onglet "Tags Fired" doit lister :
   - Le tag global Google Ads (`AW-XXXXXXXXXX`)
   - L'event `conversion` avec le bon `send_to`

### 5.4 Vérifier dans Google Ads (post-déploiement)

Dans Google Ads → **Conversions** → cliquer sur ton action :
- **État** : doit passer de "Aucune conversion récente" à "Réception des conversions" sous 24-72 h après le premier lead réel
- En attendant, l'**outil de diagnostic** (bouton "Tester le tag") permet de simuler

---

## 6. Comment ajouter une nouvelle conversion à l'avenir

Exemple : tracker la soumission du formulaire de contact `/contact`.

1. **Google Ads** : créer l'action de conversion (§3) — récupérer le couple `AW-XXXX/labelContact`
2. **`.env.local`** + **Vercel** : ajouter `NEXT_PUBLIC_GADS_CONV_CONTACT=AW-XXXX/labelContact`
3. **`lib/analytics.ts`** : ajouter la constante en haut du fichier
   ```ts
   const CONV_CONTACT = process.env.NEXT_PUBLIC_GADS_CONV_CONTACT || 'AW-XXXX/labelContact';
   ```
4. **`lib/analytics.ts`** : créer la fonction de tracking
   ```ts
   export const trackContactLeadSubmit = () => {
     trackEvent('contact_lead_submit', { category: 'conversion' });
     trackEvent('conversion', { send_to: CONV_CONTACT, value: 40, currency: 'EUR' });
   };
   ```
5. **Composant du formulaire** : appeler `trackContactLeadSubmit()` dans le `if (result.success)` du handler de soumission
6. **Mettre à jour `ENV_VARIABLES.md` + `.env.local.example`** pour documenter la nouvelle variable
7. Déployer et tester (§5)

---

## 7. RGPD / consentement

Le site dispose d'un cookie banner ([`components/CookieBanner.tsx`](./components/CookieBanner.tsx)).
**À ce jour, le tag Google Ads n'est PAS conditionné au consentement** — il se
charge en `lazyOnload` dès l'arrivée sur la page.

Pour être 100% conforme CNIL il faudrait :
- Soit câbler [Google Consent Mode v2](https://support.google.com/google-ads/answer/14310169) et déclencher `gtag('consent', 'update', ...)` quand l'utilisateur accepte
- Soit conditionner le `<Script>` du tag à l'acceptation du bandeau (ne le rendre que si `localStorage.cookieConsent === 'accepted'`)

C'est un sujet à part qui n'est **pas couvert par cette mise en place**.
À traiter dans un PR dédié si la priorité monte (signalement CNIL,
audit avocat, etc.).

---

## 8. Liens utiles

- [Google Ads — Configurer les conversions](https://support.google.com/google-ads/answer/6095821)
- [gtag.js — Reference](https://developers.google.com/tag-platform/gtagjs/reference)
- [Next.js Script component](https://nextjs.org/docs/app/api-reference/components/script)
- Code central : [`lib/analytics.ts`](./lib/analytics.ts)
