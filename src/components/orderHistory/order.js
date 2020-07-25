import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProductInOrderCard from "./productInOrderCard";

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
    render() {
        const payment = this.props.history.location.state.payment;
        const order = this.props.history.location.state.order;

        return (
            <div className="account">
                <h1>Order #{order._id}</h1>
                <h2>Payment Status: {payment.status}</h2>
                <p>Charging Date: {payment.charge_date}</p>
                <p>Delivery Scheduled for 2-4 days after payment confirmed</p>
                <p>TOTAL: total</p>
                {this.printItems(order.products)}
            </div>
        );
    }
}
export default connect(mapStateToProps)(Order);
