const mongoose = require('mongoose');

const PictureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  upload_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Picture = mongoose.model('picture', PictureSchema);
