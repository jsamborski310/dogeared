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
      has_read: {
        type: DataTypes.BOOLEAN,        
      },
      description: {
        type: DataTypes.TEXT,
      },

      image: {
        type: DataTypes.BLOB,
    },

    isCommon: {
      type: DataTypes.BOOLEAN,
    },

      user_id: {
        allowNull : true,
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },

   
    },
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'book',
    }
  );
  
  module.exports = Book;
  