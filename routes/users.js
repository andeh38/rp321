const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')

const { register } = require('../controlers/users')

router.route("/").post(register);

module.exports = router;