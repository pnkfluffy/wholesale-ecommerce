import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import loading from '../../resources/images/loadingBig.svg'
import GCFillInfo from './gcFillInfo'
import GCPay from './gcPay'
import GCProductCard from "./gcProductCard";
import GCPaymentInfo from "./gcPaymentInfo";
import store from "../../redux/store";
import Swal from "sweetalert2";
import {getPriceByQuantity} from "../reuseable/getPriceByQuantity";

const mapStateToProps = state => ({
  state: state.reducer
})

class GoCardless extends React.Component {
  constructor (props) {
    super(props)
    this.confirmAccount()
  }

  confirmAccount = () => {
    let params = new URLSearchParams(window.location.href)

    const url = `${this.props.state.devURI}/buy?redirect_flow_id`
    if (params.has(url)) {
      const redirect = params.get(url)
      this.props.history.replace('/buy')
      axios
        .post('/api/gc/completeRedirect', {redirect: redirect})
        .then(res => {
          store.dispatch({
            type: 'YES_MANDATE'
          })
          Swal.fire({
            title: '<span class="swal_title"> SUCCESS',
            text: "Your payment method has been updated!",
            icon: 'success',
            background: '#1E1F26',
            customClass: {
              confirmButton: 'swal_confirm_button'
            }
          })
        })
        .catch(err => {
          Swal.fire({
            title: '<span class="swal_title"> ERROR',
            text: "Something went wrong trying to change you payment method, please try again!",
            icon: 'error',
            background: '#1E1F26',
            customClass: {
              confirmButton: 'swal_confirm_button'
            }
          })
        })
     }
  }

  render () {
    let total = 0;
    const products = this.props.state.cart.map((cartProduct, index) => {
      //only give price to product available
      if (!cartProduct.deleted) {
        const productTotal = getPriceByQuantity(
            cartProduct.priceTiers,
            cartProduct.quantity,
            cartProduct.price
        )
        total += productTotal
        return {
          product: cartProduct,
          price: productTotal,
          quantity: cartProduct.quantity
        }
      }})
      total.toFixed(2)

    const productsList = products.map((product, index) => {
            return <GCProductCard product={product} key={index}/>
        })
    return (
      <div className='buy'>
        {(() => {
          if (!this.props.state.hasMandate) {
            return <GCFillInfo total={total}/>
          } else {
            return <GCPay total={total}/>
         }
        })()}
        <div className="cart_products_payment">
        {this.props.state.hasMandate ? <GCPaymentInfo />: null}
          {productsList}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(GoCardless)
