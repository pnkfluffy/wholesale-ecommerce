const express = require('express')
const router = express.Router()
const User = require('../schemas/userSchema')
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware')

const updateTotal = async products => {
  let total = 0
  let i
  const size = products.length
  for (i = 0; i < size; i++) {
    const productInfo = await Product.findById(products[i].product)
      .then(info => {
        return info
      })
      .catch(err => console.log(err))
    total = total + productInfo.price * products[i].quantity
  }
  return total
}

router.get('/', rejectUnauthenticated, async (req, res) => {
  let cart = req.user.cart
  res.send(cart)
})

router.post('/', rejectUnauthenticated, async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.user.id },
      {
        cart: req.body.cart
      }
    )
    console.log(user)
    res.status(200).send(user.cart)
  } catch (error) {
    console.log(error)
    res.status(500).send('error updating cart')
  }
})

module.exports = router
