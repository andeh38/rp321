const express = require('express');
const fs = require('fs');
const router = express.Router();
const config = require('config');
const multer  = require("multer");

const Picture = require('../models/image');

const upload = multer({dest:"uploads"});

exports.postImage = async (req, res, next) =>{
  try {
    const image = req.file
    
    return res.json({msg: 'we coo'})
  } catch (err) {
    res.status(400).json({msg : 'something went wrong'})
  }
}

/* // @route POST api/image
// @desc  upload image
// @access Public

exports.postImage = async (req, res, next) => {
  try {
    const { ...image } = req.body;
    fs.readFile(image.image, (err, data) => {
      if (err) throw err;

      if (image.description) {
        let newPicture = new Picture({ img: data, description });
      } else {
        let newPicture = new Picture({ img: data });
      }

      newPicture.save().then(console.log('we coo'));
    });
  } catch (err) {
    return res.status(400).json({ msg: 'something went wrong!' });
  }
};

// @route GET api/image
// @desc  download latest image with given description
// @access Public
exports.getImage = async (req, res, next) => {
  try {
    const { description } = req.body;

    res.json(
      await Picture.findOne({ description }).sort({ upload_date: -1 }).limit(1)
    );
  } catch (err) {
    return res.status(400).json({ msg: 'something went wrong!' });
  }
};
 */
