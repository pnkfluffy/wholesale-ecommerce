import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FavoritesHeart from '../reuseable/favoritesHeart'

const mapStateToProps = state => ({
  state: state.reducer
})

class favoriteProductCard extends React.Component {
  goToProduct = e => {
    const redirect_url = '/product/' + this.props.product._id.toString()
    e.stopPropagation()
    this.props.history.push(redirect_url)
  }

  render () {
    return (
      <div className='outside_favorite_product_card_container'>
        <div className='favorite_product_card'>
          <div className='favorite_product_card_image_container'>
            <img
            className='favorite_product_image'
            alt='product_image'
            src={this.props.images[0].url}
            onClick={this.goToProduct}
          />
          </div>
          <div className='favorite_product_name'>
            {this.props.product.name}
            <div className='favorite_product_order_number'>
              returnOrderNumber
            </div>
          </div>
          <span className='empty_space'></span>
          <div className='favorite_product_button' onClick={this.goToProduct}>
            Go to Product
          </div>
        </div>
        <div className='outside_heart_container'>
          <div className='heart_container'>
            <FavoritesHeart productID={this.props.product._id} chooseStyle={true}/>
            </div>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(withRouter(favoriteProductCard))
