const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const multer = require('multer');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));


//huita
const fs = require('fs');
const Picture = require('./models/image');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('File format should be PNG,JPG,JPEG'), false); // if validation failed then generate error
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  'file'
);
app.post('/api/images/upload', (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    } else if (!req.file){
      return res.status(500).json({ msg: 'no file selected'});
    }
    newPic = new Picture({ name: req.file.filename });
    newPic.save();
    return res.status(200).send(req.file);
  });
});
app.get('/api/images/', (req, res) => {
  const pic = Picture.findOne()
    .sort({ upload_date: -1 })
    .limit(1)
    .exec((err, doc) => {
      if (err) throw err;
      res.status(200).send(doc.name);
    });
});
app.delete('/api/images/delete', (req, res) => {
  Picture.find()
    .sort({ upload_date: -1 })
    .limit(2)
    .exec((err, docs) => {
      if (err) throw err;
      fs.unlink(`uploads/${docs[0].name}`, (err) => {
        if (err) throw err;
      });
      res.status(200).send(docs[1].name);
      docs[0].remove();
    });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
