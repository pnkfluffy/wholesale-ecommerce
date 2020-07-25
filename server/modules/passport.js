const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2')
const User = require('../schemas/userSchema')

passport.use(new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password'
},
	function (username, password, cb) {
		User.findOne({ name: username }, async (err, user) => {
			if (err) { return cb(err); }
			if (!user) {
				return cb(null, false);
			};
			if (! await bcrypt.compare(password, user.password)) {
				return cb(null, false);
			}
			if (user.disabled) {
				accountDisabledEmail(email)
				return cb(null, false);
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
		console.log(profile);
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
	cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
	User.findOne({ _id: id }, function (err, user) {
		if (err) {
			return cb(err);
		}
		cb(null, user);
	});
});


module.exports = passport