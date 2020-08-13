const express = require('express')
const router = express.Router()
const uploadProductPhotos = require('../modules/uploadphotosAWS')
const { rejectNonAdmin, rejectNonOwner } = require('../modules/authentication-middleware')

const Product = require('../schemas/productSchema')

//getList
router.get('/', rejectNonAdmin, (req, res) => {
  try {
    const filterQuery = JSON.parse(req.query.filter)
    let filter =
    Object.entries(filterQuery).length !== 0
      ? JSON.parse(req.query.filter)
      : { deleted: 'false' }
    console.log('Product List backend hit')
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

    Product.find(filter)
      .sort(sort)
      .skip(rangeQuery[0])
      .limit(rangeLimit)
      .then(products => {
        Product.countDocuments().then(contentRange => {
          res.set('content-range', JSON.stringify(contentRange))
          products = JSON.parse(
            JSON.stringify(products)
              .split('"_id":')
              .join('"id":')
          )
          res.json(products)
        })
      })
  } catch (error) {
    // console.log(error)
    res.status(500).send('no users found')
  }
})

//getOne
router.get('/:id', rejectNonAdmin, (req, res) => {
  // console.log('getOne product hit ')

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
      // console.log('error: ', err)
      res.status(500).send('user not found.')
    })
})

// {!}  WRITE REJECTADMINUNAUTHENTICATED AND ADD TO ALL ADMIN ROUTES
// @route   POST /admin-products
// @desc    Posts new product
// @access  Private
router.post('/', rejectNonAdmin, uploadProductPhotos, async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: parseFloat(req.body.price.toFixed(2)),
      priceTiers: req.body.priceTiers,
      metaData: req.body.metaData,
      imageData: req.imageMetaData,
      draft: req.body.draft
    })
    newProduct.save().then(product => {
      product = JSON.parse(
        JSON.stringify(product)
          .split('"_id":')
          .join('"id":')
      )
      res.json(product)
    })
  } catch (error) {
    // console.log(error)
    res.status(500).send('error on creating product, fields were missing')
  }
})

// @route   PUT /admin-products/edit/:id
// @desc    Edit a product
// @access  Private
router.put('/:id', rejectNonAdmin, uploadProductPhotos, async (req, res) => {
  // console.log('update hit', req.params.id)
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
      // console.log(err)
      res.status(500).send('Failed to update.')
    })
})

// @route   DELETE /admin-products/:id
// @id      id of product
// @desc    Delete a Product
// @access  Private
router.delete('/:id', rejectNonOwner, async (req, res) => {
  // console.log('Delete backend hit')
  // console.log('params: ', req.params)
  Product.updateOne({ _id: req.params.id }, { deleted: true })
    .then(result => {
      // console.log(result)
      res.json('item deleted')
    })
    .catch(err => {
      // console.log(err)
      res.status(500).send('Deletion failed!')
    })
})

module.exports = router
