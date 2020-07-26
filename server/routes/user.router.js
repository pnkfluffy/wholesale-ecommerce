const express = require('express')
const router = express.Router()
const User = require('../schemas/userSchema')
const passport = require('../modules/passport')
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware')

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(
      process.env.NODE_ENV === 'dev' ? 'http://localhost:3000/' : '/'
    )
  }
)

router.get(
  '/login/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  })
)

router.get('/user', rejectUnauthenticated, (req, res) => {
  let user = {
    name: req.user.name
  }
  res.send(user)
})

router.get('/login-uri', (req, res) => {
  res.send(process.env.DEV_URI)
})

router.get('/logout', rejectUnauthenticated, (req, res) => {
  req.logout()
  res.sendStatus(200)
})

module.exports = router
