const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: "",
  },
  mobile: {
    type: String,
    trim: true,
    unique: true,
    default: "",
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    default: "",
  },
  password: {
    type: String,
    trim: true,
    default: "",
  },
  role: {
    type: String,
    trim: true,
    default: "Admin"
  },
  adminType: {
    type: Number,
    trim: true,
    default: 0,
    enum: [0, 1, 2, 3]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    default: null
  }
}, {
  timestamps: true,
  versionKey: false
})

adminSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next()
  }

  try {
    const hash = await bcrypt.hash(user.password, 12)
    user.password = hash;

    next()
  } catch (err) {
    next(err)
  }
})


const AdminModel = mongoose.model("admins", adminSchema)

module.exports = AdminModel;