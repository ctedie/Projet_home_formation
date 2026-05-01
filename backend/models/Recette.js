const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Recette', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    ingredients: {
      type: DataTypes.TEXT,  // ← Changé de LONGTEXT à TEXT
    },
    etapes: {
      type: DataTypes.TEXT,  // ← Changé de LONGTEXT à TEXT
    },
    auteur: {
      type: DataTypes.STRING(100),
    },
    categorie: {
      type: DataTypes.ENUM('entree', 'plat', 'dessert', 'boisson'),
      defaultValue: 'plat',
    },
    temps: {
      type: DataTypes.STRING(50),
    },
    portions: {
      type: DataTypes.INTEGER,
    },
    photo: {
      type: DataTypes.STRING(255),
      defaultValue: null,
    },
  }, {
    timestamps: true,
    tableName: 'recettes',
  });
};