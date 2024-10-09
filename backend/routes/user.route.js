const express = require("express")
const router = express.Router();
const auth = require("../utils/authorization");
const userController = require("../controller/user.controller")
const multerConfig = require('../utils/multer');

router.post('/signup', multerConfig.singleFileUpload.single("file"), userController.signup)
router.post('/login', userController.login)
router.post('/changeStatus', auth(["Admin"]), userController.changeUserStatus)
router.get('/getUser', auth(["User"]), userController.getUser)
router.post('/getUserById', userController.getUserById)
router.get('/getAllUser', auth(["Admin"]), userController.getAllUsers)

module.exports = router;