const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Utilisateur', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    motDePasse: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'membre'),
      defaultValue: 'membre',
    },
  }, {
    timestamps: true,
    tableName: 'utilisateurs',
  });
};