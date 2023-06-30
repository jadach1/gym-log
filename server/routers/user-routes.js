const express = require('express')
const router = express.Router()
const controller = require('../controllers/user.controller')

router.get("/", (req,res,next) => {
    console.log("in router")
})

router.get("/user", controller.getUsers)

router.post("/login", controller.getUser);

module.exports = router;