const sequelize = require("../util/dbconnection");
const Sequelize = require("sequelize");

const UserDetail = sequelize.define("User_Detail", {
  Id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  first_name: {
    type: Sequelize.STRING,
  },
  last_name: { type: Sequelize.STRING },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = UserDetail;
