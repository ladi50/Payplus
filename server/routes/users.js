const router = require("express").Router();
const usersControllers = require("../controllers/users");
const checkAccess = require("../middlewares/checkAccess");
const jwt = require("../middlewares/jwt");

router.post("/signup", jwt, checkAccess, usersControllers.signupUser);

router.get("/allUsers", usersControllers.getUsers);

router.post("/user/:userId", usersControllers.createShift);

router.get("/user/:userId", usersControllers.getShifts);

router.get("/userShift/:userId", usersControllers.getShift);

router.patch("/user/:userId", usersControllers.updateShift);

module.exports = router;
