const multer = require('multer')
const AWS = require('aws-sdk')
const dotenv = require('dotenv')

dotenv.config()

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '')
  }
})

const uploadProductPhotos = async (req, res, next) => {
  multer({ storage }).array('photo')
  const myBucket = 'cbddy-wholesale-product-photos'
  console.log('tryna upload')

  //  checks if no images
  if (!req.body.imageData || !req.body.imageData.length) {
    req.imageMetaData = req.body.imageData || []
    next()
    return
  }

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: myBucket
  })

  let responseData = []
  s3bucket.createBucket(function () {
    req.body.imageData.map(image => {
      //  if image not new
      if (!image.src) {
        responseData.push(image)
      } else {
        console.log('title', image.title)
        const buf = Buffer.from(
          image.src.replace(/^data:image\/\w+;base64,/, ''),
          'base64'
        )
        var params = {
          Bucket: myBucket,
          Key: image.title,
          Body: buf,
          ContentEncoding: 'base64',
          ContentType: 'image/jpeg',
          ACL: 'public-read'
        }
        s3bucket.upload(params, function (err, data) {
          console.log('this', data)
          if (err) {
            console.log('ERROR UPLOADING IMAGES')
            res.json({ error: true, Message: err })
          } else {
            responseData.push({
              bucket: data.Bucket,
              key: data.Key,
              url: data.Location
            })
            //  only fires on last image upload
            if (responseData.length === req.body.imageData.length) {
              req.imageMetaData = responseData
              next()
            }
          }
        })
      }
    })
  })
}

module.exports = uploadProductPhotos
