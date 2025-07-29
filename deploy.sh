#!/bin/bash

echo "🚀 Script de déploiement NPS2025"
echo "================================"

# Vérifier si on est dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur : Exécutez ce script depuis la racine du projet"
    exit 1
fi

echo ""
echo "🔍 Détection automatique de la configuration..."

# Vérifier si le fichier CNAME existe
if [ -f "public/CNAME" ]; then
    DOMAIN=$(cat public/CNAME)
    echo "✅ Domaine personnalisé détecté : $DOMAIN"
else
    echo "📁 Configuration GitHub Pages classique détectée"
fi

echo ""
echo "🛠️  Lancement du build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build terminé avec succès !"
    echo ""
    echo "🚀 Prochaines étapes :"
    echo "git add ."
    echo "git commit -m \"Deploy application\""
    echo "git push origin main"
    echo ""
    if [ -f "public/CNAME" ]; then
        echo "🌐 Votre site sera disponible sur : https://$DOMAIN"
    else  
        echo "🌐 Votre site sera disponible sur : https://rouslanpopov.github.io/nps2025"
    fi
else
    echo ""
    echo "❌ Erreur lors du build"
    exit 1
fi 