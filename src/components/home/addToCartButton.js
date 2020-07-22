import React from 'react'
import { connect } from 'react-redux'
import { GreenButton } from '../reuseable/materialButtons'
import { addToCart } from '../cart/cartFunctions'

const mapStateToProps = state => ({
  state: state.reducer
})

class AddToCartButton extends React.Component {
  isEmpty = obj => {
    console.log('checking if is empty')
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false
    }
    return true
  }

  addToCart = e => {
    e.stopPropagation()

    addToCart(this.props.product._id)
  }

  render () {
    return (
      <div className='product_card_button_container'>
        <GreenButton
          variant='contained'
          className='add_to_cart_button'
          onClick={this.addToCart}
        >
          Add To Cart : ${this.props.product.price}
        </GreenButton>
      </div>
    )
  }
}
export default connect(mapStateToProps)(AddToCartButton)
