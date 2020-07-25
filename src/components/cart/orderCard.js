import React from 'react'
import { connect } from 'react-redux'
import CartQuantity from './cartQuantity'
import blank_image from '../../resources/images/blank_image.jpg'

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
    const product = this.props.product
    const image = product.imageData ? product.imageData[0].url : blank_image

    console.log('order', product)
    return (
      <div className='order_card'>
        <div className='order_card_image_container'>
          <img className='order_card_image' src={image} alt='product_image' />
        </div>
        <div className='order_card_contents'>
          <div className='order_content'>
            <div className='order_card_product_name'>{product.name}</div>
            <div className='order_card_id'>#{product.product}</div>
          </div>
          <div className='order_card_quantities'>
            <CartQuantity productInfo={product} />
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
