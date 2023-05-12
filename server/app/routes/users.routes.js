
const users = require("../controllers/user.controller.js");
const express = require("express");
const router = express.Router();
router.post("/list", users.list);
router.post("/add", users.add);
module.exports = router;