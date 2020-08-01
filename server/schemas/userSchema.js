const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  // googleID: {
  //   type: String,
  //   default: null
  // },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
  },
  isOwner: {
    type: Boolean,
    default: false,
    required: true
  },
  name: {
    type: String
  },
  paymentVerified: {
    type: Boolean,
    default: false
  },
  // docusignVerified: {
  //   type: Boolean,
  //   default: false
  // },
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
  ],
  associatedAdmin: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

module.exports = User = mongoose.model('user', UserSchema)
