# 🚀 Guide de Déploiement - IPB

## Déploiement rapide sur Vercel (Recommandé)

### Étape 1 : Préparer le code
```bash
# Vérifier que tout fonctionne
npm run build

# Si OK, commit et push sur GitHub
git add .
git commit -m "Site prêt pour production"
git push origin main
```

### Étape 2 : Créer un compte Vercel
1. Allez sur https://vercel.com
2. Créez un compte (gratuit)
3. Connectez votre compte GitHub

### Étape 3 : Déployer
1. Cliquez sur "New Project"
2. Importez votre repo IPB
3. Vercel détecte automatiquement Next.js
4. Cliquez sur "Deploy"

### Étape 4 : Configurer les variables d'environnement
Dans le dashboard Vercel :
1. Allez dans Settings > Environment Variables
2. Ajoutez toutes les variables de `.env.example`
3. Redéployez

### Étape 5 : Configurer le domaine
1. Dans Settings > Domains
2. Ajoutez votre domaine (ipb-expertise.fr)
3. Suivez les instructions DNS

---

## Déploiement sur votre propre serveur

### Prérequis
- Node.js 18+ installé
- PM2 pour gérer le processus (optionnel)

### Installation
```bash
# Sur votre serveur
git clone https://github.com/votre-repo/IPB.git
cd IPB
npm install
npm run build

# Créer .env.local avec vos variables
cp .env.example .env.local
nano .env.local  # Éditer avec vos valeurs

# Démarrer en production
npm start
```

### Avec PM2 (Recommandé)
```bash
npm install -g pm2
pm2 start npm --name "ipb" -- start
pm2 save
pm2 startup  # Pour démarrer au boot
```

---

## Checklist pré-déploiement

- [ ] `npm run build` passe sans erreur
- [ ] Toutes les images placeholder remplacées
- [ ] Variables d'environnement configurées
- [ ] Emails testés en local
- [ ] Formulaire de contact testé
- [ ] Diagnostic testé de bout en bout
- [ ] Mobile testé (vraie connexion)
- [ ] Google Analytics configuré (si utilisé)
- [ ] Sitemap.xml généré
- [ ] Robots.txt configuré

---

## Post-déploiement

1. **Tester toutes les pages** sur le domaine de production
2. **Soumettre le sitemap** à Google Search Console
3. **Vérifier les emails** arrivent bien
4. **Monitorer les erreurs** (Sentry ou Vercel Analytics)
5. **Tester le formulaire** de contact en production

---

## Support

En cas de problème :
1. Vérifiez les logs Vercel (ou serveur)
2. Vérifiez les variables d'environnement
3. Testez en local avec `npm run build && npm start`

