const multer = require('multer')
const AWS = require('aws-sdk')
const dotenv = require('dotenv')

dotenv.config()

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '')
  }
})

const uploadProductPhotos = (req, res, next) => {
  multer({ storage }).array('photo')
  const myBucket = 'cbddy-wholesale-product-photos'

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

  let responseData = req.body.imageData.map((image, index) => {
    //  if image is new, it will have a src field containing the b64 data
    //  and a title field containing the name of the image
    if (!image.src) {
      return image
    }

    const buf = Buffer.from(
      image.src.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    )
    let params = {
      Bucket: myBucket,
      Key: image.title,
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
      ACL: 'public-read'
    }
    return s3bucket.upload(params).promise()
  })

  Promise.all(responseData).then(values => {
    // console.log('success', values);
    req.imageMetaData = values.map(data => {
      return ({
        bucket: data.Bucket || data.bucket,
        key: data.Key || data.key,
        url: data.Location || data.url
      })
    })
    next()
  })
}

module.exports = uploadProductPhotos
