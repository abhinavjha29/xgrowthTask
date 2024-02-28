const UserModel = require("../models/userTable");
const UserDetailModel = require("../models/user_DetailsTable");

const postUserDetail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({
      where: { email },
      include: [{ model: UserDetailModel }],
    });

    if (!user) {
      return res.status(404).json({ message: "Wrong Email" });
    } else {
      return res.status(200).json({
        message: "User found",
        data: user,
      });
    }
  } catch (error) {
    console.error("Error retrieving user details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { postUserDetail };
