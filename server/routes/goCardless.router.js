const express = require('express')
const router = express.Router()

const User = require('../schemas/userSchema')
const Order = require('../schemas/orderSchema')
const Product = require('../schemas/productSchema')

/*validation*/
const validateDeliverySizes = require('../validation/deliveryValidation')
const USPS = require('usps-webtools')

/*setup goCardless*/
const gocardless = require('gocardless-nodejs')
const constants = require('gocardless-nodejs/constants')

const { confirmOrderEmail } = require('../modules/nodemailer')

const initializeGoCardless = async () => {
	const allClients = await gocardless(
		process.env.GC_ACCESS_TOKEN,
		constants.Environments.Sandbox,
		{ raiseOnIdempotencyConflict: true },
	);

  return allClients
}

// @route   GET /gc/checkClient
// @desc    Returns all clients
// @access  Private
router.get('/checkClientID', async (req, res) => {
	User.findById(req.user._id)
		.then(user => {
			if (user.goCardlessID)
				res.send(true)
			else
				res.send(false)
		})
        .catch(err => {
            console.log(err)
            res.status(500).send('error getting client ID')
        })
});

// @route   GET /gc/checkClient
// @desc    Returns all clients
// @access  Private
router.get('/checkClientMandate', async (req, res) => {
	User.findById(req.user._id)
		.then(user => {
			if (user.goCardlessMandate)
				res.send(true)
			else
				res.send(false)
		})
        .catch(err => {
            console.log(err)
            res.status(500).send('error getting client ID')
        })
});

// @route   GET /gc/clients
// @desc    Returns all clients
// @access  Private
router.get('/clients', async (req, res) => {
  try {
    // Initialize the GoCardLess client.
    const allClients = await initializeGoCardless()
    const listResponse = await allClients.customers.list()
    const customers = listResponse.customers
    res.json({
      success: true,
      customers: customers
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('error getting clients')
  }
})

// @route   GET /gc/oneClient
// @desc    Returns client by id
// @access  Private
router.get('/oneClient', async (req, res) => {
	try {
		const activeUser = await User.findById(req.user._id)
								.catch(err => {
									console.log(err);
									res.status(500).send("Couldn't find user in db")}
								);

		const allClients =  await gocardless(
			process.env.GC_ACCESS_TOKEN,
			// Change this to constants.Environments.Live when you're ready to go live
			constants.Environments.Sandbox,
		);
		const theClient = await allClients.customers.find(activeUser.goCardlessID);
		res.json({
			given_name: theClient.given_name,
			family_name: theClient.family_name,
			company_name: theClient.company_name,
			address_line1: theClient.address_line1,
			address_line2: theClient.address_line2,
			city: theClient.city,
			region: theClient.region,
			postal_code: theClient.postal_code,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send('client not found')
	}
});

// @route   GET /gc/payments
// @desc    Returns all payments
// @access  Private
router.get('/payments', async (req, res) => {
  try {
    // Initialize the GoCardLess client.
    const allClients = await initializeGoCardless()
    const payments = await allClients.payments.list()
    res.send(payments.payments)
  } catch (error) {
    console.log(error)
    res.status(500).send('payments not found')
  }
})

// @route   GET /gc/payments
// @desc    Returns all payments from user
// @access  Private
router.get('/payments/from', async (req, res) => {
  try {
    const allClients = await initializeGoCardless()
    const paymentsList = await allClients.payments.list()
    const payments = paymentsList.payments

    Order.find({ user: req.user._id })
      .then(orders => {
        const paidOrders = orders.filter(order => order.paymentID)
        const userPayments = paidOrders.map(order => {
          	let payment = payments.find(payment => payment.id === order.paymentID);
          	return {
				amount: payment.amount,
				charge_date: payment.charge_date,
				created_at: payment.created_at,
				currency: payment.currency,
				status: payment.status
			}
        })
        res.json(userPayments)
      })
      .catch(error => {
        console.log(error)
        res.status(500).send('Error finding orders')
      })
  } catch (error) {
    console.log(error)
    res.status(500).send('payments not found')
  }
})

// @route   GET /gc/payments
// @desc    Returns all payments from user
// @access  Private
router.get('/payments/onePayment/:orderID', async (req, res) => {
	try {
		const order = await Order.findById(req.params.orderID)
			                     .catch(err => {
			                     		console.log(err);
									 	res.status(500).send('order not found');
								 		})
		const allClients = await initializeGoCardless();
		await allClients.payments.find(order.paymentID)
								 .then(payment => {
									res.json({
										amount: payment.amount,
										charge_date: payment.charge_date,
										created_at: payment.created_at,
										currency: payment.currency,
										status: payment.status
									})
								})
								.catch(err => {
									console.log(err);
									res.status(500).send('payment not found');
								})
	} catch (error) {
		console.log(error)
		res.status(500).send('payment not found')
	}
})

// @route   POST gc/addClient
// @:id		Active User ID
// @desc    Returns URL to confirm client creation
// @access  Private
router.post('/addClient', async (req, res) => {
	const name = req.body.newClientName;
	const lastName = req.body.newClientLastName;
	const email = req.body.newClientEmail;
	const addr = req.body.newClientAddr;
	const city = req.body.newClientCity;
	const postalCode = req.body.newClientPostalCode;

	try {
		// Initialize the GoCardLess allClients.
		const allClients = await initializeGoCardless()

		const redirectFlow = await allClients.redirectFlows.create({
			description: "Cider Barrels",
			session_token: req.user._id.toString(),
			/*(!) TO GO LIVE
			success_redirect_url: "https://wholesale-portal-testing.herokuapp.com/cart",
			 */
			success_redirect_url: "http://localhost:3000/cart",

			prefilled_customer: {
				given_name: name,
				family_name: lastName,
				email: email,
				address_line1: addr,
				city: city,
				postal_code: postalCode
			}
		})

		// The clientId will be saved in the database so It can
		// be used to confirm the changes and
		// be used to get the client information later
		User.findById(req.user._id)
			.then(user => {
				if (!user) {
					console.log("no user with this id");
					res.status(500).send('no user with this id')
				} else {
					user.updateOne({
						$set: { "goCardlessID": redirectFlow.id }
					})
						.then(
							res.json({
								success: true,
								url: redirectFlow.redirect_url
							})
						)
				}
			})
			.catch(err => {
				console.log(err);
				res.status(500).send("error updating database")
			}
			);
	} catch (error) {
		console.log(error);
		res.status(500).send('error creating client')
	}
});

// @route   POST gc/completeRedirect
// @:id		Active User ID
// @desc    Completes the redirect flow from the addUser and adds payment confirmed to database
// @access  Private
router.post('/completeRedirect/', async (req, res) => {
	try {
		console.log("redirect")
		const allClients = await initializeGoCardless();
		//get activeUser from database
		const activeUser = await User.findById(req.user._id)
			.then(user => {
				if (!user) {
					console.log("no user with this id");
					res.status(500).send('no user with this id')
				} else {
					return (user)
				}
			});
		const redirectFlow = await allClients.redirectFlows.complete(
			activeUser.goCardlessID,
			{
				session_token: req.user._id.toString()
			}
		);

		/*save mandate to database*/
		activeUser
			.updateOne({
				$set: {
					"goCardlessMandate": redirectFlow.links.mandate,
					"goCardlessID": redirectFlow.links.customer
				}
			})
			.then(
				res.json({
					success: true,
				}));
	} catch (error) {
		console.log(error);
		res.status(500).send('error completing client')
	}
});

const getTotal = async products => {
	let productsInOrder = [];
	let total = 0;
	let i;
	const size = products.length;
	for (i = 0; i < size; i++) {
		const productInfo = await Product.findById(products[i].product)
			.then(info => {
				return (info)
			})
			.catch(err => console.log(err));
		let price = productInfo.price;
		for (let x = 0; x < productInfo.priceTiers.length; x++) {
			if (products[i].quantity >= productInfo.priceTiers[x].quantity && price > productInfo.priceTiers[x].price) {
				price = productInfo.priceTiers[x].price
			}
		}
		productsInOrder.push({
			productId: productInfo._id,
			productName: productInfo.name,
			productPrice: price,
			productQuantity: products[i].quantity,
			productTotal: price * products[i].quantity,
		})
		total = total + (price * products[i].quantity);
	}
	total = total * 100;
	console.log(total);
	console.log(productsInOrder)
	return {
		total: total,
		productsInOrder: productsInOrder
	};
}

// @route   POST gc/collectPayment/:orderID
// @desc    Collect Payment of active user
// @reqBody Delivery Information
// @access  Private
router.post('/collectPayment', async (req, res) => {
	try {
		//validate delivery input sizes (check if any is empty or if zip is too short or too large)
		const { errors, isValid } = validateDeliverySizes(req.body.delivery);
		if (!isValid) {
			res.status(500).json({ errors: errors });
		} else {
			const delivery = req.body.delivery;
			const host = 'http://production.shippingapis.com/ShippingAPI.dll';
			const userName = "314CBDDY8065";

			const usps = new USPS({
				server: host,
				userId: userName,
				ttl: 10000 //TTL in milliseconds for request
			});

			usps.zipCodeLookup({
				street1: delivery.ClientAddr1,
				street2: delivery.ClientAddr2,
				city: delivery.city,
				state: delivery.state,
				zip: delivery.postal_code
			}, async (err, address) => {
				if (err !== null) {
					res.status(500).send("addr_1");
				}
				else {
					const activeUser = await User.findById(req.user._id)
						.catch(err => console.log(err))
					//get the cart
					const order = activeUser.cart
					//initialize goCardless
					/*(!) TO GO LIVE
                    const allClients =  await gocardless(
                            process.env.GC_LIVE_TOKEN,
                            constants.Environments.Live,
                            { raiseOnIdempotencyConflict: true },
                        );*/
					const allClients =  await gocardless(
						process.env.GC_ACCESS_TOKEN,
						constants.Environments.Sandbox,
						{ raiseOnIdempotencyConflict: true },
					);


					//set proper client currency to payment
					//to go live needs to add other currencies
					const theClient = await allClients.customers.find(activeUser.goCardlessID)
						.catch(err => {
							console.log("GC ID NOT FOUND");
							res.status(500).send("GoCardless ID not found");
							return ;
						})
					const clientCountry = theClient.country_code;
					let currency;
					if (clientCountry === "US")
						currency = "USD";
					else if (clientCountry === "GB")
						currency = "GBP";

					//do all the math to get total
					//to go live needs all values to come with ,00 after the value
					//or add a double zero to the total because of goCardless
					const totalInfo = await getTotal(order)
						.then(total => { return (total) })
						.catch(err => {
							console.log("Couldn't get total");
							res.status(500).send("We were unable to calculate your total");
							return ;
						})
					const total = totalInfo.total;
					const productsInOrder = totalInfo.productsInOrder;
					console.log(productsInOrder)
					//create new order in db
					const newOrder = new Order({
						user: req.user._id,
						products: productsInOrder,
						deliveryInfo: req.body.delivery,
						total: total
					});
					await newOrder.save().catch((err) => console.log(err));
					console.log(newOrder);
					const payment = await allClients.payments.create(
						{
							amount: newOrder.total,
							currency: currency,
							links: {
								//getting the mandate from database
								mandate: activeUser.goCardlessMandate
							},
							metadata: {
								invoice_number: "001"
							}
						},
						//Idempotency-Key is going to be the order _id generated by mongoDB
						//This guarantees that the order won't be charged twice
						newOrder._id.toString()
					).then(payment => {
						newOrder.updateOne({ $set: { "paymentID": payment.id } })
							.then(() => {
								//Clean the cart in db
								User.updateOne(
									{ _id: req.user._id },
									{ cart: [] })
									.catch(err => {
										console.log("couldn't clean cart")
										res.status(500).send("Couldn't clean your cart, but payment was processed!")
									})
								console.log(payment);
								confirmOrderEmail(req.user, newOrder, payment)
								//send order and payment information so can redirect to order's page
								res.json({
									order: newOrder,
									payment: payment
								})
							})
							.catch(err => {
								console.log(`Can't Update Database: ${err}`);
								res.status(500).send("Your payment is done! But we couldn't connect to our database, contact us");
							})
					}).catch(err => {
						console.log(err);
						res.status(500).send("Couldn't make payment")
					})
				}
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("error making payment")
	}
});

// @route   POST gc/editPayment/:orderID
// @desc    Cancel or Retry payment
// @req		{type: "cancel"} or {type: "retry"}
// @access  Private
router.post('/changePayment/:orderID', async (req, res) => {
	try {
		//check validation
		const allClients = await initializeGoCardless();

		//get all the order information from DB
		const order = await Order.findById(req.params.orderID)
			.then(order => {
				if (!order) {
					console.log("order not found");
					res.status(500).send('no order with this id')
				} else {
					return (order)
				}
			})

		if (req.body.type === "cancel") {
			const cancelPayment = await allClients.payments.cancel(order.paymentID);
			console.log(`Cancel Payment Status: ${cancelPayment.status}`);
		} else {
			const retryPayment = await allClients.payments.retry(order.paymentID)
			console.log(`Retry Payment Status: ${retryPayment.status}`);
		}
		res.json({
			success: true
		});
	} catch (error) {
		console.log(error);
		res.status(500).send('error editing payment');
	}
});

module.exports = router;