const express = require("express");
const router = express.Router();
const User = require("./auth.routes");
const Users = require("./users.routes");
const Turorial = require("./turorial.routes");
router.use('/auth', User);
router.use('/users', Users);
router.use('/turorials', Turorial);
module.exports = router;