# 🌐 Ouvrir le site dans le navigateur de Cursor

## Méthode 1 : Via la commande Cursor

1. **Ouvrez la palette de commandes** :
   - Sur Mac : `Cmd + Shift + P`
   - Sur Windows/Linux : `Ctrl + Shift + P`

2. **Tapez** : `Simple Browser: Show`

3. **Entrez l'URL** : `http://localhost:3000`

4. Le navigateur intégré de Cursor s'ouvrira avec votre site !

---

## Méthode 2 : Via le raccourci clavier

1. **Appuyez sur** : `Cmd + Shift + P` (Mac) ou `Ctrl + Shift + P` (Windows/Linux)

2. **Tapez** : `Simple Browser`

3. **Sélectionnez** : "Simple Browser: Show"

4. **Collez** : `http://localhost:3000`

---

## Méthode 3 : Clic droit sur le port

Si Cursor détecte automatiquement le serveur Next.js :

1. Regardez dans la barre d'état en bas de Cursor
2. Vous devriez voir une notification "Port 3000"
3. Cliquez dessus pour ouvrir dans le navigateur

---

## Méthode 4 : Via le terminal intégré

Dans le terminal intégré de Cursor, tapez :

```bash
open http://localhost:3000
```

(Sur Mac, cela ouvrira dans votre navigateur par défaut)

---

## ✅ Vérification

Assurez-vous que le serveur tourne :

```bash
npm run dev
```

Vous devriez voir :
```
✓ Ready in Xs
- Local:        http://localhost:3000
```

---

**Le site devrait maintenant s'ouvrir dans le navigateur de Cursor !** 🎉

