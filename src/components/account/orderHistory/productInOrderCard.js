import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import blank_image from '../../../resources/images/blank_image.jpg'
import { compose } from 'redux'

const mapStateToProps = state => ({
  state: state.reducer
})

class ProductInOrderCard extends React.Component {
  goToProduct = e => {
    const redirect_url = '/product/' + this.props.productInfo._id.toString()
    e.stopPropagation()
    this.props.history.push(redirect_url)
  }

  render () {
    let image;
    if (this.props.imageData && this.props.imageData[0])
      image = this.props.imageData[0].url;
    else
      image = blank_image

    const productLink = this.props.available
      ? '/product/' + this.props.product.productId.toString()
      : ''

    return (
      <Link to={productLink} title='go to product'>
        <div className='order_details_card'>
          <div className='order_details_card_image_container'>
            <img
              className='order_details_card_image'
              src={image}
              alt='product_image'
            />
          </div>
          <div className='order_card_contents'>
            <div className='order_content'>
              <div className='order_card_product_name'>
                {this.props.product.productName}
              </div>
              <div className='order_card_id'>#{this.props.product.productId}</div>
            </div>

            <div className='product_in_order_card_right_side'>
              <div className='product_in_order_card_values'>
                <div>${this.props.product.productPrice}</div>
                <div className='product_in_order_card_quantity'>
                  {this.props.product.productQuantity}
                </div>
                <div className='product_in_order_card_total'>${this.props.product.productTotal.toFixed(2)}</div>
              </div>
              {this.props.available ? null : <div className="product_in_order_card_not_available">No longer available</div>}
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default compose(withRouter, connect(mapStateToProps))(ProductInOrderCard)
