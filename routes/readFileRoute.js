const Express = require("express");
const readFilecontroller = require("../controller/readFile");

const router = Express.Router();

router.get("/readFile", readFilecontroller.readFile);

module.exports = router;
