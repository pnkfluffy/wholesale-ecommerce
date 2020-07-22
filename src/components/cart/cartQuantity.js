import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  state: state.reducer
})

class CartQuantity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.productInfo.quantity
    })
  }

  addQuantity = event => {
    this.setState({
      quantity: this.state.quantity + 1
    }, () => {
      this.dispatchQuantity()
    })
  }

  reduceQuantity = event => {
    this.setState({
      quantity: this.state.quantity - 1
    }, () => {
      this.dispatchQuantity()
    })
  }

  inputQuantity = event => {
    this.setState({
      quantity: parseInt(event.target.value, 10)
    }, () => {
      this.dispatchQuantity()
    })
  }

  dispatchQuantity = () => {
    console.log(this.state);
    this.props.dispatch({
      type: 'UPDATE_CART_ITEM',
      payload: {
        id: this.props.productInfo.product,
        quantity: this.state.quantity
      }
    })
  }

  render() {
    const quantity = this.state.quantity ? this.state.quantity : "";
    return (
      <div className='product_quantity'>
        <div
          className='order_quantity_button'
          name="reduce"
          onClick={this.reduceQuantity}
        >
          -
        </div>
        <b>Quantity</b>

        <input
          onChange={this.inputQuantity}
          className='order_card_input'
          value={quantity}
          type='number'
        />

        <div
          className='order_quantity_button'
          name="add"
          onClick={this.addQuantity}
        >
          +
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(CartQuantity)
