import React from 'react'
import { Link } from 'react-router-dom'
import AddToCartButton from '../home/addToCartButton'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import productImg from '../../resources/images/product_1.png'

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
      <div className='favorite_product_card'>
        <div className='favorite_product_card_image' >
          <img alt='favorite_product_image' src={productImg} onClick={this.goToProduct} />
        </div>
        <div className='favorite_product_name'>{this.props.product.name}</div>
        <div className='favorite_product_button_container'>
        <button className='favorite_product_button'>Go to Product</button>
        <button className='favorite_product_button'>Order again</button>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(withRouter(favoriteProductCard))
