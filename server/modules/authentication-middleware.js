
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
	if (req.isAuthenticated() && req.user.isAdmin) {
		next()
		return
	} else {
		// failure best handled on the server. do redirect here.
		res.status(403).send('user is not admin')
		return
	}
}

const rejectNonOwner = async (req, res, next) => {
	if (req.isAuthenticated() && req.user.isOwner) {
		next()
		return
	} else {
		res.status(403).send('user is not owner')
		return
	}
}

module.exports = { rejectUnauthenticated, rejectNonAdmin, rejectNonOwner }
