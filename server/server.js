const express = require('express')
const app = express()
const server = require('http').createServer(app)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const connectDB = require('./modules/db')
const helmet = require('helmet')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 5000
const passport = require('./modules/passport')
const sessionMiddleware = require('./modules/session-middleware')
const userRouter = require('./routes/user.router')
const reviewRouter = require('./routes/reviews.router')
const gcRouter = require('./routes/goCardless.router')
const orderRouter = require('./routes/order.router')
const cartRouter = require('./routes/cart.router')
const productRouter = require('./routes/product.router')
const adminProductRouter = require('./admin-routes/product.router')
dotenv.config()

connectDB()

app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('build'))
app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())

/*Routers*/
app.use('/auth', userRouter)
app.use('/gc', gcRouter)
app.use('/cart', cartRouter)
app.use('/orders', orderRouter)
app.use('/products', productRouter)
app.use('/reviews', reviewRouter)

/*AdminRouters*/
app.use('/admin-products', adminProductRouter)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
