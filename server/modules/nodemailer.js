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
	console.log(payment);
	const productsTable = productsToTable(order.products)
	transporter.sendMail({
		from: process.env.NODE_MAILER_USERNAME,
		to: user.email,
		subject: `Purchase Confirmed!`,
		html: `<html>
					<div style="text-align: center">
					<h1 style="color: #59ba47">CBDDY</h1> 
					<h1>PURCHASE CONFIRMED</h1>
					<p>#${order._id}</p>
					<table style="margin-left:auto;margin-right:auto;">
						<thead>
							<tr>
								<th>Payment Information</th>
								<th>Delivery Information</th>
							</tr>
						</thead>
						<tbody>
						<tr>
							<td></td>
							<td>${order.deliveryInfo.ClientFullName}</td>
						</tr>
						<tr>
							<td></td>
							<td>${order.deliveryInfo.ClientAddr1} ${order.deliveryInfo.ClientAddr2}</td>
						</tr>
						<tr>
							<td></td>
							<td>${order.deliveryInfo.postal_code}</td>
						</tr>
						<tr>
							<td></td>
							<td>${order.deliveryInfo.state}, ${order.deliveryInfo.city}</td>
						</tr>
					</table>
					${productsTable}<br/>
					<div style="text-align: right">TOTAL: ${order.total}</div>
					</div>
			   </html>`
	})
}

//pass array of products into an html table
function productsToTable (products){
	let i = 0;
	let table = "<table style=\"border:1px solid #59ba47;margin-left:auto;margin-right:auto;\"><thead><tr><th style=\"border:1px solid #59ba47;\">ID</th><th style=\"border:1px solid #59ba47; width: 100%;\">Product</th><th style=\"border:1px solid #59ba47;\">Price</th><th style=\"border:1px solid #59ba47;\">Total</th></tr></thead><tbody>"
	while (i < products.length)
	{
		let product = products[i]
		table = table + "<tr><td style=\"border:1px solid #59ba47; font-size: 10px\">" + product.productId.toString() + "</td><td style=\"border:1px solid #59ba47;\">" + product.productName + "</td><td style=\"border:1px solid #59ba47;\">" + product.productPrice + "</td><td style=\"border:1px solid #59ba47;\">" + product.productTotal + "</td></tr>"
		i++;
	}
	table = table + "</table>"
	return table;
} 


module.exports = { newUserEmail, confirmOrderEmail }