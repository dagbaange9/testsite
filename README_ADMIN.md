# Système d'Administration LuxeDrive

## Fonctionnalités Implémentées

### 1. **Page d'Administration** (`admin.html`)
- Interface d'authentification avec identifiant et mot de passe
- Tableau de bord avec gestion complète des produits

### 2. **Gestion des Produits**
L'admin peut :
- ✅ **Ajouter** de nouveaux produits avec tous les détails
- ✅ **Modifier** les informations d'un produit existant
- ✅ **Supprimer** un produit de la base de données
- ✅ **Rechercher** des produits par nom ou type

### 3. **Stockage des Données**
- Les produits sont sauvegardés dans le **localStorage** du navigateur
- Les données persistent entre les sessions
- Les produits par défaut sont chargés au premier accès

## Identifiants d'Accès

**Identifiant :** `admin`  
**Mot de passe :** `admin123`

## Comment Utiliser

### Accéder au Panel Admin
1. Cliquez sur le bouton **"Admin"** dans la barre de navigation du site principal
2. Connectez-vous avec les identifiants fournis ci-dessus

### Ajouter un Produit
1. Allez dans l'onglet "Ajouter un Produit"
2. Remplissez tous les champs obligatoires (*)
3. Cliquez sur "Ajouter le Produit"
4. Le produit apparaîtra immédiatement sur le site

### Modifier un Produit
1. Dans l'onglet "Gestion des Produits"
2. Cliquez sur le bouton **"Modifier"** d'un produit
3. Modifiez les informations dans la fenêtre modale
4. Cliquez sur "Sauvegarder"

### Supprimer un Produit
1. Dans l'onglet "Gestion des Produits"
2. Cliquez sur le bouton **"Supprimer"** d'un produit
3. Confirmez la suppression dans la fenêtre de dialogue

### Rechercher un Produit
1. Utilisez la barre de recherche en haut de l'onglet "Gestion des Produits"
2. Tapez le nom ou le type du produit

## Fichiers Créés/Modifiés

### Fichiers Créés :
- **admin.html** - Page d'administration
- **admin.js** - Logique d'administration
- **styleAdmin.css** - Styles du panel admin

### Fichiers Modifiés :
- **index.html** - Ajout du lien Admin, suppression des produits hardcodés
- **script.js** - Chargement des produits depuis localStorage
- **style.css** - Style du bouton Admin

## Architecture

### Données Produit
Chaque produit contient :
```javascript
{
  id: unique_id,
  name: "Nom du produit",
  type: "Vente" ou "Location",
  price: 12345,
  engine: "V8 Biturbo",
  power: "720 ch",
  image: "url_image",
  description: "Description du produit"
}
```

### Sécurité
- Authentification simple (à améliorer pour la production)
- Les données sont stockées localement dans le navigateur
- Pour une véritable sécurité, connecter à une base de données backend

## Améliorations Futures Possibles
- Intégration d'une vraie base de données
- Authentification sécurisée avec tokens
- Pagination des produits
- Export/Import de produits
- Gestion des images (upload)
- Statistiques de vente/location
