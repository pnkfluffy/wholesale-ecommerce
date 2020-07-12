const express = require("express");
const router = express.Router();
// {!} ADD REJECTUNAUTHENTICATED MIDDLEWARE TO ALL PRIVATE ROUTES
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

const Product = require("../schemas/productSchema");

//  {!} PAGINATE
// @route   GET /products/all
// @desc    Returns all products
// @access  Private
router.get("/all", (req, res) => {
  Product.find()
    .then((orders) => res.json(orders))
    .catch((error) => {
      console.log(error);
      res.status(500).send("no products found");
    });
});

// @route   GET /products/from/:category
// @desc    Returns all itens from a category
// @access  Private
router.get("/products/from/:category", (req, res) => {
    Product.find({category: this.params.category})
        .then(items => {
            console.log(items);
            res.json(items);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("can't find any items in category");
        });
})

// @route   GET /products/categories
// @desc    Returns all types of categories
// @access  Private
router.get("/categories", (req, res) => {
    Product.distinct("category")
        .then(categories => {
            console.log(categories);
            res.json(categories)
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("can't find categories");
        });
})

// @route   GET /products/:id
// @:id     id of order to get
// @desc    Returns the order
// @access  Private
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((error) => {
      console.log(error);
      res.status(500).send("product not found");
    });
})

module.exports = router;
