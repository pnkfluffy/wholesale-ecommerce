const express = require("express");
const router = express.Router();
const User = require("../schemas/userSchema");

router.get("/", (req, res) => {
  console.log(req.query);
  //  {!} WRITE IN A WAY THAT USES URL QUERY PARAMETERS
  //  TO FILTER, SORT RANGE, AND SORT BY FIELDS
  User.find()
    .then((users) => {
      console.log(users);
      res.set("content-range", JSON.stringify(users.length));
      //  each object needs to have an 'id' field in order for
      //  reactAdmin to parse
      users = JSON.parse(JSON.stringify(users).split('"_id":').join('"id":'));
      res.json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("no users found");
    });
});

module.exports = router;
