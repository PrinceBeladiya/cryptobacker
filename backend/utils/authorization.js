const jwt = require('jsonwebtoken');

module.exports = (role) => {
  return (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return res.status(403).send({
          status: false,
          message: "Authentication Failed."
        });
      }
  
      const token = req.headers.authorization.split('Bearer ')[1];
      if (!token) {
        return res.status(403).send({
          status: false,
          message: "Authentication Failed. Token Not valid."
        });
      }
  
      const decode = jwt.verify(token, process.env.SECRET_KEY);
  
      if (!role.includes(decode.role)) {
        return res.status(403).send({
          status: false,
          message: "Authentication Failed. User Not Valid."
        });
      }
  
      req.user = decode;
      next();
    } catch(err) {
      console.log("Error : ", err)
      return res.status(500).send({
        status: false,
        message: "Internal Server Error."
      });
    }
  }
}