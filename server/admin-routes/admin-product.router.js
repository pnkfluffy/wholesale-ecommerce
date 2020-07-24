const express = require("express");
const router = express.Router();

const Product = require("../schemas/productSchema");

//getList
router.get("/", (req, res) => {
  console.log("Product List backend hit")
  const sortQuery = JSON.parse(req.query.sort);
  let sort = {};
  sort[sortQuery[0]] = sortQuery[1] === "ASC" ? 1 : -1;
  // console.log("query: ", req.query, " end query");
  // console.log(sortQuery);
  // console.log("sort", sort);

  Product.find()
    .sort(sort)
    .then((products) => {
      res.set("content-range", JSON.stringify(products.length));
      //  each object needs to have an 'id' field in order for
      //  reactAdmin to parse
      products = JSON.parse(JSON.stringify(products).split('"_id":').join('"id":'));
      // console.log("parsed products: ", products[0], products[1], products[2])
      res.json(products);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("no users found");
    });
});

//getOne
router.get("/:id", async (req, res) => {
  console.log("req method :", req.method)
  console.log("req.data :", req.data)
  console.log("getOne hit. Id: ", req.params.id)
  await Product.findOne({_id: req.params.id})
  .then(async (product) => {
    product = await JSON.parse(JSON.stringify(product).split('"_id":').join('"id":'));
    console.log("parsed product: ", product)
    res.json(product)
  }).catch(err => {
    console.log("error: ", err)
    res.status(500).send("user not found.")
  })
})

// {!}  WRITE REJECTADMINUNAUTHENTICATED AND ADD TO ALL ADMIN ROUTES
// @route   POST /admin-products
// @desc    Posts new product
// @access  Private
router.post("/", (req, res) => {
  console.log("images", req.body.images);
  console.log("price tiers: ", req.body.priceTiers)

  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    priceTiers: req.body.priceTiers,
    metaData: req.body.metaData,
    imageData: req.body.imageData,
    draft: req.body.draft,
  });
  console.log('new product', newProduct);
//   newProduct
//     .save()
//     .then((product) => {
//       console.log("product: ", product)
//       product = JSON.parse(JSON.stringify(product).split('"_id":').join('"id":'));
//       console.log("priceTiers: ", product.priceTiers.tiers)
//       return res.json(product)
//     })
//     .catch((err) => console.log(err));
});


// @route   POST /admin-products/edit/:id
// @desc    Edit a product
// @access  Private
router.put("/:id", async (req, res) => {
  console.log("update hit")
  console.log("id: ", req.params.id)
  console.log("body: ", req.body)
  await Product.updateOne({_id: req.params.id}, req.body)
  .then(async (product) => {
    product.save();
    product = await JSON.parse(JSON.stringify(product).split('"_id":').join('"id":'));
    return res.status(200).json(product)
  }).catch(err => {
    console.log(err)
    res.status(500).send("Failed to update.")
  })
})
// router.post("/edit/:id", (req, res) => {
//   Product.updateOne({_id: req.user.id}, req.body)
//   .then((product) => res.json(product))
//   .catch((error) => {
//     console.log(error);
//     res.status(500).send("error editing product");
//   })
// });

// @route   DELETE /admin-products/:id
// @id      id of product
// @desc    Delete a Product
// @access  Private
router.delete("/:id", async (req, res) => {
  console.log("Delete backend hit")
  console.log("params: ", req.params)
  console.log("id: ", req.params._id)
  Product.deleteOne({_id: req.params._id})
  .then(res => {
    console.log(res)
    res.status(200).send("item deleted")
  }).catch(err => {
    console.log(err)
    res.status(500).send("Deletion failed!")
  })
})
// router.delete("/:id", (req, res) => {
//   console.log("delete backend hit")
//   console.log("id: ", req.user.id)
//   Product.findById(req.user.id)
//     .then((product) => product.remove().then(() => res.status(200).send("Product sucessfully deleted")))
//     // .then((product) => product.remove().then(() => res.json({ success: true })))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json("Can't delete product");
//     })
// });

module.exports = router;