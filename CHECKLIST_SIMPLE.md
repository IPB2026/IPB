# ✅ Checklist Simple : Configuration Email

Cochez chaque case au fur et à mesure :

---

## 📋 Étape 1 : Resend

- [ ] Je suis allé sur https://resend.com/domains
- [ ] J'ai cliqué sur "Add Domain"
- [ ] J'ai tapé : `ipb-expertise.fr`
- [ ] J'ai cliqué sur "Add"
- [ ] J'ai copié le **premier code** (celui qui commence par `resend-domain-verification=`)
- [ ] J'ai copié le **deuxième code** (celui qui commence par `v=spf1`)
- [ ] J'ai copié le **troisième code** (celui qui commence par `p=MIGf...` et qui est très long)

---

## 📋 Étape 2 : Gandi

- [ ] Je suis allé sur https://www.gandi.net
- [ ] Je me suis connecté
- [ ] J'ai cliqué sur "Domaines" > "ipb-expertise.fr"
- [ ] J'ai trouvé la section "Enregistrements DNS" (ou "Zone DNS")

### Premier enregistrement (Vérification) :

- [ ] J'ai cliqué sur "Ajouter un enregistrement"
- [ ] Type : **TXT**
- [ ] Nom : **@** (ou laissé vide)
- [ ] Valeur : J'ai collé le **premier code** depuis Resend
- [ ] J'ai cliqué sur "Enregistrer"

### Deuxième enregistrement (SPF) :

- [ ] J'ai cliqué sur "Ajouter un enregistrement"
- [ ] Type : **TXT**
- [ ] Nom : **@** (ou laissé vide)
- [ ] Valeur : J'ai collé le **deuxième code** depuis Resend
- [ ] J'ai cliqué sur "Enregistrer"

### Troisième enregistrement (DKIM) :

- [ ] J'ai cliqué sur "Ajouter un enregistrement"
- [ ] Type : **TXT**
- [ ] Nom : **`resend._domainkey`** (exactement comme ça)
- [ ] Valeur : J'ai collé le **troisième code** depuis Resend
- [ ] J'ai cliqué sur "Enregistrer"

---

## 📋 Étape 3 : Attente

- [ ] J'ai attendu 15-30 minutes
- [ ] Je suis retourné sur https://resend.com/domains
- [ ] J'ai cliqué sur "ipb-expertise.fr"
- [ ] J'ai vu 3 coches vertes ✅
- [ ] Le statut est **"Verified"** (Vérifié)

---

## 📋 Étape 4 : Configuration finale

- [ ] J'ai ouvert le fichier `.env.local`
- [ ] J'ai changé `EMAIL_FROM=onboarding@resend.dev` en `EMAIL_FROM=noreply@ipb-expertise.fr`
- [ ] J'ai redémarré le serveur : `npm run dev`
- [ ] J'ai testé le formulaire de contact
- [ ] L'email est bien arrivé avec l'expéditeur `noreply@ipb-expertise.fr` ! 🎉

---

## 🆘 Si vous êtes bloqué

Dites-moi à quelle étape vous êtes et je vous aiderai ! 😊

