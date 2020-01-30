const jwt = require("jsonwebtoken");
require("dotenv").config();

const { jwtSecret } = require("../config/secrets");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    jwt.verify(authorization, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ you: "shall not pass!" });
      } else {
        req.token = decodedToken;

        next();
      }
    });
  } else {
    res.status(401).json({ message: "Please login and try again" });
  }
};
