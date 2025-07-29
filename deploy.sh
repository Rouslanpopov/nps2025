#!/bin/bash

echo "🚀 Script de déploiement NPS2025"
echo "================================"

# Vérifier si on est dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur : Exécutez ce script depuis la racine du projet"
    exit 1
fi

# Demander le type de déploiement
echo ""
echo "Choisissez le type de déploiement :"
echo "1) Domaine personnalisé (nps2025.inthememory.com)"
echo "2) GitHub Pages classique (rouslanpopov.github.io/nps2025)"
read -p "Votre choix (1 ou 2) : " choice

case $choice in
    1)
        echo ""
        echo "🌐 Déploiement pour domaine personnalisé..."
        echo "⚠️  Assurez-vous que :"
        echo "   - Le DNS CNAME est configuré"
        echo "   - Le domaine est activé dans GitHub Pages"
        echo ""
        npm run build:custom-domain
        echo "✅ Build terminé pour domaine personnalisé"
        ;;
    2)
        echo ""
        echo "📁 Déploiement pour GitHub Pages classique..."
        npm run build:github
        echo "✅ Build terminé pour GitHub Pages"
        ;;
    *)
        echo "❌ Choix invalide. Utilisation du build par défaut."
        npm run build
        ;;
esac

echo ""
echo "🎉 Déploiement terminé !"
echo "📝 N'oubliez pas de pusher les changements vers GitHub"
echo ""
echo "Commandes utiles :"
echo "git add ."
echo "git commit -m \"Deploy with custom domain configuration\""
echo "git push origin main" 