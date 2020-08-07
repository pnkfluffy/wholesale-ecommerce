const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  userName: {
    type: String,
    default: "",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
  review: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  stars: {
    type: Number,
    default: 5,
  },
  deleted: {
    type: Boolean,
    default: false
  },
});

module.exports = Review = mongoose.model("review", ReviewSchema);
