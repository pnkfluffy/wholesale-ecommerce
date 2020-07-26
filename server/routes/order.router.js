const express = require('express')
const router = express.Router()
const async = require('async')
// {!} ADD REJECTUNAUTHENTICATED MIDDLEWARE TO ALL PRIVATE ROUTES
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware')
const Order = require('../schemas/orderSchema')
const Product = require('../schemas/productSchema')

// @route   GET /orders/:orderId
// @desc    Returns the order
// @access  Private
router.get('/oneOrder/:orderId', (req, res) => {
  Order.findById(req.params.orderId)
    .then(order => res.json(order))
    .catch(error => {
      console.log(error)
      res.status(500).send('order not found')
    })
})

// @route   GET /orders/from/
// @desc    Returns all orders from user
// @access  Private
router.get('/from', (req, res) => {
  Order.find({ user: req.user._id })
    .then(orders => {
        res.json(orders)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send('Error finding orders')
    })
})

//@route POST /orders/generateInvoice
router.get('/generateInvoice', (req, res) => {

})

module.exports = router
