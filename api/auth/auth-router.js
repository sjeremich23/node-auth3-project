const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { jwtSecret } = require("../../config/secrets");
const restricted = require("../../middlewares/restricted");
const Users = require("../models/users");

// @route   POST /login
// @desc    Login user
// @access  Private
router.post("/login", restricted, (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user.username);

        res
          .status(200)
          .json({ token, message: `Logged in: Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function getJwtToken(username) {
  const payload = {
    username
  };

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
