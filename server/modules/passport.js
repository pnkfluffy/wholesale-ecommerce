const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2')
const User = require('../schemas/userSchema')
const Admin = require('../schemas/adminSchema')
const bcrypt = require("bcrypt");


passport.use(new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password'
},
	function (username, password, cb) {
		Admin.findOne({ email: username }, (err, user) => {
			if (err) { 
				console.log(err);
				return cb(err); 
			}
			if (!user) {
				return cb(403);
			}
			if (password !== user.password) {
				return cb(403);
			}
			else {
				return cb(null, user);
			}
		});
	}
));

passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: `${process.env.DEV_URI}/auth/google/callback`,
	passReqToCallback: true
},
	function (request, accessToken, refreshToken, profile, done) {
		User.findOne({ googleID: profile.id }, async (err, user) => {
			if (err) {
				console.log(err);
				return done(err)
			}
			console.log(user);
			if (user) {
				return done(null, user)
			}
			else {
				let newUser = new User({
					googleID: profile.id,
					name: profile.displayName
				})
				newUser = await newUser.save()
				return done(null, newUser)
			}
		})
	}
));


passport.serializeUser(function (user, cb) {	
	cb(null, user);
});

passport.deserializeUser(function (obj, cb) {	
	cb(null, obj);
});


module.exports = passport