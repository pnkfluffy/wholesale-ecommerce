import React from 'react'
import { Link } from 'react-router-dom'
import AddToCartButton from './addToCartButton'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import productImg from '../../resources/images/product_1.png'

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
            <sub>
              {/* ${this.props.product.metaData.cbd} */}
              92.3%
            </sub>
          </span>{' '}
          |
          <span>
            THC
            <br />
            <sub>
              {/* ${this.props.product.metaData.thc} */}
              12.34%
            </sub>
          </span>{' '}
          |
          <span>
            CT
            <br />
            <sub>
              {/* ${this.props.product.metaData.units.quantity} */}
              {/* ${this.props.product.metaData.units.unit} */}
              30CT
            </sub>
          </span>
        </div>
        <AddToCartButton product={this.props.product} />
      </div>
    )
  }
}
export default connect(mapStateToProps)(withRouter(ProductCard))
