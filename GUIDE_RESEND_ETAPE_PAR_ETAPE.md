# 🔍 Guide : Que voir dans Resend

Si Resend ne vous montre pas les 3 codes, voici ce qui peut se passer :

---

## 📍 Étape 1 : Vérifier que vous êtes au bon endroit

1. Allez sur : **https://resend.com/domains**
2. Vous devriez voir une page avec :
   - Un bouton **"Add Domain"** (ou "Ajouter un domaine")
   - OU une liste de domaines si vous en avez déjà ajouté

**Question** : Que voyez-vous exactement sur cette page ?

---

## ➕ Étape 2 : Ajouter le domaine

1. Cliquez sur **"Add Domain"** (ou "Ajouter un domaine")
2. Une fenêtre ou un formulaire devrait apparaître
3. Tapez : **`ipb-expertise.fr`**
4. Cliquez sur **"Add"** (ou "Ajouter")

**Question** : Que se passe-t-il après avoir cliqué sur "Add" ?

---

## 🔍 Étape 3 : Où sont les codes ?

Après avoir ajouté le domaine, vous devriez voir :

### Option A : Une page avec les codes directement

Vous voyez quelque chose comme :
```
┌─────────────────────────────────────────┐
│ Domain: ipb-expertise.fr                 │
│ Status: Pending                          │
│                                          │
│ Add these DNS records:                   │
│                                          │
│ 1. TXT Record                           │
│    Name: @                               │
│    Value: resend-domain-verification=... │
│                                          │
│ 2. TXT Record (SPF)                      │
│    Name: @                               │
│    Value: v=spf1 include:_spf.resend... │
│                                          │
│ 3. TXT Record (DKIM)                     │
│    Name: resend._domainkey               │
│    Value: p=MIGfMA0GCSqGSIb3DQEBAQU...  │
└─────────────────────────────────────────┘
```

### Option B : Un lien "View DNS Records" ou "Configure DNS"

Si vous voyez un bouton ou un lien qui dit :
- **"View DNS Records"**
- **"Configure DNS"**
- **"DNS Settings"**
- **"Show DNS Records"**

→ **Cliquez dessus** pour voir les codes !

### Option C : Le domaine est déjà ajouté

Si le domaine `ipb-expertise.fr` apparaît déjà dans la liste :

1. **Cliquez sur le nom du domaine** (`ipb-expertise.fr`)
2. Vous devriez voir une page de détails
3. Cherchez une section qui dit :
   - **"DNS Records"**
   - **"DNS Configuration"**
   - **"Add these records"**
   - **"Records to add"**

---

## 🆘 Si vous ne voyez toujours rien

### Vérification 1 : Le domaine est-il bien ajouté ?

- Regardez la liste des domaines sur https://resend.com/domains
- Voyez-vous `ipb-expertise.fr` dans la liste ?
- Si oui, **cliquez dessus**

### Vérification 2 : Cherchez un onglet ou un menu

Sur la page du domaine, cherchez :
- Des **onglets** en haut (DNS, Settings, etc.)
- Un menu **"DNS"** ou **"Configuration"**
- Un bouton **"Show DNS Records"**

### Vérification 3 : Le statut du domaine

- Si le statut est **"Verified"** (Vérifié), les codes ne s'affichent peut-être plus
- Dans ce cas, vous n'avez plus besoin des codes, c'est déjà configuré !

---

## 📸 Aide : Décrivez-moi ce que vous voyez

Pour mieux vous aider, dites-moi :

1. **Sur quelle page êtes-vous ?** (URL dans la barre d'adresse)
2. **Que voyez-vous à l'écran ?** (boutons, texte, liste, etc.)
3. **Y a-t-il un message d'erreur ?**
4. **Le domaine `ipb-expertise.fr` apparaît-il quelque part ?**

---

## 🎯 Solution rapide : Contactez le support Resend

Si vous êtes vraiment bloqué :

1. Allez sur https://resend.com/support
2. Ou envoyez un email au support Resend
3. Dites-leur : "J'ai ajouté le domaine ipb-expertise.fr mais je ne vois pas les enregistrements DNS à ajouter"

Ils vous aideront rapidement !

---

## 💡 Alternative : Utiliser l'API Resend

Si l'interface ne fonctionne pas, vous pouvez aussi utiliser l'API Resend pour obtenir les enregistrements DNS, mais c'est plus technique.

---

**Dites-moi exactement ce que vous voyez dans Resend et je vous guiderai !** 😊

