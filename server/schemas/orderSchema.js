const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  products: [
    {
      product: {
        type: String,
        ref: 'product'
      },
      quantity: {
        type: Number
      }
    }
  ],
  total: {
    type: Number
  },
  tracking: {
    number: {
      type: String
    },
    service: {
      type: String
    }
  },
  deliveryInfo: {
    type: Object
  },
  date: {
    type: Date,
    default: Date.now
  },
  paymentID: {
    type: 'string'
  }
})

module.exports = Order = mongoose.model('order', OrderSchema)
