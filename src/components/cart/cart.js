import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateCartServer } from '../cart/cartFunctions'
/*components*/
import OrderCard from './orderCard'

const mapStateToProps = state => ({
  state: state.reducer
})

class Cart extends React.Component {
  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false
    }
    return true
  }

  deleteCart = () => {
    this.props.dispatch({ type: 'SET_CART', payload: [] })
    updateCartServer([])
  }

  render () {
    const cart = this.props.state.cart
    let total = 0;
    let cartProducts = []
    for (let i = 0; i < cart.length; i++) {
      const productInfo = this.props.state.products.products.find(
        stateProduct => stateProduct._id === cart[i].product
      )
      console.log('productinfo', productInfo);
      const productTotal = cart[i].quantity * productInfo.price
      cartProducts.push(
        <OrderCard productInfo={productInfo} total={productTotal} />
      )
      total += productTotal
    }

    return (
      <div className='cart'>
        <div className='top_cart_area'>
          <h1>cart</h1>
        </div>
        {(() => {
          if (!this.isEmpty(this.props.state.cart)) {
            return (
              <div className='cart_body'>
                <div className='cart_button_area'>
                  <Link to='/buy' className='cart_button'>
                    Buy {total}
                  </Link>
                  <div className='cart_button' onClick={this.deleteCart}>
                    Delete Cart
                  </div>
                </div>
                <div>{cartProducts}</div>
              </div>
            )
          } else {
            return <b>Your cart is empty! =( </b>
          }
        })()}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Cart)
