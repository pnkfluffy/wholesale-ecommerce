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
		text: `
			We've created your account, login with 
			${user.email}
			${user.password}
			${url}
		`
	})
}

// order confirm email


module.exports = { newUserEmail }