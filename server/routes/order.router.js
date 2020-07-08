const express = require("express");
const router = express.Router();
// {!} ADD REJECTUNAUTHENTICATED MIDDLEWARE TO ALL PRIVATE ROUTES
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const Order = require("../schemas/orderSchema");

//  {!} PAGINATE
// @route   GET /orders/all
// @desc    Returns all orders
// @access  Private
router.get("/all", (req, res) => {
  Order.find()
    .then((orders) => res.json(orders))
    .catch((error) => {
      console.log(error);
      res.status(500).send("no orders found");
    });
});

// @route   GET /orders/
// @desc    Returns the order
// @access  Private
router.get("/", (req, res) => {
  Order.findById(req.user.id)
    .then((order) => res.json(order))
    .catch((error) => {
      console.log(error);
      res.status(500).send("order not found");
    });
});

//  {!} PAGINATE
// @route   GET /orders/from/
// @desc    Returns all users
// @access  Private
router.get("/from/:id", (req, res) => {
  Order.find()
    .then((orders) => {
      const ordersWithId = orders.filter((order) => {
        return order.user.toString() === req.user.id;
      });

      res.json({
        success: true,
        orders: ordersWithId,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error finding orders");
    });
});

// @route   POST /orders/newOrder/
// @desc    Returns all users
// @access  Private
router.post("/newOrder/", (req, res) => {
  const newOrder = new Order({
    user: req.user.id,
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

// @route   POST /orders/addProduct/
// @desc    Returns all users
// @access  Private
router.post("/addProduct/", (req, res) => {
  Order.findById(req.user.id).then((order) => {
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

// @route   DELETE /orders/
// @desc    Delete an Order
// @access  Private
router.delete("/", (req, res) => {
  Order.findById(req.user.id)
    .then((order) => order.remove().then(() => res.json({ success: true })))
    .catch((err) => {
      console.log(err);
      res.status(500).json("Can't delete order");
    });
});

// @route   DELETE /orders/deleteInQuantity/
// @desc    Decreases the quantity of a product in the order
// @access  Private
router.delete("/deleteInQuantity/", (req, res) => {
  Order.findById(req.user.id)
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

// @route   DELETE /orders/deleteWholeProduct/
// @req     {productID: product ID}
// @desc    Removes all itens from that type from order
// @access  Private
router.delete("/deleteWholeProduct/", (req, res) => {
  Order.findById(req.user.id).then((order) => {
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
