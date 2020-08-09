const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODE_MAILER_USERNAME,
    pass: process.env.NODE_MAILER_PASSWORD
  }
})

const newUserEmail = user => {
  transporter.sendMail({
    from: process.env.NODE_MAILER_USERNAME,
    to: user.email,
    subject: `Welcome to CBDDY Wholesale!`,
    html: `<html>
    <div style="text-align: center">
      <h1 style="color: #59ba47">CBDDY</h1>
      <h1>ACCOUNT CREATED!</h1>
      <p>Password: ${user.password}</p><br/>
      <p>Login at: https://cbddy-wholesale-portal.herokuapp.com/ </p>
    </div>
  </html>`
  })
}

const confirmOrderEmail = (user, order, payment, client) => {
  const total = order.total / 100 + ',00'
  const created_at = payment.created_at
  const charge_date = payment.charge_date
  const addr_2 = client.address_line2 ? client.address_line2 : ''
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
					<p>YOUR CARD WILL BE CHARGED FOR THIS PURCHASE ON ${charge_date}</p>
					<table style="margin-left:auto;margin-right:auto;margin-bottom: 10px">
						<thead>
							<tr>
								<th>Payment Information</th>
								<th>Delivery Information</th>
							</tr>
						</thead>
						<tbody>
						<tr>
							<td>${client.given_name} ${client.family_name}</td>
							<td>${order.deliveryInfo.ClientFullName}</td>
						</tr>
						<tr>
							<td>${client.address_line1} ${addr_2}</td>
							<td>${order.deliveryInfo.ClientAddr1} ${order.deliveryInfo.ClientAddr2}</td>
						</tr>
						<tr>
							<td>${client.postal_code}</td>
							<td>${order.deliveryInfo.postal_code}</td>
						</tr>
						<tr>
							<td>${client.region}, ${client.city}</td>
							<td>${order.deliveryInfo.state}, ${order.deliveryInfo.city}</td>
						</tr>
					</table>
					${productsTable}<br/>
					<div style="text-align: right; margin-right: 10px; color: #59ba47; font-size: 25px; font-weight: bold;">TOTAL: ${total}</div>
					</div>
			   </html>`
  })
}

const trackingAddedEmail = (user, order, tracking) => {
  transporter.sendMail({
    from: process.env.NODE_MAILER_USERNAME,
    to: user.email,
    subject: `Your order has shipped!`,
    html: `<html>
    			<div style="text-align: center">
    				<h1 style="color: #59ba47">CBDDY</h1>
    				<h1>PRODUCT SHIPPED</h1>
    				<p>Order #${order._id}</p><br/>
    				<p>Your payment has gone through and your product has been shipped out.</p><br/>
    				<p>Carrier: ${tracking.company}</p>
    				<p>Tracking Number: ${tracking.number}</p>
    			</div>
    		</html>`
  })
}

const passwordChangedEmail = (user) => {
  console.log('sending email?', user)
  transporter.sendMail({
    from: process.env.NODE_MAILER_USERNAME,
    to: user.email,
    subject: `Your Password Has Been Changed`,
    html: `<html>
    			<div style="text-align: center">
    				<h1 style="color: #59ba47">CBDDY</h1>
    				<h1>PASSWORD CHANGED</h1>
    				<p>Your password has been successfully changed. If you were not the one to make this change, please reach out to us.</p><br/>
    			</div>
    		</html>`
  })
}

// order confirm email
//pass array of products into an html table
function productsToTable(products) {
  let i = 0
  let table =
    '<table style="margin-left:auto;margin-right:auto;"><thead><tr><th style="border:1px solid #59ba47;">ID</th><th style="border:1px solid #59ba47; width: 60%;">Product</th><th style="border:1px solid #59ba47;">Price</th><th style="border:1px solid #59ba47;">Total</th></tr></thead><tbody>'
  while (i < products.length) {
    let product = products[i]
    table =
      table +
      '<tr><td style="border:1px solid #59ba47; font-size: 10px">' +
      product.productId.toString() +
      '</td><td style="border:1px solid #59ba47;">' +
      product.productName +
      '</td><td style="border:1px solid #59ba47;">' +
      product.productPrice +
      '</td><td style="border:1px solid #59ba47;">' +
      product.productTotal +
      '</td></tr>'
    i++
  }
  table = table + '</table>'
  return table
}

module.exports = {
  newUserEmail,
  confirmOrderEmail,
  trackingAddedEmail,
  passwordChangedEmail
}
