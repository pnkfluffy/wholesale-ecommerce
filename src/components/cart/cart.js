import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
/*components*/
import OrderCard from './orderCard'
import { v4 } from 'uuid'

const mapStateToProps = state => {
  return {
    state: state.reducer
  }
}

class Cart extends React.Component {
  render () {
    let total = 0

    const cartProducts = this.props.state.cart.map((cartProduct, index) => {
      const productTotal = cartProduct.quantity * cartProduct.price
      total += productTotal

      return (
        <OrderCard productInfo={cartProduct} total={productTotal} key={v4()} />
      )
    })

    return (
      <div className='cart'>
        <div className='top_cart_area'>
          <h1>cart</h1>
        </div>
        {(() => {
          if (this.props.state.cart.length > 0) {
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
