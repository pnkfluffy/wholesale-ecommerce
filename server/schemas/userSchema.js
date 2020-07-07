const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleID: {
    type: String,
  },
//   isGoogle: {
//     type: Boolean,
//   },
//   email: {
//     type: String,
//   },
//   password: {
//     type: String,
//   },
  name: {
    type: String,
  },
  Verified: {
    type: Boolean,
    default: false,
  },
  docusignVerified: {
    type: Boolean,
    default: false,
  },
  paymentVerified: {
    type: Boolean,
    default: false,
  },
  goCardlessID: {
    type: String,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
