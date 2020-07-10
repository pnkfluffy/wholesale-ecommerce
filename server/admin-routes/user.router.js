const express = require("express");
const router = express.Router();
const User = require("../schemas/userSchema");

router.get("/", (req, res) => {
  console.log("called", req.query);
  console.log("range", req.query.range);
  User.find()
    .then((users) => {
      console.log(users.length);
      res.set("content-range", JSON.stringify(users.length));
      res.json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("no users found");
    });
});

module.exports = router;
