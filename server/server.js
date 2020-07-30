const express = require('express')
const app = express()
const server = require('http').createServer(app)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const connectDB = require('./modules/db')
const helmet = require('helmet')
const dotenv = require('dotenv')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const passport = require('./modules/passport')
const sessionMiddleware = require('./modules/session-middleware')

const gcRouter = require('./routes/goCardless.router')
const userRouter = require('./routes/user.router')
const orderRouter = require('./routes/order.router')
const productRouter = require('./routes/product.router')
const reviewRouter = require('./routes/reviews.router')
const cartRouter = require('./routes/cart.router')

const adminProductRouter = require('./admin-routes/admin-product.router')
const adminUserRouter = require('./admin-routes/admin-user.router')
const adminOrderRouter = require('./admin-routes/admin-order.router')
const adminReviewRouter = require('./admin-routes/admin-review.router')

dotenv.config()

connectDB()

app.use(helmet())
app.use(cors({ exposedHeaders: 'Content-Range' }))
app.options('*', cors())

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())
app.use(express.static("build"));
// app.use(express.static('src'))
app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())

/*Routers*/
app.use('/gc', gcRouter)
app.use('/auth', userRouter)
app.use('/cart', cartRouter)
app.use('/orders', orderRouter)
app.use('/products', productRouter)
app.use('/reviews', reviewRouter)

app.use('/admin-products', adminProductRouter)
app.use('/admin-users', adminUserRouter)
app.use('/admin-orders', adminOrderRouter)
app.use('/admin-reviews', adminReviewRouter)
app.use('/admin-users', adminUserRouter)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'), function (err) {
    if (err) {
      console.log(err);
    }
  })
})

server.listen(process.env.PORT || 5000, () => {
  console.log(`listening on port: ${PORT}`)
})
