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

exports.updateRequestStatus = async (req, res) => {
  try {
    const { withdrawID, status } = req.body;
    const adminId = req.user._id; // Assume this is coming from middleware that verifies the admin/user

    if(!withdrawID || !status || !adminId) {
      return res.status(404).json({
        status: false,
        message: 'Invalid Details',
      });
    }

    // Find the user by ID
    const withdraw = await Withdraw.findById(withdrawID);
    if (!withdraw) {
      return res.status(404).json({
        status: false,
        message: 'Withdraw Request not found',
      });
    }

    // Update the withdraw request's status and record who modified it
    withdraw.status = status;
    withdraw.reviewedBy = adminId;

    // Save the updated withdraw document
    await withdraw.save();

    return res.status(200).json({
      status: true,
      message: `Withdraw Request status updated successfully to ${status} by admin with ID ${adminId}`,
      data: withdraw,
    });

  } catch (error) {
    console.error("Error updating withdraw status:", error);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
};

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

exports.getAllWithdrawRequest = async (req, res) => {
  try {

    if (!req.user._id) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      })
    }

    const withdrawExist = await Withdraw.find({});

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

exports.getWithdrawRequestByID = async (req, res) => {
  try {
    const { ID } = req.params;

    if (!req.user._id || !ID) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      })
    }

    const withdrawExist = await Withdraw.findById(ID);

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