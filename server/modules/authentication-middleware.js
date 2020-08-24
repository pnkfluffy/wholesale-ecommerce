const User = require('../schemas/userSchema')

const rejectUnauthenticated = (req, res, next) => {
  User.findById('5f42d4e0b84eea8e77e97f48').then(user => {
    req.user = user
    next()
    return
  })

  // check if logged in
  // next()
  // return;

  // if (req.isAuthenticated()) {
  // 	// They were authenticated! User may do the next thing
  // 	// Note! They may not be Authorized to do all things
  // 	next()
  // } else {
  // 	// failure best handled on the server. do redirect here.
  // 	res.status(403).send('user not authenticated')
  // 	return
  // }
}

const rejectNonAdmin = async (req, res, next) => {
  next()
  return
  if (req.isAuthenticated() && req.user.isAdmin) {
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
