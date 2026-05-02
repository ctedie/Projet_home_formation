# 🍽️ Application de Gestion de Recettes

**Projet TP DWWM (CEF) - Formation Développeur Web et Web Mobile**

Étudiant : **Cédric TEDIE**  
Date : **02/05/2026**

---

## 📋 Table des matières

- [Présentation](#présentation)
- [Stack technologique](#stack-technologique)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Architecture](#architecture)
- [Endpoints API](#endpoints-api)
- [Fonctionnalités](#fonctionnalités)
- [Base de données](#base-de-données)
- [Notes importantes](#notes-importantes)

---

## 🎯 Présentation

Application web fullstack de gestion de recettes avec :
- ✅ Authentification avec JWT
- ✅ Système de favoris
- ✅ CRUD complet des recettes (admin)
- ✅ Gestion des utilisateurs (admin)
- ✅ Upload d'images
- ✅ Interface responsive

### Utilisateurs de test

```
Nom : admin
Mot de passe : admin123
Rôle : Administrateur
```

---

## 🛠️ Stack technologique

| Catégorie | Technologies |
|-----------|--------------|
| **Frontend** | React 19, React Router v7, Bootstrap 5, SCSS, Axios |
| **Backend** | Node.js v20, Express 5, Sequelize 6, MySQL2 |
| **Authentification** | JWT, bcryptjs |
| **Upload** | Multer |
| **Outils** | Git, GitHub, PowerShell, XAMPP |

---

## 📦 Installation

### Prérequis

- **Node.js v20+** : https://nodejs.org/
- **MySQL** (via XAMPP) : https://www.apachefriends.org/
- **Git** : https://git-scm.com/

### Clone du repo

```bash
git clone https://github.com/[ton-compte]/Projet_home_formation.git
cd Projet_home_formation
```

### Installation Backend

```bash
cd backend
npm install
```

### Installation Frontend

```bash
cd frontend
npm install
```

---

## ⚙️ Configuration

### 1. Configuration MySQL

1. Ouvre **XAMPP Control Panel**
2. Clique sur **Start** pour Apache et MySQL
3. Ouvre **phpMyAdmin** : http://localhost/phpmyadmin
4. Crée une base de données : `projet_recette`

```sql
CREATE DATABASE IF NOT EXISTS projet_recette;
USE projet_recette;
```

### 2. Configuration Backend

Crée le fichier `backend/.env` :

```env
# Base de données
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=projet_recette

# JWT
JWT_SECRET=ton_secret_jwt_tres_long_et_secure_2026

# Port
PORT=3001

# Environnement
NODE_ENV=development
```

**IMPORTANT :** 
- `DB_HOST` doit être `127.0.0.1` (pas `localhost`)
- Le fichier `.env` doit être dans le dossier `backend/`, pas à la racine

### 3. Création de l'utilisateur admin

Va dans phpMyAdmin et exécute ce script SQL :

```sql
USE projet_recette;

-- Insérer l'admin (mot de passe: admin123)
INSERT INTO utilisateurs (nom, motDePasse, role, createdAt, updatedAt) 
VALUES ('admin', '$2a$10$[hash_bcrypt_du_mot_de_passe]', 'admin', NOW(), NOW());
```

Pour générer le hash du mot de passe, dans PowerShell :

```powershell
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('admin123', 10, (err, hash) => console.log(hash));"
```

Copie le hash et remplace `[hash_bcrypt_du_mot_de_passe]` par le hash généré.

### 4. Insertion des recettes

Pour insérer 20 recettes de test, exécute le script SQL fourni :

- Fichier : `backend/seed.sql`
- Ouvre ce fichier dans phpMyAdmin SQL et exécute-le

---

## 🚀 Utilisation

### Démarrage du Backend

```bash
cd backend
npm run dev
```

Résultat attendu :
```
✅ Connexion MySQL OK
✅ Serveur démarré sur http://localhost:3001
```

### Démarrage du Frontend

Dans un **nouveau terminal PowerShell** :

```bash
cd frontend
npm start
```

L'application s'ouvre automatiquement sur http://localhost:3000

### Arrêt

- Backend : `Ctrl + C` dans le terminal
- Frontend : `Ctrl + C` dans le terminal

---

## 🏗️ Architecture

### Flux de données

```
Frontend (React)
    ↓
   API (Axios)
    ↓
Backend (Express)
    ↓ Router
   Controller
    ↓ Service
   Model (Sequelize)
    ↓
MySQL Database
```

### Structure des dossiers

#### Backend

```
backend/
├── .env                    ← Variables d'environnement
├── index.js               ← Serveur Express principal
├── package.json
├── models/                ← Modèles Sequelize
│   ├── index.js
│   ├── Utilisateur.js
│   ├── Recette.js
│   └── Favori.js
├── services/              ← Logique métier
│   ├── recettesService.js
│   └── favorisService.js
├── controllers/           ← Orchestration des requêtes
│   ├── authController.js
│   ├── recettesController.js
│   └── favorisController.js
├── routes/                ← Définition des routes
│   ├── auth.js
│   ├── recettes.js
│   └── favoris.js
├── middlewares/           ← Middlewares personnalisés
│   ├── auth.js           ← JWT, isAuthenticated, isAdmin
│   └── upload.js         ← Multer configuration
├── utils/
│   └── fileUtils.js      ← Utilitaires fichiers
└── uploads/              ← Images stockées ici
```

#### Frontend

```
frontend/src/
├── pages/                 ← Pages de l'application
│   ├── Accueil.js        ← Page d'accueil avec cartes
│   ├── Recettes.js       ← Affichage des recettes
│   ├── Favoris.js        ← Recettes favorites
│   ├── Login.js          ← Formulaire de connexion
│   └── Admin.js          ← Panel d'administration
├── components/            ← Composants réutilisables
│   ├── RecetteCard.js    ← Carte recette
│   └── RecetteModal.js   ← Modale détails
├── services/              ← Appels API
│   ├── recettesService.js
│   └── adminService.js
├── context/               ← Context API
│   └── AuthContext.js    ← Gestion de l'authentification
├── api/
│   └── index.js          ← Configuration Axios
├── styles/                ← Styles SCSS
│   ├── _variables.scss
│   ├── _global.scss
│   ├── _cards.scss
│   └── App.scss
├── App.js                ← Composant principal
└── index.js              ← Point d'entrée
```

---

## 📡 Endpoints API

### Authentification

| Méthode | Route | Authentification | Description |
|---------|-------|------------------|-------------|
| POST | `/api/auth/login` | Public | Connexion utilisateur |
| GET | `/api/auth/me` | Authentifiée | Infos utilisateur connecté |
| GET | `/api/auth/utilisateurs` | Admin | Liste des utilisateurs |
| PUT | `/api/auth/utilisateurs/:id` | Admin | Modifier rôle utilisateur |
| DELETE | `/api/auth/utilisateurs/:id` | Admin | Supprimer utilisateur |

### Recettes

| Méthode | Route | Authentification | Description |
|---------|-------|------------------|-------------|
| GET | `/api/recettes` | Public | Lister toutes les recettes |
| GET | `/api/recettes/:id` | Public | Détail d'une recette |
| POST | `/api/recettes` | Admin | Créer une recette |
| PUT | `/api/recettes/:id` | Admin | Modifier une recette |
| DELETE | `/api/recettes/:id` | Admin | Supprimer une recette |
| DELETE | `/api/recettes/:id/photo` | Admin | Supprimer la photo |

### Favoris

| Méthode | Route | Authentification | Description |
|---------|-------|------------------|-------------|
| GET | `/api/favoris` | Authentifiée | Mes favoris |
| POST | `/api/favoris/:id` | Authentifiée | Ajouter aux favoris |
| DELETE | `/api/favoris/:id` | Authentifiée | Retirer des favoris |
| GET | `/api/favoris/:id` | Authentifiée | Vérifier si en favoris |

---

## ✨ Fonctionnalités

### 👤 Authentification

- ✅ Formulaire de login (nom + mot de passe)
- ✅ JWT pour sécuriser les requêtes
- ✅ Mot de passe hashé avec bcryptjs
- ✅ Stockage du token en localStorage
- ✅ Déconnexion avec suppression du token

### 🍽️ Gestion des recettes

- ✅ Afficher toutes les recettes
- ✅ Filtrer par catégorie (Entrée, Plat, Dessert, Boisson)
- ✅ Rechercher par nom en temps réel
- ✅ Voir détails complets en modale
- ✅ Créer/modifier/supprimer (admin uniquement)
- ✅ Upload et gestion des photos
- ✅ Formulaire avec validation

### ⭐ Système de favoris

- ✅ Ajouter une recette aux favoris
- ✅ Retirer une recette des favoris
- ✅ Page dédiée aux favoris
- ✅ Icône ⭐ pour identifier les favoris
- ✅ Recherche et filtres dans les favoris
- ✅ Requis d'être authentifié

### 👨‍💼 Panel Admin

**Onglet Recettes :**
- ✅ Liste des recettes
- ✅ Créer une recette
- ✅ Modifier une recette
- ✅ Supprimer une recette (avec confirmation)
- ✅ Upload d'images

**Onglet Utilisateurs :**
- ✅ Liste de tous les utilisateurs
- ✅ Modifier le rôle (admin/membre)
- ✅ Supprimer un utilisateur (avec confirmation)
- ✅ Impossible de se supprimer soi-même

### 📱 Interface utilisateur

- ✅ Design responsive (mobile, tablet, desktop)
- ✅ Bootstrap 5 pour les composants
- ✅ SCSS personnalisé
- ✅ NavBar avec menu burger
- ✅ Modales pour les détails
- ✅ Messages de succès/erreur
- ✅ Loading states
- ✅ Menu burger se ferme automatiquement

---

## 🗄️ Base de données

### Tables

#### utilisateurs
```sql
CREATE TABLE utilisateurs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(255) UNIQUE NOT NULL,
  motDePasse VARCHAR(255) NOT NULL,
  role ENUM('admin', 'membre') DEFAULT 'membre',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### recettes
```sql
CREATE TABLE recettes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(255) NOT NULL,
  description TEXT,
  ingredients TEXT,
  etapes TEXT,
  auteur VARCHAR(255),
  categorie ENUM('entree', 'plat', 'dessert', 'boisson'),
  temps VARCHAR(50),
  portions INT,
  photo VARCHAR(255),
  UtilisateurId INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (UtilisateurId) REFERENCES utilisateurs(id)
);
```

#### favoris
```sql
CREATE TABLE favoris (
  id INT PRIMARY KEY AUTO_INCREMENT,
  UtilisateurId INT NOT NULL,
  RecetteId INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (UtilisateurId) REFERENCES utilisateurs(id),
  FOREIGN KEY (RecetteId) REFERENCES recettes(id)
);
```

### Relations

```
Utilisateur (1) ──→ (N) Recette
Utilisateur (N) ←──→ (M) Recette (via Favori)
```

---

## 📝 Notes importantes

### Sécurité

- ✅ JWT pour l'authentification
- ✅ Mots de passe hashés avec bcryptjs
- ✅ Middleware `isAdmin` pour protéger les routes admin
- ✅ Token validé à chaque requête authentifiée
- ✅ CORS configuré

### Chemins importants

- **Configuration backend** : `backend/.env` (IMPORTANT : dans le dossier backend/)
- **Images uploadées** : `backend/uploads/`
- **Images accessibles** : `http://localhost:3001/uploads/[nom-image]`

### Variables d'environnement

Backend `.env` DOIT contenir :
```env
DB_HOST=127.0.0.1        # Pas localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=projet_recette
JWT_SECRET=ton_secret
PORT=3001
NODE_ENV=development
```

### Commandes utiles

```bash
# Démarrer le backend (avec nodemon)
cd backend && npm run dev

# Démarrer le frontend
cd frontend && npm start

# Installer les dépendances
npm install

# Voir les logs
# Backend : regarde la console du terminal
# Frontend : regarde DevTools (F12)
```

### Troubleshooting

**Erreur : "Can't resolve './context/AuthContext'"**
- Solution : Vérifie que le fichier existe et que les imports sont corrects

**Erreur : "Module not found: Error: Can't resolve 'api'"**
- Solution : Vérifie le chemin `frontend/src/api/index.js`

**Erreur : "Connection refused" (MySQL)**
- Solution : Démarre XAMPP et lance MySQL

**Erreur : ".env not found"**
- Solution : Crée le fichier `backend/.env` (pas à la racine !)

---

## 📚 Ressources

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [Sequelize Documentation](https://sequelize.org)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0)
- [JWT Authentication](https://jwt.io)

---

## 👤 Auteur

**Cédric TEDIE**  
Formation DWWM - CEF  
02/05/2026

---

## 📄 License

Projet pédagogique - Tous droits réservés

---
