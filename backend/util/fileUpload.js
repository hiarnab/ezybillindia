const multer = require('multer');
const config = require('../config/config');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, config.MenuImages);
  },
  filename(req, file, cb) {
    const uniqueFilename = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, uniqueFilename);
  }
});

module.exports = multer({ storage });
