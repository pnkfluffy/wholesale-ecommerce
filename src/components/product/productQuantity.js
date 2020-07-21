import React from 'react'
import { connect } from 'react-redux'
import { editCartQuantity } from '../cart/cartFunctions'

const mapStateToProps = state => ({
  state: state.reducer
})

class Product extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      quantity: 0
    }
  }

  componentDidMount () {
    const productInOrder = this.props.state.cart.find(
      cartItem => cartItem.product === this.props.productID
    )
    const quantity = productInOrder ? productInOrder.quantity : 0;
    this.setState({ quantity })
  }

  changeQuantity = quantity => {
    this.setState({ quantity: Number(quantity) })
    editCartQuantity(this.props.productID, quantity)
  }

  render () {
    const quantity = this.state.quantity ? this.state.quantity : "";
    return (
      <div className='product_quantity'>
        <div
          className='order_quantity_button'
          onClick={() => this.changeQuantity(this.state.quantity - 1)}
        >
          -
        </div>
        <b>Quantity</b>

        <input
          onChange={e => this.changeQuantity(e.target.value)}
          className='order_card_input'
          value={quantity}
          type='number'
        />

        <div
          className='order_quantity_button'
          onClick={() => this.changeQuantity(this.state.quantity + 1)}
        >
          +
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(Product)
