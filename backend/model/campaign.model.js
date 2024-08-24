const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  campaignCode: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    default: "",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  title: {
    type: String,
    trim: true,
    default: "",
    required: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
    required: true,
  },
  category: {
    type: String,
    trim: true,
    default: "",
    required: true,
  },
  target: {
    type: Number,
    trim: true,
    min: 0,
    default: 0,
    required: true,
  },
  deadline: {
    type: Date,
    default: "",
    required: true,
  },
  filePaths: [String]
}, {
  timestamps: true,
  versionKey: false
})

const CampaignModel = mongoose.model("campaigns", campaignSchema)

module.exports = CampaignModel;