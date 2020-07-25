const express = require('express')
const router = express.Router()
const User = require('../schemas/userSchema')
const Product = require('../schemas/productSchema')

const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware')

router.get('/', rejectUnauthenticated, async (req, res) => {
  try {
    let cart = req.user.cart
    let cartProductInfo = []
    for (let i = 0; i < cart.length; i++) {
      const productInfo = await Product.findById(cart[i].product)
        .then(info => {
          //  means nothing found
          if (!info) return
          const relavent = info._doc
          return {
            ...relavent,
            product: relavent._id,
            quantity: cart[i].quantity
          }
        })
        .catch(err => console.log(err))
      cartProductInfo.push(productInfo)
    }
    res.send(cartProductInfo)
  } catch (error) {
    console.log(error)
    res.status(500).send('error updating cart')
  }
})

router.post('/', rejectUnauthenticated, async (req, res) => {
  try {
    console.log(req.body.cart);
    const user = await User.updateOne(
      { _id: req.user.id },
      {
        cart: req.body.cart
      }
    )
    res.status(200).send(user.cart)
  } catch (error) {
    console.log(error)
    res.status(500).send('error updating cart')
  }
})

module.exports = router
