import React from "react";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import { connect } from "react-redux";
import {compose} from "redux";
import GetInvoice from "./getInvoice";

const mapStateToProps = state => ({
    state: state.reducer
})

class OrderHistoryCard extends React.Component {
    constructor(props) {
        super(props);
    }

    goToOrder = () => {
        const url = "/order/" + this.props.order._id;
        this.props.history.push({
            pathname: url,
            state: {
                payment: this.props.payment,
                order: this.props.order
            }
        })
    }

    render() {
        return (
            <div className="card_of_order" onClick={this.goToOrder}>
                Status: {this.props.payment.status}
                <p>Will be charged: {this.props.payment.charge_date}</p>
                <p>#{this.props.order._id}</p>
                <GetInvoice products = {this.props.state.products}
                            payment = {this.props.payment}
                            order = {this.props.order}/>
            </div>
        );
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps)
)(OrderHistoryCard);
