#!/bin/bash

# Script pour ajouter les images au site IPB

echo "📸 Script d'ajout d'images pour IPB"
echo ""

# Vérifier que le dossier existe
if [ ! -d "public/images" ]; then
  mkdir -p public/images
  echo "✅ Dossier public/images créé"
fi

echo ""
echo "📋 Instructions :"
echo ""
echo "1. Téléchargez vos deux images depuis votre appareil"
echo "2. Renommez-les :"
echo "   - fissures-avant-apres.webp (ou .jpg)"
echo "   - humidite-avant-apres.webp (ou .jpg)"
echo ""
echo "3. Glissez-déposez les fichiers dans ce dossier :"
echo "   $(pwd)/public/images/"
echo ""
echo "4. Ou utilisez cette commande dans le terminal :"
echo "   cp /chemin/vers/votre/image1.webp public/images/fissures-avant-apres.webp"
echo "   cp /chemin/vers/votre/image2.webp public/images/humidite-avant-apres.webp"
echo ""
echo "✅ Une fois les images placées, elles apparaîtront automatiquement sur le site !"
echo ""

