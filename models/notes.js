const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')


class Notes extends Model {}


Notes.init(
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      book_id: {
        allowNull : true,
        type: DataTypes.INTEGER,
        references: {
            model: 'book',
            key: 'id',
        },

   
    },
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'notes',
    }
  );
  
  module.exports = Notes;
  