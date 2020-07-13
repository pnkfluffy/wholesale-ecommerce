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
    .then((products) => res.json(products))
    .catch((error) => {
      console.log(error);
      res.status(500).send("no products found");
    });
});

// @route   GET /products/:id
// @:id     id of product to get
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
