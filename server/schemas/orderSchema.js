const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
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
  total: {
    type: String,
  },
  address: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  paymentID: {
    type: "string",
  }
});

module.exports = Order = mongoose.model("order", OrderSchema);
