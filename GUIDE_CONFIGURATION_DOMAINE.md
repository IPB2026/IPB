# 🌐 Guide de Configuration du Domaine IPB

Ce guide vous explique comment configurer votre domaine `ipb-expertise.fr` (acheté sur Gandi) pour :
1. **Envoyer des emails** via Resend
2. **Héberger votre site** (optionnel, si vous déployez sur Vercel)

---

## 📧 Étape 1 : Configurer le domaine dans Resend

### 1.1 Ajouter le domaine dans Resend

1. Allez sur https://resend.com/domains
2. Cliquez sur **"Add Domain"**
3. Entrez : `ipb-expertise.fr`
4. Cliquez sur **"Add"**

### 1.2 Récupérer les enregistrements DNS

Resend va vous donner **3 enregistrements DNS** à ajouter dans Gandi :

1. **Enregistrement TXT** pour la vérification du domaine
   - Type : `TXT`
   - Nom : `@` (ou laissez vide)
   - Valeur : `resend-domain-verification=xxxxx...` (longue chaîne)

2. **Enregistrement SPF** (pour l'authentification email)
   - Type : `TXT`
   - Nom : `@` (ou laissez vide)
   - Valeur : `v=spf1 include:_spf.resend.com ~all`

3. **Enregistrement DKIM** (pour la signature email)
   - Type : `TXT`
   - Nom : `resend._domainkey` (ou `resend._domainkey.ipb-expertise.fr`)
   - Valeur : `p=xxxxx...` (clé publique DKIM)

---

## 🔧 Étape 2 : Configurer les DNS dans Gandi

### 2.1 Accéder à la gestion DNS

1. Connectez-vous sur https://www.gandi.net
2. Allez dans **"Domaines"** > **"ipb-expertise.fr"**
3. Cliquez sur **"Enregistrements DNS"** ou **"Zone DNS"**

### 2.2 Ajouter les enregistrements Resend

**Important** : Ne supprimez pas les enregistrements existants (A, AAAA, MX, etc.) sauf si vous savez ce que vous faites.

Ajoutez les 3 enregistrements suivants :

#### Enregistrement 1 : Vérification du domaine
```
Type : TXT
Nom : @ (ou laissez vide, ou ipb-expertise.fr)
Valeur : resend-domain-verification=xxxxx... (copiez depuis Resend)
TTL : 3600 (ou laissez par défaut)
```

#### Enregistrement 2 : SPF
```
Type : TXT
Nom : @ (ou laissez vide)
Valeur : v=spf1 include:_spf.resend.com ~all
TTL : 3600
```

#### Enregistrement 3 : DKIM
```
Type : TXT
Nom : resend._domainkey (ou resend._domainkey.ipb-expertise.fr)
Valeur : p=xxxxx... (copiez depuis Resend)
TTL : 3600
```

### 2.3 Sauvegarder

Cliquez sur **"Enregistrer"** ou **"Valider"** dans Gandi.

---

## ⏱️ Étape 3 : Attendre la propagation DNS

- **Temps d'attente** : 5 minutes à 24 heures (généralement 15-30 minutes)
- **Vérification** : Dans Resend, le statut passera de "Pending" à "Verified" (vérifié)

### Comment vérifier dans Resend :

1. Allez sur https://resend.com/domains
2. Cliquez sur `ipb-expertise.fr`
3. Vous verrez le statut de chaque enregistrement :
   - ✅ **Verified** = OK
   - ⏳ **Pending** = En attente de propagation
   - ❌ **Failed** = Erreur (vérifiez les valeurs)

---

## ✅ Étape 4 : Mettre à jour la configuration

Une fois le domaine vérifié dans Resend :

### 4.1 Mettre à jour `.env.local`

Modifiez le fichier `.env.local` :

```bash
# Email Resend
RESEND_API_KEY=re_JGHMG7hT_LvYjHKUW1o5vAcfgoNHGuvtT
EMAIL_FROM=noreply@ipb-expertise.fr  # ← Changez ici
EMAIL_TO=contact@ipb-expertise.fr     # ← Changez ici si vous voulez

# Configuration site
NEXT_PUBLIC_SITE_URL=https://www.ipb-expertise.fr  # ← Changez ici
NEXT_PUBLIC_PHONE=0561000000
```

### 4.2 Tester l'envoi d'email

1. Redémarrez le serveur : `npm run dev`
2. Testez le formulaire de contact : http://localhost:3000/contact
3. Vérifiez que l'email arrive avec l'expéditeur `noreply@ipb-expertise.fr`

---

## 🚀 Étape 5 : Configurer le domaine pour le site web (Vercel)

Si vous déployez sur Vercel, vous pouvez aussi utiliser votre domaine pour le site :

### 5.1 Dans Vercel

1. Allez dans votre projet Vercel
2. **Settings** > **Domains**
3. Ajoutez : `ipb-expertise.fr` et `www.ipb-expertise.fr`

### 5.2 Dans Gandi

Vercel vous donnera des enregistrements DNS à ajouter :

#### Option A : Enregistrement A (recommandé)
```
Type : A
Nom : @ (ou laissez vide)
Valeur : 76.76.21.21 (ou l'IP fournie par Vercel)
TTL : 3600
```

#### Option B : Enregistrement CNAME (pour www)
```
Type : CNAME
Nom : www
Valeur : cname.vercel-dns.com (ou la valeur fournie par Vercel)
TTL : 3600
```

**Note** : Si vous utilisez déjà un enregistrement A pour autre chose, utilisez plutôt les CNAME fournis par Vercel.

---

## 🔍 Vérification finale

### Checklist :

- [ ] Domaine ajouté dans Resend
- [ ] 3 enregistrements DNS ajoutés dans Gandi (TXT, SPF, DKIM)
- [ ] Domaine vérifié dans Resend (statut "Verified")
- [ ] `.env.local` mis à jour avec `EMAIL_FROM=noreply@ipb-expertise.fr`
- [ ] Test d'envoi d'email réussi
- [ ] (Optionnel) Domaine configuré dans Vercel pour le site

---

## 🐛 En cas de problème

### Le domaine n'est pas vérifié après 24h :

1. **Vérifiez les valeurs** : Copiez-collez exactement depuis Resend
2. **Vérifiez le nom** : Pour `@`, certains hébergeurs demandent `ipb-expertise.fr` ou laissez vide
3. **Vérifiez les outils DNS** :
   - https://mxtoolbox.com/SuperTool.aspx
   - Tapez : `ipb-expertise.fr` et vérifiez les enregistrements TXT

### Les emails ne partent pas :

1. Vérifiez que `EMAIL_FROM` dans `.env.local` est bien `noreply@ipb-expertise.fr`
2. Vérifiez les logs dans la console : `npm run dev`
3. Vérifiez le dashboard Resend : https://resend.com/emails

### Erreur "Domain not verified" :

- Le domaine doit être **entièrement vérifié** dans Resend avant d'envoyer
- Attendez que tous les enregistrements soient "Verified" (vérifiés)

---

## 📞 Support

- **Resend** : https://resend.com/docs
- **Gandi** : https://docs.gandi.net/fr/dns/
- **Vercel** : https://vercel.com/docs/concepts/projects/domains

Bon courage ! 🚀

