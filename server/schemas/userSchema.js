const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  googleID: {
    type: String,
    default: null
  },
  //   email: {
  //     type: String,
  //   },
  //   password: {
  //     type: String,
  //   },
  name: {
    type: String
  },
  paymentVerified: {
    type: Boolean,
    default: false
  },
  docusignVerified: {
    type: Boolean,
    default: false
  },
  goCardlessID: {
    type: String
  },
  goCardlessMandate: {
    type: String
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'product'
    }
  ],
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
      },
      quantity: {
        type: Number
      }
    }
  ]
})

module.exports = User = mongoose.model('user', UserSchema)
