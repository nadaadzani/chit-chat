'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chat.belongsTo(models.User, { foreignKey: 'Sender' })
      Chat.belongsTo(models.User, { foreignKey: 'Recipient' })
    }
  }
  Chat.init({
    content: DataTypes.TEXT,
    Sender: DataTypes.INTEGER,
    Recipient: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};