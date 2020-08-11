const express = require('express')
const router = express.Router()
// {!} ADD REJECTUNAUTHENTICATED MIDDLEWARE TO ALL PRIVATE ROUTES
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware')
const Order = require('../schemas/orderSchema')
const Product = require('../schemas/productSchema')
const Custom = require('../schemas/customOrderSchema')
const { route } = require('../admin-routes/admin-custom.router')

// @route   GET /orders/:orderId
// @desc    Returns the order
// @access  Private
router.get('/oneOrder/:orderId', rejectUnauthenticated, (req, res) => {
  Order.findById({_id: req.params.orderId, user: req.user._id}, { user: 0, paymentID: 0, representative: 0 })
    .then(order => res.json(order))
    .catch(error => {
      // console.log(error)
      res.status(500).send('order not found')
    })
})

router.get('/custom', rejectUnauthenticated, (req, res) => {
  try{
    Custom.find({user: req.user._id, active: true})
    .then(customs => {
      return res.json(customs)
    })
  }
  catch{
    res.status(500).send("Error finding custom orders")
  }
})

// @route   GET /orders/from/
// @desc    Returns all orders from user
// @access  Private
router.get('/from', rejectUnauthenticated, (req, res) => {
  Order.find({ user: req.user._id }, { user: 0, paymentID: 0, representative: 0 })
    .then(orders =>{
        res.json(orders)
    })
    .catch(error => {
      // console.log(error)
      res.status(500).send('Error finding orders')
    })
})

//@route POST /orders/generateInvoice
// router.get('/generateInvoice', (req, res) => {

// })

module.exports = router
