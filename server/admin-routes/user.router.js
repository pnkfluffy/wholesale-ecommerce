const express = require("express");
const router = express.Router();
const User = require('../schemas/userSchema')

router.get('/', (req, res) => {
	console.log("called");
	let user = {
		name: req.user.name
	}
	res.send(user)
})


module.exports = router;