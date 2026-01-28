# 📋 Enregistrements DNS à ajouter dans Gandi

Ce fichier liste les enregistrements DNS que vous devrez ajouter dans Gandi pour configurer votre domaine `ipb-expertise.fr` avec Resend.

---

## 🔴 IMPORTANT : Récupérez d'abord les valeurs depuis Resend

**Ne copiez pas ces valeurs d'exemple !** Vous devez récupérer les **vraies valeurs** depuis votre dashboard Resend :

1. Allez sur https://resend.com/domains
2. Ajoutez le domaine `ipb-expertise.fr`
3. Copiez les valeurs exactes qui vous sont fournies

---

## 📝 Enregistrements à ajouter

### 1. Vérification du domaine (TXT)

```
Type : TXT
Nom : @ (ou laissez vide dans Gandi)
Valeur : resend-domain-verification=xxxxx... (à copier depuis Resend)
TTL : 3600
```

**Exemple** (ne pas utiliser, c'est juste un exemple) :
```
resend-domain-verification=abc123def456ghi789...
```

---

### 2. SPF (TXT)

```
Type : TXT
Nom : @ (ou laissez vide)
Valeur : v=spf1 include:_spf.resend.com ~all
TTL : 3600
```

**Note** : Si vous avez déjà un enregistrement SPF, vous devrez le fusionner. Par exemple :
```
v=spf1 include:_spf.resend.com include:autre-serveur.com ~all
```

---

### 3. DKIM (TXT)

```
Type : TXT
Nom : resend._domainkey (ou resend._domainkey.ipb-expertise.fr selon Gandi)
Valeur : p=xxxxx... (clé publique DKIM à copier depuis Resend)
TTL : 3600
```

**Exemple** (ne pas utiliser) :
```
p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...
```

---

## 🎯 Instructions pour Gandi

### Méthode 1 : Interface Web Gandi

1. Connectez-vous sur https://www.gandi.net
2. **Domaines** > **ipb-expertise.fr**
3. **Enregistrements DNS** ou **Zone DNS**
4. Cliquez sur **"Ajouter un enregistrement"**
5. Remplissez :
   - **Type** : `TXT`
   - **Nom** : `@` (ou laissez vide)
   - **Valeur** : (copiez depuis Resend)
   - **TTL** : `3600` (ou par défaut)
6. Cliquez sur **"Enregistrer"**
7. Répétez pour les 3 enregistrements

### Méthode 2 : Fichier de zone (si vous avez accès)

Si Gandi vous permet d'éditer le fichier de zone directement, ajoutez :

```
@   3600  IN  TXT  "resend-domain-verification=xxxxx..."
@   3600  IN  TXT  "v=spf1 include:_spf.resend.com ~all"
resend._domainkey  3600  IN  TXT  "p=xxxxx..."
```

---

## ⚠️ Points d'attention

### Nom de l'enregistrement

Dans Gandi, pour l'enregistrement racine (`@`), vous pouvez :
- Laisser le champ **"Nom"** vide
- Ou mettre `@`
- Ou mettre `ipb-expertise.fr`

Testez et voyez ce qui fonctionne. Gandi peut avoir une interface différente.

### Enregistrements existants

**Ne supprimez pas** les enregistrements existants (A, AAAA, MX, etc.) sauf si vous savez ce que vous faites.

### Propagation DNS

- **Temps d'attente** : 5 minutes à 24 heures
- **Généralement** : 15-30 minutes
- **Vérification** : Dans Resend, le statut passera à "Verified"

---

## ✅ Vérification

Après avoir ajouté les enregistrements :

1. Attendez 15-30 minutes
2. Allez sur https://resend.com/domains
3. Cliquez sur `ipb-expertise.fr`
4. Vérifiez que tous les enregistrements sont **"Verified"** (vérifiés)

Si un enregistrement est toujours "Pending" après 24h, vérifiez :
- Les valeurs sont exactement les mêmes que dans Resend
- Le nom de l'enregistrement est correct
- Utilisez https://mxtoolbox.com pour vérifier la propagation DNS

---

## 🚀 Une fois vérifié

Mettez à jour votre `.env.local` :

```bash
EMAIL_FROM=noreply@ipb-expertise.fr
```

Et testez l'envoi d'email ! 📧

