import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { GreenButton } from '../reuseable/materialButtons'
import blank_image from '../../resources/images/blank_image.jpg'

const mapStateToProps = state => ({
  state: state.reducer
})

class favoriteProductCard extends React.Component {
  goToProduct = e => {
    const redirect_url = '/product/' + this.props.product._id.toString()
    e.stopPropagation()
    this.props.history.push(redirect_url)
  }

  removeFromWishlist = (productID) => {
      this.props.dispatch({
        type: 'DELETE_WISHLIST',
        payload: productID
      })
    }

  render () {
    const image = (this.props.images.length && this.props.images[0].url) ? this.props.images[0].url : blank_image;
    return (
      <div className='favorite_product_card_container'>
        <div className='favorite_product_card'>
          <div className='favorite_product_card_image_container'>
            <img
            className='favorite_product_image'
            alt='product_image'
            src={image}
            onClick={this.goToProduct}
          />
          </div>
          <div className='favorite_product_name'>
            {this.props.product.name}
            {/* <div className='favorite_product_order_number'>
              returnOrderNumber
            </div> */}
          </div>
          <span className='favorites_empty_space'></span>
          <GreenButton
          variant='contained'
          className='favorite_product_button'
          onClick={this.goToProduct}
        > Go to Product
        </GreenButton>
        <GreenButton
          variant='contained'
          className='favorite_product_button'
          onClick={this.removeFromWishlist(this.props.product._id)}
        > Remove from Wishlist
        </GreenButton>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(withRouter(favoriteProductCard))
