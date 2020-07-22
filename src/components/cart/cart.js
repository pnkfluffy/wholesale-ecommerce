import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateCartServer, editCartQuantity } from '../cart/cartFunctions'
import { getUserCart } from '../../index-init'
/*components*/
import OrderCard from './orderCard'

const mapStateToProps = state => {
  console.log('stateupdate', state)
  return {
    state: state.reducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: (productID, quantity) =>
      dispatch(editCartQuantity(productID, quantity))
  }
}

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

  componentDidMount = () => {
    getUserCart()
  }

  render () {
    let total = 0

    const cartProducts = this.props.state.cart.map((cartProduct, index) => {
      const productTotal = cartProduct.quantity * cartProduct.price
      total += productTotal

      return (
        <OrderCard
          productInfo={cartProduct}
          total={productTotal}
          key={index}
          // updateQuantity={this.props.updateQuantity()}
        />
      )
    })

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

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
