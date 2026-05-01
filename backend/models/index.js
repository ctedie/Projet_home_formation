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

// ============================================
// ASSOCIATIONS (à compléter plus tard)
// ============================================

// ============================================
// EXPORT
// ============================================
module.exports = {
  sequelize,
  Utilisateur,
  Recette,
};