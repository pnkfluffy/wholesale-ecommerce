import React from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import CartQuantity from './cartQuantity'
import blank_image from '../../resources/images/blank_image.jpg'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  state: state.reducer
})

class OrderCard extends React.Component {
  deleteProduct = async () => {
    let product = this.props.product
    const res = await Swal.fire({
      title: `Removing ${product.name} from your cart`,
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'remove',
      cancelButtonText: 'nevermind',
      background: '#1E1F26',
      customClass: {
        confirmButton: 'swal_confirm_button'
      }
    }).then(res => {
      // console.log(res);
      if (res.isDismissed) {
        let quantity = this.props.product.quantity;
        // console.log(quantity);
        if (!quantity)
          quantity = 1;
        this.props.dispatch({
          type: 'UPDATE_CART_ITEM',
          payload: {
            id: this.props.product._id,
            quantity: quantity,
            name: this.props.product.name
          }
        })
        return false;
      }
      else if (res.value) {
        this.props.dispatch({
          type: 'DELETE_CART_ITEM',
          payload: { id: this.props.product._id }
        })
        return true;
      }
    })
    return res;
  }

  goToProduct = e => {
    const redirect_url = '/product/' + this.props.product._id.toString()
    e.stopPropagation()
    this.props.history.push(redirect_url)
  }

  render() {
    const product = this.props.product
    const image = (product.imageData.length && product.imageData[0].url) ? product.imageData[0].url : blank_image
    return (
      <div className='order_card'>
        <div className='order_card_image_container'>
          <img className='order_card_image' src={image} alt='product_image' />
        </div>
        <div className='order_card_contents'>
          <div className='order_content'>
            <div className='order_card_product_name' onClick={this.goToProduct}>{product.name}</div>
            <div className='order_card_id'>#{product._id}</div>
          </div>
          <div className='order_card_quantities'>
            <CartQuantity
              productInfo={product}
              deleteProduct={this.deleteProduct}
            />
            <b>price: ${this.props.total.toFixed(2)}</b>
            <div className='remove_from_cart_text' onClick={this.deleteProduct}>
              REMOVE FROM CART
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(OrderCard))
