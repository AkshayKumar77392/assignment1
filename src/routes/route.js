const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require("../controller/userController")

// const { authenticate,authorise } = require("../middleware/auth")


//user Api
router.post("/register", createUser)
router.post("/login", loginUser)


module.exports = router;