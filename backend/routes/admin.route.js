const express = require("express")
const router = express.Router();
const auth = require("../utils/authorization");
const adminController = require("../controller/admin.controller")

router.post('/signup', adminController.signup)
router.post('/login', adminController.login)
router.get('/getAdmin', auth(["Admin"]), adminController.getAdmin)
router.post('/addAdmin', auth(["Admin"]), adminController.addSubAdmin)
router.post('/getAdminById', adminController.getAdminById)
router.get('/getAllAdmins', adminController.getAllAdmins)
router.post('/sendMail', auth(["Admin"]), adminController.sendMail)

module.exports = router;