const express = require('express')
const router = express.Router()
const User = require('../schemas/userSchema')
const Product = require('../schemas/productSchema')
const passport = require('../modules/passport')
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware')
const validateEmail = require('../validation/EmailValidation')
const validatePass = require('../validation/PswdValidation')
const shajs = require('sha.js')
const bcrypt = require('bcrypt')

router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
  res.sendStatus(201)
});

router.get('/user', rejectUnauthenticated, (req, res) => {
  let user = {
    email: req.user.email,
    name: req.user.name,
  }
  res.send(user)
})

router.get('/favorites', rejectUnauthenticated, async (req, res) => {
  try {
    let user = await User.findById(req.user._id)
      .catch(err => {
        res.status(500).send("couldn't find user")
        return
      });
    let availableProducts = [];
    if (user) {
      const favorites = user.favorites
      for (let i = 0; i < favorites.length; i++) {
        await Product.findById(favorites[i])
          .then(info => {
            //  means nothing found
            if (!info.deleted) {
              availableProducts.push(favorites[i])
            }
          })
          .catch(err => {
            console.log(err)
            res.status(500).send("couldn't get favorites")
            return;
          })
      }
    }
    res.send(availableProducts)
    return
  } catch (error) {
    console.log(error);
    res.status(500).send('error in retrieving favorites')
  }
})

router.post('/update-favorites', rejectUnauthenticated, async (req, res) => {
  const favorites = req.body
  try {
    const user = await User.findOneAndUpdate({ _id: req.user._id }, { favorites })
    res.json(user.favorites)
  } catch (error) {
    console.log(error);
    res.status(500).send("couldn't update favorites in database")
  }
})

// router.post('/edit-email', rejectUnauthenticated, async (req, res) => {
//   try {
//     const newEmail = req.body.email;
//     const { error, isValid } = await validateEmail(newEmail);
//     if (!isValid) {      
//       res.status(400).json(error)
//     }
//     else {
//       await User.findOneAndUpdate({ _id: req.user._id }, { email: newEmail })
//         .then(res.json({ success: true }))
//         .catch(err => console.log(err))
//     }
//   } catch (err) {
//     console.log(err)
//     res.status(500).send('error editing email')
//   }
// })

router.post('/edit-password', rejectUnauthenticated, async (req, res) => {
  try {
    const { errors, isValid } = validatePass(req.body);
    if (!isValid) {
      res.status(500).json(errors)
    }
    else {
      const salt = await bcrypt.genSalt(10);
      const newPass = req.body.newPass;
      const oldPass = req.body.oldPass;
      const newSaltedPass = await bcrypt.hash(newPass, salt);
      console.log(oldPass);
      if (await bcrypt.compare(oldPass, req.user.password)) {
        await User.findOneAndUpdate({ _id: req.user._id }, { password: newSaltedPass })
          .then(res.json({ success: true }))
          .catch(err => console.log(err))
      } else {
        res.status(500).json(["oldPass", "Incorrect Password"])
      }
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('error editing password')
  }
})

// router.get('/login-uri', (req, res) => {
//   res.send(process.env.DEV_URI)
// })

router.get('/logout', rejectUnauthenticated, (req, res) => {
  req.logout()
  res.sendStatus(200)
})

module.exports = router
