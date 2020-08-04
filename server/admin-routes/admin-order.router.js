const express = require('express')
const router = express.Router()
const Order = require('../schemas/orderSchema')
const { rejectNonAdmin } = require('../modules/authentication-middleware')

//getList
router.get('/', rejectNonAdmin, (req, res) => {
  console.log('Order list backend hit')
  console.log('req.query: ', req.query)
  const sortQuery = JSON.parse(req.query.sort)
  let filterQuery = JSON.parse(req.query.filter)
  console.log('filterquery', filterQuery)
  if (filterQuery.representative) {
    filterQuery.representative = req.user._id
  } else {
    filterQuery = {};
  }
  console.log('new', filterQuery)
  let sort = {}
  sort[sortQuery[0]] = sortQuery[1] === 'ASC' ? 1 : -1
  if (JSON.stringify(filterQuery) !== '{}') {
    console.log('orders filterQuery: ', filterQuery)
    Order.find(filterQuery)
      .sort(sort)
      .then(filteredOrders => {
        res.set('content-range', JSON.stringify(filteredOrders.length + 1))
        //  each object needs to have an 'id' field in order for
        //  reactAdmin to parse
        filteredOrders = JSON.parse(
          JSON.stringify(filteredOrders)
            .split('"_id":')
            .join('"id":')
        )
        console.log('filtered Orders: ', filteredOrders)
        res.json(filteredOrders)
      })
  } else {
    Order.find()
      .sort(sort)
      .then(orders => {
        res.set('content-range', JSON.stringify(orders.length + 1))
        //  each object needs to have an 'id' field in order for
        //  reactAdmin to parse
        orders = JSON.parse(
          JSON.stringify(orders)
            .split('"_id":')
            .join('"id":')
        )
        res.json(orders)
      })
      .catch(error => {
        console.log(error)
        res.status(500).send('no users found')
      })
  }
})

//getOne
router.get('/:id', rejectNonAdmin, (req, res) => {
  console.log('Order getOne hit. Id: ', req.params.id)
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
      console.log('error: ', err)
      res.status(500).send('user not found.')
    })
})

// //https://marmelab.com/react-admin/doc/2.8/DataProviders.html

// update
router.put('/:id', rejectNonAdmin, async (req, res) => {
  console.log('update order hit', req.params.id, req.body)

  Order.findById(req.params.id).then(order => {
    console.log('finding', order)
    if (!order.tracking.number && req.body.tracking.number) {
      //  {!} SEND EMAIL NOTIFYING CUSTOMER THEIR ORDER HAS
      //  SHIPPED, INCLUDE NUMBER
    }
  })

  Order.updateOne({ _id: req.params.id }, req.body)
    .then(order => {
      order = JSON.parse(
        JSON.stringify(order)
          .split('"_id":')
          .join('"id":')
      )
      res.json(order)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Failed to update.')
    })
})

// router.put('/:id', rejectNonAdmin, uploadProductPhotos, async (req, res) => {
//   console.log('update hit', req.params.id)
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
//       console.log(err)
//       res.status(500).send('Failed to update.')
//     })
// })

// //updateMany
// router.put("/", async (req, res) => {
//   console.log("updateMany hit")
//   console.log(req.query.ids)
//   let users = []
//   for(let i = 0; i < req.query.ids.length; i++){
//     User.updateOne({_id: req.query.ids[i]}, req.body)
//     .then((user) => {
//       users.push(user)
//       console.log("pushed: ", user)
//     }).catch(err => {
//       console.log(err)
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
//     console.log(newUser)
//     newUser = JSON.parse(JSON.stringify(newUser).split('"_id":').join('"id":'));
//     res.status(200).json(newUser)
//   }).catch(err => {
//     console.log(err)
//     res.status(500).send("Creation failed.")
//   })
// })

// //delete
// router.delete("/:id", async (req, res) => {
//   User.deleteOne({_id: req.params.id})
//   .then(res => {
//     console.log(res)
//     res.status(200).send("item deleted")
//   }).catch(err => {
//     console.log(err)
//     res.status(500).send("Deletion failed!")
//   })
// })

// //deleteMany
// router.delete("/", async (req, res) => {
//   console.log("deleteMany hit.")
//   console.log(req.query.ids)
//   for(let i = 0; i < req.query.ids.length; i++){
//     await User.deleteOne({_id: req.params.id})
//     .then(res => {
//       console.log(res)
//     }).catch(err => {
//       console.log(err)
//       res.status(500).send("Not all items were deleted")
//     })
//   }
//   res.status(200).send("items deleted.")
// })

module.exports = router
