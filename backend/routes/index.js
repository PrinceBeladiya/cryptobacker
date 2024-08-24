const express = require("express");
const userRoute = require("./user.route")
const campaignRoute = require("./campaign.route")

const router = express.Router();

router.use('/user', userRoute)
router.use('/campaign', campaignRoute)

module.exports = router;