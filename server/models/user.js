'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post)
      User.hasMany(models.Chat, { foreignKey: 'Sender' })
      User.hasMany(models.Chat, { foreignKey: 'Recipient' })
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    avatarUrl: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user, options) {
        user.password = hashPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};