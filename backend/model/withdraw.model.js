const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema({
  campaignCode: {
    type: Number,
    required: true,
  },
  campaignOwner: {
    type: String,
    trim: true,
    default: '',
    required: true,
  },
  name: {
    type: String,
    trim: true,
    default: "",
  },
  title: {
    type: String,
    trim: true,
    default: "",
  },
  campaign: {
    type: String,
    trim: true,
    default: "",
  },
  withdrawAmount: {
    type: Number,
    default: 0,
  },
  file: {
    type: String,
    default: null
  },
  status: {
    type: String,
    default: "Pending",
    enum: ['Pending', 'Approved', 'Rejected']
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    default: null
  },
}, {
  timestamps: true,
  versionKey: false
})

const WithdrawModel = mongoose.model("withdraw_Request", withdrawSchema)

module.exports = WithdrawModel;