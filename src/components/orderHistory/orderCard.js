import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {PDFDownloadLink} from '@react-pdf/renderer'
import { Invoice } from './invoice'
import loading from "../../resources/images/loading.svg"

const mapStateToProps = state => ({
    state: state.reducer
})

class OrderCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: {},
            receiptReady: false,
            loading: false,
        }
    }

    getClientInfo = async () => {
        /*organize all shipping information*/
        const clientInfo = await axios.get("/gc/oneClient")
            .then(res => {
                return (res.data);
            })
            .catch(err => console.log(err))
        const fullName =  clientInfo.given_name + " " + clientInfo.family_name
        const shipping = {
            name: fullName,
            address: clientInfo.address_line1,
            city: clientInfo.city,
            state: clientInfo.region,
            country: clientInfo.country_code,
            postal_code: clientInfo.postal_code
        }
        return(shipping);
    }

    getItems = () => {
        let allProducts = this.props.state.products.products;
        let productsInOrder = this.props.order.products;
        console.log(allProducts);
        console.log(productsInOrder);
        const productsWithTotal = productsInOrder.map(product => {
            const wholeProductInfo = allProducts.find(productAllInfo => productAllInfo._id === product.product)
            return {
                        item: wholeProductInfo.name,
                        description: wholeProductInfo.description,
                        quantity: product.quantity,
                        price: wholeProductInfo.price,
                        amount: wholeProductInfo.price * product.quantity
                    }
        })
        return(productsWithTotal);
    }
    getInvoice = async () => {
        this.setState({
            loading: true,
        })
        const shipping = await this.getClientInfo();
        const items = await this.getItems();
        const subtotal = this.props.order.total;
        const total = this.props.order.total + (this.props.order.total * 0.01);
        const invoice_nr = this.props.order._id;
        const chargingDate = this.props.payment.charge_date;
        const date = new Date();
        const month = date.getMonth() + 1
        const fullDate =  date.getFullYear() + "-" + month + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
        const invoice = {
            shipping: shipping,
            items: items,
            subtotal: subtotal,
            total: total,
            invoice_nr: invoice_nr,
            date: fullDate,
            chargingDate: chargingDate
        }
        this.setState({
            invoice: invoice,
            receiptReady: true,
            loading: false
        })
    }

    render() {
        return (
            <div>
                {this.props.payment.status} Will be charged: {this.props.payment.charge_date}
                <p>{this.props.order._id}</p>
                {(() => {
                    if (this.state.loading)
                        return <img src={loading}/>
                    else if(this.state.receiptReady)
                    {
                        return (
                            <PDFDownloadLink
                                className="getReceiptButton"
                                document={<Invoice data={this.state.invoice}/>}
                                fileName="invoice_cbddy.pdf"
                            >
                                Download Receipt
                            </PDFDownloadLink>
                        );
                    }
                    else {
                        return (<div className="getReceiptButton" onClick={this.getInvoice}>Generate Receipt</div>);
                    }
                })()}
            </div>
        );
    }
}
export default connect(mapStateToProps)(OrderCard);
