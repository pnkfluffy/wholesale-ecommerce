const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	googleID: {
		type: String,
	},
	name: {
		type: String
	},
	paymentVerified: {
		type: Boolean,
		default: false
	},
	goCardlessID: {
		type: String,
	},
});

module.exports = User = mongoose.model("user", UserSchema);