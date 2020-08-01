import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import OrderCard from "./orderHistoryCard";
import loading from '../../resources/images/loadingBig.svg'

const mapStateToProps = state => ({
    state: state.reducer
})

class OrderHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            payments: [],
        }
    }

    componentDidMount() {
        axios.get('/api/gc/payments/from')
            .then(res => {
                console.log(res.data);
                this.setState({
                                 payments: res.data,
                                 loading:false
                            })
                 }
            )
            .catch(err => console.log(err))
    }


    printOrders = () => {
        const orders = this.props.state.orders;
        if (orders[0])
        {
            let i = 0;
            let ordersAndPay = [];
            const payments = this.state.payments;
            if (payments)
            {
                while (i < orders.length)
                {
                    ordersAndPay.push(<OrderCard order = {orders[i]} payment = {payments[i]}/>)
                    i++;
                }
            }
            return ordersAndPay;
        } else {
            return <h1>No orders yet</h1>
        }
    }

    render() {
        if (this.state.loading)
        {
            return <img src = {loading}/>
        }
        else {
            return (
                <div className="order_history">
                    {this.printOrders()}
                </div>
            );
        }
    }
}
export default connect(mapStateToProps)(OrderHistory);
