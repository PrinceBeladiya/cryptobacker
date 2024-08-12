const express = require("express")
const router = express.Router();
const userController = require("../controller/user.controller")
const auth = require('../utils/authorization')
const multer = require("multer");
const storage = require("../utils/multer");

const upload = multer({
  storage,
});

router.post('/signup', upload.single("file"), userController.signup)
router.post('/login', userController.login)
router.get('/getUser', auth(['User']), userController.getUser)

module.exports = router;