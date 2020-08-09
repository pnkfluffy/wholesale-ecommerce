const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const CustomOrderSchema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: "admin"
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
    }
  })

  module.exports = Custom = mongoose.model("custom", CustomOrderSchema);
