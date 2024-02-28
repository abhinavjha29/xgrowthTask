const sequelize = require("../util/dbconnection");

const postUserDetail = async (req, res) => {
  try {
    const { email } = req.body;
    const query = `
      SELECT 
        ut.*, udt.*
      FROM 
        users AS ut
      LEFT JOIN 
        user_details AS udt ON ut.userId = udt.UserUserId
      WHERE 
        ut.email = :email
    `;

    const [results] = await sequelize.query(query, {
      replacements: { email },
      type: sequelize.QueryTypes.SELECT,
    });

    if (!results.length) {
      return res.status(404).json({ message: "Wrong Email" });
    }

    return res.status(200).json({
      message: "User found",
      data: results,
    });
  } catch (error) {
    console.error("Error retrieving user details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { postUserDetail };
