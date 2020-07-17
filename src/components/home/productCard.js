import React from 'react'
import AddToCartButton from './addToCartButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

import productImg from '../../resources/images/product_1.png'

class ProductCard extends React.Component {
  render () {
    return (
      <div className='product_card'>
        <div className='product_card_image'>
          <img alt='product_image' src={productImg} />
          <div className='product_card_heart'>
            <FavoriteBorderIcon />
          </div>
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
export default ProductCard
