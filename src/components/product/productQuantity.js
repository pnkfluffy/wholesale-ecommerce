import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  state: state.reducer
})

class ProductQuantity extends React.Component {


  render () {
    const quantity = this.props.quantity ? this.props.quantity : "";
    return (
      <div className='product_quantity'>
        <div
          className='order_quantity_button'
          onClick={() => this.props.changeQuantity(this.props.quantity - 1)}
        >
          -
        </div>
        <b>Quantity</b>

        <input
          onChange={e => this.props.changeQuantity(e.target.value)}
          className='order_card_input'
          value={quantity}
          type='number'
        />

        <div
          className='order_quantity_button'
          onClick={() => this.props.changeQuantity(this.props.quantity + 1)}
        >
          +
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(ProductQuantity)
