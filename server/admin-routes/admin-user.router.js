const express = require('express')
const router = express.Router()
// const bcrypt = require("bcryptjs");
const passport = require('../modules/passport')
const { rejectNonAdmin } = require('../modules/authentication-middleware')
const User = require('../schemas/userSchema')
const shajs = require('sha.js')
const { newUserEmail } = require('../modules/nodemailer')
const bcrypt = require('bcrypt')

//Login
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.sendStatus(201)
})

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

// router.post('/create-user', rejectNonAdmin, async (req, res) => {
//   try {
//     let user = new User({
//       email: req.body.email,
//       password: shajs('sha256').update(this.state.email + Date.now()).digest('hex'),
//     })
//     await user.save()
//     // make comprehensive url here
//     newUserEmail(user, "")
//     res.sendStatus(200)
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500)
//   }
// })

router.post('/', rejectNonAdmin, async (req, res) => {
  const pass = 'sf\?QX6WmP{`tB=s'
  const salt = await bcrypt.genSalt(10);
  const saltedPass = await bcrypt.hash(pass, salt);
  User.create({
    email: req.body.name,
    password: saltedPass,
  })
    .then(newUser => {
      console.log(newUser)
      newUser = JSON.parse(
        JSON.stringify(newUser)
          .split('"_id":')
          .join('"id":')
      )
      newUserEmail({
        email: req.body.name,
        password: pass
      }, "")
      res.status(200).json(newUser)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Creation failed.')
    })
})

//getList
router.get('/', rejectNonAdmin, (req, res) => {
  console.log('User list backend hit')
  // these conditionals manually put required values into the query
  // that aren't passed in from the react-admin getMany method
  let sort = {}
  if (!req.query.sort === undefined) {
    const sortQuery = JSON.parse(req.query.sort)
    sort[sortQuery[0]] = sortQuery[1] === 'ASC' ? 1 : -1
  }
  const filterQuery = JSON.parse(req.query.filter) || {}

  if (JSON.stringify(filterQuery) !== '{}') {
    if (typeof filterQuery.id) {
      filterQuery._id = filterQuery.id
      delete filterQuery.id
    }
    console.log("Users filterQuery: ", filterQuery)
    User.find(filterQuery).then(filteredUsers => {
      res.set('content-range', JSON.stringify(filteredUsers.length + 1))
      //  each object needs to have an 'id' field in order for
      //  reactAdmin to parse
      filteredUsers = JSON.parse(
        JSON.stringify(filteredUsers)
          .split('"_id":')
          .join('"id":')
      )
      console.log("filtered Users: ", filteredUsers)
      res.json(filteredUsers)
    })
  } else {
    User.find()
      .sort(sort)
      .then(users => {
        console.log("raw users: ", users)
        res.set('content-range', JSON.stringify(users.length))
        //  each object needs to have an 'id' field in order for
        //  reactAdmin to parse
        users = JSON.parse(
          JSON.stringify(users)
            .split('"_id":')
            .join('"id":')
        )
        //console.log("parsed users: ", users)
        res.json(users)
      })
      .catch(error => {
        console.log(error)
        res.status(500).send('no users found')
      })
  }
})

//getOne
router.get('/:id', rejectNonAdmin, (req, res) => {
  console.log('getOne user hit. Id: ', req.params.id)
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
      console.log('error: ', err)
      res.status(500).send('user not found.')
    })
})

//https://marmelab.com/react-admin/doc/2.8/DataProviders.html
//getMany

//getManyReference

//update
router.put('/:id', rejectNonAdmin, async (req, res) => {
  console.log('update user hit')
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
      console.log(err)
      res.status(500).send('Failed to update.')
    })
})

//updateMany
router.put('/', rejectNonAdmin, async (req, res) => {
  console.log('updateMany hit')
  let users = []
  for (let i = 0; i < req.query.ids.length; i++) {
    User.updateOne({ _id: req.query.ids[i] }, req.body)
      .then(user => {
        users.push(user)
      })
      .catch(err => {
        console.log(err)
        res.status(500).send('Failed to update all items.')
      })
  }
  res.set('content-range', JSON.stringify(updatedUsers.length))
  const updatedUsers = JSON.parse(
    JSON.stringify(users)
      .split('"_id":')
      .join('"id":')
  )
  res.status(200).json(updatedUsers)
})

//create

//delete
router.delete('/:id', rejectNonAdmin, async (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(res => {
      console.log(res)
      res.status(200).send('item deleted')
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Deletion failed!')
    })
})

//deleteMany
router.delete('/', rejectNonAdmin, async (req, res) => {
  console.log('deleteMany hit.')
  console.log(req.query.ids)
  for (let i = 0; i < req.query.ids.length; i++) {
    await User.deleteOne({ _id: req.params.id })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
        res.status(500).send('Not all items were deleted')
      })
  }
  res.status(200).send('items deleted.')
})

module.exports = router
