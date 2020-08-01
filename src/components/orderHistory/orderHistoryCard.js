import React from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import GetInvoice from './getInvoice'
import { GreenButton } from '../reuseable/materialButtons'

const mapStateToProps = state => ({
  state: state.reducer
})

class OrderHistoryCard extends React.Component {
  goToOrder = () => {
    const url = '/order/' + this.props.order._id
    this.props.history.push({
      pathname: url,
      state: {
        payment: this.props.payment,
        order: this.props.order
      }
    })
  }

  render () {
    const chargeDate = moment(this.props.payment.charge_date).format('L')
    const beenCharged =
      moment(this.props.payment.charge_date).valueOf() <
      moment(new Date()).valueOf()
    console.log(
      'vals',
      moment(this.props.payment.charge_date).valueOf(),
      moment(new Date()).valueOf()
    )
    return (
      <div className='order_history_card' onClick={this.goToOrder}>
        <div className='order_history_left'>
          <div className='order_history_content'>
            Order#:{' '}
            <div className='order_history_number'>{this.props.order._id}</div>
          </div>
          <div className='order_history_content'>
            Status: {this.props.payment.status}
          </div>
          <div className='order_history_content'>
            {beenCharged ? 'Charged On: ' : 'Expect Charge On: '} {chargeDate}
          </div>
        </div>
        <div className='order_history_right'>
          <div className='order_history_content'>
            <GreenButton variant='contained' className='single_order_button'>
              Order Details
            </GreenButton>
          </div>
          <div className='order_history_content'>
            <GetInvoice
              products={this.props.state.products}
              payment={this.props.payment}
              order={this.props.order}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default compose(withRouter, connect(mapStateToProps))(OrderHistoryCard)
