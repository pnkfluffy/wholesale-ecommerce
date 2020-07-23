import React from 'react'
import { connect } from 'react-redux'
import CartQuantity from './cartQuantity'
import productImg from '../../resources/images/product_1.png'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

const mapStateToProps = state => ({
  state: state.reducer
})

class OrderCard extends React.Component {
  deleteProduct = () => {
    this.props.dispatch({
      type: 'DELETE_CART_ITEM',
      payload: this.props.productInfo._id
    })
  }

  render () {
    console.log('order', this.props.productInfo)
    return (
      <div className='order_card'>
        <div className='order_card_image_container'>
          <img
            className='order_card_image'
            src={productImg}
            alt='product_image'
          />
        </div>
        <div className='order_card_contents'>
          <div className='order_content'>
            <div className='order_card_product_name'>
              {this.props.productInfo.name}
            </div>
            <div className='order_card_id'>
              #{this.props.productInfo.product}
            </div>
          </div>
          <div className='order_card_quantities'>
            <CartQuantity productInfo={this.props.productInfo} />
            <b>price: ${this.props.total}</b>
            <div className='remove_from_cart_text' onClick={this.deleteProduct}>
              REMOVE FROM CART
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(OrderCard)
