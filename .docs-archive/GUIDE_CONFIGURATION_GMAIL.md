# 📧 Guide de Configuration Gmail avec Nodemailer

Ce guide vous explique comment configurer Gmail pour envoyer des emails depuis votre site IPB.

---

## ✅ Avantages

- ✅ **100% gratuit** (jusqu'à 500 emails/jour)
- ✅ Configuration simple (5 minutes)
- ✅ Pas besoin de domaine vérifié
- ✅ Fonctionne immédiatement

---

## 🔑 Étape 1 : Créer un Mot de passe d'application Gmail

### 1.1 Activer l'authentification à 2 facteurs

1. Allez sur : https://myaccount.google.com/security
2. Cherchez **"Validation en deux étapes"** (2-Step Verification)
3. Si ce n'est pas activé, **activez-le** (c'est obligatoire pour les mots de passe d'application)

### 1.2 Créer un Mot de passe d'application

1. Allez sur : https://myaccount.google.com/apppasswords
   - Ou : https://myaccount.google.com/security → Cherchez "Mots de passe des applications"

2. Si vous ne voyez pas cette option :
   - Assurez-vous que la validation en 2 étapes est activée
   - Rechargez la page

3. Dans "Sélectionner une application", choisissez **"Autre (nom personnalisé)"**
4. Tapez : **"IPB Site Web"** (ou n'importe quel nom)
5. Cliquez sur **"Générer"**

6. **IMPORTANT** : Copiez le mot de passe qui s'affiche (16 caractères, espaces séparés)
   - Il ressemble à : `abcd efgh ijkl mnop`
   - **Vous ne pourrez plus le voir après !**
   - Notez-le dans un endroit sûr

---

## ⚙️ Étape 2 : Configurer le fichier .env.local

Ouvrez le fichier `.env.local` à la racine de votre projet et ajoutez/modifiez ces lignes :

```bash
# Configuration Email Gmail (Nodemailer)
SMTP_USER=votre-email@gmail.com
SMTP_PASS=abcd efgh ijkl mnop

# Email de réception (où recevoir les messages)
EMAIL_TO=contact@ipb-expertise.fr
# Ou votre email personnel pour les tests :
# EMAIL_TO=votre-email@gmail.com

# Email expéditeur (optionnel, utilisera SMTP_USER par défaut)
EMAIL_FROM=IPB <votre-email@gmail.com>

# Configuration site
NEXT_PUBLIC_SITE_URL=https://www.ipb-expertise.fr
NEXT_PUBLIC_PHONE=0561000000
```

### Exemple complet :

```bash
# Configuration Email Gmail
SMTP_USER=contact.ipb@gmail.com
SMTP_PASS=abcd efgh ijkl mnop

# Email de réception
EMAIL_TO=contact@ipb-expertise.fr

# Email expéditeur
EMAIL_FROM=IPB <contact.ipb@gmail.com>

# Configuration site
NEXT_PUBLIC_SITE_URL=https://www.ipb-expertise.fr
NEXT_PUBLIC_PHONE=0561000000
```

**Important** :
- `SMTP_USER` : Votre adresse Gmail complète (ex: `contact.ipb@gmail.com`)
- `SMTP_PASS` : Le mot de passe d'application que vous avez copié (avec ou sans espaces, ça marche dans les deux cas)
- `EMAIL_TO` : L'adresse où vous voulez recevoir les messages (peut être différente de SMTP_USER)

---

## ✅ Étape 3 : Tester

### 3.1 Redémarrer le serveur

```bash
npm run dev
```

### 3.2 Tester le formulaire de contact

1. Allez sur : http://localhost:3000/contact
2. Remplissez le formulaire avec votre email
3. Envoyez
4. Vérifiez :
   - ✅ Message de succès sur la page
   - ✅ Email reçu dans `EMAIL_TO` (avec le message)
   - ✅ Email de confirmation reçu à votre email de test

### 3.3 Tester le diagnostic

1. Allez sur : http://localhost:3000/diagnostic
2. Complétez le diagnostic
3. Remplissez le formulaire de réservation
4. Vérifiez :
   - ✅ Email reçu dans `EMAIL_TO` avec les détails du diagnostic

---

## 🐛 Résolution de problèmes

### Erreur "Invalid login"

**Cause** : Le mot de passe d'application est incorrect ou la validation en 2 étapes n'est pas activée.

**Solution** :
1. Vérifiez que la validation en 2 étapes est activée
2. Générez un nouveau mot de passe d'application
3. Copiez-le exactement dans `.env.local`
4. Redémarrez le serveur

### Erreur "Less secure app access"

**Cause** : Vous essayez d'utiliser votre mot de passe Gmail normal au lieu d'un mot de passe d'application.

**Solution** : Utilisez un **mot de passe d'application** (voir Étape 1), pas votre mot de passe Gmail normal.

### Les emails n'arrivent pas

1. Vérifiez les **spams**
2. Vérifiez les logs dans le terminal : `npm run dev`
3. Vérifiez que `SMTP_USER` et `SMTP_PASS` sont corrects dans `.env.local`
4. Vérifiez que `EMAIL_TO` est une adresse email valide

### "Variables SMTP_USER et SMTP_PASS doivent être configurées"

**Cause** : Les variables d'environnement ne sont pas chargées.

**Solution** :
1. Vérifiez que le fichier `.env.local` existe à la racine du projet
2. Vérifiez qu'il contient `SMTP_USER` et `SMTP_PASS`
3. Redémarrez le serveur : `npm run dev`

---

## 🔒 Sécurité

### ⚠️ Important

- Ne commitez **JAMAIS** le fichier `.env.local` dans Git
- Il est déjà dans `.gitignore`, mais vérifiez quand même
- Le mot de passe d'application est confidentiel
- Ne le partagez jamais publiquement

### Pour la production (Vercel)

Quand vous déployez sur Vercel :
1. Allez dans les paramètres de votre projet Vercel
2. **Environment Variables**
3. Ajoutez :
   - `SMTP_USER` = `votre-email@gmail.com`
   - `SMTP_PASS` = `abcd efgh ijkl mnop`
   - `EMAIL_TO` = `contact@ipb-expertise.fr`
   - `EMAIL_FROM` = `IPB <votre-email@gmail.com>`

---

## ✅ Checklist

- [ ] Validation en 2 étapes activée sur Gmail
- [ ] Mot de passe d'application créé
- [ ] Mot de passe copié dans un endroit sûr
- [ ] `.env.local` créé avec `SMTP_USER` et `SMTP_PASS`
- [ ] Serveur redémarré : `npm run dev`
- [ ] Formulaire de contact testé
- [ ] Email reçu avec succès !

---

**C'est tout ! Votre site peut maintenant envoyer des emails via Gmail ! 🎉**

