import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { RedButton, GreenButton } from '../reuseable/materialButtons'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import InputField from '../reuseable/InputField'
import Swal from 'sweetalert2'
import loading from '../../resources/images/loading.svg'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { classes } from '../reuseable/materialButtons'

const mapStateToProps = state => ({
  state: state.reducer
})

class ChangePayment extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      paymentInfo: {},
      bankInfo: {},
      err: {
        payment: false
      },
      loading: true
    }
  }

  componentDidMount () {
    axios
      .get('/api/gc/oneClient')
      .then(res => {
        this.setState({
          paymentInfo: res.data,
          loading: false
        })
      })
      .catch(err => {
        this.setState({
          loading: false
        })
        // console.log(err)
      })
      axios.get('/api/gc/bankFromUser')
          .then(res => {
              this.setState({
                  bankInfo: res.data,
              })
              // console.log(res.data);
          })
          .catch(err => {
              // console.log(err)
          })
  }

  changePayment = () => {
    axios
      .post('/api/gc/addClient', {
        newClientName: '',
        newClientLastName: '',
        newClientEmail: '',
        newClientAddr: '',
        newClientCity: '',
        newClientPostalCode: '',
        redirect: 'settings'
      })
      .then(res => {
        /*set token to finish payment*/
        const token = res.data.token
        localStorage.setItem('gc', token)
        window.open(res.data.url, '_self')
      })
      .catch(err => {
        // console.log(err)
      })
  }

  render () {
    if (this.state.loading) return <img src={loading} />
    else if (Object.entries(this.state.paymentInfo).length !== 0) {
      return (
        <div>
          <div>
            <div className='order_info_split'>
              <div className='order_info_content'>Account Holder: </div>
              <div className='order_info_content'>{this.state.bankInfo.account_holder_name}</div>
            </div>
              <div className='order_info_split'>
                  <div className='order_info_content'>Account Number:</div>
                  <div className='order_info_content'>********{this.state.bankInfo.account_number}</div>
              </div>
              <div className='order_info_split'>
                  <div className='order_info_content'>Account Type:</div>
                  <div className='order_info_content'>{this.state.bankInfo.account_type}</div>
              </div>
              <div className='order_info_split'>
                  <div className='order_info_content'>Bank Name:</div>
                  <div className='order_info_content'>{this.state.bankInfo.bank_name}</div>
              </div>
            <div className='order_info_split'>
              <div className='order_info_content'>Associated Address: </div>
              <div className='settings_payment_address'>
                <div className='settings_payment_addr_info'>
                  {this.state.paymentInfo.address_line1}{' '}
                  {this.state.paymentInfo.address_line2}
                </div>
                <div className='settings_payment_addr_info'>
                  {this.state.paymentInfo.postal_code},{' '}
                  {this.state.paymentInfo.city}, {this.state.paymentInfo.region}
                </div>
              </div>
            </div>
          </div>
          <GreenButton
            variant='contained'
            className='full settings_button'
            onClick={this.changePayment}
          >
            Change Payment Method
          </GreenButton>
        </div>
      )
    } else {
      return (
        <div>
          <div className="settings_text">
            You don't have any payment method associated to your account yet.
            Create one here or wait until cart check-out
          </div>
          <GreenButton
            variant='contained'
            className='full settings_button'
            onClick={this.changePayment}
          >
            Add Payment Method
          </GreenButton>
        </div>
      )
    }
  }
}
export default connect(mapStateToProps)(ChangePayment)
