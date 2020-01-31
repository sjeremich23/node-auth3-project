const router = require("express").Router();

const Users = require("../models/users");

// @route   GET /api/users
// @desc    Login user
// @access  Private
router.get("/", (req, res) => {
  const { id } = req.token;
  console.log("hi");

  Users.findById(id)
    .then(user => {
      console.log("test");

      if (user) {
        console.log(user);

        Users.findByDepartment(user.department)
          .then(users => {
            res.status(200).json(users);
          })
          .catch(err => {
            res.status(500).json({ err, error: "Error getting users" });
          });
      } else {
        res.status(404).json({ error: "No users found" });
      }
    })
    .catch(err => {
      res.status(500).json({ err, error: "Error getting users" });
    });
});

module.exports = router;
