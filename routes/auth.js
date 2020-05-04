const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')

const {
  postUser,
  getUser
} = require('../controlers/auth')

router.route('/').post(postUser)

router.route('/user').get(auth, getUser)

module.exports = router;