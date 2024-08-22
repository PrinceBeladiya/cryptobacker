const Multer = require("multer");
const fs = require("fs");

module.exports = Multer.diskStorage({
  destination: function (req, file, callback) {
    if(!fs.existsSync("storage")) {
      fs.mkdirSync("storage");
    }
    callback(null, "storage");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
})