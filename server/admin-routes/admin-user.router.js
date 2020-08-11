const express = require('express')
const router = express.Router()
// const bcrypt = require("bcryptjs")
const { ObjectId } = require('mongodb')
const passport = require('../modules/passport')
const {
  rejectNonAdmin,
  rejectNonOwner
} = require('../modules/authentication-middleware')
const User = require('../schemas/userSchema')
const shajs = require('sha.js')
const { newUserEmail } = require('../modules/nodemailer')
const bcrypt = require('bcrypt')
const { restart } = require('nodemon')

//Login
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    let perms
    if (req.user.isOwner) {
      perms = 'owner'
    } else if (req.user.isAdmin) {
      perms = 'admin'
    }
    res.json({
      sig: Date.now(),
      perms: perms
    })
  }
)

router.get('/logout', (req, res) => {
  req.logout()
  res.sendStatus(200)
})

router.get('/user', rejectNonAdmin, (req, res) => {
  let user = {
    email: req.user.email,
    admin: true
  }
  res.send(user)
})

const checkOwner = user => {
  if (user) {
    return user.isOwner
  }
  return false
}

//create
router.post('/', rejectNonAdmin, async (req, res) => {
  try {
    let pass = shajs('sha256')
      .update(
        `${req.body.email}${req.body.name}${Date.now()}${Math.random() * 100}`
      )
      .digest('hex')
    pass = pass.substring(0, 10)
    const salt = await bcrypt.genSalt(10)
    const saltedPass = await bcrypt.hash(pass, salt)
    if (!req.user) {
    }
    if (req.body.isAdmin && !checkOwner(req.user)) {
      res.status(403).send('Insufficient Permissions')
      return
    }
    const representative = req.body.makeRepresentative
      ? req.user._id
      : ObjectId()
    User.create({
      email: req.body.email,
      name: req.body.name,
      isAdmin: req.body.isAdmin,
      password: saltedPass,
      representative
    }).then(newUser => {
      // console.log(newUser)
      newUser.password = null
      newUser = JSON.parse(
        JSON.stringify(newUser)
          .split('"_id":')
          .join('"id":')
      )
      newUserEmail({
        email: req.body.email,
        password: pass
      })
      res.status(200).json(newUser)
    })
  } catch (error) {
    // console.log(error)
    res.status(500).send('Creation failed.')
  }
})

//getList
router.get('/', rejectNonAdmin, (req, res) => {
  try {
    const filterQuery = JSON.parse(req.query.filter)
    let filter =
      Object.entries(filterQuery).length !== 0
        ? JSON.parse(req.query.filter)
        : { deleted: 'false' }
    let sortQuery
    let sort = {}
    let rangeQuery = [0]
    let rangeLimit = 10
    if (req.query.sort) {
      sortQuery = JSON.parse(req.query.sort)
      sort[sortQuery[0]] = sortQuery[1] === 'ASC' ? 1 : -1
    }
    if (req.query.range) {
      rangeQuery = JSON.parse(req.query.range)
      rangeLimit = rangeQuery[1] - rangeQuery[0] + 1
    }

    User.find(filter)
      .sort(sort)
      .skip(rangeQuery[0])
      .limit(rangeLimit)
      .then(users => {
        User.countDocuments().then(contentRange => {
          res.set('content-range', JSON.stringify(contentRange))
          users = JSON.parse(
            JSON.stringify(users)
              .split('"_id":')
              .join('"id":')
          )
          res.json(users)
        })
      })
  } catch (error) {
    // console.log(error)
    res.status(500).send('error retrieving users')
  }
})

//getOne
router.get('/:id', rejectNonAdmin, (req, res) => {
  // console.log('getOne user hit. Id: ', req.params.id)
  User.findOne({ _id: req.params.id })
    .then(user => {
      user = JSON.parse(
        JSON.stringify(user)
          .split('"_id":')
          .join('"id":')
      )
      res.json(user)
    })
    .catch(err => {
      // console.log('error: ', err)
      res.status(500).send('user not found.')
    })
})

//https://marmelab.com/react-admin/doc/2.8/DataProviders.html
//getMany



//getManyReference

//update
router.put('/:id', rejectNonAdmin, async (req, res) => {
  // console.log('update user hit')
  User.updateOne({ _id: req.params.id }, req.body)
    .then(user => {
      user = JSON.parse(
        JSON.stringify(user)
          .split('"_id":')
          .join('"id":')
      )
      res.json(user)
    })
    .catch(err => {
      // console.log(err)
      res.status(500).send('Failed to update.')
    })
})

//updateMany
router.put('/', rejectNonOwner, async (req, res) => {
  try {
    // console.log('updateMany hit')
    let users = []
    for (let i = 0; i < req.query.ids.length; i++) {
      await User.updateOne({ _id: req.query.ids[i] }, req.body)
        .then(user => {
          users.push(user)
        })
        .catch(err => {
          // console.log(err)
          res.status(500).send('Failed to update all items.')
          return
        })
    }
    res.set('content-range', JSON.stringify(updatedUsers.length))
    const updatedUsers = JSON.parse(
      JSON.stringify(users)
        .split('"_id":')
        .join('"id":')
    )
    res.status(200).json(updatedUsers)
  } catch (error) {
    // console.log(error)
    res.status(500).send('error updating users')
  }
})

//delete
router.delete('/:id', rejectNonOwner, async (req, res) => {
  // console.log('del attempt', req.params.id)

  User.updateOne({ _id: req.params.id }, { deleted: true })
    .then(user => {
      user = JSON.parse(
        JSON.stringify(user)
          .split('"_id":')
          .join('"id":')
      )
      res.json(user)
    })
    .catch(err => {
      // console.log(err)
      res.status(500).send('Deletion failed!')
    })
})

//deleteMany
router.delete('/', rejectNonOwner, async (req, res) => {
  try {
    // console.log('deleteMany hit.')
    // console.log(req.query.ids)
    for (let i = 0; i < req.query.ids.length; i++) {
      await User.updateOne({ _id: req.params.id }, { deleted: true })
        .then(result => {
          // console.log(result)
        })
        .catch(err => {
          // console.log(err)
          res.status(500).send('Not all items were deleted')
          return
        })
    }
    res.status(200).send('items deleted.')
  } catch (error) {
    // console.log(error)
    res.status(500).send('error deleting items')
  }
})

module.exports = router
