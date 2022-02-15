const {Model, DataTypes} = require('sequelize')

class book extends Model {}


book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      has_read: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'book',
    }
  );
  
  module.exports = book;
  