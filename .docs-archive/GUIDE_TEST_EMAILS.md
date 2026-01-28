# 📧 Guide de Test des Emails

Votre clé Resend est maintenant configurée ! Voici comment tester.

---

## 🧪 Test 1 : Formulaire de Contact

### Étapes :
1. Démarrez le serveur :
   ```bash
   npm run dev
   ```

2. Allez sur : http://localhost:3000/contact

3. Remplissez le formulaire :
   - Nom : Votre nom
   - Email : **Votre vraie adresse email** (pour recevoir la confirmation)
   - Sujet : Test
   - Message : Ceci est un test

4. Cliquez sur "Envoyer le message"

5. Vérifiez :
   - ✅ Message de succès s'affiche sur la page
   - ✅ Email reçu dans `contact@ipb-expertise.fr` (ou l'adresse configurée dans `EMAIL_TO`)
   - ✅ Email de confirmation reçu à votre adresse email

---

## 🧪 Test 2 : Diagnostic

### Étapes :
1. Allez sur : http://localhost:3000/diagnostic

2. Complétez le diagnostic :
   - Choisissez "Fissures" ou "Humidité"
   - Répondez aux questions
   - À la fin, remplissez le formulaire de réservation :
     - Nom : Votre nom
     - Téléphone : Votre numéro
     - Email : **Votre vraie adresse email**

3. Cliquez sur "Demander mon créneau"

4. Vérifiez :
   - ✅ Message de succès s'affiche
   - ✅ Email reçu dans `contact@ipb-expertise.fr` avec :
     - Les détails du diagnostic
     - Le niveau d'urgence (🔴 URGENT, 🟠 PRIORITAIRE, ou 🟢 NORMAL)
     - Le score de risque
     - Les informations du client

---

## ⚠️ Important : Domaine d'envoi Resend

### Si vous utilisez `noreply@ipb-expertise.fr` :
Vous devez d'abord vérifier votre domaine dans Resend :
1. Allez dans le dashboard Resend > Domains
2. Ajoutez `ipb-expertise.fr`
3. Suivez les instructions DNS pour vérifier

### Pour tester immédiatement (sans vérifier le domaine) :
Modifiez `.env.local` et utilisez le domaine de test de Resend :
```bash
EMAIL_FROM=onboarding@resend.dev
```

Cela fonctionne immédiatement pour les tests, mais les emails viendront de `onboarding@resend.dev`.

---

## 🔍 Vérifier les emails dans Resend

1. Allez sur https://resend.com/emails
2. Vous verrez tous les emails envoyés
3. Vous pouvez voir le statut (delivered, bounced, etc.)

---

## 🐛 En cas de problème

### Erreur "Invalid API Key" :
- Vérifiez que la clé dans `.env.local` est correcte
- Redémarrez le serveur : `npm run dev`

### Emails ne partent pas :
- Vérifiez les logs dans la console du terminal
- Vérifiez le dashboard Resend pour voir les erreurs
- Assurez-vous que `EMAIL_TO` est une adresse email valide

### Emails partent mais n'arrivent pas :
- Vérifiez les spams
- Vérifiez que le domaine est bien vérifié dans Resend
- Utilisez `onboarding@resend.dev` pour tester

---

## ✅ Une fois que ça fonctionne

Vous pouvez :
1. Vérifier votre domaine dans Resend
2. Changer `EMAIL_FROM` pour votre vrai domaine
3. Déployer sur Vercel avec les mêmes variables d'environnement

Bon test ! 🚀

