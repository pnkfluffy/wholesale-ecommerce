const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // priceTiers: {
  //   default: {
  //     type: Boolean,
  //     default: true,
  //   },
  //   tiers: [
  //     {
  //       price: {
  //         type: Number,
  //       },
  //       ratio: {
  //         type: Number,
  //       },
  //     },
  //   ],
  // },
  metaData: {
    cbd: {
      type: Number,
    },
    thc: {
      type: Number,
    },
    units: {
      unit: {
        type: String,
      },
      quantity: {
        type: Number,
      },
    },
    weight: {
      type: Number,
    },
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  imageData: [
    {
      bucket: {
        type: String,
        required: true,
      },
      key: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = Product = mongoose.model("product", ProductSchema);
