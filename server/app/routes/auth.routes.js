
const users = require("../controllers/user.controller.js");
const express = require("express");
const router = express.Router();
router.post("/signup", users.signUp);
router.post("/signin", users.signIn);
router.post("/logout", users.logout);
module.exports = router;