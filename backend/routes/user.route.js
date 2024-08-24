const express = require("express")
const router = express.Router();
const userController = require("../controller/user.controller")
const auth = require('../utils/authorization')
const multerConfig = require('../utils/multer');

router.post('/signup', multerConfig.singleFileUpload.single("file"), userController.signup)
router.post('/login', userController.login)
router.get('/getUser', auth(['User']), userController.getUser)

module.exports = router;