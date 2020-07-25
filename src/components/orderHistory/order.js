import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProductInOrderCard from "./productInOrderCard";
import GetInvoice from "./getInvoice";
import store from "../../redux/store";

const mapStateToProps = state => ({
    state: state.reducer
})

class Order extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get('/gc/payments/from')
            .then(res => this.setState({
                                 payments: res.data
                            })
            )
            .catch(err => console.log(err))
    }

    printItems = products => {
        return products.map(product => {
            const productInfo = this.props.state.products.products.find(oneProduct => oneProduct._id === product.product);
            return <ProductInOrderCard productInfo = {productInfo} quantity = {product.quantity}></ProductInOrderCard>
        })
    }

    redoOrder = order => {
        console.log(order);
        //add products to cart
        store.dispatch({ type: 'SET_CART', payload: order.products })

        //redirect to cart
        const url = "/cart";
        this.props.history.push(url)
    }

    render() {
        const payment = this.props.history.location.state.payment;
        const order = this.props.history.location.state.order;

        return (
            <div className="cart_page">
                <div className="cart">
                    <div className="each_order_title">
                        <h1>Order <div className="each_order_id">#{order._id}</div></h1>
                        <div className="each_order_title_right">
                            <div className="each_order_total">TOTAL: ${order.total}</div>
                            <div className="each_order_buttons">
                                <GetInvoice products = {this.props.state.products}
                                            payment = {this.props.payment}
                                            order = {this.props.order}/>
                                <div className="getReceiptButton">
                                    Redo Order
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.printItems(order.products)}
                </div>
                <div className="buy">
                    <h2>Payment Status: {payment.status}</h2>
                    <p>Charging Date: {payment.charge_date}</p>
                    <p>Delivery Scheduled for 2-4 days after payment confirmed</p>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(Order);
