// const User = require('../schemas/userSchema')
// const Product = require('../schemas/productSchema')
// const Review = require('../schemas/reviewSchema')
// Review.updateMany(
//   { deleted: { $exists: false } },
//   { $set: { deleted: false } },
//   { multi: true },
//   function (err, data) {
//     if (!err) {
//       // console.log('success!')
//     } else {
//       // console.log('ERROR')
//     }
//   }
// )