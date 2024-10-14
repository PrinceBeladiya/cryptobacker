const Campaign = require("../model/campaign.model")
const User = require("../model/user.model")
const path = require('path');
const fs = require("fs")

exports.createCampaign = async (req, res) => {
  let uploadedFilePaths = [];

  try {
    const { campaignCode, name, title, target, deadline, description, category } = req.body;
    const files = req.files;

    if (req.files.campaign_thumbnail && req.files.campaign_thumbnail.length > 0) {
      uploadedFilePaths.push(req.files.campaign_thumbnail[0].path);
    }
    if (req.files.campaign_report && req.files.campaign_report.length > 0) {
      uploadedFilePaths.push(req.files.campaign_report[0].path);
    }

    if (!title || !target || !deadline || !description || !category || !campaignCode || !name || !req.user._id || !files) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      })
    }

    const campaignExist = await Campaign.exists({
      $and: [
        {
          campaignCode: campaignCode
        },
        {
          name: name.trim()
        },
        {
          title: title.trim()
        },
      ]
    })

    if (campaignExist) {
      // Remove uploaded files if campaign already exists
      uploadedFilePaths.forEach(filePath => {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });

      return res.status(400).send({
        status: false,
        message: "CampaignCode, CampaignName or CamapaignTitle already registered"
      })
    }

    // Extract file information
    const filePaths = files.map(file => path.join('storage', req.user._id.toString(), file.filename));

    const campaign = new Campaign({
      campaignCode,
      name,
      owner: req.user._id,
      title,
      description,
      category,
      target,
      deadline,
      filePaths
    });

    await campaign.save();

    return res.status(200).send({
      status: true,
      message: "Campaign Created successfully",
      data: campaign
    });

  } catch (err) {
    console.log("Error : ", err)

    // Remove uploaded files if campaign already exists
    uploadedFilePaths.forEach(filePath => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    return res.status(500).send({
      status: false,
      message: err.message || "Internal Server Error.",
    });
  }
}

exports.setCampaignHandler = async (req, res) => {
  try {
    const { campaignCode } = req.body;

    if (campaignCode === undefined || !req.user._id) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      });
    }

    // Find the campaign by campaignCode
    const campaign = await Campaign.findOne({
      campaignCode: Number(campaignCode)
    });

    if (!campaign) {
      return res.status(404).send({
        status: false,
        message: "Campaign not found with campaign_code : " + campaignCode
      });
    }

    // Set the reviewBy field to the user's ID
    campaign.reviewedBy = req.user._id;

    // Save the updated campaign
    await campaign.save();

    return res.status(200).send({
      status: true,
      message: "Campaign reviewer assigned successfully",
      data: campaign
    });
  } catch (err) {
    console.log("Error : ", err);
    return res.status(500).send({
      status: false,
      message: err.message || "Internal Server Error.",
    });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const { campaignCode } = req.body;

    if ((!campaignCode || isNaN(campaignCode)) || !req.user) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).send({
        status: false,
        message: "User Does Not Exist."
      });
    }

    // Find the campaign by owner and campaignCode
    const campaign = await Campaign.findOne({
      owner: req.user._id,
      campaignCode: Number(campaignCode)
    });

    if (!campaign) {
      return res.status(200).send({
        status: true,
        message: "Campaign not found with campaign_code : " + campaignCode,
      });
    }

    let fileDeleted = true;
    // Delete the associated files
    if (campaign.filePaths && campaign.filePaths.length > 0) {
      campaign.filePaths.forEach(file => {
        const filePath = "./" + file; // Construct the file path
        fs.unlink(filePath, (err) => {
          if (err) {
            fileDeleted = false;
            return;
          }
        });
      });
    }

    if (fileDeleted) {
      // Delete the campaign
      const result = await Campaign.deleteOne({ campaignCode: Number(campaignCode) });

      if (result.deletedCount === 0) {
        return res.status(404).json({
          status: false,
          message: "Campaign not found"
        });
      }

      return res.status(200).send({
        status: true,
        message: "Campaign deleted successfully",
        data: campaign
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Campaign cannot be deleted"
      });
    }
  } catch (err) {
    console.log("Error : ", err);
    return res.status(500).send({
      status: false,
      message: err.message || "Internal Server Error.",
    });
  }
}

exports.getCampaign = async (req, res) => {
  try {
    const { campaignCode } = req.body;
    if (campaignCode == undefined || !req.user._id) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      })
    }

    const campaignExist = await Campaign.findOne({
      campaignCode: campaignCode
    });

    if (campaignExist) {
      return res.status(200).send({
        status: true,
        message: "Campaign Details Fetched.",
        data: campaignExist
      })
    }

    return res.status(400).send({
      status: false,
      message: "There is no campaign for " + campaignCode
    })
  } catch (err) {
    console.log("Error : ", err);
    return res.status(500).send({
      status: false,
      message: err.message || "Internal Server Error.",
    });
  }
}

exports.campaignExist = async (req, res) => {
  try {
    const { name, title, description, category } = req.body;

    if (!title || !description || !category || !name || !req.user._id) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      })
    }

    const campaignExist = await Campaign.exists({
      $and: [
        {
          description: description.trim()
        },
        {
          name: name.trim()
        },
        {
          title: title.trim()
        },
        {
          category: category.trim()
        },
      ]
    })

    if (campaignExist) {
      return res.status(400).send({
        status: false,
        message: "Some Details of campaign is already registered"
      })
    }

    return res.status(200).send({
      status: true,
      message: "Campaign can create"
    })
  } catch (err) {
    console.log("Error : ", err);
    return res.status(500).send({
      status: false,
      message: err.message || "Internal Server Error.",
    });
  }
}

exports.getAllCampaign = async (req, res) => {
  try {
    if (!req.user._id) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      })
    }

    const campaignList = await Campaign.find();

    if (campaignList) {
      return res.status(200).send({
        status: true,
        message: "Campaign Details Fetched.",
        data: campaignList
      })
    }

    return res.status(400).send({
      status: false,
      message: "There is no campaigns"
    })
  } catch (err) {
    console.log("Error : ", err);
    return res.status(500).send({
      status: false,
      message: err.message || "Internal Server Error.",
    });
  }
}