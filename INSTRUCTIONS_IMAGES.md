# 📸 Instructions pour Ajouter les Images

## ✅ Ce que j'ai préparé pour vous

J'ai déjà configuré le code pour utiliser vos images. Il ne reste plus qu'à les placer au bon endroit.

---

## 🎯 Étape Simple : Glisser-Déposer

### 1. Ouvrez le Finder (Mac)

1. Appuyez sur `Cmd + Shift + G` (ou allez dans "Aller" → "Aller au dossier...")
2. Collez ce chemin exact :
   ```
   /Users/gradayusra/Downloads/IPB/public/images
   ```
3. Appuyez sur "Entrée"

### 2. Glissez vos images

Glissez-déposez vos deux images dans ce dossier.

### 3. Renommez-les (important !)

Renommez vos images exactement comme suit :

- **Image fissures** → `fissures-avant-apres.webp` (ou `.jpg`)
- **Image humidité** → `humidite-avant-apres.webp` (ou `.jpg`)

**Astuce** : Si vos images sont en `.jpg`, c'est parfait aussi ! Le code accepte les deux formats.

---

## 🔍 Comment vérifier que ça marche

1. **Redémarrez le serveur** (si nécessaire) :
   - Dans le terminal, appuyez sur `Ctrl + C` pour arrêter
   - Puis tapez : `npm run dev`
   - Attendez que vous voyiez "Ready"

2. **Ouvrez** : http://localhost:3000

3. **Vérifiez** :
   - Section "Fissures" → Image à droite ✅
   - Section "Humidité" → Image à gauche ✅
   - Section "Réalisations" → Les deux images ✅

---

## 🆘 Si vous ne voyez pas les images

### Vérification 1 : Les noms sont-ils corrects ?
```
✅ fissures-avant-apres.webp
✅ humidite-avant-apres.webp

❌ Fissures-Avant-Apres.webp (majuscules)
❌ fissures_avant_apres.webp (underscores)
❌ image1.jpg (mauvais nom)
```

### Vérification 2 : Où sont les images ?
Ouvrez le terminal et tapez :
```bash
ls -la /Users/gradayusra/Downloads/IPB/public/images/
```

Vous devriez voir :
```
fissures-avant-apres.webp
humidite-avant-apres.webp
```

### Vérification 3 : Le serveur est-il démarré ?
Dans le terminal, vous devriez voir :
```
✓ Ready in 2.3s
```

Si non, tapez : `npm run dev`

---

## 💡 Astuce : Convertir en WebP (optionnel)

Pour de meilleures performances, convertissez vos images en WebP :

1. Allez sur : **https://squoosh.app/**
2. Uploadez votre image
3. Sélectionnez **"WebP"** dans le menu
4. Qualité : **80-90%**
5. Téléchargez
6. Renommez et placez dans `/public/images/`

---

## ✅ C'est tout !

Une fois les images placées avec les bons noms, elles apparaîtront automatiquement sur le site. Pas besoin de redémarrer quoi que ce soit (sauf si le serveur n'est pas lancé).

**Besoin d'aide ?** Dites-moi où sont vos images et je vous guide étape par étape ! 🚀
