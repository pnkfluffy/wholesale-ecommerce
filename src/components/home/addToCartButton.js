import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import loading from '../../resources/images/loading.svg'
import { GreenButton } from '../reuseable/materialButtons'

const mapStateToProps = state => ({
  state: state.reducer
})

class AddToCartButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  isEmpty = obj => {
    console.log('checking if is empty')
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false
    }
    return true
  }

  createNewOrder = () => {
    console.log('new order')
    axios
      .post('orders/newOrder/' + this.props.product._id)
      .then(res => {
        this.setState({
          loading: false
        })
        this.props.dispatch({ type: 'ADD_ORDER', payload: res.data })
      })
      .catch(err => {
        this.setState({
          loading: false
        })
        console.log(err)
      })
  }

  addToOrder = () => {
    console.log('add order')
    const data = {
      productID: this.props.product._id
    }
    axios
      .post('orders/addProduct/' + this.props.state.order._id, data)
      .then(res => {
        this.setState({
          loading: false
        })
        this.props.dispatch({ type: 'ADD_ORDER', payload: res.data })
      })
      .catch(err => {
        this.setState({
          loading: false
        })
        console.log('error' + err)
      })
  }

  addToCart = e => {
    e.stopPropagation()
    this.setState({
      loading: true
    })
    //if there isn't an open cart, create one with the new item
    if (this.isEmpty(this.props.state.order)) this.createNewOrder()
    else {
      this.addToOrder()
    }
  }

  render () {
    return (
      <div className='product_card_button_container'>
        {this.state.loading ? (
          <img className='product_card_loading' alt='loading' src={loading} />
        ) : (
          <GreenButton
            variant='contained'
            className='add_to_cart_button'
            onClick={this.addToCart}
          >
            Add To Cart : ${this.props.product.price}
          </GreenButton>
        )}
      </div>
    )
  }
}
export default connect(mapStateToProps)(AddToCartButton)
