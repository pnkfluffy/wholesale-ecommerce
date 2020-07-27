import React from 'react'
import { Link } from 'react-router-dom'
import AddToCartButton from './addToCartButton'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

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
    const image = product.imageData ? product.imageData[0].url : blank_image
    const cbd_contents = metaData.cbd.quantity + metaData.cbd.unit
    const thc_contents = metaData.thc.quantity + metaData.thc.unit
    const units = metaData.units.quantity + metaData.units.unit

    return (
      <div className='product_card'>
        <div className='product_card_image' >
          <img alt='product_image' src={productImg} onClick={this.goToProduct} />
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
            QT
            <br />
            <sub>{units}</sub>
          </span>
        </div>
        <AddToCartButton product={this.props.product} />
      </div>
    )
  }
}
export default connect(mapStateToProps)(withRouter(ProductCard))
