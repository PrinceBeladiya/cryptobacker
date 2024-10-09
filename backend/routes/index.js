const express = require("express");
const userRoute = require("./user.route")
const campaignRoute = require("./campaign.route")
const withdrawRoute = require("./withdraw.routes")
const adminRoute = require("./admin.route")

const router = express.Router();

router.use('/user', userRoute)
router.use('/admin', adminRoute)
router.use('/campaign', campaignRoute)
router.use('/withdraws', withdrawRoute)

module.exports = router;