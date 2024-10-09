const Admin = require("../model/admin.model")
const bcrypt = require("bcrypt");
const { buildToken } = require("../utils/token");
const { sendSubAdminEmail } = require("../utils/mailer")

exports.signup = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    if (!name || !mobile || !email || !password) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      })
    }

    if (name.length > 0 && (/^[a-z ,.'-]+$/i).test(name)) {
      if (mobile.length === 10 && (/^\d{10}$/).test(mobile)) {
        if (email.length > 0 && (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email)) {
          if (!((/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).test(password))) {
            return res.status(400).send({
              status: false,
              message: "Password not valid. It should contain length of 6-16 characters and 1 special character along with 1 number."
            })
          }
        } else {
          return res.status(400).send({
            status: false,
            message: "Email id is not valid"
          })
        }
      } else {
        return res.status(400).send({
          status: false,
          message: "Mobile number should be 10 digits"
        })
      }
    } else {
      return res.status(400).send({
        status: false,
        message: "Name should be in alphabets"
      })
    }

    // validation complete and valid
    const userExist = await Admin.exists({
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
      return res.status(400).send({
        status: false,
        message: "Email or Mobile no. already registered"
      })
    }

    const user = new Admin({
      name,
      mobile,
      email,
      password
    });

    await user.save();

    return res.status(200).send({
      status: true,
      message: "Admin registered successfully",
      data: user
    });

  } catch (err) {
    if (req.file && req.file.path) {
      console.log("Error : ", err)
    }

    return res.status(500).send({
      status: false,
      message: err.message || "Internal Server Error.",
    });
  }
}

exports.addSubAdmin = async (req, res) => {
  try {
    // Check if the user is authenticated
    if (!req.user) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      });
    }

    // Fetch the authenticated user's details
    const user = await Admin.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(400).send({
        status: false,
        message: "Admin Does Not Exist."
      });
    }

    // Check if the user is a superadmin
    if (user.adminType !== 0) {
      return res.status(403).send({
        status: false,
        message: "Access Denied. Only Superadmin can add sub-admins."
      });
    }

    // Check if all required details are provided
    const { name, email, mobile, password, role } = req.body;
    if (!name || !email || !mobile || !password || typeof role === 'undefined') {
      return res.status(400).send({
        status: false,
        message: "Please provide all required fields (name, email, mobile, adminType)."
      });
    }

    const existingAdmin = await Admin.findOne({
      $or: [
        {
          email: email.trim()
        },
        {
          mobile: mobile.trim()
        },
      ]
    });
    if (existingAdmin) {
      return res.status(400).send({
        status: false,
        message: "Admin with this email or mobile no. already exists."
      });
    }

    // Create a new sub-admin
    const newSubAdmin = new Admin({
      name,
      email,
      mobile,
      password,
      adminType: role,
      createdBy: user._id // Optionally, track who created the sub-admin
    });

    // Save the new sub-admin to the database
    await newSubAdmin.save();

    await sendSubAdminEmail({
      name,
      email,
      mobile,
      password,
      adminType: Number(role)
    })

    return res.status(201).send({
      status: true,
      message: "Sub-Admin added successfully",
      data: newSubAdmin
    });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).send({
      status: false,
      message: err.message || "Internal Server Error.",
    });
  }
};

exports.getAdmin = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      })
    }

    const user = await Admin.findById(req.user._id).select("-password")
    if (!user) {
      return res.status(400).send({
        status: false,
        message: "Admin Does Not Exists."
      });
    }

    return res.status(200).send({
      status: true,
      message: "Admin Details fetched successfully",
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

exports.getAdminById = async (req, res) => {
  try {
    const { ID } = req.body;

    if (!ID) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      })
    }

    const user = await Admin.findById(ID).select("-password")
    if (!user) {
      return res.status(400).send({
        status: false,
        message: "Admin Does Not Exists."
      });
    }

    return res.status(200).send({
      status: true,
      message: "Admin Details fetched successfully",
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

exports.getAllAdmins = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      })
    }

    const users = await Admin.find().select("-password")
    if (!users) {
      return res.status(400).send({
        status: false,
        message: "Admin can't fetched."
      });
    }

    return res.status(200).send({
      status: true,
      message: "Admin Details fetched successfully",
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

    const user = await Admin.findOne({
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
      message: "Admin Authorized",
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