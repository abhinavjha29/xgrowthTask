const fs = require("fs").promises;
const path = require("path");
const { sequelize } = require("../util/dbconnection");

const readFile = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../files", "data.json");

    const jsonData = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(jsonData);

    await sequelize.transaction(async (transaction) => {
      await Promise.all(
        data.map(async (user) => {
          const createUserQuery = `
            INSERT INTO User (email) VALUES (:email);
          `;
          await sequelize.query(createUserQuery, {
            replacements: { email: user.email },
            transaction,
          });

          const createDetailQuery = `
            INSERT INTO UserDetail (email, first_name, last_name, address, UserUserId)
            VALUES (:email, :first_name, :last_name, :address, LAST_INSERT_ID());
          `;
          await sequelize.query(createDetailQuery, {
            replacements: {
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              address: user.address,
            },
            transaction,
          });
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
