# 📧 Guide Ultra-Simple : Configurer les Emails avec votre Domaine

**Pas besoin de comprendre DKIM, SPF, etc. !** On va juste copier-coller ce que Resend nous donne.

---

## 🎯 Objectif

Permettre à votre site d'envoyer des emails depuis `noreply@ipb-expertise.fr` au lieu de `onboarding@resend.dev`.

---

## 📝 Étape 1 : Aller sur Resend

1. Ouvrez votre navigateur
2. Allez sur : **https://resend.com/domains**
3. Connectez-vous avec votre compte Resend

---

## ➕ Étape 2 : Ajouter votre domaine

1. Cliquez sur le bouton **"Add Domain"** (ou "Ajouter un domaine")
2. Dans le champ qui apparaît, tapez : **`ipb-expertise.fr`**
3. Cliquez sur **"Add"** (ou "Ajouter")

---

## 📋 Étape 3 : Copier les 3 codes

Après avoir ajouté le domaine, Resend va vous montrer **3 codes à copier**.

**Important** : Ne vous préoccupez pas de ce que signifient "DKIM", "SPF", etc. On va juste copier-coller.

Vous verrez quelque chose comme ça :

```
┌─────────────────────────────────────────┐
│ 1. Vérification du domaine              │
│                                          │
│ Type : TXT                               │
│ Nom : @                                  │
│ Valeur : resend-domain-verification=    │
│          abc123def456ghi789...          │
│                                          │
│ [Bouton "Copy"]                          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 2. SPF                                  │
│                                          │
│ Type : TXT                               │
│ Nom : @                                  │
│ Valeur : v=spf1 include:_spf.resend... │
│                                          │
│ [Bouton "Copy"]                          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 3. DKIM                                  │
│                                          │
│ Type : TXT                               │
│ Nom : resend._domainkey                 │
│ Valeur : p=MIGfMA0GCSqGSIb3DQEBAQU...  │
│                                          │
│ [Bouton "Copy"]                          │
└─────────────────────────────────────────┘
```

**Action** : Pour chaque code, cliquez sur le bouton **"Copy"** et copiez la valeur dans un fichier texte ou un document Word. Vous en aurez besoin dans l'étape suivante.

---

## 🔧 Étape 4 : Aller sur Gandi

1. Ouvrez un nouvel onglet dans votre navigateur
2. Allez sur : **https://www.gandi.net**
3. Connectez-vous avec votre compte Gandi

---

## 📍 Étape 5 : Trouver la section DNS

1. Dans Gandi, cliquez sur **"Domaines"** (ou "Domains")
2. Cliquez sur **"ipb-expertise.fr"**
3. Cherchez une section qui s'appelle :
   - **"Enregistrements DNS"** OU
   - **"Zone DNS"** OU
   - **"DNS Records"**

---

## ➕ Étape 6 : Ajouter le premier code (Vérification)

1. Dans Gandi, cliquez sur **"Ajouter un enregistrement"** (ou "Add Record")

2. Remplissez comme ça :
   - **Type** : Sélectionnez **"TXT"** dans le menu déroulant
   - **Nom** : Laissez vide OU tapez **`@`** (selon ce que Gandi demande)
   - **Valeur** : Collez le **premier code** que vous avez copié depuis Resend (celui qui commence par `resend-domain-verification=`)
   - **TTL** : Laissez par défaut (généralement 3600)

3. Cliquez sur **"Enregistrer"** (ou "Save")

---

## ➕ Étape 7 : Ajouter le deuxième code (SPF)

1. Cliquez à nouveau sur **"Ajouter un enregistrement"**

2. Remplissez comme ça :
   - **Type** : **"TXT"**
   - **Nom** : Laissez vide OU tapez **`@`**
   - **Valeur** : Collez le **deuxième code** depuis Resend (celui qui commence par `v=spf1 include:_spf.resend.com`)
   - **TTL** : Laissez par défaut

3. Cliquez sur **"Enregistrer"**

---

## ➕ Étape 8 : Ajouter le troisième code (DKIM)

1. Cliquez à nouveau sur **"Ajouter un enregistrement"**

2. Remplissez comme ça :
   - **Type** : **"TXT"**
   - **Nom** : Tapez **`resend._domainkey`** (exactement comme ça)
   - **Valeur** : Collez le **troisième code** depuis Resend (celui qui commence par `p=MIGf...` ou similaire, c'est très long)
   - **TTL** : Laissez par défaut

3. Cliquez sur **"Enregistrer"**

---

## ⏱️ Étape 9 : Attendre

1. **Fermez Gandi** (vous avez fini là-bas)
2. **Retournez sur Resend** (https://resend.com/domains)
3. **Attendez 15-30 minutes** (le temps que les changements se propagent)

Pendant ce temps, vous pouvez :
- Boire un café ☕
- Faire autre chose
- Revenir dans 30 minutes

---

## ✅ Étape 10 : Vérifier que ça marche

1. Retournez sur **https://resend.com/domains**
2. Cliquez sur **"ipb-expertise.fr"**
3. Vous devriez voir 3 coches vertes ✅ à côté de chaque enregistrement
4. Le statut du domaine devrait être **"Verified"** (Vérifié)

**Si c'est encore "Pending"** (En attente) :
- Attendez encore 15-30 minutes
- Vérifiez que vous avez bien copié-collé les 3 codes dans Gandi

---

## 🎉 Étape 11 : Mettre à jour votre site

Une fois que le domaine est "Verified" dans Resend :

1. Ouvrez le fichier `.env.local` dans votre projet IPB
2. Changez cette ligne :
   ```
   EMAIL_FROM=onboarding@resend.dev
   ```
   Par :
   ```
   EMAIL_FROM=noreply@ipb-expertise.fr
   ```

3. Redémarrez votre serveur :
   ```bash
   npm run dev
   ```

4. Testez le formulaire de contact : http://localhost:3000/contact

5. Vérifiez que l'email arrive avec l'expéditeur `noreply@ipb-expertise.fr` ! 🎉

---

## 🆘 Si ça ne marche pas

### Le domaine n'est toujours pas "Verified" après 1 heure :

1. **Vérifiez dans Gandi** que vous avez bien ajouté les 3 enregistrements
2. **Vérifiez les valeurs** : Elles doivent être **exactement** les mêmes que dans Resend (pas d'espace en trop, pas de caractère manquant)
3. **Vérifiez le nom** : Pour le 3ème enregistrement (DKIM), le nom doit être **exactement** `resend._domainkey`

### Vous ne trouvez pas la section DNS dans Gandi :

- Cherchez **"Zone DNS"** ou **"DNS Records"**
- Ou contactez le support Gandi : https://help.gandi.net

### Vous avez supprimé un enregistrement par erreur :

- **Ne paniquez pas** ! Les autres enregistrements (A, AAAA, MX) ne sont pas nécessaires pour Resend
- Si vous avez supprimé quelque chose d'important, contactez le support Gandi

---

## 📸 Aide visuelle

Si vous êtes bloqué, voici à quoi ça ressemble dans Gandi :

```
┌─────────────────────────────────────────────┐
│ Gandi - Enregistrements DNS                  │
├─────────────────────────────────────────────┤
│                                              │
│ Type    │ Nom                │ Valeur        │
├─────────┼────────────────────┼──────────────┤
│ A       │ @                  │ 192.0.2.1    │
│ TXT     │ @                  │ [VOTRE CODE 1]│ ← Ajoutez ça
│ TXT     │ @                  │ [VOTRE CODE 2]│ ← Ajoutez ça
│ TXT     │ resend._domainkey  │ [VOTRE CODE 3]│ ← Ajoutez ça
│                                              │
│ [+ Ajouter un enregistrement]                │
└─────────────────────────────────────────────┘
```

---

## ✨ Résumé en 3 points

1. **Resend** → Ajoutez le domaine → Copiez les 3 codes
2. **Gandi** → Ajoutez les 3 codes dans la section DNS
3. **Attendez 30 min** → Vérifiez dans Resend que c'est "Verified"

C'est tout ! Pas besoin de comprendre ce que signifient DKIM, SPF, etc. 😊

---

**Besoin d'aide ?** Dites-moi à quelle étape vous êtes bloqué et je vous aiderai ! 🚀

