import React from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import CartQuantity from './cartQuantity'
import blank_image from '../../resources/images/blank_image.jpg'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  state: state.reducer
})

class UnavailableOrderCard extends React.Component {
  deleteProduct = async () => {
    let product = this.props.product
    this.props.dispatch({
      type: 'DELETE_CART_ITEM',
      payload: { id: this.props.product.product }
    })
  }

  render () {
    const product = this.props.product
    const image = blank_image
    return (
      <div className='unavailable_order_card'>
        <div className='order_card_image_container'>
          <img className='unavailable_order_card_image' src={image} alt='product_image' />
        </div>
        <div className='order_card_contents'>
          <div className='order_content'>
            <div className='unavailable_order_card_product_name'>{product.name}</div>
            <div className='unavailable_order_card_id'>#{product.product}</div>
          </div>
            <div className='unavailable_order_card_remove_area'>
              <div className='unavailable_order_card_remove_area_text'>
                PRODUCT NO LONGER AVAILABLE
              </div>
              <div className='unavailable_order_card_remove' onClick={this.deleteProduct}>REMOVE FROM CART</div>
            </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(UnavailableOrderCard))
