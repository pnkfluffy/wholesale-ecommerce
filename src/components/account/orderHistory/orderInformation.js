import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import TrackingLink from './trackingLink'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import axios from 'axios'

const mapStateToProps = state => ({
  state: state.reducer
})

class OrderInformation extends React.Component {
  render () {
    const bankInfo = this.props.bankInfo
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
            <div className='order_info_content'>{payment.status}
              <div className='order_info_message'>
                <HelpOutlineIcon fontSize='inherit' />
                <span className="order_info_pay_status">{payment.statusMessage}</span>
              </div>
            </div>
          </div>
          <div className='order_info_split'>
            <div className='order_info_content'>Ordered on: </div>
            <div className='order_info_content'>{orderDate} </div>
          </div>
          <div className='order_info_split'>
            <div className='order_info_content'>Charged on:</div>
            <div className='order_info_content'>{chargeDate}</div>
          </div>
          {Object.entries(bankInfo).length !== 0 ?
              <div>
                <div className='order_info_split'>
                  <div className='order_info_content'>Account Holder: </div>
                  <div className='order_info_content'>{bankInfo.account_holder_name}</div>
                </div>
                <div className='order_info_split'>
                  <div className='order_info_content'>Account Number:</div>
                  <div className='order_info_content'>********{bankInfo.account_number}</div>
                </div>
                <div className='order_info_split'>
                  <div className='order_info_content'>Account Type:</div>
                  <div className='order_info_content'>{bankInfo.account_type}</div>
                </div>
                <div className='order_info_split'>
                  <div className='order_info_content'>Bank Name:</div>
                  <div className='order_info_content'>{bankInfo.bank_name}</div>
                </div>
              </div>
          : null}
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(OrderInformation)
