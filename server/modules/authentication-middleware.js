const Admin = require('../schemas/adminSchema')

const rejectUnauthenticated = (req, res, next) => {
	// check if logged in

	if (req.isAuthenticated()) {
		// They were authenticated! User may do the next thing
		// Note! They may not be Authorized to do all things
		next()
	} else {
		// failure best handled on the server. do redirect here.
		res.status(403).send('user not authenticated')
		return
	}
}

const rejectNonAdmin = async (req, res, next) => {
	console.log(process.env.DEV_MODE);

	if (req.isAuthenticated()) {
		if (process.env.DEV_MODE === '1') {
			console.log('hi');

			next()
		}
		let admin = await Admin.findOne({ _id: req.user._id })

		if (admin) {
			next()
		} else {
			req.logout()
			res.status(403).send('user not admin')
			return
		}
	} else {
		// failure best handled on the server. do redirect here.
		res.status(403).send('user not authenticated')
		return
	}
}

module.exports = { rejectUnauthenticated, rejectNonAdmin }
