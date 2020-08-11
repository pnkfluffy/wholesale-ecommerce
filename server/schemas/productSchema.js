const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  category: {
    type: String,
    default: ""
  },
  price: {
    type: Number,
    default: 100,
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
        type: String,
        default: ""
      },
      quantity: {
        type: Number,
        default: 0
      }
    },
    thc: {
      unit: {
        type: String,
        default: ""
      },
      quantity: {
        type: Number,
        default: 0
      }
    },
    units: {
      unit: {
        type: String,
        default: ""
      },
      quantity: {
        type: Number,
        default: 0
      }
    },
    weight: {
      unit: {
        type: String,
        default: ""
      },
      quantity: {
        type: Number,
        default : 0
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
  deleted: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Product = mongoose.model('product', ProductSchema)
