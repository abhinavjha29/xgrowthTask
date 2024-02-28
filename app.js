const Express = require("express");
const cors = require("cors");
const sequelize = require("./util/dbconnection");
const userModel = require("./models/userTable");
const userDetailModel = require("./models/user_DetailsTable");
const fileRouter = require("./routes/readFileRoute");
const UserRouter = require("./routes/userRoute");
require("dotenv").config();
const app = Express();
app.use(Express.json());
app.use(cors({ origin: "*" }));
userModel.hasOne(userDetailModel);
userDetailModel.belongsTo(userModel);
// app.use("/", function (req, res) {
//   res.send("1HELLO");
// });
app.use("/file", fileRouter);
app.use("/user", UserRouter);
async function startServer() {
  try {
    await sequelize.sync();
    app.listen(process.env.PORT, () => {
      console.log("Listening on port 4001");
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
