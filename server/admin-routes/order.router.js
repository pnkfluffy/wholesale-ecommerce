const express = require("express");
const router = express.Router();
const Order = require("../schemas/orderSchema");

//getList
router.get("/", (req, res) => {
  console.log("Order list backend hit")
  if(req.query.sort === undefined){
    req.query.sort = JSON.stringify(["id","ASC"])
  }
  if(req.query.range === undefined){
    req.query.range = JSON.stringify([0,9])
  }
  // console.log("req.query: ", req.query)
  // console.log("req.query.sort: ", req.query.sort)
  const sortQuery = JSON.parse(req.query.sort);
  const filterQuery = JSON.parse(req.query.filter)
  let sort = {};
  sort[sortQuery[0]] = sortQuery[1] === "ASC" ? 1 : -1;
  console.log("query: ", req.query, " end query");
  console.log(sortQuery);
  console.log("sort", sort);

  if(filterQuery.id){
    console.log("filterquery: ", filterQuery)
    Order.find({ user: filterQuery.id }).sort(sort)
    .then((filteredOrders => {
      res.set("content-range", JSON.stringify(filteredOrders.length + 1));
      //  each object needs to have an 'id' field in order for
      //  reactAdmin to parse
      filteredOrders = JSON.parse(JSON.stringify(filteredOrders).split('"_id":').join('"id":'));
      console.log("filterd parsed orders: ", filteredOrders)
      // console.log("parsed orders: ", orders)
      res.json(filteredOrders);
    }))
  }else{
    Order.find()
      .sort(sort)
      .then((orders) => {
        res.set("content-range", JSON.stringify(orders.length + 1));
        //  each object needs to have an 'id' field in order for
        //  reactAdmin to parse
        orders = JSON.parse(JSON.stringify(orders).split('"_id":').join('"id":'));
        console.log("parsed orders: ", orders)
        // console.log("parsed orders: ", orders)
        res.json(orders);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("no users found");
      });
  }
  
});

//getOne
router.get("/:id", (req, res) => {
  console.log("Order getOne hit. Id: ", req.params.id)
  Order.findOne({_id: req.params.id})
  .then((order) => {
    order = JSON.parse(JSON.stringify(order).split('"_id":').join('"id":'));
    console.log("parsed user: ", order)
    res.json(order)
  }).catch(err => {
    console.log("error: ", err)
    res.status(500).send("user not found.")
  })
})


// //https://marmelab.com/react-admin/doc/2.8/DataProviders.html
// //getMany

// //getManyReference

// //update
// router.put("/:id", async (req, res) => {
//   console.log("update hit")
//   console.log(req.params.id)
//   console.log(req.body)
//   User.updateOne({_id: req.params.id}, req.body)
//   .then((user) => {
//     user = JSON.parse(JSON.stringify(user).split('"_id":').join('"id":'));
//     res.json(user)
//   }).catch(err => {
//     console.log(err)
//     res.status(500).send("Failed to update.")
//   })
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



module.exports = router;
