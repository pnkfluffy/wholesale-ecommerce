import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import OrderCard from "./orderHistoryCard";

const mapStateToProps = state => ({
    state: state.reducer
})

class OrderHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payments: []
        }
    }

    componentDidMount() {
        axios.get('/api/gc/payments/from')
            .then(res => this.setState({
                                 payments: res.data
                            })
            )
            .catch(err => console.log(err))
    }


    printOrders = () => {
        const orders = this.props.state.orders;
        if (orders[0])
        {
            return orders.map(order => {
                const paymentRelated = this.state.payments.find(payment => payment.id === order.paymentID)
                console.log(paymentRelated);
                if (paymentRelated)
                {
                    return (
                        <OrderCard order = {order} payment = {paymentRelated}/>
                    );
                }
            })
        } else {
            return <h1>No orders yet</h1>
        }
    }

    render() {
        return (
            <div className="account">
                <h1>Order History</h1>
                {this.printOrders()}
            </div>
        );
    }
}
export default connect(mapStateToProps)(OrderHistory);
