import React from 'react'
import axios from 'axios'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { GreenButton } from '../../reuseable/materialButtons'
import GetAppIcon from '@material-ui/icons/GetApp'
import { Invoice } from './invoice'
import loadingSVG from '../../../resources/images/loading.svg';

class GetInvoice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invoice: null
    }
  }

  getClientInfo = async () => {
    /*organize all payment information*/
    const clientInfo = await axios
      .get('/api/gc/oneClient')
      .then(res => {
        return res.data
      })
      .catch(err => {
        // console.log(err)
      })
    const bankInfo = await axios
      .get('/api/gc/bankFromOrder/' + this.props.order._id)
      .then(res =>{
        return res.data
      })
      .catch(err => console.log(err))
    if (!clientInfo) {
      alert('unexpected error in retrieving client info')
    }
    const fullName = clientInfo.given_name + ' ' + clientInfo.family_name
    let addr_2 = ''
    if (clientInfo.address_line2) addr_2 = ', ' + clientInfo.address_line2
    const client = {
      account_number: bankInfo.account_number,
      account_type: bankInfo.account_type,
      bank_name: bankInfo.bank_name,
      name: fullName,
      company_name: clientInfo.company_name,
      address_line1: clientInfo.address_line1,
      address_line2: addr_2,
      city: clientInfo.city,
      state: clientInfo.region,
      country: clientInfo.country_code,
      postal_code: clientInfo.postal_code
    }
    // console.log(client)
    return client
  }
  getItems = () => {
    let productsInOrder = this.props.order.products
    const productsWithTotal = productsInOrder.map(product => {
      return {
        item: product.productName,
        id: product.productId.toString(),
        quantity: product.productQuantity,
        price: product.productPrice,
        amount: product.productTotal
      }
    })
    return productsWithTotal
  }

  addZero = value => {
    if (value < 10) return '0' + value
    return value
  }
  getDate = () => {
    const date = new Date()
    const month = this.addZero(date.getMonth() + 1)
    const day = this.addZero(date.getDate())
    const hour = this.addZero(date.getHours())
    const min = this.addZero(date.getMinutes())
    const fullDate =
      date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + min
    return fullDate
  }

  generateInvoice = async () => {
    // console.log('generating')

    const client = await this.getClientInfo()
    const items = await this.getItems()
    const date = await this.getDate()
    const subtotal = this.props.order.total.toFixed(2)

    const shipping = {
      ...this.props.order.deliveryInfo,
      ClientAddr2: ', ' + this.props.order.deliveryInfo.ClientAddr2
    }
    const chargingDate = this.props.payment.charge_date
    const invoice = {
      client: client,
      shipping: shipping,
      items: items,
      subtotal: subtotal,
      invoice_nr: this.props.order._id,
      date: date,
      chargingDate: chargingDate,
      status: this.props.payment.status
    }
    // console.log('done generating', invoice)

    this.setState({
      invoice: invoice
    })
  }

  componentDidMount = () => {
    this.generateInvoice()
  }

  render() {
    const fileName = 'cbddy_invoice_' + this.props.order._id + '.pdf'
    return (
      <div className='invoice_container'>
        {this.state.invoice && (
          <PDFDownloadLink
            className='pdf_download'
            document={<Invoice data={this.state.invoice} />}
            fileName={fileName}
          >
            {({ loading }) =>
              loading ? (
                <img src={loadingSVG} alt='loading' />
              ) : (
                  <GreenButton
                    variant='contained'
                    className='single_order_button'
                    startIcon={<GetAppIcon />}
                  >
                    Receipt
                  </GreenButton>
                )
            }
          </PDFDownloadLink>
        )}
      </div>
    )
  }
}

export default GetInvoice
