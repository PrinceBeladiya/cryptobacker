const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
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
  DOB: {
    type: Date,
  },
  password: {
    type: String,
    trim: true,
    default: "",
  },
  role: {
    type: String,
    trim: true,
    default: "User",
    enum: ['User', 'Admin']
  },
  file: {
    type: String,
    default: null
  },
}, {
  timestamps: true,
  versionKey: false
})

userSchema.pre("save", async function(next) {
  const user = this;

  if (!user.isModified("password")) {
    return next()
  }

  try {
    const hash = await bcrypt.hash(user.password, 12)
    user.password = hash;
    
    next()
  } catch(err) {
    next(err)
  }
})


const UserModel = mongoose.model("users", userSchema)

module.exports = UserModel;