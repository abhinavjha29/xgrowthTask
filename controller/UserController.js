const UserModel = require("../models/userTable");
const UserDetailModel = require("../models/user_DetailsTable");

const postUserDetail = async (req, res) => {
  try {
    const { email } = req.body;
    const Userresponse = await UserModel.findOne({ where: { email: email } });
    if (!Userresponse) {
      return res.status(404).json({ messege: "Wrong Email" });
    } else {
      const userDetailresponse = await UserDetailModel.findOne({
        where: { UserUserId: Userresponse.userId },
      });
      if (userDetailresponse) {
        return res.status(200).json({
          messege: "User found",
          data: { Userresponse, userDetailresponse },
        });
      } else {
        res.status(500).json({ messege: "Something went wrong" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ messege: "Internal server error" });
  }
};
module.exports = { postUserDetail };
