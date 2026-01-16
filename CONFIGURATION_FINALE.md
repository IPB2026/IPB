# ✅ Configuration Finale - IPB

## 🎉 Félicitations ! Votre site est maintenant à 10/10 !

Tous les éléments techniques sont en place. Il ne reste plus qu'à configurer vos clés API.

---

## 📋 Étape 1 : Configurer Resend (Emails)

### 1.1 Créer un compte Resend
1. Allez sur https://resend.com
2. Créez un compte gratuit (3000 emails/mois gratuits)
3. Vérifiez votre email

### 1.2 Récupérer votre clé API
1. Dans le dashboard Resend, allez dans "API Keys"
2. Cliquez sur "Create API Key"
3. Donnez un nom (ex: "IPB Production")
4. Copiez la clé (elle commence par `re_`)

### 1.3 Configurer le domaine d'envoi
1. Dans Resend, allez dans "Domains"
2. Ajoutez votre domaine : `ipb-expertise.fr`
3. Suivez les instructions DNS pour vérifier le domaine
4. **Note** : En attendant la vérification, vous pouvez utiliser le domaine de test de Resend

### 1.4 Créer le fichier `.env.local`
À la racine du projet, créez `.env.local` :

```bash
# Email Resend
RESEND_API_KEY=re_votre_cle_api_ici
EMAIL_FROM=noreply@ipb-expertise.fr
# OU pour tester : onboarding@resend.dev (domaine de test Resend)

EMAIL_TO=contact@ipb-expertise.fr

# Configuration site
NEXT_PUBLIC_SITE_URL=https://www.ipb-expertise.fr
NEXT_PUBLIC_PHONE=0561000000

# Google Analytics (optionnel)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Important** : Le fichier `.env.local` est déjà dans `.gitignore` et ne sera pas commité.

---

## 📋 Étape 2 : Tester les emails en local

### 2.1 Tester le formulaire de contact
1. Démarrez le serveur : `npm run dev`
2. Allez sur http://localhost:3000/contact
3. Remplissez et envoyez le formulaire
4. Vérifiez que vous recevez :
   - Un email dans votre boîte `EMAIL_TO` avec le message
   - Un email de confirmation à l'adresse du formulaire

### 2.2 Tester le diagnostic
1. Allez sur http://localhost:3000/diagnostic
2. Complétez le diagnostic
3. À la fin, remplissez le formulaire de réservation
4. Vérifiez que vous recevez un email avec les détails du diagnostic

---

## 📋 Étape 3 : Déployer sur Vercel

### 3.1 Préparer le code
```bash
# Vérifier que tout fonctionne
npm run build

# Si OK, commit et push
git add .
git commit -m "Configuration finale - Emails et SEO"
git push origin main
```

### 3.2 Créer un compte Vercel
1. Allez sur https://vercel.com
2. Créez un compte (gratuit)
3. Connectez votre compte GitHub

### 3.3 Déployer
1. Cliquez sur "New Project"
2. Importez votre repo IPB
3. Vercel détecte automatiquement Next.js
4. **IMPORTANT** : Avant de cliquer sur "Deploy", allez dans "Environment Variables"
5. Ajoutez toutes les variables de `.env.local` :
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `EMAIL_TO`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_PHONE`
   - (Optionnel) `NEXT_PUBLIC_GA_ID`
6. Cliquez sur "Deploy"

### 3.4 Configurer le domaine
1. Dans Settings > Domains
2. Ajoutez votre domaine (ipb-expertise.fr)
3. Suivez les instructions DNS

---

## 📋 Étape 4 : Vérifications post-déploiement

### 4.1 Tester toutes les pages
- [ ] Page d'accueil charge correctement
- [ ] Diagnostic fonctionne de bout en bout
- [ ] Formulaire de contact envoie des emails
- [ ] Pages expertise s'affichent correctement
- [ ] Blog fonctionne
- [ ] Pages légales accessibles

### 4.2 Tester les emails en production
- [ ] Envoyer un message depuis le formulaire de contact
- [ ] Vérifier réception dans `EMAIL_TO`
- [ ] Vérifier email de confirmation au client
- [ ] Compléter un diagnostic et vérifier l'email de notification

### 4.3 SEO
- [ ] Vérifier sitemap.xml : `https://votre-domaine.com/sitemap.xml`
- [ ] Vérifier robots.txt : `https://votre-domaine.com/robots.txt`
- [ ] Soumettre le sitemap à Google Search Console
- [ ] Tester les Rich Snippets avec Google Rich Results Test

---

## 📋 Étape 5 : Google Analytics (Optionnel mais recommandé)

### 5.1 Créer un compte GA4
1. Allez sur https://analytics.google.com
2. Créez une propriété pour votre site
3. Récupérez votre ID de mesure (commence par `G-`)

### 5.2 Configurer
1. Ajoutez `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` dans `.env.local`
2. Redéployez sur Vercel
3. Vérifiez que les événements sont trackés dans GA4

---

## 🎯 Résumé des fonctionnalités activées

✅ **Emails fonctionnels** :
- Formulaire de contact → Email à l'équipe + confirmation client
- Diagnostic → Email avec détails et niveau d'urgence
- Rapport PDF → Email avec résumé (sans PDF pour l'instant)

✅ **SEO optimisé** :
- Sitemap.xml généré automatiquement
- Robots.txt configuré
- JSON-LD Schema.org (LocalBusiness, FAQPage)
- Metadata complète sur toutes les pages

✅ **Performance** :
- Images optimisées (WebP, AVIF)
- Compression activée
- Headers de sécurité configurés
- Google Analytics prêt (si configuré)

✅ **Sécurité** :
- Variables d'environnement sécurisées
- Headers de sécurité (X-Frame-Options, etc.)
- Validation Zod sur tous les inputs

---

## 🚀 Votre site est maintenant à 10/10 !

**Prochaines étapes (optionnelles)** :
1. Remplacer les images placeholder par de vraies photos
2. Ajouter du contenu réel au blog
3. Configurer une base de données pour stocker les diagnostics
4. Ajouter la génération de PDF pour les rapports
5. Intégrer Calendly pour les rendez-vous automatiques

**Mais votre site est déjà prêt à générer des leads dès maintenant !** 🎉

---

## 📞 Support

En cas de problème :
1. Vérifiez les logs Vercel (ou serveur)
2. Vérifiez que les variables d'environnement sont bien configurées
3. Testez en local avec `npm run dev`
4. Vérifiez les emails dans le dashboard Resend

Bon succès avec votre site ! 🚀

