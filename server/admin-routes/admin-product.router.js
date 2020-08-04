const express = require('express')
const router = express.Router()
const uploadProductPhotos = require('../modules/uploadphotosAWS')
const { rejectNonAdmin } = require('../modules/authentication-middleware')

const Product = require('../schemas/productSchema')

//getList
router.get('/', rejectNonAdmin, (req, res) => {
  console.log('Product List backend hit')
  // console.log("products req.query: ", req.query)
  let sort = {}
  if (!req.query.sort === undefined) {
    const sortQuery = JSON.parse(req.query.sort)
    sort[sortQuery[0]] = sortQuery[1] === 'ASC' ? 1 : -1
  }

  const filterQuery = JSON.parse(req.query.filter)

  if (JSON.stringify(filterQuery) !== '{}') {
    if (filterQuery.id) {
      filterQuery._id = filterQuery.id
      delete filterQuery.id
    }
    Product.find(filterQuery).then(filteredProducts => {
      res.set('content-range', JSON.stringify(filteredProducts.length + 1))
      //  each object needs to have an 'id' field in order for
      //  reactAdmin to parse
      filteredProducts = JSON.parse(
        JSON.stringify(filteredProducts)
          .split('"_id":')
          .join('"id":')
      )
      res.json(filteredProducts)
    })
  } else {
    Product.find()
      .sort(sort)
      .then(products => {
        res.set('content-range', JSON.stringify(products.length))
        //  each object needs to have an 'id' field in order for
        //  reactAdmin to parse
        products = JSON.parse(
          JSON.stringify(products)
            .split('"_id":')
            .join('"id":')
        )
        res.json(products)
      })
      .catch(error => {
        console.log(error)
        res.status(500).send('no users found')
      })
  }
})

//getOne
router.get('/:id', rejectNonAdmin, (req, res) => {
  console.log('getOne product hit ')

  Product.findOne({ _id: req.params.id })
    .then(product => {
      product = JSON.parse(
        JSON.stringify(product)
          .split('"_id":')
          .join('"id":')
      )
      res.json(product)
    })
    .catch(err => {
      console.log('error: ', err)
      res.status(500).send('user not found.')
    })
})

// {!}  WRITE REJECTADMINUNAUTHENTICATED AND ADD TO ALL ADMIN ROUTES
// @route   POST /admin-products
// @desc    Posts new product
// @access  Private
router.post('/', rejectNonAdmin, uploadProductPhotos, async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    priceTiers: req.body.priceTiers,
    metaData: req.body.metaData,
    imageData: req.imageMetaData,
    draft: req.body.draft
  })
  newProduct
    .save()
    .then(product => {
      product = JSON.parse(
        JSON.stringify(product)
          .split('"_id":')
          .join('"id":')
      )
      res.json(product)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

// @route   PUT /admin-products/edit/:id
// @desc    Edit a product
// @access  Private
router.put('/:id', rejectNonAdmin, uploadProductPhotos, async (req, res) => {
  console.log('update hit', req.params.id)
  req.body.imageData = req.imageMetaData
  await Product.updateOne({ _id: req.params.id }, req.body)
    .then(product => {
      product = JSON.parse(
        JSON.stringify(product)
          .split('"_id":')
          .join('"id":')
      )
      res.json(product)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Failed to update.')
    })
})

// @route   DELETE /admin-products/:id
// @id      id of product
// @desc    Delete a Product
// @access  Private
router.delete('/:id', rejectNonAdmin, async (req, res) => {
  console.log('Delete backend hit')
  console.log('params: ', req.params)
  Product.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result)
      res.json('item deleted')
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Deletion failed!')
    })
})

module.exports = router
