import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProductInOrderCard from "./productInOrderCard";
import GetInvoice from "./getInvoice";
import store from "../../redux/store";
import products from "../home/products";

const mapStateToProps = state => ({
    state: state.reducer
})

class OrderInformation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const payment = this.props.payment;
        const order = this.props.order;
        console.log(order);
        return (
                <div className="buy">
                    <div className="order_information_card">
                        <div className="order_information_title">Payment Information</div>
                        <p>Payment Status: {payment.status}</p>
                        <div className="order_information_dates">
                            <p>Order made on {order.date}</p>
                            <p>Charging Date: {payment.charge_date}</p>
                        </div>
                    </div>
                    <div className="order_information_card">
                        <div className="order_information_delivery">
                            <div className="order_information_title">Delivery Information</div>
                            <p>Delivery 2-4 days after charging date</p>
                            <p>{order.deliveryInfo.ClientFullName}</p>
                            <p>{order.deliveryInfo.ClientAddr1}, {order.deliveryInfo.ClientAddr2}</p>
                        </div>
                    </div>
                </div>
        );
    }
}
export default connect(mapStateToProps)(OrderInformation);
