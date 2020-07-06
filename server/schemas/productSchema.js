const mongoose = require("mongoose");
const { schema } = require("./userSchema");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    creation_date: {
        type: Date,
        default: Date.now
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
    ]
})

module.exports = Product = mongoose.model("product", ProductSchema);