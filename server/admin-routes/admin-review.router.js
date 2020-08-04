const express = require("express");
const router = express.Router();

const review = require("../schemas/reviewSchema");
const { rejectNonAdmin } = require('../modules/authentication-middleware')

//getList
router.get('/', rejectNonAdmin, (req, res) => {
  console.log('Review list backend hit')
  console.log("req.query: ", req.query)
  const sortQuery = JSON.parse(req.query.sort)
  const filterQuery = JSON.parse(req.query.filter)
  let sort = {}
  sort[sortQuery[0]] = sortQuery[1] === 'ASC' ? 1 : -1
  if (JSON.stringify(filterQuery) !== '{}') {
    console.log("reviews filterQuery: ", )
    review.find(filterQuery)
      .sort(sort)
      .then(filteredReviews => {
        res.set('content-range', JSON.stringify(filteredReviews.length + 1))
        //  each object needs to have an 'id' field in order for
        //  reactAdmin to parse
        filteredReviews = JSON.parse(
          JSON.stringify(filteredReviews)
            .split('"_id":')
            .join('"id":')
        )
        console.log("filteredReviews: ", filteredReviews)
        res.json(filteredReviews)
      })
  } else {
    review.find()
      .sort(sort)
      .then(reviews => {
        res.set('content-range', JSON.stringify(reviews.length + 1))
        //  each object needs to have an 'id' field in order for
        //  reactAdmin to parse
        reviews = JSON.parse(
          JSON.stringify(reviews)
            .split('"_id":')
            .join('"id":')
        )
        res.json(reviews)
      })
      .catch(error => {
        console.log(error)
        res.status(500).send('no users found')
      })
  }
})
// router.get("/", rejectNonAdmin, (req, res) => {
//   console.log("Review List backend hit")
//   const sortQuery = JSON.parse(req.query.sort);
//   let sort = {};
//   sort[sortQuery[0]] = sortQuery[1] === "ASC" ? 1 : -1;

//   review.find()
//     .sort(sort)
//     .then((reviews) => {
//       res.set("content-range", JSON.stringify(reviews.length));
//       //  each object needs to have an 'id' field in order for
//       //  reactAdmin to parse
//       reviews = JSON.parse(JSON.stringify(reviews).split('"_id":').join('"id":'));
//       res.json(reviews);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).send("no users found");
//     });
// });

//getOne
router.get("/:id", rejectNonAdmin, (req, res) => {
  console.log("getOne hit. Id: ", req.params.id)
  review.findOne({_id: req.params.id})
  .then((review) => {
    review = JSON.parse(JSON.stringify(review).split('"_id":').join('"id":'));
    res.json(review)
  }).catch(err => {
    console.log("error: ", err)
    res.status(500).send("user not found.")
  })
})

// {!}  WRITE REJECTADMINUNAUTHENTICATED AND ADD TO ALL ADMIN ROUTES
// @route   POST /admin-products
// @desc    Posts new product
// @access  Private
// router.post("/", (req, res) => {
//   const newProduct = new Product({
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     priceTiers: req.body.priceTiers,
//     metaData: req.body.metaData,
//     imageData: req.body.imageData,
//     draft: req.body.draft,
//   });
//   newProduct
//     .save()
//     .then((product) => res.json(product))
//     .catch((err) => console.log(err));
// });

// // @route   POST /admin-products/edit/:id
// // @desc    Edit a product
// // @access  Private
// router.post("/edit/:id", (req, res) => {
//   Product.updateOne({_id: req.user.id}, req.body)
//   .then((product) => res.json(product))
//   .catch((error) => {
//     console.log(error);
//     res.status(500).send("error editing product");
//   })
// });

// // @route   DELETE /admin-products/:id
// // @id      id of product
// // @desc    Delete a Product
// // @access  Private
// router.delete("/:id", (req, res) => {
//   Product.findById(req.user.id)
//     .then((product) => product.remove().then(() => res.status(200).send("Product sucessfully deleted")))
//     // .then((product) => product.remove().then(() => res.json({ success: true })))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json("Can't delete product");
//     })
// });

module.exports = router;
