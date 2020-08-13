const express = require('express')
const router = express.Router()
// {!} ADD REJECTUNAUTHENTICATED MIDDLEWARE TO ALL PRIVATE ROUTES
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware')

const Product = require('../schemas/productSchema')

//  {!} PAGINATE
// @route   GET /products/all
// @desc    Returns all products
// @access  Private
router.get('/all', rejectUnauthenticated, (req, res) => {
  Product.find({draft: false, deleted: false}, {forUser: 0})
    .then(products => res.json(products))
    .catch(error => {
      // console.log(error)
      res.status(500).send('no products found')
    })
})

// @route   GET /products/categories
// @desc    Returns all types of categories
// @access  Private
router.get("/categories", rejectUnauthenticated, (req, res) => {
    Product.distinct("category")
        .then(categories => {
            // console.log(categories);
            res.json(categories)
        })
        .catch((error) => {
            // console.log(error);
            res.status(500).send("can't find categories");
        });
})

// @route   GET /products/:id
// @:id     id of product to get
// @desc    Returns the order
// @access  Private
router.get('/:id', rejectUnauthenticated, (req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(error => {
      // console.log(error)
      res.status(500).send('product not found')
    })
})


module.exports = router;
