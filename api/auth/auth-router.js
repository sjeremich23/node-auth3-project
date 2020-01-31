const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");

const validateLogin = require("../../middlewares/validateLogin");

// @route   POST /api/auth/register
// @desc    Login user
// @access  Public
router.post("/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", validateLogin, (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user);

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

function getJwtToken(user) {
  const payload = {
    username: user.username,
    id: user.id
  };

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
