const Campaign = require("../model/campaign.model")
const Withdraw = require("../model/withdraw.model")
// const User = require("../model/user.model")
const path = require('path');
const { unlink } = require('node:fs');

exports.createWithdrawRequest = async (req, res) => {
  try {
    const { campaignCode, campaignOwner, name, title, campaign, amount } = req.body;
    const path = req.file.path;

    if (!campaignCode || !campaignOwner || !name || !title || !campaign || !amount || !req.file) {
      unlink(path, (err) => {
        if (err) throw err;
      });

      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      })
    }

    const campaignExist = await Campaign.findOne({
      campaignCode: campaignCode
    });

    if (!campaignExist) {
      unlink(path, (err) => {
        if (err) throw err;
      });

      return res.status(200).send({
        status: false,
        message: "There is no campaign for " + campaignCode
      })
    }

    // Extract file information
    const filePaths = process.env.URL + req.file.path;

    const withdrawRequest = new Withdraw({
      campaignCode,
      campaignOwner,
      name,
      title,
      campaign,
      withdrawAmount: amount,
      file: filePaths,
      status: "Pending"
    });

    await withdrawRequest.save();

    return res.status(200).send({
      status: true,
      message: "Withdraw Request Created successfully",
      data: withdrawRequest
    });

  } catch (err) {
    console.log("Error : ", err)

    unlink(path, (err) => {
      if (err) throw err;
    });

    return res.status(500).send({
      status: false,
      message: err.message || "Internal Server Error.",
    });
  }
}

exports.getWithdrawRequest = async (req, res) => {
  try {
    const { campaignOwner } = req.body;
    if (campaignOwner == undefined || !req.user._id) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      })
    }

    const withdrawExist = await Withdraw.find({
      campaignOwner: campaignOwner
    });

    if (withdrawExist) {
      return res.status(200).send({
        status: true,
        message: "Withdraw Request Fetched.",
        data: withdrawExist
      })
    }

    return res.status(400).send({
      status: false,
      message: "There is no withdraw request for " + campaignOwner
    })
  } catch (err) {
    console.log("Error : ", err);
    return res.status(500).send({
      status: false,
      message: err.message || "Internal Server Error.",
    });
  }
}