# Setup — Remontée des leads par email

Ce guide explique comment recevoir les leads (calculateur, diagnostic, contact, rappel)
directement dans ta boîte email. **Aucun code ne change** — c'est uniquement de la
configuration de variables d'environnement Vercel.

---

## Comment ça marche déjà (sans rien faire)

Les 4 formulaires de capture de lead du site appellent une server action qui envoie
**deux emails** :

| Source | Action serveur | Page |
|---|---|---|
| Diagnostic en 3 minutes | `submitDiagnosticLead` | [/diagnostic](https://www.ipb-expertise.fr/diagnostic) |
| Calculateur prix mur porteur | `submitCalculatorLead` | [/calcul-prix-mur-porteur](https://www.ipb-expertise.fr/calcul-prix-mur-porteur) |
| Formulaire contact | `submitContact` | [/contact](https://www.ipb-expertise.fr/contact) |
| Bouton « Rappel rapide » | `submitQuickCallback` | popup global |

À chaque envoi :
- 📩 **Email équipe** → vers `EMAIL_TO` (ta boîte) avec tous les détails du lead, scoring, et action recommandée
- 📨 **Email client** → vers le visiteur avec un récap de sa demande

C'est exactement la même organisation pour le calculateur et pour le diagnostic.

---

## Pourquoi tu ne reçois peut-être rien

Si tes leads n'arrivent pas dans ta boîte, c'est qu'**une variable d'environnement Vercel
manque**. Il y a deux causes possibles :

### 1. `EMAIL_TO` est absent
👉 Le client reçoit son email récap mais **toi tu ne reçois rien** (silencieux).

### 2. `SMTP_USER` ou `SMTP_PASS` sont absents
👉 **Aucun email ne part** (ni à toi, ni au client). Tu vois quand même le « Merci, votre
demande a été envoyée » côté visiteur, mais en backend rien n'a été transmis.

---

## Setup en 5 minutes

### Étape 1 — Créer un mot de passe d'application Gmail

1. Aller sur https://myaccount.google.com/security
2. Activer la **vérification en 2 étapes** si ce n'est pas déjà fait
3. Aller sur https://myaccount.google.com/apppasswords
4. Créer un mot de passe d'application nommé « IPB Expertise · Vercel »
5. Copier le mot de passe au format `xxxx xxxx xxxx xxxx` (16 caractères avec espaces)

### Étape 2 — Configurer Vercel

1. Aller sur https://vercel.com/dashboard
2. Sélectionner le projet IPB
3. **Settings → Environment Variables**
4. Créer ces 4 variables (toutes en `Production` + `Preview` + `Development`) :

```
SMTP_USER     = contact@ipb-expertise.fr
SMTP_PASS     = xxxx xxxx xxxx xxxx     ← le mot de passe d'application Gmail
EMAIL_FROM    = contact@ipb-expertise.fr
EMAIL_TO      = mohammed.grada2@gmail.com   ← ton email perso pour recevoir les leads
```

> 💡 Tu peux mettre `EMAIL_TO` = ton email perso pour tester, puis basculer sur
> `contact@ipb-expertise.fr` plus tard. Tu peux aussi mettre plusieurs adresses
> séparées par des virgules : `contact@ipb-expertise.fr,mohammed.grada2@gmail.com`

### Étape 3 — Redéployer

1. Vercel **Deployments → trois points → Redeploy** sur le dernier déploiement
2. Attendre la fin du build (~2 min)

### Étape 4 — Tester

1. Aller sur la version prod de `/calcul-prix-mur-porteur`
2. Cliquer « Lancer le calcul », répondre aux 4 questions
3. Sur l'écran d'estimation, cliquer « **Recevoir l'estimation par email** »
4. Renseigner ton email perso, ton téléphone, ta commune
5. Cliquer « **Envoyer mon estimation** »

Tu dois recevoir **deux emails dans la minute** :
- Un dans ta boîte perso → email récap client (sujet : « Votre estimation pour l'ouverture de mur porteur à … »)
- Un dans `EMAIL_TO` → email équipe avec tous les détails du lead (sujet : `[CALC X–Y€] Mur porteur à … — email`)

### Étape 5 — Si rien n'arrive

1. Aller sur Vercel **Logs → Runtime Logs**
2. Refaire un test depuis `/calcul-prix-mur-porteur`
3. Chercher les lignes commençant par `[email]` dans les logs

Le code log précisément quelles variables sont manquantes :

```
[email] Configuration SMTP manquante. Vérifiez SMTP_USER et SMTP_PASS dans Vercel...
{
  SMTP_USER: '✓ défini',
  SMTP_PASS: '✗ manquant',         ← tu vois immédiatement ce qui cloche
  SMTP_PASSWORD: '✗ manquant',
  EMAIL_TO: '✓ défini'
}
```

---

## Variantes acceptées

Le code est tolérant sur le nom du mot de passe SMTP — il accepte indifféremment :
- `SMTP_PASS` (nom officiel, préféré)
- `SMTP_PASSWORD` (alias compatible)

Si tu as configuré l'un des deux, ça marche.

---

## Au-delà de l'email — pour aller plus loin

Quand le volume de leads dépassera 10-20 par semaine, ces options deviennent intéressantes :

1. **CRM** (HubSpot, Pipedrive, Notion DB) — éviter de gérer les leads dans Gmail
2. **Slack/Discord notification** — recevoir un ping en plus de l'email
3. **Webhook vers Zapier** — automatiser le routage par scoring du lead
4. **Stockage en base** (Supabase, Vercel Postgres) — historique consultable

Aucun de ces ajouts n'est nécessaire au démarrage. La config email Vercel ci-dessus
suffit largement pour commencer.
