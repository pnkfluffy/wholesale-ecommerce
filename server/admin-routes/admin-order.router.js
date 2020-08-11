const express = require('express')
const router = express.Router()
const Order = require('../schemas/orderSchema')
const User = require('../schemas/userSchema')
const { rejectNonAdmin } = require('../modules/authentication-middleware')
const { trackingAddedEmail } = require('../modules/nodemailer')

//getList
router.get('/', rejectNonAdmin, (req, res) => {
  try {
    // console.log('Order list backend hit', req.query)
    let filterQuery = JSON.parse(req.query.filter) || {}
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

    // console.log('filter', filterQuery)
    if (!req.user.isOwner && filterQuery.commission) {
      filterQuery.representative = req.user._id
      // console.log('rep', filterQuery, req.user._id)
    }
    delete filterQuery.commission

    // console.log('filterquery', filterQuery)
    Order.find(filterQuery)
      .sort(sort)
      .skip(rangeQuery[0])
      .limit(rangeLimit)
      .then(filteredOrders => {
        Order.countDocuments().then(contentRange => {
          // // console.log(filteredOrders);
          res.set('content-range', JSON.stringify(contentRange))
          filteredOrders = JSON.parse(
            JSON.stringify(filteredOrders)
              .split('"_id":')
              .join('"id":')
          )
          res.json(filteredOrders)
        })
      })
    //
  } catch (error) {
    // console.log(error)
    res.status(500).send('no orders found')
  }
})

//getOne
router.get('/:id', rejectNonAdmin, (req, res) => {
  // console.log('Order getOne hit. Id: ', req.params.id)
  Order.findOne({ _id: req.params.id })
    .then(order => {
      order = JSON.parse(
        JSON.stringify(order)
          .split('"_id":')
          .join('"id":')
      )
      res.json(order)
    })
    .catch(err => {
      // console.log('error: ', err)
      res.status(500).send('user not found.')
    })
})

// //https://marmelab.com/react-admin/doc/2.8/DataProviders.html

// update
router.put('/:id', rejectNonAdmin, async (req, res) => {
  try {
    Order.findById(req.params.id).then(async order => {
      if (order.tracking.number !== req.body.tracking.number) {
        let user = await User.findOne({ _id: order.user })
        trackingAddedEmail(user, order, req.body.tracking)
      }
    })

    Order.updateOne({ _id: req.params.id }, req.body).then(order => {
      order = JSON.parse(
        JSON.stringify(order)
          .split('"_id":')
          .join('"id":')
      )
      res.json(order)
    })
  } catch (error) {
    // console.log(error)
    res.status(500).send('Failed to update.')
  }
})

// router.put('/:id', rejectNonAdmin, uploadProductPhotos, async (req, res) => {
//   // console.log('update hit', req.params.id)
//   req.body.imageData = req.imageMetaData
//   await Product.updateOne({ _id: req.params.id }, req.body)
//     .then(product => {
//       product = JSON.parse(
//         JSON.stringify(product)
//           .split('"_id":')
//           .join('"id":')
//       )
//       res.json(product)
//     })
//     .catch(err => {
//       // console.log(err)
//       res.status(500).send('Failed to update.')
//     })
// })

// //updateMany
// router.put("/", async (req, res) => {
//   // console.log("updateMany hit")
//   // console.log(req.query.ids)
//   let users = []
//   for(let i = 0; i < req.query.ids.length; i++){
//     User.updateOne({_id: req.query.ids[i]}, req.body)
//     .then((user) => {
//       users.push(user)
//       // console.log("pushed: ", user)
//     }).catch(err => {
//       // console.log(err)
//       res.status(500).send("Failed to update all items.")
//     })
//   }
//   res.set("content-range", JSON.stringify(updatedUsers.length));
//   updatedUsers = JSON.parse(JSON.stringify(users).split('"_id":').join('"id":'));
//   res.status(200).json(updatedUsers);
// })

// //create
// router.post("/", async (req, res) => {
//   User.create(req.body.body)
//   .then(newUser => {
//     // console.log(newUser)
//     newUser = JSON.parse(JSON.stringify(newUser).split('"_id":').join('"id":'));
//     res.status(200).json(newUser)
//   }).catch(err => {
//     // console.log(err)
//     res.status(500).send("Creation failed.")
//   })
// })

// //delete
// router.delete("/:id", async (req, res) => {
//   User.deleteOne({_id: req.params.id})
//   .then(res => {
//     // console.log(res)
//     res.status(200).send("item deleted")
//   }).catch(err => {
//     // console.log(err)
//     res.status(500).send("Deletion failed!")
//   })
// })

// //deleteMany
// router.delete("/", async (req, res) => {
//   // console.log("deleteMany hit.")
//   // console.log(req.query.ids)
//   for(let i = 0; i < req.query.ids.length; i++){
//     await User.deleteOne({_id: req.params.id})
//     .then(res => {
//       // console.log(res)
//     }).catch(err => {
//       // console.log(err)
//       res.status(500).send("Not all items were deleted")
//     })
//   }
//   res.status(200).send("items deleted.")
// })

module.exports = router
