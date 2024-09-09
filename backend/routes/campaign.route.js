const express = require("express")
const router = express.Router();
const auth = require('../utils/authorization');
const campaignController = require("../controller/campaign.controller")
const multerConfig = require('../utils/multer');

router.post('/createCampaign', auth(['User']), async (req, res, next) => {
  const userId = req.user._id.toString();
  multerConfig.userSpecificUpload(userId).array('files', 2)(req, res, (err) => {
    if (err) return next(err);
    campaignController.createCampaign(req, res);
  });
});

router.delete('/deleteCampaign', auth(['User', 'Admin']), campaignController.deleteCampaign)
router.post('/getCampaign', auth(['User', 'Admin']), campaignController.getCampaign)
router.get('/getAllCampaign', auth(['User', 'Admin']), campaignController.getAllCampaign)
router.post('/campaignExist', auth(['User', 'Admin']), campaignController.campaignExist)

module.exports = router;