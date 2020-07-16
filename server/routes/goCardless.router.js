const express = require("express");
const router = express.Router();

const User = require('../schemas/userSchema');
const Order = require('../schemas/orderSchema');

/*setup goCardless*/
const gocardless = require("gocardless-nodejs");
const constants = require("gocardless-nodejs/constants");

const initializeGoCardless = async () => {
	const allClients = await gocardless(
		process.env.GC_ACCESS_TOKEN,
		// Change this to constants.Environments.Live when you're ready to go live
		constants.Environments.Sandbox,
		{ raiseOnIdempotencyConflict: true },
	);

	return (allClients);
}

// @route   GET /gc/checkClient
// @desc    Returns all clients
// @access  Private
router.get('/checkClientID', async (req, res) => {
	if (req.user.goCardlessID)
	{
		res.send(true)
	}
	else
		res.send(false)
});

// @route   GET /gc/checkClient
// @desc    Returns all clients
// @access  Private
router.get('/checkClientMandate', async (req, res) => {
	if (req.user.goCardlessMandate)
	{
		res.send(true)
	}
	else
		res.send(false)
});

// @route   GET /gc/clients
// @desc    Returns all clients
// @access  Private
router.get('/clients', async (req, res) => {
	try {
		// Initialize the GoCardLess client.
		const allClients = await initializeGoCardless()
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

// @route   GET /gc/oneClient
// @desc    Returns client by id
// @access  Private
router.get('/oneClient', async (req, res) => {
	try {
		const allClients =  await gocardless(
			process.env.GC_ACCESS_TOKEN,
			// Change this to constants.Environments.Live when you're ready to go live
			constants.Environments.Sandbox,
			{ raiseOnIdempotencyConflict: true },
		);
		const theClient = await allClients.customers.find(req.user.goCardlessID)
		res.send(theClient);
	} catch (error) {
		console.log(error);
		res.status(500).send('client not found')
	}
});

// @route   GET /gc/payments
// @:date	Limit to records created on or after the specified date-time.
// @desc    Returns all payments
// @access  Private
router.get('/payments/:date', async (req, res) => {
	try {
		// Initialize the GoCardLess client.
		const allClients = await initializeGoCardless()

		// List all payments past a certain date.
		const payments = await allClients.payments.list({
			created_at: {
				gt: req.params.date
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).send('payment not found')
	}
});

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
			//to go live we need to have a token generator for each client
			session_token: req.user._id.toString(),
			success_redirect_url: "http://localhost:3000/buy",

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
		User.findById(req.user._id)
			.then(user => {
				console.log(user);
				if (!user) {
					console.log("no user with this id");
					res.status(500).send('no user with this id')
				} else {
					user.updateOne({
						$set: {"goCardlessID": redirectFlow.id}
					})
						.then(
								res.json({
									success:true,
									url: redirectFlow.redirect_url
								})
						)
				}
			})
			.catch(err => {
							console.log(err);
							res.status(500).send("error updating database")}
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
		const allClients = await initializeGoCardless()

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
		/*
                // Display a confirmation page to the customer, telling them their Direct Debit has been
                // set up. You could build your own, or use ours, which shows all the relevant
                // information and is translated into all the languages we support.
                const confirmationURL = redirectFlow.confirmation_url
                console.log(`Confirmation URL: ${confirmationURL}`);
        */

		/*save mandate to database*/
		console.log(redirectFlow);
		activeUser
			.updateOne({
				$set: {"goCardlessMandate": redirectFlow.links.mandate,
						"goCardlessID": redirectFlow.links.customer}
			})
			.then(
				res.json({
				success:true,
			}));
	} catch (error) {
		console.log(error);
		res.status(500).send('error completing client')
	}
});

// @route   POST gc/collectPayment/:orderID
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

		const activeUser = await User.findById(order.user)
			.then(user => {
				if (!user) {
					console.log("no user with this id");
					res.status(500).send('no user with this id')
				} else {
					return (user)
				}
			});

		const allClients =  await gocardless(
			process.env.GC_ACCESS_TOKEN,
			// Change this to constants.Environments.Live when you're ready to go live
			constants.Environments.Sandbox,
			{ raiseOnIdempotencyConflict: true },
		);
		const theClient = await allClients.customers.find(req.user.goCardlessID);

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
					mandate: activeUser.goCardlessMandate
				},
				metadata: {
					invoice_number: "001"
				}
			},
			//Idempotency-Key is going to be the order _id generated by mongoDB
			//This guarantees that the order won't be charged twice
			order._id.toString()
		) .then (payment => {
			order.updateOne({$set: {"paymentID": payment.id}})
				 .then(res.json({
					 success: true,
					 payment: payment.id
				 }))
				 .catch(err=>{
				 	console.log(`Can't Update Database: ${err}`);
				 })

		}) .catch(err => {
			console.log(err);
			res.status(500).send("Couldn't make payment")
		})
	} catch (error) {
		console.log(error);
		res.status(500).send('error making payment')
	}
});

// @route   POST gc/editPayment/:orderID
// @desc    Cancel or Retry payment
// @req		{type: "cancel"} or {type: "retry"}
// @access  Private
router.post('/changePayment/:orderID', async (req, res) => {
	try {
		const allClients = await initializeGoCardless();

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

		if (req.body.type === "cancel")
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
		res.status(500).send('error editing payment');
	}
});

module.exports = router;