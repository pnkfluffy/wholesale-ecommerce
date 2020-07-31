
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

	// if (process.env.DEV_MODE == 1) {
	// 	console.log('hi');

	// 	next()
	// 	return
	// }

	if (req.isAuthenticated() && req.user.isAdmin) {
		next()
		return
	} else {
		// failure best handled on the server. do redirect here.
		res.status(403).send('user not authenticated')
		return
	}
}

module.exports = { rejectUnauthenticated, rejectNonAdmin }
