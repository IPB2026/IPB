#!/bin/bash
# Double-cliquez ce fichier dans le Finder pour pousser les commits sur GitHub.
# Si une fenêtre Terminal s'ouvre, c'est normal — laissez faire.

cd "$(dirname "$0")"
echo "═══════════════════════════════════════════════"
echo "  PUSH DES COMMITS IPB → GitHub"
echo "═══════════════════════════════════════════════"
echo ""
echo "Commits à pousser :"
git log origin/main..HEAD --oneline
echo ""
echo "Lancement du push..."
echo ""
git push origin main
PUSH_RESULT=$?
echo ""
if [ $PUSH_RESULT -eq 0 ]; then
  echo "✓ Push réussi ! Tes commits sont maintenant sur GitHub."
  echo "  → https://github.com/IPB2026/IPB/commits/main"
else
  echo "✗ Le push a échoué (code $PUSH_RESULT)."
  echo "  Cause probable : authentification GitHub manquante."
  echo "  Solution : configurer un Personal Access Token ou SSH."
fi
echo ""
echo "Cette fenêtre se fermera dans 30 secondes (ou appuie sur ⌘W)."
sleep 30
