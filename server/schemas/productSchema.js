const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  priceTiers: {
    default: {
      type: Boolean,
      default: true,
    },
    tiers: [
      {
        price: {
          type: Number,
        },
        ratio: {
          type: Number,
        },
      },
    ],
  },
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
  imageData: [
    {
      bucket: {
        type: String,
      },
      key: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  draft: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Product = mongoose.model("product", ProductSchema);
