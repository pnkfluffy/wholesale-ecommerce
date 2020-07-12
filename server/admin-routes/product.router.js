const express = require("express");
const router = express.Router();

const Product = require("../schemas/productSchema");

// {!}  WRITE REJECTADMINUNAUTHENTICATED AND ADD TO ALL ADMIN ROUTES
// @route   POST /admin-products
// @desc    Posts new product
// @access  Private
router.post("/", (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    priceTiers: req.body.priceTiers,
    metaData: req.body.metaData,
    imageData: req.body.imageData,
    draft: req.body.draft,
  });
  newProduct
    .save()
    .then((product) => res.json(product))
    .catch((err) => console.log(err));
});

// @route   POST /admin-products/edit/:id
// @desc    Edit a product
// @access  Private
router.post("/edit/:id", (req, res) => {
  Product.updateOne({_id: req.user.id}, req.body)
  .then((product) => res.json(product))
  .catch((error) => {
    console.log(error);
    res.status(500).send("error editing product");
  })
});

// @route   DELETE /admin-products/:id
// @id      id of product
// @desc    Delete a Product
// @access  Private
router.delete("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => product.remove().then(() => res.status(200).send("Product sucessfully deleted")))
    // .then((product) => product.remove().then(() => res.json({ success: true })))
    .catch((err) => {
      console.log(err);
      res.status(500).json("Can't delete product");
    })
});

module.exports = router;
