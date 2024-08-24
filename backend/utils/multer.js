const Multer = require('multer');
const fs = require('fs');
const path = require('path');

// Existing Multer configuration for single file uploads
const singleFileStorage = Multer.diskStorage({
  destination: function (req, file, callback) {
    if (!fs.existsSync('storage')) {
      fs.mkdirSync('storage');
    }
    callback(null, 'storage');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});

// New Multer configuration for user-specific folders
const userSpecificStorage = (userId) => Multer.diskStorage({
  destination: function (req, file, callback) {
    const userFolder = path.join('storage', userId.toString());
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }
    callback(null, userFolder);
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});

// Export configurations
module.exports = {
  singleFileUpload: Multer({ storage: singleFileStorage }),
  userSpecificUpload: (userId) => Multer({ storage: userSpecificStorage(userId) }),
};
