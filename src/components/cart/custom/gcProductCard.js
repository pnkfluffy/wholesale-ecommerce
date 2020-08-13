import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { compose } from 'redux'
import Swal from "sweetalert2";

const mapStateToProps = state => ({
  state: state.reducer
})

class GCProductCard extends React.Component {
  deleteProduct = async () => {
    let product = this.props.product
    let res = Swal.fire({
      title: `Removing ${product.name} from your cart`,
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'remove',
      cancelButtonText: 'nevermind',
      background: '#1E1F26',
      customClass: {
        confirmButton: 'swal_confirm_button',
        content: 'swal_text',
        title: 'swal_text'
      },
    }).then(res => {
      // console.log(res);
      if (res.value) {
        this.props.dispatch({
          type: 'DELETE_CART_ITEM',
          payload: { id: this.props.product.product._id }
        })

      }
    })
    return res;
  }

  goToProduct = e => {
    const redirect_url = '/product/' + this.props.productInfo._id.toString()
    e.stopPropagation()
    this.props.history.push(redirect_url)
  }

  render() {
    const product = this.props.product.product;
    const quantity = this.props.product.quantity;
   
    let image;
    if (product.imageData && product.imageData[0])
      image = product.imageData[0].url;

    const productLink = this.props.available
      ? '/product/' + this.props.product._id.toString()
      : ''

      console.log(product);
      

    return (
      <div className='order_details_card'>
        <div className='order_card_contents'>
          <div className='order_content'>
            <div className='order_card_product_name'>
              {product.name}
            </div>
            <div className='order_card_id'>#{product._id}</div>
          </div>

          <div className='gc_product_card_right_side'>
            <div className='product_in_order_card_values'>
              <div className="gc_product_card_units">
                <div>Quantity</div>
                <div className='product_in_order_card_quantity'>
                  {quantity}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(withRouter, connect(mapStateToProps))(GCProductCard)
