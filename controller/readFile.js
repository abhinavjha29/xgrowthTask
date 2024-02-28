const fs = require("fs").promises;
const path = require("path");
const UserModel = require("../models/userTable");
const UserDetailModel = require("../models/user_DetailsTable");
const sequelize = require("../util/dbconnection");

const readFile = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../files", "data.json");

    const jsonData = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(jsonData);

    await sequelize.transaction(async (transaction) => {
      await Promise.all(
        data.map(async (user) => {
          const createdUser = await UserModel.create(
            { email: user.email },
            { transaction }
          );
          await UserDetailModel.create(
            {
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              address: user.address,
              UserUserId: createdUser.userId,
            },
            { transaction }
          );
        })
      );
    });

    res.status(200).send("Data inserted successfully");
  } catch (error) {
    console.log("Error inserting data:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { readFile };
