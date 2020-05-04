const express = require("express");
const router = express.Router();
const multer  = require("multer");

const {
  postImage 
} = require('../controlers/image')

const upload = multer({dest:"uploads"});

router.route('/upload').post(upload.single('file'), postImage)

module.exports = router;