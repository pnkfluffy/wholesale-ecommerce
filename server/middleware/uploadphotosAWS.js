const multer = require("multer");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

// const uploadPhotos = multer({ storage }).array("photo");

const uploadProductPhotos = async (req, res, next) => {
  multer({ storage }).array("photo");
  const myBucket = "cbddy-wholesale-product-photos";

  const file = req.files;
  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: myBucket,
  });

  let ResponseData = [];
  s3bucket.createBucket(function () {
    file.map((item) => {
      var params = {
        Bucket: myBucket,
        Key: item.originalname,
        Body: item.buffer,
        ContentEncoding: 'base64',
        ContentType: "image/jpeg",
        ACL: "public-read",
      };
      s3bucket.upload(params, function (err, data) {
        console.log("this");
        if (err) {
          res.json({ error: true, Message: err });
        } else {
          ResponseData.push(data);
          console.log("that", data);
          //  only fires on last image upload
          if (ResponseData.length === file.length) {
            console.log("image uploaded: ", item.originalname);
            res.json({
              error: false,
              Message: "File Upload Success",
              Data: ResponseData,
            });
          }
        }
      });
    });
  });
}

module.exports = uploadProductPhotos;


// router.post("/upload-images", rejectUnauthenticated, uploadPhotos, function (
//   req,
//   res
// ) {
//   const myBucket = "cbddy-wholesale-product-photos";

//   const file = req.files;
//   let s3bucket = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     Bucket: myBucket,
//   });

//   let ResponseData = [];
//   s3bucket.createBucket(function () {
//     file.map((item) => {
//       var params = {
//         Bucket: myBucket,
//         Key: item.originalname,
//         Body: item.buffer,
//         ContentEncoding: 'base64',
//         ContentType: "image/jpeg",
//         ACL: "public-read",
//       };
//       s3bucket.upload(params, function (err, data) {
//         console.log("this");
//         if (err) {
//           res.json({ error: true, Message: err });
//         } else {
//           ResponseData.push(data);
//           console.log("that", data);
//           //  only fires on last image upload
//           if (ResponseData.length === file.length) {
//             console.log("image uploaded: ", item.originalname);
//             res.json({
//               error: false,
//               Message: "File Upload Success",
//               Data: ResponseData,
//             });
//           }
//         }
//       });
//     });
//   });
// });