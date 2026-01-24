# 🔐 VARIABLES D'ENVIRONNEMENT - IPB EXPERTISE

## 📋 Configuration requise

### **Sur Vercel (Production)**

Aller dans **Project Settings → Environment Variables** et définir :

#### **1. SITE CONFIGURATION** (Obligatoire)
```
NEXT_PUBLIC_SITE_URL = https://www.ipb-expertise.fr
```

#### **2. EMAIL SERVICE** (Obligatoire)
```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = contact@ipb-expertise.fr
SMTP_PASSWORD = xxxx xxxx xxxx xxxx (App Password Gmail)
EMAIL_FROM = contact@ipb-expertise.fr
EMAIL_TO = contact@ipb-expertise.fr
```

**⚠️ Important pour SMTP_PASSWORD :**
1. Activer vérification en 2 étapes sur Gmail
2. Générer un "Mot de passe d'application" : https://myaccount.google.com/apppasswords
3. Utiliser ce mot de passe (format: xxxx xxxx xxxx xxxx)

#### **3. CALENDLY** (Obligatoire)
```
NEXT_PUBLIC_CALENDLY_URL = https://calendly.com/contact-ipb-expertise/nouvelle-reunion
```

#### **4. ANALYTICS** (Optionnel mais recommandé)
```
NEXT_PUBLIC_GA_TRACKING_ID = G-XXXXXXXXXX
```

**📊 Comment obtenir ton ID Google Analytics :**
1. Créer un compte sur [Google Analytics](https://analytics.google.com/)
2. Créer une propriété **GA4**
3. Récupérer le **Measurement ID** (format : G-XXXXXXXXXX)

#### **5. ERROR TRACKING** (Optionnel)
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
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contact@ipb-expertise.fr
SMTP_PASSWORD=xxxx xxxx xxxx xxxx
EMAIL_FROM=contact@ipb-expertise.fr
EMAIL_TO=contact@ipb-expertise.fr
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/contact-ipb-expertise/nouvelle-reunion
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
| `SMTP_HOST` | Secret | Server Actions (email) | ✅ Oui |
| `SMTP_PORT` | Secret | Server Actions (email) | ✅ Oui |
| `SMTP_USER` | Secret | Server Actions (email) | ✅ Oui |
| `SMTP_PASSWORD` | Secret | Server Actions (email) | ✅ Oui |
| `EMAIL_FROM` | Secret | Server Actions (email) | ✅ Oui |
| `EMAIL_TO` | Secret | Server Actions (email) | ✅ Oui |
| `NEXT_PUBLIC_CALENDLY_URL` | Public | Diagnostic page | ✅ Oui |
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
