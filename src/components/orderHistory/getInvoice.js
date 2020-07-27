import React from "react";
import axios from 'axios';
import {Link, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import {PDFDownloadLink} from '@react-pdf/renderer'
import { Invoice } from './invoice'
import loading from "../../resources/images/loading.svg"
import {compose} from "redux";

const mapStateToProps = state => ({
    state: state.reducer
})

class GetInvoice extends React.Component {
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
        let addr_2 = "";
        if (clientInfo.address_line2)
            addr_2 = ", " + clientInfo.address_line2;
        const client = {
            name: fullName,
            address_line1: clientInfo.address_line1,
            address_line2: addr_2,
            city: clientInfo.city,
            state: clientInfo.region,
            country: clientInfo.country_code,
            postal_code: clientInfo.postal_code
        }
        console.log(client);
        return(client);
    }

    getItems = () => {
        let allProducts = this.props.products.products;
        let productsInOrder = this.props.order.products;
        const productsWithTotal = productsInOrder.map(product => {
            const wholeProductInfo = allProducts.find(productAllInfo => productAllInfo._id === product.product)
            return {
                item: wholeProductInfo.name,
                quantity: product.quantity,
                price: wholeProductInfo.price,
                amount: wholeProductInfo.price * product.quantity
            }
        })
        return(productsWithTotal);
    }

    addZero = value => {
        if (value < 10)
            return "0" + value
        return value
    }
    getDate = () => {
        const date = new Date();
        const month = this.addZero(date.getMonth() + 1)
        const day = this.addZero(date.getDate())
        const hour = this.addZero(date.getHours());
        const min = this.addZero(date.getMinutes());
        const fullDate =  date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + min;
        return (fullDate);
    }

    generateInvoice = async e => {
        e.stopPropagation();
        this.setState({
            loading: true,
        })
        const client = await this.getClientInfo();
        const shipping = {...this.props.order.deliveryInfo,
            ClientAddr2: ", " + this.props.order.deliveryInfo.ClientAddr2};
        const items = await this.getItems();
        const subtotal = this.props.order.total;
        const total = parseInt(this.props.order.total, 10) + (parseInt(this.props.order.total, 10) * 0.01);
        const invoice_nr = this.props.order._id;
        const chargingDate = this.props.payment.charge_date;
        const date = await this.getDate()
        const invoice = {
            client: client,
            shipping: shipping,
            items: items,
            subtotal: subtotal,
            total: total,
            invoice_nr: invoice_nr,
            date: date,
            chargingDate: chargingDate,
            status: this.props.payment.status
        }
        this.setState({
            invoice: invoice,
            receiptReady: true,
            loading: false
        })
        console.log(invoice);
    }

    render() {
        if (this.state.loading)
            return <img src={loading}/>
        else if(this.state.receiptReady)
        {
            return (
                <PDFDownloadLink
                    onClick={e => e.stopPropagation()}
                    className="getReceiptButton"
                    document={<Invoice data={this.state.invoice}/>}
                    fileName="invoice_cbddy.pdf"
                >
                    Download Receipt
                </PDFDownloadLink>
            );
        }
        else {
            return (<div className="getReceiptButton" onClick={this.generateInvoice}>Generate Receipt</div>);
        }
    }
}

export default GetInvoice;