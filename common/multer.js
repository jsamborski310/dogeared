const multer = require('multer');
const DIR = "./Public/images";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },

  filename: function (req, file, cb) {
    var path = file.originalname
    console.log("filee uplaodedddddÏ",file)
    var newpath = path.split(".")
    cb(null, Date.now() + Math.random() * 100 + "." + newpath[newpath.length - 1]);

  },
  
});

module.exports.upload = multer({
  storage: storage,
  // dest :'../public/images',
} );