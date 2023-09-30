const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const USER = require('../models/User')

router.get("/", (req, res, next) => {
  console.log("in router");
});

router.get("/isAuthorised", controller.checkIfAuthorised);

router.get("/user", controller.getUsers);

router.post("/login", controller.userLogin); 

router.post("/signup", controller.newUser)

router.post("/logout", controller.userLogout);

module.exports = router;
