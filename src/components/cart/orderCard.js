import React from 'react'
import { connect } from 'react-redux'
import CartQuantity from './cartQuantity'
import { editCartQuantity } from './cartFunctions'
import productImg from '../../resources/images/product_1.png'

const mapStateToProps = state => ({
  state: state.reducer
})

class OrderCard extends React.Component {
  deleteProduct = () => {
    editCartQuantity(this.props.productInfo._id, 0)
  }

  render () {
    console.log('order', this.props.productInfo)
    return (
      <div className='order_card'>
        <img src={productImg} alt='product_image' />
        <div className='order_content'>
          <h2>{this.props.productInfo.name}</h2>
          <div className='manage_quantity'>
            <CartQuantity productID={this.props.productInfo._id} />
          </div>
          <b>price {this.props.total}</b>

          <div className='delete_product_button' onClick={this.deleteProduct}>
            Delete
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(OrderCard)
