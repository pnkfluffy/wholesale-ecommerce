const express = require("express");
const router = express.Router();
const async = require("async");
// {!} ADD REJECTUNAUTHENTICATED MIDDLEWARE TO ALL PRIVATE ROUTES
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const Order = require("../schemas/orderSchema");
const Product = require("../schemas/productSchema");

const updateTotal = async products => {
    let total = 0;
    let i;
    const size = products.length;
    for (i = 0; i < size; i++) {
        const productInfo = await Product.findById(products[i].product)
            .then(info => {
                return (info)
            })
            .catch(err => console.log(err));
        total = total + (productInfo.price * products[i].quantity);
    }
    return (total);
}

// @route   GET /orders/all/:page_size/:page_num
// @:page_size size of return
// @:page_num number of return
// @desc    Returns all orders
// @access  Private
router.get("/all/:page_size/:page_num/", (req, res) => {
    const skips = req.params.page_size * (req.params.page_num - 1);
    console.log(req.params.page_size);

    Order.find().skip(skips).limit(parseInt(req.params.page_size, 10))
        .then((orders) => res.json(orders))
        .catch((error) => {
            console.log(error);
            res.status(500).send("no orders found");
        });
});

// @route   GET /orders/openOrder/
// @desc    Returns the open order from user id
// @access  Private
router.get("/openOrder", (req, res) => {
    Order.find({user: req.user._id})
        .then(orders => {
            let openOrder = orders.filter(order => {
                return !order.paymentID;
            })
            res.json({
                success: true,
                order: openOrder[0]
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("");
        });
});

// @route   GET /orders/:orderId
// @desc    Returns the order
// @access  Private
router.get("/oneOrder/:orderId", (req, res) => {
    Order.findById(req.params.orderId)
        .then((order) => res.json(order))
        .catch((error) => {
            console.log(error);
            res.status(500).send("order not found");
        });
});

// @route   GET /orders/from/
// @desc    Returns all orders from user
// @access  Private
router.get("/from/:id/:page_size/:page_num", (req, res) => {
    const skips = req.params.page_size * (req.params.page_num - 1);

    Order.find({user: req.params.id}).skip(skips).limit(parseInt(req.params.page_size, 10))
        .then(orders => {
            res.json({
                success: true,
                orders: orders,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Error finding orders");
        });
});

// @route   POST /orders/newOrder/
// @desc    Returns a new Order with selected product
// @access  Private
router.post("/newOrder/:productID", async (req, res) => {
    const userID = req.user._id
    const products = [{
        product: req.params.productID,
        quantity: 1
    }];

    //Checks new total based on new array of products
    const total = await updateTotal(products)
        .then(total => {return(total)})
        .catch(err => console.log(err));

    const newOrder = new Order({
        user: userID,
        products: products,
        total: total
    });
    newOrder
        .save()
        .then((order) => res.json(order))
        .catch((err) => console.log(err));
});

// @route   POST /orders/addProduct/
// @desc    Returns all users
// @access  Private
router.post("/addProduct/:orderID", (req, res) => {
    Order.findById(req.params.orderID).then(async (order) => {
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
        //Checks new total based on new array of products
        const total = await updateTotal(products)
            .then(total => {return(total)})
            .catch(err => console.log(err));

        order
            .updateOne({  products: products,
                total: total })
            .then(res.json({
                    _id: order._id,
                    user: order.user,
                    products: products,
                    total: total,
                    date: order.date,
                    __v: order.__v
                }
            ))
            .catch((error) => {
                console.log(error);
                res.status(500).send("Couldn't add product");
            });
    });
});

// @route   DELETE /orders/
// @desc    Delete an Order
// @access  Private
router.delete("/:orderID", (req, res) => {
    Order.findById(req.params.orderID)
        .then((order) => order.remove().then(() => res.json({ success: true })))
        .catch((err) => {
            console.log(err);
            res.status(500).json("Can't delete order");
        });
});

// @route   DELETE /orders/deleteInQuantity/:orderID
// @desc    Decreases the quantity of a product in the order
// @access  Private
router.delete("/deleteInQuantity/:orderID", (req, res) => {
    try {
        Order.findById(req.params.orderID)
            .then(async (order) => {
                let products = order.products;
                //check if product is in the order
                const alreadyInOrder = products.findIndex(
                    (product) => product.product.toString() === req.body.productID
                );
                if (alreadyInOrder >= 0) {
                    if (products[alreadyInOrder].quantity > 1) {
                        products[alreadyInOrder].quantity = products[alreadyInOrder].quantity - 1;
                    } else {
                        products = products.filter((product) => {
                            return product.product != req.body.productID;
                        });
                        console.log(products);
                    }
                } else {
                    console.log("Product not found");
                }
                //Checks new total based on new array of products
                const total = await updateTotal(products)
                    .then(total => {return(total)})
                    .catch(err => console.log(err));

                order
                    .updateOne({ $set: {"products": products,
                            "total": total}})
                    .then(() => {
                        res.json({
                            _id: order._id,
                            user: order.user,
                            products: products,
                            total: total,
                            date: order.date,
                            __v: order.__v
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).send("Couldn't remove product");
                    });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send("Couldn't find order");
            });
    } catch (error) {
        console.log(error);
        res.status(500).send('error deleting item')
    }
});

// @route   DELETE /orders/deleteWholeProduct/
// @req     {productID: product ID}
// @desc    Removes all itens from that type from order
// @access  Private
router.delete("/deleteWholeProduct/:orderID", (req, res) => {
    Order.findById(req.params.orderID).then(async (order) => {
        let products = order.products;

        products = products.filter((product) => {
            return product.product != req.body.productID;
        });

        //Checks new total based on new array of products
        const total = await updateTotal(products)
            .then(total => {return(total)})
            .catch(err => console.log(err));

        order
            .updateOne({ $set: {"products": products, "total": total }})
            .then(
                res.json({
                    success: true,
                    order: {
                        _id: order._id,
                        user: order.user,
                        products: products,
                        total: total,
                        date: order.date,
                        __v: order.__v
                    },
                })
            )
            .catch((error) => {
                console.log(error);
                res.status(500).send("Couldn't delete product");
            });
    });
});

module.exports = router;