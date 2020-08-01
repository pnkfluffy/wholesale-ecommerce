import React from 'react'
import axios from 'axios'
import store from '../../redux/store'
import Swal from 'sweetalert2'

import { GreenButton } from '../reuseable/materialButtons'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import InputField from '../reuseable/InputField'
import loading from '../../resources/images/loadingBig.svg'

const USPS = require('usps-webtools')

const mapStateToProps = state => ({
  state: state.reducer
})

class GCPay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      paymentDone: false,
      readyToPay: false,
      ClientFirstName: '',
      ClientLastName: '',
      ClientAddr1: '',
      ClientAddr2: '',
      ClientCity: '',
      ClientPostalCode: '',
      ClientState: '',
      err: {
        ClientFirstName: '',
        ClientLastName: '',
        ClientAddr1: '',
        ClientAddr2: '',
        city: '',
        postal_code: '',
        state: '',
        invalidAddr: '',
        payment: ''
      }
    }
  }

  componentDidMount () {
    this.setState({
      loading: true
    })
    axios
      .get('/api/gc/oneClient')
      .then(res => {
        console.log(res.data)
        this.setState({
          loading: false,
          ClientFirstName: res.data.given_name,
          ClientLastName: res.data.family_name,
          ClientAddr1: res.data.address_line1,
          ClientAddr2: res.data.address_line2,
          ClientCity: res.data.city,
          ClientPostalCode: res.data.postal_code,
          ClientState: res.data.region
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          loading: false
        })
      })
  }

  collectPayment = async e => {
    e.preventDefault()
    this.setState({
      loading: true
    })
    const fullName =
      this.state.ClientFirstName + ' ' + this.state.ClientLastName
    const delivery = {
      ClientFirstName: this.state.ClientFirstName,
      ClientLastName: this.state.ClientLastName,
      ClientFullName: fullName,
      ClientAddr1: this.state.ClientAddr1,
      ClientAddr2: this.state.ClientAddr2,
      city: this.state.ClientCity,
      state: this.state.ClientState,
      postal_code: this.state.ClientPostalCode
    }
    axios
      .post('/api/gc/collectPayment/', {
        delivery: delivery
      })
      .then(res => {
        this.setState({
          loading: false,
          paymentDone: true
        })

        //add order to redux state orders
        let allOrders = this.props.state.orders;
        allOrders.push(res.data.order);
        console.log(allOrders);
        store.dispatch({type: 'ADD_ORDERS', payload: allOrders})
        
        //Clean the cart
        console.log('collecting payment')
        store.dispatch({ type: 'EMPTY_CART', payload: [] })

        //Redirect to order page where all the information + receipt are available
        const url = '/order/' + res.data.order._id
        this.props.history.push({
          pathname: url,
          state: {
            payment: res.data.payment,
            order: res.data.order
          }
        })
      })
      .catch(err => {
        if (err.response && err.response.data.errors) {
          Swal.fire('ERROR:', err.response.data.errors, 'error')
          this.setState({
            err: err.response.data.errors,
            loading: false
          })
        }
      })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    if (this.state.loading) {
      return <img src={loading} alt='loading' />
    } else if (!this.state.paymentDone) {
      return (
        <div className='gcpay_form_area'>
          <div className='payment_header'>Delivery Information</div>
          <form noValidate className='gc_form'>
            <InputField
              widthCSS='gc_input'
              title='First Name'
              name='ClientFirstName'
              value={this.state.ClientFirstName}
              type='text'
              changeField={this.onChange}
              placeholder=''
              error={this.state.err.ClientFirstName}
            />
            <InputField
              widthCSS='gc_input'
              title='Last Name'
              name='ClientLastName'
              value={this.state.ClientLastName}
              type='text'
              changeField={this.onChange}
              placeholder=''
              error={this.state.err.ClientLastName}
            />
            <InputField
              widthCSS='gc_input'
              title='Postal Code'
              name='ClientPostalCode'
              value={this.state.ClientPostalCode}
              type='number'
              changeField={this.onChange}
              placeholder=''
              error={this.state.err.postal_code}
            />
            <InputField
              widthCSS='gc_input'
              title='Address Line 1'
              name='ClientAddr1'
              value={this.state.ClientAddr1}
              type='text'
              changeField={this.onChange}
              placeholder=''
              error={this.state.err.ClientAddr1}
            />
            <InputField
              widthCSS='gc_input'
              title='Address Line 2'
              name='ClientAddr2'
              value={this.state.ClientAddr2}
              type='text'
              changeField={this.onChange}
              placeholder=''
            />
            <InputField
              widthCSS='gc_input'
              title='City'
              name='ClientCity'
              value={this.state.ClientCity}
              type='text'
              changeField={this.onChange}
              placeholder=''
              error={this.state.err.city}
            />
            <InputField
              widthCSS='gc_input'
              title='State'
              name='ClientState'
              value={this.state.ClientState}
              type='text'
              changeField={this.onChange}
              placeholder=''
              error={this.state.err.state}
            />
          </form>
          <div className='cart_button_area'>
            <span className='err'>{this.state.err.payment}</span>
            <GreenButton
              variant='contained'
              className='checkout_button'
              onClick={this.collectPayment}
            >
              CHECK OUT: ${this.props.total}
            </GreenButton>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Payment Done!</h1>
        </div>
      )
    }
  }
}
export default compose(withRouter, connect(mapStateToProps))(GCPay)
