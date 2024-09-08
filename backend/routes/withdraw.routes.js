const express = require("express")
const router = express.Router();
const auth = require('../utils/authorization');
const withdrawController = require("../controller/withdraw.controller")
const multerConfig = require('../utils/multer');

router.post('/createWithdrawRequest', auth(['User']), multerConfig.singleFileUpload.single("file"), withdrawController.createWithdrawRequest)
router.post('/getWithdrawRequest', auth(['User']), withdrawController.getWithdrawRequest)

module.exports = router;