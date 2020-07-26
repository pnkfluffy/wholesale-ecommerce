const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  price: {
    type: Number
  },
  priceTiers: [
    {
      price: {
        type: Number
      },
      quantity: {
        type: Number
      }
    }
  ],
  metaData: {
    cbd: {
      quantity: {
        type: Number
      },
      unit: {
        type: String
      }
    },
    thc: {
      quantity: {
        type: Number
      },
      unit: {
        type: String
      }
    },
    units: {
      quantity: {
        type: Number
      },
      unit: {
        type: String
      }
    },
    weight: {
      quantity: {
        type: Number
      },
      unit: {
        type: String
      }
    }
  },
  imageData: [
    {
      bucket: {
        type: String
      },
      key: {
        type: String
      },
      url: {
        type: String
      }
    }
  ],
  draft: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Product = mongoose.model('product', ProductSchema)
