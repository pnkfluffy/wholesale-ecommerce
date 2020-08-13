import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { GreenButton } from '../reuseable/materialButtons'

import blank_image from '../../resources/images/blank_image.jpg'

const mapStateToProps = state => ({
  state: state.reducer
})

class ProductCard extends React.Component {
  goToProduct = e => {
    const redirect_url = '/product/' + this.props.product._id.toString()
    e.stopPropagation()
    this.props.history.push(redirect_url)
  }

  render () {
    const product = this.props.product
    const metaData = product.metaData
    const image =  (product.imageData.length && product.imageData[0].url) ? product.imageData[0].url : blank_image
    const cbd_contents = metaData.cbd.quantity + metaData.cbd.unit
    const thc_contents = metaData.thc.quantity + metaData.thc.unit
    const units = metaData.units.quantity + metaData.units.unit

    return (
        <div className='product_card' onClick={this.goToProduct}>
        <div className='product_card_image'>
          <img alt='product_image' src={image} />
        </div>
        <div className='product_name'>{this.props.product.name}</div>
        <div className='product_metadata'>
          <span>
            CBD
            <br />
            <sub>{cbd_contents}</sub>
          </span>{' '}
          |
          <span>
            THC
            <br />
            <sub>{thc_contents}</sub>
          </span>{' '}
          |
          <span>
            CT
            <br />
            <sub>{units}</sub>
          </span>
        </div>
        <div className='product_card_button_container'>
        <GreenButton
          variant='contained'
          className='add_to_cart_button'
          onClick={this.addToCart}
        >
          VIEW ITEM : ${this.props.product.price.toFixed(2)}
        </GreenButton>
      </div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(withRouter(ProductCard))
