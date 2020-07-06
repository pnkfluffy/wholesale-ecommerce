const express = require('express')
const app = express()
const server = require('http').createServer(app)
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const path = require('path');
const connectDB = require('./modules/db');
const helmet = require('helmet')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 5000
const passport = require('./modules/passport')
const sessionMiddleware = require('./modules/session-middleware')
const userRouter = require('./routes/user.router')

dotenv.config();

connectDB();

app.use(helmet())



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static('build'))
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use('/tile', tileRouter)
app.use('/auth', userRouter)
  
server.listen(PORT, () => {
	console.log(`listening on port: ${PORT}`);
})