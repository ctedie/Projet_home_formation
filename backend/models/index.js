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
    logging: false, // Mettre à true pour voir les requêtes SQL
  }
);

// ============================================
// MODELS (à importer au fur et à mesure)
// ============================================
// À compléter dans les prochaines issues
// const Utilisateur = require('./Utilisateur')(sequelize);
// const Recette = require('./Recette')(sequelize);
// const Favori = require('./Favori')(sequelize);

// ============================================
// EXPORT
// ============================================
module.exports = {
  sequelize,
  // Utilisateur,
  // Recette,
  // Favori,
};