const express = require("express");
const UserController = require("../controller/UserController");
const router = express.Router();

router.post("/login", UserController.postUserDetail);

module.exports = router;
