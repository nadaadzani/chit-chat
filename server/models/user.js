'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post, { foreignKey: "UserId" })

      this.hasMany(models.Chat, { foreignKey: "Sender" })
      this.hasMany(models.Chat, { foreignKey: "Recipient" })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Welcome to heunChat!"
    },
    avatarUrl: {
      type: DataTypes.STRING,
      defaultValue: "https://zultimate.com/wp-content/uploads/2019/12/default-profile.png"
    },

  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, options) {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};