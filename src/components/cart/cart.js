import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
/*components*/
import OrderCard from './orderCard'
import { getPriceByQuantity } from '../reuseable/getPriceByQuantity'
import { v4 } from 'uuid'
import { GreenButton } from '../reuseable/materialButtons'
import GoCardless from "./goCardless";

const mapStateToProps = state => {
  return {
    state: state.reducer
  }
}

class Cart extends React.Component {
  render () {
    let total = 0
    console.log(this.props.state.cart);
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
        <div className="cart_page">
          <div className='cart'>
            <div className='page_header'>
              Cart
            </div>
            {this.props.state.cart.length ? (
              <div className='cart_body'>
                <div className='cart_products'>{cartProducts}</div>
              </div>
            ) : (
              <b> Your cart is empty! </b>
            )}
          </div>
          {(() => {
            if (this.props.state.cart.length)
              return <GoCardless total={total}/>
          })()}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Cart)