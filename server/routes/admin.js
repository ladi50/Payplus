const router = require("express").Router();
const adminControllers = require("../controllers/admin");

router.post("/login", adminControllers.getAdmin);

module.exports = router;
