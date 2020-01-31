const router = require("express").Router();

const Users = require("../models/users");

router.get("/users", (req, res) => {
  const { id } = req.decodedToken;

  Users.findById(id)
    .then(user => {
      if (user) {
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
