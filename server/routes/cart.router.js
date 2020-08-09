const express = require('express')
const router = express.Router()
const User = require('../schemas/userSchema')
const Product = require('../schemas/productSchema')

const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.get('/', rejectUnauthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      res.status(404).send('no user')
      return
    }
    const cart = user.cart
    let cartProductInfo = []
    for (let i = 0; i < cart.length; i++) {
      const productInfo = await Product.findById(cart[i].product)
        .then(info => {
          if (!info) {
            res.status(404).send('Cannot find product.')
            return
          }
          const relavent = info._doc
          return {
            ...relavent,
            product: relavent._id,
            quantity: cart[i].quantity,
            available: true
          }
        })
        .catch(err => {
          // console.log(err)
          res.status(500).send(err)
        })
      cartProductInfo.push(productInfo)
    }
    res.send(cartProductInfo)
  } catch (error) {
    // console.log(error)
    res.status(500).send('error updating cart')
  }
})

router.post('/', rejectUnauthenticated, async (req, res) => {
  try {
    // // console.log(req.body.cart)
    // // console.log(req.user._id)
    req.body.cart.forEach(cartItem => {
      if (cartItem.quantity > 5000) {
        res.send('order over maximum quantity')
        return
      }
    })

    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        cart: req.body.cart
      }
    )
    res.json(user.cart)
  } catch (error) {
    // console.log(error)
    res.status(500).send('error updating cart')
  }
})

module.exports = router
