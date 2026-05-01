const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// ============================================
// CONNEXION MYSQL
// ============================================
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// ============================================
// MODELS
// ============================================
const Utilisateur = require('./Utilisateur')(sequelize);
const Recette = require('./Recette')(sequelize);
const Favori = require('./Favori')(sequelize);

// ============================================
// ASSOCIATIONS
// ============================================
// Un utilisateur a plusieurs favoris
Utilisateur.hasMany(Favori, {
  foreignKey: 'UtilisateurId',
  onDelete: 'CASCADE',
});

// Une recette a plusieurs favoris
Recette.hasMany(Favori, {
  foreignKey: 'RecetteId',
  onDelete: 'CASCADE',
});

// Un favori appartient à un utilisateur
Favori.belongsTo(Utilisateur, {
  foreignKey: 'UtilisateurId',
});

// Un favori appartient à une recette
Favori.belongsTo(Recette, {
  foreignKey: 'RecetteId',
});

// ============================================
// EXPORT
// ============================================
module.exports = {
  sequelize,
  Utilisateur,
  Recette,
  Favori,
};