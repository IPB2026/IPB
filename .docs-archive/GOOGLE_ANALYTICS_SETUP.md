# 📊 CONFIGURATION GOOGLE ANALYTICS 4 - IPB EXPERTISE

## ✅ TON MEASUREMENT ID

```
G-Q033NE5DJS
```

---

## 🔧 ÉTAPE 1 : AJOUTER L'ID EN LOCAL

1. Ouvre le fichier `.env.local` à la racine du projet
2. Ajoute (ou modifie) cette ligne :

```bash
NEXT_PUBLIC_GA_TRACKING_ID=G-Q033NE5DJS
```

3. Sauvegarde le fichier

---

## ☁️ ÉTAPE 2 : AJOUTER L'ID SUR VERCEL

### Option A : Via le Dashboard Vercel (recommandé)

1. Va sur [vercel.com](https://vercel.com/)
2. Clique sur ton projet **IPB**
3. Va dans **Settings** → **Environment Variables**
4. Clique sur **"Add New"**
5. Remplis :
   - **Name** : `NEXT_PUBLIC_GA_TRACKING_ID`
   - **Value** : `G-Q033NE5DJS`
   - **Environments** : ✅ Production, ✅ Preview, ✅ Development
6. Clique sur **"Save"**

### Option B : Via la CLI Vercel

```bash
vercel env add NEXT_PUBLIC_GA_TRACKING_ID
# Entrer la valeur : G-Q033NE5DJS
# Sélectionner : Production, Preview, Development
```

---

## 🚀 ÉTAPE 3 : REDÉPLOYER SUR VERCEL

Vercel va redéployer automatiquement, mais pour forcer le redéploiement :

### Option A : Via le Dashboard
1. Va sur ton projet Vercel
2. Onglet **"Deployments"**
3. Clique sur les **3 points** (⋯) du dernier déploiement
4. Clique sur **"Redeploy"**

### Option B : Via Git (automatique)
Vercel redéploiera automatiquement au prochain push sur GitHub.

---

## ✅ ÉTAPE 4 : VÉRIFIER QUE ÇA FONCTIONNE

### 1. Redémarre ton serveur local

```bash
# Arrête le serveur (Ctrl+C)
npm run dev
```

### 2. Ouvre ton site en local

```
http://localhost:3000
```

### 3. Ouvre la console du navigateur (F12)

Tu devrais voir des logs Google Analytics si tu es en mode développement.

### 4. Vérifie dans Google Analytics

1. Va sur [analytics.google.com](https://analytics.google.com/)
2. Clique sur **"Reports"** → **"Realtime"**
3. Ouvre ton site dans un nouvel onglet : `https://www.ipb-expertise.fr`
4. Tu devrais voir **1 utilisateur actif** dans GA4 🎉

---

## 📊 ÉVÉNEMENTS TRACKÉS AUTOMATIQUEMENT

Une fois configuré, ton site track automatiquement :

✅ **Page views** - Chaque changement de page  
✅ **Contact form** - Soumissions de formulaires  
✅ **Phone clicks** - Clics sur le numéro de téléphone  
✅ **Calendly opens** - Ouvertures du calendrier  
✅ **Diagnostic completion** - Fins de diagnostic  
✅ **Blog reads** - Lecture d'articles (avec % de scroll)  

---

## 🔍 VÉRIFICATION RAPIDE

### Ton Measurement ID est-il bien configuré ?

```bash
# En local
echo $NEXT_PUBLIC_GA_TRACKING_ID
# Doit afficher : G-Q033NE5DJS
```

### Le composant Analytics fonctionne-t-il ?

Le composant `components/layout/Analytics.tsx` est déjà intégré dans `app/layout.tsx`, donc aucune modification nécessaire ! 🎉

---

## 🎯 PROCHAINES ÉTAPES

Une fois GA4 configuré et les données qui arrivent :

1. **Configurer les conversions** (objectifs)
2. **Créer des rapports personnalisés**
3. **Analyser les sources de trafic**
4. **Optimiser les pages avec le plus de rebond**

---

## 📞 BESOIN D'AIDE ?

Si tu ne vois pas de données dans GA4 après 24h :

1. Vérifie que `NEXT_PUBLIC_GA_TRACKING_ID` est bien défini sur Vercel
2. Vérifie dans les logs Vercel qu'il n'y a pas d'erreur
3. Utilise l'extension Chrome "Google Analytics Debugger"

---

**TON ID : G-Q033NE5DJS**  
**Status : Prêt à tracker ! 📊**  
**Next : Redémarre le serveur + redéploie sur Vercel ! 🚀**
