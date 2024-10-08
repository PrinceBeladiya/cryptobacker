const User = require("../model/user.model")
const bcrypt = require("bcrypt");
const { buildToken } = require("../utils/token");
const { unlink } = require('node:fs');

exports.signup = async (req, res) => {

  try {
    const path = req.file.path;
    const { name, mobile, email, DOB, password } = req.body;

    if (!name || !mobile || !email || !DOB || !password || !req.file) {
      unlink(path, (err) => {
        if (err) throw err;
      });

      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      })
    }

    if (name.length > 0 && (/^[a-z ,.'-]+$/i).test(name)) {
      if (mobile.length === 10 && (/^\d{10}$/).test(mobile)) {
        if (email.length > 0 && (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email)) {
          if (DOB.length > 0 && (/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/).test(DOB)) {
            if (!((/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).test(password))) {
              unlink(path, (err) => {
                if (err) throw err;
              });

              return res.status(400).send({
                status: false,
                message: "Password not valid. It should contain length of 6-16 characters and 1 special character along with 1 number."
              })
            }
          } else {
            unlink(path, (err) => {
              if (err) throw err;
            });

            return res.status(400).send({
              status: false,
              message: "Date Format is not proper."
            })
          }
        } else {
          unlink(path, (err) => {
            if (err) throw err;
          });

          return res.status(400).send({
            status: false,
            message: "Email id is not valid"
          })
        }
      } else {
        unlink(path, (err) => {
          if (err) throw err;
        });

        return res.status(400).send({
          status: false,
          message: "Mobile number should be 10 digits"
        })
      }
    } else {
      unlink(path, (err) => {
        if (err) throw err;
      });

      return res.status(400).send({
        status: false,
        message: "Name should be in alphabets"
      })
    }

    // validation complete and valid
    const userExist = await User.exists({
      $or: [
        {
          email: email.trim()
        },
        {
          mobile: mobile.trim()
        },
      ]
    })

    if (userExist) {
      unlink(path, (err) => {
        if (err) throw err;
      });

      return res.status(400).send({
        status: false,
        message: "Email or Mobile no. already registered"
      })
    }

    const user = new User({
      name,
      mobile,
      email,
      DOB,
      password,
      file: process.env.URL + req.file.path,
    });

    await user.save();

    return res.status(200).send({
      status: true,
      message: "User registered successfully",
      data: user
    });

  } catch (err) {
    if (req.file && req.file.path) {
      console.log("Error : ", err)
      unlink(req.file.path, (err) => {
        if (err) throw err;
      });
    }

    return res.status(500).send({
      status: false,
      message: err.message || "Internal Server Error.",
    });
  }
}

exports.getUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      })
    }

    const user = await User.findById(req.user._id).select("-password")
    if (!user) {
      return res.status(400).send({
        status: false,
        message: "User Does Not Exists."
      });
    }

    return res.status(200).send({
      status: true,
      message: "User Details fetched successfully",
      data: user
    });

  } catch (err) {
    console.log("Error : ", err)
    return res.status(500).send({
      status: false,
      message: err.message || "Internal Server Error.",
    });
  }
}

exports.getUserById = async (req, res) => {
  try {
    const { ID } = req.body;

    if (!ID) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      })
    }

    const user = await User.findById(ID).select("-password")
    if (!user) {
      return res.status(400).send({
        status: false,
        message: "User Does Not Exists."
      });
    }

    return res.status(200).send({
      status: true,
      message: "User Details fetched successfully",
      data: user
    });

  } catch (err) {
    console.log("Error : ", err)
    return res.status(500).send({
      status: false,
      message: err.message || "Internal Server Error.",
    });
  }
}

exports.changeUserStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;
    const adminId = req.user._id; // Assume this is coming from middleware that verifies the admin/user

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'User not found',
      });
    }

    // Update the user's status and record who modified it
    user.status = status;
    user.modifiedBy = adminId;

    // Save the updated user document
    await user.save();

    return res.status(200).json({
      status: true,
      message: `User status updated successfully to ${status} by admin with ID ${adminId}`,
      data: user,
    });

  } catch (error) {
    console.error("Error updating user status:", error);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      })
    }

    const users = await User.find().select("-password")
    if (!users) {
      return res.status(400).send({
        status: false,
        message: "User can't fetched."
      });
    }

    return res.status(200).send({
      status: true,
      message: "Users Details fetched successfully",
      data: users
    });

  } catch (err) {
    console.log("Error : ", err)
    return res.status(500).send({
      status: false,
      message: err.message || "Internal Server Error.",
    });
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      })
    }

    const user = await User.findOne({
      email: email.trim()
    })

    const isValidate = await bcrypt.compare(password, user.password);

    if (!isValidate) {
      return res.status(400).send({
        status: false,
        message: "Password is not valid."
      })
    }

    const data = {
      _id: user._id,
      email: user.email,
      name: user.name,
      mobile: user.mobile,
      role: user.role,
    };
    const token = buildToken(data);

    return res.status(200).send({
      status: true,
      message: "User Authorized",
      token: token
    });
  } catch (err) {
    console.log("Error : ", err)
    return res.status(500).send({
      status: false,
      message: "Internal server error.",
    });
  }
}