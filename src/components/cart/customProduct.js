import React from 'react'

class CustomProduct extends React.Component {
	constructor(props){
		super(props)
	}

	render() {
		return (
			<div className='order_card'>
				<div className='order_card_contents'>
					<div className='order_content'>
						<div className='order_card_product_name' >{this.props.order.name}</div>
						<div className='order_card_id'>{this.props.order.description}</div>
					</div>
					<div className='order_card_quantities'>
						<b>price: ${this.props.order.total}</b>
					</div>
				</div>
			</div >
		)
	}
}

export default CustomProduct