
const users = require("../controllers/user.controller.js");
const express = require("express");
const router = express.Router();
router.get("/list", users.list);
module.exports = router;