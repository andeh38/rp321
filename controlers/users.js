const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '../config/config.env' });

const User = require('../models/user');

// @route POST api/user
// @desc  register new user
// @access Public

exports.register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ msg: 'enter all fields' });
    }

    User.findOne({ email }).then((user) => {
      if (user) return res.status(400).json({ msg: 'user already exists' });
      const newUser = new User({
        name,
        email,
        password,
      });

      //Create salt&hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            jwt.sign(
              { id: user.id },
              process.env.jwtSecret,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    admin: user.admin
                  },
                });
              }
            );
          });
        });
      });
    });
  } catch (err) {
    return res.status(400).json({ msg: 'something went wrong!' });
  }
};
