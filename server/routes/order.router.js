const express = require("express");
const router = express.Router();

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

// @route   GET /orders/:id
// @:id     id of order to get
// @desc    Returns the order
// @access  Private
router.get("/:id", (req, res) => {
  Order.findById(req.params.id)
    .then((order) => res.json(order))
    .catch((error) => {
      console.log(error);
      res.status(500).send("order not found");
    });
});

//  {!} PAGINATE
// @route   GET /orders/from/:id
// @:id     id of User to get all orders from
// @desc    Returns all users
// @access  Private
router.get("/from/:id", (req, res) => {
  Order.find()
    .then((orders) => {
      const ordersWithId = orders.filter((order) => {
        return order.user.toString() === req.params.id;
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

// @route   POST /orders/newOrder/:userid
// @:id     id of user that's creating the order
// @req     {productID: string}
// @desc    Returns all users
// @access  Private
router.post("/newOrder/:userid", (req, res) => {
  const newOrder = new Order({
    user: req.params.userid,
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
