const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '../config/config.env' });

const User = require('../models/user');

// @route POST api/auth
// @desc  auth user
// @access Public

exports.postUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'no email or password' });
    }

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: 'user does not  exist' });

    // validete pass
    const compare = await bcrypt.compare(password, user.password);

    if (!compare) return res.status(400).json({ msg: 'invalid credentials' });

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
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'server error',
    });
  }
};

// @route GET api/auth/user
// @desc  get user data
// @access Private
exports.getUser = async (req, res, next) =>{
  res.json(await User.findById(req.user.id).select('-password'));
}