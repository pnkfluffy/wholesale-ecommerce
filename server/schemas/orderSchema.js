const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  products: [
    {
      productId: {
        type: String,
        ref: 'product'
      },
      productName: {
        type: String,
        default: "",
      },
      productPrice: {
        type: Number,
        default: "",
      },
      productQuantity: {
        type: Number,
        default: 0,
      },
      productTotal: {
        type: Number,
        default: 0,
      }
    }
  ],
  total: {
    type: Number,
    default: 0,
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
  representative: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  },
  paymentID: {
    type: 'string',
    default: "",
  },
  bankID: {
    type: 'string',
    default: "",
  },
})

module.exports = Order = mongoose.model('order', OrderSchema)