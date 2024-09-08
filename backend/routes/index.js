const express = require("express");
const userRoute = require("./user.route")
const campaignRoute = require("./campaign.route")
const withdrawRoute = require("./withdraw.routes")

const router = express.Router();

router.use('/user', userRoute)
router.use('/campaign', campaignRoute)
router.use('/withdraws', withdrawRoute)

module.exports = router;