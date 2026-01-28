# 📸 Guide Ultra-Simple : Ajouter les Images

## 🎯 Ce que vous devez faire

### Option 1 : Glisser-Déposer (Le plus simple)

1. **Ouvrez le Finder** (Mac) ou l'Explorateur (Windows)
2. **Allez dans** : `/Users/gradayusra/Downloads/IPB/public/images/`
3. **Glissez-déposez** vos deux images dans ce dossier
4. **Renommez-les** :
   - `fissures-avant-apres.webp` (ou `.jpg`)
   - `humidite-avant-apres.webp` (ou `.jpg`)

C'est tout ! 🎉

---

### Option 2 : Via le Terminal

Si vos images sont sur votre Bureau ou dans Téléchargements :

```bash
# Aller dans le dossier du projet
cd /Users/gradayusra/Downloads/IPB

# Copier l'image 1 (remplacez /chemin/vers/image1 par le vrai chemin)
cp /chemin/vers/image1.webp public/images/fissures-avant-apres.webp

# Copier l'image 2
cp /chemin/vers/image2.webp public/images/humidite-avant-apres.webp
```

**Exemple** si vos images sont sur le Bureau :
```bash
cp ~/Desktop/image-fissures.jpg public/images/fissures-avant-apres.jpg
cp ~/Desktop/image-humidite.jpg public/images/humidite-avant-apres.jpg
```

---

## 📍 Où trouver vos images

Vos images sont probablement :
- Sur votre **téléphone** → Transférez-les sur votre ordinateur
- Dans **Téléchargements** → Cherchez les fichiers récents
- Dans **Photos** (Mac) → Exportez-les
- Sur votre **Bureau** → Facile à trouver

---

## ✅ Vérification

Une fois les images ajoutées :

1. **Redémarrez le serveur** (si nécessaire) :
   ```bash
   npm run dev
   ```

2. **Ouvrez** : http://localhost:3000

3. **Vérifiez** :
   - Section "Fissures" → Image à droite ✅
   - Section "Humidité" → Image à gauche ✅
   - Section "Réalisations" → Les deux images ✅

---

## 🆘 Si les images ne s'affichent pas

1. **Vérifiez les noms** : Doivent être exactement :
   - `fissures-avant-apres.webp` (ou `.jpg`)
   - `humidite-avant-apres.webp` (ou `.jpg`)

2. **Vérifiez l'emplacement** : Doivent être dans `/public/images/`

3. **Vérifiez la console** : Ouvrez les outils développeur (F12) et regardez les erreurs

4. **Format** : WebP ou JPG fonctionnent tous les deux

---

## 💡 Astuce : Convertir en WebP

Pour de meilleures performances, convertissez vos images en WebP :

1. Allez sur : https://squoosh.app/
2. Uploadez votre image
3. Sélectionnez "WebP"
4. Qualité : 80-90%
5. Téléchargez
6. Renommez et placez dans `/public/images/`

---

**C'est tout ! Une fois les images placées, elles apparaîtront automatiquement !** 🎉

