# GestionStock – Application de gestion de stock

Application web permettant de gérer des produits, catégories et utilisateurs dans un stock, avec suivi de l’inventaire et gestion des profils utilisateurs.

## Prérequis

- Node.js 18+  
- NPM ou Yarn  
- SGBD compatible avec SQL (MySQL, PostgreSQL, SQLite…)

## Installation et exécution

### Installation
1. Clonez le dépôt :  
> ```
> git clone https://github.com/AymeneLazreg/GestionStock.git
> cd GestionStock
> ```

2. Installez les dépendances du serveur :  
> ```
> cd serveur
> npm install
> ```

arduino
Copier le code
3. Installez les dépendances du front-end :  
cd ../GestStock
npm install

markdown
Copier le code

### Configuration de la base de données
- Importez le fichier `bdd.sql` dans votre SGBD préféré.  
- Modifiez le fichier de configuration (ex : `config.js` ou `.env`) avec vos identifiants de connexion à la base de données.

### Lancement de l’application
1. Démarrez le serveur :  
cd serveur
npm start

kotlin
Copier le code
2. Lancez l’interface front-end :  
cd ../GestStock
npm run dev

markdown
Copier le code
3. Ouvrez l’application dans votre navigateur à l’adresse indiquée (ex : `http://localhost:3000`).

## Utilisation

### Gestion des utilisateurs
- Inscription et connexion  
- Modification du profil  
- Changement de mot de passe  

### Gestion des produits
- Ajout, modification et suppression des produits  
- Association d’un produit à une catégorie  
- Consultation de la liste des produits et des stocks  

### Gestion des catégories
- Ajout et suppression de catégories  
- Consultation des catégories existantes  

### Suivi du stock
- Affichage des produits disponibles  
- Recherche et filtrage par catégorie ou nom  
- Historique des ajouts et modifications (si implémenté)

## Structure du projet

GestionStock/
├─ GestStock/ ← Front-end
├─ serveur/ ← Back-end / serveur
├─ .gitignore
├─ README.md ← Ce fichier
├─ bdd.sql ← Script base de données

markdown
Copier le code

## Technologies

- JavaScript / TypeScript  
- HTML & CSS  
- Node.js (Express pour le serveur)  
- Base de données SQL (MySQL/PostgreSQL/SQLite)  
- Framework front-end (ex : React / Vanilla JS selon implémentation)

## Auteur

- Aymene LAZREG  
- Projet académique – Gestion de stock  
- Université de Montpellier – Faculté des Sciences