import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import TrackingLink from './trackingLink'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const mapStateToProps = state => ({
  state: state.reducer
})

class OrderInformation extends React.Component {
  constructor() {
    super();
    this.state = {
                  status: false,
                }
  }
  explainStatus = () => {
    this.setState({
      status: !this.state.status
    })
    console.log(this.state.status);
  }

  render () {
    const payment = this.props.payment
    const order = this.props.order
    const address = order.deliveryInfo
    const tracking = order.tracking
    const orderDate = moment(order.date).format('L')
    const chargeDate = moment(payment.charge_date).format('L')

    return (
      <div className='order_info'>
        <div className='order_info_card'>
          <div className='order_info_delivery'>
            <div className='order_info_title'>Tracking Number</div>
            {tracking.number ? (
              <div className='order_info_content'>
                <div>

                
                Tracking #<TrackingLink tracking={tracking} />
                
                </div>
                <div className="order_info_carrier">shipped via {tracking.company}</div>
              </div>
            ) : (
              <div className='order_info_content'>
                Please check back soon. <br />
                <br />
                Tracking information will be added within 24 hours of payment
                being processed.
              </div>
            )}
          </div>
        </div>

        <div className='order_info_card'>
          <div className='order_info_delivery'>
            <div className='order_info_title'>Shipping Address</div>
            <div className='order_info_address'>{address.ClientFullName}</div>
            <div className='order_info_address'>{address.ClientAddr1},</div>
            {address.ClientAddr2 && (
              <div className='order_info_address'>
                {address.ClientAddr2 + ','}
              </div>
            )}
            <div className='order_info_address'>
              {address.city} {address.state},
            </div>
            <div className='order_info_address'>{address.postal_code}</div>
          </div>
        </div>
        <div className='order_info_card'>
          <div className='order_info_title'>Payment Information</div>
          <div className='order_info_split'>
            <div className='order_info_content'>Status:</div>
            <div className='order_info_content'>{payment.status} <HelpOutlineIcon onMouseEnter={this.explainStatus} onMouseLeave={this.explainStatus}/></div>
          </div>
          {this.state.status ? <div className="order_info_pay_status">{payment.statusMessage}</div> : null }
          <div className='order_info_split'>
            <div className='order_info_content'>Ordered on: </div>
            <div className='order_info_content'>{orderDate} </div>
          </div>
          <div className='order_info_split'>
            <div className='order_info_content'>Charged on:</div>
            <div className='order_info_content'>{chargeDate}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(OrderInformation)
