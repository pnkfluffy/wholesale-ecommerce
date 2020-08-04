import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ProductInOrderCard from './productInOrderCard'
import GetInvoice from './getInvoice'
import store from '../../redux/store'
import products from '../home/products'
import OrderInformation from './orderInformation'
import { GreenButton } from '../reuseable/materialButtons'

const mapStateToProps = state => ({
  state: state.reducer
})

class Order extends React.Component {
  componentDidMount () {
    axios
      .get('/api/gc/payments/from')
      .then(res =>
        this.setState({
          payments: res.data
        })
      )
      .catch(err => console.log(err))
  }

  printItems = products => {
    const productsWithInfo = products.map(product => {
      const productInfo = this.props.state.products.products.find(
        oneProduct => oneProduct._id === product.productId
      )

      return (
        <ProductInOrderCard
          product={product}
          imageData={productInfo ? productInfo.imageData : false}
          key={product.productId}
          available={!!productInfo}
        />
      )
    })
    return productsWithInfo
  }

  redoOrder = async order => {
    let orderToCartDB = [];
    const productsWithInfo = await order.products.map(product => {
      const allInfo = this.props.state.products.products.find(
        p => p._id === product.productId
      )
      if (allInfo)
      {
          orderToCartDB.push({
            id: product.productId,
            quantity: product.productQuantity,
            name: product.productName
          });
          allInfo.quantity = product.productQuantity
      }
      return allInfo
    })
    console.log(productsWithInfo);
    //add products to cart
    store.dispatch({ type: 'SET_CART', payload: productsWithInfo })
    //save cart in db
    console.log(orderToCartDB)
    axios
        .post('/api/cart', {cart: orderToCartDB})
        .then(res => {
          console.log('CART UPDATED', res.data)
        })
        .catch(err => {
          console.log(err)
        })

    //redirect to cart
    const url = '/cart'
    this.props.history.push(url)
  }

  organizeTotal = total => {
    const str = total.toString();
    const index = str.length - 2;
    const beforeComma = str.substring(0, index);
    const afterComma = str.substring(index);
    const totalOrganized = beforeComma + "," + afterComma;
    return totalOrganized;
  }

  render () {
    const payment = this.props.history.location.state.payment
    const order = this.props.history.location.state.order
    const total = this.organizeTotal(order.total)
    return (
      <div className='cart_page'>
        <div className='cart'>
          <div className='single_order'>
            <div className='single_order_header_top'>
              <div className='page_header'>Order Details</div>
              <div className='single_order_id'>Order# {order._id}</div>
            </div>
            <div className='single_order_header_bottom'>
              <div className='single_order_buttons'>
                <GetInvoice
                  products={this.props.state.products}
                  payment={payment}
                  order={order}
                />
                <GreenButton
                  variant='contained'
                  className='order_again_button'
                  onClick={() => this.redoOrder(order)}
                >
                  Order Again
                </GreenButton>
              </div>
              <div className='single_order_total'>TOTAL: ${total}</div>
            </div>
            <div className='order_product_fields_container'>
              <div className='order_product_fields'>
                <div className='order_product_field'>Unit Price</div>
                <div className='order_product_field order_product_field_units'>
                  Units
                </div>
                <div className='order_product_field'>Total Price</div>
              </div>
            </div>
            <div className='cart_body'>{this.printItems(order.products)}</div>
          </div>
        </div>

        <OrderInformation payment={payment} order={order} />
      </div>
    )
  }
}
export default connect(mapStateToProps)(Order)
