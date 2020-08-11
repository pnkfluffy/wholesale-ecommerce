import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { GreenButton } from '../reuseable/materialButtons'
import blank_image from '../../resources/images/blank_image.jpg'
import CancelIcon from '@material-ui/icons/Cancel';

const mapStateToProps = state => ({
  state: state.reducer
})

class wishlistProductCard extends React.Component {
  goToProduct = e => {
    const redirect_url = '/product/' + this.props.product._id.toString()
    e.stopPropagation()
    this.props.history.push(redirect_url)
  }

  removeFromWishlist = () => {
    this.props.dispatch({
      type: 'DELETE_WISHLIST',
      payload: this.props.id
    })
  }

  render() {
    let wishlist_CancelIcon = {
      width: '1.7vw',
      height: '1.7vw',
    };

    if (this.props.product === null) {
      return (
        <div className='wishlist_product_card_container'>
          <div className='wishlist_product_card'>
            <div className='wishlist_product_card_image_container'>
            </div>
            <div className='wishlist_product_name'>
              Product Unavailable
              {/* <div className='favorite_product_order_number'>
              returnOrderNumber
            </div> */}
            </div>
            <span className='wishlist_empty_space'></span>
            <div className='remove_button_container'>
              <CancelIcon onClick={this.removeFromWishlist} style={wishlist_CancelIcon} />
            </div>
          </div>
        </div>
      )
    }

    const image = (this.props.images.length && this.props.images[0].url) ? this.props.images[0].url : blank_image;

    return (
      <div className='wishlist_product_card_container'>
        <div className='wishlist_product_card'>
          <div className='wishlist_product_card_image_container'>
            <img
              className='wishlist_product_image'
              alt='product_image'
              src={image}
              onClick={this.goToProduct}
            />
          </div>
          <div className='wishlist_product_name'>
            {this.props.product.name}
            {/* <div className='favorite_product_order_number'>
              returnOrderNumber
            </div> */}
          </div>
          <span className='wishlist_empty_space'></span>
          <GreenButton
            variant='contained'
            className='wishlist_product_button'
            onClick={this.goToProduct}
          > Go to Product
        </GreenButton>
          <div className='remove_button_container'>
            <CancelIcon onClick={this.removeFromWishlist} style={wishlist_CancelIcon} />
          </div>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(withRouter(wishlistProductCard))
