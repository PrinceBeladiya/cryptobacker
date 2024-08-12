const jwt = require("jsonwebtoken")

exports.buildToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.SECRET_KEY);
    return token;
  } catch (err) {
    throw new Error(err);
  }
}