import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
/*components*/
import OrderCard from './orderCard'
import { getPriceByQuantity } from '../reuseable/getPriceByQuantity'
import { v4 } from 'uuid'
import { GreenButton } from '../reuseable/materialButtons'

const mapStateToProps = state => {
  return {
    state: state.reducer
  }
}

class Cart extends React.Component {
  render () {
    let total = 0

    const cartProducts = this.props.state.cart.map((cartProduct, index) => {
      const productTotal = getPriceByQuantity(
        cartProduct.priceTiers,
        cartProduct.quantity,
        cartProduct.price
      )
      total += productTotal

      return (
        <OrderCard product={cartProduct} total={productTotal} key={v4()} />
      )
    })

    return (
      <div className='cart'>
        <div className='top_cart_area'>
          <h1>cart</h1>
        </div>
        {this.props.state.cart.length ? (
          <div className='cart_body'>
            <div className='cart_products'>{cartProducts}</div>
            <div className='cart_button_area'>
              <Link to='/buy' className='cart_button'>
                <GreenButton
                  variant='contained'
                  className='checkout_button'
                  onClick={this.addToCart}
                >
                  CHECK OUT: ${total}
                </GreenButton>
              </Link>
            </div>
          </div>
        ) : (
          <b> Your cart is empty! </b>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Cart)
