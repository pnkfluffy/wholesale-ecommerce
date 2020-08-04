const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.NODE_MAILER_USERNAME,
		pass: process.env.NODE_MAILER_PASSWORD
	}
})

const newUserEmail = (user, url) => {
	transporter.sendMail({
		from: process.env.NODE_MAILER_USERNAME,
		to: user.email,
		subject: `Welcome to CBDDY Wholesale!`,
		text:
		`We've created your account, your temporary password is:
		${user.password}
		Login at https://cbddy-wholesale-portal.herokuapp.com/
		`
	})
}

const confirmOrderEmail = (user, order, payment) => {
	transporter.sendMail({
		from: process.env.NODE_MAILER_USERNAME,
		to: user.email,
		subject: `Purchase Confirmed!`,
		text: ` 
		${user.email}
		${JSON.stringify(order)}
		${JSON.stringify(payment)}
		`
	})
}

const trackingAddedEmail = (user, order, payment, tracking) => {
	transporter.sendMail({
		from: process.env.NODE_MAILER_USERNAME,
		to: user.email,
		subject: `Your order has shipped!`,
		text: `
		${JSON.stringify(order, payment)}
		${tracking}
		`
	})
}

// order confirm email


module.exports = { newUserEmail, confirmOrderEmail, trackingAddedEmail }