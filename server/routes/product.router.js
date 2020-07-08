const express = require("express");
const router = express.Router();

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

// @route   GET /productss/:id
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
});

// @route   POST /products
// @:id     id of user that's creating the order
// @req     {productID: string}
// @desc    Returns all users
// @access  Private
router.post("/", (req, res) => {
  const newOrder = new Order({
    user: req.params.id,
    products: [
      {
        product: req.body.productID,
        quantity: 1,
      },
    ],
  });
  newOrder
    .save()
    .then((order) => res.json(order))
    .catch((err) => console.log(err));
});

// @route   POST /orders/addProduct/:id
// @:id     order ID
// @req     {productID: string}
// @desc    Returns all users
// @access  Private
router.post("/addProduct/:id", (req, res) => {
  Order.findById(req.params.id).then((order) => {
    let products = order.products;
    //check if product is already in the order
    const alreadyInOrder = products.findIndex(
      (product) => product.product.toString() === req.body.productID
    );
    if (alreadyInOrder >= 0) {
      products[alreadyInOrder].quantity = products[alreadyInOrder].quantity + 1;
    } else {
      products.push({
        product: req.body.productID,
        quantity: 1,
      });
    }
    order
      .updateOne({ products: products })
      .then(res.json({ success: true, order: order }))
      .catch((error) => {
        console.log(error);
        res.status(500).send("Couldn't add product");
      });
  });
});

// @route   DELETE /orders/:id
// @id      id of order
// @desc    Delete an Order
// @access  Private
router.delete("/:id", (req, res) => {
  Order.findById(req.params.id)
    .then((order) => order.remove().then(() => res.json({ success: true })))
    .catch((err) => {
      console.log(err);
      res.status(500).json("Can't delete order");
    });
});

// @route   DELETE /orders/deleteInQuantity/:id
// @id      id of order
// @req     {productID: product ID}
// @desc    Decreases the quantity of a product in the order
// @access  Private
router.delete("/deleteInQuantity/:id", (req, res) => {
  Order.findById(req.params.id)
    .then((order) => {
      let products = order.products;
      console.log(products);
      //check if product is in the order
      const alreadyInOrder = products.findIndex(
        (product) => product.product.toString() === req.body.productID
      );
      if (alreadyInOrder >= 0) {
        if (products[alreadyInOrder].quantity > 1)
          products[alreadyInOrder].quantity =
            products[alreadyInOrder].quantity - 1;
        else {
          products = products.filter((product) => {
            return product.product != req.body.productID;
          });
        }
      } else {
        res.status(500).send("Product not found");
      }
      order
        .updateOne({ products: products })
        .then(
          res.json({
            success: true,
            order: {},
          })
        )
        .catch((error) => {
          console.log(error);
          res.status(500).send("Couldn't add product");
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Couldn't find order");
    });
});

// @route   DELETE /orders/deleteWholeProduct/:id
// @id      id of order
// @req     {productID: product ID}
// @desc    Removes all itens from that type from order
// @access  Private
router.delete("/deleteWholeProduct/:id", (req, res) => {
  Order.findById(req.params.id).then((order) => {
    let products = order.products;

    products = products.filter((product) => {
      return product.product != req.body.productID;
    });

    order
      .updateOne({ products: products })
      .then(
        res.json({
          success: true,
          order: order,
        })
      )
      .catch((error) => {
        console.log(error);
        res.status(500).send("Couldn't delete product");
      });
  });
});

module.exports = router;
