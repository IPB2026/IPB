# 🖥️ Guide de Visualisation - IPB

## ✅ Le serveur fonctionne !

Le serveur Next.js démarre correctement sur **http://localhost:3000**

---

## 🌐 Comment visualiser le site

### Étape 1 : Démarrer le serveur
```bash
cd /Users/gradayusra/Downloads/IPB
npm run dev
```

Vous devriez voir :
```
▲ Next.js 14.2.35
- Local:        http://localhost:3000

✓ Ready in Xms
```

### Étape 2 : Ouvrir dans le navigateur
1. Ouvrez votre navigateur (Chrome, Firefox, Safari, Edge)
2. Allez à l'adresse : **http://localhost:3000**
3. Le site devrait s'afficher

---

## 🔍 Si la page est blanche ou ne s'affiche pas

### Vérification 1 : Console du navigateur
1. Appuyez sur **F12** (ou Cmd+Option+I sur Mac)
2. Allez dans l'onglet **Console**
3. Regardez s'il y a des erreurs en rouge
4. Copiez les erreurs et partagez-les

### Vérification 2 : Onglet Network
1. Dans les DevTools (F12), allez dans l'onglet **Network**
2. Rechargez la page (F5)
3. Vérifiez si des fichiers CSS/JS ne se chargent pas (en rouge)

### Vérification 3 : Vérifier le port
```bash
# Vérifier si le port 3000 est utilisé
lsof -ti:3000

# Si un autre processus utilise le port, tuez-le :
kill -9 $(lsof -ti:3000)
```

---

## 🛠️ Solutions courantes

### Problème : Page blanche
**Solution** : Videz le cache du navigateur
- Chrome/Edge : Ctrl+Shift+Delete (Cmd+Shift+Delete sur Mac)
- Firefox : Ctrl+Shift+Delete
- Safari : Cmd+Option+E

### Problème : Erreur "Cannot GET /"
**Solution** : Le serveur n'est pas démarré
```bash
npm run dev
```

### Problème : Erreur de compilation
**Solution** : Nettoyez et réinstallez
```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Problème : Styles CSS ne s'appliquent pas
**Solution** : Vérifiez que Tailwind est bien configuré
```bash
npm run build
```

---

## 📱 Tester sur mobile

1. Trouvez l'adresse IP de votre Mac :
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

2. Sur votre téléphone (même WiFi), ouvrez :
```
http://[VOTRE_IP]:3000
```

---

## 🆘 Besoin d'aide ?

Si le problème persiste, partagez :
1. Le message d'erreur exact (console navigateur)
2. La capture d'écran de la page
3. Le résultat de `npm run dev` dans le terminal

