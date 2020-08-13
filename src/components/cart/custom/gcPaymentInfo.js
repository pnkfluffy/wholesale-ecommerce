import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import loading from '../../../resources/images/loadingBig.svg'
import GCFillInfo from './gcFillInfo'
import GCPay from './gcPay'
import GCProductCard from "./gcProductCard";
import store from "../../../redux/store";
import Swal from "sweetalert2";
import {getPriceByQuantity} from "../../reuseable/getPriceByQuantity";

const mapStateToProps = state => ({
  state: state.reducer
})

class GCPaymentInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      bankInfo: {}
    }
  }

  componentDidMount() {
    axios.get('/api/gc/bankFromUser')
        .then(res => {
          this.setState({
            bankInfo: res.data,
          })
          console.log(res.data);
        })
        .catch(err => {
          console.log(err)
        })
  }

  render () {
    return (
          <div className='gc_info_card'>
            <div className='order_info_title'>Payment Method</div>
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
          </div>
    )
  }
}

export default connect(mapStateToProps)(GCPaymentInfo)
