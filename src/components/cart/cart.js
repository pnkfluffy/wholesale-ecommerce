import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
/*components*/
import OrderCard from './orderCard'
import UnavailableOrderCard from './unavailableOrderCard'
import { getPriceByQuantity } from '../reuseable/getPriceByQuantity'
import { v4 } from 'uuid'
import GoCardless from './goCardless'
import { GreenButton } from '../reuseable/materialButtons'
import CustomProduct from './customProduct'

const mapStateToProps = state => {
  return {
    state: state.reducer
  }
}

class Cart extends React.Component {
  checkOut = (total, availableProducts) => {
    this.props.history.push({
      pathname: '/buy',
      state: {
        total: total,
        products: availableProducts
      }
    })
  }

  render() {
    let total = 0
    let availableProducts = []
    const cartProducts = this.props.state.cart.map((cartProduct, index) => {
      //only give price to product available
      if (!cartProduct.deleted) {
        const productTotal = getPriceByQuantity(
          cartProduct.priceTiers,
          cartProduct.quantity,
          cartProduct.price
        )
        total += parseFloat(productTotal, 10)
        availableProducts = [
          ...availableProducts,
          {
            product: cartProduct,
            price: productTotal,
            quantity: cartProduct.quantity
          }
        ]
        return (
          <OrderCard product={cartProduct} total={productTotal} key={v4()} />
        )
      } else {
        return <UnavailableOrderCard product={cartProduct} key={v4()} />
      }
    })
    console.log(availableProducts);


    const checkOutButton = this.props.state.cart.length ? (
      <div className='checkout_button_container'>
        <GreenButton
          variant='contained'
          className='checkout_button'
          onClick={e => this.checkOut(total, availableProducts)}
        >
          CHECK OUT: ${total.toFixed(2)}
        </GreenButton>
      </div>
    ) : null

    return (
      <div className='cart_page'>
        <div className='cart'>
          <div className='page_subheader'>Cart</div>
          {this.props.state.cart.length ? (
            <div className='cart_body'>
              <div className='cart_products'>{cartProducts}</div>
            </div>
          ) : (
              <div className="empty_cart"> Your cart is empty! </div>
            )}
          {checkOutButton}
        </div>
        {this.props.state.customOrder ? (
          <div className="custom_orders">
            <div className='page_subheader'>Custom Orders</div>
            <div className='custom_orders_body'>
              <CustomProduct order={this.props.state.customOrder} />
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Cart)
