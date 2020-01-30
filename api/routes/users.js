const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../models/users");

// @route   POST /api/register
// @desc    Register new user
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

module.exports = router;
