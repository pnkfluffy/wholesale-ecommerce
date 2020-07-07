const express = require("express");
const router = express.Router();

const User = require('../schemas/userSchema');
const Order = require('../schemas/orderSchema');

/*setup goCardless*/
const gocardless = require("gocardless-nodejs");
const constants = require("gocardless-nodejs/constants");

// @route   GET /gc/clients
// @desc    Returns all clients
// @access  Private
router.get('/clients', async (req, res) => {
	try {
		// Initialize the GoCardLess client.
		const allClients = await gocardless(
			process.env.GC_ACCESS_TOKEN,
			// Change this to constants.Environments.Live when you're ready to go live
			constants.Environments.Sandbox,
			{ raiseOnIdempotencyConflict: true },
		);
		const listResponse = await allClients.customers.list();
		const customers = listResponse.customers;
		res.json({
			success:true,
			customers: customers
		});
	} catch (error) {
		console.log(error);
		res.status(500).send('error getting clients')
	}
});

// @route   GET /gc/clients/:id
// @:id		User ID that you want to find
// @desc    Returns client by id
// @access  Private
router.get('/clients/:id', async (req, res) => {
	try {
		// Initialize the GoCardLess client.
		const allClients = await gocardless(
			process.env.GC_ACCESS_TOKEN,
			// Change this to constants.Environments.Live when you're ready to go live
			constants.Environments.Sandbox,
			{ raiseOnIdempotencyConflict: true },
		);
		const listResponse = await allClients.customers.list();
		const customers = listResponse.customers;
		const theClient = customers.find(id => id.id === req.params.id);
		res.json({
			success:true,
			customers: theClient
		});
	} catch (error) {
		console.log(error);
		res.status(500).send('user not found')
	}
});

// @route   GET /gc/payments
// @:date	Limit to records created on or after the specified date-time.
// @desc    Returns all payments
// @access  Private
router.get('/payments/:date', async (req, res) => {
	try {
		// Initialize the GoCardLess client.
		const allClients = await gocardless(
			process.env.GC_ACCESS_TOKEN,
			// Change this to constants.Environments.Live when you're ready to go live
			constants.Environments.Sandbox,
			{ raiseOnIdempotencyConflict: true },
		);

		// List all payments past a certain date.
		const payments = await allClients.payments.list({
			created_at: {
				gt: req.params.date
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send('user not found')
	}
});

// @route   POST gc/addClient
// @:id		Active User ID
// @desc    Create a new user
// @access  Private
router.post('/addClient/:id', async (req, res) => {
	const name = req.body.newClientName;
	const lastName = req.body.newClientLastName;
	const email = req.body.newClientEmail;
	const addr = req.body.newClientAddr;
	const city = req.body.newClientCity;
	const postalCode = req.body.newClientPostalCode;

	try {
		// Initialize the GoCardLess allClients.
		const allClients = await gocardless(
			process.env.GC_ACCESS_TOKEN,
			// Change this to constants.Environments.Live when you're ready to go live
			constants.Environments.Sandbox,
			{ raiseOnIdempotencyConflict: true },
		);

		const redirectFlow = await allClients.redirectFlows.create({
			description: "Cider Barrels",
			//to go live we need to have a token generator for each client
			session_token: "dummy_session_token",
			success_redirect_url: "https://developer.gocardless.com/example-redirect-uri/",

			prefilled_customer: {
				given_name: name,
				family_name: lastName,
				email: email,
				address_line1: addr,
				city: city,
				postal_code: postalCode
			}
		});

		// The clientId will be saved in the database so It can
		// be used to confirm the changes and
		// be used to get the client information later
		const activeUser = await User.findById(req.params.id)
			  						 .then(user => {
										if (!user) {
											console.log("no user with this id");
											res.status(500).send('no user with this id')
										} else {
											user.updateOne({
												goCardlessID: redirectFlow.id
											})
										}
										});
		res.json({
			success:true,
			url: redirectFlow.redirect_url
		});
	} catch (error) {
		console.log(error);
		res.status(500).send('error creating client')
	}
});

// @route   POST gc/completeRedirect
// @:id		Active User ID
// @desc    Completes the redirect flow from the addUser and adds payment confirmed to database
// @access  Private
router.post('/completeRedirect/:id', async (req, res) => {
	try {
		const allClients = await gocardless(
			process.env.GC_ACCESS_TOKEN,
			// Change this to constants.Environments.Live when you're ready to go live
			constants.Environments.Sandbox,
			{ raiseOnIdempotencyConflict: true },
		);

		//get activeUser from database
		const activeUser = await User.findById(req.params.id)
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
				session_token: "dummy_session_token"
			}
		);
/*
		// Display a confirmation page to the customer, telling them their Direct Debit has been
		// set up. You could build your own, or use ours, which shows all the relevant
		// information and is translated into all the languages we support.
		const confirmationURL = redirectFlow.confirmation_url
		console.log(`Confirmation URL: ${confirmationURL}`);
*/

		/*save mandate to database*/
		activeUser.updateOne({
			goCardlessMandate: redirectFlow.links.mandate
		});

		res.json({
			success:true,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send('error completing client')
	}
});

// @route   POST gc/collectPayment
// @desc    Collect Payment of active user
// @access  Private
router.post('/collectPayment/:orderID', async (req, res) => {
	try {
		//get all the order information from DB
		const order = await Order.findById(req.params.orderID)
			.then(order => {
				if(!order){
					console.log("order not found");
					res.status(500).send('no order with this id')
				} else {
					return (order)
				}
			})

		const activeUser = await Client.findById(order.user)
										 .then(user => {
			  								if (!user) {
			  									console.log("no user with this id");
												res.status(500).send('no user with this id')
											} else {
			  									return (user)
											}
										 });

		const allClients = await gocardless(
			process.env.GC_ACCESS_TOKEN,
			// Change this to constants.Environments.Live when you're ready to go live
			constants.Environments.Sandbox,
			{raiseOnIdempotencyConflict: true},
		);

		const listResponse = await allClients.customers.list();
		const customers = listResponse.customers;
		const theClient = customers.find(id => id.id === activeUser.goCardlessID);

		//set proper client currency to payment
		//to go live needs to add other currencies
		const clientCountry = theClient.country_code;
		let currency;
		if (clientCountry === "US")
			currency = "USD";
		else if (clientCountry === "GB")
			currency = "GBP";

		const payment = await allClients.payments.create(
		{
			amount: order.total,
			currency: currency,
			links: {
				//getting the mandate from database
				mandate: activeClient.mandate
			},
			metadata: {
				invoice_number: "001"
			}
		},
		//Idempotency-Key is going to be the order _id generated by mongoDB
		//This guarantees that the order won't be charged twice
		order._id.toString()
		);
		res.json({
			success: true,
			payment: payment.id
		})
	} catch (error) {
		console.log(error);
		res.status(500).send('error making payment')
	}
});

// @route   POST gc/editPayment
// @desc    Cancel or Retry payment
// @req		{type: "cancel"} or {type: "retry"}
// @access  Private
router.post('/cancelPayment/:orderID', async (req, res) => {
	try {
		const allClients = await gocardless(
			process.env.GC_ACCESS_TOKEN,
			// Change this to constants.Environments.Live when you're ready to go live
			constants.Environments.Sandbox,
			{raiseOnIdempotencyConflict: true},
		);

		//get all the order information from DB
		const order = await Order.findById(req.params.orderID)
			.then(order => {
				if(!order){
					console.log("order not found");
					res.status(500).send('no order with this id')
				} else {
					return (order)
				}
			})
		if (this.body.type === "cancel")
		{
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
		res.status(500).send('error cancelling payment');
	}
});

module.exports = router;