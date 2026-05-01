const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Favori', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    timestamps: true,
    tableName: 'favoris',
  });
};