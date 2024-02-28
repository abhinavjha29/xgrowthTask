const sequelize = require("../util/dbconnection");
const Sequelize = require("sequelize");

const User = sequelize.define("User", {
  userId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = User;
