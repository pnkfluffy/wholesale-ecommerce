const express = require('express')
const router = express.Router()
const User = require('../schemas/userSchema')
const passport = require('../modules/passport')
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware')

router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
  console.log('hi');
  res.sendStatus(201)
});

router.get('/user', rejectUnauthenticated, (req, res) => {
  let user = {
    email: req.user.email,
    name: req.user.name,
    favorites: req.user.favorites
  }
  res.send(user)
})

router.get('/favorites', rejectUnauthenticated, async (req, res) => {
  let user = await User.findById(req.user._id)
  res.json(user.favorites)
})

router.post('/updateFavorites', rejectUnauthenticated, async (req, res) => {
  const favorites = req.body
  const user = await User.findOneAndUpdate({ _id: req.user._id }, { favorites })
  res.json(user.favorites)
})

router.get('/login-uri', (req, res) => {
  res.send(process.env.DEV_URI)
})

router.get('/logout', rejectUnauthenticated, (req, res) => {
  req.logout()
  res.sendStatus(200)
})

module.exports = router
