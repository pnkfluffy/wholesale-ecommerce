import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import OrderHistoryCard from './orderHistoryCard'
import loading from '../../../resources/images/loadingBig.svg'

const mapStateToProps = state => ({
  state: state.reducer
})

class OrderHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      payments: []
    }
  }

  componentDidMount() {
    axios
      .get('/api/gc/payments/from')
      .then(res => {
        console.log(res.data)
        this.setState({
          payments: res.data,
          loading: false
        })
      })
      .catch(err => {
        // console.log(err)
      })
  }

  render() {
    let ordersAndPay
    if (this.props.state.orders.length > 0 && this.state.payments.length > 0) {
      ordersAndPay = this.props.state.orders.map((order, index) => {
        return (
          <OrderHistoryCard order={order} payment={this.state.payments[index]} key={index} />
        )
      })
    }
    else {
      ordersAndPay = "No orders yet"
    }

    return (
      <div className='order_history'>
        {this.state.loading ? (
          <img src={loading} alt='loading' />
        ) : (
            ordersAndPay
          )}
      </div>
    )
  }
}
export default connect(mapStateToProps)(OrderHistory)
