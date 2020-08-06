const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  userName: {
    type: String
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
  review: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  stars: {
    type: Number
  },
  deleted: {
    type: Boolean,
    default: false
  },
});

module.exports = Review = mongoose.model("review", ReviewSchema);
