import React from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import GetInvoice from './getInvoice'
import { GreenButton } from '../../reuseable/materialButtons'
import TrackingLink from './trackingLink'

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
    if (!this.props.payment) {
      return <div></div>
    }
    const chargeDate = moment(this.props.payment.charge_date).format('L')
    const placementDate = moment(this.props.order.date).format('L')
    const shippingNumber = this.props.order.tracking.number

    return (
      <div className='order_history_card'>
        <div className='order_history_left'>
          <div className='order_history_content space_between'>
            <div>Order #: </div>
            <div className='order_history_number'>{this.props.order._id}</div>
          </div>
          <div className='order_history_content_small space_between'>
            <div>Ordered: {placementDate}</div>
            <div>Processing date: {chargeDate}</div>
          </div>
          <div className='order_history_content order_history_status'>
            Status: {this.props.payment.status}
          </div>
          <div className='order_history_content'>
            {shippingNumber ? (
              <div>
                Tracking #
                <TrackingLink tracking={this.props.order.tracking} />
              </div>
            ) : (
              `not yet shipped out`
            )}
          </div>
        </div>
        <div className='order_history_right'>
          <GreenButton
            variant='contained'
            className='single_order_button'
            onClick={this.goToOrder}
          >
            Order Details
          </GreenButton>
          <GetInvoice
            products={this.props.state.products}
            payment={this.props.payment}
            order={this.props.order}
          />
        </div>
      </div>
    )
  }
}

export default compose(withRouter, connect(mapStateToProps))(OrderHistoryCard)
