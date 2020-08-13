import React from 'react'
import { connect } from 'react-redux'
import { GreenButton } from '../reuseable/materialButtons'
import { withRouter } from 'react-router-dom'


const mapStateToProps = state => ({
	state: state.reducer
})

class CustomProduct extends React.Component {
	constructor(props) {
		super(props)
	}

	checkOut = (total, availableProducts) => {
		this.props.history.push({
			pathname: '/custom-buy',
			state: {
				total: total,
				products: availableProducts
			}
		})
	}

	render() {
		let availableProducts = []
		let orderProducts = this.props.order.products.map((product, index) => {

			let productInfo = this.props.state.products.products.find(prod => prod._id === product.product)
			availableProducts.push({
				product: productInfo,
				quantity: product.quantity
			})
			if (!productInfo) {
				return null
			}
			return (
				<div key={index}>
					<p>{product.quantity}x {productInfo.name}</p>
				</div>
			)
		})
		console.log(availableProducts);
		
		return (
			<div className='custom_order_card'>
				<div className='custom_order_card_contents'>
					<div className='custom_order_content'>
						<div className='custom_order_card_product_name' >{this.props.order.name}</div>
						<div className='custom_order_card_id'>{this.props.order.description}</div>
					</div>
					<div className='custom_order_card_quantities'>
						<b>was: ${this.props.order.standardPrice.toFixed(2)}</b>
						<b>is: ${this.props.order.price.toFixed(2)}</b>
					</div>
				</div>
				<div className="custom_order_products">
					{orderProducts}
				</div>
				<GreenButton
					variant='contained'
					className='checkout_button'
					style={{ width: "15vw" }}
					onClick={e => this.checkOut(this.props.order.price, availableProducts)}
				>
					CHECKOUT: ${this.props.order.price.toFixed(2)}
				</GreenButton>
			</div >
		)
	}
}

export default withRouter(connect(mapStateToProps)(CustomProduct))