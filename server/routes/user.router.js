const express = require("express");
const router = express.Router();
const User = require('../schemas/userSchema')
const passport = require('../modules/passport')
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
	res.redirect((process.env.NODE_ENV === 'dev') ? 'http://localhost:3000/' : '/')
})

router.get('/login/google', passport.authenticate('google', {
	scope: ['https://www.googleapis.com/auth/plus.login']
}));

router.get('/user', rejectUnauthenticated, (req, res) => {
	let user = {
		name: req.user.name,
		favorites: req.user.favorites
	}
	res.send(user)
})

router.post('/update-user', rejectUnauthenticated, async (req, res) => {	
	try {
		await User.updateOne({ _id: req.user.id }, {
			positionX: req.body.x,
			positionY: req.body.y,
			locked: req.body.locked
		})
		res.sendStatus(200)
	} catch (error) {
		console.log(error);
		res.status(500).send('error updating user')
	}
})

router.post('/addFavoriteProduct', rejectUnauthenticated, async (req, res) => {	
		const productId = req.body;
		console.log("backend object",productId)
		User.findById({ _id: req.user.id })
		.then(user => {
			const newFavoritesArray = req.user.favorites;
			newFavoritesArray.push(productId);
			user
				.updateOne({ favorites: newFavoritesArray})
				.then(() => res.json(user.favorites))
				.catch(error => {
					console.log(error)
					res.status(500).send("Couldn't edit favorites products array")
				})
			})
			.catch(error => {
				console.log(error)
				res.status(500).send("Couldn't edit favorites products array")
			});
	});

	router.post('/deleteFavoriteProduct', rejectUnauthenticated, async (req, res) => {	
		const productId = req.body;
		User.findById({ _id: req.user.id })
		.then(user => {
			const index = req.user.favorites.indexOf(productId);
			const newFavoritesArray = req.user.favorites;
			newFavoritesArray.splice(index, 1)
			user
				.updateOne({ favorites: newFavoritesArray})
				.then(() => res.json(user.favorites))
				.catch(error => {
					console.log(error)
					res.status(500).send("Couldn't edit favorites products array")
				})
			});
	});

router.get('/login-uri', (req, res) => {
	res.send(process.env.DEV_URI)
})

router.get('/logout', rejectUnauthenticated, (req, res) => {
	req.logout();
	res.sendStatus(200);
})

module.exports = router;