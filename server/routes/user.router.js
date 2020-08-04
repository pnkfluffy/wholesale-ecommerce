const express = require('express')
const router = express.Router()
const User = require('../schemas/userSchema')
const passport = require('../modules/passport')
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware')
const validateEmail = require('../validation/EmailValidation')
const validatePass = require('../validation/PswdValidation')
const shajs = require('sha.js')
const bcrypt = require('bcrypt')

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
                         .catch(res.status(500).send("couldn't update favorites in database"))
  res.json(user.favorites)
})

router.post('/editEmail', rejectUnauthenticated, async (req, res) => {
  try {
    const newEmail = req.body.email;
    const {error, isValid} = validateEmail(newEmail);
    if (!isValid) {
      res.status(500).json(error)
    }
    else {
      await User.findOneAndUpdate({ _id: req.user._id }, {email: newEmail})
          .then(res.json({success: true}))
          .catch(err => console.log(err))
    }
  } catch(err) {
    console.log(err)
  }
})

router.post('/editPassword', rejectUnauthenticated, async (req, res) => {
  try {
    const {errors, isValid} = validatePass(req.body);
    if (!isValid) {
      res.status(500).json(errors)
    }
    else {
        const salt = await bcrypt.genSalt(10);
        const newPass = req.body.newPass;
        const oldPass = req.body.oldPass;
        const newSaltedPass = await bcrypt.hash(newPass, salt);
        console.log(oldPass);
        if (await bcrypt.compare(oldPass, req.user.password))
        {
          await User.findOneAndUpdate({ _id: req.user._id }, {password: newSaltedPass})
              .then(res.json({success: true}))
              .catch(err => console.log(err))
        } else {
          res.status(500).json(["oldPass", "Incorrect Password"])
        }
    }
  } catch(err) {
    console.log(err)
  }
})

router.get('/login-uri', (req, res) => {
  res.send(process.env.DEV_URI)
})

router.get('/logout', rejectUnauthenticated, (req, res) => {
  req.logout()
  res.sendStatus(200)
})

module.exports = router
