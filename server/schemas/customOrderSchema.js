const mongoose = require("mongoose");
const { string } = require("prop-types");
const Schema = mongoose.Schema;

const CustomOrderSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  standardPrice: {
    type: Number
  },
  price: {
    type: Number
  },
  products: [
    {
      product: {
        type: String,
        ref: "product",
      },
      quantity: {
        type: Number,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
})

module.exports = Custom = mongoose.model("custom", CustomOrderSchema);
