const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2')
const User = require('../schemas/userSchema')

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