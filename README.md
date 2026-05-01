# 🍽️ Projet Recette - Partie Formation

Application web de gestion de recettes avec authentification et système de favoris.

**Développé dans le cadre du TP DWWM (Développeur Web et Web Mobile)**

---

## 📋 Table des matières
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Architecture](#architecture)
- [Compétences couvertes](#compétences-couvertes)

---

## ✨ Features

### Frontend
- 🎨 Interface moderne et responsive (React + Bootstrap + SCSS)
- 🔐 Authentification par JWT
- 🍽️ Affichage des recettes en grille de cartes
- 🔍 Recherche et filtres par catégorie
- ⭐ Gestion des favoris (utilisateur connecté)
- 📱 Modal détaillée pour chaque recette
- 👨‍💼 Panel admin pour gérer utilisateurs et recettes

### Backend
- 🔐 Authentification JWT
- 📊 Base de données MySQL avec Sequelize ORM
- 📸 Upload d'images avec Multer
- ✅ Validation des données
- 🛡️ Middlewares d'authentification et autorisation
- 📦 API RESTful complète

### Base de données
- 👤 Utilisateurs (avec gestion des rôles : admin/membre)
- 🍲 Recettes (nom, description, ingrédients, étapes, catégorie, temps, portions, photo, auteur)
- ⭐ Favoris (liaison Utilisateur ↔ Recette)

---

## 🛠️ Tech Stack

### Backend
- **Node.js** avec **Express.js**
- **MySQL** avec **Sequelize ORM**
- **JWT** pour l'authentification
- **Multer** pour les uploads d'images
- **bcryptjs** pour le hashage des mots de passe
- **CORS** pour les requêtes cross-origin

### Frontend
- **React 19** avec React Router
- **Bootstrap 5** pour le styling
- **SCSS** pour les styles personnalisés
- **Axios** pour les requêtes HTTP
- **Context API** pour la gestion d'état

### DevOps
- **Git** + **GitHub**
- **npm** pour la gestion des dépendances
- Workflow : Issues → Branches → Pull Requests → Merge

---

## 📦 Installation

### Prérequis
- Node.js (v18 ou supérieur)
- npm ou yarn
- MySQL (via XAMPP)
- Git

### Étapes

#### 1. Cloner le repository
```bash
git clone https://github.com/[tonCompte]/Projet_home_formation.git
cd Projet_home_formation
```

#### 2. Configuration Backend

```bash
cd backend
npm install
```

Créer un fichier `.env` à partir de `.env.example` :
```bash
cp .env.example .env
```

Configurer les variables d'environnement avec tes identifiants MySQL (voir [Configuration](#configuration))

#### 3. Configuration Frontend

```bash
cd ../frontend
npm install
```

Le proxy est déjà configuré dans `package.json` pour pointer vers `http://localhost:3001`

#### 4. Créer la base de données MySQL

Avec phpMyAdmin ou en ligne de commande :
```sql
CREATE DATABASE projet_recette;
```

Sequelize créera automatiquement les tables au premier démarrage (mode `alter: true`)

---

## ⚙️ Configuration

### Variables d'environnement Backend (.env)

Créer un fichier `.env` dans le dossier `backend/` :

```env
# Port du serveur
PORT=3001

# Base de données
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=projet_recette

# JWT Secret
JWT_SECRET=votre_clé_secrète_très_longue_et_complexe_ici_min_32_caractères

# Environment
NODE_ENV=development
```

**⚠️ Important :** Ne jamais committer le fichier `.env` (ignoré par `.gitignore`)

---

## 🚀 Utilisation

### Démarrer le serveur backend

```bash
cd backend
npm run dev
```

Le serveur démarre sur `http://localhost:3001`

### Démarrer l'application frontend

Dans un autre terminal :

```bash
cd frontend
npm start
```

L'app ouvre sur `http://localhost:3000`

### Tester l'API

Endpoint de santé :
```bash
curl http://localhost:3001/api/health
```

---

## 🏗️ Architecture

### Structure Backend

backend/
├── models/              # Modèles Sequelize
├── controllers/         # Logique métier
├── routes/              # Définition des routes API
├── middlewares/         # Auth, upload, validation
├── uploads/             # Images uploadées
├── .env                 # Variables d'environnement
├── index.js             # Point d'entrée
└── package.json

### Structure Frontend

frontend/
├── public/              # Assets statiques
├── src/
│   ├── pages/           # Pages
│   ├── components/      # Composants réutilisables
│   ├── context/         # AuthContext
│   ├── api/             # Appels API
│   ├── styles/          # SCSS
│   ├── App.js
│   └── index.js
└── package.json

---

## 🎓 Compétences couvertes (TP DWWM)

### Activité 1 : Front-end
- ✅ Maquetter des interfaces utilisateur web
- ✅ Réaliser des interfaces utilisateur statiques web
- ✅ Développer la partie dynamique des interfaces utilisateur web

### Activité 2 : Back-end
- ✅ Mettre en place une base de données relationnelle
- ✅ Développer des composants d'accès aux données (SQL)
- ✅ Développer des composants métier côté serveur

### Optionnelles
- ✅ Gestion des uploads d'images
- ✅ Système d'authentification avancé
- ✅ Gestion des utilisateurs et rôles

---

## 📚 Ressources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Sequelize Documentation](https://sequelize.org/)
- [Bootstrap Documentation](https://getbootstrap.com/)
- [JWT Introduction](https://jwt.io/)

---

## 👨‍💻 Auteur

Développé dans le cadre de la formation **TP DWWM** au **CEF (Centre Européen de Formation)**

---

## 📄 Licence

ISC