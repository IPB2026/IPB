# Variables d'environnement pour IPB

Ce fichier liste les variables d'environnement nécessaires pour le bon fonctionnement de l'application IPB.

Créez un fichier `.env.local` à la racine de votre projet et remplissez-le avec vos propres valeurs.

---

## Variables requises (Email Gmail)

### `SMTP_USER`
Votre adresse Gmail complète.
- **Exemple** : `SMTP_USER=contact.ipb@gmail.com`

### `SMTP_PASS`
Le mot de passe d'application Gmail (16 caractères généré depuis https://myaccount.google.com/apppasswords).
- **Exemple** : `SMTP_PASS=abcd efgh ijkl mnop`
- **Important** : Utilisez un mot de passe d'application, pas votre mot de passe Gmail normal !

### `EMAIL_TO`
Adresse email où recevoir les messages de contact et les demandes de diagnostic.
- **Exemple** : `EMAIL_TO=contact@ipb-expertise.fr`
- Ou pour les tests : `EMAIL_TO=votre-email@gmail.com`

---

## Variables optionnelles

### `EMAIL_FROM`
Adresse email utilisée comme expéditeur. Si non défini, utilise `SMTP_USER` par défaut.
- **Exemple** : `EMAIL_FROM=IPB <contact.ipb@gmail.com>`

### `NEXT_PUBLIC_SITE_URL`
URL publique de votre site. Utilisée pour la génération du sitemap et les métadonnées SEO.
- **Exemple** : `NEXT_PUBLIC_SITE_URL=https://www.ipb-expertise.fr`

### `NEXT_PUBLIC_PHONE`
Numéro de téléphone public de l'entreprise.
- **Exemple** : `NEXT_PUBLIC_PHONE=0561000000`

### `NEXT_PUBLIC_GA_TRACKING_ID` (optionnel)
ID de suivi Google Analytics (Measurement ID).
- **Exemple** : `NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX`

---

## Exemple de fichier `.env.local`

```bash
# Configuration Email Gmail (Nodemailer)
SMTP_USER=contact.ipb@gmail.com
SMTP_PASS=abcd efgh ijkl mnop

# Email de réception
EMAIL_TO=contact@ipb-expertise.fr

# Email expéditeur (optionnel)
EMAIL_FROM=IPB <contact.ipb@gmail.com>

# Configuration site
NEXT_PUBLIC_SITE_URL=https://www.ipb-expertise.fr
NEXT_PUBLIC_PHONE=0561000000

# Google Analytics (optionnel)
# NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

---

## 🔒 Sécurité

- ⚠️ Ne commitez **JAMAIS** le fichier `.env.local` dans Git
- ⚠️ Le fichier est déjà dans `.gitignore`
- ⚠️ Ne partagez jamais vos mots de passe d'application

---

## 📚 Guide de configuration

Pour savoir comment obtenir un mot de passe d'application Gmail, consultez :
- `GUIDE_CONFIGURATION_GMAIL.md`
