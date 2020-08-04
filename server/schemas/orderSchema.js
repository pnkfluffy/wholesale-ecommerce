const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  products: [
    {
      productId: {
        type: String,
        ref: 'product'
      },
      productName: {
        type: String
      },
      productPrice: {
        type: Number
      },
      productQuantity: {
        type: Number
      },
      productTotal: {
        type: Number
      },
      unitPrice: {
        type: Number
      },
    }
  ],
  total: {
    type: Number
  },
  tracking: {
    number: {
      type: String,
      default: '',
    },
    company: {
      type: String,
      default: '',
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