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
      unit: {
        type: String
      },
      quantity: {
        type: Number
      }
    },
    thc: {
      unit: {
        type: String
      },
      quantity: {
        type: Number
      }
    },
    units: {
      unit: {
        type: String
      },
      quantity: {
        type: Number
      }
    },
    weight: {
      unit: {
        type: String
      },
      quantity: {
        type: Number
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
