#!/bin/bash

# FramerClone - Script de déploiement automatique
# Usage: ./deploy.sh [vercel|netlify|github]

echo "🚀 FramerClone - Déploiement automatique"
echo "========================================"

# Vérifier les prérequis
check_prerequisites() {
    echo "📋 Vérification des prérequis..."

    if [ ! -f "index.html" ]; then
        echo "❌ Erreur: index.html introuvable"
        exit 1
    fi

    if [ ! -f "style.css" ]; then
        echo "❌ Erreur: style.css introuvable"
        exit 1
    fi

    if [ ! -f "app.js" ]; then
        echo "❌ Erreur: app.js introuvable"
        exit 1
    fi

    echo "✅ Tous les fichiers requis sont présents"
}

# Déploiement Vercel
deploy_vercel() {
    echo "🌐 Déploiement sur Vercel..."

    if ! command -v vercel &> /dev/null; then
        echo "📦 Installation de Vercel CLI..."
        npm install -g vercel
    fi

    echo "🚀 Lancement du déploiement..."
    vercel --prod

    echo "✅ Déploiement Vercel terminé !"
    echo "🔗 Votre site sera disponible à l'URL fournie ci-dessus"
}

# Déploiement Netlify
deploy_netlify() {
    echo "🌐 Déploiement sur Netlify..."

    if ! command -v netlify &> /dev/null; then
        echo "📦 Installation de Netlify CLI..."
        npm install -g netlify-cli
    fi

    echo "🚀 Lancement du déploiement..."
    netlify deploy --prod --dir=.

    echo "✅ Déploiement Netlify terminé !"
}

# Configuration GitHub Pages
setup_github() {
    echo "🐙 Configuration pour GitHub Pages..."

    if [ ! -d ".git" ]; then
        echo "📦 Initialisation du repository Git..."
        git init
        echo "node_modules/" > .gitignore
        echo "*.log" >> .gitignore
        echo ".env" >> .gitignore
    fi

    echo "📝 Ajout des fichiers..."
    git add .
    git commit -m "🚀 Déploiement initial FramerClone"

    echo "📋 Instructions GitHub Pages:"
    echo "1. Créer un repository sur GitHub"
    echo "2. Exécuter: git remote add origin https://github.com/USERNAME/REPOSITORY.git"
    echo "3. Exécuter: git push -u origin main"
    echo "4. Aller dans Settings > Pages > Deploy from branch: main"
    echo "5. Votre site sera disponible à: https://USERNAME.github.io/REPOSITORY"
}

# Tests automatiques
run_tests() {
    echo "🧪 Vérification des fonctionnalités..."

    # Vérifier la syntaxe HTML
    echo "📄 Test HTML..."
    if command -v tidy &> /dev/null; then
        tidy -q -e index.html && echo "✅ HTML valide" || echo "⚠️ Avertissements HTML"
    fi

    # Vérifier la syntaxe CSS
    echo "🎨 Test CSS..."
    if command -v csslint &> /dev/null; then
        csslint style.css && echo "✅ CSS valide" || echo "⚠️ Avertissements CSS"
    fi

    # Vérifier la syntaxe JavaScript
    echo "⚡ Test JavaScript..."
    if command -v jshint &> /dev/null; then
        jshint app.js && echo "✅ JavaScript valide" || echo "⚠️ Avertissements JS"
    fi

    echo "✅ Tests terminés"
}

# Optimisation des fichiers
optimize_files() {
    echo "🔧 Optimisation des fichiers..."

    # Minification CSS (si csso est installé)
    if command -v csso &> /dev/null; then
        echo "📦 Minification CSS..."
        csso style.css --output style.min.css
        echo "✅ style.min.css créé"
    fi

    # Minification JS (si uglifyjs est installé)
    if command -v uglifyjs &> /dev/null; then
        echo "📦 Minification JavaScript..."
        uglifyjs app.js --compress --mangle --output app.min.js
        echo "✅ app.min.js créé"
    fi

    echo "✅ Optimisation terminée"
}

# Menu principal
main_menu() {
    echo ""
    echo "Choisissez une option de déploiement:"
    echo "1) Vercel (recommandé)"
    echo "2) Netlify"
    echo "3) GitHub Pages"
    echo "4) Tests seulement"
    echo "5) Optimisation seulement"
    echo "0) Quitter"
    echo ""
    read -p "Votre choix (1-5): " choice

    case $choice in
        1)
            check_prerequisites
            run_tests
            deploy_vercel
            ;;
        2)
            check_prerequisites
            run_tests
            deploy_netlify
            ;;
        3)
            check_prerequisites
            setup_github
            ;;
        4)
            check_prerequisites
            run_tests
            ;;
        5)
            check_prerequisites
            optimize_files
            ;;
        0)
            echo "👋 Au revoir !"
            exit 0
            ;;
        *)
            echo "❌ Option invalide"
            main_menu
            ;;
    esac
}

# Point d'entrée
if [ $# -eq 0 ]; then
    main_menu
else
    case $1 in
        vercel)
            check_prerequisites
            run_tests
            deploy_vercel
            ;;
        netlify)
            check_prerequisites
            run_tests
            deploy_netlify
            ;;
        github)
            check_prerequisites
            setup_github
            ;;
        test)
            check_prerequisites
            run_tests
            ;;
        optimize)
            check_prerequisites
            optimize_files
            ;;
        *)
            echo "Usage: $0 [vercel|netlify|github|test|optimize]"
            echo "Ou exécutez sans paramètres pour le menu interactif"
            exit 1
            ;;
    esac
fi

echo ""
echo "🎉 Processus terminé !"
echo "📊 Statistiques du projet:"
echo "   - Fichiers HTML: $(find . -name "*.html" | wc -l)"
echo "   - Fichiers CSS: $(find . -name "*.css" | wc -l)"
echo "   - Fichiers JS: $(find . -name "*.js" | wc -l)"
echo "   - Taille totale: $(du -sh . | cut -f1)"
echo ""
echo "🚀 Votre FramerClone est prêt à conquérir le monde !"
