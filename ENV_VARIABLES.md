# 🔐 VARIABLES D'ENVIRONNEMENT - IPB EXPERTISE

## 📋 Configuration requise

### **Sur Vercel (Production)**

Aller dans **Project Settings → Environment Variables** et définir :

#### **1. SITE CONFIGURATION** (Obligatoire)
```
NEXT_PUBLIC_SITE_URL = https://www.ipb-expertise.fr
```

#### **2. EMAIL SERVICE** (Obligatoire — sinon aucun lead n'arrive dans ta boîte)
```
SMTP_USER = contact@ipb-expertise.fr
SMTP_PASS = xxxx xxxx xxxx xxxx        (App Password Gmail — nom officiel)
SMTP_PASSWORD = xxxx xxxx xxxx xxxx     (alias accepté en fallback)
EMAIL_FROM = contact@ipb-expertise.fr
EMAIL_TO = contact@ipb-expertise.fr
```

**⚠️ Variables critiques pour la remontée des leads** :
- `SMTP_USER` + `SMTP_PASS` (ou `SMTP_PASSWORD`) → si absentes, **aucun email** ne part (ni à toi, ni au client)
- `EMAIL_TO` → si absente, le client reçoit son récap mais **toi tu ne reçois pas le lead** (silencieux)
- Le code accepte les deux noms `SMTP_PASS` et `SMTP_PASSWORD` (`SMTP_PASS` en priorité)

**Comment obtenir le mot de passe d'application Gmail** :
1. Activer la vérification en 2 étapes sur le compte Gmail
2. Générer un « Mot de passe d'application » : https://myaccount.google.com/apppasswords
3. Coller ce mot de passe (format `xxxx xxxx xxxx xxxx`) dans `SMTP_PASS` sur Vercel

**Pages qui remontent un lead par email vers `EMAIL_TO`** :
- `/diagnostic` → action `submitDiagnosticLead`
- `/calcul-prix-mur-porteur` → action `submitCalculatorLead` (estimation + projet détaillé)
- `/contact` → action `submitContact`
- Bouton « Rappel rapide » → action `submitQuickCallback`

**Test après config Vercel** :
1. Aller sur `/calcul-prix-mur-porteur` en prod
2. Remplir le calculateur, cliquer « Recevoir l'estimation par email »
3. Vérifier que **2 emails arrivent** : un récap dans ta boîte perso + un lead dans `EMAIL_TO`

#### **3. CALENDLY** (Obligatoire)
```
NEXT_PUBLIC_CALENDLY_URL = https://calendly.com/contact-ipb-expertise/nouvelle-reunion
```

#### **4. CRISP CHAT** (Optionnel mais recommandé)
```
NEXT_PUBLIC_CRISP_WEBSITE_ID = xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NEXT_PUBLIC_CRISP_ENABLED = true
```

**💬 Comment obtenir ton Website ID Crisp :**
1. Créer un compte GRATUIT sur [Crisp.chat](https://crisp.chat/)
2. Créer un nouveau site web
3. Récupérer le **Website ID** dans Settings → Setup → Website
4. Configurer le message d'accueil personnalisé

#### **5. ANALYTICS** (Optionnel mais recommandé)
```
NEXT_PUBLIC_GA_TRACKING_ID = G-XXXXXXXXXX
```

**📊 Comment obtenir ton ID Google Analytics :**
1. Créer un compte sur [Google Analytics](https://analytics.google.com/)
2. Créer une propriété **GA4**
3. Récupérer le **Measurement ID** (format : G-XXXXXXXXXX)

#### **6. ERROR TRACKING** (Optionnel)
```
NEXT_PUBLIC_SENTRY_DSN = https://xxx@xxx.ingest.sentry.io/xxx
```

**🚨 Comment obtenir ton DSN Sentry :**
1. Créer un compte sur [Sentry.io](https://sentry.io/)
2. Créer un nouveau projet **Next.js**
3. Récupérer le **DSN** dans les paramètres du projet

---

### **En Local (Développement)**

Créer un fichier `.env.local` à la racine :

```bash
# .env.local (ne JAMAIS committer ce fichier !)

NEXT_PUBLIC_SITE_URL=http://localhost:3000
SMTP_USER=contact@ipb-expertise.fr
SMTP_PASS=xxxx xxxx xxxx xxxx
EMAIL_FROM=contact@ipb-expertise.fr
EMAIL_TO=contact@ipb-expertise.fr
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/contact-ipb-expertise/nouvelle-reunion

# Optionnel
NEXT_PUBLIC_CRISP_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NEXT_PUBLIC_CRISP_ENABLED=true
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

---

## 🔒 SÉCURITÉ

### **Variables NEXT_PUBLIC_***
- ✅ Exposées au client (navigateur)
- ❌ **NE JAMAIS** mettre de secrets dedans
- ✅ OK pour: URLs publiques, IDs publics

### **Variables SANS NEXT_PUBLIC_***
- ✅ SEULEMENT côté serveur
- ✅ OK pour: Passwords, API Keys, Secrets
- ❌ Jamais exposées au client

---

## ✅ VÉRIFICATION

Pour vérifier que les variables sont bien définies :

```bash
# En développement local
npm run dev
# Vérifier que les emails s'envoient

# Sur Vercel
# Vérifier les logs dans le dashboard Vercel
```

---

## 📝 VARIABLES ACTUELLEMENT UTILISÉES

| Variable | Type | Où | Obligatoire |
|----------|------|-----|-------------|
| `NEXT_PUBLIC_SITE_URL` | Public | Metadata, Sitemap, Emails | ✅ Oui |
| `SMTP_USER` | Secret | Server Actions (email) | ✅ Oui |
| `SMTP_PASS` | Secret | Server Actions (email) | ✅ Oui (ou `SMTP_PASSWORD`) |
| `EMAIL_FROM` | Secret | Server Actions (email) | ✅ Oui |
| `EMAIL_TO` | Secret | Server Actions (email) | ✅ Oui (sinon pas de lead remonté) |
| `NEXT_PUBLIC_CALENDLY_URL` | Public | Diagnostic page | ✅ Oui |
| `NEXT_PUBLIC_CRISP_WEBSITE_ID` | Public | Chat widget | ⚠️ Recommandé |
| `NEXT_PUBLIC_CRISP_ENABLED` | Public | Chat activation | ⚠️ Recommandé |
| `NEXT_PUBLIC_GA_TRACKING_ID` | Public | Analytics | ⚠️ Recommandé |
| `NEXT_PUBLIC_SENTRY_DSN` | Public | Error tracking | ⚠️ Optionnel |
| `NODE_ENV` | Auto | Partout | ✅ Auto |

---

## 🚨 FALLBACKS ACTUELS

Si une variable n'est pas définie, le code utilise des fallbacks :

```typescript
// Dans le code
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ipb-expertise.fr';
```

**⚠️ Attention :** C'est un filet de sécurité, **il vaut mieux définir toutes les variables explicitement**.

---

## 📖 RESSOURCES

- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
