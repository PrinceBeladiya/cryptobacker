const express = require("express")
const router = express.Router();
const userController = require("../controller/user.controller")
const auth = require('../utils/authorization')
const multerConfig = require('../utils/multer');

router.post('/signup', multerConfig.singleFileUpload.single("file"), userController.signup)
router.post('/login', userController.login)
router.get('/getUser', auth(['User', 'Admin']), userController.getUser)
router.post('/getUserById', userController.getUserById)
router.get('/getAllUser', auth(['User', 'Admin']), userController.getAllUsers)

module.exports = router;