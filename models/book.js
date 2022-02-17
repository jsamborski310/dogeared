const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')


class Book extends Model {}


Book.init(
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

      user_id: {
          type: DataTypes.INTEGER,
          references: {
              model: 'User',
              key: 'id',
          },
      },
      has_read: {
        type: DataTypes.BOOLEAN,

        
      },
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'Book',
    }
  );
  
  module.exports = Book;
  