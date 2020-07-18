import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import loading from '../../resources/images/loading.svg'

const mapStateToProps = state => ({
  state: state.reducer
})

const mapDispatchToProps = dispatch => {
  return {
    updateQuantity: e => {
      dispatch({ type: 'ADD_ORDER', payload: e.target.value })
    }
  }
}

class Product extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  //   increaseQuantity = () => {
  //     this.setState({
  //       loading: true
  //     })

  //     const data = {
  //       productID: this.state.product._id
  //     }
  //     axios
  //       .post('/orders/addProduct/' + this.props.state.order._id, data)
  //       .then(res => {
  //         this.props.dispatch({ type: 'ADD_ORDER', payload: res.data })
  //         this.setState({
  //           quantity: this.state.quantity + 1,
  //           loading: false
  //         })
  //       })
  //       .catch(err => {
  //         this.setState({
  //           loading: false
  //         })
  //         console.log('error' + err)
  //       })
  //   }

  //   decreaseQuantity = () => {
  //     this.setState({
  //       loading: true
  //     })

  //     axios({
  //       method: 'delete',
  //       url: '/orders/deleteInQuantity/' + this.props.state.order._id,
  //       headers: {},
  //       data: {
  //         productID: this.state.product._id
  //       }
  //     })
  //       .then(res => {
  //         this.props.dispatch({ type: 'ADD_ORDER', payload: res.data })
  //         this.setState({
  //           quantity: this.state.quantity - 1,
  //           loading: false
  //         })
  //       })
  //       .catch(err => {
  //         this.setState({
  //           loading: false
  //         })
  //         console.log(err)
  //       })
  //   }

  changeQuantity = quantity => {
    this.setState({
      loading: true
    })

    const data = {
      productID: this.props.productID,
      quantity
    }
    console.log(data)
    axios
      .post('/orders/changeQuantity/' + this.props.state.order._id, data)
      .then(res => {
        this.props.dispatch({ type: 'ADD_ORDER', payload: res.data })
        this.setState({
          loading: false
        })
      })
      .catch(err => {
        this.setState({
          loading: false
        })
        console.log('error' + err)
      })
  }

  onSubmit = e => {
    e.preventDefault()
    if (this.state.quantity === '0') this.deleteProduct()
    else this.changeQuantity()
  }

  onChange = e => {
    this.setState({
      quantity: e.target.value
    })
  }

  render () {
    const productID = this.props.state.productID
    let productInOrder

    if (this.props.state.order.products) {
      productInOrder = this.props.state.order.products.find(
        product => product.product === productID
      )
    }
    const quantity = productInOrder ? productInOrder.quantity : 0;
    console.log("product", productInOrder, quantity);

    return (
      <div className='product_quantity'>
        <div className='order_quantity_button' onClick={this.decreaseQuantity}>
          -
        </div>
        <b>Quantity</b>
        {(() => {
          if (this.state.loading) {
            return <img alt='loading' src={loading} />
          } else {
            return (
              <form noValidate onSubmit={this.onSubmit}>
                <input
                  onChange={this.onChange}
                  className='order_card_input'
                  value={quantity}
                  type='number'
                />
              </form>
            )
          }
        })()}
        <div className='order_quantity_button' onClick={this.increaseQuantity}>
          +
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(Product)
